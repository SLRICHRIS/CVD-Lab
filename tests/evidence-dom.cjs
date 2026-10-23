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
const dom = new JSDOM(html, {
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
      const context = { measureText: text => ({ width: String(text).length * 7 }), createRadialGradient: () => ({ addColorStop() {} }) };
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
  expectRefs('#cv-temp-window', range);
  expectRefs('#cv-equation', chemistry);
  expectRefs('#cv-role-use', role);
  const renderedEquation = withoutCitations(query('#cv-equation')).replace(/[₀-₉]/g, digit => String('₀₁₂₃₄₅₆₇₈₉'.indexOf(digit))).replace(/\((?:gas|solid)\)/g, '').replace('→', '->');
  if (precursor === 'teos' && mode === 'PECVD') {
    assert.match(query('#cv-chemistry-note').textContent, /not gas ratios or a balanced equation/);
    assert.match(renderedEquation, /variable C\/H\/O/);
  } else {
    const [left, right] = renderedEquation.split('->'); assert.deepEqual(totals(left), totals(right), renderedEquation); equations++;
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
  for (const stage of ['load', 'condition', 'deposit', 'purge', 'unload', 'deposit']) { change('#cv-stage', stage); expectRefs('#cv-equation', chemistry); }
  const temperature = query('#cv-temperature');
  if (!temperature.disabled) { temperature.value = Number(temperature.value) === Number(temperature.max) ? temperature.min : temperature.max; temperature.dispatchEvent(new dom.window.Event('input', { bubbles: true })); expectRefs('#cv-temp', range); expectRefs('#cv-temp-window', range); }
  if (mode === 'PECVD') {
    query('#cv-rf-on').checked = false; query('#cv-rf-on').dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    assert.match(query('#cv-growth-status').textContent, /RF off/); expectRefs('#cv-equation', chemistry);
  }
}
assert.equal(equations, 9);
assert.equal(document.querySelectorAll('#cv-reference-list > li').length, 31);
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
assert.match(query('#cv-ref-30').textContent, /Reviewed full text/);
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
console.log(`DOM evidence checks passed: ${cases.length} presets, ${parts} component states, stage/RF/temperature changes, nine rendered balanced equations, MOCVD delivery/substrate/activation, all citation targets, reference focus/return and seven fabrication explanations. Canvas is stubbed; no visual-layout claim is made.`);
