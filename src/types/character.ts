import type { AbilityScore, SkillName, PsychicDiscipline, ItemTier } from './module'

// Re-export SkillName so existing imports from this file continue to work
export type { SkillName }

// ─── Ability Scores ───────────────────────────────────────────────────────────

export type AbilityScores = Record<AbilityScore, number>

// ─── Skills ───────────────────────────────────────────────────────────────────

export type Skills = Record<SkillName, boolean>  // true = proficient

// ─── Inventory ────────────────────────────────────────────────────────────────

export interface InventoryItem {
  itemId: string    // references Item.id from a module
  quantity: number
  equipped?: boolean
  notes?: string
  tierOverride?: ItemTier                          // set when item has been upgraded
  rolledTrait?: { name: string; effect: string }   // trait rolled at Artificer/Relic/Heroic tier
  packsRemaining?: number                          // for 'pack' ammo: packs left this session
  ammoRemaining?: number                           // for 'shot'/'belt' ammo: shots left
}

// ─── Spell Slots ─────────────────────────────────────────────────────────────

export interface SpellSlots {
  [level: number]: {
    total: number
    used: number
  }
}

// ─── Character ────────────────────────────────────────────────────────────────

export interface Character {
  // ── Identity ────────────────────────────────────────────────────────────────
  id: string
  name: string
  race: string                        // references Race.id
  class: string                       // references CharacterClass.id
  subclass?: string                   // references Subclass.id
  level: number
  experiencePoints: number
  background: string                  // references Background.id
  alignment: string
  portrait?: string | null            // base64 data URL
  campaignId?: string | null          // references Campaign.id

  // ── Core Stats ──────────────────────────────────────────────────────────────
  abilityScores: AbilityScores
  skills: Skills                      // true = proficient
  savingThrowProficiencies: AbilityScore[]
  maxHitPoints: number
  currentHitPoints: number
  temporaryHitPoints: number
  hitDiceUsed: number
  armorClass: number
  initiative: number
  speed: number
  proficiencyBonus: number

  // ── Content References ───────────────────────────────────────────────────────
  inventory: InventoryItem[]
  spellIds: string[]                  // references Spell.id from modules
  spellSlots: SpellSlots
  featIds: string[]                   // references Feat.id from modules
  languages: string[]
  proficiencies: string[]             // weapon/armor/tool proficiency strings

  // ── Personality ─────────────────────────────────────────────────────────────
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  backstory: string

  // ── Combat State ────────────────────────────────────────────────────────────
  inspiration: boolean
  deathSaveSuccesses: number
  deathSaveFailures: number

  // ── 40K Trackers ────────────────────────────────────────────────────────────
  warpExposure: number                // 0–10, GM-facing
  warpBar?: number                    // 0–20, Psyker only
  corruption: number                  // 0–100, hidden from players
  faith: number                       // 0–100, hidden from players
  currency: { thrones: number; melt: number; aquila: number }

  // ── Augmenticist ────────────────────────────────────────────────────────────
  augmentSlots?: number
  powerCells?: { current: number; max: number }
  installedAugmentIds?: string[]      // references Item.id

  // ── Player Choices ──────────────────────────────────────────────────────────
  fightingStyle?: string              // "Archery", "Defense", "Marksman", etc.
  featureChoices?: Record<string, string>  // optionGroup → chosen option id
  classResourceCurrent?: number       // current value of class resource (pool/bar)
  classResourceDiceRemaining?: number // for 'dice' type resources

  // ── Warrior ─────────────────────────────────────────────────────────────────
  techniquesKnown?: string[]          // references ClassFeature ids/names

  // ── Officer ─────────────────────────────────────────────────────────────────
  commandsKnownIds?: string[]         // references Command.id
  commandDiceRemaining?: number       // Command Dice pool remaining this rest

  // ── Desperado ───────────────────────────────────────────────────────────────
  tricksKnownIds?: string[]           // references Trick.id
  trickUsesRemaining?: number         // shared pool: 2 × proficiency, recharges short rest

  // ── Gene-Fighter ────────────────────────────────────────────────────────────
  isInGeneSurge?: boolean
  geneSurgesRemaining?: number
  geneticInstability?: number         // 0+, triggers mutations at thresholds
  installedModIds?: string[]          // references GeneModification.id

  // ── Psyker ──────────────────────────────────────────────────────────────────
  psykerDiscipline?: PsychicDiscipline
  sanctioningStatus?: 'sanctioned' | 'unsanctioned'
  preparedSpellIds?: string[]

  // ── Feature Use Tracking ────────────────────────────────────────────────────
  featureUsesSpent?: Record<string, number>
  // Key: slugified feature name (e.g. "aimed-shot", "second-wind")
  // Value: number of uses spent since last rest
  // Cleared on short rest (for 'short' features) or long rest (all features)

  // ── Rest History ─────────────────────────────────────────────────────────────
  lastShortRest?: number              // Unix timestamp of last short rest
  lastLongRest?: number               // Unix timestamp of last long rest

  // ── Meta ────────────────────────────────────────────────────────────────────
  notes: string
  createdAt: number
  updatedAt: number
}
