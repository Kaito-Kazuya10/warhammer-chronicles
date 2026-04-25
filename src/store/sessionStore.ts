import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface Session {
  id: string
  campaignId: string
  title: string | null
  status: 'active' | 'ended' | 'archived'
  startedAt: string
  endedAt: string | null
  sharedSummary: string | null
  dmNotes: string | null
}

interface SessionStore {
  activeSession: Session | null
  sessionHistory: Session[]
  loading: boolean

  loadActiveSession: (campaignId: string) => Promise<void>
  loadSessionHistory: (campaignId: string) => Promise<void>
  startSession: (campaignId: string, title?: string) => Promise<Session>
  endSession: (sessionId: string, summary?: string) => Promise<void>
  setActiveSession: (session: Session | null) => void
}

function rowToSession(row: Record<string, unknown>): Session {
  return {
    id: row.id as string,
    campaignId: row.campaign_id as string,
    title: row.title as string | null,
    status: row.status as Session['status'],
    startedAt: row.started_at as string,
    endedAt: row.ended_at as string | null,
    sharedSummary: row.shared_summary as string | null,
    dmNotes: row.dm_notes as string | null,
  }
}

export const useSessionStore = create<SessionStore>((set) => ({
  activeSession: null,
  sessionHistory: [],
  loading: false,

  loadActiveSession: async (campaignId: string) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('campaign_id', campaignId)
        .eq('status', 'active')
        .maybeSingle()

      if (error) throw error
      set({ activeSession: data ? rowToSession(data) : null })
    } finally {
      set({ loading: false })
    }
  },

  loadSessionHistory: async (campaignId: string) => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('campaign_id', campaignId)
      .neq('status', 'active')
      .order('started_at', { ascending: false })
      .limit(20)

    if (error) throw error
    set({ sessionHistory: (data ?? []).map(rowToSession) })
  },

  startSession: async (campaignId: string, title?: string) => {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        campaign_id: campaignId,
        title: title || null,
        status: 'active',
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('A session is already active. End it first.')
      }
      throw error
    }

    const session = rowToSession(data)
    set({ activeSession: session })
    return session
  },

  endSession: async (sessionId: string, summary?: string) => {
    const { error } = await supabase
      .from('sessions')
      .update({
        status: 'ended',
        ended_at: new Date().toISOString(),
        shared_summary: summary || null,
      })
      .eq('id', sessionId)

    if (error) throw error
    set({ activeSession: null })
  },

  setActiveSession: (session) => set({ activeSession: session }),
}))
