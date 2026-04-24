import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { getAllClasses, getAllRaces, getAllBackgrounds } from '../../modules/registry'
import type { CharacterClass, SkillName } from '../../types/module'
import type { Character } from '../../types/character'

// ─── Draft state shape ────────────────────────────────────────────────────────

export interface CreationDraft {
  // Header
  name: string
  portrait: string | null          // base64 data URL

  // Step 0 — Species
  raceId: string | null
  abilityScoreChoices: Record<string, number>  // for species with player-chosen bonuses

  // Step 1 — Class
  classId: string | null
  subclassId: string | null
  fightingStyle: string | null

  // Step 2 — Background
  backgroundId: string | null

  // Step 3 — Abilities
  abilityScoreMethod: 'standard-array' | 'point-buy' | 'manual'
  baseAbilityScores: Record<string, number>  // STR/DEX/CON/INT/WIS/CHA before racial bonuses

  // Step 4 — Skills
  selectedSkills: string[]

  // Step 5 — Equipment
  equipmentChoices: Record<string, string>
  useStartingWealth: boolean
  startingWealth: number | null
}

const defaultDraft: CreationDraft = {
  name: '',
  portrait: null,

  raceId: null,
  abilityScoreChoices: {},

  classId: null,
  subclassId: null,
  fightingStyle: null,

  backgroundId: null,

  abilityScoreMethod: 'standard-array',
  baseAbilityScores: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },

  selectedSkills: [],

  equipmentChoices: {},
  useStartingWealth: false,
  startingWealth: null,
}

// ─── Hydrate draft from existing character ───────────────────────────────────

const ABBR_MAP: Record<string, string> = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}

function hydrateDraftFromCharacter(char: Character): CreationDraft {
  const race = char.race ? getAllRaces().find(r => r.id === char.race) : null
  const bg   = char.background ? getAllBackgrounds().find(b => b.id === char.background) : null

  // Compute base ability scores by subtracting racial bonuses
  const baseScores: Record<string, number> = {}
  for (const [full, abbr] of Object.entries(ABBR_MAP)) {
    const total  = char.abilityScores[full as keyof typeof char.abilityScores] ?? 10
    const racial = race?.abilityScoreIncreases[full as keyof typeof race.abilityScoreIncreases] ?? 0
    baseScores[abbr] = total - racial
  }

  // Extract class-selected skills by removing background skills
  const bgSkillSet = new Set(bg?.skillProficiencies ?? [])
  const selectedSkills: string[] = []
  if (char.skills) {
    for (const [skill, proficient] of Object.entries(char.skills)) {
      if (proficient && !bgSkillSet.has(skill as SkillName)) {
        selectedSkills.push(skill)
      }
    }
  }

  return {
    name: char.name,
    portrait: char.portrait ?? null,
    raceId: char.race || null,
    abilityScoreChoices: {},
    classId: char.class || null,
    subclassId: char.subclass || null,
    fightingStyle: char.featureChoices?.['fighting-style'] ?? char.fightingStyle ?? null,
    backgroundId: char.background || null,
    abilityScoreMethod: 'manual',
    baseAbilityScores: baseScores,
    selectedSkills,
    equipmentChoices: {},
    useStartingWealth: false,
    startingWealth: null,
  }
}

// ─── Validation helpers ───────────────────────────────────────────────────────

const TOTAL_STEPS = 7
const ABILITY_ABBR_KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']
const EQUIP_CHOICE_RE = /^\(a\)\s*.+\s+or\s+\(b\)/i

function hasFightingStyleFeature(cls: CharacterClass): boolean {
  return cls.features.some(f => f.level === 1 && f.name.toLowerCase().includes('fighting style'))
}

function canAdvanceFromStep(step: number, draft: CreationDraft): boolean {
  switch (step) {
    case 0: return draft.raceId !== null
    case 1: {
      if (!draft.classId) return false
      const cls = getAllClasses().find(c => c.id === draft.classId)
      if (!cls) return false
      // Only require subclass if the class actually has subclasses
      const hasSubclasses = (cls.subclasses?.length ?? 0) > 0
      if (hasSubclasses && !draft.subclassId) return false
      if (hasFightingStyleFeature(cls) && !draft.fightingStyle) return false
      return true
    }
    case 2: return true  // background is optional
    case 3: return ABILITY_ABBR_KEYS.every(k => (draft.baseAbilityScores[k] ?? 0) > 0)
    case 4: {
      const cls = getAllClasses().find(c => c.id === draft.classId)
      return !!cls && draft.selectedSkills.length === cls.numSkillChoices
    }
    case 5: {
      if (draft.useStartingWealth) return (draft.startingWealth ?? 0) > 0
      const cls = getAllClasses().find(c => c.id === draft.classId)
      if (!cls) return true
      const opts = cls.startingEquipmentOptions ?? []
      return opts.every((opt, i) =>
        !EQUIP_CHOICE_RE.test(opt) || draft.equipmentChoices[String(i)] !== undefined,
      )
    }
    default: return true
  }
}

/** Returns the highest step index the player is permitted to reach given current draft state. */
function computeMaxFurthestStep(draft: CreationDraft): number {
  for (let s = 0; s < TOTAL_STEPS - 1; s++) {
    if (!canAdvanceFromStep(s, draft)) return s
  }
  return TOTAL_STEPS - 1
}

// ─── Context value ────────────────────────────────────────────────────────────

interface CreationContextValue {
  draft: CreationDraft
  updateDraft: (partial: Partial<CreationDraft>) => void
  resetDraft: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
  furthestStep: number
  /** Bound to current draft — returns true when that step's requirements are met. */
  canAdvanceFrom: (step: number) => boolean
  nameError: boolean
  setNameError: (v: boolean) => void
  /** Non-null when editing an existing character */
  editId: string | null
}

const CreationContext = createContext<CreationContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CreationProviderProps {
  children: React.ReactNode
  editCharacter?: Character | null
}

export function CreationProvider({ children, editCharacter }: CreationProviderProps) {
  const editId = editCharacter?.id ?? null
  const hydratedRef = useRef(false)

  const [draft, setDraft] = useState<CreationDraft>(() => {
    if (editCharacter) {
      hydratedRef.current = true
      return hydrateDraftFromCharacter(editCharacter)
    }
    return defaultDraft
  })
  const [currentStep, setCurrentStepRaw] = useState(0)
  const [furthestStep, setFurthestStep] = useState(() => editCharacter ? TOTAL_STEPS - 1 : 0)
  const [nameError, setNameErrorRaw] = useState(false)

  // If editCharacter changes after mount (shouldn't normally happen), re-hydrate
  useEffect(() => {
    if (editCharacter && !hydratedRef.current) {
      hydratedRef.current = true
      setDraft(hydrateDraftFromCharacter(editCharacter))
      setFurthestStep(TOTAL_STEPS - 1)
    }
  }, [editCharacter])

  const updateDraft = useCallback((partial: Partial<CreationDraft>) => {
    setDraft(prev => ({ ...prev, ...partial }))
  }, [])

  // When the draft changes, trim furthestStep back to the first invalid step.
  // In edit mode, allow all steps to remain accessible.
  useEffect(() => {
    if (!editId) {
      setFurthestStep(prev => Math.min(prev, computeMaxFurthestStep(draft)))
    }
  }, [draft, editId])

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft)
    setCurrentStepRaw(0)
    setFurthestStep(0)
    setNameErrorRaw(false)
  }, [])

  // setCurrentStep advances furthestStep only forward (Next button).
  // Regression is handled separately via the draft useEffect above.
  const setCurrentStep = useCallback((step: number) => {
    setCurrentStepRaw(step)
    setFurthestStep(prev => Math.max(prev, step))
  }, [])

  const canAdvanceFrom = useCallback(
    (step: number) => canAdvanceFromStep(step, draft),
    [draft],
  )

  const setNameError = useCallback((v: boolean) => setNameErrorRaw(v), [])

  return (
    <CreationContext.Provider
      value={{
        draft, updateDraft, resetDraft,
        currentStep, setCurrentStep, furthestStep,
        canAdvanceFrom,
        nameError, setNameError,
        editId,
      }}
    >
      {children}
    </CreationContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCreation(): CreationContextValue {
  const ctx = useContext(CreationContext)
  if (!ctx) throw new Error('useCreation must be used inside <CreationProvider>')
  return ctx
}
