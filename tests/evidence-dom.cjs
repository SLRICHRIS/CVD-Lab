/* DOM/interaction regression checks without a browser process.
 * Requires jsdom as a development-only dependency.
 * Canvas calls are stubbed: these checks do not claim visual verification.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require(process.env.CVD_JSDOM_MODULE || 'jsdom');

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', error => { if (error.type !== 'css-parsing') errors.push(error.message); });
const html = fs.readFileSync(path.resolve(__dirname, '../site/index.html'), 'utf8');
// Observe the actual atoms passed to the renderer without adding a production
// debug API. This checks composition, not canvas pixels or crystal geometry.
const drawHook = 'function drawReaction(){';
const atomHook = 'function ball(context,atom,opacity=1,labels=true){';
const bondHook = 'function molecularBond(context,a,b,order=1,opacity=1){';
const glyphHook = 'function moleculeGlyph(formula,p,colour,magnify=1){';
const glyphEnd = '        }\n        const traces=[];';
const envHook = 'function render(now=performance.now()){';
for (const hook of [drawHook, atomHook, bondHook, glyphHook, glyphEnd, envHook]) assert.equal(html.split(hook).length, 2, `Missing or ambiguous renderer observation point: ${hook}`);
const observedHtml = html.replace(drawHook, drawHook + 'window.__reactionAtoms=[];window.__reactionBonds=[];')
  .replace(atomHook, atomHook + 'if(context===reactionCtx)window.__reactionAtoms.push({symbol:atom.symbol,solid:Boolean(atom.target?.solid),opacity,formalCharge:atom.formalCharge||0});')
  .replace(bondHook, bondHook + 'if(context===reactionCtx&&opacity>0)window.__reactionBonds.push({a:a.symbol,b:b.symbol,order});')
  .replace(envHook, envHook + 'window.__environmentGlyphs=[];window.__filmPatches=[];')
  .replace(glyphHook, glyphHook + 'const savedStroke=ctx.stroke;let strokes=0;ctx.stroke=()=>{strokes++;savedStroke.call(ctx);};')
  .replace(glyphEnd, '          ctx.stroke=savedStroke;window.__environmentGlyphs.push({formula,strokes});\n' + glyphEnd)
  .replace("if(fill){ctx.fillStyle=fill;ctx.fill();}", "if(fill){if(fill===filmColours[s.material])window.__filmPatches.push(alpha);ctx.fillStyle=fill;ctx.fill();}");
const dom = new JSDOM(observedHtml, {
  url: 'https://cvd-lab.test/', runScripts: 'dangerously', virtualConsole,
  beforeParse(window) {
    window.matchMedia = query => ({ matches: query.includes('reduced-motion'), addEventListener() {}, removeEventListener() {} });
    window.ResizeObserver = class { observe() {} disconnect() {} };
    window.requestAnimationFrame = () => 1;
    window.cancelAnimationFrame = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    window.HTMLElement.prototype.getBoundingClientRect = function () {
      const width = this.classList.contains('cv-molecules') ? 330 : 800;
      const height = this.classList.contains('cv-molecules') ? 330 : 470;
      return { x: 0, y: 0, left: 0, top: 0, right: width, bottom: height, width, height };
    };
    window.HTMLCanvasElement.prototype.getContext = function () {
      const reaction = this.id === 'cv-reaction-canvas';
      const context = {
        measureText: text => ({ width: String(text).length * 7 }), createRadialGradient: () => ({ addColorStop() {} }), createLinearGradient: () => ({ addColorStop() {} }),
        clearRect() { if (reaction) window.__reactionTexts = []; },
        fillText(text) { if (reaction && context.globalAlpha > 0) window.__reactionTexts.push(text); },
      };
      return new Proxy(context, { get(target, key) { return key in target ? target[key] : () => {}; } });
    };
  },
});
const { document } = dom.window;
assert.ok(dom.window.CVDEvidence, 'Evidence engine did not initialize');
const query = selector => { const element = document.querySelector(selector); assert.ok(element, selector); return element; };
function change(selector, value) {
  const element = query(selector); element.value = value; element.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
}
function refs(selector) { return [...query(selector).querySelectorAll(':scope > .cv-citations a')].map(link => Number(link.dataset.reference)); }
function expectRefs(selector, expected) { assert.deepEqual(refs(selector), [...expected].sort((a, b) => a - b), `Wrong or stale sources for ${selector}`); }
function withoutCitations(element) { return [...element.childNodes].filter(child => !child.classList?.contains('cv-citations')).map(child => child.textContent).join(' '); }
function atoms(formula) {
  const tokens = formula.match(/[A-Z][a-z]?|\d+|[()]/g); let pos = 0;
  function group() {
    const result = {};
    while (pos < tokens.length && tokens[pos] !== ')') {
      let part;
      if (tokens[pos] === '(') { pos++; part = group(); assert.equal(tokens[pos++], ')'); }
      else part = { [tokens[pos++]]: 1 };
      const n = /^\d+$/.test(tokens[pos] || '') ? Number(tokens[pos++]) : 1;
      for (const [element, count] of Object.entries(part)) result[element] = (result[element] || 0) + count * n;
    }
    return result;
  }
  return group();
}
function totals(side) {
  const result = {};
  for (const term of side.split('+')) {
    const [, coefficient, formula] = term.trim().match(/^(\d+)?\s*(.+)$/);
    for (const [element, count] of Object.entries(atoms(formula))) result[element] = (result[element] || 0) + count * Number(coefficient || 1);
  }
  return result;
}
function renderedCounts(atoms) {
  const result = {};
  for (const atom of atoms) result[atom.symbol] = (result[atom.symbol] || 0) + 1;
  return result;
}
// Inspect the production 3D coordinates independently of its construction
// helper. Correct counts alone cannot detect flattened or distorted centres.
const subtract=(a,b)=>a.map((v,i)=>v-b[i]);
function angle(a,centre,b){
  const u=subtract(a,centre),v=subtract(b,centre);
  return Math.acos(Math.max(-1,Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0)/Math.hypot(...u)/Math.hypot(...v))))*180/Math.PI;
}
function close(actual,expected,label){assert.ok(Math.abs(actual-expected)<1e-7,`${label}: ${actual} versus ${expected}`);}
const formulas=['SiH4','SiH2Cl2','SiCl4','TiCl4','CH4','Ga(CH3)3','WF6','Si(OC2H5)4','NH3','N2O','H2O','C2H4','H2','N2','O2','HCl','HF'];
for(const formula of formulas){
  const model=dom.window.CVDLab.molecularStructure(formula);
  assert.deepEqual(renderedCounts(model.atoms),atoms(formula),`${formula}: formula inventory`);
  assert.equal(model.atoms.reduce((sum,a)=>sum+(a.formalCharge||0),0),0,`${formula}: net formal charge`);
  const adjacent=model.atoms.map(()=>[]),valence=model.atoms.map(()=>0);
  for(const bond of model.bonds){
    assert.ok(Number.isInteger(bond.order)&&bond.order>=1&&bond.order<=3);
    adjacent[bond.a].push(bond.b);adjacent[bond.b].push(bond.a);valence[bond.a]+=bond.order;valence[bond.b]+=bond.order;
    close(Math.hypot(...subtract(model.atoms[bond.a].p,model.atoms[bond.b].p)),Math.hypot(...subtract(model.atoms[bond.a].q,model.atoms[bond.b].q)),`${formula}: rotation preserves bond length`);
  }
  model.atoms.forEach((a,i)=>{
    const target={H:1,C:4,Si:4,Ti:4,Ga:3,W:6,F:1,Cl:1,N:a.formalCharge===1?4:3,O:a.formalCharge===-1?1:2}[a.symbol];
    assert.equal(valence[i],target,`${formula}: ${a.symbol} bond-order sum`);
    const n=adjacent[i];let ideal;
    if(n.length===4&&['Si','Ti','C'].includes(a.symbol))ideal=Math.acos(-1/3)*180/Math.PI;
    if(formula==='C2H4'&&a.symbol==='C'||formula==='Ga(CH3)3'&&a.symbol==='Ga')ideal=120;
    if(formula==='NH3'&&a.symbol==='N')ideal=106.8;
    if(formula==='H2O'&&a.symbol==='O')ideal=104.5;
    if(formula==='N2O'&&n.length===2)ideal=180;
    for(let j=0;j<n.length;j++)for(let k=j+1;k<n.length;k++){
      const value=angle(model.atoms[n[j]].p,a.p,model.atoms[n[k]].p);
      if(ideal!==undefined)close(value,ideal,`${formula}: angle at ${a.symbol}`);
      if(a.symbol==='W')assert.ok(Math.abs(value-90)<1e-7||Math.abs(value-180)<1e-7,`${formula}: octahedral angle`);
    }
  });
  if(formula==='C2H4'){
    assert.equal(model.bonds.filter(b=>b.order===2).length,1);
    // All six atoms lie in one plane, not merely each carbon's neighbours.
    const [a,b,c]=model.atoms,u=subtract(b.p,a.p),v=subtract(c.p,a.p),normal=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
    for(const atom of model.atoms)close(subtract(atom.p,a.p).reduce((sum,x,i)=>sum+x*normal[i],0),0,'Ethene coplanarity');
  }
}
function expectFilmComposition(formula, coefficient, label) {
  const unit = atoms(formula), rendered = dom.window.__reactionAtoms;
  const background = renderedCounts(rendered.filter(atom => atom.opacity === .32));
  assert.deepEqual(Object.keys(background).sort(), Object.keys(unit).sort(), `${label}: background elements`);
  const first = Object.keys(unit)[0], units = background[first] / unit[first];
  assert.ok(Number.isInteger(units) && units > 0, `${label}: complete background formula units`);
  for (const [element, count] of Object.entries(unit)) assert.equal(background[element], count * units, `${label}: background ${element} ratio`);
  const film = renderedCounts(rendered.filter(atom => atom.solid));
  const expected = Object.fromEntries(Object.entries(unit).map(([element, count]) => [element, count * coefficient]));
  assert.deepEqual(film, expected, `${label}: animated film composition`);
}
const cases = [
  ['silane', 'PECVD', [1], [1], [9, 11], [18]],
  ['silane', 'LPCVD', [2], [3], [9], [20]],
  ['silane', 'APCVD', [4], [4], [4, 9], [18]],
  ['dcs', 'LPCVD', [2], [3], [12, 21], [3, 19]],
  ['teos', 'LPCVD', [2], [3], [10], [18]],
  ['teos', 'PECVD', [8], [8], [8], [18]],
  ['sicl4', 'APCVD', [5], [5], [5, 9], [3]],
  ['wf6', 'LPCVD', [6], [6], [6, 9], [18, 22]],
  ['tmga', 'MOCVD', [30], [30], [29], [28]],
  ['ticl4', 'LPCVD', [7], [7], [7], [18, 22]],
];
let equations = 0, parts = 0;
for (const [precursor, mode, conditions, range, chemistry, role] of cases) {
  change('#cv-precursor', precursor);
  query(`[data-process="${mode}"]`).click();
  for (const field of ['#cv-temp', '#cv-pressure', '#cv-feed']) expectRefs(field, conditions);
  for (const field of ['#cv-env-temp', '#cv-env-pressure', '#cv-env-feed']) expectRefs(field, conditions);
  expectRefs('#cv-temp-window', range);
  expectRefs('#cv-equation', chemistry);
  expectRefs('#cv-chemistry-note', precursor === 'silane' && mode === 'PECVD' ? [...chemistry, 32] : chemistry);
  expectRefs('#cv-structure-note', precursor === 'tmga' ? [44,45] : [44]);
  assert.match(query('#cv-structure-note').textContent,/arbitrary drawing units/);
  if(precursor==='teos')assert.match(query('#cv-structure-note').textContent,/not a measured conformer/);
  expectRefs('#cv-role-use', role);
  const renderedEquation = withoutCitations(query('#cv-equation')).replace(/[₀-₉]/g, digit => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(digit))).replace(/\((?:gas|solid)\)/g, '').replace('→', '->');
  if (precursor === 'teos' && mode === 'PECVD') {
    assert.match(query('#cv-chemistry-note').textContent, /not gas ratios or a balanced equation/);
    assert.match(renderedEquation, /variable C\/H\/O/);
    expectFilmComposition('SiO2', 1, `${precursor}/${mode}`);
  } else {
    const [left, right] = renderedEquation.split('->'); assert.deepEqual(totals(left), totals(right), renderedEquation); equations++;
    const [, coefficient, formula] = right.split('+')[0].trim().match(/^(\d+)?\s*(.+)$/);
    expectFilmComposition(formula, Number(coefficient || 1), `${precursor}/${mode}`);
  }
  if (precursor === 'silane' && mode === 'PECVD') {
    const seek = query('#cv-reaction-progress');
    seek.value = 0; seek.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
    const charged = dom.window.__reactionAtoms.filter(atom => atom.formalCharge);
    assert.equal(charged.filter(atom => atom.symbol === 'N' && atom.formalCharge === 1).length, 2);
    assert.equal(charged.filter(atom => atom.symbol === 'O' && atom.formalCharge === -1).length, 2);
    const bonds = dom.window.__reactionBonds;
    assert.deepEqual(Array.from(bonds.filter(bond => bond.a === 'N' && bond.b === 'N'), bond => bond.order), [3, 3]);
    assert.deepEqual(Array.from(bonds.filter(bond => bond.a === 'N' && bond.b === 'O'), bond => bond.order), [1, 1]);
    for (const sign of ['+', '−']) assert.equal(dom.window.__reactionTexts.filter(text => text === sign).length, 2);
    const n2o=dom.window.__environmentGlyphs.filter(g=>g.formula==='N2O');
    assert.ok(n2o.length>0,'N₂O feed glyphs were not rendered');
    assert.ok(n2o.every(g=>g.strokes===4),'N₂O glyph must draw three N–N lines and one N–O line');
    seek.value = 1000; seek.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
    for (const sign of ['+', '−']) assert.equal(dom.window.__reactionTexts.filter(text => text === sign).length, 0, 'Input formal charges must fade before neutral products');
  }
  if(precursor==='teos'&&mode==='LPCVD'){
    const ethene=dom.window.__environmentGlyphs.filter(g=>g.formula==='C2H4');
    assert.ok(ethene.length>0&&ethene.every(g=>g.strokes===6),'Ethene glyph must retain its double bond');
  }
  const options = [...query('#cv-component').options].map(option => option.value);
  if (mode === 'MOCVD') {
    assert.equal(query('[data-process="MOCVD"]').getAttribute('aria-pressed'), 'true');
    for (const process of ['APCVD', 'LPCVD', 'PECVD']) assert.equal(query(`[data-process="${process}"]`).disabled, true);
    assert.equal(query('.cv-rf').hidden, true);
    assert.equal(query('#cv-rf-on').disabled, true);
    assert.equal(query('#cv-temperature').disabled, true);
    assert.equal(query('#cv-temperature').value, '1050');
    assert.match(query('#cv-pressure').textContent, /200 Torr/);
    assert.match(query('#cv-machine').textContent, /thermal showerhead reactor/);
    assert.match(query('#cv-atoms').textContent, /Ga.*gallium/);
    assert.ok(options.includes('bubbler'));
    assert.ok(!options.includes('plasma') && !options.includes('rfGenerator'));
    change('#cv-component', 'wafer'); expectRefs('#cv-inspector', [30]);
    change('#cv-component', 'bubbler'); expectRefs('#cv-inspector', [29]);
    change('#cv-component', 'showerhead'); expectRefs('#cv-inspector', [31]);
    query('#cv-flow').checked = true; query('#cv-flow').dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    for (const progress of [0, 250, 500, 750, 1000]) { query('#cv-reaction-progress').value = progress; query('#cv-reaction-progress').dispatchEvent(new dom.window.Event('input', { bubbles: true })); }
    assert.match(query('#cv-reaction-canvas').getAttribute('aria-label'), /Ga\(CH3\)3 \+ NH3 -> GaN \+ 3CH4/);
    expectRefs('#cv-machine', [31]); expectRefs('#cv-activation-state', [28, 29]);
  } else assert.equal(query('[data-process="MOCVD"]').disabled, true);
  for (const component of options) { change('#cv-component', component); assert.ok(refs('#cv-inspector').length, component); parts++; }
  for (const stage of ['load', 'condition', 'deposit', 'purge', 'unload', 'deposit']) {
    change('#cv-stage', stage); expectRefs('#cv-equation', chemistry);
    if(stage==='load'||stage==='condition')assert.equal(dom.window.__filmPatches.length,0,'No added film patches at zero growth');
  }
  const temperature = query('#cv-temperature');
  if (!temperature.disabled) { temperature.value = Number(temperature.value) === Number(temperature.max) ? temperature.min : temperature.max; temperature.dispatchEvent(new dom.window.Event('input', { bubbles: true })); expectRefs('#cv-temp', range); expectRefs('#cv-temp-window', range); expectRefs('#cv-env-temp', range); }
  if (mode === 'PECVD') {
    query('#cv-rf-on').checked = false; query('#cv-rf-on').dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    assert.match(query('#cv-growth-status').textContent, /animation paused: RF off/);
    assert.match(query('#cv-stage-detail').textContent, /residual thermal chemistry is not modelled/);
    expectRefs('#cv-equation', chemistry);
  }
}
assert.equal(equations, 9);
assert.equal(document.querySelectorAll('#cv-reference-list > li').length, 45);
assert.equal(query('#cv-precursor').options.length, 7);
assert.equal(document.querySelectorAll('.cv-recipes-table [data-cvd-type]').length, cases.length);
assert.equal(document.querySelectorAll('.cv-recipes-table thead th').length, 6);
assert.match(query('#cv-mocvd-definition').textContent, /MOVPE/);
// A gas-list citation must identify its narrower role beside a net equation.
change('#cv-precursor', 'silane'); query('[data-process="PECVD"]').click();
assert.match(query('#cv-equation a[data-reference="11"]').title, /feed pairing only/);
assert.match(query('#cv-equation a[data-reference="9"]').title, /Net equation/);
assert.match(query('#cv-ref-26').textContent, /1150C/);
assert.match(query('#cv-ref-27').textContent, /2018/);
assert.match(query('#cv-ref-17').textContent, /2023/);
assert.match(query('#cv-ref-10').textContent, /Shiang-Cheng Lu/);
assert.match(query('#cv-ref-30').textContent, /Checked source copy/);
assert.match(query('#cv-ref-35').textContent,/N\. C\. C\. Lu et al\./);
assert.match(query('#cv-ref-24 > a').href,/mks\.com\/mam\/celum\/celum_assets\/resources\/dwnstrem\.pdf/);
assert.match(query('#cv-ref-26 > a').href, /1150C-MFC-DS\.pdf/);
expectRefs('[data-cite="wafer"]', [16]);
for (const source of dom.window.CVDEvidence.sources.values()) {
  assert.ok(source.verification?.method, source.id);
  assert.match(query(`#cv-ref-${source.id}`).textContent, /Verification:/);
}
// Restore the last recipe before checking reference focus/return below.
change('#cv-precursor', 'ticl4');
const allIds = [...document.querySelectorAll('[id]')].map(element => element.id);
assert.equal(new Set(allIds).size, allIds.length, 'Duplicate element IDs');
for (const claim of document.querySelectorAll('[data-cite]')) assert.ok(claim.querySelector(':scope > .cv-citations a'), `Uncited claim: ${claim.dataset.cite}`);
for (const link of document.querySelectorAll('a.cv-cite-link')) { assert.ok(document.querySelector(link.hash), link.hash); assert.ok(link.title); assert.ok(link.getAttribute('aria-label')); }
query('#cv-pressure > .cv-citations a').click();
assert.equal(query('#cv-references').open, true);
assert.equal(document.activeElement.id, 'cv-ref-7');
query('#cv-ref-7 [data-evidence-back]').click();
assert.equal(document.activeElement.closest('[id]').id, 'cv-pressure');
// srcdoc hosting can prohibit history rewrites; citation navigation must survive.
dom.window.history.replaceState = () => { throw new dom.window.DOMException('History is unavailable in this iframe', 'SecurityError'); };
query('#cv-references').open = false;
query('#cv-pressure > .cv-citations a').click();
assert.equal(query('#cv-references').open, true);
assert.equal(document.activeElement.id, 'cv-ref-7');
for (const step of document.querySelectorAll('[data-fab-cite]')) {
  step.click(); assert.equal(query('#cv-fab-description').dataset.cite, step.dataset.fabCite);
  if (step.dataset.fabCite === 'fab-prepare') expectRefs('#cv-fab-description', [1]);
  if (step.dataset.fabCite === 'fab-oxidation') expectRefs('#cv-fab-description', [10]);
}
assert.deepEqual(errors, [], 'JavaScript execution errors');
dom.window.close();
console.log(`DOM evidence checks passed: 17 molecular inventories, valences and formal-charge sums; tetrahedral/planar/pyramidal/bent/linear/octahedral angles; glyph bond multiplicity; no added film at zero growth; ${cases.length} presets, all film compositions, ${parts} component states, nine balanced equations, stages, RF and temperature, geometry provenance, citation navigation and fabrication explanations. Canvas is stubbed; no visual-layout claim is made.`);
