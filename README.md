# Warhammer Chronicles

A homebrew companion app for a **Warhammer 40K D20** tabletop RPG. Create and manage characters, manage campaigns, track stats, and load custom content through the module system.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [How the App Works](#how-the-app-works)
4. [Character Creation — Process Flow](#character-creation--process-flow)
5. [The Module System](#the-module-system)
6. [Module Format Reference](#module-format-reference)
7. [Core Content Inventory](#core-content-inventory)
8. [Converting Documents to Modules](#converting-documents-to-modules)
9. [Adding Content to the Core Module](#adding-content-to-the-core-module)
10. [Routing & Pages](#routing--pages)
11. [Character Data Reference](#character-data-reference)

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```

---

## Project Structure

```
src/
├── App.tsx                       ← root router, registers coreModule on load
├── main.tsx                      ← entry point
│
├── pages/
│   ├── Landing.tsx               ← home nav hub (5 sections)
│   ├── Characters.tsx            ← character roster — view, select, delete
│   ├── CharacterCreation.tsx     ← guided creation form → /sheet
│   └── CharacterSheetPage.tsx    ← sheet wrapper with character tab bar
│
├── components/
│   └── CharacterSheet/           ← all sheet sub-components
│       ├── index.tsx             ← assembles the full sheet layout
│       ├── CharacterHeader.tsx
│       ├── AbilityScores.tsx
│       ├── HitPoints.tsx         ← labeled "Wounds" (40K terminology)
│       ├── SkillList.tsx
│       └── ...
│
├── store/
│   └── characterStore.ts         ← Zustand store — all character state
│
├── modules/
│   ├── registry.ts               ← module loader & all lookup helpers
│   └── core/                     ← built-in 40K base content
│       ├── index.ts              ← assembles the core module
│       ├── races/                ← index.ts — 14 species
│       ├── classes/              ← warrior, brightWizard, thief, warriorPriest
│       ├── spells/               ← cantrips.ts, level1.ts
│       ├── items/                ← weapons.ts, armor.ts, consumables.ts
│       ├── feats/                ← index.ts — 17 feats
│       ├── npcs/                 ← index.ts — monsters, NPCs, bosses
│       └── backgrounds/          ← index.ts — 15 backgrounds
│
└── types/
    ├── module.ts                 ← all content type definitions (Race, Class, Spell, etc.)
    └── character.ts              ← Character, Skills, AbilityScores
```

---

## How the App Works

### 1. Boot

`App.tsx` calls `registerModule(coreModule)` once when the app loads. This loads all core species, classes, spells, items, feats, NPCs, and backgrounds into the registry. Additional modules can be registered in the same place.

### 2. Module Registry

`src/modules/registry.ts` is an in-memory Map. Every component and page queries it rather than importing content directly — so the source module is transparent to the UI.

```ts
import {
  getAllRaces, getRaceById,
  getAllClasses, getClassById,
  getAllBackgrounds, getBackgroundById,
  getAllSpells, getSpellById,
  getAllItems, getItemById,
  getAllFeats, getFeatById,
  getAllNPCs, getNPCById,
} from './modules/registry'

// Returns content from ALL loaded modules combined
getAllRaces()               // Race[]
getRaceById('hive-world-human')  // Race | undefined
```

### 3. Character State

All character data lives in the Zustand store (`characterStore.ts`). Characters are plain objects matching the `Character` interface. References to module content use string IDs — a character stores `spellIds: ['firebolt']`, not a copy of the spell.

Key store actions:

| Action | Purpose |
|---|---|
| `createCharacter()` | Creates a blank character, returns UUID |
| `updateCharacter(id, patch)` | Partial update — pass only changed fields |
| `updateAbilityScore(id, ability, value)` | Updates a single ability score |
| `toggleSkill(id, skill)` | Flips a skill proficiency on/off |
| `setHitPoints(id, current)` | Clamps Wounds to `[0, max]` |
| `deleteCharacter(id)` | Removes from roster |

Utility helpers:

```ts
import { getModifier, getProficiencyBonus } from './store/characterStore'

getModifier(16)          // → +3
getProficiencyBonus(5)   // → +3
```

> **Note:** Characters currently live in browser memory and reset on page refresh. Dexie.js is installed and ready for persistence — not yet wired up.

---

## Character Creation — Process Flow

The creation flow lives in `src/pages/CharacterCreation.tsx`. It is a single-page form that collects five pieces of information, then creates the character and navigates to the sheet.

### Step-by-step flow

```
Landing (/)
    │
    └─► /create  ←─────────────────────────────────────────────┐
            │                                                   │
            │  1. Name          (free text, required)           │
            │  2. Species       (select, required)              │
            │  3. Class         (select, required)              │
            │  4. Background    (select, optional)              │
            │  5. Alignment     (select, optional)              │
            │                                                   │
            │  [FORGE CHARACTER] button enabled when            │
            │   name + species + class are all filled           │
            │                                                   │
            ▼
        createCharacter()           ← Zustand: creates blank Character, returns UUID
            │
        updateCharacter(id, {       ← Zustand: stamps the form values onto it
          name, race, class,
          background, alignment
        })
            │
        setActiveCharacter(id)      ← marks as the currently-viewed character
            │
            └─► /sheet              ← CharacterSheetPage renders the full sheet
```

### Dropdown data sources

All dropdowns are populated live from the module registry at component render time — no hardcoded lists:

| Field | Source | Filter |
|---|---|---|
| Species | `getAllRaces()` | Grouped by `tier`: standard first, advanced hidden (shown as separate group if needed) |
| Class | `getAllClasses()` | All classes from loaded modules |
| Background | `getAllBackgrounds()` | Standard backgrounds first; `special: true` backgrounds in a "Restricted (GM Approval)" `<optgroup>` at the bottom |
| Alignment | Hardcoded constant | Standard 9-alignment grid |

### Description previews

When any of Species, Class, or Background is selected, a one-line italic description appears beneath the dropdown directly from the module data (`race.description`, `class.description`, `background.description`). No extra fetch required.

### What "Forge Character" creates

`createCharacter()` stamps a default `Character` object with:

```ts
{
  // Identity (from form)
  name, race, class, background, alignment,

  // Stats (all defaults — edit on the sheet)
  level: 1,
  abilityScores: { strength: 10, dexterity: 10, ... },  // all 10s
  maxHitPoints: 10,
  currentHitPoints: 10,
  proficiencyBonus: 2,
  armorClass: 10,
  speed: 30,

  // 40K trackers
  warpExposure: 0,
  corruption: 0,
  faith: 0,

  // Currency (40K)
  currency: { thrones: 0, melt: 0, aquila: 0 },

  // All skills: false (not proficient)
  // Inventory, spells, feats: empty arrays
}
```

Racial ability score bonuses, background skill proficiencies, and class features are **not** automatically applied — they are reference data that the player reads and then manually sets on the sheet. Auto-application is a planned feature.

### Navigating back

- The `← HOME` button on the creation page returns to `/` without creating a character.
- Cancelling mid-form (navigating away) also creates nothing — `createCharacter()` is only called when the submit button is pressed.

---

## The Module System

A **module** is a TypeScript object (or `.json` file) that bundles game content under a shared ID and version. Any number of modules can be loaded simultaneously — the registry merges them all.

```
WarhamerModule
├── id           unique string key  e.g. "my-chaos-supplement"
├── name         human-readable
├── version      semver  e.g. "1.0.0"
├── description? optional
├── author?      optional
└── content
    ├── races?        Race[]
    ├── classes?      CharacterClass[]
    ├── spells?       Spell[]
    ├── items?        Item[]
    ├── feats?        Feat[]
    ├── npcs?         NPC[]
    └── backgrounds?  Background[]
```

All `content` fields are optional. A spell-only module is valid.

### Register a module in code

```ts
// src/App.tsx
import { registerModule } from './modules/registry'
import { myModule } from './modules/my-module'

registerModule(myModule)
```

### Load a module from a JSON file (browser)

```ts
import { loadModuleFromFile } from './modules/registry'

async function onFileSelected(file: File) {
  const mod = await loadModuleFromFile(file)
  console.log('Loaded:', mod.name)
}
```

---

## Module Format Reference

All fields marked `?` are optional.

### Race

```json
{
  "id": "hive-world-human",
  "name": "Human — Hive World",
  "description": "One sentence flavour.",
  "abilityScoreIncreases": { "dexterity": 2, "charisma": 1 },
  "abilityScoreChoices": { "choose": 1, "amount": 1 },
  "speed": 30,
  "size": "medium",
  "tier": "standard",
  "traits": [
    { "name": "Street Smarts", "description": "Advantage on Initiative in urban environments." }
  ],
  "drawbacks": [
    { "name": "Example Drawback", "description": "Disadvantage on X." }
  ],
  "languages": ["Low Gothic", "Underworld"],
  "tags": ["human"]
}
```

| Field | Values |
|---|---|
| `size` | `tiny` \| `small` \| `medium` \| `large` \| `huge` |
| `tier` | `standard` (normal pick) \| `advanced` (GM approval required) |
| `abilityScoreIncreases` | Negative values allowed (e.g. Ogryn `intelligence: -2`) |
| `abilityScoreChoices` | `{ choose: N, amount: X }` — player picks N stats to gain +X each |
| `drawbacks` | Same shape as `traits` — UI styles these separately as penalties |

---

### CharacterClass

```json
{
  "id": "trollslayer",
  "name": "Trollslayer",
  "description": "One sentence flavour.",
  "hitDie": 12,
  "primaryAbility": ["strength"],
  "savingThrows": ["strength", "constitution"],
  "skillChoices": ["athletics", "intimidation", "survival"],
  "numSkillChoices": 2,
  "armorProficiencies": ["light"],
  "weaponProficiencies": ["simple", "martial"],
  "toolProficiencies": [],
  "startingEquipmentOptions": ["Greataxe", "Two handaxes", "Explorer's pack"],
  "features": [
    { "level": 1, "name": "Slayer Oath", "description": "Cannot wear armour." }
  ],
  "subclasses": [
    {
      "id": "giant-slayer",
      "name": "Giantslayer",
      "description": "Seeks ever-larger prey.",
      "unlockLevel": 3,
      "features": [
        { "level": 3, "name": "Giant Rage", "description": "+1d6 damage vs Large or larger." }
      ]
    }
  ],
  "tags": ["martial", "dwarf"]
}
```

---

### Background

```json
{
  "id": "soldier",
  "name": "Soldier",
  "description": "One sentence flavour.",
  "skillProficiencies": ["athletics", "intimidation"],
  "toolProficiencies": ["Gaming Set", "Vehicles (Ground)"],
  "languages": ["Imperial Codes"],
  "languageChoices": 0,
  "startingEquipment": ["Rank insignia", "Dog tags", "10 Thrones"],
  "feature": {
    "name": "Military Rank",
    "description": "Soldiers of lower rank defer to you..."
  },
  "suggestedPersonalityTraits": ["I face problems head-on."],
  "suggestedIdeals": ["Honour. Dead soldiers deserve to be remembered."],
  "suggestedBonds": ["I fight for my squad."],
  "suggestedFlaws": ["I made a mistake in battle that cost lives."],
  "special": false,
  "tags": ["combat", "imperial"]
}
```

| Field | Notes |
|---|---|
| `skillProficiencies` | Exactly 2 `SkillName` values |
| `languageChoices` | How many languages the player picks freely |
| `special: true` | Marks the background as restricted — shown in a separate group in the creation UI |

---

### Spell (including Psyker powers)

```json
{
  "id": "smite-the-unbeliever",
  "name": "Smite the Unbeliever",
  "level": 2,
  "school": "Evocation",
  "castingTime": "1 action",
  "range": "60 feet",
  "components": ["V", "S"],
  "duration": "Instantaneous",
  "description": "A bolt of divine fire strikes one target. +spell attack vs AC. 3d8 radiant damage.",
  "higherLevels": "+1d8 for each slot level above 2nd.",
  "warpCost": 0,
  "discipline": null,
  "perilsRisk": false,
  "tags": ["divine", "damage"]
}
```

For **Psyker powers**, set `warpCost`, `discipline`, and `perilsRisk`:

```json
{
  "id": "smite-warp",
  "name": "Smite (Telepathy)",
  "level": 1,
  "warpCost": 3,
  "discipline": "Telepathy",
  "perilsRisk": true,
  ...
}
```

---

### Feat

```json
{
  "id": "iron-will",
  "name": "Iron Will",
  "source": "warhammer",
  "prerequisite": "None",
  "prerequisiteClass": null,
  "prerequisiteRace": null,
  "description": "Advantage on saves vs. fear and psychic effects...",
  "abilityScoreIncreases": {},
  "tags": ["warhammer", "mental", "defense"]
}
```

| `source` | Meaning |
|---|---|
| `standard` | Adapted from 5e |
| `warhammer` | Setting-specific to the 41st Millennium |

---

### Item

```json
{
  "id": "lasgun",
  "name": "Lasgun",
  "type": "weapon",
  "weight": 4,
  "cost": "75 Thrones",
  "description": "Standard-issue Imperial Guard ranged weapon.",
  "properties": ["ranged", "two-handed"],
  "damage": "1d8",
  "damageType": "energy",
  "requiresAttunement": false,
  "tags": ["imperial", "ranged"]
}
```

> **Currency note:** This app uses Thrones, Melt, and Aquila — not gold/silver. Use the `cost` string field freely: `"50 Thrones"`, `"2 Melt"`, etc.

**`type` values:** `weapon` | `armor` | `gear` | `tool` | `consumable` | `magical` | `currency`

---

### NPC / Monster

```json
{
  "id": "chaos-warrior",
  "name": "Chaos Warrior",
  "type": "monster",
  "size": "medium",
  "alignment": "Chaotic Evil",
  "armorClass": 18,
  "hitPoints": "5d8+15",
  "speed": 30,
  "abilityScores": {
    "strength": 18, "dexterity": 11, "constitution": 17,
    "intelligence": 11, "wisdom": 10, "charisma": 14
  },
  "savingThrows": { "strength": 6, "constitution": 5 },
  "skills": { "perception": 2 },
  "damageResistances": ["bludgeoning from non-magical weapons"],
  "senses": ["Darkvision 60ft"],
  "languages": ["Low Gothic", "Chaos Tongue"],
  "challengeRating": 5,
  "xp": 1800,
  "traits": [
    { "name": "Mark of Chaos", "description": "Regenerates 5 HP at start of turn." }
  ],
  "actions": [
    { "name": "Chaos Blade", "description": "Melee +6 to hit.", "attackBonus": 6, "damage": "1d8+4", "damageType": "slashing" }
  ],
  "legendaryActions": [],
  "tags": ["chaos", "monster"]
}
```

**`type` values:** `monster` | `npc` | `boss` | `minion` | `ally`

---

## Core Content Inventory

What ships in the core module out of the box:

### Species (14)

| Species | Tier | Size | Key ASI |
|---|---|---|---|
| Human (generic) | standard | medium | +1 to any 2 (player choice) |
| Human — Fortress World | standard | medium | STR+2 CON+1 |
| Human — Hive World | standard | medium | DEX+2 CHA+1 |
| Human — Forge World | standard | medium | INT+2 CON+1 |
| Human — Death World | standard | medium | CON+2 WIS+1 |
| Human — Void Born | standard | medium | DEX+1 INT+1 WIS+1 |
| Human — Noble Born | standard | medium | CHA+2 INT+1 |
| Ratling | standard | small | DEX+2 CHA+1 |
| Felinid | standard | medium | DEX+2 WIS+1 |
| Ogryn | standard | large | STR+4 CON+2 INT-2 |
| Squat (Leagues of Votann) | standard | small | CON+2 STR+1 |
| Techfused | **advanced** | medium | CON+2 + 1 (player choice) |
| Nightsider | **advanced** | medium | DEX+2 WIS+1 |
| Longshank | **advanced** | medium | STR+1 DEX+1 CON+1 |

### Classes (4)

Warrior, Bright Wizard, Thief, Warrior Priest

### Backgrounds (15)

Standard: Soldier, Adept, Outcast, Ganger, Acolyte, Void Born, Mechanicum Initiate, Noble, Chirurgeon, Pilgrim, Enforcer, Savant, Merchant, Penal Legionnaire

Restricted (GM approval): Genestealer Cultist

### Feats (17)

Standard (10): Two-Weapon Fighting, Sharpshooter, Alert, Tough, Lucky, War Caster, Sentinel, Great Weapon Master, Mobile, Resilient

Warhammer (7): Iron Will, Throne Agent, Suppression Veteran, Mechanicus Training, Warp Sense, Combat Stimms, Augment Familiarity

---

## Converting Documents to Modules

### Step 1 — Map content to types

| Document content | Module field |
|---|---|
| Playable species / ancestry | `races` |
| Classes, careers, archetypes | `classes` |
| Backgrounds, origins | `backgrounds` |
| Spells, prayers, psyker powers | `spells` |
| Weapons, armour, gear, relics | `items` |
| Talents, special abilities | `feats` |
| Monsters, NPCs, named characters | `npcs` |

### Step 2 — Create the module folder

```
src/modules/my-supplement/
├── index.ts          ← assembles the module
├── races/
├── classes/
├── backgrounds/
├── spells/
├── items/
├── feats/
└── npcs/
```

Each file exports a typed array:

```ts
// src/modules/my-supplement/npcs/cultists.ts
import type { NPC } from '../../../types/module'

export const cultists: NPC[] = [
  { id: 'my-supplement-cultist', name: 'Cult Ambusher', ... }
]
```

The assembler:

```ts
// src/modules/my-supplement/index.ts
import type { WarhamerModule } from '../../types/module'
import { cultists } from './npcs/cultists'

export const mySupplement: WarhamerModule = {
  id: 'my-supplement',
  name: 'My Supplement',
  version: '1.0.0',
  content: { npcs: cultists },
}
```

### Step 3 — Register in App.tsx

```ts
import { mySupplement } from './modules/my-supplement'
registerModule(mySupplement)
```

### Step 4 — Keep IDs unique

Prefix supplement-specific IDs to avoid collisions with core:

```
"id": "my-supplement-cultist"   ✓
"id": "cultist"                 ✗  (may conflict with another module)
```

---

## Adding Content to the Core Module

**Add a species:** append to the `coreRaces` array in `src/modules/core/races/index.ts`

**Add a class:** create `src/modules/core/classes/myClass.ts`, export it, add to `classes: [...]` in `core/index.ts`

**Add a background:** append to the `coreBackgrounds` array in `src/modules/core/backgrounds/index.ts`

**Add a feat:** append to the `coreFeats` array in `src/modules/core/feats/index.ts`

**Add a spell:** add to an existing level file (e.g. `spells/level2.ts`) or create a new one, then spread it into `allSpells` in `spells/index.ts`

**Add an NPC/monster:** append to `coreNPCs` in `src/modules/core/npcs/index.ts`. For large bestiaries, split into separate files and import them.

---

## Routing & Pages

| Route | Page | Description |
|---|---|---|
| `/` | `Landing.tsx` | Navigation hub with 5 sections |
| `/characters` | `Characters.tsx` | Roster — view, select, delete characters |
| `/create` | `CharacterCreation.tsx` | Guided creation form — see [Process Flow](#character-creation--process-flow) |
| `/sheet` | `CharacterSheetPage.tsx` | Full sheet with character tab bar at top |

**Planned (not yet built):** Campaign, Repository, Compendium — shown as "soon" on the landing page.

---

## Character Data Reference

### 40K-specific tracker fields

| Field | Range | Visibility |
|---|---|---|
| `warpExposure` | 0–10 | GM-facing |
| `warpBar` | 0–20 | Psyker only |
| `corruption` | 0–100 | Hidden from players |
| `faith` | 0–100 | Hidden from players |

### Currency

```ts
currency: {
  thrones: number   // common currency
  melt: number      // mid-tier
  aquila: number    // high-value
}
```

### Augmenticist fields

```ts
augmentSlots?: number
powerCells?: { current: number; max: number }
installedAugmentIds?: string[]   // references Item.id
```

### Full field list

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | UUID, auto-generated |
| `name` | `string` | |
| `race` | `string` | References `Race.id` |
| `class` | `string` | References `CharacterClass.id` |
| `background` | `string` | References `Background.id` |
| `level` | `number` | 1–20 |
| `abilityScores` | `Record<AbilityScore, number>` | STR / DEX / CON / INT / WIS / CHA |
| `skills` | `Record<SkillName, boolean>` | `true` = proficient |
| `maxHitPoints` | `number` | "Wounds" in the UI |
| `currentHitPoints` | `number` | Clamped to `[0, max]` |
| `spellIds` | `string[]` | References `Spell.id` from registry |
| `featIds` | `string[]` | References `Feat.id` from registry |
| `inventory` | `InventoryItem[]` | `{ itemId, quantity, equipped?, notes? }` |
| `warpExposure` | `number` | 0–10, GM-facing |
| `corruption` | `number` | 0–100 |
| `faith` | `number` | 0–100 |
| `currency` | `{ thrones, melt, aquila }` | 40K denominations |

### SkillName values

```
acrobatics  animalHandling  arcana       athletics
deception   history         insight      intimidation
investigation  medicine     nature       perception
performance    persuasion   religion     sleightOfHand
stealth        survival     xenology     technology     warpControl
```
