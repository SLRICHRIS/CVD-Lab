# CVD Lab claim-to-source register

Scientific source review: 2026-10-23. Source page/section names below are locators, not web-search line numbers.

This document is generated from the evidence registry embedded in `site/index.html`. Run `python scripts/check_evidence.py --write-doc` after editing that registry. The standalone simulator needs no frontend build or network request to render its citations.

## Evidence policy

- A numbered citation supports the adjacent assertion, within the locator and scope stated below.
- Facility recipes, research articles, university material, patents and manufacturer documentation are identified separately. A patent is not presented as peer-reviewed validation.
- A nominal facility setpoint combined with a broader lecture range is an educational synthesis. The combination is not claimed to be tool-qualified or experimentally tested.
- Balanced net equations conserve atoms, but do not establish elementary surface mechanisms or a complete measured exhaust composition.
- Model choices and interface counts are properties of this implementation; they are not attributed to external literature.

## Changes made during the citation audit

- Replaced the DCS/ammonia equation attribution to a facility gas list with Peev et al., Eq. (1), a research article with the actual balanced equation. The malformed nitride lines in the lecture sources are not used as chemical evidence.
- Kept Toronto nitrogen dilution separate from Stanford’s helium dilution; Toronto supports the displayed 300 °C / 1000 mTorr / 30 W example.
- Identified the SiCl₄ range as background Table I and its 1200 °C example as background Table II in EP0114876B1, not results of that patent’s bromosilane invention.
- Marked the TEOS PECVD window and RF power as equipment-specific patent values for the described 300 mm equipment.
- Made the TEOS PECVD view a qualitative species map. Its illustrative atom pool does not assert a 1:1 TEOS:O₂ reaction or a measured organic-exhaust composition.
- Disclosed the omitted secondary wall-heating plasma in the TiN patent. The drawing illustrates the primary thermal growth reaction only.
- Replaced the inaccessible OSHA bulk-silicon link with a readable manufacturer process report. Replaced the uninformative Applied Materials epitaxy landing page with the actual lecture sections on crystalline growth.
- Limited the silicon-nitride role text to cited passivation/moisture-barrier applications; removed the oxidation-mask extension from a source that did not establish it.
- Added sources for gas metering, vapour delivery, RF matching, pressure feedback and each fabrication explanation.
- Added a GaN MOCVD preset with the TMGa/ammonia net equation, sample T2 conditions from Liang et al., a prepared sapphire/buffer/template stack and separately sourced showerhead architecture. Pressure, activation and precursor-chemistry labels are distinguished.
- Checked all 31 references against their linked assertions. Replaced the broken vapour-delivery URL with the official 1150C datasheet, corrected bibliography dates, rebound wafer cleaning and silicon-substrate claims, and removed the TEOS-specific attribution to an Oxford page that does not establish that feed pairing.
- Added source-specific roles to mixed citations, so a facility gas list cannot be mistaken for the source of a balanced equation. Reference verification methods and checked copies are recorded below.
- Scientific proofreading corrected film-backdrop elemental proportions, removed unsupported solid-network bonds, clarified animation and RF-off scope, and distinguished vapour supply from gas metering. Added a precisely located source for the N₂O resonance contributor and its displayed formal charges.
- Added a continuous local growth environment with fifty recipe/region explanations, three overlays and shared recipe provenance. The 1D transport explorer derives normalised concentration and flux from the cited SFU coupled-resistance equation; its input ratio and tracer paths are explicitly exploratory.

## Claim register

| Claim ID | Assertion | Source and exact locator | Scope / qualification |
| --- | --- | --- | --- |
| `cvd-definition` | CVD forms solid films by gas/vapour reactions at a substrate; volatile products are removed. | [3](#ref-3): PDF p. 2; [9](#ref-9): Operation paragraph |  |
| `film-functions` | Deposited films can provide insulation, interconnect functions, protection or semiconductor layers. | [18](#ref-18): Opening paragraph and Fig. 9.3; [20](#ref-20): First paragraph; [19](#ref-19): Topography Simulation |  |
| `prepare` | Prepare/load the substrate and establish process conditions. | [9](#ref-9): Operation paragraph |  |
| `delivery` | Feed precursor and co-reactants; TEOS is delivered as vapour. | [9](#ref-9): Operation paragraph; [26](#ref-26): 1150C datasheet, PDF pp. 2–3, source materials and System Integration: heated source and delivery lines |  |
| `thermal-activation` | Heat activates thermal CVD in these presets. | [3](#ref-3): PDF pp. 2–3 |  |
| `surface-growth` | Gas transport, surface reaction and desorption are steps in CVD film formation. | [10](#ref-10): PDF p. 9, slide 18, steps (a), (c), (d) and (e) | The slide’s printed “Absorption” is not used to establish a distinction between absorption and adsorption. |
| `exhaust` | Exhaust removes unused feed and volatile products; shown loading and finishing stages are illustrative. | [9](#ref-9): Operation paragraph; [15](#ref-15): PECVD technology, final paragraph | Exact purge, cool and vent procedures are tool-specific and are not supplied here. |
| `wafer` | Silicon is a substrate material used in the silicon-based examples in this lab. | [16](#ref-16): §3.1, opening paragraph: crystalline silicon as the basic chip material | The selection of substrate materials is a model choice. The separate GaN/sapphire claim identifies the MOCVD stack. |
| `precursor` | A precursor supplies film-forming atoms; co-reactants participate in its conversion. | [9](#ref-9): Example reactions 1–5 |  |
| `carrier` | Ar and He serve as carrier/diluent gases in the stated TiN and TEOS examples. | [7](#ref-7): Preferred primary-reaction conditions: Ar flow — supports: Ar in the stated primary TiN feed.; [8](#ref-8): Description, helium-flow discussion — supports: He in the stated TEOS PECVD feed. |  |
| `plasma` | A partially ionised gas contains free electrons, ions and neutral species. | [14](#ref-14): What is Plasma? |  |
| `rf-power` | RF means radio frequency; the generator supplies energy for the discharge. | [25](#ref-25): Title and RF power discussion; [15](#ref-15): PECVD technology |  |
| `poly-structure` | Polycrystalline silicon has differently oriented grains separated by grain boundaries. | [16](#ref-16): §3.1.1, polycrystalline-material definition |  |
| `poly-role` | Appropriately doped and patterned polysilicon can be used for gates, short interconnects or resistors. | [20](#ref-20): First paragraph and doping discussion |  |
| `epi-structure` | Silicon homoepitaxy grows a single-crystal layer following its crystalline silicon substrate. | [3](#ref-3): PDF pp. 14–15 |  |
| `bulk-purity` | Polycrystalline describes grain structure; purified bulk polysilicon is also used as wafer feedstock. | [16](#ref-16): §3.1.1; [17](#ref-17): Metallurgical-silicon purification paragraph and Polysilicon glossary | The distinction between structure and purity is an explanatory inference from these separate descriptions. |
| `pecvd` | Plasma creates reactive species for surface deposition and often permits lower wafer temperatures. | [15](#ref-15): Opening definition and PECVD technology |  |
| `rf-frequency` | One documented RF equipment example is 13.56 MHz; other frequencies and combinations are used. | [15](#ref-15): PECVD technology, first paragraph; [13](#ref-13): Top feature list; dual-frequency system description |  |
| `type-ap` | Atmospheric thermal CVD can give high throughput; flow/transport and unwanted gas-phase reactions affect uniformity. | [3](#ref-3): PDF p. 3, APCVD comparison; [10](#ref-10): PDF pp. 10–12, transport, nucleation and APCVD |  |
| `type-lp` | Thermal LPCVD operates below atmospheric pressure and often provides uniform films at higher wafer temperatures. | [3](#ref-3): PDF pp. 3–4, 7, 9 |  |
| `type-pe` | The selected PECVD processes use reduced pressure and RF; plasma damage and film properties depend on conditions. | [1](#ref-1): PECVD oxide recipe table; [8](#ref-8): 300 mm wafer process conditions; [3](#ref-3): PDF p. 3, PECVD disadvantages; [13](#ref-13): PECVD feature list |  |
| `recipe-definition` | A recipe combines chemicals, pressure, temperature and activation; a precursor may give different films. | [1](#ref-1): PECVD recipe table; [2](#ref-2): Equipment Details, service items; [9](#ref-9): Example reactions |  |
| `chem-silane-PECVD` | SiH4 + 2N2O -> SiO2 + 2N2 + 2H2 | [9](#ref-9): Example reactions, silicon dioxide, second equation — supports: Net equation.; [11](#ref-11): Opening CCP precursor description — supports: Silane/N₂O oxide feed pairing only; Stanford uses He dilution, not the Toronto N₂ recipe. | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-silane-LPCVD` | SiH4 -> Si + 2H2 | [9](#ref-9): Example reactions, polysilicon | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-silane-APCVD` | SiH4 + O2 -> SiO2 + 2H2 | [9](#ref-9): Example reactions, silicon dioxide, first equation — supports: Net equation.; [4](#ref-4): A200V gas feed — supports: Atmospheric SiH₄/O₂ oxide process pairing, not equation stoichiometry. | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-dcs-LPCVD` | 3SiH2Cl2 + 4NH3 -> Si3N4 + 6HCl + 6H2 | [21](#ref-21): p. 276, Eq. (1) — supports: Balanced net equation (1).; [12](#ref-12): Overview and Gases — supports: LPCVD nitride and DCS/NH₃ feed pairing only. | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-teos-LPCVD` | Si(OC2H5)4 -> SiO2 + 4C2H4 + 2H2O | [10](#ref-10): PDF p. 13, slide 26, thermal TEOS equation | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-teos-PECVD` | TEOS and oxygen plasma form SiO2; the exhaust mixture is not specified stoichiometrically. | [8](#ref-8): Detailed Description, TEOS/O₂/He process and silicon-oxide applications; 300 mm process-conditions paragraph — supports: TEOS/O₂/He PECVD silicon oxide; no balanced exhaust equation is supplied. | Qualitative species map; no gas ratio or balanced plasma equation is claimed. |
| `chem-sicl4-APCVD` | SiCl4 + 2H2 -> Si + 4HCl | [9](#ref-9): Example reactions, silicon, first equation — supports: Net reduction equation.; [5](#ref-5): Description, PDF pp. 2–3, background Tables I–II, SiCl₄/H₂ epitaxy rows — supports: Conventional atmospheric epitaxy and SiCl₄/H₂ pairing. | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-wf6-LPCVD` | WF6 + 3H2 -> W + 6HF | [9](#ref-9): Example reactions, tungsten, H2 reduction — supports: Net reduction equation.; [6](#ref-6): Abstract, HF product and nucleation discussion — supports: Experimental W deposition from H₂/WF₆ with observed HF; not a full elementary mechanism. | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-ticl4-LPCVD` | 6TiCl4 + 8NH3 -> 6TiN + N2 + 24HCl | [7](#ref-7): Description, Background of the Invention, overall reaction | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `conditions-silane-PECVD` | 300 °C; 1.0 Torr; 5% SiH4 in N2 + N2O; 30 W. | [1](#ref-1): PECVD oxide table, second SiO2 row | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-silane-LPCVD` | NYCU nominal poly-Si example: 620 °C, 300 mTorr, SiH4. | [2](#ref-2): Service item (2), poly-Si entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-silane-APCVD` | A200V atmospheric SiH4/O2 example: 350–450 °C; 400 °C is the lab selection. | [4](#ref-4): A200V BASIC INFORMATION | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-dcs-LPCVD` | NYCU nitride example: 800 °C, 120 mTorr, SiH2Cl2 and NH3. | [2](#ref-2): Service item (3), nitride entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-teos-LPCVD` | NYCU thermal TEOS example: 700 °C, 120 mTorr, TEOS vapour. | [2](#ref-2): Service item (4), TEOS entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-teos-PECVD` | Patent example for 300 mm equipment: TEOS/O2/He, 350–400 °C, 2–4 Torr, 2–3 kW. | [8](#ref-8): Description, 300 mm wafer conditions after helium-flow discussion | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-sicl4-APCVD` | Conventional atmospheric SiCl4/H2 epitaxy: Table I gives 1150–1250 °C; Table II lists a 1200 °C example. | [5](#ref-5): Description, PDF p. 2, atmospheric-pressure paragraph and Table I; PDF p. 3, Table II, SiCl₄/H₂ row | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-wf6-LPCVD` | NIST study: H2/WF6 at 0.5 Torr and 400–500 °C; 400 °C is the lab selection. | [6](#ref-6): Abstract, experimental conditions | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-ticl4-LPCVD` | Patent primary TiN growth: about 150 mTorr, TiCl4/NH3/Ar, 450–650 °C; preferred wafer about 650 °C. | [7](#ref-7): Description, preferred conditions and preferred embodiment | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `window-silane-LPCVD` | Independent lecture temperature range: 575–650 °C. | [3](#ref-3): PDF p. 4 | Combined with a separate NYCU nominal example for teaching; not a tool-qualified NYCU operating window. |
| `window-dcs-LPCVD` | Independent lecture temperature range: about 700–800 °C. | [3](#ref-3): PDF p. 9 | Combined with a separate NYCU nominal example for teaching; not a tool-qualified NYCU operating window. |
| `window-teos-LPCVD` | Independent lecture temperature range: 650–750 °C. | [3](#ref-3): PDF p. 7 | Combined with a separate NYCU nominal example for teaching; not a tool-qualified NYCU operating window. |
| `role-oxide` | Silicon dioxide provides electrical insulation between wiring layers. | [18](#ref-18): Opening paragraph and Fig. 9.3(a) |  |
| `role-nitride` | Silicon nitride provides passivation and a moisture barrier in the cited application. | [19](#ref-19): Topography Simulation, passivation discussion; [3](#ref-3): PDF p. 9, nitride encapsulation |  |
| `role-poly` | Polysilicon is a semiconductor; suitable doping/patterning permits gate and resistor applications. | [20](#ref-20): First paragraph and doping discussion |  |
| `role-epi` | A silicon homoepitaxial layer follows the underlying crystal and can form a device layer. | [3](#ref-3): PDF pp. 14–15 and 19 |  |
| `role-tungsten` | Tungsten contact/via fill provides an electrical connection to wiring. | [18](#ref-18): Fig. 9.3(d); [22](#ref-22): Opening contact-metal description |  |
| `role-tin` | TiN is used as a contact liner/diffusion barrier. | [18](#ref-18): Opening barrier/adhesion description; [22](#ref-22): Opening TiN liner-barrier discussion |  |
| `part-reactor` | The schematic uses an enclosure, heated wafer support, gas feed and exhaust. | [9](#ref-9): Chamber description and Operation; [10](#ref-10): PDF p. 13, slide 25 |  |
| `part-flow` | A gas mass flow controller measures and controls gas feed. | [23](#ref-23): Overview — supports: Gas metering and control; vapour generation is a separate function. |  |
| `part-vapour` | A source vessel and heated line can supply TEOS vapour. | [26](#ref-26): 1150C datasheet, PDF pp. 2–3, source materials and System Integration: heated source and delivery lines |  |
| `part-pressure` | A gauge senses pressure and a throttle valve varies conductance to the vacuum pump. | [24](#ref-24): PDF p. 1, pressure-control sequence |  |
| `part-rf` | Generator and matching network deliver RF energy to a plasma. | [25](#ref-25): RF power and matching-network paragraphs |  |
| `part-showerhead` | The depicted PECVD upper electrode distributes gas through a showerhead and receives RF. | [13](#ref-13): PECVD feature list near page top |  |
| `part-furnace` | A batch LPCVD furnace can contain a reaction tube, spaced wafers, a boat, heaters and a pump. | [10](#ref-10): PDF p. 13, slide 25; [2](#ref-2): Equipment description |  |
| `part-conveyor` | An inline APCVD design moves wafers beneath gas heads over a heater. | [4](#ref-4): AMAX800V / AMAX1200 continuous-processing descriptions | Available architecture example only; no currently selected recipe uses the conveyor illustration. |
| `part-nucleation` | Bulk tungsten growth can use a prepared nucleation surface. | [22](#ref-22): Opening contact-via/nucleation discussion; [6](#ref-6): Abstract, initial nucleation |  |
| `fab-prepare` | Wafer preparation cleans/prepares the substrate for patterning and fabrication. | [1](#ref-1): Photolithography Wetbench: substrate cleaning, photoresist coating and processing |  |
| `fab-oxidation` | Thermal oxidation forms an oxide on a silicon surface. | [10](#ref-10): PDF p. 15, slide 30, dry oxidation: Si + O₂ → SiO₂ |  |
| `fab-lithography` | Photolithography exposes and develops photoresist to transfer a pattern. | [27](#ref-27): §1.2.1 |  |
| `fab-etch` | Etching removes selected wafer material through a patterned mask. | [27](#ref-27): §1.2.2 |  |
| `fab-doping` | Doping/implantation introduces impurities to alter semiconductor electrical properties. | [27](#ref-27): §1.2.5 |  |
| `fab-metal` | Patterned metal contacts and interconnects connect devices. | [27](#ref-27): §1.2, device example; [18](#ref-18): Fig. 9.3, interconnect sequence |  |
| `fab-repeat` | Deposition, lithography and etching repeat across device and interconnect layers. | [18](#ref-18): Fig. 9.3 and subsequent metal-level processing; [27](#ref-27): §1.2, Fig. 1.7 | The seven displayed nodes are an illustrative overview, not a universal chronological fabrication sequence. |
| `mocvd-definition` | MOCVD uses metal-organic precursors for semiconductor epitaxy; the thermal GaN example uses TMGa and ammonia. MOVPE is an alternative name in epitaxial growth. | [28](#ref-28): MOCVD technology overview, opening explanation — supports: Thermal GaN growth and TMGa/NH₃ precursors.; [29](#ref-29): §§3.1.1–3.1.2, pp. 45–46 — supports: MOVPE terminology and GaN net-chemistry context. | This preset is thermal; MOCVD does not itself specify pressure or plasma activation. |
| `mocvd-classification` | AP/LP describe pressure, PE describes plasma assistance and MO describes precursor chemistry. The selected MOCVD example is also a reduced-pressure thermal process. | [3](#ref-3): CVD methods comparison, pp. 2–3 — supports: Pressure and activation labels in the CVD comparison.; [28](#ref-28): MOCVD technology overview, thermal decomposition explanation — supports: Metal-organic precursor chemistry and thermal activation.; [30](#ref-30): §2 and Table 1, T2 pressure 200 Torr — supports: Reduced pressure (200 Torr) for this specific example. | Classification is a teaching synthesis; the four selector labels are not mutually exclusive physical categories. |
| `chem-tmga-MOCVD` | Idealised GaN net growth: Ga(CH3)3 + NH3 → GaN + 3CH4; TMGa supplies Ga and ammonia supplies N. | [29](#ref-29): §3.1.2, p. 46, Eq. (3.1) and surrounding discussion | Atom-balanced summary only. Molecular geometry, bond paths and exhaustive methane selectivity are not established by this equation. |
| `conditions-tmga-MOCVD` | Liang et al. sample T2 uses TMGa/NH3 at 1050 °C and 200 Torr for the final GaN layer. | [30](#ref-30): p. 2, §2, TMGa/NH₃ sources; p. 3, Table 1, row T2 | Fixed reported example. No continuous operating window, carrier selection or gas-flow ratio is inferred. |
| `role-gan` | GaN is a compound semiconductor used in LED heterostructures. | [28](#ref-28): MOCVD technology overview, GaN and GaN/InGaN LED multilayer example | The illustrated GaN layer is not a complete LED or a prediction of light output. |
| `part-mocvd` | A close-coupled MOCVD architecture separates precursor streams, cools the showerhead and heats a rotating susceptor. | [31](#ref-31): Close Coupled Showerhead® explanation, gas separation, water cooling and resistance-heated susceptor paragraphs | Representative cutaway; not the dimensions or confirmed geometry of the cited growth experiment. The local environment illustrates time-scaled rotation; the hardware cutaway does not simulate the drive mechanics. |
| `part-mo-delivery` | Liquid TMGa can be delivered from a temperature-controlled bubbler using carrier gas and flow control. | [29](#ref-29): §§3.1.3–3.1.4, printed pp. 50–54, Figs. 3.5–3.6: MFCs, carrier gas, bubbler and bath | No bubbler temperature, delivery flow or source-consumption calculation is modelled. |
| `structure-n2o` | N≡N⁺–O⁻ is one Lewis resonance contributor for nitrous oxide; the signs are formal charges. | [32](#ref-32): PDF p. 11, GCh24-11, second Lewis structure; PDF p. 9, resonance definition | The molecular drawing shows this contributor with formal charges and omits lone pairs. It does not assert measured atomic charges or a plasma reaction mechanism. Charge labels fade with the illustrated input bonds. |
| `gan-substrate` | The GaN example grows a final layer over a prepared buffer and template on c-plane sapphire. | [30](#ref-30): p. 2, §2 and Fig. 1, sapphire/buffer/template/final-layer stack | Loading starts with the prepared stack; nucleation and buffer growth are omitted. Layer thicknesses are schematic. |
| `environment-transport` | Under a steady boundary-layer model with first-order surface consumption, J = D Cb ks / (D + delta ks). | [33](#ref-33): PDF p. 8, diffusive flux; p. 9, final coupled flux equation; p. 10, limiting cases | The lab defines km = D/delta and Da = ks/km, then derives Cs/Cb = 1/(1+Da) and J/(km Cb) = Da/(1+Da). The linear profile assumes constant D and no gas-phase reaction. Da is an exploratory input, not inferred from a recipe. |
| `environment-surface` | CVD involves delivery to the surface, film formation and desorption/transport of gaseous products. | [33](#ref-33): PDF p. 5, Major CVD Processes; [10](#ref-10): PDF p. 9, slide 18: transport, surface reaction and product removal | The continuously animated tracer encounters teach these process categories, not an elementary atomistic pathway or measured dwell time. |
| `environment-plasma` | In the depicted PECVD architecture, RF sustains a discharge that creates reactive species by collisions; surface interactions form a film and the exhaust removes products. | [15](#ref-15): PECVD technology paragraphs: RF discharge, collision-created reactive species, surface interaction and pumping | Generic R* markers indicate a reactive-species population. Their identities, abundances, electron energies and trajectories are not calculated. |
| `environment-w-exhaust` | The cited H2/WF6 study measured HF formation and depletion of the reactants during W deposition. | [6](#ref-6): Abstract: quadrupole mass spectrometry, HF signal and reactant depletion | The animation illustrates bulk deposition on a prepared surface. It does not reproduce the measured mass spectrum or transient nucleation chemistry. |

## Model choices

- Camera geometry, colours, atom sizes, molecular bonds, atom positions and trajectories are schematic design choices; film atoms do not depict a crystal structure or bonding network.
- Film formulae and atom counts represent idealised compositions. Impurities, defects and deviations from stoichiometry are not modelled. The film backdrop repeats complete formula units to preserve the displayed elemental proportions.
- Nine displayed equations conserve element counts; this does not establish an elementary reaction mechanism.
- TEOS PECVD is qualitative. Displayed molecule counts are illustrative and are not flow ratios or reaction coefficients.
- Film thickness and the eight-second atom-balance sequence at 1× speed are normalised demonstration controls, not measured growth or kinetic predictions. Continuous environment playback does not measure residence time.
- Temperature exploration does not calculate a deposition rate or validate the chosen tool conditions.
- Pausing PECVD when RF is off is a teaching control, not a physical prediction of residual growth.
- Reactor drawings and load/purge/cool/vent stages do not reproduce a source tool or provide an operating procedure.
- The MOCVD view combines one cited GaN final-layer setpoint with a separately sourced showerhead architecture. The prepared buffer/template is already present; delivery, crystal geometry and layer thickness are schematic.
- The environment shows continuous local-surface process categories. Incoming molecular glyphs, generic reactive-species markers, surface patches and outgoing gas glyphs are explanatory tracers, not a simulated elementary chemical network.
- The 1D transport explorer solves the stated diffusion/first-order-reaction model analytically. Its user-selected Damkohler ratio is independent of the documented recipe conditions; it does not fit kinetic constants or predict a physical film thickness.
- Environment colour fields represent qualitative thermal/plasma zones or the explicitly normalised concentration solution. No gas temperature map, plasma potential, electron-energy distribution or full-reactor CFD solution is asserted.
- Continuous playback, speed changes, camera scale and source-condition overlays are interface controls. The environment and hardware/atom-balance views share the same selected recipe.

## References

<a id="ref-1"></a>
### [1] University of Toronto, ECE / Toronto Nanofabrication Centre

[Equipment Capabilities](https://www.ece.utoronto.ca/equipmentcapabilities/) (n.d.). **Facility recipe.** Accessed 2026-10-23.

Locator: Deposition User Recipes → PECVD Recipes → Oxide & Nitride Deposition Recipes, second SiO₂ row; Photolithography Wetbench.

Supports: Second oxide row: 300 °C, 1000 mTorr, 5% SiH₄/N₂ with N₂O, 30 W. Photolithography Wetbench: substrate cleaning and resist processing.

Scope: One facility recipe; its measured deposition rate is not used to drive the animation.

Verification (2026-10-23): [Official facility page](https://www.ece.utoronto.ca/equipmentcapabilities/). Oxide table row and the separate cleaning/wetbench description checked.

<a id="ref-2"></a>
### [2] National Yang Ming Chiao Tung University

[Low Pressure Chemical Vapor Deposition System (LPCVD)](https://scholar.nycu.edu.tw/en/equipments/low-pressure-chemical-vapor-deposition-system-lpcvd/) (n.d.). **Facility recipe.** Accessed 2026-10-23.

Locator: Equipment Details → Description → service items (2), (3), (4).

Supports: Poly-Si: 620 °C / 300 mTorr; nitride: 800 °C / 120 mTorr; TEOS: 700 °C / 120 mTorr, with listed gases.

Scope: The wider temperature sliders are independent teaching ranges, not NYCU tool-qualified windows.

Verification (2026-10-23): [Official facility page](https://scholar.nycu.edu.tw/en/equipments/low-pressure-chemical-vapor-deposition-system-lpcvd/). Service items (2)–(4) checked; the selected values are examples, not independently qualified simulator windows.

<a id="ref-3"></a>
### [3] A. Doolittle, Georgia Institute of Technology

[ECE6450, Lectures 13–14: Thin Film Deposition and Epitaxy](https://alan.ece.gatech.edu/ECE6450/Lectures/ECE6450L13and14-CVD%20and%20Epitaxy.pdf) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: PDF pp. 2–9, 14–15, 19.

Supports: CVD principles and tradeoffs; poly-Si 575–650 °C (p. 4), TEOS 650–750 °C (p. 7), DCS nitride about 700–800 °C (p. 9); epitaxy (pp. 14–15).

Scope: Broad lecture ranges are not a qualified operating envelope. The printed nitride equation contains an error; use [21] for that equation.

Verification (2026-10-23): [University lecture PDF](https://alan.ece.gatech.edu/ECE6450/Lectures/ECE6450L13and14-CVD%20and%20Epitaxy.pdf). Physical PDF pages checked for process comparison, three temperature ranges, nitride encapsulation and epitaxy. Erroneous printed chemistry is excluded.

<a id="ref-4"></a>
### [4] M. Watanabe & Co., Ltd.

[Atmospheric Pressure CVD (APCVD) System](https://www.m-watanabe.co.jp/en/product/apcvd/) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: A200V → BASIC INFORMATION; AMAX system descriptions.

Supports: A200V SiH₄/O₂ feed and 350–450 °C range; atmospheric single-wafer and conveyor reactor examples.

Scope: 400 °C is a teaching selection within the A200V range. The drawing is not an A200V engineering model.

Verification (2026-10-23): [Manufacturer page](https://www.m-watanabe.co.jp/en/product/apcvd/). A200V gas/temperature fields and the separate AMAX conveyor description checked. Geometry remains representative.

<a id="ref-5"></a>
### [5] J. C. Schumacher

[Ultra-pure epitaxial silicon and process for its manufacture, EP0114876B1](https://data.epo.org/publication-server/rest/v1.2/patents/EP0114876NWB1/document.pdf) (1990). **Patent.** Accessed 2026-10-23.

Locator: Description: PDF p. 2, atmospheric-pressure paragraph and Table I, SiCl₄ row; PDF p. 3, Table II, SiCl₄/H₂ row.

Supports: Background Table I: atmospheric SiCl₄/H₂ epitaxy at 1150–1250 °C. Background Table II: a conventional SiCl₄/H₂ epitaxy example at 1200 °C.

Scope: Both tables describe conventional background processes, not experimental validation of the patent’s bromosilane invention or of this schematic.

[Patent bibliographic record](https://patents.google.com/patent/EP0114876B1/en).

Verification (2026-10-23): [Patent PDF and bibliographic record](https://patents.google.com/patent/EP0114876B1/en). Table I on PDF p. 2 and Table II on PDF p. 3 checked. The nominal 1200 °C appears explicitly in the background table.

<a id="ref-6"></a>
### [6] T. Gougousi, Y. Xu, J. N. Kidder, G. W. Rubloff and C. R. Tilford

[Process Diagnostics and Thickness Metrology Using in Situ Mass Spectrometry for the Chemical Vapor Deposition of W from H₂/WF₆](https://www.nist.gov/publications/process-diagnostics-and-thickness-metrology-using-situ-mass-spectrometry-chemical-vapor) (2000). **Research article.** Accessed 2026-10-23.

Locator: Journal of Vacuum Science & Technology B 18(3), 1352–1363 (2000), abstract; DOI 10.1116/1.591478.

Supports: H₂/WF₆ at 0.5 Torr and 400–500 °C; measured HF and silicon-containing nucleation products.

Scope: The animation shows idealised bulk growth; it does not reproduce nucleation kinetics or metrology.

[Publisher record / DOI](https://doi.org/10.1116/1.591478).

Verification (2026-10-23): [NIST author record and publisher metadata](https://www.nist.gov/publications/process-diagnostics-and-thickness-metrology-using-situ-mass-spectrometry-chemical-vapor). Abstract conditions and HF observation checked; journal, pages and DOI checked against the publisher record.

<a id="ref-7"></a>
### [7] E. C. Eichman, B. A. Sommer, M. J. Churley and W. C. Ramsey

[Apparatus for elimination of low temperature ammonia salts in TiCl₄ NH₃ CVD reaction, US5348587A](https://patents.google.com/patent/US5348587A/en) (1994). **Patent.** Accessed 2026-10-23.

Locator: Description → Background equation; preferred primary-reaction conditions; preferred embodiment.

Supports: TiN net equation; about 150 mTorr, TiCl₄/NH₃/Ar, wafer 450–650 °C, preferred wafer temperature about 650 °C.

Scope: The patent also heats downstream walls with a secondary plasma. That hardware is omitted from this thermal-growth schematic; this is not a complete reproduction.

Verification (2026-10-23): [Patent text](https://patents.google.com/patent/US5348587A/en). Background net equation, preferred primary conditions and the separately heated liner checked.

<a id="ref-8"></a>
### [8] N. Arul Dhas and J. Henri

[Method of reducing defects in PECVD TEOS films, US7923376B1](https://patents.google.com/patent/US7923376B1/en) (2011). **Patent.** Accessed 2026-10-23.

Locator: Description → process conditions for 300 mm wafers, following the helium-flow discussion.

Supports: TEOS/O₂/He; typical 350–400 °C, 2–4 Torr and 2000–3000 W for the described equipment.

Scope: Equipment-specific ranges, not universal PECVD values. No balanced plasma-exhaust equation or elementary reaction mechanism is provided.

Verification (2026-10-23): [Patent text](https://patents.google.com/patent/US7923376B1/en). TEOS/O₂/He and general 300 mm conditions checked. Lower-power specific examples are distinguished from the displayed general range.

<a id="ref-9"></a>
### [9] NPTEL, Introduction to Microelectronic Fabrication Processes

[Module 3, Lecture 11: Chemical Vapor Deposition — continued](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/Lecture11.html) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Operation paragraph; example reactions for silicon, silicon dioxide and tungsten.

Supports: SiH₄ decomposition; SiH₄/O₂ and SiH₄/N₂O oxide net equations; SiCl₄/H₂ silicon; WF₆/H₂ tungsten; reactor functions.

Scope: Do not use the malformed nitride equation on this page. These selected overall equations do not predict all actual exhaust species.

Verification (2026-10-23): [University course text](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/Lecture11.html). Only the stated silicon, oxide and H₂-reduced tungsten equations are used; malformed nitride and Si-reduced tungsten equations are excluded.

<a id="ref-10"></a>
### [10] Shiang-Cheng Lu (盧向成), National Tsing Hua University

[Lecture 2: Micromachining Processes](https://www.ee.nthu.edu.tw/sclu/microfabrication.pdf) (2004). **University lecture.** Accessed 2026-10-23.

Locator: PDF p. 9 (slides 17–18), p. 13 (slides 25–26), p. 14 (slide 28), p. 15 (slide 30).

Supports: Surface transport and reaction steps, furnace parts, idealised TEOS decomposition and silane/N₂O oxide equations, polysilicon and oxidation.

Scope: University teaching material, Spring 2004. Idealised net equations only. Slide 18 prints “Absorption”; the linked claim is limited to transport, reaction and desorption. Only the atom-balanced dry-oxidation equation on slide 30 is used.

[Course and instructor](https://www.ee.nthu.edu.tw/sclu/ene5400.htm).

Verification (2026-10-23): [University-hosted teaching PDF](https://www.ee.nthu.edu.tw/sclu/microfabrication.pdf). PDF footer credit and course instructor checked. Slides 18, 25, 26 and 30 checked, including the furnace drawing and displayed net equations.

<a id="ref-11"></a>
### [11] Stanford Nanofabrication Facility

[Silicon Dioxide](https://snfguide.stanford.edu/guide/materials/silicon-dioxide?qt-materials=2) (n.d.). **Facility documentation.** Accessed 2026-10-23.

Locator: Opening material/process description.

Supports: Silane/N₂O PECVD and silane or TEOS oxide precursor pairings.

Scope: Stanford lists helium-diluted silane for its CCP tool. Nitrogen dilution in this lab comes from Toronto [1], not Stanford.

Verification (2026-10-23): [Official facility page](https://snfguide.stanford.edu/guide/materials/silicon-dioxide?qt-materials=2). Feed pairing checked; He dilution is not used to justify the Toronto N₂ recipe or net stoichiometry.

<a id="ref-12"></a>
### [12] Stanford Nanofabrication Facility

[Tystar Bank 2 Tube 7 Nitride (B2T7 Flexible Nitride)](https://snfguide.stanford.edu/guide/equipment/tystar-bank-2-tube-7-nitride-b2t7-flexible-nitride) (n.d.). **Facility documentation.** Accessed 2026-10-23.

Locator: Overview; Processing Techniques; Gases.

Supports: Nitride LPCVD equipment with dichlorosilane and ammonia; different nitride processes.

Scope: Supports the process pairing, not the exact coefficients in the net equation or the NYCU setpoint.

Verification (2026-10-23): [Official facility page](https://snfguide.stanford.edu/guide/equipment/tystar-bank-2-tube-7-nitride-b2t7-flexible-nitride). LPCVD nitride and the ammonia/dichlorosilane gas list checked; equation is independently supported by [21].

<a id="ref-13"></a>
### [13] Oxford Instruments Plasma Technology

[Plasma enhanced chemical vapour deposition (PECVD)](https://plasma.oxinst.com/technologies/pecvd) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: PECVD feature list: RF-driven top electrode, heated lower electrode, showerhead inlet and frequency mixing.

Supports: Representative PECVD electrode, heating and showerhead functions; RF frequency mixing and lower-temperature processing.

Scope: Supports the cited architecture and activation concepts. The retrieved page does not establish the specific TEOS feed pairing; that claim uses [8].

Verification (2026-10-23): [Manufacturer page](https://plasma.oxinst.com/technologies/pecvd). RF, heated electrode, showerhead and frequency-mixing features checked. TEOS-specific attribution removed.

<a id="ref-14"></a>
### [14] Princeton Plasma Physics Laboratory

[About Plasmas and Fusion](https://www.pppl.gov/about/about-plasmas-and-fusion) (n.d.). **Research laboratory explanation.** Accessed 2026-10-23.

Locator: What is Plasma?.

Supports: Partially ionised gas containing ions, electrons and neutral species.

Scope: General plasma definition, not a model of the electron distribution in this simulator.

Verification (2026-10-23): [Laboratory educational page](https://www.pppl.gov/about/about-plasmas-and-fusion). The plasma-composition definition checked.

<a id="ref-15"></a>
### [15] CORIAL / Plasma-Therm

[Plasma Enhanced Chemical Vapor Deposition (PECVD)](https://corial.plasmatherm.com/en/technologies/pecvd-plasma-enhanced-chemical-vapor-deposition) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: PECVD technology.

Supports: 13.56 MHz example, collisional creation of reactive species, surface film formation and exhaust removal.

Scope: One equipment family; RF frequency is not a universal PECVD constant.

Verification (2026-10-23): [Manufacturer technology page](https://corial.plasmatherm.com/en/technologies/pecvd-plasma-enhanced-chemical-vapor-deposition). Plasma-assisted surface growth, 13.56 MHz example and pumped products checked.

<a id="ref-16"></a>
### [16] NPTEL, CMOS Integrated Circuit Fabrication

[Chapter 3, §3.1.1: Crystals](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide2.htm) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Polycrystalline-material definition.

Supports: Crystal grains, differing orientations and grain boundaries.

Scope: A structural definition does not specify chemical purity.

Verification (2026-10-23): [University course text](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide2.htm). Opening silicon context and §3.1.1 grain/boundary definition checked.

<a id="ref-17"></a>
### [17] Wacker Chemie AG

[Purity Is Our Recipe for Success, Annual Report 2022](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) (2023). **Manufacturer process report.** Accessed 2026-10-23.

Locator: Siemens-process and metallurgical-silicon purification paragraphs; Polysilicon glossary.

Supports: Purification of metallurgical silicon and production of high-purity bulk polysilicon for wafer makers.

Scope: Manufacturer account of bulk silicon purification. Annual Report 2022 is the reporting-year title; the report was issued in 2023. It does not support the simulator’s thin-film recipe values.

[Report issue-year context](https://reports.wacker.com/2022/annual-report/for-our-shareholders/letter-to-our-shareholders.html).

Verification (2026-10-23): [Manufacturer annual report](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html). Purification and wafer-feedstock text checked; report year 2022 is distinguished from 2023 issue year.

<a id="ref-18"></a>
### [18] NPTEL, Introduction to Microelectronic Fabrication Processes

[Module 9, Lecture 30: BEOL Issues and Aluminum Metallization](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/9_2.html) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Opening paragraph; Fig. 9.3 and repeated interconnect sequence.

Supports: SiO₂ insulation, Ti/TiN barrier/adhesion role, CVD tungsten via fill and repeated lithography/etch/deposition.

Scope: Its illustrated Ti/TiN liner is deposited by PVD. This source supports the material role, not a TiN CVD recipe.

Verification (2026-10-23): [University course text](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/9_2.html). Insulator, liner and tungsten roles checked against the interconnect sequence; deposition methods in the example are not generalised.

<a id="ref-19"></a>
### [19] Alireza Sheikholeslami, TU Wien Institute for Microelectronics

[Annual Review 2006: Topography Simulation](https://www.iue.tuwien.ac.at/personal/jb2006/content/staff/Sheikholeslami.html) (2006). **Research group report.** Accessed 2026-10-23.

Locator: Topography Simulation → passivation and moisture-barrier discussion.

Supports: PECVD TEOS oxide with silicon-nitride passivation and moisture-barrier context.

Scope: Supports this application; it does not validate the exact film properties of the NYCU nitride recipe.

Verification (2026-10-23): [Institutional annual-review page](https://www.iue.tuwien.ac.at/personal/jb2006/content/staff/Sheikholeslami.html). Passivation stack and moisture-barrier context checked; no oxidation-mask claim is inferred.

<a id="ref-20"></a>
### [20] NPTEL, CMOS Integrated Circuit Fabrication

[Chapter 3: Low Pressure Chemical Vapor Deposition (LPCVD)](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide103.htm) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: First two paragraphs and doping discussion.

Supports: Poly-Si gates, short interconnects and resistors; silane growth, temperature range and doping context.

Scope: Applications are examples, not a claim that every modern gate uses polysilicon.

Verification (2026-10-23): [University course text](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide103.htm). Poly-Si gate/interconnect/resistor and doping passages checked.

<a id="ref-21"></a>
### [21] G. Peev, L. Zambov and Y. Yanakiev

[Kinetics of the chemical reaction between dichlorosilane and ammonia during silicon nitride film deposition](https://doi.org/10.1016/0040-6090(90)90456-N) (1990). **Research article.** Accessed 2026-10-23.

Locator: Thin Solid Films 189(2), pp. 275–282; p. 276, Eq. (1).

Supports: Balanced stoichiometric DCS/NH₃ → Si₃N₄ + HCl + H₂ net reaction.

Scope: Eq. (1) was checked in the author-uploaded full text. Actual composition and side products depend on process conditions.

[Author-uploaded full text](https://www.researchgate.net/publication/222199359_Kinetics_of_the_chemical_reaction_between_dichlorosilane_and_ammonia_during_silicon_nitride_film_deposition).

Verification (2026-10-23): [Author-uploaded primary paper](https://www.researchgate.net/publication/222199359_Kinetics_of_the_chemical_reaction_between_dichlorosilane_and_ammonia_during_silicon_nitride_film_deposition). Paper identity and p. 276, Eq. (1) checked in the full text; the DOI remains the canonical reference.

<a id="ref-22"></a>
### [22] Zhebo Chen, Applied Materials

[Introducing a Breakthrough in 2D Scaling](https://www.appliedmaterials.com/us/en/blog/blog-posts/introducing-a-breakthrough-in-2d-scaling.html) (2020). **Manufacturer technical article.** Accessed 2026-10-23.

Locator: Opening contact-via discussion and Fig. 1.

Supports: Conventional TiN liner/barrier, tungsten nucleation layer and tungsten contact-metal fill.

Scope: The article also discusses a different selective process that eliminates the liner; this lab illustrates the conventional context.

Verification (2026-10-23): [Manufacturer-authored article](https://www.appliedmaterials.com/us/en/blog/blog-posts/introducing-a-breakthrough-in-2d-scaling.html). Author/date and conventional TiN liner, W nucleation and W contact-fill passage checked.

<a id="ref-23"></a>
### [23] MKS Instruments

[1179C01313CR1BV Mass Flow Controller](https://www.mks.com/p/1179C01313CR1BV) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: Overview.

Supports: A mass flow controller measures and controls a gas feed.

Scope: Supports the component function, not selection or qualification of this exact part for every precursor.

Verification (2026-10-23): [Manufacturer product page](https://www.mks.com/p/1179C01313CR1BV). Overview explicitly states measurement and control of gas flow; vapour generation uses a separate citation.

<a id="ref-24"></a>
### [24] MKS Instruments

[Downstream Pressure Controllers and Valves — Product Selection Guide](https://www.mksinst.com/docs/UR/dwnstrem.pdf) (n.d.). **Manufacturer technical guide.** Accessed 2026-10-23.

Locator: PDF p. 1, pressure-control explanation.

Supports: Pressure measurement, controller feedback and exhaust-throttle conductance to the vacuum pump.

Scope: The gauge, valve and pump functions are explained; no closed-loop pressure solver is implemented.

Verification (2026-10-23): [Manufacturer technical PDF](https://www.mksinst.com/docs/UR/dwnstrem.pdf). PDF p. 1 explicitly describes gauge, feedback controller, throttle conductance and vacuum pump.

<a id="ref-25"></a>
### [25] MKS Instruments

[Pulsed Radio Frequency (RF) Solution for Critical Processes](https://www.mks.com/n/pulsed-radio-frequency-rf-solution-for-critical-processes) (n.d.). **Manufacturer technical article.** Accessed 2026-10-23.

Locator: Paragraphs on RF products igniting/controlling plasma and the matching network between generator and chamber.

Supports: Generator sustains the discharge; impedance matching improves transfer of power to the plasma.

Scope: RF-off pause is an animation rule, not a prediction of residual physical deposition.

Verification (2026-10-23): [Manufacturer technical page](https://www.mks.com/n/pulsed-radio-frequency-rf-solution-for-critical-processes). RF-plasma and intervening matching-network paragraphs checked.

<a id="ref-26"></a>
### [26] MKS Instruments

[1150C Vapor Source Mass-Flo® Controller](https://api.p1.mks.com/mam/celum/celum_assets/mks/resources/1150C-MFC-DS.pdf?0=) (2021). **Manufacturer technical guide.** Accessed 2026-10-23.

Locator: PDF pp. 2–3: vaporized-source list and System Integration; revision 1150C_10/21 on p. 4.

Supports: Direct vapour delivery from a heated source; TEOS and TiCl₄ are listed examples. Delivery lines are heated to avoid condensation.

Scope: Discontinued-product datasheet, used for delivery concepts only. No claim that this specific controller or its specifications are implemented in the lab.

Verification (2026-10-23): [Manufacturer datasheet](https://api.p1.mks.com/mam/celum/celum_assets/mks/resources/1150C-MFC-DS.pdf?0=). Broken legacy link replaced with the official 1150C datasheet. TEOS/TiCl₄ and heated delivery lines checked; revision is October 2021.

<a id="ref-27"></a>
### [27] Vito Šimonka, TU Wien Institute for Microelectronics

[Thermal Oxidation and Dopant Activation of Silicon Carbide — Device Fabrication](https://www.iue.tuwien.ac.at/phd/simonka/Device-Fabrication.html) (2018). **University dissertation.** Accessed 2026-10-23.

Locator: §1.2, Fig. 1.7 and §§1.2.1–1.2.5.

Supports: Wafer processing, photoresist exposure/development, etching, oxidation, implantation and patterned metal contacts.

Scope: Doctoral thesis dated September 2018. Its device example is SiC; only generic patterning, implantation and fabrication concepts are used. Silicon-specific oxidation is sourced to [10].

[Thesis title page (author/date)](https://www.iue.tuwien.ac.at/phd/simonka/index.html).

Verification (2026-10-23): [Institution-hosted doctoral thesis](https://www.iue.tuwien.ac.at/phd/simonka/Device-Fabrication.html). Author and September 2018 date checked on the title page; SiC example is used only for generic fabrication concepts.

<a id="ref-28"></a>
### [28] AIXTRON

[AIXTRON Technologies: MOCVD](https://www.aixtron.com/en/innovation/technologies/mocvd) (n.d.). **Manufacturer technology documentation.** Accessed 2026-10-23.

Locator: MOCVD technology overview, opening explanation and LED multilayer example.

Supports: Metal-organic precursors, thermal GaN growth from TMGa/NH3, semiconductor epitaxy and LED heterostructures.

Scope: Conceptual overview; no recipe setpoints, measured film properties or animation validation.

Verification (2026-10-23): [Manufacturer technology page](https://www.aixtron.com/en/innovation/technologies/mocvd). GaN precursor, heating and LED multilayer explanations checked.

<a id="ref-29"></a>
### [29] Chenqi Zhu, University of Sheffield

[MOCVD Growth and characterisation of III-nitride semiconductor materials for monolithically integrated optoelectronics](https://etheses.whiterose.ac.uk/id/eprint/32396/1/MOCVD%20Growth%20and%20characterisation%20of%20III-nitride%20semiconductor%20materials%20for%20monolithically%20integrated%20optoelectronics.pdf) (2022). **Doctoral thesis.** Accessed 2026-10-23.

Locator: §§3.1.1–3.1.2, printed pp. 45–46, Eq. (3.1); §§3.1.3–3.1.4, printed pp. 50–54, Figs. 3.5–3.6.

Supports: MOVPE terminology; idealised TMGa/ammonia GaN equation; liquid-source bubbler, carrier-gas and flow-control concepts.

Scope: Net chemistry and delivery concepts only. Typographic group-number and dopant assignments elsewhere in this thesis are not adopted; no source temperature or delivery flow is inferred.

Verification (2026-10-23): [Institution-hosted doctoral thesis](https://etheses.whiterose.ac.uk/id/eprint/32396/1/MOCVD%20Growth%20and%20characterisation%20of%20III-nitride%20semiconductor%20materials%20for%20monolithically%20integrated%20optoelectronics.pdf). Printed pp. 45–46 and 50–54 checked, including Eq. (3.1) and delivery figures. Unrelated source typos are not adopted.

<a id="ref-30"></a>
### [30] Feng Liang et al.

[Carbon-Related Defects as a Source for the Enhancement of Yellow Luminescence of Unintentionally Doped GaN](https://doi.org/10.3390/nano8090744) (2018). **Peer-reviewed experimental research article.** Accessed 2026-10-23.

Locator: Nanomaterials 8(9), 744 (2018): p. 2, §2 and Fig. 1; p. 3, Table 1, row T2; DOI 10.3390/nano8090744.

Supports: TMGa/NH3 GaN growth; T2 temperature 1050 °C and pressure 200 Torr; final layer over a buffer and template on c-plane sapphire.

Scope: One reported final-layer setpoint, not a general MOCVD operating window. The schematic does not reconstruct the study’s reactor, nucleation sequence, impurity concentrations or luminescence.

[PubMed Central full text](https://pmc.ncbi.nlm.nih.gov/articles/PMC6163992/).

Verification (2026-10-23): [Primary article full text and DOI record](https://pdfs.semanticscholar.org/fd19/d460aa3cd602369575494bf06d5b452a0266.pdf). §2, Fig. 1 and Table 1 row T2 checked; a readable copy of the published article was used when the DOI fetch was blocked.

<a id="ref-31"></a>
### [31] AIXTRON

[AIXTRON Technologies: Showerhead principle (MOCVD)](https://www.aixtron.com/en/innovation/technologies/showerhead-principle) (n.d.). **Manufacturer technology documentation.** Accessed 2026-10-23.

Locator: Close Coupled Showerhead® explanation, gas separation, cooling and heated susceptor paragraphs.

Supports: Separate precursor channels, water-cooled showerhead and heated rotating susceptor.

Scope: Representative architecture only; dimensions and single-substrate simplification are teaching choices. Not evidence that Liang et al. used this specific showerhead.

Verification (2026-10-23): [Manufacturer technology page](https://www.aixtron.com/en/innovation/technologies/showerhead-principle). Separated openings, water cooling, resistance heater and rotating susceptor checked; no identity with the cited experiment’s reactor is claimed.

<a id="ref-32"></a>
### [32] Southern Methodist University, Department of Chemistry

[General Chemistry, Chapter 24: Organic Chemistry — chemical bonding review](https://s2.smu.edu/mfreindorf/GenChem/CheChem24.pdf) (n.d.). **University teaching notes.** Accessed 2026-10-23.

Locator: PDF p. 11, GCh24-11: Lewis structures of nitrous oxide (N₂O); PDF p. 9, resonance definition.

Supports: N₂O resonance contributors and formal charges, including N≡N⁺–O⁻. The page identifies this as the most important contributor.

Scope: Lewis representation only; integer bond orders and formal charges are not measurements of the actual charge distribution. Lone pairs are omitted from the animation. No plasma mechanism, recipe or kinetic claim is inferred.

Verification (2026-10-23): [University-hosted teaching PDF and visual inspection](https://s2.smu.edu/mfreindorf/GenChem/CheChem24.pdf#page=11). PDF p. 11 was read and visually checked: N≡N⁺–O⁻ has a positive formal charge on the central N and a negative formal charge on O. Only the stated bonding/resonance material is used.

<a id="ref-33"></a>
### [33] Simon Fraser University, School of Engineering Science

[Chemical Vapour Deposition: CVD — ENSC 495 lecture notes](https://www.sfu.ca/~gchapman/e495/e495l10m.pdf) (n.d.). **University teaching notes.** Accessed 2026-10-23.

Locator: PDF pp. 5–10: process steps, boundary-layer transport and coupled surface-reaction flux.

Supports: Diffusive supply and first-order surface reaction treated as coupled resistances; limiting regimes. The lab derives its normalised outputs from the displayed flux relation.

Scope: Reduced steady 1D model only. No reactor-specific constants, gas-phase chemistry, plasma sheath, adsorption coverage, CFD field or recipe-calibrated growth rate is established.

Verification (2026-10-23): [University-hosted lecture PDF and equation inspection](https://www.sfu.ca/~gchapman/e495/e495l10m.pdf#page=9). Final coupled flux equation on PDF p. 9 and limiting cases on p. 10 checked, with diffusion relation on p. 8. The isolated surface-flux line is typographically inconsistent with its surface concentration; the lab uses the final coupled expression.
