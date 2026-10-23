/* Reaction-environment verification with real Chromium rendering.
 * The analytic explorer is checked against conservation and its boundary laws;
 * these tests do not establish reactor-specific calibration or CFD validity.
 */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium}=require('playwright');

(async()=>{
  const args=['--no-sandbox',...(process.env.CVD_SINGLE_PROCESS?['--single-process','--no-zygote','--disable-gpu']:[])];
  const browser=await chromium.launch({headless:true,args,...(process.env.CVD_CHROMIUM_EXECUTABLE?{executablePath:process.env.CVD_CHROMIUM_EXECUTABLE}:{})});
  try{
    const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.resolve(__dirname,'../site/index.html')).href);
    await page.waitForFunction(()=>window.CVDEnvironment&&window.CVDLab);
    assert.equal(await page.locator('#cv-environment').isVisible(),true);
    assert.equal(await page.locator('#cv-hardware-view').isVisible(),false);
    const models=await page.evaluate(()=>[.0001,.01,.1,1,10,100,10000].map(da=>window.CVDEnvironment.solveTransport(da)));
    let previousCs=2,previousFlux=-1;
    for(const model of models){
      const {cs,fraction,profile,da}=model;
      assert.ok(cs>0&&cs<1&&fraction>0&&fraction<1);
      assert.ok(cs<previousCs&&fraction>previousFlux);
      previousCs=cs;previousFlux=fraction;
      assert.ok(Math.abs(cs+fraction-1)<1e-12);
      assert.equal(profile[0].c,cs);assert.ok(Math.abs(profile.at(-1).c-1)<1e-12);
      // In arbitrary consistent units, Fick flux must equal the surface sink
      // and the reported flux at every profile segment (no accumulation).
      const D=.2,delta=1,Cb=2,ks=da*D/delta,J=fraction*D/delta*Cb;
      assert.ok(Math.abs(J-ks*cs*Cb)<1e-12);
      for(let i=1;i<profile.length;i++){
        const a=profile[i-1],b=profile[i];
        const fick=D*Cb*(b.c-a.c)/((b.z-a.z)*delta);
        assert.ok(Math.abs(fick-J)<1e-11,`Flux is not conserved at Da=${da}, z=${b.z}`);
      }
    }
    assert.equal(models[3].cs,.5);assert.equal(models[3].fraction,.5);
    assert.equal(await page.evaluate(()=>[0,-1,NaN,Infinity].every(da=>{try{window.CVDEnvironment.solveTransport(da);return false;}catch(e){return e instanceof RangeError;}})),true);
    const recipes=[['silane','PECVD',[1]],['silane','LPCVD',[2]],['silane','APCVD',[4]],['dcs','LPCVD',[2]],['teos','LPCVD',[2]],['teos','PECVD',[8]],['sicl4','APCVD',[5]],['wf6','LPCVD',[6]],['ticl4','LPCVD',[7]],['tmga','MOCVD',[30]]];
    async function refs(selector){return page.locator(selector).locator(':scope>.cv-citations a').evaluateAll(links=>links.map(a=>+a.dataset.reference));}
    for(const [precursor,process,conditions] of recipes){
      await page.selectOption('#cv-precursor',precursor);await page.locator(`[data-process="${process}"]`).click();
      for(const selector of ['#cv-env-temp','#cv-env-pressure','#cv-env-feed'])assert.deepEqual(await refs(selector),conditions,`${precursor}/${process}: ${selector}`);
      assert.match(await page.locator('#cv-env-canvas').getAttribute('aria-label'),new RegExp(process));
      for(const stage of ['delivery','activation','transport','surface','exhaust']){
        await page.locator(`[data-env-stage="${stage}"]`).click();
        assert.ok((await refs('#cv-env-explanation')).length,`${precursor}/${process}/${stage}: missing evidence`);
        if(stage==='transport')assert.deepEqual(await refs('#cv-env-explanation'),[33]);
        if(precursor==='wf6'&&stage==='exhaust')assert.deepEqual(await refs('#cv-env-explanation'),[6]);
        if(process==='MOCVD'&&stage==='delivery')assert.deepEqual(await refs('#cv-env-explanation'),[29,31]);
      }
      if(process==='PECVD'){
        await page.locator('[data-env-stage="activation"]').click();
        for(const stage of ['load','condition','deposit','purge','unload']){
          await page.selectOption('#cv-stage',stage);
          const chip=await page.locator('#cv-env-activation').textContent();
          const title=await page.locator('#cv-env-focus-title').textContent();
          if(stage==='deposit'){
            assert.match(chip,/RF ·/);assert.match(title,/RF creates/);
          }else{
            assert.match(chip,new RegExp('RF off · '+stage));assert.match(title,/RF off/);
            assert.match(await page.locator('#cv-env-explanation').textContent(),new RegExp('current stage is '+stage));
          }
        }
        await page.selectOption('#cv-stage','deposit');
        await page.uncheck('#cv-rf-on');assert.match(await page.locator('#cv-env-status').textContent(),/RF off/);
        assert.match(await page.locator('#cv-env-focus-title').textContent(),/RF off/);
        assert.match(await page.locator('#cv-env-activation').textContent(),/RF off/);
        assert.match(await page.locator('#cv-env-canvas').getAttribute('aria-label'),/RF is off; playback is paused/);
        await page.check('#cv-rf-on');
      }
    }
    for(const [da,cs,flux] of [['0.1','90.9%','9.1%'],['10','9.1%','90.9%'],['1','50.0%','50.0%']]){
      await page.locator(`[data-env-da="${da}"]`).click();
      assert.equal(await page.locator('#cv-env-cs').textContent(),cs);assert.equal(await page.locator('#cv-env-flux').textContent(),flux);
    }
    await page.locator('#cv-env-da').evaluate(el=>{el.value=2;el.dispatchEvent(new Event('input',{bubbles:true}));});
    assert.equal(await page.locator('#cv-env-da-value').textContent(),'100.0');
    assert.ok(!/NaN|Infinity/.test(await page.locator('#cv-env-profile-line').getAttribute('d')));
    await page.locator('[data-env-stage="transport"]').click();
    await page.locator('#cv-env-explanation .cv-citations a[data-reference="33"]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'cv-ref-33');
    await page.locator('#cv-ref-33 [data-evidence-back]').click();
    assert.equal(await page.evaluate(()=>document.activeElement.closest('[id]').id),'cv-env-explanation');
    await page.locator('#cv-env-canvas').press('ArrowLeft');
    assert.ok((await page.evaluate(()=>window.CVDEnvironment.snapshot().camera.yaw))<.3);
    await page.locator('#cv-env-reset').click();
    assert.equal(await page.evaluate(()=>window.CVDEnvironment.snapshot().camera.yaw),.3);
    const output=process.env.CVD_QA_OUTPUT||path.resolve(__dirname,'../test-results');fs.mkdirSync(output,{recursive:true});
    for(const [width,colorScheme] of [[1440,'light'],[390,'light'],[390,'dark']]){
      await page.setViewportSize({width,height:1000});await page.emulateMedia({colorScheme});
      await page.selectOption('#cv-precursor','tmga');
      for(const lens of ['species','energy','transport']){
        await page.locator(`[data-env-lens="${lens}"]`).click();
        await page.locator('.cv-env-scene').screenshot({path:path.join(output,`environment-${lens}-${width}-${colorScheme}.png`)});
      }
      await page.locator('#cv-environment').screenshot({path:path.join(output,`environment-full-${width}-${colorScheme}.png`)});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,`${width}px overflow`);
    }
    // Exercise real animation beyond the old eight-second stop, then verify
    // pause, speed changes and the single-pass alternative.
    await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});
    await page.locator('#cv-reaction-progress').evaluate(el=>{el.value=0;el.dispatchEvent(new Event('input',{bubbles:true}));});
    const still=await page.locator('#cv-env-canvas').evaluate(c=>c.toDataURL());
    await page.locator('#cv-env-play').click();
    await page.waitForFunction(()=>window.CVDLab.snapshot().elapsed>8.3,{},{timeout:14000});
    assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().running),true);
    assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().growth),1);
    assert.notEqual(await page.locator('#cv-env-canvas').evaluate(c=>c.toDataURL()),still);
    await page.locator('#cv-env-play').click();const paused=await page.evaluate(()=>window.CVDLab.snapshot().elapsed);
    await page.waitForTimeout(180);assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().elapsed),paused);
    await page.selectOption('#cv-env-speed','2');assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().speed),2);
    await page.uncheck('#cv-env-loop');await page.locator('#cv-play').click();
    await page.waitForFunction(()=>!window.CVDLab.snapshot().running,{},{timeout:8000});
    assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().growth),1);
    await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#cv-play').click();
    assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().running),false);
    // Reuse the context so single-process Chromium environments work too.
    await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();
    await page.waitForFunction(()=>window.CVDLab?.snapshot().running);
    await page.locator('#cv-env-play').click();
    assert.equal(await page.evaluate(()=>window.CVDLab.snapshot().running),false);
    assert.deepEqual(errors,[],'Browser JavaScript errors');
    console.log('Environment checks passed: ten recipe contexts, fifty cited process explanations, both PECVD recipes across five RF stages and RF-off accessibility, conserved 1D flux and boundary conditions, invalid-input handling, concentration controls, camera, reference return, continuous and single-pass playback, speed/pause/reduced-motion controls and desktop/mobile light/dark rendering.');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
