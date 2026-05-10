import { create } from 'zustand'
import type { Character, AbilityScores, Skills, PendingAddictionCheck } from '../types/character'
import {
  fetchMyCharacters,
  upsertCharacter,
  deleteCharacterFromDb,
} from '../db/characterRepository'
import { getItemById } from '../modules/registry'

const defaultAbilityScores: AbilityScores = {
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
}

const defaultSkills: Skills = {
  acrobatics: false, animalHandling: false, arcana: false, athletics: false,
  deception: false, history: false, insight: false, intimidation: false,
  investigation: false, medicine: false, nature: false, perception: false,
  performance: false, persuasion: false, religion: false, sleightOfHand: false,
  stealth: false, survival: false, xenology: false, technology: false, warpControl: false,
}

function createNewCharacter(id: string): Character {
  const now = Date.now()
  return {
    id,
    name: 'New Character',
    race: '',
    class: '',
    level: 1,
    experiencePoints: 0,
    background: '',
    alignment: '',
    abilityScores: { ...defaultAbilityScores },
    skills: { ...defaultSkills },
    savingThrowProficiencies: [],
    maxHitPoints: 10,
    currentHitPoints: 10,
    temporaryHitPoints: 0,
    hitDiceUsed: 0,
    armorClass: 10,
    initiative: 0,
    speed: 30,
    proficiencyBonus: 2,
    inventory: [],
    spellIds: [],
    spellSlots: {},
    featIds: [],
    languages: [],
    proficiencies: [],
    personalityTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    backstory: '',
    inspiration: false,
    deathSaveSuccesses: 0,
    deathSaveFailures: 0,
    warpExposure: 0,
    corruption: 0,
    faith: 0,
    currency: { thrones: 0, melt: 0, aquila: 0 },
    notes: '',
    createdAt: now,
    updatedAt: now,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface CharacterStore {
  characters: Character[]
  activeCharacterId: string | null
  loading: boolean
  error: string | null
  activeCharacter: () => Character | null

  loadCharacters: () => Promise<void>
  createCharacter: () => string
  importCharacter: (data: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => string
  duplicateCharacter: (id: string) => string | null
  setActiveCharacter: (id: string) => void
  updateCharacter: (id: string, patch: Partial<Character>) => void
  updateAbilityScore: (id: string, ability: keyof AbilityScores, value: number) => void
  toggleSkill: (id: string, skill: keyof Skills) => void
  setHitPoints: (id: string, current: number) => void
  useConsumable: (id: string, itemIndex: number) => { used: boolean; blocked?: string; item?: ReturnType<typeof getItemById> }
  deleteCharacter: (id: string) => void
}

// Debounced save — batches rapid updates into a single DB write
const saveTimers = new Map<string, ReturnType<typeof setTimeout>>()

function debouncedSave(character: Character) {
  const existing = saveTimers.get(character.id)
  if (existing) clearTimeout(existing)
  saveTimers.set(
    character.id,
    setTimeout(() => {
      saveTimers.delete(character.id)
      upsertCharacter(character).catch(err =>
        console.error('[characterStore] Background save failed:', err),
      )
    }, 800),
  )
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  activeCharacterId: null,
  loading: false,
  error: null,

  activeCharacter: () => {
    const { characters, activeCharacterId } = get()
    return characters.find(c => c.id === activeCharacterId) ?? null
  },

  // ── Load from Supabase ────────────────────────────────────────────────────

  loadCharacters: async () => {
    set({ loading: true, error: null })
    try {
      const characters = await fetchMyCharacters()
      set({ characters, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  // ── Create ────────────────────────────────────────────────────────────────

  createCharacter: () => {
    const id = crypto.randomUUID()
    const newChar = createNewCharacter(id)
    set(state => ({ characters: [...state.characters, newChar], activeCharacterId: id }))
    // Save to DB in background
    upsertCharacter(newChar).catch(err =>
      console.error('[characterStore] Failed to save new character:', err),
    )
    return id
  },

  importCharacter: (data) => {
    const id = crypto.randomUUID()
    const now = Date.now()
    const newChar: Character = { ...data, id, createdAt: now, updatedAt: now } as Character
    set(state => ({ characters: [...state.characters, newChar], activeCharacterId: id }))
    upsertCharacter(newChar).catch(err =>
      console.error('[characterStore] Failed to save imported character:', err),
    )
    return id
  },

  duplicateCharacter: (id) => {
    const source = get().characters.find(c => c.id === id)
    if (!source) return null
    const newId = crypto.randomUUID()
    const now = Date.now()
    const copy: Character = {
      ...source,
      id: newId,
      name: `${source.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
    }
    set(state => ({ characters: [...state.characters, copy], activeCharacterId: newId }))
    upsertCharacter(copy).catch(err =>
      console.error('[characterStore] Failed to save duplicated character:', err),
    )
    return newId
  },

  setActiveCharacter: (id) => set({ activeCharacterId: id }),

  // ── Update (optimistic + debounced DB sync) ───────────────────────────────

  updateCharacter: (id, patch) => {
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c
      ),
    }))
    const updated = get().characters.find(c => c.id === id)
    if (updated) debouncedSave(updated)
  },

  updateAbilityScore: (id, ability, value) => {
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id
          ? {
              ...c,
              abilityScores: { ...c.abilityScores, [ability]: value },
              updatedAt: Date.now(),
            }
          : c
      ),
    }))
    const updated = get().characters.find(c => c.id === id)
    if (updated) debouncedSave(updated)
  },

  toggleSkill: (id, skill) => {
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id
          ? {
              ...c,
              skills: { ...c.skills, [skill]: !c.skills[skill] },
              updatedAt: Date.now(),
            }
          : c
      ),
    }))
    const updated = get().characters.find(c => c.id === id)
    if (updated) debouncedSave(updated)
  },

  setHitPoints: (id, current) => {
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id
          ? { ...c, currentHitPoints: Math.min(Math.max(current, 0), c.maxHitPoints), updatedAt: Date.now() }
          : c
      ),
    }))
    const updated = get().characters.find(c => c.id === id)
    if (updated) debouncedSave(updated)
  },

  // ── Use Consumable ───────────────────────────────────────────────────────

  useConsumable: (id, itemIndex) => {
    const character = get().characters.find(c => c.id === id)
    if (!character) return { used: false }

    const entry = character.inventory[itemIndex]
    if (!entry) return { used: false }

    const item = getItemById(entry.itemId)
    if (!item || item.type !== 'consumable') return { used: false }

    if (item.restrictedToClasses?.length) {
      if (!item.restrictedToClasses.includes(character.class)) {
        return { used: false, blocked: `Restricted to: ${item.restrictedToClasses.join(', ')}`, item }
      }
    }

    const charges = entry.packsRemaining ?? item.consumableCharges ?? 1
    const newCharges = charges - 1
    const patch: Partial<Character> = {}

    if (newCharges <= 0) {
      patch.inventory = character.inventory.filter((_, i) => i !== itemIndex)
    } else {
      patch.inventory = character.inventory.map((e, i) =>
        i === itemIndex ? { ...e, packsRemaining: newCharges } : e
      )
    }

    if (item.addictionDC) {
      const check: PendingAddictionCheck = {
        id: crypto.randomUUID(),
        itemId: item.id,
        substanceName: item.name,
        addictionDC: item.addictionDC,
        usedAt: new Date().toISOString(),
      }
      patch.pendingAddictionChecks = [...(character.pendingAddictionChecks ?? []), check]
    }

    set(state => ({
      characters: state.characters.map(c =>
        c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c
      ),
    }))
    const updated = get().characters.find(c => c.id === id)
    if (updated) debouncedSave(updated)

    return { used: true, item }
  },

  // ── Delete (optimistic + DB sync) ─────────────────────────────────────────

  deleteCharacter: (id) => {
    set(state => ({
      characters: state.characters.filter(c => c.id !== id),
      activeCharacterId: state.activeCharacterId === id ? null : state.activeCharacterId,
    }))
    deleteCharacterFromDb(id).catch(err =>
      console.error('[characterStore] Failed to delete character from DB:', err),
    )
  },
}))
