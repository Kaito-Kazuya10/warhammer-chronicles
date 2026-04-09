# Warhammer Chronicles

A full-featured homebrew companion app for a **Warhammer 40K D20** tabletop RPG campaign. Create and manage characters, track stats, roll dice, manage inventory and class systems, and deploy updates to live players.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Dev Workflow](#dev-workflow)
5. [Deployment](#deployment)
6. [Validation Pipeline](#validation-pipeline)
7. [Character Sheet — Features](#character-sheet--features)
8. [Classes](#classes)
9. [Species (Races)](#species-races)
10. [Backgrounds](#backgrounds)
11. [Items & Tier System](#items--tier-system)
12. [Gene Modifications](#gene-modifications)
13. [Augments](#augments)
14. [Psyker Powers & Prayers](#psyker-powers--prayers)
15. [The Module System](#the-module-system)
16. [Adding Content to the Core Module](#adding-content-to-the-core-module)
17. [Character Data Reference](#character-data-reference)
18. [Routes & Pages](#routes--pages)
19. [Database & Auth](#database--auth)

---

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run validate   # typecheck + lint + game data check (run before pushing)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| State | Zustand 5 |
| Routing | React Router 7 |
| UI Components | shadcn/ui (base-ui + Tailwind CSS) |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Build | Vite 7 |
| Deployment | Vercel (auto-deploy from `master`) |

---

## Project Structure

```
src/
├── App.tsx                        ← root router, registers coreModule on load
├── main.tsx                       ← entry point
│
├── pages/
│   ├── Landing.tsx                ← home dashboard
│   ├── Characters.tsx             ← character roster
│   ├── CharacterCreation/         ← 7-step creation wizard
│   │   ├── index.tsx
│   │   ├── CreationContext.tsx    ← wizard state management
│   │   ├── steps/                 ← one file per step
│   │   └── components/            ← reusable wizard sub-components
│   ├── CharacterSheetPage.tsx     ← sheet wrapper
│   └── CampaignPage.tsx           ← GM campaign management
│
├── components/
│   └── CharacterSheet/
│       ├── index.tsx              ← full sheet layout assembly
│       ├── TopStatBar.tsx         ← ability scores, HP, AC, initiative, level
│       ├── SkillList.tsx          ← 20 skills with proficiency toggles + roll buttons
│       ├── ContentTabs.tsx        ← 6-tab content area
│       ├── ItemBrowserModal.tsx   ← item browser (centered modal)
│       ├── RestDialog.tsx         ← short/long rest UI
│       ├── DiceToolbar.tsx        ← quick dice roller
│       ├── RollHistoryPanel.tsx   ← roll log
│       └── tabs/
│           ├── ActionsTab.tsx
│           ├── InventoryTab.tsx
│           ├── FeaturesTab.tsx    ← generic fallback
│           ├── LoadoutTab.tsx     ← Augmenticist
│           ├── PrayersTab.tsx     ← Zealot
│           ├── GeneModTab.tsx     ← Gene-Fighter
│           ├── WarpDisciplinesTab.tsx ← Psyker
│           ├── BackgroundTab.tsx
│           ├── NotesTab.tsx
│           └── ExtrasTab.tsx
│
├── modules/
│   ├── registry.ts                ← module loader + all lookup helpers
│   └── core/
│       ├── index.ts               ← assembles the full core module
│       ├── races/                 ← 14 species
│       ├── classes/               ← 5 classes (one file each)
│       ├── spells/                ← psykerPowers.ts, zealotPrayers.ts
│       ├── items/                 ← weapons, armor, consumables, named tiers
│       ├── feats/                 ← 17 feats
│       ├── npcs/                  ← monsters, NPCs, bosses
│       ├── backgrounds/           ← 15 backgrounds
│       ├── augments/              ← Augmenticist augments
│       └── geneModifications/     ← Gene-Fighter mods
│
├── store/
│   ├── characterStore.ts          ← Zustand — all character state + actions
│   └── diceStore.ts               ← roll history
│
├── db/
│   ├── characterRepository.ts     ← Supabase queries
│   ├── mappers.ts                 ← Character ↔ DB row conversion
│   └── types.ts                   ← DB row shape
│
├── auth/
│   ├── AuthProvider.tsx           ← Supabase auth context
│   └── ProtectedRoute.tsx         ← route guard
│
├── types/
│   ├── module.ts                  ← all content types (Race, Class, Item, etc.)
│   └── character.ts               ← Character, Skills, AbilityScores
│
├── utils/
│   ├── dice.ts                    ← roll logic, nat1/20 detection
│   ├── renderDescription.tsx      ← rich text rendering for ability descriptions
│   └── resolveUsesCount.ts        ← resolves scaling use-count formulas
│
└── scripts/
    └── validate-game-data.ts      ← game data integrity checker (CI)
```

---

## Dev Workflow

### Branch Strategy

```
dev  →  staging  →  master (production)
```

| Branch | Purpose |
|---|---|
| `dev` | Active work-in-progress |
| `staging` | Finished work, playtesting on Vercel preview before going live |
| `master` | Production — what players use. Protected, requires passing CI |

**Flow:** work on `dev` → open PR to `staging` (CI runs) → playtest on Vercel preview URL → open PR to `master` (CI runs again) → live for players.

**Rule:** Never commit directly to `master`. Always go through a PR.

### Day-to-day

1. Work on `dev` branch
2. Run `npm run validate` locally before pushing — catches issues before CI does
3. Open PR `dev → staging` when a feature is done
4. Playtest on the Vercel preview URL for that branch
5. Open PR `staging → master` when ready to ship to players
6. Every PR auto-fills the PR template with a testing checklist

---

## Deployment

The app is deployed on **Vercel**, connected to the GitHub repo.

- `master` → auto-deploys to production (the live URL players use)
- `staging` and feature branches → Vercel preview deployments (unique URL per branch, great for mobile testing)

### Environment Variables (set in Vercel dashboard)

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

These are also required in `.env.local` for local development (never committed to git).

### Supabase Row Level Security

All tables have RLS enabled. Users can only read/write their own characters. The `characters` table has:
- `Users can manage own characters` — ALL operations where `auth.uid() = user_id`
- `DM reads campaign characters` — SELECT for campaign members

---

## Validation Pipeline

Run before every push:

```bash
npm run validate
```

This runs three checks in sequence:

| Step | Command | What it checks |
|---|---|---|
| 1 | `npm run typecheck` | TypeScript strict mode — no unused locals/params, no type errors |
| 2 | `npm run lint` | ESLint — React hooks rules, unused expressions |
| 3 | `npm run validate:data` | Game data integrity (see below) |

### Game Data Integrity Checker (`scripts/validate-game-data.ts`)

Runs against all 644+ content entries in the core module and checks:

- **Duplicate IDs** — no two items, weapons, classes, races, etc. can share an ID
- **Required fields** — every entity must have `id`, `name`, `description`
- **Cross-references** — feat prerequisites, augment specializations, and gene mod archetypes must reference real IDs
- **Subclass uniqueness** — subclass IDs must be unique across all classes
- **GeneMod stability costs** — minor=1, major=2, extreme=3 (enforced)
- **Armor tier completeness** — all 5 tiers must have definitions
- **Class feature completeness** — name, description, valid level range (1–20)
- **Background completeness** — feature.name, feature.description, exactly 2 skill proficiencies
- **Item type-specific fields** — weapons missing damage dice, armor missing AC (warns)
- **Named items on standard tier** — named items should be master-crafted or above (warns)

Exits with code 1 on errors (blocks CI). Warnings print but don't block the build.

### GitHub Actions CI (`.github/workflows/validate.yml`)

Runs automatically on:
- PRs targeting `master` or `staging`
- Direct pushes to `staging`

The job name is `Type Check + Lint + Game Data` — this is what appears in GitHub branch protection status checks.

---

## Character Sheet — Features

### Top Stat Bar
- Portrait, character name, class, subclass, race, level
- 6 ability scores with modifiers — click any to roll a d20 check
- HP tracker (labeled "Wounds") with short/long rest dialog
- AC (auto-computed from equipped armor — base AC + DEX capped by maxDexBonus + tier bonus + named item bonuses)
- Initiative, Speed, Proficiency Bonus
- 40K trackers: Warp Bar, Warp Exposure, Corruption, Faith, Currency

### Skill List
- All 20 skills with associated ability abbreviation
- Click the dot to toggle proficiency
- Click the row to roll the skill check (adds to roll history)

### Dice Roller
- Quick buttons: d4, d6, d8, d10, d12, d20, d100
- Advantage / Disadvantage toggle for d20 rolls
- Custom roll input (e.g. `2d6+3`)
- Natural 1 / Natural 20 detection
- Full roll history with timestamps

### Content Tabs (6 tabs)

| Tab | Contents |
|---|---|
| ACTIONS | Class features, abilities, item abilities for equipped items |
| INVENTORY | Item management, equip/unequip, upgrade system, item browser |
| FEATURES | Class-specific tab (see per-class details below) |
| BACKGROUND | Background feature, personality, ideals, bonds, flaws, backstory |
| NOTES | Free-form notes |
| EXTRAS | Additional trackers |

### Item Browser Modal
- Searchable item database (644+ entries)
- Filter by type: Weapons, Armor, Consumable, Gear
- Filter by tier: Standard → Master-Crafted → Artificer → Relic → Heroic
- Filter by weapon category: Simple, Martial, Heavy, Exotic
- Property tooltips on hover
- Add to inventory with quantity picker

### Inventory System
- Items organized by category
- Equip/unequip toggle (equipped items contribute to AC and appear in Actions tab)
- Upgrade items to higher tiers (rolls trait table for weapons; armor upgrades skip trait roll)
- Track ammo (packs per session or individual shots)
- Item notes

### Rest System
- Short Rest: spend hit dice, recover class resources
- Long Rest: full HP restore, all slots and resources reset
- Timestamps stored (`lastShortRest`, `lastLongRest`) for time-gated features

---

## Classes

### Imperial Guardsman
- **Hit Die:** d10
- **Primary Abilities:** Dexterity, Constitution, Wisdom
- **Saving Throws:** Strength, Constitution
- **Weapons:** Simple + Martial
- **Feature Tab:** Regimental Doctrine
- **Subclasses (Regiments):** Cadian Shock Trooper, Catachan Jungle Fighter, Tallarn Desert Raider, Vostroyan Firstborn, Kriegsman (Death Korps of Krieg), Heavy Weapons Specialist

### Augmenticist
- **Hit Die:** d8
- **Primary Abilities:** Dexterity, Wisdom
- **Special Resource:** Power Cells (short rest recharge, starts level 2)
- **Weapons:** Simple weapons, unarmed strikes
- **Tools:** Mechanic's tools
- **Feature Tab:** Loadout (augment slot management system)
- **Subclasses (Specializations):** Tech-Integrator, Medicae Savant, Ballistic Frame, Velocity Frame
- **Tracked:** `augmentSlots`, `powerCells { current, max }`, `installedAugmentIds[]`

### Gene-Fighter
- **Feature Tab:** Gene Mods (gene modification browser + stability tracker)
- **Subclasses (Archetypes):** Abomination Juggernaut, Elemental Chimera, Apex Predator
- **Tracked:** `isInGeneSurge`, `geneSurgesRemaining`, `geneticInstability`, `installedModIds[]`
- Stability Score = CON modifier + Proficiency Bonus × 2

### Psyker
- **Primary Abilities:** Intelligence / Wisdom
- **Feature Tab:** Warp Disciplines (power preparation + warp bar tracking)
- **Disciplines:** BIO (Biomancy), PYR (Pyromancy), TEL (Telepathy), TK (Telekinesis), DIV (Divination), ALL
- **Tracked:** `warpBar` (0–20), `warpExposure` (0–10), `sanctioningStatus`, `psykerDiscipline`, `preparedSpellIds[]`

### Zealot
- **Hit Die:** d8
- **Primary Ability:** Charisma
- **Feature Tab:** Prayers (Charisma-based prayer casting)
- **Subclasses (Holy Orders):** defined per campaign
- **Tracked:** `faith` (0–100, hidden)

---

## Species (Races)

14 species available. Standard species are always available; Advanced require GM approval.

### Standard Species (11)

| Species | Size | Key Ability Increases | Notable Traits |
|---|---|---|---|
| Human (Generic) | Medium | +1 to any 2 (player choice) | Adaptable, Determined |
| Human — Fortress World | Medium | STR+2, CON+1 | Born Shooting, Duck for Cover |
| Human — Hive World | Medium | DEX+2, CHA+1 | Underhive Survivor, Street Smarts |
| Human — Forge World | Medium | INT+2, CON+1 | Rite of Maintenance, Machine Affinity |
| Human — Death World | Medium | CON+2, WIS+1 | Toxin Resistance, Apex Predator Instinct |
| Human — Void Born | Medium | DEX+1, INT+1, WIS+1 | Zero-G Adapted, Voidwise, Void Tongue |
| Human — Noble Born | Medium | CHA+2, INT+1 | Educated, High Society |
| Ratling (Abhuman) | Small | DEX+2, CHA+1 | Natural Sniper, Naturally Stealthy, Lucky |
| Felinid (Abhuman) | Medium | DEX+2, WIS+1 | Feline Agility, Cat's Claws, Darkvision |
| Ogryn (Abhuman) | Large | STR+4, CON+2, INT-2 | Powerful Build, Bone 'Ead, Loyal |
| Squat / Kin | Small | CON+2, STR+1 | Dwarven Resilience, Stonecunning, Grudge-Bearer |

### Advanced Species (GM Approval Required) (3)

| Species | Size | Key Ability Increases | Notable Traits |
|---|---|---|---|
| Techfused | Medium | CON+2 + 1 (player choice) | Constructed Resilience, Automatic Rest, Integrated Protection |
| Nightsider | Medium | DEX+2, WIS+1 | Superior Darkvision, Nightsider Sign, Shadow Step (+ Light Sensitivity) |
| Longshank | Medium | STR+1, DEX+1, CON+1 | Long Limbed, Void Adapted, Longshank Sign |

---

## Backgrounds

15 backgrounds. 14 standard, 1 restricted.

| Background | Feature | Skills |
|---|---|---|
| Soldier | Military Rank | Athletics, Intimidation |
| Adept | Bureaucratic Access | History, Investigation |
| Outcast | Life on the Fringe | Deception, Stealth |
| Ganger | Criminal Contacts | Deception, Intimidation |
| Acolyte | Shelter of the Faithful | Insight, Religion |
| Void Born | Void Legs | Perception, Survival |
| Mechanicum Initiate | Rite of Maintenance | Arcana, Technology |
| Noble | Position of Privilege | History, Persuasion |
| Chirurgeon | Medical Authority | Medicine, Insight |
| Pilgrim | Pilgrim's Welcome | Religion, Insight |
| Enforcer | Watcher's Eye | Intimidation, Investigation |
| Savant | Researcher | History, Arcana |
| Merchant | Trade Network | Persuasion, Deception |
| Penal Legionnaire | Hard Time | Athletics, Intimidation |
| Genestealer Cultist *(Restricted — GM Approval, starts with 8 Corruption)* | Hidden Cult | Deception, Stealth |

---

## Items & Tier System

### Item Categories

- **Weapons** — ranged and melee, categorized as Simple / Martial / Heavy / Exotic
- **Armor** — body armor (light/medium/heavy), shields, helmets, cloaks, accessories
- **Consumables** — single-use items (stims, grenades, med-kits)
- **Gear** — equipment and tools

### Weapon Properties

Full property system with tooltips in the item browser. Key properties include: Finesse, Two-Handed, Versatile, Heavy, Light, Thrown, Reach, Loading, Burst Fire, Suppression, and more.

### Ammo Tracking

Three ammo types:
- `pack` — session-based (X packs per session, nat 1 expends a pack)
- `shot` — individual shot tracking
- `unlimited` — no tracking (slings, throwing knives)

### Tier System

Items have 5 tiers. Non-named items can be upgraded through the inventory system.

| Tier | Color | Bonus to Hit | Bonus Damage | Trait Slots |
|---|---|---|---|---|
| Standard | — | +0 | — | 0 |
| Master-Crafted | Green | +1 | +1 flat | 1 |
| Artificer | Purple | +2 | +1d6 | 2 |
| Relic | Gold | +3 | +2d4 | 3 |
| Heroic | Red | +3 | +2d6 | 3 |

### Named Items

Named items (`isNamed: true`) bypass the tier trait table system entirely. They carry fixed bonuses and unique `itemAbilities`. Named items exist at every tier above Standard:

- **Master-Crafted Named Weapons** (20 items) — `bonusAttack: 1`, `bonusDamage: 1`
- **Artificer Named Weapons** (20 items) — `bonusAttack: 2`, `bonusDamageDice: '+1d6'`, unique abilities
- **Relic Named Weapons** (17 items) — `bonusAttack: 3`, `bonusDamageDice: '+2d4'`, powerful abilities
- **Heroic Named Weapons** (18 items) — `bonusAttack: 3`, `bonusDamageDice: '+2d6'`, LEGENDARY abilities
- **Master-Crafted Named Armor** (34 items) — `bonusAC: 1`
- **Artificer Named Armor** (22 items) — `bonusAC: 1`, unique abilities
- **Relic Named Armor** (19 items) — `bonusAC: 1`, powerful abilities
- **Heroic Named Armor** (16 items) — `bonusAC: 2`, LEGENDARY abilities

### AC Auto-Computation

AC is computed automatically from equipped items:

```
Body armor equipped:
  AC = armorClass + min(DEX mod, maxDexBonus) + tierBonus + namedBonus + bonusAC from other equipped items

Unarmored:
  AC = 10 + DEX mod + bonusAC from other equipped items
```

---

## Gene Modifications

Used by the **Gene-Fighter** class. Managed through the Gene Mods tab.

**Stability Score** = CON modifier + Proficiency Bonus × 2

### Tiers and Stability Point Costs

| Tier | SP Cost | Examples |
|---|---|---|
| Minor | 1 | Enhanced Musculature, Reinforced Skeleton, Improved Reflexes, Enhanced Cardiovascular, Dense Tissue |
| Major | 2 | Redundant Organs, Enhanced Nervous System, Hyper-Metabolism, Toxic Secretion, Biomantic Communion |
| Extreme | 3 | Apex Mutation, Elemental Chimera variants, Symbiotic Parasite, Abomination Trait |

Each mod has:
- **Passive Effect** — always active after installation
- **Gene-Surge Effect** — enhanced version that activates when in Gene Surge
- **Side Effect** (major/extreme only) — mechanical downside

Archetype-exclusive mods are locked to specific Gene-Fighter subclasses.

---

## Augments

Used by the **Augmenticist** class. Managed through the Loadout tab.

### Categories and Slot Costs

| Tier | Slots | Examples |
|---|---|---|
| Minor | 1 | Optical Enhancements, Audio Filters, Built-in Toolkit, Hidden Storage, Targeting Optics, Combat Stim Injector |
| Major | 2 | Internal Plasma Conduit, Grappling Lines, Redundant Power Core |
| Extreme | 3 | Plasma Cannon, Neural Override, Full Cybernetic Body |

Each augment includes:
- Passive and/or active abilities
- Action type (action, bonus action, reaction, passive)
- Uses/recharge (short rest, long rest, at-will)
- Tags: sensory, utility, defensive, combat, mobility
- Optional Power Cell requirement

---

## Psyker Powers & Prayers

### Psyker Powers

Psyker powers are stored as `Spell` entries with `spellSource: 'psyker'`.

**Disciplines:** BIO (Biomancy), PYR (Pyromancy), TEL (Telepathy), TK (Telekinesis), DIV (Divination), ALL (universal)

**Cantrips (Level 0):** Mind Spark, Warp Flame, Warp Blade, Presage, Thought Whisper, Psychic Light, Fortify, Psychic Hand, Biomantic Repair, Psychic Shock, Phantom Visage, Warp Sense

Each power has:
- `warpCost` — Warp Bar points spent on cast
- `perilsRisk` — whether this power risks Perils of the Warp
- `discipline` — which discipline it belongs to
- `disciplineEnhanced` — bonus effect for matching-discipline Psykers

### Zealot Prayers

Prayers use `spellSource: 'prayer'`, casting ability Charisma (not INT/WIS), gold/radiant UI styling, and do not fill the Warp Bar.

**Sacred Rites (Cantrips):** Emperor's Judgment, Litany of Guidance, Emperor's Light, Rite of Preservation, Voice of the Emperor, Sanctified Strike, and more.

Some prayers are `alwaysPrepared: true` and are always available regardless of preparation slots.

---

## The Module System

A **module** is a TypeScript object that bundles game content. Multiple modules can be loaded simultaneously — the registry merges them all. The core module is registered in `App.tsx` on boot.

```ts
// src/modules/registry.ts — available lookup helpers
getAllRaces()               // Race[]
getAllClasses()             // CharacterClass[]
getAllItems()               // Item[]
getAllSpells()              // Spell[]
getAllFeats()               // Feat[]
getAllNPCs()                // NPC[]
getAllBackgrounds()         // Background[]
getAllAugments()            // Augment[]
getAllGeneModifications()   // GeneModification[]

getItemById('lasgun')      // Item | undefined
getClassById('psyker')     // CharacterClass | undefined
// etc.
```

### Module Shape

```ts
const myModule: WarhamerModule = {
  id: 'my-supplement',       // unique — prefix to avoid collisions
  name: 'My Supplement',
  version: '1.0.0',
  content: {
    races: [],
    classes: [],
    items: [],
    spells: [],
    feats: [],
    npcs: [],
    backgrounds: [],
    augments: [],
    geneModifications: [],
  }
}
```

All `content` fields are optional — a spell-only module is valid.

### Register a module

```ts
// src/App.tsx
import { registerModule } from './modules/registry'
import { myModule } from './modules/my-module'
registerModule(myModule)
```

---

## Adding Content to the Core Module

| Content type | File to edit |
|---|---|
| Species | `src/modules/core/races/index.ts` — append to `coreRaces` |
| Class | Create `src/modules/core/classes/myClass.ts`, add to `classes: [...]` in `core/index.ts` |
| Background | `src/modules/core/backgrounds/index.ts` — append to `coreBackgrounds` |
| Feat | `src/modules/core/feats/index.ts` — append to `coreFeats` |
| Spell / Prayer | Add to `src/modules/core/spells/psykerPowers.ts` or `zealotPrayers.ts`, then spread into `allSpells` in `spells/index.ts` |
| Item | Add to the appropriate file in `src/modules/core/items/` and spread into `allItems` in `items/index.ts` |
| Named Item | Create or append to the named tier file (e.g. `namedWeaponsRelic.ts`) |
| Augment | `src/modules/core/augments/augments.ts` — append to `allAugments` |
| Gene Mod | `src/modules/core/geneModifications/geneModifications.ts` |
| NPC / Monster | `src/modules/core/npcs/index.ts` — append to `coreNPCs` |

After adding content, run `npm run validate:data` to confirm no duplicate IDs or missing required fields.

---

## Character Data Reference

### Core Fields

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | UUID, auto-generated |
| `name` | `string` | |
| `race` | `string` | References `Race.id` |
| `class` | `string` | References `CharacterClass.id` |
| `subclass` | `string?` | References subclass id |
| `background` | `string` | References `Background.id` |
| `level` | `number` | 1–20 |
| `experiencePoints` | `number` | |
| `proficiencyBonus` | `number` | Auto from level |
| `abilityScores` | `Record<AbilityScore, number>` | STR / DEX / CON / INT / WIS / CHA |
| `skills` | `Record<SkillName, boolean>` | `true` = proficient |
| `savingThrowProficiencies` | `AbilityScore[]` | |
| `maxHitPoints` | `number` | "Wounds" in the UI |
| `currentHitPoints` | `number` | Clamped to `[0, max]` |
| `temporaryHitPoints` | `number` | |
| `hitDiceUsed` | `number` | |
| `armorClass` | `number` | Auto-computed from equipped items |
| `initiative` | `number` | |
| `speed` | `number` | |
| `inventory` | `InventoryItem[]` | `{ itemId, quantity, equipped?, notes?, tierOverride?, rolledTrait? }` |
| `spellIds` | `string[]` | References `Spell.id` |
| `preparedSpellIds` | `string[]` | Currently prepared spells (Psyker) |
| `spellSlots` | `Record<level, { total, used }>` | |
| `featIds` | `string[]` | References `Feat.id` |
| `languages` | `string[]` | |
| `proficiencies` | `string[]` | Armor, weapon, tool proficiencies list |

### 40K Tracker Fields

| Field | Range | Notes |
|---|---|---|
| `warpExposure` | 0–10 | GM-facing tracker |
| `warpBar` | 0–20 | Psyker only — fills on power use |
| `corruption` | 0–100 | Hidden from players |
| `faith` | 0–100 | Zealot — hidden from players |
| `currency.thrones` | number | Common currency |
| `currency.melt` | number | Mid-tier currency |
| `currency.aquila` | number | High-value currency |

### Class-Specific Fields

**Augmenticist:**
```ts
augmentSlots?: number
powerCells?: { current: number; max: number }
installedAugmentIds?: string[]
fightingStyle?: string
```

**Gene-Fighter:**
```ts
isInGeneSurge?: boolean
geneSurgesRemaining?: number
geneticInstability?: number
installedModIds?: string[]
```

**Psyker:**
```ts
psykerDiscipline?: PsychicDiscipline    // 'BIO' | 'PYR' | 'TEL' | 'TK' | 'DIV' | 'ALL'
sanctioningStatus?: string
preparedSpellIds?: string[]
```

**All classes (feature use tracking):**
```ts
featureUsesSpent?: Record<string, number>   // slugified feature name → uses spent
lastShortRest?: number                       // Unix timestamp
lastLongRest?: number                        // Unix timestamp
classResourceCurrent?: number
classResourceDiceRemaining?: number
```

### Skill Names

```
acrobatics     animalHandling   arcana         athletics
deception      history          insight        intimidation
investigation  medicine         nature         perception
performance    persuasion       religion       sleightOfHand
stealth        survival         technology     warpControl    xenology
```

---

## Routes & Pages

| Route | Page | Description |
|---|---|---|
| `/auth` | `AuthPage.tsx` | Login / sign-up (unauthenticated) |
| `/` | `Landing.tsx` | Home dashboard with recent characters |
| `/characters` | `Characters.tsx` | Full character roster — open, delete |
| `/create` | `CharacterCreation/index.tsx` | 7-step creation wizard |
| `/sheet` | `CharacterSheetPage.tsx` | Active character sheet |
| `/campaign` | `CampaignPage.tsx` | GM campaign management |

### Character Creation Steps

1. **Species** — race selection with trait preview
2. **Abilities** — point-buy or standard array allocation
3. **Skills** — choose class skill proficiencies
4. **Class** — class + subclass selection with feature preview
5. **Background** — background selection with feature preview
6. **Equipment** — starting equipment choices
7. **Review** — full character summary before creation

---

## Database & Auth

### Authentication

Supabase email/password auth. On sign-up, a `profiles` row is created with `role: 'player' | 'dm'`.

Protected routes redirect to `/auth` if not logged in.

### Persistence

Characters are saved to Supabase automatically via the character store. The `characters` table uses `user_id` for ownership and RLS enforces that users only access their own data. The `class_data` JSONB column bundles all class-specific fields (augments, gene mods, psyker state, etc.) into a single column.

### Key DB Functions

```ts
fetchMyCharacters()                 // load all characters for current user
upsertCharacter(character)          // save/update (insert or replace by id)
fetchCampaignCharacters(campaignId) // DM: load all characters in a campaign
deleteCharacterFromDb(id)           // delete permanently
```
