# Warhammer Chronicles — App Guide

A companion app for Warhammer 40K tabletop RPG sessions. Manage characters, browse the rules compendium, and run campaigns — all in one place.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Landing Page](#2-landing-page)
3. [Character Creation](#3-character-creation)
4. [Character Sheet](#4-character-sheet)
5. [Class-Specific Tabs](#5-class-specific-tabs)
6. [Dice System](#6-dice-system)
7. [Rest & Recovery](#7-rest--recovery)
8. [Level Up](#8-level-up)
9. [Compendium](#9-compendium)
10. [Campaign System](#10-campaign-system)
11. [Module System](#11-module-system)

---

## 1. Getting Started

### Sign Up / Sign In
Navigate to `/auth`. Create an account with an email and password. Your display name and **role** are set here:

| Role | Capabilities |
|---|---|
| **Player** | Create characters, join campaigns, view your character data |
| **DM** | All player capabilities + create campaigns, view all characters in a campaign |

Your role determines what you see in the Campaign page and cannot be changed after account creation without contacting the app admin.

---

## 2. Landing Page

The landing page is your home base.

**Sidebar navigation:**
| Link | Description |
|---|---|
| Characters | List all your characters |
| Create | Start character creation wizard |
| Campaign | Manage or join campaigns |
| Compendium | Browse all game content |
| Modules | Load custom homebrew modules |

**Character list** — click any character card to open their full sheet. The card shows level, class, race, and current wounds (HP).

**Compendium preview** — four recent items from the registry; click any to go to the full Compendium.

**Account button** (top of sidebar) — shows your display name and role. Click to open Account Settings where you can sign out.

---

## 3. Character Creation

A 7-step wizard that walks you through building a new character. Progress is tracked at the top of each screen.

### Steps

| Step | What you do |
|---|---|
| **Species** | Pick your race. Shows ability score increases, traits, and drawbacks. Advanced species require GM approval. |
| **Class** | Pick your class. Shows hit die, primary abilities, and a subclass (regiment, archetype, etc.) |
| **Background** | Pick your background. Grants two skill proficiencies, tool proficiencies or languages, starting equipment, and a background feature. |
| **Ability Scores** | Distribute points across STR, DEX, CON, INT, WIS, CHA using the point-buy system. Racial bonuses are applied on top. |
| **Skills** | Choose your class skill proficiencies from the allowed list. Background skills are already selected. |
| **Equipment** | Choose a starting equipment package. Items are added directly to your inventory. |
| **Review** | Final summary. Confirm to create the character and open the sheet. |

---

## 4. Character Sheet

The sheet is divided into four zones: the **top bar**, **left column**, **skill list**, and **content tabs**.

### Top Bar

**Identity header** — editable character name, level display, race / class / subclass. Level Up and Level Down buttons.

**Ability Scores** (6 boxes: STR / DEX / CON / INT / WIS / CHA)
- The large number is your **modifier**; the smaller number below is your **score**
- **Left-click the modifier** → roll an ability check
- **Right-click the modifier** → choose Normal / Advantage / Disadvantage before rolling
- Click the score to edit it directly

**HP Section**
- Current / Max / Temporary HP — all editable
- Type a number in the input and press + (heal) or − (damage)
- 🌙 Short Rest / ☀ Long Rest buttons open the rest dialog
- HP bar changes colour: green → yellow → red as HP drops

**Combat Stats** (6 boxes)
| Box | Notes |
|---|---|
| **Proficiency Bonus** | Auto-calculated from level |
| **Speed** | Editable (feet) |
| **Initiative** | Left-click to roll; right-click for advantage/disadvantage |
| **AC** | Auto-computed from equipped armour + DEX (capped by armour type) + tier bonuses |
| **Inspiration** | Click the ★ to toggle |

**Death Saves** — visible in the top bar and in the Extras tab. Three circles for successes (green) and three for failures (red). Click to toggle.

---

### Left Column

**Saving Throws**
- Click the dot next to each ability to toggle proficiency
- Click anywhere on the row to roll that saving throw (right-click for advantage/disadvantage)
- Proficient saves include your proficiency bonus

**Passive Senses**
- Passive Perception, Investigation, and Insight — auto-calculated, read-only

**Proficiencies & Languages**
- Badges showing all armour, weapon, tool proficiencies, and languages
- Languages can be edited directly on the Background tab

**Tracker Panel** — class-specific resources shown here:
| Resource | Shown for |
|---|---|
| Currency (Thrones / Melt / Aquila) | All characters |
| Warp Bar | Psyker |
| Augment Slots | Augmenticist |
| Power Cells | Augmenticist (when configured) |

---

### Skill List

20 skills, sorted alphabetically, each tied to an ability score.

- **Proficiency dot** (left) — click to toggle proficiency on/off
- **Modifier + name + bonus** (right) — left-click to roll; **right-click for advantage/disadvantage**
- Proficient skills show the skill name in full weight

---

### Actions Tab

Lists every action available to your character: weapon attacks, class features with action costs, and limited-use abilities.

**Filter bar:** ALL · ATTACK · ACTION · BONUS ACTION · REACTION · OTHER · LIMITED USE

**Each action row shows:**
- Name and type badges (tier badge, action type, uses remaining)
- Click to expand: full description
- For weapons: To Hit bonus, **clickable damage dice** (click to roll damage), range, attack ability, properties with tooltips
- For limited-use features: a USE button to spend a use; badge shows X / Y Short Rest or Long Rest

**Tier bonuses** — the tier badge (Master-Crafted, Artificer, Relic, Heroic) shows a tooltip with exact attack and damage bonuses when hovered.

**Property tooltips** — dotted-underlined properties (e.g. *Finesse*, *Heavy*, *Overcharge*) show a rule description on hover.

---

### Inventory Tab

All items the character is carrying, grouped by type.

**Each item row:**
- Name + tier badge
- Quantity (editable number field)
- Weight (shown in total at the bottom)
- EQ checkbox — equip/unequip (equipped armour affects AC)
- × button — remove item

**Expand a row** to see: description, properties (with tooltips), rolled traits (if upgraded), and item abilities.

**+ BROWSE ITEMS** button — opens a searchable modal with every item in the compendium. Click Add to put it in your inventory.

**Upgrading items** — hover an item row to reveal an UPGRADE button. Upgrading:
1. Rolls a d6 on the trait table for that weapon tier
2. Shows the result with a confirm/reroll dialog
3. Applies the new tier override and rolled trait to the item

---

### Features Tab

Features are class-specific — see [Class-Specific Tabs](#5-class-specific-tabs) for Psyker, Augmenticist, Gene-Fighter, and Zealot.

For standard classes, features are grouped by level:
- **BASE** features are core class features
- **CORE / MAIN** features come from your subclass
- **OPTION** features are choices made during level-up

Limited-use features show use pips and a USE button. Pips reset on rest.

**ENHANCE** features (gold ⬆ badge) replace a previous feature — the old version is shown as upgraded.

---

### Background Tab

- Background name and full description
- Feature card with the background's mechanical benefit
- Proficiency & Language badges
- **Editable fields**: Personality Traits, Ideals, Bonds, Flaws — each shows suggestions from your background to help you fill them in. Changes save automatically after 500 ms.

---

### Notes Tab

A freeform text area for anything: session notes, lore, reminders. Auto-saves with a 500 ms debounce.

---

### Extras Tab

Six sections:

| Section | Description |
|---|---|
| **Death Saves** | Three success (green) and three failure (red) circles; click to toggle |
| **Hit Dice** | Shows available / total hit dice; click the die to roll and recover HP; Use/Recover buttons to manually adjust |
| **Rest History** | Timestamps of your last short and long rest |
| **Languages** | Read-only list of known languages |
| **Feats** | All acquired feats with expandable descriptions; 40K-specific feats marked with a badge |
| **Currency** | Thrones, Melt, Aquila — mirrors the tracker panel |

---

## 5. Class-Specific Tabs

### Warp Disciplines (Psyker)

Replaces the standard Features tab.

**Warp Bar** — tracks accumulated warp energy. Fills as you cast. Resets after Perils. Turns amber at 75%, red at 100%. Max is 20 (25 at level ≥ 10). Use +/− buttons or click RESET after rolling on the Perils table.

**Power Slots** — pip trackers per slot level (1st–6th). Click a pip to mark it used or available.

**Always Prepared** — powers your discipline grants automatically; cannot be removed.

**Prepared** — powers you have chosen to prepare. Preparation limit = level + INT or WIS modifier (whichever is higher).

**Cast buttons** — for prepared non-cantrip powers: ordinal buttons (1st, 2nd…) choose which slot level to expend. Casting:
- Marks the slot as used
- Increments the Warp Bar by `warpCost` (shown as +N⚡ on the power row); defaults to `level + 1`

**Cantrips** — prepared cantrips show a CAST button that costs 1 warp (no slot consumed).

**Discipline filter** — ALL / BIO / PYR / TEL / DIV to browse powers by school.

---

### Augment Loadout (Augmenticist)

**Augment Slots** — bar showing slots used / max. Multi-Weapon System augment grants +3 slots if installed.

**Power Cells** — pip tracker showing current / max cells. Click a pip or use +/− to adjust. Recharges on long rest.

**Installed** — list of active augments. Augments with limited uses show pip trackers.

**Universal / Specialization pools** — browse and install augments. Filter by MINOR / MAJOR / EXTREME. Slot cost shown as 1–3 pips.

---

### Gene Modifications (Gene-Fighter)

**Genetic Stability** — bar showing stability points used / max (CON modifier + proficiency bonus × 2).

- If used > max: warning shows penalty amount
- Free slots = max − used; this is the modifier on your Stability Check

**Gene-Surge toggle** — click GENE-SURGE to activate. Active state shows "🧬 SURGING". When surging, each mod's *During Gene-Surge* effect is active.

**🎲 STABILITY CHECK button** — rolls d20 + free stability slots modifier. Result appears in dice history.

**Over-threshold installs** — Gene-Fighters can install mods beyond their stability threshold (unique to this class). The stability warning updates the check penalty; no hard block.

**Installed / Base / Archetype Exclusive** — same filter/install/remove pattern as the Loadout tab.

---

### Prayers (Zealot)

Follows the same pattern as Warp Disciplines but uses Prayer Slots and gold/radiant theming. No Warp Bar. Preparation limit = level ÷ 2 + CHA modifier.

---

## 6. Dice System

### How rolls work

| Roll Type | Triggered by |
|---|---|
| Ability Check | Click an ability modifier in the top bar |
| Skill Check | Click a skill row in the skill list |
| Saving Throw | Click a saving throw row in the left column |
| Initiative | Click the Initiative box |
| Attack | Click the attack row in the Actions tab |
| Damage | Click the damage dice in the Actions tab |
| Hit Die | Click the die button in the Extras tab |

### Advantage / Disadvantage

**Right-click** any rollable element to open the roll mode menu:

| Option | Effect |
|---|---|
| Normal | Standard d20 roll |
| Advantage ⬆ | Roll 2d20, take the higher result |
| Disadvantage ⬇ | Roll 2d20, take the lower result |

Both dice values are stored in history so you can verify the result.

### Roll display

- **Toast notification** — appears bottom-right after every roll, shows total and label. Auto-dismisses after 5 seconds. Nat 20 shows an amber highlight; Nat 1 shows red.
- **History panel** — click the 🎲 icon in the sheet toolbar to open the full history (last 100 rolls). Shows dice expression, all individual rolls, modifier breakdown, and timestamp.

---

## 7. Rest & Recovery

Open the rest dialog with the 🌙 (Short) or ☀ (Long) buttons in the top bar.

### Short Rest
- Recover up to **half your level** (rounded down) in hit dice
- Short-rest features reset (uses refilled)
- Records the timestamp of the rest

### Long Rest
- Restore **all HP** to maximum
- All hit dice restored
- All spell / prayer / power slots restored
- All features (short and long rest) reset
- Records the timestamp of the rest

---

## 8. Level Up

Click **LEVEL UP ↑** in the top bar (available while level < 10). A side panel opens with a step wizard.

### Steps

**Summary** — shows what you gain: new features, HP formula, proficiency bonus change, and any choices required.

**HP** — choose Roll (1d{hit die} + CON modifier) or Take Average (floor(hit die / 2) + 1 + CON modifier). Minimum gain is 1.

**ASI** *(at levels 4, 8, 10)* — choose between:
- Distribute 2 ability score points (max +2 to one score, or +1 to two scores; cap 20)
- Choose a feat from the available list (filtered by class/race prerequisites)

**Features** *(if options exist at this level)* — select from option groups. Multiple groups appear as separate "Choose One" sections. ENHANCE options upgrade an existing feature.

**Confirm** — review all changes. Click "Confirm Level Up" to apply. You can then chain directly into the next level.

---

## 9. Compendium

Navigate to **Compendium** in the sidebar. Four tabs:

### Items
- **Search** by name
- **Filter** by type (weapon / armor / gear / consumable / tool / magical), tier, and category
- Click any item card to expand: full description, properties with rule tooltips, item abilities
- Tier badge tooltip shows exact attack/damage bonuses

### Classes
- One card per class: hit die, primary abilities, saving throws, proficiency tags
- Subclass list with names
- Level 1 feature preview (expandable)

### Species
- One card per race: ability score bonuses as badges, speed, size
- Traits and drawbacks (expandable descriptions)

### Backgrounds
- One card per background: skill proficiency badges, feature card, equipment list
- Special backgrounds (GM approval required) marked with a badge

---

## 10. Campaign System

### For DMs

1. Go to **Campaign** in the sidebar
2. Click **CREATE** with a campaign name
3. Expand the campaign row to see the invite code and **COPY LINK** button
4. Share the link with your players — they click it to join automatically
5. Expand the campaign to see **Members** (with roles) and **Characters** (names, levels, HP)

### For Players

**Via invite link** — click the link the DM shared. If you're not logged in, you'll be redirected to the login page and then back to the join page automatically after signing in.

**Via invite code** — go to Campaign in the sidebar, enter the invite code in the input field, and click JOIN.

---

## 11. Module System

Modules let you load custom homebrew content (new items, classes, species, backgrounds, powers, etc.) without any server changes. All content is loaded client-side and merges with the core ruleset.

### Loading a module

1. Go to **Modules** in the sidebar
2. Drag and drop a `.json` file onto the upload zone, or click it to browse
3. The module appears in the Loaded Modules list immediately
4. All its content becomes available in the Compendium, character creation, and item browser

### Unloading a module

Click **UNLOAD** on any module row. The core Warhammer module (`warhammer-core`) cannot be unloaded — it shows a locked badge.

### Module format

Modules are plain JSON files. See the **Module Template** (ask for `MODULE_TEMPLATE.json`) for the full annotated schema covering items, weapons, armour, consumables, spells/powers, classes, species, backgrounds, feats, and NPCs.

### Important notes

- Modules are loaded in memory only — they reset on page refresh
- Module IDs must be unique; loading a module with an existing ID will overwrite it
- The core module's content is always available regardless of what else is loaded
