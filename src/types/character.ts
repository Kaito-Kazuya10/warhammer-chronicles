import type { AbilityScore, SkillName } from './module'

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
}

// ─── Spell Slot ───────────────────────────────────────────────────────────────

export interface SpellSlots {
  [level: number]: {
    total: number
    used: number
  }
}

// ─── Character ────────────────────────────────────────────────────────────────

export interface Character {
  id: string
  name: string
  race: string           // references Race.id
  class: string          // references CharacterClass.id
  subclass?: string
  level: number
  experiencePoints: number
  background: string     // references Background.id
  alignment: string

  abilityScores: AbilityScores
  skills: Skills
  savingThrowProficiencies: AbilityScore[]

  maxHitPoints: number
  currentHitPoints: number
  temporaryHitPoints: number
  hitDiceUsed: number

  armorClass: number
  initiative: number
  speed: number

  proficiencyBonus: number

  inventory: InventoryItem[]
  spellIds: string[]        // references Spell.id from modules
  spellSlots: SpellSlots

  featIds: string[]         // references Feat.id from modules

  languages: string[]
  proficiencies: string[]   // weapon/armor/tool proficiencies
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
  backstory: string

  inspiration: boolean
  deathSaveSuccesses: number
  deathSaveFailures: number

  // ─── 40K Tracker Fields ─────────────────────────────────────────────────────
  warpExposure: number    // 0–10, GM-facing
  warpBar?: number        // 0–20, Psyker only
  corruption: number      // 0–100, hidden from players
  faith: number           // 0–100, hidden from players

  // ─── Augmenticist Fields ─────────────────────────────────────────────────────
  augmentSlots?: number
  powerCells?: { current: number; max: number }
  installedAugmentIds?: string[]   // references Item.id

  // ─── Currency (40K) ──────────────────────────────────────────────────────────
  currency: {
    thrones: number
    melt: number
    aquila: number
  }

  portrait?: string | null

  notes: string
  createdAt: number
  updatedAt: number
}
