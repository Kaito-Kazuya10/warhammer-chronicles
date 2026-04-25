# Character Creation & Edit — Forensic Audit

**Generated:** 2026-04-25
**Scope:** Character creation wizard + character sheet edit paths
**Files inspected:** 40+ source files across `src/pages/CharacterCreation/`, `src/components/CharacterSheet/`, `src/store/`, `src/modules/core/`, `src/types/`, `scripts/`
**Note:** This is a point-in-time snapshot. Do not modify source files based on this document — use it to plan fixes.

---

## Section 1 — Content Inventory

### 1.1 Species

| ID | Display Name | Tier | File | Reachable from creation UI? |
|---|---|---|---|---|
| `human` | Human | standard | `src/modules/core/races/index.ts:7` | Yes |
| `fortress-world-human` | Human — Fortress World | standard | `src/modules/core/races/index.ts:30` | Yes |
| `hive-world-human` | Human — Hive World | standard | `src/modules/core/races/index.ts:62` | Yes |
| `forge-world-human` | Human — Forge World | standard | `src/modules/core/races/index.ts:84` | Yes |
| `death-world-human` | Human — Death World | standard | `src/modules/core/races/index.ts:106` | Yes |
| `void-born-human` | Human — Void Born | standard | `src/modules/core/races/index.ts:128` | Yes |
| `noble-born-human` | Human — Noble Born | standard | `src/modules/core/races/index.ts:154` | Yes |
| `ratling` | Ratling | standard | `src/modules/core/races/index.ts:176` | Yes |
| `felinid` | Felinid | standard | `src/modules/core/races/index.ts:202` | Yes |
| `ogryn` | Ogryn | standard | `src/modules/core/races/index.ts:232` | Yes |
| `squat` | Squat (Leagues of Votann) | standard | `src/modules/core/races/index.ts:268` | Yes |
| `techfused` | Techfused | advanced | `src/modules/core/races/index.ts:298` | Yes |
| `nightsider` | Nightsider | advanced | `src/modules/core/races/index.ts:335` | Yes |
| `longshank` | Longshank | advanced | `src/modules/core/races/index.ts:367` | Yes |

**Total in code: 14** (11 standard + 3 advanced)

**Expected species NOT in codebase (content gaps):**
- Human — Shrine World: **NOT IN CODE.** No file, no data, no reference as species ID. Only incidental mentions of "shrine" in background flavor text (Pilgrim, Acolyte) and an armor trait description.
- Human — Feral World: **NOT IN CODE.**
- Human — War World: **NOT IN CODE.**
- Beastman: **NOT IN CODE.** Only flavor-text mentions in Gene-Fighter subclass descriptions (Abomination-Juggernaut, Elemental Chimera).
- Mutant: **NOT IN CODE.**
- Tainted (Khorne/Slaanesh/Tzeentch/Nurgle): **NOT IN CODE.**
- Blank: **NOT IN CODE.**
- Scout Marine: **NOT IN CODE.**

### 1.2 Backgrounds

| ID | Display Name | Tier | File | Reachable? |
|---|---|---|---|---|
| `soldier` | Soldier | standard | `src/modules/core/backgrounds/index.ts` | Yes |
| `adept` | Adept | standard | same | Yes |
| `outcast` | Outcast | standard | same | Yes |
| `ganger` | Ganger | standard | same | Yes |
| `acolyte` | Acolyte | standard | same | Yes |
| `void-born` | Void Born | standard | same | Yes |
| `mechanicum-initiate` | Mechanicum Initiate | standard | same | Yes |
| `noble` | Noble | standard | same | Yes |
| `chirurgeon` | Chirurgeon | standard | same | Yes |
| `pilgrim` | Pilgrim | standard | same | Yes |
| `enforcer` | Enforcer | standard | same | Yes |
| `savant` | Savant | standard | same | Yes |
| `merchant` | Merchant | standard | same | Yes |
| `penal-legionnaire` | Penal Legionnaire | standard | same | Yes |
| `genestealer-cultist` | Genestealer Cultist | restricted (`special: true`) | same | Yes (with GM warning) |

**Total: 15** (14 standard + 1 restricted). Matches project documentation.

### 1.3 Classes

All 5 implemented classes are reachable from `ClassStep`:

| ID | Name | Subclasses | File |
|---|---|---|---|
| `imperial-guardsman` | Imperial Guardsman | 6 (Cadian, Catachan, Tallarn, Vostroyan, Kriegsman, Heavy Weapons) | `src/modules/core/classes/imperialGuardsman.ts` |
| `augmenticist` | Augmenticist | 4 (Tech-Integrator, Medicae-Savant, Ballistic-Frame, Velocity-Frame) | `src/modules/core/classes/augmenticist.ts` |
| `gene-fighter` | Gene-Fighter | 3 (Abomination-Juggernaut, Elemental-Chimera, Apex-Predator) | `src/modules/core/classes/geneFighter.ts` |
| `psyker` | Psyker | 4 (Biomancer, Pyromancer, Telepath, Diviner) | `src/modules/core/classes/psyker.ts` |
| `zealot` | Zealot | 4 (Redemptionist, Crusader, Hospitaller, Preacher) | `src/modules/core/classes/zealot.ts` |

**No stubs found** for Officer, Desperado, Warrior, Assassin, or Tech-Priest. Cleanly absent.

### 1.4 Feats

**Total: 17** (10 standard + 7 Warhammer-specific)
- Consumed at: **Level-up** (ASI levels 4, 8, 10 — player chooses ASI or feat)
- **Not** consumed at creation time (no feat picker in creation wizard)
- Stored in: `character.featIds[]`
- Feat source file: `src/modules/core/feats/index.ts`

---

## Section 2 — Character Creation Wizard Walkthrough

The wizard is at `src/pages/CharacterCreation/`. State is managed via `CreationContext.tsx`.

### CreationDraft (shared state)

```
name: string                              portrait: string | null
raceId: string | null                     abilityScoreChoices: Record<string, number>
classId: string | null                    subclassId: string | null
fightingStyle: string | null              backgroundId: string | null
abilityScoreMethod: 'standard-array' | 'point-buy' | 'manual'
baseAbilityScores: Record<string, number> selectedSkills: string[]
equipmentChoices: Record<string, string>  useStartingWealth: boolean
startingWealth: number | null
```

### Step 0 — Species

**Component:** `src/pages/CharacterCreation/steps/SpeciesStep.tsx`

**Purpose:** Select a species (race) and optionally choose flexible ability score bonuses.

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `raceId` | string | Yes | null | `draft.raceId` |
| `abilityScoreChoices` | Record<string, number> | If race offers choices | `{}` | `draft.abilityScoreChoices` |

**Validation:** `draft.raceId !== null`

**Content module:** `getAllRaces()` from registry. Grouped by `race.tier`: standard vs. advanced. Advanced species show "GM Approval Required" badge.

**Side effects:** Changing `raceId` resets `abilityScoreChoices` to `{}`.

**Observations:**
- No filter toggle for advanced species — they are always visible, just grouped separately
- `abilityScoreChoices` are **not restored** in edit mode (always reset to `{}`)

### Step 1 — Class

**Component:** `src/pages/CharacterCreation/steps/ClassStep.tsx`

**Purpose:** Select class, subclass, and fighting style (if applicable).

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `classId` | string | Yes | null | `draft.classId` |
| `subclassId` | string | If class has subclasses | null | `draft.subclassId` |
| `fightingStyle` | string | If class has fighting style feature | null | `draft.fightingStyle` |

**Validation:**
- `classId !== null`
- If class has subclasses: `subclassId !== null`
- If class has fighting style feature at level 1: `fightingStyle !== null`

**Fighting style detection:** Looks for class features at level 1 with `optionGroup === 'fighting-style'`.

**Content module:** `getAllClasses()`. Two-phase UI: (1) class list with expandable details, (2) after selection, show subclass picker and fighting style picker.

**Observations:**
- Subclass label override: Imperial Guardsman uses "Regiment" instead of "Specialization"

### Step 2 — Background

**Component:** `src/pages/CharacterCreation/steps/BackgroundStep.tsx`

**Purpose:** Optionally select a background.

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `backgroundId` | string | No | null | `draft.backgroundId` |

**Validation:** Always passes (optional step).

**Content module:** `getAllBackgrounds()`. Restricted backgrounds (`special: true`) shown in separate group with warning.

**Side effects:** Background auto-grants skill proficiencies (used in Step 4 and final submit).

### Step 3 — Abilities

**Component:** `src/pages/CharacterCreation/steps/AbilitiesStep.tsx`

**Purpose:** Allocate base ability scores using one of three methods.

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `abilityScoreMethod` | enum | Yes | `'standard-array'` | `draft.abilityScoreMethod` |
| `baseAbilityScores` | Record<STR/DEX/CON/INT/WIS/CHA, number> | All > 0 | per method | `draft.baseAbilityScores` |

**Methods:**
- **Standard Array:** Assign 15/14/13/12/10/8 via dropdowns
- **Point Buy:** +/- buttons, 27-point budget, range 8–15 per ability
- **Manual / Roll:** Direct number inputs 1–30, per-ability 4d6-drop-lowest, Roll All, Clear

**Validation:** All 6 base scores must be > 0.

**Racial bonus display:** Shows `race.abilityScoreIncreases` + `draft.abilityScoreChoices` alongside base scores. Final = base + racial.

**Side effects:** Switching method resets all scores to method-specific defaults.

**Observations:**
- In edit mode, method is always forced to `'manual'` — original method is lost

### Step 4 — Skills

**Component:** `src/pages/CharacterCreation/steps/SkillsStep.tsx`

**Purpose:** Select class skill proficiencies.

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `selectedSkills` | string[] | Must equal `cls.numSkillChoices` | `[]` | `draft.selectedSkills` |

**Validation:** `selectedSkills.length === cls.numSkillChoices`

**Background auto-grant:** Skills from `bg.skillProficiencies` are shown as locked/checked and not counted toward the limit.

**Content module:** `cls.skillChoices[]` for available options, `bg.skillProficiencies[]` for auto-granted.

**21 skills total:** acrobatics, animalHandling, arcana, athletics, deception, history, insight, intimidation, investigation, medicine, nature, perception, performance, persuasion, religion, sleightOfHand, stealth, survival, xenology, technology, warpControl.

### Step 5 — Equipment

**Component:** `src/pages/CharacterCreation/steps/EquipmentStep.tsx`

**Purpose:** Choose starting equipment or roll for starting wealth.

**Inputs collected:**

| Field | Type | Required? | Default | Persisted to |
|---|---|---|---|---|
| `equipmentChoices` | Record<index, 'a'\|'b'> | If equipment mode | `{}` | `draft.equipmentChoices` |
| `useStartingWealth` | boolean | N/A | `false` | `draft.useStartingWealth` |
| `startingWealth` | number | If wealth mode, > 0 | null | `draft.startingWealth` |

**Validation:**
- Equipment mode: all choice-type options must have a selection
- Wealth mode: `startingWealth > 0`

**Wealth formula:** 5d4 x 10 Thrones (range 50–200).

**Equipment parsing:** Regex `(a) X or (b) Y` parses class equipment options into choices. Non-choice entries are auto-granted.

**Observations:**
- Switching modes clears both `equipmentChoices` and `startingWealth`
- Equipment choices are **not restored** in edit mode

### Step 6 — Review

**Component:** `src/pages/CharacterCreation/steps/ReviewStep.tsx`

**Purpose:** Review all choices, run final validation, forge or save character.

**Validation before forge:**
- Name non-empty
- Species selected
- Class selected
- Subclass selected (if class has subclasses)
- All ability scores assigned (> 0)

**Final computation:**
- `buildFinalScores()`: base + racial bonuses (both fixed and chosen)
- `buildSkills()`: merge background + selected skills
- `resolveInventory()`: map equipment choices to item IDs via `cls.startingEquipmentResolved`

---

## Section 3 — Final Submit / Character Creation Persistence

**Component:** `src/pages/CharacterCreation/steps/ReviewStep.tsx` (lines 235–276)
**Store action:** `createCharacter()` → `updateCharacter(id, patch)`

### What it does, in order:
1. Validate draft (name, species, class, subclass, abilities)
2. `createCharacter()` — generates UUID, creates blank Character in store
3. `resolveInventory()` — maps equipment choices to item IDs
4. `buildSkills()` — merges background + selected skills
5. `buildFinalScores()` — base + racial ability scores
6. `updateCharacter(id, { ...all fields })` — patches the new character
7. `setActiveCharacter(id)`
8. `navigate('/sheet')`

### Default values applied at submit:

| Field | Value | Notes |
|---|---|---|
| `level` | 1 | Always |
| `maxHitPoints` | hitDie + CON modifier (min 1) | Level 1 formula |
| `currentHitPoints` | same as maxHitPoints | Full HP |
| `armorClass` | 10 + DEX modifier | Unarmored |
| `initiative` | DEX modifier | |
| `proficiencyBonus` | 2 | Level 1 |
| `warpExposure` | 0 | |
| `corruption` | 0 | |
| `faith` | 0 | |
| `currency.thrones` | `startingWealth` or 0 | |
| `currency.melt` | 0 | |
| `currency.aquila` | 0 | |
| `spellIds` | `[]` | |
| `featIds` | `[]` | |
| `featureChoices` | `{ 'fighting-style': slug }` if set | |

### Class-specific initialization:

**None.** No class-specific defaults are set at creation time. The following fields exist on `Character` but are not initialized:

| Field | Expected class | Status |
|---|---|---|
| `warpBar` | Psyker | NOT SET (undefined) |
| `psykerDiscipline` | Psyker | NOT SET |
| `sanctioningStatus` | Psyker | NOT SET |
| `preparedSpellIds` | Psyker | NOT SET |
| `augmentSlots` | Augmenticist | NOT SET |
| `powerCells` | Augmenticist | NOT SET |
| `installedAugmentIds` | Augmenticist | NOT SET |
| `geneSurgesRemaining` | Gene-Fighter | NOT SET |
| `geneticInstability` | Gene-Fighter | NOT SET |
| `installedModIds` | Gene-Fighter | NOT SET |
| `isInGeneSurge` | Gene-Fighter | NOT SET |
| `classResourceCurrent` | All with resources | NOT SET |
| `classResourceDiceRemaining` | Dice-resource classes | NOT SET |
| `featureUsesSpent` | All | NOT SET (undefined) |

These remain `undefined` and are treated as defaults at read time by the character sheet.

### Fields on Character NOT set anywhere in creation:

- `experiencePoints` — defaults to 0 in `createNewCharacter()`
- `alignment` — defaults to `''`
- `temporaryHitPoints` — defaults to 0
- `hitDiceUsed` — defaults to 0
- `inspiration` — defaults to false
- `deathSaveSuccesses` / `deathSaveFailures` — defaults to 0
- `personalityTraits`, `ideals`, `bonds`, `flaws`, `backstory` — defaults to `''`
- `notes` — defaults to `''`
- `spellSlots` — defaults to `{}`
- `campaignId` — not set (undefined)
- All class-specific fields listed above

**Observations:**
- No class-specific initialization means a freshly created Psyker has no `warpBar`, a Gene-Fighter has no `geneSurgesRemaining`, etc. The character sheet handles these gracefully via `undefined` checks.

---

## Section 4 — Character Edit Paths

### 4.1 Inline edits on character sheet

| Component | Field | Edit mechanism | Validation | Persists via |
|---|---|---|---|---|
| CharacterHeader | `name` | Text input onChange | None | `updateCharacter` |
| CharacterHeader | `level` | Number input 1–20 | `Math.max(1, v)` | `updateCharacter` |
| AbilityScoreBlock | ability scores | Click to edit, number input 1–30 | None (no upper cap) | `updateAbilityScore` |
| HPSection | `currentHitPoints` | Input or +/- buttons | Clamped to [0, max] | `setHitPoints` |
| HPSection | `maxHitPoints` | Number input | `Math.max(1, v)` | `updateCharacter` |
| HPSection | `temporaryHitPoints` | Number input | `Math.max(0, v)` | `updateCharacter` |
| TopStatBar | `speed` | Number input | Default 30 on NaN | `updateCharacter` |
| TopStatBar | `inspiration` | Star toggle | Boolean | `updateCharacter` |
| SkillList | skill proficiency | Dot toggle | Boolean flip | `toggleSkill` |
| SavingThrows | save proficiency | Dot toggle | Array add/remove | `updateCharacter` |
| BackgroundTab | personality/ideals/bonds/flaws | Textarea | None | `updateCharacter` |
| NotesTab | `notes` | Textarea (500ms debounce) | None | `updateCharacter` |
| ExtrasTab | death saves | Circle toggles 0–3 | Clamped | `updateCharacter` |
| ExtrasTab | `hitDiceUsed` | Use/Recover buttons | Clamped | `updateCharacter` |
| ExtrasTab | currency | Number inputs | None | `updateCharacter` |
| TrackerPanel | currency | Number inputs | None | `updateCharacter` |
| TrackerPanel | `warpBar` (Psyker) | +/- buttons | Clamped [0, 20] | `updateCharacter` |
| TrackerPanel | GM fields (corruption/faith/warp exposure) | Number inputs (DM only) | Clamped to max | `updateCharacter` |
| ActionsTab | ammo tracking | Fire/Reload buttons | Clamped | `updateCharacter` (inventory) |
| ActionsTab | feature uses | Checkboxes | Integer tracking | `updateCharacter` |
| FeaturesTab | feature uses | Checkboxes | Integer tracking | `updateCharacter` |

### 4.2 Edit dialogs

**Edit Character Dialog:** There is no separate edit dialog. Edit mode uses the **same creation wizard** at `/create?edit=<characterId>`.

| Surface | File | Fields editable | Fields hidden/locked | Notes |
|---|---|---|---|---|
| Creation wizard (edit mode) | `src/pages/CharacterCreation/` | species, class, subclass, fighting style, background, abilities, skills, name, portrait | Equipment (not restored), ability score choices (not restored) | Method forced to 'manual' |

**Key differences in edit mode:**
- All steps unlocked (no step locking)
- HP only reset if character is still level 1
- Equipment/inventory NOT modified on save
- `abilityScoreChoices` not restored (flexible racial bonuses lost)
- Button says "SAVE CHANGES" instead of "FORGE CHARACTER"

### 4.3 Level-up wizard

**File:** `src/components/CharacterSheet/LevelUp/LevelUpFlow.tsx`

**Steps:**
1. **Summary** — Shows what will be gained at next level (features, proficiency bonus changes). Informational.
2. **HP** — Choose Roll (d{hitDie}) or Average (floor(hitDie/2)+1). Gain = max(1, roll/avg + CON mod). Required.
3. **ASI** (levels 4, 8, 10 only) — Choose ASI (+2 points to abilities, cap 20) or Feat (from available feats).
4. **Features** (if option groups exist) — Choose from feature option groups (e.g., ENHANCE upgrades). One choice per group.
5. **Confirm** — Review summary, apply all changes atomically.

**What it mutates:**
- `level` → targetLevel
- `maxHitPoints` += hpGain
- `currentHitPoints` += hpGain
- `proficiencyBonus` → recalculated
- `abilityScores` (if ASI)
- `featIds` (if feat chosen)
- `featureChoices` (if option groups selected)

**What it CANNOT change:** race, class, subclass, name, background, equipment, skills, saving throw proficiencies.

**Multi-level support:** After confirming, "Continue to Level X" button resets per-level state and starts next level-up.

### 4.4 Settings / dangerous edits

| Action | Possible? | Where | Guardrails |
|---|---|---|---|
| Change species after creation | Yes (via edit wizard) | `/create?edit=<id>` | None — freely changeable |
| Change class after creation | Yes (via edit wizard) | `/create?edit=<id>` | None — freely changeable |
| Edit ability scores directly | Yes | TopStatBar (click score) | No upper bound in sheet; LevelUp caps at 20 |
| Reset/respec character | Partial | Level-down button removes last level's featureChoices | No full respec |
| Change subclass | Yes (via edit wizard) | `/create?edit=<id>` | None |

**Observations:**
- Species and class can be changed after creation with no guardrails. This could break class-specific fields, proficiencies, and features.
- Ability scores on the character sheet have no upper bound (LevelUp enforces 20 cap, but direct edit allows 30+).

### 4.5 Fields editable from nowhere (orphans)

| Field | Category | Notes |
|---|---|---|
| `experiencePoints` | Orphaned | No UI to view or edit |
| `alignment` | Orphaned | No UI to view or edit |
| `campaignId` | Set by campaign system | Not editable by player |
| `techniquesKnown` | Future class (Warrior) | No UI, no class |
| `commandsKnownIds` | Future class (Officer) | No UI, no class |
| `commandDiceRemaining` | Future class (Officer) | No UI, no class |
| `tricksKnownIds` | Future class (Desperado) | No UI, no class |
| `trickUsesRemaining` | Future class (Desperado) | No UI, no class |
| `psykerDiscipline` | Intentional gap? | Not set at creation, no UI to set |
| `sanctioningStatus` | Intentional gap? | Not set at creation, no UI to set |
| `preparedSpellIds` | Intentional gap? | Not set at creation, no UI to set |
| `augmentSlots` | Managed by class tab | Set via Augmenticist loadout tab |
| `powerCells` | Managed by class tab | Set via Augmenticist loadout tab |
| `installedAugmentIds` | Managed by class tab | Set via Augmenticist loadout tab |
| `installedModIds` | Managed by class tab | Set via Gene-Fighter gene mod tab |
| `isInGeneSurge` | Managed by class tab | Set via Gene-Fighter gene mod tab |
| `geneSurgesRemaining` | Managed by rest | Reset by rest dialog |
| `geneticInstability` | GM-only | Set via DM campaign dashboard |
| `lastShortRest` / `lastLongRest` | Auto-set | Set by rest dialog |

---

## Section 5 — Cross-Cutting Concerns

### 5.1 Species effects application

**Ability score adjustments:** Applied at **creation submit time** in `buildFinalScores()` (`ReviewStep.tsx:26-35`):
```
finalScore[ability] = baseScore + race.abilityScoreIncreases[ability] + draft.abilityScoreChoices[ability]
```
Racial bonuses are baked into the character's `abilityScores` — they are not stored separately.

**In edit mode:** Hydration *subtracts* racial bonuses from the character's scores to recover base scores. This means if a player changes species in edit mode, the old racial bonuses are subtracted and new ones applied.

**Granted skills/proficiencies:** Species do NOT grant skill proficiencies. Only backgrounds do.

**Species traits:** Stored as `race.traits[]` on the Race data object. They are NOT copied onto the `Character` object. The character sheet displays them by looking up `getRaceById(character.race).traits`.

**Drawbacks:** Same — read from the Race object, not stored on Character.

**Example trace (Human — Fortress World):**
- `abilityScoreIncreases: { dexterity: 2, constitution: 1 }` → Added to base scores at submit
- No skills granted by species
- Traits: Born Shooting, Duck for Cover, Fortress World Training, Tactical Retreat → Displayed from Race object on Features/Background tab
- Languages: Low Gothic, Imperial Codes → Copied to `character.languages[]` at submit

### 5.2 Background effects application

**Skill proficiencies:** Background grants `bg.skillProficiencies[]` (typically 2 skills). These are merged with player-selected skills in `buildSkills()` at submit. Stored as `true` values in `character.skills`.

**Tool proficiencies:** `bg.toolProficiencies[]` merged into `character.proficiencies[]` at submit.

**Languages:** `bg.languages[]` merged into `character.languages[]` at submit.

**Starting equipment:** `bg.startingEquipment[]` entries are appended to inventory at creation. These are raw string IDs referencing items.

**Background feature:** Stored on the Background data object, NOT on Character. Displayed by looking up `getBackgroundById(character.background).feature`.

### 5.3 Class effects application

**Starting equipment:** Resolved via `cls.startingEquipmentResolved` mapping — maps option indices to item ID arrays. Applied at creation only.

**Starting proficiencies:** `cls.armorProficiencies[]`, `cls.weaponProficiencies[]`, `cls.toolProficiencies[]` merged into `character.proficiencies[]` at creation.

**Saving throws:** `cls.savingThrows[]` stored as `character.savingThrowProficiencies[]`.

**Level-1 features:** NOT stored on Character. Displayed by looking up class features at `character.level >= feature.level`. This means features are always derived from class data + current level.

**Hit points:** Level 1 HP = hitDie + CON modifier. Subsequent levels add roll or average + CON modifier.

**Class resource:** NOT initialized at creation. The `classResourceCurrent` field is undefined until the character sheet or rest dialog sets it.

### 5.4 Migration / legacy character handling

**Fighting style migration:** `CreationContext.tsx:98` reads `featureChoices['fighting-style']` first, falls back to `fightingStyle` field:
```
fightingStyle: char.featureChoices?.['fighting-style'] ?? char.fightingStyle ?? null
```
This handles characters created before the `featureChoices` migration.

**No other read-side migrations found.** The store reads all fields directly from the Character type with no fallbacks or transformations.

### 5.5 Validation consistency

| Rule | Creation | Edit wizard | Character sheet | Level-up | Store | Validator script |
|---|---|---|---|---|---|---|
| Name non-empty | Yes (submit) | Yes (submit) | No (can clear) | N/A | No | No |
| Species selected | Yes | Yes | N/A | N/A | No | Yes (required field) |
| Class selected | Yes | Yes | N/A | N/A | No | Yes (required field) |
| Subclass selected | Yes (if applicable) | Yes | N/A | N/A | No | Yes (ID checks) |
| Ability scores > 0 | Yes | Yes | No (can set to 0) | N/A | No | No |
| Ability scores <= 20 | No | No | No | Yes (ASI only) | No | No |
| Skill count | Yes | Yes | N/A (toggle freely) | N/A | No | No |
| HP > 0 | Yes (min 1) | Yes (min 1) | Clamped to [0, max] | min 1 gain | Clamped | No |
| Duplicate IDs | N/A | N/A | N/A | N/A | No | Yes |

**Key gaps:**
- Character sheet allows clearing name to empty string
- Character sheet allows setting ability scores to 0 or above 30
- Skill proficiency toggles on the sheet have no limit — player can toggle all skills on
- No validation that species/class change in edit mode is consistent with existing features

---

## Section 6 — Cross-Reference: Source Docs vs Code

### 6.1 Species cross-reference

| Species (canonical) | Tier (canonical) | In code? | Code file | Tier (in code) | Reachable from UI? | Status |
|---|---|---|---|---|---|---|
| Human — Fortress World | Core | Yes | `races/index.ts:30` | standard | Yes | Complete |
| Human — Hive World | Core | Yes | `races/index.ts:62` | standard | Yes | Complete |
| Human — Forge World | Core | Yes | `races/index.ts:84` | standard | Yes | Complete |
| Human — Death World | Core | Yes | `races/index.ts:106` | standard | Yes | Complete |
| Human — Void Born | Core | Yes | `races/index.ts:128` | standard | Yes | Complete |
| Human — Noble Born | Core | Yes | `races/index.ts:154` | standard | Yes | Complete |
| Human — Feral World | Core | No | — | — | — | Code gap |
| Human — Shrine World | Core | No | — | — | — | Code gap |
| Human — War World | Core | No | — | — | — | Code gap |
| Squat | Core | Yes | `races/index.ts:268` | standard | Yes | Complete |
| Ratling | Core | Yes | `races/index.ts:176` | standard | Yes | Complete |
| Felinid | Core | Yes | `races/index.ts:202` | standard | Yes | Complete |
| Beastman | Advanced | No | — | — | — | Code gap |
| Longshank | Advanced | Yes | `races/index.ts:367` | advanced | Yes | Complete |
| Mutant | Advanced | No | — | — | — | Code gap |
| Nightsider | Advanced | Yes | `races/index.ts:335` | advanced | Yes | Complete |
| Ogryn | Advanced | Yes | `races/index.ts:232` | **standard** | Yes | Tier mismatch |
| Tainted | Advanced | No | — | — | — | Code gap |
| Techfused | Advanced | Yes | `races/index.ts:298` | advanced | Yes | Complete |
| Blank | Restricted | No | — | — | — | Code gap |
| Scout Marine | Restricted | No | — | — | — | Code gap |

**Code-only species (not in canonical list):**

| Species | Tier (in code) | Status |
|---|---|---|
| Human (generic) | standard | Code-only |

> The generic "Human" with flexible ability choices (`choose: 2, amount: 1`) does not correspond to any specific canonical homeworld. It may serve as a catch-all. Review needed.

> **Ogryn tier mismatch:** Source doc says Advanced, code says `standard`. The Ogryn currently appears in the Standard Species group in the creation UI.

**Summary:**
- Total species canonical: 21
- Total species in code: 14
- Code gaps (need to be authored): 8 (Feral World, Shrine World, War World, Beastman, Mutant, Tainted, Blank, Scout Marine)
- UI gaps: 0 (everything in code is reachable)
- Tier mismatches: 1 (Ogryn)
- Code-only orphans: 1 (generic Human — review needed)

### 6.2 Class cross-reference

| Class (canonical) | In code? | Code file | Reachable from UI? | Status |
|---|---|---|---|---|
| Imperial Guardsman | Yes | `classes/imperialGuardsman.ts` | Yes | Complete |
| Warrior | No | — | — | Code gap (known, not yet authored) |
| Assassin | No | — | — | Code gap (known, not yet authored) |
| Desperado | No | — | — | Code gap (known, not yet authored) |
| Zealot | Yes | `classes/zealot.ts` | Yes | Complete |
| Officer | No | — | — | Code gap (known, not yet authored) |
| Psyker | Yes | `classes/psyker.ts` | Yes | Complete |
| Augmenticist | Yes | `classes/augmenticist.ts` | Yes | Complete |
| Gene-Fighter | Yes | `classes/geneFighter.ts` | Yes | Complete |
| Tech-Priest | No | — | — | Code gap (known, still in tabletop design) |

**Summary:**
- Total classes canonical: 10
- Total classes in code: 5
- Known not-yet-authored: 5 (Warrior, Assassin, Desperado, Officer, Tech-Priest)
- Unexpected gaps: 0
- Code-only orphans: 0

### 6.3 Backgrounds cross-reference

No source doc file (`WH40K_Backgrounds_Languages_Tools.md`) found in the project directory. Cross-reference based on code inventory only.

**15 backgrounds in code** (14 standard + 1 restricted). Cannot verify against source doc — file not found.

**Summary:**
- Total backgrounds in code: 15
- Source doc available: No
- Verification status: Cannot cross-reference

### 6.4 Specific deep-dives

**Shrine World species:**
Grep for "shrine world" / "shrineworld" / "shrine_world" across the entire `src/` directory found **zero matches as a species ID**. The only references to "shrine" are in background flavor text (Acolyte feature mentioning "shrine", Pilgrim description mentioning "shrines", and one armor trait description mentioning "shrine world"). **This is a content gap — the species data file needs to be authored.** The UI and schema fully support it; only the data is missing.

**Beastmen species:**
Grep for "beastman" / "beastmen" found **zero results as a species ID or data entry**. The only references are in Gene-Fighter subclass flavor text (Abomination-Juggernaut and Elemental-Chimera descriptions mention Beastmen as possible character origins). **This is a content gap — the species data file needs to be authored.**

If authored as an advanced-tier species:
- It would automatically appear in the "Advanced Species (GM Approval Required)" group in the creation wizard
- No UI changes needed — the `SpeciesStep` groups by `race.tier` automatically
- The data file just needs to be added to `src/modules/core/races/index.ts` and included in the `coreRaces` export array

Regarding player character "Thorne" as a Beastman: cannot query Supabase from this audit context. The character's `race` field would be whatever string was stored — if "beastman" doesn't exist as a species ID in the registry, the character sheet would show an empty species name.

### 6.5 Other content categories

**Feats:** 17 in code. No feat-list source doc found for comparison.

**Augments (Augmenticist):** Present in code via `getAllAugments()`. Not audited in detail — out of scope.

**Gene Modifications (Gene-Fighter):** Present in code via `getAllGeneModifications()`. Validator script checks stability cost vs tier and archetype cross-references.

**Psyker Powers/Spells:** Present in code via `getAllSpells()`. Not audited in detail.

**Zealot Prayers:** Managed by `PrayersTab.tsx`. Not audited in detail.

**Items/Armory:** Extensive item catalog present. Validator script checks type-specific fields (weapon categories, armor types, tier consistency). Out of scope for detailed audit.

---

## Section 7 — Observations Summary

### Bugs (things that break or behave wrong)

- **[S4.4] HIGH:** Ability scores can be set to any value (0–30+) via the character sheet's inline edit, bypassing the level-up ASI cap of 20. No validation in store.
- **[S4.4] HIGH:** Species and class can be freely changed after creation via the edit wizard (`/create?edit=`). No guardrails prevent changing class while retaining class-specific features/proficiencies.
- **[S5.5] MEDIUM:** Character name can be cleared to empty string on the character sheet (no validation), while creation requires non-empty.
- **[S5.5] MEDIUM:** Skill proficiency toggles on the character sheet have no limit — player can toggle all 21 skills on, bypassing the class-limited selection from creation.
- **[S2, Step 0] MEDIUM:** `abilityScoreChoices` are not restored in edit mode. If a species has flexible racial bonuses, the player must re-select them on every edit, or they are lost (zeroed out).

### Content Gaps (missing data the schema and UI support)

- **[S6.1] HIGH:** 8 species missing from codebase: Feral World, Shrine World, War World, Beastman, Mutant, Tainted, Blank, Scout Marine. UI and schema support them — only data files need authoring.
- **[S6.1] MEDIUM:** Ogryn classified as `standard` in code, but `Advanced` in source doc. Tier mismatch.
- **[S6.2] LOW:** 5 classes not yet authored (Warrior, Assassin, Desperado, Officer, Tech-Priest). Known and expected.

### UI Gaps (UI doesn't expose features the data supports)

- **[S4.5] MEDIUM:** `experiencePoints` field exists on Character but has no UI to view or edit.
- **[S4.5] MEDIUM:** `alignment` field exists on Character but has no UI to view or edit.
- **[S4.5] MEDIUM:** `psykerDiscipline` and `sanctioningStatus` are not set at creation and have no dedicated UI to set them (may be managed indirectly by class tabs).

### Design Debt (patterns that are inconsistent but functional)

- **[S3] LOW:** No class-specific initialization at creation time. All class-specific fields (warpBar, powerCells, geneSurgesRemaining, etc.) start as `undefined` and rely on the character sheet/rest dialog to initialize them on first use.
- **[S5.4] LOW:** Only one read-side migration exists (`fightingStyle` → `featureChoices['fighting-style']`). No framework for future migrations.
- **[S4.1] LOW:** Store accepts any `Partial<Character>` patch with no validation. All integrity enforcement is at the UI layer, which is inconsistent across surfaces.
- **[S6.1] LOW:** Generic "Human" species (ID: `human`) doesn't correspond to any canonical homeworld. May serve as catch-all but should be reviewed.

### Documentation

- **[S6.3] LOW:** Background source doc (`WH40K_Backgrounds_Languages_Tools.md`) not found in project. Cannot cross-reference backgrounds against canonical list.
- **[S6.5] LOW:** No feat-list source doc found for cross-reference.
