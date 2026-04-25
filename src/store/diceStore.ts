import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { DiceRollResult } from '../utils/dice'

type AdvantageMode = 'advantage' | 'disadvantage'

interface RollContext {
  visible: boolean
  x: number
  y: number
  pendingRoll: ((mode?: AdvantageMode) => void) | null
}

interface CampaignContext {
  campaignId: string
  sessionId: string | null
  characterId: string | null
  userId: string
}

export interface CampaignRoll {
  id: string
  campaignId: string
  sessionId: string | null
  characterId: string | null
  userId: string
  label: string
  rollType: string
  diceExpression: string
  rolls: number[]
  modifier: number
  total: number
  isNat20: boolean
  isNat1: boolean
  createdAt: string
  characterName?: string
}

interface DiceStore {
  history: DiceRollResult[]
  isHistoryOpen: boolean
  latestRoll: DiceRollResult | null
  addRoll: (roll: DiceRollResult) => void
  clearHistory: () => void
  toggleHistory: () => void
  setHistoryOpen: (open: boolean) => void
  dismissLatest: () => void
  rollContext: RollContext
  showRollContext: (x: number, y: number, roll: (mode?: AdvantageMode) => void) => void
  hideRollContext: () => void
  // Campaign context
  campaignContext: CampaignContext | null
  setCampaignContext: (ctx: CampaignContext | null) => void
  // Campaign roll feed
  campaignRolls: CampaignRoll[]
  appendCampaignRoll: (roll: CampaignRoll) => void
  clearCampaignRolls: () => void
}

function persistRollToSupabase(roll: DiceRollResult, ctx: CampaignContext) {
  supabase.from('rolls').insert({
    campaign_id: ctx.campaignId,
    session_id: ctx.sessionId,
    character_id: ctx.characterId,
    user_id: ctx.userId,
    label: roll.label,
    roll_type: roll.rollType,
    dice_expression: roll.diceExpression,
    rolls: roll.rolls,
    modifier: roll.modifier,
    total: roll.total,
    is_nat20: roll.isNat20 ?? false,
    is_nat1: roll.isNat1 ?? false,
  }).then()
}

export const useDiceStore = create<DiceStore>((set, get) => ({
  history: [],
  isHistoryOpen: false,
  latestRoll: null,

  addRoll: (roll) => {
    set(state => ({
      history: [roll, ...state.history].slice(0, 100),
      latestRoll: roll,
    }))
    const ctx = get().campaignContext
    if (ctx) persistRollToSupabase(roll, ctx)
  },

  clearHistory: () => set({ history: [] }),

  toggleHistory: () => set(state => ({ isHistoryOpen: !state.isHistoryOpen })),

  setHistoryOpen: (open) => set({ isHistoryOpen: open }),

  dismissLatest: () => set({ latestRoll: null }),

  rollContext: { visible: false, x: 0, y: 0, pendingRoll: null },

  showRollContext: (x, y, roll) => set({
    rollContext: { visible: true, x, y, pendingRoll: roll },
  }),

  hideRollContext: () => set(state => ({
    rollContext: { ...state.rollContext, visible: false, pendingRoll: null },
  })),

  // Campaign context
  campaignContext: null,
  setCampaignContext: (ctx) => set({ campaignContext: ctx }),

  // Campaign roll feed
  campaignRolls: [],
  appendCampaignRoll: (roll) => set(state => ({
    campaignRolls: [roll, ...state.campaignRolls].slice(0, 50),
  })),
  clearCampaignRolls: () => set({ campaignRolls: [] }),
}))
