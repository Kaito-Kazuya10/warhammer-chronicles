/** Row shape returned by Supabase for the `characters` table (snake_case). */
export interface DbCharacterRow {
  id: string
  user_id: string
  campaign_id: string | null

  // Identity
  name: string
  race: string
  class: string
  subclass: string | null
  level: number
  experience_points: number
  background: string
  alignment: string
  portrait: string | null

  // Core stats
  ability_scores: Record<string, number>
  skills: Record<string, boolean>
  saving_throw_proficiencies: string[]
  max_hit_points: number
  current_hit_points: number
  temporary_hit_points: number
  hit_dice_used: number
  armor_class: number
  initiative: number
  speed: number
  proficiency_bonus: number

  // Content
  inventory: Array<{ itemId: string; quantity: number; equipped?: boolean; notes?: string }>
  spell_ids: string[]
  spell_slots: Record<string, { total: number; used: number }>
  feat_ids: string[]
  languages: string[]
  proficiencies_list: string[]

  // Personality
  personality_traits: string
  ideals: string
  bonds: string
  flaws: string
  backstory: string

  // Combat
  inspiration: boolean
  death_save_successes: number
  death_save_failures: number

  // 40K trackers
  warp_exposure: number
  warp_bar: number | null
  corruption: number
  faith: number
  currency: { thrones: number; melt: number; aquila: number }

  // Class-specific (bundled)
  class_data: Record<string, unknown>

  notes: string
  created_at: string
  updated_at: string
}

/** Row shape for `campaigns` table. */
export interface DbCampaignRow {
  id: string
  name: string
  dm_id: string
  invite_code: string
  created_at: string
}

/** Row shape for `campaign_members` table. */
export interface DbCampaignMemberRow {
  campaign_id: string
  user_id: string
  joined_at: string
}
