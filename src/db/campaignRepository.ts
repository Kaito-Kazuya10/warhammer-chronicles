import { supabase } from '@/lib/supabase'
import type { DbCampaignRow } from './types'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CampaignMember {
  userId: string
  displayName: string
  role: 'player' | 'dm'
  joinedAt: string
}

// ─── Create a campaign (DM only) ─────────────────────────────────────────────

export async function createCampaign(name: string): Promise<DbCampaignRow> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('campaigns')
    .insert({ name, dm_id: user.id })
    .select()
    .single()

  if (error) throw new Error(`Failed to create campaign: ${error.message}`)
  return data as DbCampaignRow
}

// ─── Join a campaign by invite code ──────────────────────────────────────────

export async function joinCampaignByCode(inviteCode: string): Promise<DbCampaignRow> {
  // Look up the campaign
  const { data: campaign, error: lookupErr } = await supabase
    .from('campaigns')
    .select('*')
    .eq('invite_code', inviteCode.trim().toLowerCase())
    .single()

  if (lookupErr || !campaign) throw new Error('Invalid invite code')

  // Insert membership
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error: joinErr } = await supabase
    .from('campaign_members')
    .insert({ campaign_id: campaign.id, user_id: user.id })

  if (joinErr) {
    if (joinErr.code === '23505') throw new Error('You already joined this campaign')
    throw new Error(`Failed to join campaign: ${joinErr.message}`)
  }

  return campaign as DbCampaignRow
}

// ─── Fetch campaigns visible to the current user ─────────────────────────────

export async function fetchMyCampaigns(): Promise<DbCampaignRow[]> {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to load campaigns: ${error.message}`)
  return (data ?? []) as DbCampaignRow[]
}

// ─── Fetch members of a campaign ─────────────────────────────────────────────

export async function fetchCampaignMembers(campaignId: string): Promise<CampaignMember[]> {
  const { data, error } = await supabase
    .from('campaign_members')
    .select('user_id, joined_at, profiles(display_name, role)')
    .eq('campaign_id', campaignId)

  if (error) throw new Error(`Failed to load members: ${error.message}`)

  return (data ?? []).map((row: Record<string, unknown>) => {
    const profile = row.profiles as { display_name: string; role: string } | null
    return {
      userId: row.user_id as string,
      displayName: profile?.display_name ?? 'Unknown',
      role: (profile?.role ?? 'player') as 'player' | 'dm',
      joinedAt: row.joined_at as string,
    }
  })
}
