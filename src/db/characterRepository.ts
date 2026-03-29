import { supabase } from '@/lib/supabase'
import type { Character } from '@/types/character'
import type { DbCharacterRow } from './types'
import { characterToRow, rowToCharacter } from './mappers'

// ─── Fetch all characters owned by the current user ──────────────────────────

export async function fetchMyCharacters(): Promise<Character[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(`Failed to load characters: ${error.message}`)
  return (data as DbCharacterRow[]).map(rowToCharacter)
}

// ─── Upsert (insert or update) a character ───────────────────────────────────

export async function upsertCharacter(character: Character): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const row = characterToRow(character, user.id)

  const { error } = await supabase
    .from('characters')
    .upsert(row, { onConflict: 'id' })

  if (error) throw new Error(`Failed to save character: ${error.message}`)
}

// ─── Fetch characters in a campaign (for DM view) ────────────────────────────

export async function fetchCampaignCharacters(campaignId: string): Promise<Character[]> {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('name', { ascending: true })

  if (error) throw new Error(`Failed to load campaign characters: ${error.message}`)
  return (data as DbCharacterRow[]).map(rowToCharacter)
}

// ─── Delete a character ──────────────────────────────────────────────────────

export async function deleteCharacterFromDb(characterId: string): Promise<void> {
  const { error } = await supabase
    .from('characters')
    .delete()
    .eq('id', characterId)

  if (error) throw new Error(`Failed to delete character: ${error.message}`)
}
