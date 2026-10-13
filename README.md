# CVD Lab

**By S L RICHRIS** · Interactive chemical vapour deposition simulator.

This package contains the latest professional site design and a Python
launcher for hosting it on Streamlit Community Cloud from GitHub.

Updated 13 October 2026: includes the latest pipeline touch explanations,
nine-recipe guide, and definitions of plasma, PECVD, polysilicon and epitaxial silicon.

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
- Six precursor choices, nine supported reference recipes, and APCVD,
  LPCVD, and PECVD where appropriate to the selected chemistry.
- Animated molecular reactions, deposited-film roles, and atom colour keys.
- Seven-step VLSI fabrication pipeline with short hover, tap and keyboard-focus explanations.
- CVD teaching guide, nine-recipe comparison, plasma / PECVD and silicon definitions, and 22 source links.
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
rates or a validated process model. The material roles, reaction notes,
and original scientific references remain in the simulator.

## Validation

The original launcher passed AppTest, but the deployed app displayed blank
animation canvases. The launcher now uses Streamlit 1.65.0's native iframe
API to preserve the complete document and its JavaScript context. Live visual
verification of this fix is pending.

## Hosting documentation

- [Streamlit deployment instructions](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy)
- [Streamlit dependencies](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies)
- [Streamlit HTML and JavaScript rendering](https://docs.streamlit.io/develop/api-reference/text/st.iframe)
- [GitHub file uploads](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

© 2026 S L RICHRIS. All rights reserved.
