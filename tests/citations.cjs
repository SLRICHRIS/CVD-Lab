/* Browser regression checks: node tests/citations.cjs
 * Requires Playwright with Chromium installed; neither is a runtime dependency.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

(async () => {
  const args = ['--no-sandbox', ...(process.env.CVD_SINGLE_PROCESS ? ['--single-process', '--no-zygote', '--disable-gpu'] : [])];
  const browser = await chromium.launch({ headless: true, args, ...(process.env.CVD_CHROMIUM_EXECUTABLE ? { executablePath: process.env.CVD_CHROMIUM_EXECUTABLE } : {}) });
  const outputDir = process.env.CVD_QA_OUTPUT || path.resolve(__dirname, '../test-results');
  fs.mkdirSync(outputDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(path.resolve(__dirname, '../site/index.html')).href);
  await page.waitForFunction(() => window.CVDEvidence && document.querySelectorAll('#cv-component option').length > 0);

  async function expectReferences(selector, expected) {
    const actual = await page.locator(selector).locator(':scope > .cv-citations a').evaluateAll(links => links.map(link => Number(link.dataset.reference)));
    assert.deepEqual(actual, [...expected].sort((a, b) => a - b), `${selector}: wrong or stale citation`);
  }
  const recipes = [
    { p: 'silane', mode: 'PECVD', conditions: [1], chemistry: [9, 11], role: [18], t: '300', window: [1], eq: 'SiH4 + 2N2O -> SiO2 + 2N2 + 2H2' },
    { p: 'silane', mode: 'LPCVD', conditions: [2], chemistry: [9], role: [20], t: '620', window: [3], eq: 'SiH4 -> Si + 2H2' },
    { p: 'silane', mode: 'APCVD', conditions: [4], chemistry: [4, 9], role: [18], t: '400', window: [4], eq: 'SiH4 + O2 -> SiO2 + 2H2' },
    { p: 'dcs', mode: 'LPCVD', conditions: [2], chemistry: [12, 21], role: [3, 19], t: '800', window: [3], eq: '3SiH2Cl2 + 4NH3 -> Si3N4 + 6HCl + 6H2' },
    { p: 'teos', mode: 'LPCVD', conditions: [2], chemistry: [10], role: [18], t: '700', window: [3], eq: 'Si(OC2H5)4 -> SiO2 + 4C2H4 + 2H2O' },
    { p: 'teos', mode: 'PECVD', conditions: [8], chemistry: [8], role: [18], t: '350', window: [8] },
    { p: 'sicl4', mode: 'APCVD', conditions: [5], chemistry: [5, 9], role: [3], t: '1200', window: [5], eq: 'SiCl4 + 2H2 -> Si + 4HCl' },
    { p: 'wf6', mode: 'LPCVD', conditions: [6], chemistry: [6, 9], role: [18, 22], t: '400', window: [6], eq: 'WF6 + 3H2 -> W + 6HF' },
    { p: 'tmga', mode: 'MOCVD', conditions: [30], chemistry: [29], role: [28], t: '1050', window: [30], eq: 'Ga(CH3)3 + NH3 -> GaN + 3CH4' },
    { p: 'ticl4', mode: 'LPCVD', conditions: [7], chemistry: [7], role: [18, 22], t: '650', window: [7], eq: '6TiCl4 + 8NH3 -> 6TiN + N2 + 24HCl' },
  ];
  for (const recipe of recipes) {
    await page.selectOption('#cv-precursor', recipe.p);
    await page.locator(`[data-process="${recipe.mode}"]`).click();
    assert.ok((await page.locator('#cv-temp').textContent()).startsWith(`${recipe.t} °C`));
    for (const field of ['#cv-temp', '#cv-pressure', '#cv-feed']) await expectReferences(field, recipe.conditions);
    await expectReferences('#cv-temp-window', recipe.window);
    await expectReferences('#cv-equation', recipe.chemistry);
    await expectReferences('#cv-role-use', recipe.role);
    for (const stage of ['load', 'condition', 'deposit', 'purge', 'unload', 'deposit']) {
      await page.selectOption('#cv-stage', stage);
      await expectReferences('#cv-equation', recipe.chemistry);
    }
    const componentOptions = await page.locator('#cv-component option').evaluateAll(options => options.map(option => option.value));
    for (const part of componentOptions) {
      await page.selectOption('#cv-component', part);
      assert.ok(await page.locator('#cv-inspector > .cv-citations a').count(), `Uncited part: ${recipe.p}/${recipe.mode}/${part}`);
    }
    if (recipe.mode === 'PECVD') {
      await page.uncheck('#cv-rf-on');
      assert.match(await page.locator('#cv-growth-status').textContent(), /RF off/);
      await expectReferences('#cv-equation', recipe.chemistry);
      await page.check('#cv-rf-on');
    }
    if (!(await page.locator('#cv-temperature').isDisabled())) {
      await page.locator('#cv-temperature').evaluate(element => { element.value = Number(element.value) === Number(element.max) ? element.min : element.max; element.dispatchEvent(new Event('input', { bubbles: true })); });
      await expectReferences('#cv-temp-window', recipe.window);
      await expectReferences('#cv-temp', recipe.window);
    }
  }

  // Independently verify stoichiometric element conservation, including groups.
  function formulaCount(formula) {
    const tokens = formula.match(/[A-Z][a-z]?|\d+|[()]/g); let at = 0;
    const parseGroup = () => {
      const result = {};
      while (at < tokens.length && tokens[at] !== ')') {
        let atoms;
        if (tokens[at] === '(') { at++; atoms = parseGroup(); assert.equal(tokens[at++], ')'); }
        else atoms = { [tokens[at++]]: 1 };
        const n = /^\d+$/.test(tokens[at] || '') ? Number(tokens[at++]) : 1;
        for (const [element, count] of Object.entries(atoms)) result[element] = (result[element] || 0) + count * n;
      }
      return result;
    };
    return parseGroup();
  }
  function total(side) {
    const result = {};
    for (const term of side.split('+')) {
      const [, coefficient, formula] = term.trim().match(/^(\d+)?(.+)$/);
      for (const [element, count] of Object.entries(formulaCount(formula))) result[element] = (result[element] || 0) + count * Number(coefficient || 1);
    }
    return result;
  }
  for (const recipe of recipes.filter(recipe => recipe.eq)) {
    const [left, right] = recipe.eq.split('->');
    assert.deepEqual(total(left), total(right), `Unbalanced net equation: ${recipe.eq}`);
  }
  // Every rendered citation resolves to a real, unique reference, with a locator.
  const integrity = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
    return {
      duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
      missing: [...document.querySelectorAll('a.cv-cite-link')].filter(a => !document.querySelector(a.hash) || !a.title || !a.getAttribute('aria-label')).map(a => a.outerHTML),
      bareClaims: [...document.querySelectorAll('[data-cite]')].filter(element => !element.querySelector(':scope > .cv-citations a')).map(element => element.dataset.cite),
      sources: document.querySelectorAll('#cv-reference-list > li').length,
    };
  });
  assert.deepEqual(integrity.duplicateIds, []);
  assert.deepEqual(integrity.missing, []);
  assert.deepEqual(integrity.bareClaims, []);
  assert.equal(integrity.sources, 31);
  // Hidden reference details must open when a claim is selected, with focus and return.
  await page.locator('#cv-pressure > .cv-citations a').click();
  assert.equal(await page.locator('#cv-references').evaluate(element => element.open), true);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'cv-ref-7');
  await page.locator('#cv-ref-7 [data-evidence-back]').click();
  assert.equal(await page.evaluate(() => document.activeElement.closest('[id]').id), 'cv-pressure');
  for (const key of ['fab-prepare', 'fab-oxidation', 'fab-lithography', 'fab-etch', 'cvd-definition', 'fab-doping', 'fab-metal']) {
    await page.locator(`[data-fab-cite="${key}"]`).click();
    assert.equal(await page.locator('#cv-fab-description').getAttribute('data-cite'), key);
    assert.ok(await page.locator('#cv-fab-description > .cv-citations a').count());
  }
  // Qualitative plasma output must never look like a balanced one-O2 equation.
  await page.selectOption('#cv-precursor', 'teos');
  await page.locator('[data-process="PECVD"]').click();
  assert.match(await page.locator('#cv-equation').textContent(), /variable C\/H\/O/);
  assert.match(await page.locator('#cv-chemistry-note').textContent(), /not gas ratios or a balanced equation/);

  // TMGa selects the MOCVD preset, with thermal activation and the correct substrate.
  await page.selectOption('#cv-precursor', 'tmga');
  assert.equal(await page.locator('[data-process="MOCVD"]').getAttribute('aria-pressed'), 'true');
  for (const mode of ['APCVD', 'LPCVD', 'PECVD']) assert.equal(await page.locator(`[data-process="${mode}"]`).isDisabled(), true);
  assert.equal(await page.locator('.cv-rf').isVisible(), false);
  assert.equal(await page.locator('#cv-temperature').isDisabled(), true);
  await expectReferences('#cv-activation-state', [28, 29]);
  await expectReferences('#cv-machine', [31]);
  await page.selectOption('#cv-component', 'wafer');
  assert.match(await page.locator('#cv-inspector').textContent(), /GaN template on sapphire/);
  await expectReferences('#cv-inspector', [30]);
  await page.selectOption('#cv-component', 'bubbler'); await expectReferences('#cv-inspector', [29]);
  await page.selectOption('#cv-component', 'showerhead'); await expectReferences('#cv-inspector', [31]);
  await page.check('#cv-flow');
  for (const value of [0, 250, 500, 750, 1000]) {
    await page.locator('#cv-reaction-progress').evaluate((element, progress) => { element.value = progress; element.dispatchEvent(new Event('input', { bubbles: true })); }, value);
    assert.match(await page.locator('#cv-reaction-canvas').getAttribute('aria-label'), /Ga\(CH3\)3 \+ NH3 -> GaN \+ 3CH4/);
  }
  assert.equal(await page.locator('.cv-recipes-table [data-cvd-type]').count(), recipes.length);

  for (const [width, height, colorScheme] of [[1440, 1000, 'light'], [390, 844, 'light'], [390, 844, 'dark']]) {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ colorScheme });
    await page.locator('#cv-cvd-guide').evaluate(element => element.open = true);
    await page.locator('#cv-recipes-guide').evaluate(element => element.open = true);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${width}px: unexpected page overflow`);
    await page.screenshot({ path: path.join(outputDir, `cvd-qa-${width}-${colorScheme}.png`), fullPage: true });
    await page.locator('.cv-workspace').screenshot({ path: path.join(outputDir, `mocvd-workspace-${width}-${colorScheme}.png`) });
    await page.locator('#cv-studio').screenshot({ path: path.join(outputDir, `mocvd-controls-${width}-${colorScheme}.png`) });
    await page.locator('#cv-ref-26').screenshot({ path: path.join(outputDir, `citation-reference-${width}-${colorScheme}.png`) });
  }
  assert.deepEqual(errors, [], 'Browser JavaScript errors');
  await browser.close();
  console.log('Citation browser checks passed: ten recipes, all available parts and stages, temperature/RF controls, nine balanced net equations, MOCVD chemistry/delivery/substrate, reference navigation, light/dark mobile layouts.');
})().catch(error => { console.error(error); process.exitCode = 1; });
