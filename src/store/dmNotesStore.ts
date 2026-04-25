import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface Trigger {
  id: string
  label: string
  kind: 'open_thread' | 'promise_made' | 'owed_favor' | 'secret' | 'red_flag' | 'custom'
  pinned: boolean
}

export interface DmCharacterNote {
  id: string
  campaignId: string
  characterId: string
  profileNote: string
  triggers: Trigger[]
}

export type MomentKind = 'beat' | 'lie_told' | 'promise' | 'revelation' | 'death_flag' | 'custom'

export interface SessionMoment {
  id: string
  sessionId: string
  campaignId: string
  characterId: string | null
  text: string
  kind: MomentKind
  createdAt: string
}

interface DmNotesStore {
  notes: Map<string, DmCharacterNote>
  moments: SessionMoment[]
  loading: boolean

  loadNotes: (campaignId: string) => Promise<void>
  loadMoments: (campaignId: string) => Promise<void>
  saveProfileNote: (campaignId: string, characterId: string, text: string) => Promise<void>
  addTrigger: (campaignId: string, characterId: string, trigger: Omit<Trigger, 'id'>) => Promise<void>
  removeTrigger: (campaignId: string, characterId: string, triggerId: string) => Promise<void>
  toggleTriggerPin: (campaignId: string, characterId: string, triggerId: string) => Promise<void>
  addMoment: (moment: Omit<SessionMoment, 'id' | 'createdAt'>) => Promise<void>
}

export const useDmNotesStore = create<DmNotesStore>((set, get) => ({
  notes: new Map(),
  moments: [],
  loading: false,

  loadNotes: async (campaignId) => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('dm_character_notes')
        .select('*')
        .eq('campaign_id', campaignId)

      if (error) throw error

      const noteMap = new Map<string, DmCharacterNote>()
      for (const row of data ?? []) {
        noteMap.set(row.character_id, {
          id: row.id,
          campaignId: row.campaign_id,
          characterId: row.character_id,
          profileNote: row.profile_note ?? '',
          triggers: (row.triggers ?? []) as Trigger[],
        })
      }
      set({ notes: noteMap })
    } finally {
      set({ loading: false })
    }
  },

  loadMoments: async (campaignId) => {
    const { data, error } = await supabase
      .from('session_moments')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error

    set({
      moments: (data ?? []).map(row => ({
        id: row.id,
        sessionId: row.session_id,
        campaignId: row.campaign_id,
        characterId: row.character_id,
        text: row.text,
        kind: row.kind as MomentKind,
        createdAt: row.created_at,
      })),
    })
  },

  saveProfileNote: async (campaignId, characterId, text) => {
    const { data, error } = await supabase
      .from('dm_character_notes')
      .upsert(
        { campaign_id: campaignId, character_id: characterId, profile_note: text, updated_at: new Date().toISOString() },
        { onConflict: 'campaign_id,character_id' },
      )
      .select()
      .single()

    if (error) throw error

    set(state => {
      const notes = new Map(state.notes)
      const existing = notes.get(characterId)
      notes.set(characterId, {
        id: data.id,
        campaignId,
        characterId,
        profileNote: text,
        triggers: existing?.triggers ?? (data.triggers as Trigger[] ?? []),
      })
      return { notes }
    })
  },

  addTrigger: async (campaignId, characterId, trigger) => {
    const newTrigger: Trigger = { ...trigger, id: crypto.randomUUID() }
    const existing = get().notes.get(characterId)
    const triggers = [...(existing?.triggers ?? []), newTrigger]

    const { data, error } = await supabase
      .from('dm_character_notes')
      .upsert(
        { campaign_id: campaignId, character_id: characterId, triggers: JSON.stringify(triggers), updated_at: new Date().toISOString() },
        { onConflict: 'campaign_id,character_id' },
      )
      .select()
      .single()

    if (error) throw error

    set(state => {
      const notes = new Map(state.notes)
      notes.set(characterId, {
        id: data.id,
        campaignId,
        characterId,
        profileNote: existing?.profileNote ?? data.profile_note ?? '',
        triggers,
      })
      return { notes }
    })
  },

  removeTrigger: async (campaignId, characterId, triggerId) => {
    const existing = get().notes.get(characterId)
    if (!existing) return
    const triggers = existing.triggers.filter(t => t.id !== triggerId)

    await supabase
      .from('dm_character_notes')
      .update({ triggers: JSON.stringify(triggers), updated_at: new Date().toISOString() })
      .eq('campaign_id', campaignId)
      .eq('character_id', characterId)

    set(state => {
      const notes = new Map(state.notes)
      notes.set(characterId, { ...existing, triggers })
      return { notes }
    })
  },

  toggleTriggerPin: async (campaignId, characterId, triggerId) => {
    const existing = get().notes.get(characterId)
    if (!existing) return
    const triggers = existing.triggers.map(t =>
      t.id === triggerId ? { ...t, pinned: !t.pinned } : t,
    )

    await supabase
      .from('dm_character_notes')
      .update({ triggers: JSON.stringify(triggers), updated_at: new Date().toISOString() })
      .eq('campaign_id', campaignId)
      .eq('character_id', characterId)

    set(state => {
      const notes = new Map(state.notes)
      notes.set(characterId, { ...existing, triggers })
      return { notes }
    })
  },

  addMoment: async (moment) => {
    const { data, error } = await supabase
      .from('session_moments')
      .insert({
        session_id: moment.sessionId,
        campaign_id: moment.campaignId,
        character_id: moment.characterId,
        text: moment.text,
        kind: moment.kind,
      })
      .select()
      .single()

    if (error) throw error

    set(state => ({
      moments: [
        {
          id: data.id,
          sessionId: data.session_id,
          campaignId: data.campaign_id,
          characterId: data.character_id,
          text: data.text,
          kind: data.kind as MomentKind,
          createdAt: data.created_at,
        },
        ...state.moments,
      ],
    }))
  },
}))
