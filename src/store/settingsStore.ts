import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  darkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (v: boolean) => void
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set(s => ({ darkMode: !s.darkMode })),
      setDarkMode: (v) => set({ darkMode: v }),
    }),
    { name: 'wh-settings' },
  )
)
