import { useEffect } from 'react'
import type { Race, AbilityScore } from '../../../types/module'
import { getAllRaces } from '../../../modules/registry'
import { useCreation } from '../CreationContext'
import CardPicker from '../components/CardPicker'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ABILITY_ABBR: Record<AbilityScore, string> = {
  strength:     'STR',
  dexterity:    'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom:       'WIS',
  charisma:     'CHA',
}

const ABILITY_ORDER: AbilityScore[] = [
  'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
]

function groupSpecies(race: Race): string {
  if (race.tier === 'restricted') return 'Restricted Species (GM Approval Required)'
  if (race.tier === 'advanced') return 'Advanced Species (GM Approval Required)'
  return 'Standard Species'
}

// ─── Ability score tag row ─────────────────────────────────────────────────────

function AbilityTags({ race }: { race: Race }) {
  const tags: { label: string; value: number }[] = []

  // Fixed increases
  for (const [key, val] of Object.entries(race.abilityScoreIncreases)) {
    if (val !== undefined) {
      tags.push({ label: ABILITY_ABBR[key as AbilityScore] ?? key.toUpperCase(), value: val })
    }
  }

  // Flexible choices
  if (race.abilityScoreChoices) {
    const { choose, amount } = race.abilityScoreChoices
    tags.push({ label: `Choose ${choose}: +${amount}`, value: 0 })
  }

  if (tags.length === 0) return null

  return (
    <div className="ability-tags">
      {tags.map(t => {
        const cls = t.value === 0
          ? 'ability-tag ability-tag--choice'
          : t.value > 0
            ? 'ability-tag ability-tag--pos'
            : 'ability-tag ability-tag--neg'
        const sign = t.value > 0 ? '+' : ''
        const label = t.value === 0 ? t.label : `${t.label} ${sign}${t.value}`
        return (
          <span key={t.label} className={cls}>{label}</span>
        )
      })}
    </div>
  )
}

// ─── Species card (compact) ────────────────────────────────────────────────────

function SpeciesCard({ race, isSelected }: { race: Race; isSelected: boolean }) {
  const truncated = race.description.length > 90
    ? race.description.slice(0, 87) + '…'
    : race.description

  return (
    <div className={`species-card${isSelected ? ' species-card--selected' : ''}`}>
      <p className="species-card__name">{race.name}</p>
      <AbilityTags race={race} />
      <p className="species-card__meta">
        <span>{race.size.charAt(0).toUpperCase() + race.size.slice(1)}</span>
        <span className="species-card__dot">·</span>
        <span>{race.speed} ft</span>
      </p>
      <p className="species-card__desc">{truncated}</p>
    </div>
  )
}

// ─── Ability choice picker ─────────────────────────────────────────────────────

function AbilityChoicePicker({ race }: { race: Race }) {
  const { draft, updateDraft } = useCreation()
  const config = race.abilityScoreChoices!
  const chosen = Object.keys(draft.abilityScoreChoices)
  const maxChoices = config.choose

  const toggle = (ability: AbilityScore) => {
    const current = { ...draft.abilityScoreChoices }
    if (current[ability] !== undefined) {
      delete current[ability]
    } else if (Object.keys(current).length < maxChoices) {
      current[ability] = config.amount
    }
    updateDraft({ abilityScoreChoices: current })
  }

  return (
    <div className="ability-choice-picker">
      <p className="ability-choice-picker__label">
        Choose {maxChoices} {maxChoices === 1 ? 'ability' : 'abilities'} to gain +{config.amount}
        <span className="ability-choice-picker__count"> ({chosen.length}/{maxChoices} selected)</span>
      </p>
      <div className="ability-choice-picker__btns">
        {ABILITY_ORDER.map(ability => {
          const isChosen = draft.abilityScoreChoices[ability] !== undefined
          const isDisabled = !isChosen && chosen.length >= maxChoices
          return (
            <button
              key={ability}
              className={[
                'ability-choice-btn',
                isChosen    ? 'ability-choice-btn--selected' : '',
                isDisabled  ? 'ability-choice-btn--disabled'  : '',
              ].join(' ')}
              onClick={() => !isDisabled && toggle(ability)}
              disabled={isDisabled}
            >
              {ABILITY_ABBR[ability]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Species detail panel ──────────────────────────────────────────────────────

function SpeciesDetail({ race }: { race: Race }) {
  return (
    <div className="species-detail">
      {/* Header row */}
      <div className="species-detail__header">
        <div>
          <h2 className="species-detail__name">{race.name}</h2>
          <p className="species-detail__meta">
            {race.size.charAt(0).toUpperCase() + race.size.slice(1)} · {race.speed} ft · {race.languages.join(', ')}
          </p>
        </div>
        <AbilityTags race={race} />
      </div>

      {/* Full description */}
      <p className="species-detail__desc">{race.description}</p>

      {/* Ability score choices picker */}
      {race.abilityScoreChoices && (
        <AbilityChoicePicker race={race} />
      )}

      {/* Traits */}
      {race.traits.length > 0 && (
        <div className="species-detail__section">
          <h4 className="species-detail__section-title">Traits</h4>
          <ul className="trait-list">
            {race.traits.map(trait => (
              <li key={trait.name} className="trait-item trait-item--green">
                <span className="trait-item__name">{trait.name}.</span>{' '}
                <span className="trait-item__desc">{trait.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Drawbacks */}
      {race.drawbacks && race.drawbacks.length > 0 && (
        <div className="species-detail__section">
          <h4 className="species-detail__section-title species-detail__section-title--drawback">
            Drawbacks
          </h4>
          <ul className="trait-list">
            {race.drawbacks.map(d => (
              <li key={d.name} className="trait-item trait-item--red">
                <span className="trait-item__name">{d.name}.</span>{' '}
                <span className="trait-item__desc">{d.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Advanced / Restricted warning */}
      {(race.tier === 'advanced' || race.tier === 'restricted') && (
        <p className="species-detail__advanced-warning">
          ⚠ This species requires GM approval before use.
        </p>
      )}
    </div>
  )
}

// ─── SpeciesStep ──────────────────────────────────────────────────────────────

export default function SpeciesStep() {
  const { draft, updateDraft } = useCreation()
  const races = getAllRaces()

  // Reset ability score choices when the selected race changes
  useEffect(() => {
    updateDraft({ abilityScoreChoices: {} })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.raceId])

  const handleSelect = (id: string) => {
    updateDraft({ raceId: id, subclassId: null })
  }

  if (races.length === 0) {
    return (
      <div>
        <div className="step-intro">
          <h2 className="step-intro__title">Choose Your Species</h2>
        </div>
        <div className="empty-state">
          No species available. Check that modules are loaded.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Choose Your Species</h2>
        <p className="step-intro__desc">
          Your species shapes your body, your instincts, and where you came from.
          Standard species are available to all players; advanced species require GM approval.
        </p>
      </div>

      <CardPicker
        items={races}
        selectedId={draft.raceId}
        onSelect={handleSelect}
        renderCard={(race, isSelected) => (
          <SpeciesCard race={race} isSelected={isSelected} />
        )}
        renderDetail={race => <SpeciesDetail race={race} />}
        searchPlaceholder="Search species…"
        groupBy={groupSpecies}
      />
    </div>
  )
}
