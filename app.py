"""CVD Lab by S L RICHRIS: Streamlit entrypoint."""

from pathlib import Path

import streamlit as st


SITE = Path(__file__).resolve().parent / "site"


def main() -> None:
    st.set_page_config(
        page_title="CVD Lab: S L RICHRIS",
        page_icon=SITE / "favicon.svg",
        layout="wide",
        initial_sidebar_state="collapsed",
        menu_items={
            "About": "CVD Lab by S L RICHRIS. An educational chemical vapour deposition simulator.",
        },
    )
    # The embedded document supplies its own gutters. Keep the host padding
    # compact while leaving the Streamlit toolbar accessible above the lab.
    st.html("""
        <style>
        [data-testid="stMainBlockContainer"] {
            padding: 4rem 1rem 1rem;
        }
        @media (max-width: 700px) {
            [data-testid="stMainBlockContainer"] {
                padding: 3.75rem 0.25rem 0.75rem;
            }
        }
        </style>
    """)
    # Keep the full document in its own browser context so canvas scripts,
    # document queries, styles, and animation events work together.
    st.iframe(
        SITE / "index.html",
        height="content",
        alt="Interactive CVD chamber and molecular reaction simulator",
    )


if __name__ == "__main__":
    main()
