import { supabase } from '@/lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface CampaignChannelHandlers {
  onRollInsert?: (payload: Record<string, unknown>) => void
  onSessionChange?: (payload: Record<string, unknown>) => void
  onCharacterChange?: (payload: Record<string, unknown>) => void
}

export function subscribeToCampaign(
  campaignId: string,
  handlers: CampaignChannelHandlers,
): () => void {
  const channel: RealtimeChannel = supabase
    .channel(`campaign:${campaignId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'rolls', filter: `campaign_id=eq.${campaignId}` },
      (payload) => handlers.onRollInsert?.(payload.new as Record<string, unknown>),
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'sessions', filter: `campaign_id=eq.${campaignId}` },
      (payload) => handlers.onSessionChange?.(payload.new as Record<string, unknown>),
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'characters', filter: `campaign_id=eq.${campaignId}` },
      (payload) => handlers.onCharacterChange?.(payload.new as Record<string, unknown>),
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
