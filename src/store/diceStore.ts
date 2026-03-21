import { create } from 'zustand'
import type { DiceRollResult } from '../utils/dice'

interface DiceStore {
  history: DiceRollResult[]
  isHistoryOpen: boolean
  latestRoll: DiceRollResult | null
  addRoll: (roll: DiceRollResult) => void
  clearHistory: () => void
  toggleHistory: () => void
  setHistoryOpen: (open: boolean) => void
  dismissLatest: () => void
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
}))
