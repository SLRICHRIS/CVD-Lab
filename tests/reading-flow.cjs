/* Navigation, readable teaching copy and shrinking Streamlit frame regression.
 * --streamlit starts the pinned Python app locally; it does not test a deployment.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {spawn}=require('node:child_process');
const {chromium}=require('playwright');

(async()=>{
  const output=process.env.CVD_QA_OUTPUT||path.resolve(__dirname,'../test-results');
  fs.mkdirSync(output,{recursive:true});
  const browser=await chromium.launch({headless:true,args:['--no-sandbox',...(process.env.CVD_SINGLE_PROCESS?['--single-process','--no-zygote','--disable-gpu']:[])],...(process.env.CVD_CHROMIUM_EXECUTABLE?{executablePath:process.env.CVD_CHROMIUM_EXECUTABLE}:{})});
  let server;
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../site/index.html')).href);
    await page.waitForFunction(()=>window.CVDLab&&window.CVDEvidence);
    const links=page.locator('.cv-contents a');
    assert.equal(await links.count(),9);
    await page.selectOption('#cv-precursor','tmga');
    for(let i=0;i<await links.count();i++) {
      const link=links.nth(i),hash=await link.getAttribute('href');
      await link.focus();await link.press('Enter');
      await page.waitForFunction(hash=>{
        const target=document.querySelector(hash);
        return target.tagName==='DETAILS'?document.activeElement===target.querySelector('summary'):document.activeElement===target;
      },hash);
      assert.equal(await page.locator(hash).isVisible(),true,hash+' is hidden');
      assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().precursor),'tmga','Navigation changed the recipe');
      if(['#cv-environment','#cv-hardware-view','#cv-defects'].includes(hash)) {
        const id=await page.locator('[data-lab-view][aria-pressed="true"]').getAttribute('aria-controls');
        assert.equal('#'+id,hash);
      }
    }
    // Scope comes from the supplied Unit III excerpt, including topics this CVD
    // lab does not teach. Those topics must remain required separate study.
    const coverage=await page.locator('[data-syllabus-topic]').evaluateAll(rows=>Object.fromEntries(rows.map(row=>[row.dataset.syllabusTopic,row.dataset.coverage])));
    assert.deepEqual(coverage,{
      requirements:'context',pvd:'elsewhere','interconnect-failures':'elsewhere',multilevel:'elsewhere',
      cvd:'core',polysilicon:'core',oxide:'core',nitride:'core',metal:'core',epitaxy:'core',pecvd:'core',
      'wet-etch':'elsewhere','plasma-rie':'elsewhere',cmp:'elsewhere',integration:'context',characterization:'context'
    });
    assert.match(await page.locator('#cv-exam-priority-note').textContent(),/not a guarantee.*excluded from an exam/);
    assert.match(await page.locator('.cv-study-required').textContent(),/Do not leave out required syllabus topics/);
    assert.equal(await page.locator('[data-syllabus-source="user-provided-unit-iii-excerpt"]').count(),1);
    const sourceText=await page.locator('.cv-syllabus-excerpt').textContent();
    for(const topic of ['Evaporation and sputtering','Failure mechanisms in metal interconnect','multilevel metallization','polysilicon','silicon dioxide','silicon nitride','metal films','Epitaxial growth of silicon','PECVD','wet chemical etching','Plasma etching and RIE','Chemical Mechanical Polishing','Process integration and characterization'])assert.ok(sourceText.includes(topic),topic+' omitted from transcription');
    await page.locator('.cv-contents a[href="#cv-syllabus-guide"]').click();
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.selectOption('#cv-precursor','silane');await page.locator('[data-process="PECVD"]').click();
    await page.uncheck('#cv-rf-on');await page.selectOption('#cv-stage','unload');
    for(const [id,precursor,process,view] of [
      ['poly','silane','LPCVD','hardware'],['oxide','silane','PECVD','environment'],
      ['nitride','dcs','LPCVD','hardware'],['metal','wf6','LPCVD','hardware'],
      ['epi','sicl4','APCVD','hardware'],['pecvd','silane','PECVD','hardware']
    ]) {
      await page.locator(`#cv-study-${id} button`).click();
      const state=await page.evaluate(()=>window.CVDLab.snapshot());
      assert.equal(state.precursor,precursor);assert.equal(state.process,process);
      assert.equal(state.stage,'deposit');assert.equal(state.running,false);assert.equal(state.rfOn,process==='PECVD');
      assert.equal(await page.locator('[data-lab-view][aria-pressed="true"]').getAttribute('data-lab-view'),view);
      assert.equal(await page.evaluate(()=>document.activeElement.id),view==='hardware'?'cv-hardware-view':'cv-environment');
      assert.ok(await page.locator(`#cv-study-${id} [data-cite]>.cv-citations a`).count(),id+' is not cited');
      await page.locator('.cv-contents a[href="#cv-syllabus-guide"]').click();
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.locator('.cv-study-link[href="#cv-syllabus-source"]').first().click();
    assert.equal(await page.locator('#cv-syllabus-source').evaluate(el=>el.open),true);
    await page.locator('.cv-study-link[href="#cv-epitaxial-definition"]').click();
    assert.equal(await page.locator('#cv-cvd-guide').evaluate(el=>el.open),true);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'cv-epitaxial-definition');
    assert.equal(await page.locator('#cv-feedback a[href="mailto:am.en.u4ece23142@am.students.amrita.edu"]').count(),1);
    assert.equal(await page.locator('#cv-feedback a[href="https://github.com/SLRICHRIS/CVD-Lab/issues"]').count(),1);
    // A transport jump opens its disclosure and its containing environment view.
    await page.locator('.cv-contents a[href="#cv-transport-guide"]').click();
    assert.equal(await page.locator('#cv-transport-guide').evaluate(el=>el.open),true);
    assert.equal(await page.locator('#cv-environment').isVisible(),true);
    await page.locator('[data-env-da="10"]').click();
    assert.equal(await page.locator('#cv-env-cs').textContent(),'9.1%');
    await page.locator('.cv-contents a[href="#cv-defects"]').click();
    await page.goBack();
    await page.waitForFunction(()=>document.activeElement===document.querySelector('#cv-transport-guide>summary'));
    assert.equal(await page.locator('#cv-environment').isVisible(),true);
    // Nested learning topics and references can still be reached directly.
    await page.locator('.cv-recipe-link[href="#cv-recipes-guide"]').first().click();
    assert.equal(await page.locator('#cv-recipes-guide').evaluate(el=>el.open),true);
    await page.locator('#cv-film-guide>summary').click();
    assert.equal(await page.locator('#cv-film-guide tbody tr').count(),7);
    assert.equal(await page.locator('#cv-film-guide tbody td>.cv-citations').count(),7);
    assert.equal(await page.locator('#cv-net-example .cv-guide-equation>.cv-citations a[data-reference="9"]').count(),1);
    assert.equal((await page.locator('body').innerText()).includes('\u2014'),false);

    // Check real computed contrast for the main explanation and muted prose.
    for(const colorScheme of ['light','dark']) {
      await page.emulateMedia({colorScheme});
      const measurements=await page.evaluate(()=>{
        const luminance=color=>{
          const channels=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
          return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
        };
        return [
          ['#cv-env-explanation',18],['#cv-env-observe',18],['.cv-about-definition',18],
          ['.cv-learning-path p',17],['.cv-example-limit',18],['.cv-env-bounds',16],
          ['.cv-detail-line',16],['.cv-ref-use',18],['.cv-part-description',18],['.cv-study-intro',18]
        ].map(([selector,minSize])=>{
          const el=document.querySelector(selector),style=getComputedStyle(el);
          let bg=el;
          while(bg.parentElement&&getComputedStyle(bg).backgroundColor==='rgba(0, 0, 0, 0)')bg=bg.parentElement;
          const a=luminance(style.color),b=luminance(getComputedStyle(bg).backgroundColor);
          return {selector,minSize,size:parseFloat(style.fontSize),contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
        });
      });
      for(const m of measurements) {
        assert.ok(m.size>=m.minSize,`${colorScheme} ${m.selector}: text too small (${m.size} px)`);
        assert.ok(m.contrast>=7,`${colorScheme} ${m.selector}: ${m.contrast.toFixed(2)} contrast`);
      }
    }
    for(const [width,colorScheme] of [[2560,'light'],[1906,'light'],[1906,'dark'],[1440,'light'],[768,'light'],[390,'light'],[390,'dark'],[320,'light']]) {
      await page.setViewportSize({width,height:1000});await page.emulateMedia({colorScheme});
      await page.evaluate(()=>document.querySelectorAll('details').forEach(el=>el.open=false));
      await page.locator('.cv-contents a[href="#cv-environment"]').click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,width+' px overflow');
      if(width>=1906) {
        const layout=await page.evaluate(()=>({
          width:document.querySelector('main').getBoundingClientRect().width,
          scene:document.querySelector('.cv-env-viewport').getBoundingClientRect().height,
          font:parseFloat(getComputedStyle(document.querySelector('#cv-env-explanation')).fontSize)
        }));
        assert.ok(layout.width>=width*(width===1906?.85:.64),width+' px: excessive desktop side margins');
        assert.ok(layout.scene>=500,width+' px: the growth environment did not grow with the workspace');
        assert.ok(layout.font>=18,width+' px: main prose shrank on a wide screen');
      }
      assert.equal(await page.locator('.cv-head-facts').evaluate(el=>[...el.children].every(cell=>{
        const box=cell.getBoundingClientRect();
        return [...cell.children].every(child=>{const r=child.getBoundingClientRect();return r.left>=box.left-1&&r.right<=box.right+1;});
      })),true,width+' px hero labels overlap their columns');
      for(const selector of ['#cv-play','.cv-modes button','.cv-lab-views button']) {
        assert.equal(await page.locator(selector).evaluateAll(els=>els.every(el=>{
          const box=el.getBoundingClientRect();return box.height>=44&&parseFloat(getComputedStyle(el).fontSize)>=16;
        })),true,width+' px: small controls at '+selector);
      }
      await page.locator('.cv-back-top').click();
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:path.join(output,`reading-${width}-${colorScheme}.png`)});
      await page.locator('.cv-contents a[href="#cv-syllabus-guide"]').click();
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,width+' px expanded syllabus overflow');
      if(width>=1906) {
        assert.equal(await page.locator('.cv-study-intro').evaluate(el=>{
          const probe=document.createElement('span');probe.textContent='0';probe.style.font=getComputedStyle(el).font;
          el.append(probe);const ch=probe.getBoundingClientRect().width;probe.remove();
          return el.getBoundingClientRect().width<=76*ch+1;
        }),true,width+' px: the introduction has an excessive reading width');
      }
      for(const section of ['.cv-study-priorities','#cv-unit-topic-map','#cv-exam-extras']) {
        await page.locator(section).screenshot({path:path.join(output,`syllabus-${section.replace(/[.#]/g,'')}-${width}-${colorScheme}.png`)});
      }
      await page.locator('#cv-syllabus-guide>summary').click();
    }

    if(process.argv.includes('--streamlit')) {
      const port=Number(process.env.CVD_STREAMLIT_PORT||8510);
      const url=`http://127.0.0.1:${port}`;
      server=spawn(process.env.CVD_STREAMLIT_EXECUTABLE||'streamlit',['run','app.py','--server.address','127.0.0.1','--server.port',String(port),'--server.headless','true'],{cwd:path.resolve(__dirname,'..'),stdio:['ignore','pipe','pipe']});
      let serverOutput='';server.on('error',e=>{serverOutput+=e.message;});
      server.stdout.on('data',d=>{serverOutput+=d;});server.stderr.on('data',d=>{serverOutput+=d;});
      let ready=false;
      for(let i=0;i<200;i++) {
        try {ready=(await fetch(url+'/_stcore/health')).ok;}catch{}
        if(ready)break;
        if(server.exitCode!==null)break;
        await new Promise(resolve=>setTimeout(resolve,200));
      }
      assert.ok(ready,'Streamlit did not start: '+serverOutput);
      await page.setViewportSize({width:1440,height:1000});
      await page.goto(url);await page.waitForSelector('iframe.stIFrame');
      const frame=page.frameLocator('iframe.stIFrame');
      await frame.locator('#cvd-recipe-accuracy').waitFor();
      const fitted=async label=>{
        await page.waitForFunction(()=>{
          const frame=document.querySelector('iframe.stIFrame');
          const body=frame?.contentDocument?.body;
          return body&&Math.abs(frame.clientHeight-Math.ceil(body.getBoundingClientRect().height))<=1;
        });
        const gap=await page.evaluate(()=>{
          const frame=document.querySelector('iframe.stIFrame'),main=document.querySelector('[data-testid="stMain"]');
          const footer=frame.contentDocument.querySelector('footer');
          const footerBottom=frame.getBoundingClientRect().top-main.getBoundingClientRect().top+main.scrollTop+footer.getBoundingClientRect().bottom;
          return {tail:main.scrollHeight-footerBottom,frameHeight:frame.clientHeight};
        });
        assert.ok(gap.tail<=64,label+': unused footer space '+gap.tail);
        return gap.frameHeight;
      };
      await fitted('initial');
      const padding=await page.locator('[data-testid="stMainBlockContainer"]').evaluate(el=>getComputedStyle(el).paddingBottom);
      assert.ok(parseFloat(padding)<=24,'Host footer padding is excessive');
      // srcdoc may forbid history writes; every contents route must still work.
      for(const hash of ['#cv-syllabus-guide','#cv-hardware-view','#cv-defects','#cv-transport-guide','#cv-net-example','#cv-learn','#cv-references','#cv-studio','#cv-environment']) {
        await frame.locator(`.cv-contents a[href="${hash}"]`).click();await fitted('contents '+hash);
        assert.equal(await frame.locator(hash).isVisible(),true,hash+' is hidden in Streamlit');
        const box=await frame.locator(hash).boundingBox();
        assert.ok(box.y>=0&&box.y<1000,hash+' is outside the host viewport');
      }
      await page.emulateMedia({reducedMotion:'no-preference'});
      await frame.locator('#cv-study-nitride button').click();await fitted('syllabus recipe');
      assert.equal(await frame.locator('#cv-precursor').inputValue(),'dcs');
      assert.equal(await frame.locator('[data-lab-view="hardware"]').getAttribute('aria-pressed'),'true');
      assert.equal(await frame.locator('#cvd-recipe-accuracy').evaluate(()=>window.CVDLab.snapshot().running),false);
      await page.emulateMedia({reducedMotion:'reduce'});
      await frame.locator('.cv-contents a[href="#cv-syllabus-guide"]').click();
      const syllabusExpanded=await fitted('syllabus expanded');
      await frame.locator('#cv-syllabus-guide>summary').click();
      const syllabusCollapsed=await fitted('syllabus collapsed');
      assert.ok(syllabusExpanded-syllabusCollapsed>2000,'Syllabus disclosure did not release its height');
      await frame.locator('.cv-contents a[href="#cv-environment"]').click();
      await frame.locator('#cv-references').evaluate(el=>el.open=false);await fitted('close references');
      await frame.locator('[data-env-stage="transport"]').click();
      await frame.locator('#cv-env-explanation .cv-citations a[data-reference="33"]').click();await fitted('citation');
      assert.equal(await frame.locator('#cv-ref-33').evaluate(el=>document.activeElement===el),true);
      const citationBox=await frame.locator('#cv-ref-33').boundingBox();
      assert.ok(citationBox.y>=0&&citationBox.y<1000,'Citation is outside the host viewport');
      await frame.locator('#cv-ref-33 [data-evidence-back]').click();await fitted('citation return');
      assert.equal(await frame.locator('#cv-env-explanation').evaluate(el=>document.activeElement.closest('[id]')===el),true);
      await frame.locator('#cv-references').evaluate(el=>el.open=false);await fitted('close citation list');
      await frame.locator('#cv-cvd-guide>summary').click();
      const expanded=await fitted('expanded guide');
      await frame.locator('#cv-cvd-guide>summary').click();
      const collapsed=await fitted('collapsed guide');
      assert.ok(expanded-collapsed>1000,'The long disclosure should release its height');
      for(const view of ['hardware','defects','environment']) {
        await frame.locator(`[data-lab-view="${view}"]`).click();await fitted(view);
      }
      for(const width of [390,1440,1906,2560]) {
        await page.setViewportSize({width,height:1000});await fitted(width+' px');
        if(width>=1906) {
          const host=await page.locator('iframe.stIFrame').boundingBox();
          const lab=await frame.locator('main').boundingBox();
          assert.ok(lab.width>=width*(width===1906?.85:.64),width+' px: narrow lab inside Streamlit');
          assert.ok(Math.abs(lab.x-(width-lab.width)/2)<=2,width+' px: the lab is not centered');
          assert.ok(host.width>=lab.width,width+' px: host clips the wider lab');
          assert.equal(await frame.locator('body').evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,width+' px: Streamlit frame overflows');
          await frame.locator('.cv-contents a[href="#cv-environment"]').click();await fitted('wide environment');
          await page.screenshot({path:path.join(output,`streamlit-environment-${width}.png`)});
        }
        await frame.locator('#cv-references>summary').click();await fitted('references expanded');
        await frame.locator('#cv-references>summary').click();await fitted('references collapsed');
        await page.locator('[data-testid="stMain"]').evaluate(el=>el.scrollTop=el.scrollHeight);
        await page.screenshot({path:path.join(output,`streamlit-footer-${width}.png`)});
      }
      console.log('Streamlit 1.65 checks passed: guide/reference expansion and collapse, three view heights, mobile/desktop/wide-screen resizing, centered usable workspace width, compact host padding and no unused footer tail.');
    }
    assert.deepEqual(errors,[],'Browser JavaScript errors');
    console.log('Reading-flow checks passed: nine contents routes, sixteen Unit III topics and study gaps, six cited study launches, qualified exam priorities, source transcription, feedback links, hidden-view reveal, history, cited film roles, light/dark prose contrast, bounded reading widths and 320/390/768/1440/1906/2560 px layouts.');
  } finally {
    await browser.close();
    if(server)server.kill('SIGTERM');
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
