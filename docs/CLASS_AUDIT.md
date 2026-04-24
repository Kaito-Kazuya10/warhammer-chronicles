# CLASS AUDIT — Warhammer Chronicles

> **Generated:** 2026-04-23  
> **Source files read:** 5 class definitions, 5 tab components, `characterStore.ts`, `resolveUsesCount.ts`, `types/module.ts`, `types/character.ts`  
> **Purpose:** Forensic snapshot of what each class does in the codebase, for comparison against tabletop ruleset docs.

---

## Table of Contents

1. [Imperial Guardsman](#1-imperial-guardsman)
2. [Augmenticist](#2-augmenticist)
3. [Gene-Fighter](#3-gene-fighter)
4. [Psyker](#4-psyker)
5. [Zealot](#5-zealot)
6. [Cross-Class Summary](#6-cross-class-summary)
7. [Observations & Anomalies](#7-observations--anomalies)

---

# 1. Imperial Guardsman

**File:** `src/modules/core/classes/imperialGuardsman.ts` (1649 lines)  
**Tab Component:** `FeaturesTab.tsx` (generic, shared with all non-specialized classes)

## 1.1 Metadata

| Field | Value |
|---|---|
| `id` | `imperial-guardsman` |
| `hitDie` | d10 |
| `primaryAbility` | DEX, CON, WIS |
| `savingThrows` | STR, CON |
| `skillChoices` | athletics, intimidation, perception, survival, medicine, history, insight |
| `numSkillChoices` | 3 |
| `armorProficiencies` | light, medium, shields |
| `weaponProficiencies` | simple, martial |
| `toolProficiencies` | _(none)_ |
| `startingWealthFormula` | 5d4 x 10 Thrones |
| `featureTabName` | "Regimental Doctrine" |
| `subclassLabel` | "Regiment" |
| `tags` | ranged, martial, military |

## 1.2 Class Resource

**None defined.** No `classResource` field on this class.

The class uses `featureUsesSpent` for per-feature tracking (Aimed Shot, Second Wind, etc.) with individual `usesPerRest`/`usesCount` on each feature. This is correct for a Fighter-chassis class with no shared pool.

## 1.3 Subclasses (Regiments) — 6 total

| # | ID | Name | Unlock | Features |
|---|---|---|---|---|
| 1 | `cadian-shock-trooper` | Cadian Shock Trooper | L1 | 20 features |
| 2 | `catachan-jungle-fighter` | Catachan Jungle Fighter | L1 | 19 features |
| 3 | `tallarn-desert-raider` | Tallarn Desert Raider | L1 | 19 features |
| 4 | `vostroyan-firstborn` | Vostroyan Firstborn | L1 | 19 features |
| 5 | `kriegsman` | Kriegsman (Death Korps of Krieg) | L1 | 19 features |
| 6 | `heavy-weapons-specialist` | Heavy Weapons Specialist | L1 | 19 features |

All 6 regiments unlock at level 1 (subclass chosen at character creation).

## 1.4 Base Class Features by Level

| Level | Feature | Type | Action | Uses | Reset |
|---|---|---|---|---|---|
| 1 | Fighting Style | base | passive | — | — |
| 2 | Fire Discipline | base | action | proficiency | short |
| 2 | Second Wind | base | bonus-action | 1 | short |
| 2 | Squad Tactics | base | reaction | 1 | short |
| 4 | Ability Score Improvement | base | passive | — | — |
| 5 | Extra Attack | base | passive | — | — |
| 5 | Battlefield Awareness | base | passive | — | — |
| 7 | Improved Fire Discipline | base | passive | — | — |
| 7 | Veteran's Reflexes | base | reaction | proficiency | long |
| 8 | Ability Score Improvement | base | passive | — | — |
| 9 | Indomitable | base | special | 1 | long |
| 10 | Ability Score Improvement | base | passive | — | — |
| 10 | Hold the Line | base | special | 1 | long |

**Total base features:** 13  
**ASIs:** 3 (levels 4, 8, 10)

## 1.5 Subclass Feature Structure (per regiment)

Each regiment has features at levels **1, 3, 6, 9**.

At each subclass level the pattern is:
- **core** features (always granted)
- **main** features (always granted)
- **option** features (player chooses one from an `optionGroup`)

**Cadian example:** L1 = 3 features (1 core, 2 main), L3 = 6 features (1 core, 2 main, 3 options), L6 = 7 features (1 core, 2 main, 4 options), L9 = 7 features (1 core, 2 main, 4 options).

Some options have `sourceFeature` pointing to an earlier feature — these are "Enhance" upgrades that replace the original in the UI.

## 1.6 Level-Up Choices

| Level | optionGroup | Options |
|---|---|---|
| 3 | `cadian-level-3` | Overwatch Protocol, Rapid Fire Drill, Unshakeable Nerve (Enhanced) |
| 6 | `cadian-level-6` | Artillery Observer, Tactical Withdrawal, Volley Fire (Enhanced), Suppressing Fire (Enhanced) |
| 9 | `cadian-level-9` | Cadian Commander, Last Stand Protocol, Decisive Commander (Enhanced), Combined Arms Doctrine (Enhanced) |

_(Similar structure for all 6 regiments — each has 3 option tiers at L3/L6/L9.)_

## 1.7 Tab Behavior

Uses the **generic FeaturesTab.tsx**:
- Collects all base + subclass features at or below character level
- Groups by level, sorted ascending
- Handles `optionGroup` filtering: only shows the chosen option (stored in `character.featureChoices[optionGroup]`)
- Handles `sourceFeature` "Enhance" replacements: shows enhanced version in place of the original, marked with "ENHANCED" badge
- Tracks uses via `character.featureUsesSpent[slugified-name]` with a USE button and remaining/max counter
- Displays `usesPerRest` as "SR" (short rest) or "LR" (long rest)
- Special handling for Fighting Style: passes `character.fightingStyle` to `renderDescription`

## 1.8 Character Fields Touched

| Field | Read/Write | Context |
|---|---|---|
| `character.class` | read | determine class definition |
| `character.subclass` | read | determine regiment |
| `character.level` | read | filter features by level |
| `character.featureChoices` | read | determine chosen options |
| `character.featureUsesSpent` | read/write | track feature uses |
| `character.fightingStyle` | read | Fighting Style description rendering |
| `character.proficiencyBonus` | read | resolve `usesCount: 'proficiency'` |
| `character.abilityScores.*` | read | resolve `usesCount: 'wisdom'`, 'dexterity', etc. |

## 1.9 Rest Behavior

No dedicated rest handler in `characterStore.ts`. Rest behavior is implicit:
- **Short rest features** (`usesPerRest: 'short'`): Fire Discipline, Second Wind, Squad Tactics, various subclass features. The UI shows these as "SR" but **clearing `featureUsesSpent` is manual** — the store has no `shortRest()` action. The UI must reset these via `updateCharacter()` patches.
- **Long rest features** (`usesPerRest: 'long'`): Veteran's Reflexes, Indomitable, Hold the Line, various subclass features. Same manual-reset pattern.

**Character fields `lastShortRest` and `lastLongRest`** exist on the Character type but no automated reset logic consumes them.

## 1.10 Dependencies

- **Content modules referenced:** None (no spells, augments, or gene mods)
- **Items referenced in `startingEquipmentResolved`:** flak-armor-full, mesh-armor, lasgun, autogun, combat-knife, frag-grenade, chainsword, military-pack
- **resolveUsesCount tokens used:** `'proficiency'`, `'wisdom'`, `'dexterity'`, `'1'`, `'charisma'` (subclass features), `'constitution'` (Kriegsman)

## 1.11 Observations

1. **`usesCount: '1 + charisma'` does NOT appear** on Imperial Guardsman (it does on Zealot). The `resolveUsesCount` function does not support compound formulas like `'1 + charisma'` — it only handles single tokens. This will be flagged under Zealot.
2. **`usesPerRest: 'special'`** appears on "The Planet Broke Before the Guard Did" (Cadian L9). The FeaturesTab code filters out `'special'` from use-tracking (`!== 'at-will'` and `!== 'per-encounter'` but does match `'special'`). Since `usesCount` is not set on this feature, `hasUses` evaluates to false. Correct behavior — no use tracker shown.
3. **No level-3 base class feature.** The Guardsman skips level 3 for base features, which is intentional (subclass features fill that slot).
4. **Fighting Style description uses `[CHOOSE ONE]` convention** but Fighting Style is handled specially in `renderDescription` via the `fightingStyle` prop, not via `optionGroup`. This is a dual system — works but inconsistent.

---

# 2. Augmenticist

**File:** `src/modules/core/classes/augmenticist.ts` (759 lines)  
**Tab Component:** `LoadoutTab.tsx` (Augmenticist-specific)

## 2.1 Metadata

| Field | Value |
|---|---|
| `id` | `augmenticist` |
| `hitDie` | d8 |
| `primaryAbility` | DEX, WIS |
| `savingThrows` | DEX, INT |
| `skillChoices` | acrobatics, athletics, technology, insight, medicine, perception, stealth, survival |
| `numSkillChoices` | 3 |
| `armorProficiencies` | light |
| `weaponProficiencies` | simple, improvised weapons, unarmed strikes |
| `toolProficiencies` | Mechanic's tools |
| `startingWealthFormula` | 4d4 x 10 Thrones |
| `featureTabName` | "Augment Loadout" |
| `subclassLabel` | "Specialization" |
| `tags` | martial, cybernetic, monk |

## 2.2 Class Resource

| Field | Value |
|---|---|
| `name` | Power Cells |
| `type` | pool |
| `maxFormula` | "See class table" |
| `resetOn` | short |
| `playerVisible` | true |

**Note:** `resetOn: 'short'` in the class definition, but `LoadoutTab.tsx` line 308 displays "Recharge on long rest" — **this is a mismatch**. The `classResource.resetOn` says `'short'` but the UI says long rest. The feature description (Power Cells, L2) says "short or long rest". The UI label is wrong.

**Power Cells tracked via:** `character.powerCells: { current: number; max: number }` — a dedicated field on Character, not the generic `classResourceCurrent`.

**Augment Slots tracked via:** `character.augmentSlots` (number) and `character.installedAugmentIds` (string array).

## 2.3 Subclasses (Specializations) — 4 total

| # | ID | Name | Unlock | Features |
|---|---|---|---|---|
| 1 | `tech-integrator` | Tech-Integrator | L3 | 10 features |
| 2 | `medicae-savant` | Medicae Savant | L3 | 12 features |
| 3 | `ballistic-frame` | Ballistic Frame | L3 | 10 features |
| 4 | `velocity-frame` | Velocity Frame | L3 | 9 features |

All 4 specializations unlock at level 3.

## 2.4 Base Class Features by Level

| Level | Feature | Type | Action | Uses | Reset |
|---|---|---|---|---|---|
| 1 | Augmentation System | base | passive | — | — |
| 1 | Unarmored Defense | base | passive | — | — |
| 1 | Martial Arts | base | passive | — | — |
| 2 | Power Cells | base | bonus-action | — | — |
| 2 | Integrated Weapons | base | passive | — | — |
| 2 | Unarmored Movement | base | passive | — | — |
| 3 | Deflect Missiles | base | reaction | — | — |
| 4 | Ability Score Improvement | base | passive | — | — |
| 4 | Slow Fall | base | reaction | — | — |
| 5 | Extra Attack | base | passive | — | — |
| 5 | Stunning Strike | base | free | — | — |
| 6 | System Hardening | base | bonus-action | — | — |
| 7 | Evasion | base | passive | — | — |
| 7 | Stillness of Mind | base | action | — | — |
| 8 | Ability Score Improvement | base | passive | — | — |
| 9 | Advanced Integration | base | passive | — | — |
| 10 | Ability Score Improvement | base | passive | — | — |
| 10 | Perfected Machine | base | bonus-action | 1 | long |

**Total base features:** 18  
**ASIs:** 3 (levels 4, 8, 10)

**Note:** Most base features lack `usesPerRest`/`usesCount` because they are powered by the Power Cell pool (spend cells as described in text, not tracked per-feature). Only Perfected Machine has explicit `usesPerRest: 'long'` (for Overload Protocols).

## 2.5 Tab Behavior (LoadoutTab.tsx)

The Augmenticist uses a **completely different tab** from other classes:

- **Slot Bar:** Shows used/max augment slots with progress bar. Base slots from `character.augmentSlots` (default 4). Multi-weapon-system augment adds +3 slots.
- **Power Cells widget:** Interactive pip grid for `character.powerCells.current / .max`. +/- buttons and clickable pips. Label says "Recharge on long rest" (see mismatch note above).
- **Installed augments section:** Lists augments from `character.installedAugmentIds`, each with REMOVE button, expandable description, and use-tracking checkboxes (for augments with `usesPerRest`/`usesCount`).
- **Available augments browser:** Split into Universal and Specialization-exclusive sections. Filtered by minor/major/extreme. INSTALL button disabled when not enough slots.
- **Use tracking on augments:** Same `featureUsesSpent[slugified-name]` mechanism as FeaturesTab, via `resolveUsesCount`.

## 2.6 Character Fields Touched

| Field | Read/Write | Context |
|---|---|---|
| `character.augmentSlots` | read | augment slot budget |
| `character.installedAugmentIds` | read/write | install/remove augments |
| `character.powerCells` | read/write | Power Cell current/max |
| `character.featureUsesSpent` | read/write | augment use tracking |
| `character.class` | read | class identification |
| `character.subclass` | read | filter specialization augments |

## 2.7 Rest Behavior

- **Power Cells:** `resetOn: 'short'` in class definition. No automated reset in store. Manual via `updateCharacter`.
- **Augment swapping:** "Swap on long rest" label. Advanced Integration (L9) allows one swap on short rest.
- **Augment uses:** Each augment has its own `usesPerRest` (short or long). Same manual-reset pattern.

## 2.8 Dependencies

- **Augments:** 55 augment entries in `augments.ts` (964 lines). Retrieved via `getAllAugments()` and `getAugmentById()`.
- **Items referenced in `startingEquipmentResolved`:** armored-bodyglove, combat-knife

## 2.9 Observations

1. **Power Cell reset label mismatch:** `classResource.resetOn: 'short'` but LoadoutTab displays "Recharge on long rest". Feature description says "short or long rest". The UI label at line 308 is incorrect.
2. **No `optionGroup` features in subclasses.** Unlike Imperial Guardsman, no Augmenticist subclass features have `featureType: 'option'`. All are `'core'` or `'main'`. No level-up choices within specialization.
3. **Augmenticist uses two separate tabs** (FeaturesTab for class features, LoadoutTab for augments). The tab routing is handled elsewhere.
4. **`classResource.maxFormula` is "See class table"** — not a computable formula. The actual max is set manually on `character.powerCells.max` during level-up. No level-up automation exists in the store.

---

# 3. Gene-Fighter

**File:** `src/modules/core/classes/geneFighter.ts` (542 lines)  
**Tab Component:** `GeneModTab.tsx` (Gene-Fighter-specific)

## 3.1 Metadata

| Field | Value |
|---|---|
| `id` | `gene-fighter` |
| `hitDie` | d12 |
| `primaryAbility` | STR, CON |
| `savingThrows` | STR, CON |
| `skillChoices` | athletics, acrobatics, intimidation, perception, survival, medicine, insight |
| `numSkillChoices` | 3 |
| `armorProficiencies` | light, medium, shields |
| `weaponProficiencies` | simple, martial |
| `toolProficiencies` | _(none)_ |
| `startingWealthFormula` | 5d4 x 10 Thrones |
| `featureTabName` | "Bio Modifications" |
| `subclassLabel` | "Genetic Archetype" |
| `tags` | martial, melee, biological, tank |

## 3.2 Class Resource

| Field | Value |
|---|---|
| `name` | Gene-Surges |
| `type` | pool |
| `maxFormula` | "See class table" |
| `resetOn` | long |
| `playerVisible` | true |

**Gene-Surges tracked via:** `character.geneSurgesRemaining` (number) and `character.isInGeneSurge` (boolean).

**Note:** The Gene-Surge base feature at L1 hardcodes `usesCount: '3'` — the class table starts at 3 uses, increasing to 4 at L6. The feature text says "3 uses at L1, 4 at L6" but the `usesCount` on the feature is statically `'3'`. Perfected Form (L10) grants one additional use ("one additional time between long rests") but there's no way to compute this dynamically from `usesCount`. The tab component (`GeneModTab`) does not show a Gene-Surge counter — it only shows a toggle button (GENE-SURGE / SURGING).

## 3.3 Subclasses (Genetic Archetypes) — 3 total

| # | ID | Name | Unlock | Features |
|---|---|---|---|---|
| 1 | `abomination-juggernaut` | Abomination Juggernaut | L3 | 9 features |
| 2 | `elemental-chimera` | Elemental Chimera | L3 | 6 features |
| 3 | `apex-predator` | Apex Predator | L3 | 10 features |

All 3 archetypes unlock at level 3.

**Note:** No subclass features have `featureType: 'option'`. All are `'core'` or `'main'`. No level-up choices within archetype. This differs from Imperial Guardsman which has 3 options per subclass level.

## 3.4 Base Class Features by Level

| Level | Feature | Type | Action | Uses | Reset |
|---|---|---|---|---|---|
| 1 | Gene-Modifications | base | passive | — | — |
| 1 | Gene-Surge | base | bonus-action | 3 | long |
| 1 | Unarmored Defense | base | passive | — | — |
| 2 | Reckless Attack | base | free | — | — |
| 2 | Danger Sense | base | passive | — | — |
| 4 | Ability Score Improvement | base | passive | — | — |
| 5 | Extra Attack | base | passive | — | — |
| 5 | Fast Movement | base | passive | — | — |
| 6 | Adapted Physiology | base | passive | — | — |
| 7 | Primal Instinct | base | passive | — | — |
| 8 | Ability Score Improvement | base | passive | — | — |
| 9 | Brutal Critical | base | passive | — | — |
| 10 | Ability Score Improvement | base | passive | — | — |
| 10 | Perfected Form | base | passive | — | — |

**Total base features:** 14  
**ASIs:** 3 (levels 4, 8, 10)

## 3.5 Tab Behavior (GeneModTab.tsx)

The Gene-Fighter uses a **dedicated tab**:

- **Stability Bar:** Shows `stabilityUsed / stabilityMax` (Genetic Stability Score = CON mod + proficiency x 2). Color-coded: green → warning → crimson.
- **Gene-Surge toggle:** Button that toggles `character.isInGeneSurge`. Shows "SURGING" or "GENE-SURGE".
- **Stability Check button:** Rolls a d20 with bonus/penalty based on free stability slots. Uses `diceStore.addRoll()`.
- **Installed modifications:** Lists from `character.installedModIds`, each with Passive Effect, During Gene-Surge, and Side Effect sections in the expandable description. REMOVE button.
- **Available modifications browser:** Split into Base Modifications and Archetype-exclusive. Filtered by minor/major/extreme tier.
- **No use-tracking on individual mods.** Gene mods don't have `usesPerRest`/`usesCount` in the GeneModification interface — they have `surgeUsesPerRest`/`surgeUsesCount` but GeneModTab does not render use-tracking pips for them.

## 3.6 Character Fields Touched

| Field | Read/Write | Context |
|---|---|---|
| `character.installedModIds` | read/write | install/remove mods |
| `character.isInGeneSurge` | read/write | toggle Gene-Surge |
| `character.abilityScores.constitution` | read | Stability Score calculation |
| `character.proficiencyBonus` | read | Stability Score calculation |
| `character.class` | read | class identification |
| `character.subclass` | read | filter archetype mods |

**Not touched:** `character.geneSurgesRemaining` (exists on Character type but GeneModTab doesn't track remaining surges — only toggle on/off). `character.geneticInstability` (exists but not displayed or modified by GeneModTab).

## 3.7 Rest Behavior

- **Gene-Surges:** `resetOn: 'long'`. No automated reset. Gene-Surge toggle has no counter for remaining uses.
- **Gene-Modification swapping:** Adapted Physiology (L6) says "change one mod on long rest". No automated enforcement.

## 3.8 Dependencies

- **Gene Modifications:** 47 entries in `geneModifications.ts` (763 lines). Retrieved via `getAllGeneModifications()` and `getGeneModificationById()`.
- **Items referenced in `startingEquipmentResolved`:** guard-flak, flak-jacket, chainsword, combat-shield, combat-knife, power-maul, autopistol, frag-grenade

## 3.9 Observations

1. **Gene-Surge remaining count is not tracked in the tab.** The tab only has a toggle for active/inactive. `character.geneSurgesRemaining` exists on the type but is not read or written by GeneModTab. There is no UI showing "3/3 surges remaining".
2. **`geneticInstability`** (0+, triggers mutations at thresholds) exists on Character type but is not shown or modified by any tab. GM-facing only.
3. **`surgeUsesPerRest`/`surgeUsesCount`** fields exist on the GeneModification interface but GeneModTab does not render use-tracking pips for individual mods. These fields are defined but unused in the UI.
4. **Gene-Surge `usesCount: '3'` is static.** At L6 it should be 4, at L10 it should be 5 (Perfected Form adds one). The feature table on the FeaturesTab would show "3/3 LR" at all levels. The FeaturesTab does display it, but the count is always 3.
5. **Stability Score formula is hardcoded in GeneModTab** (`calcStabilityScore`: CON mod + proficiency x 2). The class description in the feature text matches. If the formula changes in the ruleset, it must be updated in both places.

---

# 4. Psyker

**File:** `src/modules/core/classes/psyker.ts` (369 lines)  
**Tab Component:** `WarpDisciplinesTab.tsx` (Psyker-specific)

## 4.1 Metadata

| Field | Value |
|---|---|
| `id` | `psyker` |
| `hitDie` | d6 |
| `primaryAbility` | INT, WIS |
| `savingThrows` | INT, WIS |
| `skillChoices` | arcana, deception, history, insight, intimidation, investigation, medicine, perception, persuasion, religion |
| `numSkillChoices` | 2 |
| `armorProficiencies` | _(none)_ |
| `weaponProficiencies` | daggers, quarterstaffs, light crossbows, stub guns, laspistols |
| `toolProficiencies` | _(none)_ |
| `startingWealthFormula` | 3d4 x 10 Thrones |
| `featureTabName` | "Warp Disciplines" |
| `subclassLabel` | "Discipline" |
| `tags` | caster, warp, glass-cannon |

## 4.2 Class Resource

| Field | Value |
|---|---|
| `name` | Warp Bar |
| `type` | bar |
| `maxFormula` | "20" |
| `playerVisible` | true |
| `resetOn` | _(not set)_ |

**No `resetOn`** — intentional. The Warp Bar resets to 0 when Perils triggers (at max), not on any rest. The tab handles this with a manual RESET button.

**Warp Bar tracked via:** `character.warpBar` (number, 0–20 or 0–25 at L10).

**Spell Slots tracked via:** `character.spellSlots` (SpellSlots object).

**Prepared powers tracked via:** `character.preparedSpellIds` (string array).

## 4.3 Subclasses (Psychic Disciplines) — 4 total

| # | ID | Name | Unlock | Features |
|---|---|---|---|---|
| 1 | `biomancer` | Biomancer | L1 | 14 features |
| 2 | `pyromancer` | Pyromancer | L1 | 14 features |
| 3 | `telepath` | Telepath | L1 | 13 features |
| 4 | `diviner` | Diviner | L1 | 14 features |

All 4 disciplines unlock at level 1.

**Psyker subclasses DO have option features.** Each discipline has `featureType: 'option'` features with `optionGroup` at levels 6 and 9, giving players choices within their discipline.

## 4.4 Base Class Features by Level

| Level | Feature | Type | Action | Uses | Reset |
|---|---|---|---|---|---|
| 1 | Psychic Powers (Spellcasting) | base | passive | — | — |
| 1 | Sanctioning Status | base | passive | — | — |
| 1 | Psychic Focus | base | passive | — | — |
| 2 | Warp Echo | base | passive | — | — |
| 2 | Warp Sense | base | passive | — | — |
| 3 | Psychic Resilience | base | passive | — | — |
| 4 | Ability Score Improvement | base | passive | — | — |
| 5 | Focus Evolution | base | passive | — | — |
| 5 | Empowered Casting | base | passive | — | — |
| 7 | Improved Warp Echo | base | passive | — | — |
| 7 | Psychic Fortitude | base | reaction | proficiency | long |
| 8 | Ability Score Improvement | base | passive | — | — |
| 10 | Ability Score Improvement | base | passive | — | — |
| 10 | Master of the Warp | base | passive | — | — |

**Total base features:** 14  
**ASIs:** 3 (levels 4, 8, 10)

**Note:** No level 6 or level 9 base class features. Those levels are filled entirely by subclass features.

## 4.5 Tab Behavior (WarpDisciplinesTab.tsx)

The Psyker uses a **dedicated tab**:

- **Warp Bar widget:** Interactive bar with +/- buttons, RESET button, and "PERILS OF THE WARP" warning at max. Bar max is 20 normally, 25 at level 10 (hardcoded in tab: `character.level >= 10 ? 25 : 20`).
- **Power Slots section:** SlotPips for each spell slot level with clickable toggles.
- **Preparation limit:** Computed as `character.level + max(INT mod, WIS mod)` (minimum 1). Uses `Math.max(intMod, wisMod)` — this means the tab supports either INT or WIS as the psychic ability, computing the better one.
- **Always Prepared powers:** Shown in a separate section, AUTO badge, can be cast but not unprepared.
- **Prepared Powers:** Shows count against prep limit. UNPREPARE and CAST buttons (cast at various slot levels).
- **Discipline Filter:** BIO/PYR/TEL/DIV/ALL toggle buttons to filter available powers.
- **Cast mechanics:** Casting a leveled power consumes a slot AND adds `warpCost` (or `level + 1` default) to Warp Bar. Casting a cantrip adds warp only.
- **Power data source:** `getAllSpells().filter(s => s.spellSource === 'psyker')`.

## 4.6 Character Fields Touched

| Field | Read/Write | Context |
|---|---|---|
| `character.warpBar` | read/write | Warp Bar current value |
| `character.spellSlots` | read/write | power slot tracking |
| `character.preparedSpellIds` | read/write | prepared power list |
| `character.level` | read | Warp Bar max, prep limit |
| `character.abilityScores.intelligence` | read | prep limit calculation |
| `character.abilityScores.wisdom` | read | prep limit calculation |

**Not touched:** `character.psykerDiscipline` (exists on Character type for storing chosen discipline, but WarpDisciplinesTab doesn't read it — discipline filtering is manual via UI toggle). `character.sanctioningStatus` (exists but not read by tab).

## 4.7 Rest Behavior

- **Warp Bar:** No `resetOn`. Resets to 0 only on Perils (manual RESET button).
- **Power Slots:** Reset on long rest (standard spellcaster behavior). No automated reset.
- **Psychic Focus Integrity:** Tracked in feature descriptions but not as a dedicated Character field. No UI widget.

## 4.8 Dependencies

- **Psyker Powers:** 85 entries (by id count) in `psykerPowers.ts` (223 lines). Retrieved via `getAllSpells()` filtered by `spellSource === 'psyker'`.
- **Items referenced in `startingEquipmentResolved`:** laspistol, stub-pistol, quarterstaff, combat-knife

## 4.9 Observations

1. **`character.psykerDiscipline`** (type: PsychicDiscipline) exists on Character but WarpDisciplinesTab does not use it. The tab has its own local state for discipline filtering. The field is presumably set during character creation but has no gameplay effect in the tab.
2. **`character.sanctioningStatus`** ('sanctioned' | 'unsanctioned') exists but is not read by any tab. The mechanical differences between sanctioned/unsanctioned are described in the Sanctioning Status feature text but not enforced programmatically.
3. **Warp Bar max hardcoded in tab** (`level >= 10 ? 25 : 20`). The `classResource.maxFormula` is just "20". The L10 feature "Master of the Warp" increases it to 25, but this is handled ad-hoc in the tab, not derived from the class definition.
4. **Prep limit formula** in the tab uses `max(INT, WIS)` modifier. The class feature text says "choose INT or WIS at 1st level (permanent)". The tab doesn't enforce the "permanent choice" — it just uses whichever is higher.
5. **Psychic Focus Integrity** is described in multiple features (L1, L5, L10) as a 3-point/5-point/7-point system, but there's no Character field for it. It's purely narrative/GM-tracked.
6. **`arcana` in skillChoices** — note the SkillName type comment says arcana is deprecated ("replaced by xenology/technology"). Psyker is the only class that lists arcana.

---

# 5. Zealot

**File:** `src/modules/core/classes/zealot.ts` (903 lines)  
**Tab Component:** `PrayersTab.tsx` (Zealot-specific)

## 5.1 Metadata

| Field | Value |
|---|---|
| `id` | `zealot` |
| `hitDie` | d10 |
| `primaryAbility` | CHA, STR |
| `savingThrows` | WIS, CHA |
| `skillChoices` | athletics, insight, intimidation, medicine, perception, persuasion, religion |
| `numSkillChoices` | 2 |
| `armorProficiencies` | light, medium, heavy, shields |
| `weaponProficiencies` | simple, martial |
| `toolProficiencies` | _(none)_ |
| `startingWealthFormula` | 5d4 x 10 Thrones |
| `featureTabName` | "Acts of Faith" |
| `subclassLabel` | "Holy Order" |
| `tags` | divine, martial, healer, anti-chaos |

## 5.2 Class Resource

**None defined.** No `classResource` field on this class.

The Zealot uses `character.spellSlots` for prayer slots (same system as Psyker's power slots). Prayers are Spell objects with `spellSource: 'prayer'`.

**This is notable:** The Zealot has no unique class resource (no equivalent to Power Cells or Warp Bar). Lay on Hands is tracked in feature descriptions but has no dedicated Character field — the pool amount (level x 5 or level x 6 for Hospitaller) is computed but not tracked as a numeric field.

## 5.3 Subclasses (Holy Orders) — 4 total

| # | ID | Name | Unlock | Features |
|---|---|---|---|---|
| 1 | `redemptionist` | Redemptionist | L3 | 14 features |
| 2 | `crusader` | Crusader | L3 | 14 features |
| 3 | `hospitaller` | Hospitaller | L3 | 14 features |
| 4 | `preacher` | Preacher | L3 | 14 features |

All 4 holy orders unlock at level 3.

**Zealot subclasses DO have option features** at levels 6 and 9, with 3 options each (including one `sourceFeature` enhance option).

## 5.4 Base Class Features by Level

| Level | Feature | Type | Action | Uses | Reset |
|---|---|---|---|---|---|
| 1 | Divine Sense | base | action | "1 + charisma" | long |
| 1 | Lay on Hands | base | action | — | long |
| 1 | Faith Conduit | base | passive | — | — |
| 2 | Fighting Style | base | passive | — | — |
| 2 | Spellcasting (Prayers) | base | passive | — | — |
| 2 | Divine Smite | base | free | — | — |
| 4 | Ability Score Improvement | base | passive | — | — |
| 5 | Extra Attack | base | passive | — | — |
| 7 | Aura of Protection | base | passive | — | — |
| 7 | Divine Health | base | passive | — | — |
| 8 | Ability Score Improvement | base | passive | — | — |
| 10 | Ability Score Improvement | base | passive | — | — |
| 10 | Improved Divine Smite | base | passive | — | — |

**Total base features:** 13  
**ASIs:** 3 (levels 4, 8, 10)

## 5.5 Tab Behavior (PrayersTab.tsx)

The Zealot uses a **dedicated tab**:

- **Prayer Slots:** SlotPips by level (1st, 2nd, 3rd). Clickable toggles. "Regain on long rest" label.
- **Preparation limit:** `Math.max(1, Math.floor(level / 2) + CHA mod)`. Half level (rounded down) + CHA modifier.
- **Cantrips (Sacred Rites):** Always shown as prepared. Not counted toward prep limit.
- **Prepared Prayers:** Shows prepared count vs limit. UNPREPARE button. Cast buttons by slot level.
- **Available Prayers Pool:** Filterable by level (ALL / CANTRIP / 1ST / 2ND / 3RD). PREPARE button.
- **Cast mechanics:** Casting consumes a slot. **No Warp interaction** — prayers do not add to Warp Bar.
- **Prayer data source:** `getAllSpells().filter(s => s.spellSource === 'prayer')`.

## 5.6 Character Fields Touched

| Field | Read/Write | Context |
|---|---|---|
| `character.spellSlots` | read/write | prayer slot tracking |
| `character.preparedSpellIds` | read/write | prepared prayer list |
| `character.level` | read | prep limit |
| `character.abilityScores.charisma` | read | prep limit |

## 5.7 Rest Behavior

- **Prayer Slots:** Reset on long rest (described in text). No automated reset.
- **Lay on Hands pool:** `level x 5` (or `level x 6` for Hospitaller). No dedicated tracking field — would need to be tracked via notes or custom solution.
- **Subclass feature uses:** Standard `featureUsesSpent` tracking via FeaturesTab.

## 5.8 Dependencies

- **Zealot Prayers:** 35 entries (by id count) in `zealotPrayers.ts` (642 lines). Retrieved via `getAllSpells()` filtered by `spellSource === 'prayer'`.
- **Items referenced in `startingEquipmentResolved`:** flak-armor-full, combat-shield, carapace-armor, chainsword, power-maul, laspistol

## 5.9 Observations

1. **`usesCount: '1 + charisma'` on Divine Sense** — `resolveUsesCount()` does NOT support compound formulas. It would hit the `default` branch, `parseInt('1 + charisma', 10)` would return `1`, and `Math.max(1, 1) = 1`. **Divine Sense will always show 1 use regardless of CHA modifier.** This is a bug.
2. **`usesPerRest: 'long'` on Lay on Hands but no `usesCount`** — since `usesCount` is undefined, `hasUses` evaluates to false in FeaturesTab. No use-tracking counter will be shown. The pool mechanic (level x 5 HP) is described in text but not mechanically tracked.
3. **Zealot has no `classResource`** despite being a half-caster with prayer slots. This is correct — prayer slots use the generic `spellSlots` system shared with Psyker. However, it means the Zealot has no class resource widget on the LoadoutTab or similar. The FeaturesTab and PrayersTab handle everything.
4. **PrayersTab maxes at 3rd-level slots** (filter buttons: CANTRIP/1ST/2ND/3RD). If higher-level prayers are added, the filter UI would need updating.
5. **`character.faith`** (0–100, hidden from players) exists on Character type. No tab reads or writes it. GM-facing only.

---

# 6. Cross-Class Summary

## 6.1 Quick Comparison

| Class | Hit Die | Primary | Saves | Base Features | Subclasses | Subclass Features (avg) | Resource | Resource Reset |
|---|---|---|---|---|---|---|---|---|
| Imperial Guardsman | d10 | DEX/CON/WIS | STR/CON | 13 | 6 (Regiment) | 19.3 | _(none)_ | — |
| Augmenticist | d8 | DEX/WIS | DEX/INT | 18 | 4 (Specialization) | 10.3 | Power Cells (pool) | short |
| Gene-Fighter | d12 | STR/CON | STR/CON | 14 | 3 (Archetype) | 8.3 | Gene-Surges (pool) | long |
| Psyker | d6 | INT/WIS | INT/WIS | 14 | 4 (Discipline) | 13.8 | Warp Bar (bar) | _(Perils)_ |
| Zealot | d10 | CHA/STR | WIS/CHA | 13 | 4 (Holy Order) | 14 | _(none)_ | — |

## 6.2 Skill Choice Audit

| Class | numSkillChoices | skillChoices.length | Match? |
|---|---|---|---|
| Imperial Guardsman | 3 | 7 | OK (choose 3 from 7) |
| Augmenticist | 3 | 8 | OK (choose 3 from 8) |
| Gene-Fighter | 3 | 7 | OK (choose 3 from 7) |
| Psyker | 2 | 10 | OK (choose 2 from 10) |
| Zealot | 2 | 7 | OK (choose 2 from 7) |

All classes have `numSkillChoices < skillChoices.length`. No issues.

## 6.3 Resource Tracking Consistency

| Class | classResource declared? | Dedicated Character field? | Tab widget? | Consistent? |
|---|---|---|---|---|
| Imperial Guardsman | No | — | — | OK |
| Augmenticist | Yes (Power Cells) | `powerCells: {current, max}` | LoadoutTab pip grid | **Mismatch:** `resetOn: 'short'` vs UI label "long rest" |
| Gene-Fighter | Yes (Gene-Surges) | `geneSurgesRemaining`, `isInGeneSurge` | GeneModTab toggle only | **Missing:** No counter showing remaining surges |
| Psyker | Yes (Warp Bar) | `warpBar` | WarpDisciplinesTab bar | OK (no resetOn = intentional) |
| Zealot | No | — | — | OK (uses spellSlots) |

## 6.4 Feature Count Summary

| Class | Base | Cadian/Tech-I/Jug/Bio/Redem | Total at L10 (one subclass) |
|---|---|---|---|
| Imperial Guardsman | 13 | ~20 (Cadian) | ~33 (minus unchosen options) |
| Augmenticist | 18 | ~10 (Tech-Integrator) | ~28 |
| Gene-Fighter | 14 | ~9 (Juggernaut) | ~23 |
| Psyker | 14 | ~14 (Biomancer) | ~28 (minus unchosen options) |
| Zealot | 13 | ~14 (Redemptionist) | ~27 (minus unchosen options) |

## 6.5 Features With Uses But No Reset

All features that have `usesCount` also have `usesPerRest`. No orphaned tracking fields found.

## 6.6 Features Without Descriptions

All features across all 5 classes have non-empty `description` fields. No placeholder or TODO descriptions found.

## 6.7 `sourceFeature` Enhance Options

These option features replace an earlier feature when chosen:

| Class | Subclass | Feature Replaced | Enhanced By | Level |
|---|---|---|---|---|
| Guardsman | Cadian | unshakeable-nerve | Unshakeable Nerve (Enhanced) | 3 |
| Guardsman | Cadian | volley-fire | Volley Fire (Enhanced) | 6 |
| Guardsman | Cadian | suppressing-fire | Suppressing Fire (Enhanced) | 6 |
| Guardsman | Cadian | decisive-commander | Decisive Commander (Enhanced) | 9 |
| Guardsman | Cadian | combined-arms-doctrine | Combined Arms Doctrine (Enhanced) | 9 |
| Guardsman | Catachan | catachan-fang | Catachan Fang (Enhanced) | 3 |
| Guardsman | Catachan | surprise-attack | Surprise Attack (Enhanced) | 6 |
| Guardsman | Catachan | surprise-attack | Surprise Attack (Greater Enhanced) | 9 |
| Guardsman | Tallarn | hit-and-run | Hit and Run (Enhanced) | 3 |
| Guardsman | Tallarn | flanking-maneuver | Flanking Maneuver (Enhanced) | 6 |
| Guardsman | Tallarn | lightning-raid | Lightning Raid (Enhanced) | 9 |
| Guardsman | Vostroyan | steady-aim | Steady Aim (Enhanced) | 3 |
| Guardsman | Vostroyan | weakpoint-targeting | Weakpoint Targeting (Enhanced) | 6 |
| Guardsman | Vostroyan | perfect-shot | Perfect Shot (Enhanced) | 9 |
| Guardsman | Kriegsman | trench-fighter | Trench Fighter (Enhanced) | 3 |
| Guardsman | Kriegsman | death-before-dishonor | Death Before Dishonor (Enhanced) | 6 |
| Guardsman | Kriegsman | gas-warfare | Gas Warfare (Enhanced) | 9 |
| Guardsman | Heavy Wpns | sustained-fire-doctrine | Sustained Fire Doctrine (Enhanced) | 3 |
| Guardsman | Heavy Wpns | suppressive-barrage | Suppressive Barrage (Enhanced) | 6 |
| Guardsman | Heavy Wpns | devastating-fire | Devastating Fire (Enhanced) | 9 |
| Psyker | Biomancer | biomantic-apotheosis | Biomantic Apotheosis (Enhanced) | 9 |
| Psyker | Pyromancer | inferno-incarnate | Inferno Incarnate (Enhanced) | 9 |
| Psyker | Telepath | psychic-dominion | Psychic Dominion (Enhanced) | 9 |
| Psyker | Diviner | temporal-manipulation | Temporal Manipulation (Enhanced) | 9 |
| Zealot | Redemptionist | purifying-smite | Purifying Smite (Enhanced) | 6 |
| Zealot | Redemptionist | avatar-of-flame | Avatar of Flame (Enhanced) | 9 |
| Zealot | Crusader | sacred-weapon | Sacred Weapon (Enhanced) | 6 |
| Zealot | Crusader | undying-crusade | Undying Crusade (Enhanced) | 9 |
| Zealot | Hospitaller | protective-ward | Protective Ward (Enhanced) | 6 |
| Zealot | Hospitaller | sanctuary-aura | Sanctuary Aura (Enhanced) | 9 |
| Zealot | Preacher | denounce | Denounce (Enhanced) | 6 |
| Zealot | Preacher | word-of-the-emperor | Word of the Emperor (Enhanced) | 9 |

**No Augmenticist or Gene-Fighter subclasses use the enhance pattern.**

## 6.8 Subclass Feature Levels

| Class | Subclass Feature Levels | Notes |
|---|---|---|
| Imperial Guardsman | 1, 3, 6, 9 | Regiment chosen at L1 |
| Augmenticist | 3, 6, 9 | Specialization chosen at L3 |
| Gene-Fighter | 3, 6, 9 | Archetype chosen at L3 |
| Psyker | 1, 3, 6, 9 | Discipline chosen at L1 |
| Zealot | 3, 6, 9 | Holy Order chosen at L3 |

## 6.9 Missing Classes

The following classes are referenced in the Character type but have no class definition files:

- **Officer** — Character fields: `commandsKnownIds`, `commandDiceRemaining`. Module type: `Command` interface exists. No class file.
- **Desperado** — Character fields: `tricksKnownIds`, `trickUsesRemaining`. Module type: `Trick` interface exists. No class file.
- **Warrior** — Character fields: `techniquesKnown`. No module type beyond ClassFeature. No class file.

These appear to be planned but unimplemented classes. The Character type has fields for them, and the module types (Command, Trick) are defined, but no class data files exist.

---

# 7. Observations & Anomalies

## Bugs

1. **Divine Sense uses always = 1:** `usesCount: '1 + charisma'` is not a supported token in `resolveUsesCount()`. The function falls through to `parseInt('1 + charisma', 10) = 1`. Fix: either extend `resolveUsesCount` to support compound formulas, or change `usesCount` to `'charisma'` and add the +1 in the description/rendering.

2. **Power Cell reset label mismatch:** Augmenticist `classResource.resetOn` is `'short'`, but `LoadoutTab.tsx` line 308 displays "Recharge on long rest". The Power Cells feature description says "short or long rest". The UI label is wrong.

3. **Gene-Surge remaining count not tracked in UI:** `character.geneSurgesRemaining` exists on the Character type but GeneModTab only has a toggle button. There's no counter showing "3/3 surges remaining" or decrementing on each activation.

4. **Gene-Surge usesCount is static '3':** The FeaturesTab shows Gene-Surge as "3/3 LR" at all levels. At L6 it should be 4, at L10 it should be 5 (from Perfected Form). This would require dynamic computation (e.g., level-based formula) instead of the static `'3'`.

## Design Inconsistencies

5. **No automated rest resets:** `characterStore.ts` has no `shortRest()` or `longRest()` action. `character.lastShortRest` and `character.lastLongRest` exist as timestamps but nothing consumes them. All rest behavior is manual via UI patches.

6. **Fighting Style handled two ways:** Imperial Guardsman and Zealot both have Fighting Style features with `[CHOOSE ONE]` in the description, but the choice is stored in `character.fightingStyle` (a top-level field) and passed to `renderDescription` — not via `optionGroup`/`featureChoices`. Other `[CHOOSE ONE]` features use the `optionGroup` system. Dual mechanism.

7. **`psykerDiscipline` and `sanctioningStatus` unused by tabs:** These Character fields exist and are presumably set during creation, but no tab component reads them for gameplay purposes. The discipline filter in WarpDisciplinesTab uses local React state.

8. **Psyker prep limit uses max(INT, WIS) instead of permanent choice:** The class description says "Choose INT or WIS at 1st level (permanent)" but the tab code uses `Math.max(intMod, wisMod)`, making the distinction moot.

9. **`classResource.maxFormula` not computable:** Both Augmenticist ("See class table") and Gene-Fighter ("See class table") use non-computable strings. The actual values are set manually or hardcoded. Psyker uses "20" (computable). Zealot and Guardsman have no class resource.

## Unused Character Fields

10. **Fields defined on Character type but not used by any class tab:**
    - `geneticInstability` — Gene-Fighter, GM-facing, no UI
    - `geneSurgesRemaining` — Gene-Fighter, exists but GeneModTab doesn't read it
    - `warpExposure` — All classes, GM-facing, no UI
    - `corruption` — All classes, hidden from players, no UI
    - `faith` — All classes, hidden from players, no UI
    - `psykerDiscipline` — Psyker, set at creation but not used in tab
    - `sanctioningStatus` — Psyker, set at creation but not used in tab
    - `fightingStyle` — Only read for description rendering, not for mechanical effect
    - `commandsKnownIds`, `commandDiceRemaining` — Officer (not implemented)
    - `tricksKnownIds`, `trickUsesRemaining` — Desperado (not implemented)
    - `techniquesKnown` — Warrior (not implemented)
    - `classResourceCurrent`, `classResourceDiceRemaining` — Generic class resource fields, unused (each class uses dedicated fields instead)

## Content Counts

| Content Type | File | Entry Count |
|---|---|---|
| Psyker Powers | `spells/psykerPowers.ts` | ~85 |
| Zealot Prayers | `spells/zealotPrayers.ts` | ~35 |
| Augments | `augments/augments.ts` | ~55 |
| Gene Modifications | `geneModifications/geneModifications.ts` | ~47 |

## Classes Barrel File

`src/modules/core/classes/index.ts` only exports `imperialGuardsman` and `augmenticist`. However, `src/modules/core/index.ts` imports all 5 classes directly from their individual files. The barrel file is stale but harmless — nothing imports from it.
