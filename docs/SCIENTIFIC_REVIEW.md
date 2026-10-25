# Scientific proofreading of CVD Lab

Review date: 23 October 2026. Baseline: `main` commit `75c1ee89f3f129889447359d30cd1b6e9a5e96e6`.

The review covers all ten included presets, scientific teaching text, reaction and molecular drawings, shared-state behaviour, the transport explorer, twelve defect examples and every reference-to-claim mapping. The resulting register contains **92 claims and 45 references**. Exact source locations, access methods and qualifications are recorded in [CLAIMS.md](CLAIMS.md); the same information is available beside the claims in the application.

This is scientific content and implementation review. It does not establish experimental calibration, reactor engineering fidelity, process qualification or exhaustive coverage of CVD chemistries and defects.

## Corrections made

| Finding | Correction | Verification |
| --- | --- | --- |
| Correct atom counts concealed distorted carbon geometry in TEOS and TMGa. Ethene was planar but its local angles were misleading. | Constructed ideal tetrahedral saturated-carbon centres and trigonal planar ethene. Preserved the planar C₃Ga monomer illustration. | Independently checked production 3D coordinates, local angles, connectivity, elemental inventories and bond-order sums. General geometry uses [44](CLAIMS.md#ref-44); the separate TMGa comparison uses [45](CLAIMS.md#ref-45). |
| Water and ammonia shapes needed a more explicit geometric basis. | Used the water angle and pyramidal-ammonia figure in the cited teaching reference. | Water is drawn at 104.5°; ammonia follows the 106.8° label in [44](CLAIMS.md#ref-44), Fig. 7.18. These are reference teaching geometries, not reactor-temperature structural measurements. |
| Environment glyphs discarded bond multiplicity even though the atom-balance view retained it. | Rendered multiple bonds and N₂O formal-charge signs in the environment glyphs. | Observed actual rendering calls: N₂O draws a triple N–N and single N–O bond; ethene retains C=C. The N₂O contributor and formal charges remain linked to [32](CLAIMS.md#ref-32). |
| Molecular drawings had no separate, explicit geometry provenance. | Added a recipe-dependent geometry note and citations. | The TMGa route adds [45](CLAIMS.md#ref-45); other molecular drawings use [44](CLAIMS.md#ref-44). Bond lengths, TEOS Si–O–C angle and torsions are declared drawing choices. Neither source is presented as evidence for transition states or a plasma mechanism. |
| Unbonded TEOS PECVD atoms could be mistaken for identified exhaust fragments. | Labelled them an **unassigned C/H/O atom inventory** and explained their bookkeeping role. | The view remains qualitative: one displayed TEOS and O₂ pair is an illustrative inventory, without an asserted gas ratio, balanced exhaust equation or identified atomic exhaust. |
| RF status described active power outside the deposition stage. | Applied the same stage/enabled condition to the power chip, activation explanation, overlay and accessible description. | Both PECVD presets are checked through load, condition, deposition, purge and unload, including disabled RF. The stage sequence is identified as a teaching control. |
| Added-film patches were visible at zero growth. | Showed added patches only when demonstration growth is positive. | Renderer checks verify no added patches during load/condition. The prepared GaN template and W nucleation surface remain explicit. |
| Reference 35 omitted the lead author by treating IBM's affiliated-contributor list as the full author list. | Corrected attribution to **N. C. C. Lu et al.** | Publisher-deposited metadata for DOI `10.1149/1.2115724` identifies the lead author; the IBM abstract supplies the limited scientific support. No complete author order was guessed. |
| The reference 24 pressure-control PDF link returned 404. | Replaced it with the official MKS copy. | [MKS guide, PDF p. 1](https://www.mks.com/mam/celum/celum_assets/resources/dwnstrem.pdf#page=1) explicitly connects pressure sensing, controller feedback, throttle conductance and the pump. |
| Selected source conditions could be read as validating the generic reactor drawing. | Disclosed the A200V face-down/feed-from-below configuration and the TiN patent's face-down, lamp-heated wafer. | The generic face-up local view and heated holder are distinguished from those source tools. The TiN patent's secondary wall plasma remains explicitly omitted. See [4](CLAIMS.md#ref-4) and [7](CLAIMS.md#ref-7). |
| The transport equations lacked an explicit sign convention and complete units. | Defined z away from the surface and J as positive toward it, with units for D, δ, k, C and J. Aligned the concentration overlay's height scale. | Independent Fick-flux and surface-sink checks agree throughout the profile over seven rate ratios. |
| Grain-boundary trap markers could imply direct imaging of individual sites. | Clarified that markers illustrate the electrical trapping model. | The polysilicon evidence remains an abstract-level, boron-doped study; no individual atomic trap site or undoped-preset defect density is inferred. |

The source review also reconfirmed pressure/activation/precursor classification, material roles, the prepared GaN substrate stack, fabrication-overview scope, source-specific gas dilution, and the separation of gas metering from vapour generation. Known malformed lecture equations remain excluded from chemical evidence.

## Reference conditions

These are cited examples and explicitly identified teaching selections. They are not transferable operating recipes. Each route's feed, temperature and pressure citations update together.

| Preset | Displayed condition or range | Source / transfer limit |
| --- | --- | --- |
| SiH₄ PECVD oxide | 300 °C; 1.0 Torr; 5% SiH₄ in N₂ + N₂O; 30 W | Toronto facility example [1](CLAIMS.md#ref-1). Stanford's He dilution is a separate feed-pairing source. |
| SiH₄ LPCVD poly-Si | 620 °C; 0.300 Torr; SiH₄ | NYCU nominal example [2](CLAIMS.md#ref-2). The 575–650 °C slider comes separately from [3](CLAIMS.md#ref-3). |
| SiH₄/O₂ APCVD oxide | 400 °C selected within 350–450 °C; atmospheric | A200V manufacturer range [4](CLAIMS.md#ref-4); generic drawing differs from its wafer orientation. |
| DCS/NH₃ LPCVD nitride | 800 °C; 0.120 Torr | NYCU example [2](CLAIMS.md#ref-2); independent 700–800 °C lecture range [3](CLAIMS.md#ref-3). |
| TEOS LPCVD oxide | 700 °C; 0.120 Torr | NYCU example [2](CLAIMS.md#ref-2); independent 650–750 °C lecture range [3](CLAIMS.md#ref-3). |
| TEOS/O₂/He PECVD oxide | 350 °C selected; 350–400 °C, 2–4 Torr, 2–3 kW source ranges | Equipment-specific 300 mm patent values [8](CLAIMS.md#ref-8), without a complete exhaust mechanism. |
| SiCl₄/H₂ APCVD epitaxy | 1200 °C example; 1150–1250 °C range; atmospheric | Conventional background Tables I–II in [5](CLAIMS.md#ref-5), distinct from the patent's bromosilane invention. |
| WF₆/H₂ LPCVD tungsten | 400 °C selected within 400–500 °C; 0.500 Torr | Measured study [6](CLAIMS.md#ref-6); bulk growth assumes a prepared nucleation surface. |
| TiCl₄/NH₃/Ar LPCVD TiN | Preferred 650 °C; 450–650 °C range; 0.150 Torr | Primary-growth patent example [7](CLAIMS.md#ref-7); source geometry and wall-plasma system are not reconstructed. |
| TMGa/NH₃ MOCVD GaN | Fixed 1050 °C; 200 Torr | Liang et al., T2 [30](CLAIMS.md#ref-30), on a prepared buffer/template on sapphire. Showerhead architecture comes separately from [31](CLAIMS.md#ref-31). |

The three NYCU/lecture combinations are teaching syntheses. No qualified NYCU operating window is inferred. Source RF powers describe different equipment and are not directly comparable plasma intensities.

## Net chemistry

All nine numerical net equations conserve each element. Conservation validates the displayed bookkeeping; it does not establish an elementary pathway, reaction selectivity, complete exhaust composition or an equilibrium calculation.

| Route | Atom-balanced net equation | Chemical source |
| --- | --- | --- |
| SiH₄/N₂O oxide | SiH₄ + 2 N₂O → SiO₂ + 2 N₂ + 2 H₂ | [9](CLAIMS.md#ref-9); feed pairing separately [11](CLAIMS.md#ref-11) |
| SiH₄ poly-Si | SiH₄ → Si + 2 H₂ | [9](CLAIMS.md#ref-9) |
| SiH₄/O₂ oxide | SiH₄ + O₂ → SiO₂ + 2 H₂ | [9](CLAIMS.md#ref-9); process pairing separately [4](CLAIMS.md#ref-4) |
| DCS nitride | 3 SiH₂Cl₂ + 4 NH₃ → Si₃N₄ + 6 HCl + 6 H₂ | Peev et al., Eq. (1), [21](CLAIMS.md#ref-21) |
| Thermal TEOS oxide | Si(OC₂H₅)₄ → SiO₂ + 4 C₂H₄ + 2 H₂O | Teaching slide 26, [10](CLAIMS.md#ref-10) |
| SiCl₄ silicon | SiCl₄ + 2 H₂ → Si + 4 HCl | [9](CLAIMS.md#ref-9), with background epitaxy context [5](CLAIMS.md#ref-5) |
| WF₆ tungsten | WF₆ + 3 H₂ → W + 6 HF | [9](CLAIMS.md#ref-9); HF measurement separately [6](CLAIMS.md#ref-6) |
| TiCl₄ TiN | 6 TiCl₄ + 8 NH₃ → 6 TiN + N₂ + 24 HCl | Patent background equation [7](CLAIMS.md#ref-7) |
| TMGa GaN | Ga(CH₃)₃ + NH₃ → GaN + 3 CH₄ | Zhu, Eq. (3.1), [29](CLAIMS.md#ref-29) |

TEOS PECVD is deliberately excluded from this numerical table. Its patent supports oxide deposition from TEOS/O₂/He, but supplies no complete balanced plasma-exhaust equation.

Film spheres preserve complete ideal formula units, including Si:O = 1:2 and Si:N = 3:4. Their placement represents composition. No solid-state coordination network, crystallographic structure, impurity content or measured stoichiometry is inferred from those spheres.

## Transport model

The explorer uses the final coupled-flux expression in [33](CLAIMS.md#ref-33), PDF pp. 8–10. It assumes a steady one-dimensional layer, constant diffusivity, no gas-phase consumption and a first-order surface sink:

- `km = D/delta`, `Da = ks/km`.
- `J = km(Cb − Cs) = ks Cs`.
- `Cs/Cb = 1/(1+Da)` and `J/(km Cb) = Da/(1+Da)`.
- `C(z)/Cb = Cs/Cb + (1−Cs/Cb) z/delta`.

The positive flux magnitude J is toward the wafer; z increases away from it. The signed z-flux is `−D dC/dz`. With a consistent concentration basis, D has units length²/time, δ length, k length/time, C amount/volume and J amount/(area·time). The mathematical checks cover both boundary values, monotonic limiting behaviour, equality to the surface sink and constant flux across the profile. Recipe temperature and pressure do not supply kinetic constants or a calibrated Da.

## Defect evidence

All twelve observations and their scope statements agree with the registry and remain linked to the correct recipe. The review retains these distinctions:

- Electrical hysteresis/trapping interpretations are separated from identified atomic structures; chamber powder is separated from demonstrated wafer contamination.
- The LPCVD particle study is shown as an evidence gap for the APCVD comparison. It supplies no atmospheric threshold or validated wafer-defect prediction.
- Crack, trench-fill, peeling, seam and chlorine studies use different thicknesses, topographies, stacks, equipment or conditions from the selected presets.
- The epitaxial-Si abstract supports stacking faults at material level; it does not establish SiCl₄ chemistry.
- The GaN carbon entry uses the same sample series as T2. Correlation of SIMS carbon with photoluminescence does not uniquely identify a microscopic defect complex.
- The GaN dislocation example uses a separate growth sequence; no T2 dislocation density or Burgers vector is assigned.

The diagrams, marker counts and teaching reveals are qualitative. Exact diagnostics, locators, evidence-fit labels and transfer limits for every case are in the [defect coverage table](CLAIMS.md#defect-coverage-and-evidence-transfer).

## Access and evidence limits

Every reference records a checked copy and verification method. Available full text, teaching figures, source tables, manufacturer descriptions and patent passages were used within their stated scope. Abstract-only or indexed-extract checks remain labelled as such, especially [35](CLAIMS.md#ref-35), [40](CLAIMS.md#ref-40), [41](CLAIMS.md#ref-41), [42](CLAIMS.md#ref-42), [43](CLAIMS.md#ref-43) and the new TMGa source [45](CLAIMS.md#ref-45). No unreviewed full-text figure or exact experimental geometry is attributed to those sources.

The OpenStax ammonia drawing follows the label in Fig. 7.18; §8.2 gives a slightly different approximate ammonia angle. The lab uses the cited figure as a teaching geometry and makes no precision measurement claim. Similarly, the TMGa drawing's ideal 120°/tetrahedral geometry is distinct from the electron-diffraction fit.

The largest remaining scientific limitations are the unverified atmospheric transfer of particle evidence, unverified precursor in the epitaxial-fault abstract, abstract-level detail for several defect studies, and the absence of calibrated kinetics, exhaust speciation, CFD, plasma physics or defect-incidence modelling. They are visible qualifications, not results supplied by this review.

## Implementation checks

The evidence-integrity check, DOM suite, all three Chromium suites, Python compilation and whitespace check passed. Focused TEOS, TMGa, N₂O and qualitative atom-inventory panels were visually inspected at desktop/mobile widths, including light/dark rendering. No clipping or page overflow was found in those checks.

Validation commands:

```bash
python scripts/check_evidence.py --write-doc
npm test
npm run test:browser
python -m py_compile app.py scripts/check_evidence.py
git diff --check
```

The DOM suite checks 17 molecular inventories, valences and formal-charge sums; ideal local angles and ethene coplanarity; rendered multiple bonds; zero-growth film visibility; ten presets; 107 component states; all nine balanced equations; film proportions; geometry citations; and reference navigation. The separate Chromium suites check real canvas execution, recipe/region/defect citation changes, RF stage consistency, conserved model flux, playback, reduced motion and desktop/mobile light/dark layouts.

The Streamlit launcher is unchanged. Browser verification of the bundled page is separate from verification of a deployed Streamlit instance; the live deployment has not been tested by this review. Automated tests establish implementation and citation integrity, with scientific support assessed separately against the sources above.
