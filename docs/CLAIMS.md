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
- Identified the SiCl₄ range as background Table I in EP0114876B1, not an experiment implementing that patent’s bromosilane invention.
- Marked the TEOS PECVD window and RF power as equipment-specific patent values for the described 300 mm equipment.
- Made the TEOS PECVD view a qualitative species map. Its illustrative atom pool does not assert a 1:1 TEOS:O₂ reaction or a measured organic-exhaust composition.
- Disclosed the omitted secondary wall-heating plasma in the TiN patent. The drawing illustrates the primary thermal growth reaction only.
- Replaced the inaccessible OSHA bulk-silicon link with a readable manufacturer process report. Replaced the uninformative Applied Materials epitaxy landing page with the actual lecture sections on crystalline growth.
- Limited the silicon-nitride role text to cited passivation/moisture-barrier applications; removed the oxidation-mask extension from a source that did not establish it.
- Added sources for gas metering, vapour delivery, RF matching, pressure feedback and each fabrication explanation.

## Claim register

| Claim ID | Assertion | Source and exact locator | Scope / qualification |
| --- | --- | --- | --- |
| `cvd-definition` | CVD forms solid films by gas/vapour reactions at a substrate; volatile products are removed. | [3](#ref-3): PDF p. 2; [9](#ref-9): Operation paragraph |  |
| `film-functions` | Deposited films can provide insulation, interconnect functions, protection or semiconductor layers. | [18](#ref-18): Opening paragraph and Fig. 9.3; [20](#ref-20): First paragraph; [19](#ref-19): Topography Simulation |  |
| `prepare` | Prepare/load the substrate and establish process conditions. | [9](#ref-9): Operation paragraph |  |
| `delivery` | Feed precursor and co-reactants; TEOS is delivered as vapour. | [9](#ref-9): Operation paragraph; [26](#ref-26): Type 1150 TEOS vapour-delivery diagram |  |
| `thermal-activation` | Heat activates thermal CVD in these presets. | [3](#ref-3): PDF pp. 2–3 |  |
| `surface-growth` | Transport, adsorption, surface reaction and desorption produce a deposited film. | [10](#ref-10): PDF p. 9, slide 18: CVD Principles |  |
| `exhaust` | Exhaust removes unused feed and volatile products; shown loading and finishing stages are illustrative. | [9](#ref-9): Operation paragraph; [15](#ref-15): PECVD technology, final paragraph | Exact purge, cool and vent procedures are tool-specific and are not supplied here. |
| `wafer` | The illustrated wafer is a silicon substrate used to build devices. | [27](#ref-27): §1.2, substrate and planar processing discussion | This is the substrate selected for this lab, not a definition excluding other wafer materials. |
| `precursor` | A precursor supplies film-forming atoms; co-reactants participate in its conversion. | [9](#ref-9): Example reactions 1–5 |  |
| `carrier` | Ar and He serve as carrier/diluent gases in the stated TiN and TEOS examples. | [7](#ref-7): Preferred primary-reaction conditions: Ar flow; [8](#ref-8): Description, helium-flow discussion |  |
| `plasma` | A partially ionised gas contains free electrons, ions and neutral species. | [14](#ref-14): What is Plasma? |  |
| `rf-power` | RF means radio frequency; the generator supplies energy for the discharge. | [25](#ref-25): Title and RF power discussion; [15](#ref-15): PECVD technology |  |
| `poly-structure` | Polycrystalline silicon has differently oriented grains separated by grain boundaries. | [16](#ref-16): §3.1.1, polycrystalline-material definition |  |
| `poly-role` | Appropriately doped and patterned polysilicon can be used for gates, short interconnects or resistors. | [20](#ref-20): First paragraph and doping discussion |  |
| `epi-structure` | Silicon homoepitaxy grows a single-crystal layer following its crystalline silicon substrate. | [3](#ref-3): PDF pp. 14–15 |  |
| `bulk-purity` | Polycrystalline describes grain structure; purified bulk polysilicon is also used as wafer feedstock. | [16](#ref-16): §3.1.1; [17](#ref-17): Metallurgical-silicon purification paragraph and Polysilicon glossary | The distinction between structure and purity is an explanatory inference from these separate descriptions. |
| `pecvd` | Plasma creates reactive species for surface deposition and often permits lower wafer temperatures. | [15](#ref-15): Opening definition and PECVD technology |  |
| `rf-frequency` | 13.56 MHz is a common equipment example; other frequencies and combinations are used. | [15](#ref-15): PECVD technology, first paragraph; [13](#ref-13): Top feature list; dual-frequency system description |  |
| `type-ap` | Atmospheric thermal CVD can give high throughput; flow/transport and unwanted gas-phase reactions affect uniformity. | [3](#ref-3): PDF p. 3, APCVD comparison; [10](#ref-10): PDF pp. 10–12, transport, nucleation and APCVD |  |
| `type-lp` | Thermal LPCVD operates below atmospheric pressure and often provides uniform films at higher wafer temperatures. | [3](#ref-3): PDF pp. 3–4, 7, 9 |  |
| `type-pe` | The selected PECVD processes use reduced pressure and RF; plasma damage and film properties depend on conditions. | [1](#ref-1): PECVD oxide recipe table; [8](#ref-8): 300 mm wafer process conditions; [3](#ref-3): PDF p. 3, PECVD disadvantages; [13](#ref-13): PECVD feature list |  |
| `recipe-definition` | A recipe combines chemicals, pressure, temperature and activation; a precursor may give different films. | [1](#ref-1): PECVD recipe table; [2](#ref-2): Equipment Details, service items; [9](#ref-9): Example reactions |  |
| `chem-silane-PECVD` | SiH4 + 2N2O -> SiO2 + 2N2 + 2H2 | [9](#ref-9): Example reactions, silicon dioxide, second equation; [11](#ref-11): Opening CCP precursor description | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-silane-LPCVD` | SiH4 -> Si + 2H2 | [9](#ref-9): Example reactions, polysilicon | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-silane-APCVD` | SiH4 + O2 -> SiO2 + 2H2 | [9](#ref-9): Example reactions, silicon dioxide, first equation; [4](#ref-4): A200V gas feed | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-dcs-LPCVD` | 3SiH2Cl2 + 4NH3 -> Si3N4 + 6HCl + 6H2 | [21](#ref-21): p. 276, Eq. (1); [12](#ref-12): Overview and Gases | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-teos-LPCVD` | Si(OC2H5)4 -> SiO2 + 4C2H4 + 2H2O | [10](#ref-10): PDF p. 13, slide 26, thermal TEOS equation | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-teos-PECVD` | TEOS and oxygen plasma form SiO2; the exhaust mixture is not specified stoichiometrically. | [8](#ref-8): Description, TEOS/O2/He PECVD process; [13](#ref-13): Applications: TEOS SiO2 | Qualitative species map; no gas ratio or balanced plasma equation is claimed. |
| `chem-sicl4-APCVD` | SiCl4 + 2H2 -> Si + 4HCl | [9](#ref-9): Example reactions, silicon, first equation; [5](#ref-5): Description, Table I, SiCl4 row | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-wf6-LPCVD` | WF6 + 3H2 -> W + 6HF | [9](#ref-9): Example reactions, tungsten, H2 reduction; [6](#ref-6): Abstract, HF product and nucleation discussion | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `chem-ticl4-LPCVD` | 6TiCl4 + 8NH3 -> 6TiN + N2 + 24HCl | [7](#ref-7): Description, Background of the Invention, overall reaction | Idealised net stoichiometry; not an elementary pathway or a complete measured exhaust composition. |
| `conditions-silane-PECVD` | 300 °C; 1.0 Torr; 5% SiH4 in N2 + N2O; 30 W. | [1](#ref-1): PECVD oxide table, second SiO2 row | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-silane-LPCVD` | NYCU nominal poly-Si example: 620 °C, 300 mTorr, SiH4. | [2](#ref-2): Service item (2), poly-Si entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-silane-APCVD` | A200V atmospheric SiH4/O2 example: 350–450 °C; 400 °C is the lab selection. | [4](#ref-4): A200V BASIC INFORMATION | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-dcs-LPCVD` | NYCU nitride example: 800 °C, 120 mTorr, SiH2Cl2 and NH3. | [2](#ref-2): Service item (3), nitride entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-teos-LPCVD` | NYCU thermal TEOS example: 700 °C, 120 mTorr, TEOS vapour. | [2](#ref-2): Service item (4), TEOS entry | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-teos-PECVD` | Patent example for 300 mm equipment: TEOS/O2/He, 350–400 °C, 2–4 Torr, 2–3 kW. | [8](#ref-8): Description, 300 mm wafer conditions after helium-flow discussion | Source-specific conditions; no transferable or validated simulator recipe is implied. |
| `conditions-sicl4-APCVD` | Conventional SiCl4/H2 atmospheric epitaxy: 1150–1250 °C; 1200 °C is the lab selection. | [5](#ref-5): Description, atmospheric-growth paragraph and Table I | Source-specific conditions; no transferable or validated simulator recipe is implied. |
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
| `part-flow` | Mass flow controllers measure/control gas feed; a vaporiser is a separate delivery function. | [23](#ref-23): Overview |  |
| `part-vapour` | A source vessel and heated line can supply TEOS vapour. | [26](#ref-26): Type 1150 TEOS delivery diagram |  |
| `part-pressure` | A gauge senses pressure and a throttle valve varies conductance to the vacuum pump. | [24](#ref-24): PDF p. 1, pressure-control sequence |  |
| `part-rf` | Generator and matching network deliver RF energy to a plasma. | [25](#ref-25): RF power and matching-network paragraphs |  |
| `part-showerhead` | The depicted PECVD upper electrode distributes gas through a showerhead and receives RF. | [13](#ref-13): PECVD feature list near page top |  |
| `part-furnace` | A batch LPCVD furnace can contain a quartz tube, spaced wafers, a boat, heaters and a pump. | [10](#ref-10): PDF p. 13, slide 25; [2](#ref-2): Equipment description |  |
| `part-conveyor` | An inline APCVD design moves wafers beneath gas heads over a heater. | [4](#ref-4): AMAX800V / AMAX1200 continuous-processing descriptions | Available architecture example only; no currently selected recipe uses the conveyor illustration. |
| `part-nucleation` | Bulk tungsten growth can use a prepared nucleation surface. | [22](#ref-22): Opening contact-via/nucleation discussion; [6](#ref-6): Abstract, initial nucleation |  |
| `fab-prepare` | Wafer preparation cleans/prepares the substrate for patterning and fabrication. | [27](#ref-27): §1.2.1, preparation and photoresist sequence |  |
| `fab-oxidation` | Thermal oxidation forms an oxide on a silicon surface. | [10](#ref-10): PDF p. 15, slide 30; [27](#ref-27): §1.2.4 |  |
| `fab-lithography` | Photolithography exposes and develops photoresist to transfer a pattern. | [27](#ref-27): §1.2.1 |  |
| `fab-etch` | Etching removes selected wafer material through a patterned mask. | [27](#ref-27): §1.2.2 |  |
| `fab-doping` | Doping/implantation introduces impurities to alter semiconductor electrical properties. | [27](#ref-27): §1.2.5 |  |
| `fab-metal` | Patterned metal contacts and interconnects connect devices. | [27](#ref-27): §1.2, device example; [18](#ref-18): Fig. 9.3, interconnect sequence |  |
| `fab-repeat` | Deposition, lithography and etching repeat across device and interconnect layers. | [18](#ref-18): Fig. 9.3 and subsequent metal-level processing; [27](#ref-27): §1.2, Fig. 1.7 | The seven displayed nodes are an illustrative overview, not a universal chronological fabrication sequence. |

## Model choices

- Camera geometry, colours, atom sizes, bonds, lattice positions and trajectories are schematic design choices.
- Eight displayed equations conserve element counts; this does not establish an elementary reaction mechanism.
- TEOS PECVD is qualitative. Displayed molecule counts are illustrative and are not flow ratios or reaction coefficients.
- Film thickness and eight-second playback are normalised animation controls, not measured growth or kinetic predictions.
- Temperature exploration does not calculate a deposition rate or validate the chosen tool conditions.
- Pausing PECVD when RF is off is a teaching control, not a physical prediction of residual growth.
- Reactor drawings and load/purge/cool/vent stages do not reproduce a source tool or provide an operating procedure.

## References

<a id="ref-1"></a>
### [1] University of Toronto, ECE / Toronto Nanofabrication Centre

[Equipment Capabilities](https://www.ece.utoronto.ca/equipmentcapabilities/) (n.d.). **Facility recipe.** Accessed 2026-10-23.

Locator: Deposition User Recipes → PECVD → SiO₂, second row.

Supports: 300 °C, 1000 mTorr, 170 sccm of 5% SiH₄/N₂, 710 sccm N₂O, 30 W.

Scope: One facility recipe; its measured deposition rate is not used to drive the animation.

<a id="ref-2"></a>
### [2] National Yang Ming Chiao Tung University

[Low Pressure Chemical Vapor Deposition System (LPCVD)](https://scholar.nycu.edu.tw/en/equipments/low-pressure-chemical-vapor-deposition-system-lpcvd/) (n.d.). **Facility recipe.** Accessed 2026-10-23.

Locator: Equipment Details → Description → service items (2), (3), (4).

Supports: Poly-Si: 620 °C / 300 mTorr; nitride: 800 °C / 120 mTorr; TEOS: 700 °C / 120 mTorr, with listed gases.

Scope: The wider temperature sliders are independent teaching ranges, not NYCU tool-qualified windows.

<a id="ref-3"></a>
### [3] A. Doolittle, Georgia Institute of Technology

[ECE6450, Lectures 13–14: Thin Film Deposition and Epitaxy](https://alan.ece.gatech.edu/ECE6450/Lectures/ECE6450L13and14-CVD%20and%20Epitaxy.pdf) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: PDF pp. 2–9, 14–15, 19.

Supports: CVD principles and tradeoffs; poly-Si 575–650 °C (p. 4), TEOS 650–750 °C (p. 7), DCS nitride about 700–800 °C (p. 9); epitaxy (pp. 14–15).

Scope: Broad lecture ranges are not a qualified operating envelope. The printed nitride equation contains an error; use [21] for that equation.

<a id="ref-4"></a>
### [4] M. Watanabe & Co., Ltd.

[Atmospheric Pressure CVD (APCVD) System](https://www.m-watanabe.co.jp/en/product/apcvd/) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: A200V → BASIC INFORMATION; AMAX system descriptions.

Supports: A200V SiH₄/O₂ feed and 350–450 °C range; atmospheric single-wafer and conveyor reactor examples.

Scope: 400 °C is a teaching selection within the A200V range. The drawing is not an A200V engineering model.

<a id="ref-5"></a>
### [5] J. C. Schumacher

[Ultra-pure epitaxial silicon and process for its manufacture, EP0114876B1](https://data.epo.org/publication-server/rest/v1.2/patents/EP0114876NWB1/document.pdf) (1990). **Patent.** Accessed 2026-10-23.

Locator: Description → atmospheric growth paragraph and Table I, SiCl₄ row.

Supports: Background table lists SiCl₄ in H₂ at atmospheric pressure and 1150–1250 °C.

Scope: This is background prior art, not the patent’s bromosilane invention. 1200 °C is a teaching selection; a patent is not peer-reviewed validation.

[Alternate / author full text](https://patents.google.com/patent/EP0114876B1/en).

<a id="ref-6"></a>
### [6] T. Gougousi, Y. Xu, J. N. Kidder, G. W. Rubloff and C. R. Tilford

[Process Diagnostics and Thickness Metrology Using in Situ Mass Spectrometry for the Chemical Vapor Deposition of W from H₂/WF₆](https://www.nist.gov/publications/process-diagnostics-and-thickness-metrology-using-situ-mass-spectrometry-chemical-vapor) (2000). **Research article.** Accessed 2026-10-23.

Locator: Abstract; Journal of Vacuum Science & Technology B, vol. 18, no. 3.

Supports: H₂/WF₆ at 0.5 Torr and 400–500 °C; measured HF and silicon-containing nucleation products.

Scope: The animation shows idealised bulk growth; it does not reproduce nucleation kinetics or metrology.

<a id="ref-7"></a>
### [7] E. C. Eichman, B. A. Sommer, M. J. Churley and W. C. Ramsey

[Apparatus for elimination of low temperature ammonia salts in TiCl₄ NH₃ CVD reaction, US5348587A](https://patents.google.com/patent/US5348587A/en) (1994). **Patent.** Accessed 2026-10-23.

Locator: Description → Background equation; preferred primary-reaction conditions; preferred embodiment.

Supports: TiN net equation; about 150 mTorr, TiCl₄/NH₃/Ar, wafer 450–650 °C, preferred wafer temperature about 650 °C.

Scope: The patent also heats downstream walls with a secondary plasma. That hardware is omitted from this thermal-growth schematic; this is not a complete reproduction.

<a id="ref-8"></a>
### [8] N. Arul Dhas and J. Henri

[Method of reducing defects in PECVD TEOS films, US7923376B1](https://patents.google.com/patent/US7923376B1/en) (2011). **Patent.** Accessed 2026-10-23.

Locator: Description → process conditions for 300 mm wafers, following the helium-flow discussion.

Supports: TEOS/O₂/He; typical 350–400 °C, 2–4 Torr and 2000–3000 W for the described equipment.

Scope: Equipment-specific ranges, not universal PECVD values. No balanced plasma-exhaust equation or elementary reaction mechanism is provided.

<a id="ref-9"></a>
### [9] NPTEL, Introduction to Microelectronic Fabrication Processes

[Module 3, Lecture 11: Chemical Vapor Deposition — continued](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/Lecture11.html) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Operation paragraph; example reactions for silicon, silicon dioxide and tungsten.

Supports: SiH₄ decomposition; SiH₄/O₂ and SiH₄/N₂O oxide net equations; SiCl₄/H₂ silicon; WF₆/H₂ tungsten; reactor functions.

Scope: Do not use the malformed nitride equation on this page. These selected overall equations do not predict all actual exhaust species.

<a id="ref-10"></a>
### [10] ENE5400 course notes, hosted by National Tsing Hua University

[Lecture 2: Micromachining Processes](https://www.ee.nthu.edu.tw/sclu/microfabrication.pdf) (2004). **University lecture.** Accessed 2026-10-23.

Locator: PDF p. 9 (slides 17–18), p. 13 (slides 25–26), p. 14 (slide 28), p. 15 (slide 30).

Supports: Surface transport and reaction steps, furnace parts, idealised TEOS decomposition and silane/N₂O oxide equations, polysilicon and oxidation.

Scope: PDF page and printed slide numbers differ; molecular paths and dimensions in CVD Lab are original schematics.

<a id="ref-11"></a>
### [11] Stanford Nanofabrication Facility

[Silicon Dioxide](https://snfguide.stanford.edu/guide/materials/silicon-dioxide?qt-materials=2) (n.d.). **Facility documentation.** Accessed 2026-10-23.

Locator: Opening material/process description.

Supports: Silane/N₂O PECVD and silane or TEOS oxide precursor pairings.

Scope: Stanford lists helium-diluted silane for its CCP tool. Nitrogen dilution in this lab comes from Toronto [1], not Stanford.

<a id="ref-12"></a>
### [12] Stanford Nanofabrication Facility

[Tystar Bank 2 Tube 7 Nitride (B2T7 Flexible Nitride)](https://snfguide.stanford.edu/guide/equipment/tystar-bank-2-tube-7-nitride-b2t7-flexible-nitride) (n.d.). **Facility documentation.** Accessed 2026-10-23.

Locator: Overview; Processing Techniques; Gases.

Supports: Nitride LPCVD equipment with dichlorosilane and ammonia; different nitride processes.

Scope: Supports the process pairing, not the exact coefficients in the net equation or the NYCU setpoint.

<a id="ref-13"></a>
### [13] Oxford Instruments Plasma Technology

[Plasma enhanced chemical vapour deposition (PECVD)](https://plasma.oxinst.com/technologies/pecvd) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: PECVD feature list near page top; Applications; dual-frequency equipment description.

Supports: RF-driven upper electrode/showerhead, heated substrate, lower-temperature processes, frequency mixing and TEOS SiO₂ films.

Scope: Manufacturer examples; they do not establish that all PECVD systems use the same geometry or frequency.

<a id="ref-14"></a>
### [14] Princeton Plasma Physics Laboratory

[About Plasmas and Fusion](https://www.pppl.gov/about/about-plasmas-and-fusion) (n.d.). **Research laboratory explanation.** Accessed 2026-10-23.

Locator: What is Plasma?.

Supports: Partially ionised gas containing ions, electrons and neutral species.

Scope: General plasma definition, not a model of the electron distribution in this simulator.

<a id="ref-15"></a>
### [15] CORIAL / Plasma-Therm

[Plasma Enhanced Chemical Vapor Deposition (PECVD)](https://corial.plasmatherm.com/en/technologies/pecvd-plasma-enhanced-chemical-vapor-deposition) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: PECVD technology.

Supports: 13.56 MHz example, collisional creation of reactive species, surface film formation and exhaust removal.

Scope: One equipment family; RF frequency is not a universal PECVD constant.

<a id="ref-16"></a>
### [16] NPTEL, CMOS Integrated Circuit Fabrication

[Chapter 3, §3.1.1: Crystals](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide2.htm) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Polycrystalline-material definition.

Supports: Crystal grains, differing orientations and grain boundaries.

Scope: A structural definition does not specify chemical purity.

<a id="ref-17"></a>
### [17] Wacker Chemie AG

[Purity Is Our Recipe for Success, Annual Report 2022](https://reports.wacker.com/2022/annual-report/sustainable-solutions/purity-is-our-recipe-for-success.html) (2022). **Manufacturer process report.** Accessed 2026-10-23.

Locator: Siemens-process and metallurgical-silicon purification paragraphs; Polysilicon glossary.

Supports: Purification of metallurgical silicon and production of high-purity bulk polysilicon for wafer makers.

Scope: Bulk feedstock manufacture is distinct from a deposited thin poly-Si film. No numerical purity claim is imported into CVD Lab.

<a id="ref-18"></a>
### [18] NPTEL, Introduction to Microelectronic Fabrication Processes

[Module 9, Lecture 30: BEOL Issues and Aluminum Metallization](https://archive.nptel.ac.in/content/storage2/courses/103106075/Courses/9_2.html) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: Opening paragraph; Fig. 9.3 and repeated interconnect sequence.

Supports: SiO₂ insulation, Ti/TiN barrier/adhesion role, CVD tungsten via fill and repeated lithography/etch/deposition.

Scope: Its illustrated Ti/TiN liner is deposited by PVD. This source supports the material role, not a TiN CVD recipe.

<a id="ref-19"></a>
### [19] A. Sheikholeslami, TU Wien Institute for Microelectronics

[Annual Review 2006: Topography Simulation](https://www.iue.tuwien.ac.at/personal/jb2006/content/staff/Sheikholeslami.html) (2006). **Research group report.** Accessed 2026-10-23.

Locator: Topography Simulation → passivation and moisture-barrier discussion.

Supports: PECVD TEOS oxide with silicon-nitride passivation and moisture-barrier context.

Scope: Supports this application; it does not validate the exact film properties of the NYCU nitride recipe.

<a id="ref-20"></a>
### [20] NPTEL, CMOS Integrated Circuit Fabrication

[Chapter 3: Low Pressure Chemical Vapor Deposition (LPCVD)](https://archive.nptel.ac.in/content/storage2/courses/117103066/chap3/slides/slide103.htm) (n.d.). **University lecture.** Accessed 2026-10-23.

Locator: First two paragraphs and doping discussion.

Supports: Poly-Si gates, short interconnects and resistors; silane growth, temperature range and doping context.

Scope: Applications are examples, not a claim that every modern gate uses polysilicon.

<a id="ref-21"></a>
### [21] G. Peev, L. Zambov and Y. Yanakiev

[Kinetics of the chemical reaction between dichlorosilane and ammonia during silicon nitride film deposition](https://doi.org/10.1016/0040-6090(90)90456-N) (1990). **Research article.** Accessed 2026-10-23.

Locator: Thin Solid Films 189(2), pp. 275–282; p. 276, Eq. (1).

Supports: Balanced stoichiometric DCS/NH₃ → Si₃N₄ + HCl + H₂ net reaction.

Scope: Eq. (1) was checked in the author-uploaded full text. Actual composition and side products depend on process conditions.

[Alternate / author full text](https://www.researchgate.net/publication/222199359_Kinetics_of_the_chemical_reaction_between_dichlorosilane_and_ammonia_during_silicon_nitride_film_deposition).

<a id="ref-22"></a>
### [22] Z. Chen, Applied Materials

[Introducing a Breakthrough in 2D Scaling](https://www.appliedmaterials.com/us/en/blog/blog-posts/introducing-a-breakthrough-in-2d-scaling.html) (2020). **Manufacturer technical article.** Accessed 2026-10-23.

Locator: Opening contact-via discussion and Fig. 1.

Supports: Conventional TiN liner/barrier, tungsten nucleation layer and tungsten contact-metal fill.

Scope: The article also discusses a different selective process that eliminates the liner; this lab illustrates the conventional context.

<a id="ref-23"></a>
### [23] MKS Instruments

[1179C01313CR1BV Mass Flow Controller](https://www.mks.com/p/1179C01313CR1BV) (n.d.). **Manufacturer documentation.** Accessed 2026-10-23.

Locator: Overview.

Supports: A mass flow controller measures and controls a gas feed.

Scope: Supports the component function, not selection or qualification of this exact part for every precursor.

<a id="ref-24"></a>
### [24] MKS Instruments

[Downstream Pressure Controllers and Valves — Product Selection Guide](https://www.mksinst.com/docs/UR/dwnstrem.pdf) (n.d.). **Manufacturer technical guide.** Accessed 2026-10-23.

Locator: PDF p. 1, pressure-control explanation.

Supports: Pressure measurement, controller feedback and exhaust-throttle conductance to the vacuum pump.

Scope: The gauge, valve and pump functions are explained; no closed-loop pressure solver is implemented.

<a id="ref-25"></a>
### [25] MKS Instruments

[Pulsed Radio Frequency RF Solution for Critical Processes](https://www.mks.com/n/pulsed-radio-frequency-rf-solution-for-critical-processes) (n.d.). **Manufacturer technical article.** Accessed 2026-10-23.

Locator: RF power and matching-network paragraphs.

Supports: Generator sustains the discharge; impedance matching improves transfer of power to the plasma.

Scope: RF-off pause is an animation rule, not a prediction of residual physical deposition.

<a id="ref-26"></a>
### [26] MKS Instruments

[1150 and 1152 Vapor Source Mass-Flow Controllers](https://www.mks.com/docs/ur/1150_2.pdf) (n.d.). **Manufacturer technical guide.** Accessed 2026-10-23.

Locator: Type 1150 vapour-delivery diagram (TEOS source container and heated delivery tube).

Supports: TEOS vapour delivery with a source vessel, flow controller and heated line.

Scope: The indexed primary PDF diagram was verified. Source and line temperatures from that diagram are not used as recipe values.

<a id="ref-27"></a>
### [27] V. Simonka, TU Wien Institute for Microelectronics

[Thermal Oxidation and Dopant Activation of Silicon Carbide — Device Fabrication](https://www.iue.tuwien.ac.at/phd/simonka/Device-Fabrication.html) (n.d.). **University dissertation.** Accessed 2026-10-23.

Locator: §1.2, Fig. 1.7 and §§1.2.1–1.2.5.

Supports: Wafer processing, photoresist exposure/development, etching, oxidation, implantation and patterned metal contacts.

Scope: The illustrated device is a SiC MOSFET. Only general process definitions are used; its sequence is not a universal silicon process flow.
