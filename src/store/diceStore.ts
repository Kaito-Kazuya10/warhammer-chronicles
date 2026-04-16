import { create } from 'zustand'
import type { DiceRollResult } from '../utils/dice'

type AdvantageMode = 'advantage' | 'disadvantage'

interface RollContext {
  visible: boolean
  x: number
  y: number
  pendingRoll: ((mode?: AdvantageMode) => void) | null
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
  // Right-click context menu
  rollContext: RollContext
  showRollContext: (x: number, y: number, roll: (mode?: AdvantageMode) => void) => void
  hideRollContext: () => void
}

export const useDiceStore = create<DiceStore>((set) => ({
  history: [],
  isHistoryOpen: false,
  latestRoll: null,

  addRoll: (roll) => set(state => ({
    history: [roll, ...state.history].slice(0, 100),
    latestRoll: roll,
  })),

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
}))
