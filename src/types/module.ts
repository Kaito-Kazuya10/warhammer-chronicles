// ─── Ability Scores ───────────────────────────────────────────────────────────

export type AbilityScore =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'

// ─── Skill Names ─────────────────────────────────────────────────────────────
// Defined here (not character.ts) so Background can reference it without
// creating a circular dependency. character.ts re-exports this type.

export type SkillName =
  | 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics'
  | 'deception' | 'history' | 'insight' | 'intimidation'
  | 'investigation' | 'medicine' | 'nature' | 'perception'
  | 'performance' | 'persuasion' | 'religion' | 'sleightOfHand'
  | 'stealth' | 'survival' | 'xenology' | 'technology' | 'warpControl'


// ---- Action Types ---------

export type ActionType = 'Action' | 'Bonus Action' | 'Reaction' | 'Free Action'

// Lowercase kebab-case for programmatic filtering on features/abilities
export type FeatureActionType =
  | 'action'
  | 'bonus-action'
  | 'reaction'
  | 'free'
  | 'passive'
  | 'special'

// ─── Spell ────────────────────────────────────────────────────────────────────

export interface Spell {
  id: string
  name: string
  level: number           // 0 = cantrip
  school: string
  castingTime: string
  range: string
  components: string[]
  duration: string
  description: string
  higherLevels?: string
  // 40K Psyker fields
  warpCost?: number       // Warp Bar points spent when cast
  discipline?: string     // e.g. 'Telepathy', 'Pyromancy', 'Biomancy'
  perilsRisk?: boolean    // whether this power pushes toward Perils of the Warp
  tags?: string[]
}

// ─── Item ─────────────────────────────────────────────────────────────────────
// Note: 40K uses Thrones, Melt, and Aquila as currency — use type: 'currency'
// with the item name set to the denomination. No structural change needed.

export type ItemType = 'weapon' | 'armor' | 'gear' | 'tool' | 'consumable' | 'magical' | 'currency'
export type ItemTier  = 'standard' | 'uncommon' | 'rare' | 'relic' | 'heroic'

export interface ItemAbility {
  name: string
  description: string
  actionType?: FeatureActionType
  usesPerRest?: 'short' | 'long'
  usesMax?: number
}

export interface Item {
  id: string
  name: string
  type: ItemType
  weight?: number
  cost?: string             // free-form, e.g. "50 Thrones", "2 Melt"
  description: string
  properties?: string[]     // e.g. ["finesse", "thrown"]
  damage?: string           // e.g. "1d6"
  damageType?: string
  armorClass?: number
  requiresAttunement?: boolean
  tags?: string[]
  // ── Combat fields ─────────────────────────────────────────────────────────
  rangeType?: 'melee' | 'ranged'
  range?: { normal: number; long?: number }
  attackAbility?: 'strength' | 'dexterity' | 'finesse'
  bonusAttack?: number      // flat bonus to attack roll (e.g. +1 from magical)
  bonusDamage?: number      // flat bonus to damage roll
  tier?: ItemTier           // quality above standard triggers a badge
  itemAbilities?: ItemAbility[]
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
  speed: number
  size: 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargat'
  traits: RacialTrait[]
  languages: string[]
  // New optional fields
  abilityScoreChoices?: { choose: number; amount: number }  // e.g. pick 1 stat to get +1
  drawbacks?: RacialTrait[]                                 // racial penalties, styled separately
  tier?: 'standard' | 'advanced'                           // advanced = requires GM approval
  tags?: string[]
}

// ─── Class ────────────────────────────────────────────────────────────────────

export interface ClassFeature {
  level: number
  name: string
  description: string
  actionType?: FeatureActionType
  usesPerRest?: 'short' | 'long'
  usesMax?: number
  tags?: string[]           // e.g. ['attack'] to surface in the ATTACK filter
}

export interface Subclass {
  id: string
  name: string
  description: string
  unlockLevel: number
  features: ClassFeature[]
}

export interface CharacterClass {
  id: string
  name: string
  description: string
  hitDie: number                  // e.g. 8 for d8
  primaryAbility: AbilityScore[]
  savingThrows: AbilityScore[]
  skillChoices: string[]
  numSkillChoices: number
  features: ClassFeature[]
  // New optional fields
  subclasses?: Subclass[]
  startingEquipmentOptions?: string[]  // flat list; choice logic added later
  armorProficiencies?: string[]
  weaponProficiencies?: string[]
  toolProficiencies?: string[]
  featureTabName?: string              // override label for the features tab, e.g. "POWERS & TALENTS"
  tags?: string[]
}

// ─── Background ───────────────────────────────────────────────────────────────

export interface Background {
  id: string
  name: string
  description: string
  skillProficiencies: SkillName[]  // always exactly 2
  toolProficiencies?: string[]
  languages?: string[]
  languageChoices?: number         // how many languages the player may pick
  startingEquipment: string[]
  feature: { name: string; description: string }
  suggestedPersonalityTraits?: string[]
  suggestedIdeals?: string[]
  suggestedBonds?: string[]
  suggestedFlaws?: string[]
  special?: boolean                // restricted — requires GM approval
  tags?: string[]
}

// ─── Feat ─────────────────────────────────────────────────────────────────────

export interface Feat {
  id: string
  name: string
  prerequisite?: string            // free-form text prerequisite
  prerequisiteClass?: string       // references CharacterClass.id
  prerequisiteRace?: string        // references Race.id
  description: string
  abilityScoreIncreases?: Partial<Record<AbilityScore, number>>
  source?: 'standard' | 'warhammer'  // standard = adapted 5e, warhammer = setting-specific
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
  hitPoints: string       // e.g. "4d8+4" or fixed number as string
  speed: number
  abilityScores: Record<AbilityScore, number>
  savingThrows?: Partial<Record<AbilityScore, number>>
  skills?: Record<string, number>
  damageResistances?: string[]
  damageImmunities?: string[]
  conditionImmunities?: string[]
  senses?: string[]
  languages?: string[]
  challengeRating: number   // CR
  xp?: number
  traits?: { name: string; description: string }[]
  actions?: NPCAction[]
  legendaryActions?: NPCAction[]
  description?: string
  tags?: string[]
}

// ─── Module (the container format) ───────────────────────────────────────────

export type ModuleContentType = 'spells' | 'items' | 'races' | 'classes' | 'feats' | 'npcs' | 'backgrounds'

export interface ModuleContent {
  spells?: Spell[]
  items?: Item[]
  races?: Race[]
  classes?: CharacterClass[]
  feats?: Feat[]
  npcs?: NPC[]
  backgrounds?: Background[]
}

export interface WarhamerModule {
  id: string
  name: string
  version: string
  description?: string
  author?: string
  content: ModuleContent
}
