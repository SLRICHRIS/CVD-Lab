"""Validate the embedded evidence graph and keep its review document in sync.

No network or third-party dependencies are required. This checks citation
integrity; source-to-claim entailment still requires a human scientific review.
"""

from __future__ import annotations

import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]


class EvidenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.registry_parts: list[str] = []
        self.in_registry = False
        self.ids: list[str] = []
        self.bindings: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        for attr in ("data-cite", "data-fab-cite"):
            self.bindings.extend((values.get(attr) or "").split())
        if tag == "script" and values.get("id") == "cv-evidence-data":
            self.in_registry = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "script":
            self.in_registry = False

    def handle_data(self, data: str) -> None:
        if self.in_registry:
            self.registry_parts.append(data)


def markdown(data: dict) -> str:
    lines = [
        "# CVD Lab claim-to-source register",
        "",
        f"Scientific source review: {data['reviewed']}. Source page/section names below are locators, not web-search line numbers.",
        "",
        "This document is generated from the evidence registry embedded in `site/index.html`. Run `python scripts/check_evidence.py --write-doc` after editing that registry. The standalone simulator needs no frontend build or network request to render its citations.",
        "",
        "## Evidence policy",
        "",
        "- A numbered citation supports the adjacent assertion, within the locator and scope stated below.",
        "- Facility recipes, research articles, university material, patents and manufacturer documentation are identified separately. A patent is not presented as peer-reviewed validation.",
        "- A nominal facility setpoint combined with a broader lecture range is an educational synthesis. The combination is not claimed to be tool-qualified or experimentally tested.",
        "- Balanced net equations conserve atoms, but do not establish elementary surface mechanisms or a complete measured exhaust composition.",
        "- Model choices and interface counts are properties of this implementation; they are not attributed to external literature.",
        "",
        "## Changes made during the citation audit",
        "",
        "- Replaced the DCS/ammonia equation attribution to a facility gas list with Peev et al., Eq. (1), a research article with the actual balanced equation. The malformed nitride lines in the lecture sources are not used as chemical evidence.",
        "- Kept Toronto nitrogen dilution separate from Stanford’s helium dilution; Toronto supports the displayed 300 °C / 1000 mTorr / 30 W example.",
        "- Identified the SiCl₄ range as background Table I and its 1200 °C example as background Table II in EP0114876B1, not results of that patent’s bromosilane invention.",
        "- Marked the TEOS PECVD window and RF power as equipment-specific patent values for the described 300 mm equipment.",
        "- Made the TEOS PECVD view a qualitative species map. Its illustrative atom pool does not assert a 1:1 TEOS:O₂ reaction or a measured organic-exhaust composition.",
        "- Disclosed the omitted secondary wall-heating plasma in the TiN patent. The drawing illustrates the primary thermal growth reaction only.",
        "- Replaced the inaccessible OSHA bulk-silicon link with a readable manufacturer process report. Replaced the uninformative Applied Materials epitaxy landing page with the actual lecture sections on crystalline growth.",
        "- Limited the silicon-nitride role text to cited passivation/moisture-barrier applications; removed the oxidation-mask extension from a source that did not establish it.",
        "- Added sources for gas metering, vapour delivery, RF matching, pressure feedback and each fabrication explanation.",
        "- Added a GaN MOCVD preset with the TMGa/ammonia net equation, sample T2 conditions from Liang et al., a prepared sapphire/buffer/template stack and separately sourced showerhead architecture. Pressure, activation and precursor-chemistry labels are distinguished.",
        "- Checked all 31 references against their linked assertions. Replaced the broken vapour-delivery URL with the official 1150C datasheet, corrected bibliography dates, rebound wafer cleaning and silicon-substrate claims, and removed the TEOS-specific attribution to an Oxford page that does not establish that feed pairing.",
        "- Added source-specific roles to mixed citations, so a facility gas list cannot be mistaken for the source of a balanced equation. Reference verification methods and checked copies are recorded below.",
        "- Scientific proofreading corrected film-backdrop elemental proportions, removed unsupported solid-network bonds, clarified animation and RF-off scope, and distinguished vapour supply from gas metering. Added a precisely located source for the N₂O resonance contributor and its displayed formal charges.",
        "- Added a continuous local growth environment with fifty recipe/region explanations, three overlays and shared recipe provenance. The 1D transport explorer derives normalised concentration and flux from the cited SFU coupled-resistance equation; its input ratio and tracer paths are explicitly exploratory.",
        "",
        "## Claim register",
        "",
        "| Claim ID | Assertion | Source and exact locator | Scope / qualification |",
        "| --- | --- | --- | --- |",
    ]
    escape = lambda text: str(text).replace("|", "\\|").replace("\n", " ")
    for key, claim in data["claims"].items():
        evidence = "; ".join(
            f"[{item['source']}](#ref-{item['source']}): {item['locator']}" + (f" — supports: {item['supports']}" if item.get('supports') else "")
            for item in claim["evidence"]
        )
        lines.append(f"| `{key}` | {escape(claim['statement'])} | {escape(evidence)} | {escape(claim.get('note', ''))} |")
    lines += ["", "## Model choices", ""]
    lines.extend(f"- {choice}" for choice in data["model_choices"])
    lines += ["", "## References", ""]
    for source in data["sources"]:
        lines += [
            f"<a id=\"ref-{source['id']}\"></a>",
            f"### [{source['id']}] {source['author']}",
            "",
            f"[{source['title']}]({source['url']}) ({source['year']}). **{source['kind']}.** Accessed {source['accessed']}.",
            "",
            f"Locator: {source['locator']}.",
            "",
            f"Supports: {source['scope']}",
            "",
            f"Scope: {source['limits']}",
        ]
        if source.get("alternate"):
            lines += ["", f"[{source['alternate_label']}]({source['alternate']})."]
        verification = source["verification"]
        lines += ["", f"Verification ({verification['date']}): [{verification['method']}]({verification['url']}). {verification['note']}"]
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write-doc", action="store_true", help="Regenerate docs/CLAIMS.md")
    args = parser.parse_args()
    html = (ROOT / "site/index.html").read_text()
    parsed = EvidenceParser()
    parsed.feed(html)
    assert parsed.registry_parts, "Missing embedded evidence registry"
    data = json.loads("".join(parsed.registry_parts))
    sources = {source["id"]: source for source in data["sources"]}
    claims = data["claims"]
    assert len(sources) == len(data["sources"]), "Duplicate source number"
    assert sorted(sources) == list(range(1, len(sources) + 1)), "Source numbers must be continuous"
    duplicates = [key for key, count in Counter(parsed.ids).items() if count > 1]
    assert not duplicates, f"Duplicate HTML IDs: {duplicates}"
    referenced = set()
    for source in sources.values():
        for field in ("author", "title", "year", "kind", "url", "locator", "scope", "limits", "accessed"):
            assert source.get(field), f"Reference {source['id']} has no {field}"
        assert urlparse(source["url"]).scheme == "https", f"Untrusted source scheme: {source['url']}"
        if source.get("alternate"):
            assert urlparse(source["alternate"]).scheme == "https", f"Untrusted alternate source: {source['id']}"
            assert source.get("alternate_label"), f"Reference {source['id']} needs a precise alternate-link label"
        verification = source.get("verification", {})
        for field in ("date", "method", "url", "note"):
            assert verification.get(field), f"Reference {source['id']} has no verification {field}"
        assert re.fullmatch(r"\d{4}-\d{2}-\d{2}", verification["date"]), f"Invalid verification date: {source['id']}"
        assert urlparse(verification["url"]).scheme == "https", f"Untrusted checked copy: {source['id']}"
    for key, claim in claims.items():
        assert claim["statement"] and claim["evidence"], f"Unsupported claim record: {key}"
        for item in claim["evidence"]:
            assert item["source"] in sources, f"{key}: missing source {item['source']}"
            assert item["locator"], f"{key}: missing claim-specific locator"
            if "supports" in item:
                assert item["supports"].strip(), f"{key}: empty source-support qualification"
            referenced.add(item["source"])
    assert referenced == sources.keys(), f"Unreferenced sources: {sources.keys() - referenced}"
    for key in parsed.bindings:
        assert key in claims, f"Unknown static citation binding: {key}"
    mappings = re.findall(r"'([a-z0-9]+-(?:APCVD|LPCVD|PECVD|MOCVD))':\{conditions:'([^']+)',window:'([^']+)',chemistry:'([^']+)',role:'([^']+)'\}", html)
    assert len(mappings) == 10, f"Expected ten distinct recipe evidence mappings, got {len(mappings)}"
    assert len({mapping[0] for mapping in mappings}) == len(mappings), "Duplicate recipe evidence mapping"
    for name, *keys in mappings:
        for key in keys:
            assert key in claims, f"{name}: unknown evidence key {key}"
    doc = ROOT / "docs/CLAIMS.md"
    generated = markdown(data)
    if args.write_doc:
        doc.parent.mkdir(exist_ok=True)
        doc.write_text(generated)
    assert doc.exists() and doc.read_text() == generated, "docs/CLAIMS.md is out of date; run with --write-doc"
    print(f"Evidence integrity passed: {len(claims)} claims, {len(sources)} sources, {len(parsed.bindings)} static bindings, {len(mappings)} recipe mappings.")


if __name__ == "__main__":
    main()
