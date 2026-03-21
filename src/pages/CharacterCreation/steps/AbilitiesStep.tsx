import { getAllRaces } from '../../../modules/registry'
import type { AbilityScore } from '../../../types/module'
import { useCreation } from '../CreationContext'
import type { CreationDraft } from '../CreationContext'
import AbilityScoreAllocator from '../components/AbilityScoreAllocator'
import type { AbilityKey } from '../components/AbilityScoreAllocator'

// ─── Method selector ──────────────────────────────────────────────────────────

const METHODS: { value: CreationDraft['abilityScoreMethod']; label: string; hint: string }[] = [
  { value: 'standard-array', label: 'Standard Array', hint: 'Assign 15 / 14 / 13 / 12 / 10 / 8' },
  { value: 'point-buy',      label: 'Point Buy',      hint: '27 points to spend (8–15 per score)' },
  { value: 'manual',         label: 'Manual / Roll',  hint: 'Enter any values you\'ve rolled' },
]

const SCORE_DEFAULTS: Record<CreationDraft['abilityScoreMethod'], Record<string, number>> = {
  'standard-array': { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
  'point-buy':      { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
  'manual':         { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
}

function MethodSelector() {
  const { draft, updateDraft } = useCreation()

  const switchMethod = (method: CreationDraft['abilityScoreMethod']) => {
    updateDraft({
      abilityScoreMethod: method,
      baseAbilityScores: { ...SCORE_DEFAULTS[method] },
    })
  }

  const active = METHODS.find(m => m.value === draft.abilityScoreMethod)

  return (
    <div className="method-section">
      <div className="method-selector" role="group" aria-label="Ability score method">
        {METHODS.map(m => (
          <button
            key={m.value}
            type="button"
            className={`method-btn${draft.abilityScoreMethod === m.value ? ' method-btn--active' : ''}`}
            onClick={() => switchMethod(m.value)}
          >
            {m.label}
          </button>
        ))}
      </div>
      {active && (
        <p className="method-hint">{active.hint}</p>
      )}
    </div>
  )
}

// ─── Compute racial bonuses from draft ────────────────────────────────────────

function useRacialBonuses(): Partial<Record<AbilityScore, number>> {
  const { draft } = useCreation()
  const races = getAllRaces()
  const race = races.find(r => r.id === draft.raceId)
  const bonuses: Partial<Record<AbilityScore, number>> = {}

  if (race) {
    for (const [key, val] of Object.entries(race.abilityScoreIncreases)) {
      if (val) bonuses[key as AbilityScore] = (bonuses[key as AbilityScore] ?? 0) + val
    }
  }
  for (const [key, val] of Object.entries(draft.abilityScoreChoices)) {
    bonuses[key as AbilityScore] = (bonuses[key as AbilityScore] ?? 0) + val
  }

  return bonuses
}

// ─── AbilitiesStep ────────────────────────────────────────────────────────────

export default function AbilitiesStep() {
  const { draft, updateDraft } = useCreation()
  const racialBonuses = useRacialBonuses()

  const handleChange = (abbr: AbilityKey, value: number) => {
    updateDraft({ baseAbilityScores: { ...draft.baseAbilityScores, [abbr]: value } })
  }

  // Bulk update replaces the whole object in one updateDraft call,
  // avoiding stale-closure issues when updating all 6 scores at once.
  const handleBulkChange = (newScores: Record<string, number>) => {
    updateDraft({ baseAbilityScores: newScores })
  }

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Assign Ability Scores</h2>
        <p className="step-intro__desc">
          Your six ability scores define your character's fundamental capabilities.
          {draft.raceId && ' Racial bonuses are shown automatically based on your chosen species.'}
        </p>
      </div>

      <MethodSelector />

      <AbilityScoreAllocator
        scores={draft.baseAbilityScores}
        method={draft.abilityScoreMethod}
        racialBonuses={racialBonuses}
        onChange={handleChange}
        onBulkChange={handleBulkChange}
      />
    </div>
  )
}
