import { create } from 'zustand'
import type { Character, AbilityScores, Skills } from '../types/character'

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
  activeCharacter: () => Character | null

  createCharacter: () => string
  setActiveCharacter: (id: string) => void
  updateCharacter: (id: string, patch: Partial<Character>) => void
  updateAbilityScore: (id: string, ability: keyof AbilityScores, value: number) => void
  toggleSkill: (id: string, skill: keyof Skills) => void
  setHitPoints: (id: string, current: number) => void
  deleteCharacter: (id: string) => void
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  characters: [],
  activeCharacterId: null,

  activeCharacter: () => {
    const { characters, activeCharacterId } = get()
    return characters.find(c => c.id === activeCharacterId) ?? null
  },

  createCharacter: () => {
    const id = crypto.randomUUID()
    const newChar = createNewCharacter(id)
    set(state => ({ characters: [...state.characters, newChar], activeCharacterId: id }))
    return id
  },

  setActiveCharacter: (id) => set({ activeCharacterId: id }),

  updateCharacter: (id, patch) =>
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c
      ),
    })),

  updateAbilityScore: (id, ability, value) =>
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
    })),

  toggleSkill: (id, skill) =>
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
    })),

  setHitPoints: (id, current) =>
    set(state => ({
      characters: state.characters.map(c =>
        c.id === id
          ? { ...c, currentHitPoints: Math.min(Math.max(current, 0), c.maxHitPoints), updatedAt: Date.now() }
          : c
      ),
    })),

  deleteCharacter: (id) =>
    set(state => ({
      characters: state.characters.filter(c => c.id !== id),
      activeCharacterId: state.activeCharacterId === id ? null : state.activeCharacterId,
    })),
}))
