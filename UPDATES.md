# Warhammer Chronicles — Update Log

All notable changes to the app, most recent first.

---

## Session 3 — Character Sheet Polish & Class Systems

### Advantage / Disadvantage Rolls
- **Right-click** any ability modifier, skill row, or initiative box to open a roll mode context menu
- Options: Normal / Advantage (2d20 keep highest) / Disadvantage (2d20 keep lowest)
- Both dice values are recorded in roll history; pressing Escape or clicking outside dismisses the menu

### Gene-Fighter Improvements
- **Gene-Surge toggle** — activate/deactivate Gene-Surge directly from the Gene Modifications tab; active state shown with a green "🧬 SURGING" badge
- **Gene Stability Check button** — rolls d20 with a modifier equal to your free stability slots (positive = bonus, zero = at limit, negative = over threshold); result goes to dice history with full breakdown
- **Over-threshold installs now allowed** — Gene-Fighters are the only class that can install modifications beyond their stability threshold. The install button is no longer blocked; the stability warning tells you the check penalty instead

### Augmenticist Power Cells
- Power Cell tracker added to the Augment Loadout tab
- Displays as pip-style cells with +/− buttons; reads from `powerCells { current, max }` on the character
- Recharges on long rest; only visible when a class sets a power cell maximum

### Level Up — Feature Choice Fixes
- Option-type features from the **base class** are now correctly presented as choices (previously only subclass options were shown)
- Automatic feature cards no longer include option-type features (they were showing as free grants when they require a decision)
- **Multiple option groups** at the same level are now handled independently — each group gets its own "Choose One" section with a separate selection
- Summary and confirm steps updated to reflect all choices made

---

## Session 2 — New Pages & Interactivity

### Module System UI (`/modules`)
- New page for managing homebrew content modules
- Drag-and-drop or click-to-browse JSON file upload using the existing `loadModuleFromFile()` registry function
- Loaded modules list shows name, version, author, id, and description
- Unload button per module; the core Warhammer module is locked with a "🔒 core" badge
- Inline success/error feedback on upload
- "Modules" nav item on the landing page is now enabled

### Psyker — Cast Button & Warp Bar Integration
- Cast buttons for prepared spells now increment the Warp Bar by `warpCost` (or `level + 1` if not set) in the same update as the slot consumption — no race conditions
- **Cantrips** now have a CAST button that costs 1 warp point (no slot consumed)
- Warp maximum is now dynamic: 20 normally, 25 at character level ≥ 10

### Compendium (`/compendium`)
- Full read-only compendium page with four tabs: **Items**, **Classes**, **Species**, **Backgrounds**
- Items tab: search by name, filter by type (weapon/armor/gear/consumable/tool/magical), tier (standard through heroic), and category (simple/martial/heavy/exotic)
- Expandable item cards with property tooltips, descriptions, and item abilities
- Classes tab: hit die badge, primary abilities, saving throws, proficiency tags, subclass list, level 1 feature preview
- Species tab: ability score bonuses, speed, size, traits and drawbacks
- Backgrounds tab: skill proficiencies, feature card, equipment list
- "Compendium" nav item on the landing page is now enabled; landing page shows four live items from the registry as a preview

### Campaign Invite Links
- DM "COPY LINK" button now copies a full `{origin}/join/{code}` URL instead of just the raw code
- New `/join/:code` page auto-joins the campaign on load; shows joining / success / already-a-member / error states
- `ProtectedRoute` now preserves the intended path as `?redirect=` so unauthenticated players who click an invite link are sent back to the join page after logging in

### Clickable Dice
- **Damage dice** in the Actions tab (desktop table and mobile cards) are now buttons — clicking rolls damage and sends it to the dice toast and history
- **Hit die** in the Extras tab is now a button — clicking rolls the hit die and adds it to history
- Both respect tier bonuses and ability modifiers in the roll breakdown

### Property Tooltips
- **Weapon properties** in the Actions tab (Notes column, desktop; Properties row, mobile) show dotted-underline tooltips with rule descriptions on hover
- **Tier badges** in the Actions tab show a tooltip with the tier's attack and damage bonuses
- **Property badges** in the Inventory tab expanded view show the same rule descriptions

---

## Session 1 — Initial Build

### Authentication
- Email/password sign-up and sign-in via Supabase Auth
- Display name and role (player / DM) stored in user profile
- Protected routes redirect to `/auth`; all character data is user-scoped

### Character Creation Wizard
- 7-step wizard: Species → Class → Background → Ability Scores → Skills → Starting Equipment → Review
- Ability score point-buy allocator
- Class and species card pickers with descriptions and stat previews
- Skill picker respects class skill choices
- Starting equipment options resolved to real item IDs and added to inventory on completion

### Character Sheet
- **Top bar**: editable name, level (with Level Up and Level Down controls), race/class/subclass display, ability scores (click modifier to roll), HP (current/max/temp with heal-damage input), AC (auto-computed from equipped armour), initiative (click to roll), speed, proficiency bonus, inspiration toggle
- **Left column**: saving throw proficiency toggles + click-to-roll, passive senses (Perception/Investigation/Insight), proficiency badges (armor/weapons/tools/languages), tracker panel (currency, Warp Bar for Psyker, augment slots for Augmenticist)
- **Skills list**: 20 skills with proficiency toggle, click-to-roll, ability abbreviation and bonus display
- **Actions tab**: all attacks, spells, features, and limited-use abilities with filter bar; attack and damage rolls; weapon property tooltips; tier bonus badges
- **Inventory tab**: items grouped by type, equipped toggle, quantity, weight, tier upgrade flow with trait rolling, item browser modal, property tooltips
- **Features & Traits tab**: class features grouped by level, limited-use tracking with USE button and rest badges, ENHANCE option support
- **Background tab**: background overview, feature description, skill/tool/language badges, editable personality traits/ideals/bonds/flaws with suggestions
- **Notes tab**: freeform text, 500 ms auto-save
- **Extras tab**: death save circles (click to toggle), hit dice with use/recover/roll, rest timestamps, feats list, languages, currency

### Class-Specific Tabs
- **Warp Disciplines** (Psyker): warp bar with +/− and reset, power slots, always-prepared + chosen-prepared sections, available powers pool with discipline filters
- **Augment Loadout** (Augmenticist): slot budget bar, installed augments with use tracking, universal + specialization augment pools with category filters
- **Gene Modifications** (Gene-Fighter): stability score bar, installed mods list, base + archetype-exclusive pools with tier filters
- **Prayers** (Zealot): prayer slot pips, prepared prayers with preparation limit, available prayer pool

### Rest & Recovery
- **Short Rest**: recover hit dice (up to half level), reset short-rest features, record timestamp
- **Long Rest**: restore full HP, reset all hit dice, all spell/prayer/power slots, all features, record timestamp

### Level Up Wizard
- HP step: roll hit die or take average (both add CON modifier)
- ASI step (levels 4, 8, 10): distribute 2 points across ability scores or choose a feat from a filtered list
- Features step: select from option groups (subclass choices, ENHANCE upgrades)
- Confirm step: summary of all changes before applying
- Can chain multiple level-ups in sequence

### Dice System
- Roll types: ability check, skill check, saving throw, initiative, attack, damage, general
- Floating toast on every roll (auto-dismisses after 5 s); click the dice icon in the top bar to toggle the full history panel
- Nat 20 (amber) and Nat 1 (red) indicators in history
- Roll breakdown shows modifier components (ability mod + proficiency, etc.)

### Campaign System
- DM: create a named campaign; each campaign generates a unique invite code
- Player: join by entering an invite code or clicking an invite link
- Expanded campaign view shows member list with roles; DM sees all characters in the campaign

### Data Persistence
- All character data saved to Supabase with 800 ms debounced writes
- Export character as JSON from the sheet toolbar
- Duplicate character
- Delete character (with confirmation)
