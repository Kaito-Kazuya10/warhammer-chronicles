// ─── Ability Scores ───────────────────────────────────────────────────────────

export type AbilityScore =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'

// ─── Skill Names ─────────────────────────────────────────────────────────────
// Note: 'arcana' is deprecated — replaced by xenology/technology.
// Kept for backwards compatibility. Hidden in UI, removed in future cleanup.

export type SkillName =
  | 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics'
  | 'deception' | 'history' | 'insight' | 'intimidation'
  | 'investigation' | 'medicine' | 'nature' | 'perception'
  | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand'
  | 'stealth' | 'survival' | 'xenology' | 'technology' | 'warpControl'

// ─── Action Type ─────────────────────────────────────────────────────────────

export type ActionType =
  | 'action'        // costs your action
  | 'bonus-action'  // costs bonus action
  | 'reaction'      // triggered reaction
  | 'free'          // no action cost (once-per-turn triggers, etc.)
  | 'passive'       // always on, no activation
  | 'special'       // conditional trigger ("when reduced to 0 HP")

// Alias — used throughout the codebase; keep for backwards compatibility
export type FeatureActionType = ActionType

// ─── Rest Type ────────────────────────────────────────────────────────────────

export type RestType = 'short' | 'long' | 'at-will' | 'per-encounter' | 'special'

// ─── Scaling Value ────────────────────────────────────────────────────────────
// Formula strings resolved at runtime from character stats.
// Supported tokens: "proficiency", "strength", "dexterity", "constitution",
// "intelligence", "wisdom", "charisma", "8 + proficiency + wisdom", "3"

export type ScalingValue = string

// ─── Damage Type ─────────────────────────────────────────────────────────────

export type DamageType =
  | 'bludgeoning' | 'piercing' | 'slashing'
  | 'fire' | 'lightning' | 'force'
  | 'radiant' | 'necrotic' | 'psychic'
  | 'poison' | 'acid' | 'energy'

// ─── Psychic Discipline ───────────────────────────────────────────────────────
// BIO = Biomancy  PYR = Pyromancy  TEL = Telepathy
// TK  = Telekinesis  DIV = Divination  ALL = Universal

export type PsychicDiscipline = 'BIO' | 'PYR' | 'TEL' | 'TK' | 'DIV' | 'ALL'

// ─── Gene-Mod Tier ────────────────────────────────────────────────────────────

export type GeneModTier = 'minor' | 'major' | 'extreme'

// ─── Item Enums ───────────────────────────────────────────────────────────────

export type ItemTier =
  | 'standard'
  | 'master-crafted'
  | 'artificer'
  | 'relic'
  | 'heroic'

export type WeaponCategory = 'simple' | 'martial' | 'heavy' | 'exotic'

export type WeaponRangeType = 'melee' | 'ranged' | 'thrown'

export type AmmoType =
  | 'pack'       // session-based — start with ammoCapacity packs; natural 1 expends one pack
  | 'shot'       // individual tracking — ammoCapacity is total shots before empty
  | 'belt'       // per-attack tracking — ammoCapacity is total shots, each attack uses 1
  | 'unlimited'  // no tracking needed (slings, throwing knives)

export type ItemType =
  | 'weapon'
  | 'armor'
  | 'gear'
  | 'tool'
  | 'consumable'
  | 'augment'
  | 'magical'
  | 'currency'

export type AugmentCategory =
  | 'cranial'   // brain implants, cogitator uplinks
  | 'ocular'    // cybernetic eyes, targeting arrays
  | 'limb'      // servo-arms, mechadendrites, bionic legs
  | 'torso'     // subdermal plating, reactor core
  | 'organ'     // filtration organs, secondary heart
  | 'dermal'    // synthskin, refractor field emitters
  | 'utility'   // external tools, interface ports

// ─── Spell ────────────────────────────────────────────────────────────────────

export interface Spell {
  id: string
  name: string
  level: number           // 0 = cantrip
  school: string
  castingTime: string     // "1 action", "1 bonus action", "1 reaction"
  range: string
  components: string[]
  duration: string
  description: string
  higherLevels?: string
  tags?: string[]

  // ── Psyker / Warp ──────────────────────────────────────────────────────────
  warpCost?: number                   // Warp Bar points spent when cast
  perilsRisk?: boolean                // whether this power pushes toward Perils of the Warp
  discipline?: PsychicDiscipline      // 'BIO' | 'PYR' | 'TEL' | 'TK' | 'DIV' | 'ALL'
  disciplineEnhanced?: string         // enhanced effect for matching discipline Psyker
  warpPointsGenerated?: number        // Warp Bar fill on cast. Default: level + 1
  isRitual?: boolean
  alwaysPrepared?: boolean            // always prepared for matching discipline Psykers

  // ── Source ─────────────────────────────────────────────────────────────────
  spellSource?: 'psyker' | 'prayer' | 'tech-prayer'
  // 'psyker'      → warp-themed, shows Warp Points
  // 'prayer'      → gold/radiant-themed, uses prayer slots
  // 'tech-prayer' → Tech-Priest (future)
  // Defaults to 'psyker' for backwards compatibility
}

// ─── Item ─────────────────────────────────────────────────────────────────────

export interface ItemAbility {
  name: string
  description: string
  actionType?: ActionType
  usesPerRest?: RestType
  usesCount?: ScalingValue            // "1", "proficiency", "wisdom"
  damageBonus?: string                // "1d6 fire", "2d8 radiant"
  saveDC?: ScalingValue               // "8 + proficiency + strength"
  saveAbility?: AbilityScore
  condition?: string                  // "frightened", "poisoned", "prone"
  requiresAttunement?: boolean
}

export interface Item {
  id: string
  name: string
  type: ItemType
  weight?: number
  cost?: string                       // "75 Thrones", "2 Melt", "Priceless"
  description: string
  properties?: string[]               // "finesse", "two-handed", "light", "heavy"
  damage?: string                     // "1d8", "2d6"
  damageType?: string
  armorClass?: number
  requiresAttunement?: boolean
  tags?: string[]

  // ── Tier System ────────────────────────────────────────────────────────────
  tier?: ItemTier                     // defaults to 'standard'
  isNamed?: boolean                   // named item — no trait table stacking
  lore?: string                       // flavor/backstory for named items
  bonusAttack?: number                // +1/+2/+3 to attack rolls
  bonusDamage?: number                // +1 flat damage bonus (MC named items)
  bonusDamageDice?: string            // '+1d6', '+2d4', '+2d6' — named items at Artificer/Relic/Heroic
  bonusAC?: number                    // flat AC bonus beyond base

  // ── Item Abilities / Traits ────────────────────────────────────────────────
  itemAbilities?: ItemAbility[]

  // ── Weapon Fields ──────────────────────────────────────────────────────────
  weaponCategory?: WeaponCategory     // 'simple' | 'martial' | 'heavy' | 'exotic'
  rangeType?: WeaponRangeType         // 'melee' | 'ranged' | 'thrown'
  range?: { normal: number; long?: number }
  attackAbility?: AbilityScore | 'finesse'
  versatileDamage?: string            // two-handed damage: "1d10"
  ammoType?: AmmoType                 // undefined = no tracker shown
  ammoCapacity?: number               // packs per session (pack) OR total shots (shot/belt)
  ammoName?: string                   // "Power Pack", "Bolt Magazine", "Plasma Flask"
  rechargeable?: boolean              // can recharge during long rest (las weapons, tau cells)

  // ── Armor Fields ───────────────────────────────────────────────────────────
  armorType?: 'light' | 'medium' | 'heavy' | 'shield'
  maxDexBonus?: number                // medium: 2, heavy: 0, light: not set
  stealthDisadvantage?: boolean
  strengthRequirement?: number        // min STR to avoid speed penalty
  equipmentSlot?: 'body' | 'shield' | 'helmet' | 'cloak-backpack' | 'accessory' | 'clothing'

  // ── Augment Fields (type: 'augment') ───────────────────────────────────────
  augmentSlotCost?: number            // 1 (minor), 2 (major), 3 (extreme)
  augmentCategory?: AugmentCategory
  augmentTier?: 'minor' | 'major' | 'extreme'
  requiresPowerCells?: boolean
  augmentSideEffect?: string          // mechanical downside of installation
  swappable?: boolean                 // defaults true; false = permanent installation

  // ── Consumable Fields (type: 'consumable') ────────────────────────────────
  consumableActionType?: ActionType   // action cost to use
  consumableCharges?: number          // uses before consumed; defaults 1
  consumableEffect?: string           // human-readable mechanical effect
  consumableRange?: string            // "60 feet", "Touch", "Self"
  consumableAreaOfEffect?: string     // "20-foot radius sphere", "15-foot cone"
  consumableSaveDC?: ScalingValue     // "8 + proficiency + dexterity" or "14"
  consumableSaveAbility?: AbilityScore
  consumableDamage?: string           // "3d6", "2d6"
  consumableDamageType?: DamageType

  // ── Addiction / Post-Use Fields ──────────────────────────────────────────────
  addictionDC?: number                // CON save DC at next long rest; failure = addiction
  postUseSaveDC?: number              // immediate save DC after use
  postUseSaveAbility?: AbilityScore   // ability for the post-use save
  postUseFailureEffect?: string       // human-readable consequence on failed save

  // ── Use Restriction ─────────────────────────────────────────────────────────
  restrictedToClasses?: string[]      // class IDs allowed to use; undefined = all
}

// ─── Armor Set ────────────────────────────────────────────────────────────────

export interface ArmorSet {
  id: string
  name: string
  tier?: ItemTier
  isNamed?: boolean
  description: string
  pieces: string[]              // item IDs of required pieces
  setBonus: ItemAbility
  totalCost: string
  tags?: string[]
}

// ─── Race ─────────────────────────────────────────────────────────────────────

export interface RacialTrait {
  name: string
  description: string
}

export interface Race {
  id: string
  name: string
  description: string
  abilityScoreIncreases: Partial<Record<AbilityScore, number>>
  abilityScoreChoices?: { choose: number; amount: number }
  speed: number
  size: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'
  tier?: 'standard' | 'advanced' | 'restricted'
  traits: RacialTrait[]
  drawbacks?: RacialTrait[]           // styled differently in UI
  languages: string[]
  tags?: string[]
  incompatibleClasses?: string[]
}

// ─── Class ────────────────────────────────────────────────────────────────────

export interface ClassFeature {
  level: number
  name: string
  description: string
  actionType?: ActionType
  usesPerRest?: RestType
  usesCount?: ScalingValue            // "1", "proficiency", "wisdom"
  featureType?: 'core' | 'main' | 'option' | 'base'
  // 'base'   → base class feature (not subclass)
  // 'core'   → always-on subclass feature at that tier
  // 'main'   → additional subclass feature at that tier
  // 'option' → one of the A/B/C/D choices
  optionGroup?: string                // mutually exclusive group key, e.g. "cadian-level-3"
  sourceFeature?: string              // for "Enhance" options: feature being upgraded
  tags?: string[]                     // 'attack', 'healing', 'movement', 'defensive', etc.

  // Legacy — kept for backwards compatibility with existing UI
  usesMax?: number
}

export interface ClassResource {
  name: string                        // "Technique Dice", "Warp Bar", "Stability"
  type: 'pool' | 'bar' | 'dice'
  // pool: numbered uses (3/3 Channel Divinity)
  // bar:  0-to-max scale (Warp Bar 0–20)
  // dice: dice pool (4d8 Technique Dice)
  maxFormula?: string                 // "proficiency bonus", "20", "See class table"
  diceType?: string                   // for type 'dice': "d8", "d10"
  resetOn?: RestType
  playerVisible: boolean              // Warp Bar = true, Corruption = false
  description?: string
}

export interface Subclass {
  id: string
  name: string
  description: string
  unlockLevel: number
  features: ClassFeature[]
  flavorQuote?: string                // "Cadia stands!..."
  identity?: string                   // Short role summary for card display
  recommendedFightingStyle?: string[]
  recommendedAbilities?: string       // "DEX > WIS > CON"
}

export interface CharacterClass {
  id: string
  name: string
  description: string
  hitDie: number
  primaryAbility: AbilityScore[]
  savingThrows: AbilityScore[]        // exactly 2
  skillChoices: string[]
  numSkillChoices: number
  armorProficiencies?: string[]
  weaponProficiencies?: string[]
  toolProficiencies?: string[]
  startingEquipmentOptions?: string[]
  /** Maps each option index to real item IDs for inventory resolution.
   *  Keys are the index in startingEquipmentOptions.
   *  `a`/`b`/`c` hold item IDs for each choice; `grant` holds auto-granted IDs. */
  startingEquipmentResolved?: Record<number, {
    a?: string[]
    b?: string[]
    c?: string[]
    grant?: string[]
  }>
  features: ClassFeature[]
  subclasses?: Subclass[]
  tags?: string[]

  featureTabName?: string
  // Tab label override:
  //   Imperial Guardsman → "Regimental Doctrine"
  //   Gene-Fighter       → "Bio Modifications"
  //   Augmenticist       → "Augment Loadout"
  //   Psyker             → "Warp Disciplines"
  // Falls back to "Features & Traits" if not set.

  subclassLabel?: string
  // "Regiment", "Martial Archetype", "Temple", "Discipline", "Holy Order"
  // Used in creation wizard: "Choose Your [subclassLabel]"
  // Falls back to "Specialization" if not set.

  classResource?: ClassResource       // unique resource pool for this class, if any

  startingWealthFormula?: string      // "5d4 × 10 Thrones"
}

// ─── Background ───────────────────────────────────────────────────────────────

export interface Background {
  id: string
  name: string
  description: string
  skillProficiencies: SkillName[]     // always exactly 2
  toolProficiencies?: string[]
  languages?: string[]
  languageChoices?: number
  startingEquipment: string[]
  feature: { name: string; description: string }
  suggestedPersonalityTraits?: string[]
  suggestedIdeals?: string[]
  suggestedBonds?: string[]
  suggestedFlaws?: string[]
  special?: boolean                   // restricted — requires GM approval
  tags?: string[]
}

// ─── Feat ─────────────────────────────────────────────────────────────────────

export interface Feat {
  id: string
  name: string
  prerequisite?: string
  prerequisiteClass?: string          // references CharacterClass.id
  prerequisiteRace?: string           // references Race.id
  description: string
  abilityScoreIncreases?: Partial<Record<AbilityScore, number>>
  source?: 'standard' | 'warhammer'
  tags?: string[]
  actionType?: ActionType
  usesPerRest?: RestType
  usesCount?: ScalingValue
}

// ─── Augmenticist: Augments ───────────────────────────────────────────────────

export interface Augment {
  id: string
  name: string
  description: string
  slotCost: 1 | 2 | 3
  category: 'minor' | 'major' | 'extreme'
  specialization?: string        // subclass id, e.g. 'tech-integrator'; undefined = universal
  isWeapon?: boolean
  weaponProperties?: string[]
  powerCellCost?: number
  actionType?: FeatureActionType
  usesPerRest?: 'short' | 'long'
  usesCount?: string             // ScalingValue format: 'proficiency', 'wisdom', '1', etc.
  tags?: string[]
}

// ─── Gene-Fighter: Gene Modifications ────────────────────────────────────────

export interface GeneModification {
  id: string
  name: string
  tier: GeneModTier                   // 'minor' | 'major' | 'extreme'
  stabilityCost: number               // 1, 2, or 3
  description: string
  passiveEffect: string               // always-on effect
  geneSurgeEffect: string             // enhanced effect during Gene-Surge
  sideEffect?: string                 // mechanical cost (null for minor mods)
  passiveActionType?: ActionType
  surgeActionType?: ActionType
  surgeUsesPerRest?: RestType
  surgeUsesCount?: ScalingValue
  category?: string                   // 'physical', 'sensory', 'metabolic', 'defensive', 'offensive'
  prerequisite?: string
  archetype?: string                  // subclass-exclusive: 'berserker', 'apex-predator', etc.
  tags?: string[]
}

// ─── Officer: Commands ────────────────────────────────────────────────────────

export type CommandTier = 'tier-1' | 'tier-2' | 'tier-3'

export interface Command {
  id: string
  name: string                        // "HOLD THE LINE!", "TOTAL ASSAULT!"
  tier: CommandTier
  commandDiceCost: number             // 1, 2, or 3 Command Dice
  actionType: ActionType
  range: string                       // "30-foot radius", "One ally within 60 feet"
  duration: string                    // "1 minute (concentration)", "Until end of next turn"
  buff: string                        // the benefit allies receive
  cost: string                        // the tactical trade-off (ALWAYS present)
  description?: string                // optional flavor text
  concentration?: boolean
  exclusive?: string                  // subclass-exclusive (null = universal)
  tags?: string[]
}

// ─── Desperado: Dirty Tricks ──────────────────────────────────────────────────

export type TrickTier = 'petty' | 'vicious' | 'heinous'

export interface Trick {
  id: string
  name: string                        // "Pocket Sand", "Nerve Strike", "Hostage Tactics"
  tier: TrickTier
  actionType: ActionType
  description: string
  saveDC?: ScalingValue               // "8 + proficiency + dexterity"
  saveAbility?: AbilityScore
  damage?: string                     // "2d6 poison", "1d6 weapon"
  condition?: string                  // "blinded", "frightened", "prone"
  duration?: string                   // "until end of next turn", "1 minute"
  costsTrickUse?: boolean             // most cost 1 use; defaults true
  tags?: string[]
}

// ─── NPC / Monster ────────────────────────────────────────────────────────────

export type NPCType = 'monster' | 'npc' | 'boss' | 'minion' | 'ally'

export interface NPCAction {
  name: string
  description: string
  attackBonus?: number
  damage?: string
  damageType?: string
}

export interface NPC {
  id: string
  name: string
  type: NPCType
  size: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'
  alignment?: string
  armorClass: number
  hitPoints: string
  speed: number
  abilityScores: Record<AbilityScore, number>
  savingThrows?: Partial<Record<AbilityScore, number>>
  skills?: Record<string, number>
  damageResistances?: string[]
  damageImmunities?: string[]
  conditionImmunities?: string[]
  senses?: string[]
  languages?: string[]
  challengeRating: number
  xp?: number
  traits?: { name: string; description: string }[]
  actions?: NPCAction[]
  legendaryActions?: NPCAction[]
  description?: string
  tags?: string[]
}

// ─── Module Container ─────────────────────────────────────────────────────────

export type ModuleContentType =
  | 'spells' | 'items' | 'races' | 'classes'
  | 'feats' | 'npcs' | 'backgrounds'
  | 'augments' | 'geneModifications' | 'commands' | 'tricks'

export interface ModuleContent {
  races?: Race[]
  classes?: CharacterClass[]
  backgrounds?: Background[]
  spells?: Spell[]
  items?: Item[]
  feats?: Feat[]
  npcs?: NPC[]
  augments?: Augment[]
  geneModifications?: GeneModification[]
  commands?: Command[]
  tricks?: Trick[]
}

export interface WarhamerModule {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  content: ModuleContent
}
