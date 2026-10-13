"""CVD Lab by S L RICHRIS — Streamlit entrypoint."""

from pathlib import Path
import re

import streamlit as st


ROOT = Path(__file__).resolve().parent
SITE = ROOT / "site"


def build_simulator_html() -> str:
    """Reuse the complete simulator, with page styles scoped to its own root."""
    document = (SITE / "index.html").read_text(encoding="utf-8")
    styles = re.findall(r"<style>([\s\S]*?)</style>", document)
    main = re.search(r"<main\b[^>]*>([\s\S]*?)</main>", document)
    if not styles or main is None:
        raise ValueError("The bundled site/index.html is missing its styles or main content.")

    # The standalone page styles must not restyle Streamlit's body or main.
    styles[0] = re.sub(
        r"(?<![\w-])(?:html|body|main)(?=\s*\{)",
        "#cvd-recipe-accuracy",
        styles[0],
    )
    scoped_styles = "\n".join(f"<style>{css}</style>" for css in styles)
    # The root now holds both the page padding and the page width.
    scoped_styles += "<style>#cvd-recipe-accuracy { box-sizing:border-box; }</style>"
    return scoped_styles + main.group(1)


def main() -> None:
    st.set_page_config(
        page_title="CVD Lab — S L RICHRIS",
        page_icon=SITE / "favicon.svg",
        layout="wide",
        initial_sidebar_state="collapsed",
        menu_items={
            "About": "CVD Lab by S L RICHRIS. An educational chemical vapour deposition simulator.",
        },
    )
    # Only execute the trusted HTML/JavaScript shipped with this repository.
    # Native HTML rendering preserves normal page scrolling and expanding guides.
    st.html(build_simulator_html(), unsafe_allow_javascript=True)


if __name__ == "__main__":
    main()
