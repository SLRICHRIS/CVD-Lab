# CVD Lab

**By S L RICHRIS** · Interactive chemical vapour deposition simulator.

This package contains the latest professional site design and a Python
launcher for hosting it on Streamlit Community Cloud from GitHub.

Scientific citation audit and proofreading, 23 October 2026: 74 claim records map to 32 sources,
with numbered citations beside definitions, recipe values, net equations,
material roles, component explanations and fabrication descriptions.

## Upload to GitHub

1. Extract `CVD-Lab-GitHub-Streamlit.zip` on your computer.
2. Create a GitHub repository, for example `cvd-lab`.
3. Open the repository and choose **Add file → Upload files**.
4. Upload the extracted files and folders **inside** the project folder.
   The repository root should contain `app.py`, `requirements.txt`,
   `README.md`, `LICENSE.txt`, the `site` folder, and `.streamlit/config.toml`.
5. Commit the files to your `main` branch.

**Upload the extracted contents, not the ZIP itself.** If Windows hides the
`.streamlit` folder, include it using GitHub Desktop, or create
`.streamlit/config.toml` through GitHub's **Add file → Create new file**.

## Host on Streamlit

1. Open [Streamlit Community Cloud](https://share.streamlit.io/).
2. Sign in and connect your GitHub account.
3. Click **Create app**, then **Yup, I have an app**.
4. Choose your GitHub repository and use these settings:

| Setting | Value |
| --- | --- |
| Repository | Your GitHub repository, for example `your-username/cvd-lab` |
| Branch | `main` |
| Main file path | `app.py` |
| Python version, in Advanced settings | `3.12` |

5. Click **Deploy**. Streamlit installs `requirements.txt` automatically.

This app does not require API keys, secrets, a database, Node.js, or a
frontend build. Your existing ChatGPT Site is a separate deployment.

## Run on your computer

Install Python 3.12, open a terminal in the extracted folder, then run:

```bash
python -m venv .venv
```

Activate the environment on Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Or on macOS / Linux:

```bash
source .venv/bin/activate
```

Then install and launch:

```bash
python -m pip install -r requirements.txt
python -m streamlit run app.py
```

Open the local URL printed by Streamlit, usually `http://localhost:8501`.

## What is included

- Rotatable chamber cutaways with machine part labels and inspection.
- Seven precursor choices, ten supported reference recipes, and APCVD,
  LPCVD, PECVD and MOCVD views where appropriate to the selected chemistry.
- GaN MOCVD from TMGa/ammonia, with a bubbler, separate delivery lines,
  cooled showerhead and heated susceptor cutaway.
- Animated molecular reactions, deposited-film roles, and atom colour keys.
- Seven process groups in an illustrative VLSI fabrication overview, with
  cited hover, tap and keyboard-focus explanations.
- CVD teaching guide, ten-recipe comparison, plasma / PECVD, MOCVD and silicon
  definitions, and 32 numbered references with source types and exact locators.
- Navy, cobalt, teal, and violet design accents, responsive layouts,
  keyboard controls, and S L RICHRIS copyright.

## Project files

| File | Purpose |
| --- | --- |
| `app.py` | Streamlit launcher; embeds the complete simulator with JavaScript |
| `requirements.txt` | Pinned Streamlit dependency |
| `.streamlit/config.toml` | Streamlit appearance and toolbar settings |
| `site/index.html` | Complete HTML, CSS, and JavaScript simulator |
| `site/favicon.svg` | Browser icon |
| `docs/CLAIMS.md` | Generated claim-to-source register, qualifications and bibliography |
| `scripts/check_evidence.py` | Dependency-free evidence integrity check and register generator |
| `tests/evidence-dom.cjs` | DOM checks for recipe switching, cited fields and reference navigation |
| `tests/citations.cjs` | Browser regression checks across recipes and citation navigation |
| `package.json` | Optional development dependencies; no frontend build is required |
| `.gitignore` | Keeps local environments and secrets out of Git |
| `LICENSE.txt` | Copyright notice |

To edit the design, teaching content, recipes, or reaction graphics, edit
`site/index.html`. The launcher reads this file directly, so there is one
simulator source to maintain. To view the standalone page, open that file
in a modern browser.

## How it works

Python starts the Streamlit app. `st.iframe(SITE / "index.html", height="content")`
embeds the complete bundled document with JavaScript enabled. The chamber,
chemical animation, recipe selection, and controls run together inside the
iframe. Its height adapts to the content, including expanded teaching guides.

The animation is an educational schematic. Film thickness and playback
speed are normalised demonstration values, not measured deposition
rates or a validated process model. Temperature exploration does not solve
growth kinetics. The model scope is stated within the simulator.

## Scientific evidence

Select a numbered citation beside a claim to open its reference. Each entry
includes the author or institution, title, date when available, source type,
link, page/table/section and the limits of its use. The evidence registry is
embedded in `site/index.html`; citations work in the standalone file without
fetching a separate JSON file. External source documents require internet access.

The complete mapping is in [docs/CLAIMS.md](docs/CLAIMS.md). Research articles,
facility recipes, university teaching material, manufacturer documentation and
patents are identified separately. The three LPCVD teaching sliders combine
a nominal NYCU example with a separate lecture range; the resulting combinations
are not claimed to be qualified for NYCU's tool.

All 32 references were checked against their linked assertions. The register
records the checked copy and verification method. Mixed citations identify the
specific source's role: a facility gas list supports a feed pairing, while a
separate equation source establishes net stoichiometry. The obsolete vapour
delivery link was replaced with the official 1150C datasheet; bibliography dates
and silicon/SiC, cleaning and TEOS citation scopes were corrected. This source
review is separate from the automated citation-integrity checks.

The process labels describe different attributes: AP/LP concern pressure, PE
concerns plasma activation, and MO concerns precursor chemistry. They can overlap.
Select **Trimethylgallium (TMGa)** to open the thermal, reduced-pressure GaN MOCVD
preset. Its fixed 1050 °C / 200 Torr example is Liang et al.'s sample T2; the
prepared buffer/template on sapphire is already present. The showerhead
architecture has a separate source and does not reproduce that experiment's tool.

Nine net equations are atom-balanced teaching summaries. The TEOS PECVD view
is a qualitative species map; displayed molecule counts are not reaction
coefficients or gas-flow ratios. The source patent does not provide a complete
plasma-exhaust mechanism. See the register for the corresponding source and
scope for each reaction.

Scientific proofreading also corrected the film backdrop to preserve complete
formula-unit proportions, including Si:O = 1:2 and Si:N = 3:4. Film spheres
represent idealised composition; their positions do not depict crystal structure
or a bonding network. Impurities, defects and nonstoichiometry are omitted.
Reaction phases illustrate net atom redistribution rather than an elementary
mechanism. RF-off pauses the demonstration and does not predict residual thermal
growth. Vapour generation and gas-flow metering are described as separate functions.
The N₂O drawing now uses the cited N≡N⁺–O⁻ resonance contributor with formal
charge labels; lone pairs are omitted. This representation does not assert
measured atomic charges or a plasma reaction pathway.

After changing scientific content or reference metadata, update the relevant
claim in `cv-evidence-data`, bind the displayed claim using `data-cite` or its
recipe evidence mapping, and regenerate the register:

```bash
python scripts/check_evidence.py --write-doc
python scripts/check_evidence.py
```

Optional interaction checks were tested with Node.js 24.19.0. Install the
development-only dependencies and run the DOM checks:

```bash
npm install
npm test
```

For real-browser checks, also install Playwright's Chromium:

```bash
npx playwright install chromium
npm run test:browser
```

Set `CVD_CHROMIUM_EXECUTABLE` to use an existing compatible Chromium executable.

## Validation

The evidence graph and generated register pass the dependency-free integrity
check. DOM checks pass for all ten presets, 107 component states, stage/RF/
temperature changes, nine rendered balanced equations, the formula-unit
proportions of the film backdrops and animated films, citation targets,
reference focus/return and seven fabrication explanations. Canvas is stubbed
in the DOM checks, so those results do not establish visual correctness.

The separate browser regression test also passes in headless Chromium, with
real canvas rendering and desktop (1440 px) plus mobile (390 px) light/dark
layout checks. Focused screenshots of the workspace, metrics and a reference
entry, plus the MOCVD workspace, were visually reviewed. Test screenshots are written to `test-results/`
and are not committed.

The Streamlit launcher is unchanged by this audit. It uses the documented
[`st.iframe` API](https://docs.streamlit.io/develop/api-reference/text/st.iframe)
to embed the bundled HTML with JavaScript enabled and content-based height.
Standalone-browser verification is distinct from testing a deployed Community
Cloud instance; the live deployment has not been verified in this audit.

## Hosting documentation

- [Streamlit deployment instructions](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy)
- [Streamlit dependencies](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies)
- [Streamlit HTML and JavaScript rendering](https://docs.streamlit.io/develop/api-reference/text/st.iframe)
- [GitHub file uploads](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

© 2026 S L RICHRIS. All rights reserved.

