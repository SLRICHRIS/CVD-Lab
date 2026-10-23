/* Verify recipe-specific defect evidence, visual selection and accessibility.
 * These are UI/evidence-integrity checks, not experimental defect validation.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');

(async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox',...(process.env.CVD_SINGLE_PROCESS?['--single-process','--no-zygote','--disable-gpu']:[])],...(process.env.CVD_CHROMIUM_EXECUTABLE?{executablePath:process.env.CVD_CHROMIUM_EXECUTABLE}:{})});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../site/index.html')).href);
    await page.waitForFunction(()=>window.CVDDefects);
    await page.locator('[data-lab-view="defects"]').click();
    assert.equal(await page.locator('#cv-defects').isVisible(),true);
    assert.equal(await page.locator('#cv-environment').isVisible(),false);
    assert.equal(await page.locator('#cv-hardware-view').isVisible(),false);
    const examples=[
      ['silane','PECVD',[['oxide-charge',34,'traps'],['plasma-powder',34,'particles']]],
      ['silane','LPCVD',[['poly-traps',35,'grains']]],
      ['silane','APCVD',[['thermal-particles',36,'particles']]],
      ['dcs','LPCVD',[['nitride-cracks',37,'crack']]],
      ['teos','LPCVD',[['teos-trench',38,'void']]],
      ['teos','PECVD',[['teos-peeling',39,'peel']]],
      ['sicl4','APCVD',[['epi-faults',40,'fault']]],
      ['wf6','LPCVD',[['w-seam',41,'seam']]],
      ['ticl4','LPCVD',[['tin-chlorine',42,'impurity']]],
      ['tmga','MOCVD',[['gan-carbon',30,'carbon'],['gan-dislocations',43,'dislocation']]],
    ];
    const output=process.env.CVD_QA_OUTPUT||path.resolve(__dirname,'../test-results');fs.mkdirSync(output,{recursive:true});
    const figures=new Set();
    for(const [precursor,process,cases] of examples){
      await page.selectOption('#cv-precursor',precursor);await page.locator(`[data-process="${process}"]`).click();
      assert.equal(await page.locator('#cv-defect-options button').count(),cases.length);
      assert.equal(await page.evaluate(()=>window.CVDDefects.snapshot().recipe),precursor+'-'+process);
      for(const [id,reference,visual] of cases){
        await page.locator(`[data-defect="${id}"]`).click();
        assert.equal(await page.locator('#cv-defect-svg').getAttribute('data-visual'),visual);
        for(const field of ['observation','studied','driver','diagnostic','scope','caption']){
          const refs=await page.locator(`#cv-defect-${field}>.cv-citations a`).evaluateAll(links=>links.map(a=>+a.dataset.reference));
          assert.deepEqual(refs,[reference],`${id}: missing or stale ${field} citation`);
          assert.ok((await page.locator(`#cv-defect-${field}>.cv-citations a`).getAttribute('title')).length>60);
        }
        const svg=await page.locator('#cv-defect-svg').innerHTML();
        assert.ok(!/NaN|Infinity|undefined/.test(svg));figures.add(svg);
        assert.ok((await page.locator('#cv-defect-svg-desc').textContent()).includes('no defect density'));
        assert.equal(await page.locator('[data-defect-step="1"]').getAttribute('aria-pressed'),'true');
        await page.locator('[data-defect-step="0"]').click();
        assert.equal(await page.locator('.cv-defect-overlay').getAttribute('opacity'),'0');
        await page.locator('[data-defect-step="2"]').click();
        assert.equal(await page.locator('.cv-defect-overlay').getAttribute('opacity'),'1');
        assert.match(await page.locator('#cv-defect-caption').textContent(),/^Detection/);
        // Reduced motion reveals the annotated result immediately, no timer.
        await page.locator('#cv-defect-play').click();
        assert.equal(await page.evaluate(()=>window.CVDDefects.snapshot().playing),false);
        await page.locator('.cv-defect-visual').screenshot({path:path.join(output,`defect-${id}-1440.png`)});
      }
    }
    assert.equal(figures.size,12);
    // The coverage table must switch the actual recipe, not only its caption.
    await page.locator('#cv-defect-coverage>summary').click();
    for(const [precursor,process] of examples){
      await page.locator(`[data-defect-recipe="${precursor}-${process}"]`).click();
      const state=await page.evaluate(()=>({lab:window.CVDLab.snapshot(),atlas:window.CVDDefects.snapshot()}));
      assert.equal(state.lab.precursor,precursor);assert.equal(state.lab.process,process);
      assert.equal(state.atlas.recipe,precursor+'-'+process);
    }
    await page.locator('[data-defect-recipe="silane-APCVD"]').click();
    assert.match(await page.locator('#cv-defect-fit').textContent(),/LPCVD/);
    assert.match(await page.locator('#cv-defect-scope').textContent(),/Evidence gap.*not an APCVD measurement/);
    await page.locator('[data-defect-recipe="sicl4-APCVD"]').click();
    assert.equal(await page.locator('#cv-defect-fit').getAttribute('data-fit'),'related-material');
    assert.match(await page.locator('#cv-defect-scope').textContent(),/does not establish SiCl₄/);
    // Setpoint changes retain evidence and do not fabricate a new defect result.
    const before=await page.locator('#cv-defect-svg').innerHTML();
    await page.locator('#cv-temperature').evaluate(el=>{el.value=el.min;el.dispatchEvent(new Event('input',{bubbles:true}));});
    assert.equal(await page.locator('#cv-defect-svg').innerHTML(),before);
    const conditionRefs=await page.locator('#cv-defect-current>.cv-citations a').evaluateAll(links=>links.map(a=>+a.dataset.reference));
    assert.ok(conditionRefs.includes(5));
    // Citation focus and return must also work from the new view.
    await page.locator('#cv-defect-observation>.cv-citations a').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'cv-ref-40');
    await page.locator('[data-lab-view="environment"]').click();
    await page.locator('#cv-ref-40 [data-evidence-back]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.closest('[id]').id),'cv-defect-observation');
    assert.equal(await page.locator('#cv-defects').isVisible(),true,'Returning to a hidden claim must restore its view');
    // All views remain mutually exclusive, and selecting a hidden atlas is safe.
    for(const view of ['hardware','environment','defects']){
      await page.locator(`[data-lab-view="${view}"]`).click();
      const shown=await page.evaluate(()=>['cv-environment','cv-hardware-view','cv-defects'].filter(id=>!document.getElementById(id).hidden));
      assert.deepEqual(shown,[{hardware:'cv-hardware-view',environment:'cv-environment',defects:'cv-defects'}[view]]);
    }
    for(const [width,colorScheme] of [[1440,'light'],[390,'light'],[390,'dark']]){
      await page.setViewportSize({width,height:1000});await page.emulateMedia({colorScheme});
      for(const route of ['teos-LPCVD','teos-PECVD','tmga-MOCVD']){
        await page.locator(`[data-defect-recipe="${route}"]`).click();
        await page.locator('#cv-defects').screenshot({path:path.join(output,`defect-atlas-${route}-${width}-${colorScheme}.png`)});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${width}px ${route}: page overflow`);
      }
    }
    // The teaching reveal must advance, pause and stop when its view is hidden.
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.locator('#cv-defect-play').click();
    assert.equal(await page.evaluate(()=>window.CVDDefects.snapshot().step),0);
    await page.waitForFunction(()=>window.CVDDefects.snapshot().step===1,{},{timeout:4000});
    await page.locator('#cv-defect-play').click();
    const paused=await page.evaluate(()=>window.CVDDefects.snapshot().step);
    await page.waitForTimeout(2400);assert.equal(await page.evaluate(()=>window.CVDDefects.snapshot().step),paused);
    await page.locator('#cv-defect-play').click();
    await page.waitForFunction(()=>window.CVDDefects.snapshot().step===2&&!window.CVDDefects.snapshot().playing,{},{timeout:8500});
    await page.locator('#cv-defect-play').click();await page.locator('[data-lab-view="environment"]').click();
    assert.equal(await page.evaluate(()=>window.CVDDefects.snapshot().playing),false);
    const integrity=await page.evaluate(()=>({
      badRefs:[...document.querySelectorAll('a.cv-cite-link')].filter(a=>!document.querySelector(a.hash)||!a.title).length,
      nestedInteractive:document.querySelectorAll('#cv-defects button a').length,
    }));
    assert.deepEqual(integrity,{badRefs:0,nestedInteractive:0});assert.deepEqual(errors,[]);
    console.log('Defect checks passed: all ten recipe routes, twelve sourced examples, distinct diagram modes, evidence-transfer limits, independent setpoints, reference return, reduced motion, teaching-reveal playback, view switching and desktop/mobile light/dark layouts.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
