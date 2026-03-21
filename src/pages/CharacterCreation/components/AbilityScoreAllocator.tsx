import type { AbilityScore } from '../../../types/module'
import type { CreationDraft } from '../CreationContext'

// ─── Shared constants ─────────────────────────────────────────────────────────

export const ABILITY_KEYS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'] as const
export type AbilityKey = (typeof ABILITY_KEYS)[number]

export const ABILITIES: {
  abbr: AbilityKey
  full: AbilityScore
  label: string
  icon: string
}[] = [
  { abbr: 'STR', full: 'strength',     label: 'Strength',     icon: '⚔' },
  { abbr: 'DEX', full: 'dexterity',    label: 'Dexterity',    icon: '⚡' },
  { abbr: 'CON', full: 'constitution', label: 'Constitution',  icon: '◆' },
  { abbr: 'INT', full: 'intelligence', label: 'Intelligence',  icon: '✦' },
  { abbr: 'WIS', full: 'wisdom',       label: 'Wisdom',        icon: '◎' },
  { abbr: 'CHA', full: 'charisma',     label: 'Charisma',      icon: '❋' },
]

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8] as const

export const POINT_BUY_COST: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
}

export const POINT_BUY_TOTAL = 27

export function computePointsSpent(scores: Record<string, number>): number {
  return ABILITIES.reduce((sum, ab) => sum + (POINT_BUY_COST[scores[ab.abbr] || 8] ?? 0), 0)
}

// Roll 4d6 drop the lowest — standard D&D ability score method (result: 3–18)
export function roll4d6DropLowest(): number {
  const dice = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
  dice.sort((a, b) => a - b)
  return dice[1] + dice[2] + dice[3]
}

function getModifier(total: number): string {
  const mod = Math.floor((total - 10) / 2)
  return (mod >= 0 ? '+' : '') + mod
}

function availableForSlot(abbr: AbilityKey, scores: Record<string, number>): number[] {
  const usedElsewhere = ABILITIES
    .filter(ab => ab.abbr !== abbr && (scores[ab.abbr] ?? 0) > 0)
    .map(ab => scores[ab.abbr])
  return STANDARD_ARRAY.filter(v => !usedElsewhere.includes(v))
}

// ─── Mode-specific inputs ──────────────────────────────────────────────────────

function StandardArraySelect({
  abbr, scores, onChange,
}: { abbr: AbilityKey; scores: Record<string, number>; onChange: (v: number) => void }) {
  const available = availableForSlot(abbr, scores)
  const current = scores[abbr] ?? 0
  return (
    <select
      className="ability-input ability-input--select"
      value={current || ''}
      onChange={e => onChange(e.target.value ? parseInt(e.target.value) : 0)}
    >
      <option value="">— assign —</option>
      {STANDARD_ARRAY.map(v => (
        <option key={v} value={v} disabled={!available.includes(v) && v !== current}>
          {v}
        </option>
      ))}
    </select>
  )
}

function PointBuyControl({
  abbr, scores, remaining, onChange,
}: { abbr: AbilityKey; scores: Record<string, number>; remaining: number; onChange: (v: number) => void }) {
  const score   = scores[abbr] ?? 8
  const canDec  = score > 8
  const nextCost = score < 15 ? (POINT_BUY_COST[score + 1] ?? 99) - (POINT_BUY_COST[score] ?? 0) : 99
  const canInc  = score < 15 && remaining >= nextCost
  return (
    <div className="ability-input ability-input--pointbuy">
      <button className="pb-btn" onClick={() => canDec && onChange(score - 1)} disabled={!canDec} aria-label="Decrease">−</button>
      <span className="pb-score">{score}</span>
      <button className="pb-btn" onClick={() => canInc && onChange(score + 1)} disabled={!canInc} aria-label="Increase">+</button>
    </div>
  )
}

function ManualInput({
  abbr, scores, onChange,
}: { abbr: AbilityKey; scores: Record<string, number>; onChange: (v: number) => void }) {
  return (
    <input
      type="number"
      className="ability-input ability-input--manual"
      min={1}
      max={30}
      placeholder="—"
      value={scores[abbr] || ''}
      onChange={e => {
        const v = parseInt(e.target.value)
        if (!isNaN(v) && v >= 1 && v <= 30) onChange(v)
        else if (e.target.value === '') onChange(0)
      }}
    />
  )
}

// ─── Single ability box ────────────────────────────────────────────────────────

function AbilityBox({
  ab, scores, racialBonus, method, remaining, onChange,
}: {
  ab: (typeof ABILITIES)[number]
  scores: Record<string, number>
  racialBonus: number
  method: CreationDraft['abilityScoreMethod']
  remaining: number
  onChange: (abbr: AbilityKey, v: number) => void
}) {
  const base     = scores[ab.abbr] ?? 0
  const total    = base > 0 ? base + racialBonus : 0
  const mod      = base > 0 ? getModifier(total) : '—'
  const hasBonus = racialBonus !== 0
  const modNum   = base > 0 ? Math.floor((total - 10) / 2) : null

  return (
    <div className="ability-box">
      {/* Crimson header */}
      <div className="ability-box__header">
        <span className="ability-box__icon">{ab.icon}</span>
        <span className="ability-box__name">{ab.label.toUpperCase()}</span>
      </div>

      {/* Mode input */}
      <div className="ability-box__input-area">
        {method === 'standard-array' && (
          <StandardArraySelect abbr={ab.abbr} scores={scores} onChange={v => onChange(ab.abbr, v)} />
        )}
        {method === 'point-buy' && (
          <PointBuyControl abbr={ab.abbr} scores={scores} remaining={remaining} onChange={v => onChange(ab.abbr, v)} />
        )}
        {method === 'manual' && (
          <ManualInput abbr={ab.abbr} scores={scores} onChange={v => onChange(ab.abbr, v)} />
        )}
      </div>

      {/* Stat rows */}
      <div className="ability-box__stats">
        <div className="ability-box__stat-row">
          <span className="ability-box__stat-label">Base</span>
          <span className="ability-box__stat-value">{base || '—'}</span>
        </div>
        {hasBonus && (
          <div className="ability-box__stat-row">
            <span className="ability-box__stat-label">Racial</span>
            <span className={`ability-box__stat-value ${racialBonus > 0 ? 'ability-box__stat-value--pos' : 'ability-box__stat-value--neg'}`}>
              {racialBonus > 0 ? '+' : ''}{racialBonus}
            </span>
          </div>
        )}
        <div className="ability-box__stat-row ability-box__stat-row--total">
          <span className="ability-box__stat-label">Total</span>
          <span className="ability-box__stat-value">{base > 0 ? total : '—'}</span>
        </div>
      </div>

      {/* Big modifier */}
      <div className={`ability-box__modifier ${modNum !== null ? (modNum >= 0 ? 'ability-box__modifier--pos' : 'ability-box__modifier--neg') : ''}`}>
        {mod}
      </div>

      {/* Per-box roll button — only in manual mode */}
      {method === 'manual' && (
        <button
          type="button"
          className="ability-box__roll-btn"
          onClick={() => onChange(ab.abbr, roll4d6DropLowest())}
          title="Roll 4d6 drop lowest"
          aria-label={`Roll ${ab.label}`}
        >
          🎲 Roll
        </button>
      )}
    </div>
  )
}

// ─── Allocator ────────────────────────────────────────────────────────────────

interface AllocatorProps {
  scores: Record<string, number>
  method: CreationDraft['abilityScoreMethod']
  racialBonuses: Partial<Record<AbilityScore, number>>
  onChange: (abbr: AbilityKey, value: number) => void
  /** Called with a complete new scores object — avoids stale-closure issues with bulk ops */
  onBulkChange: (scores: Record<string, number>) => void
}

export default function AbilityScoreAllocator({
  scores, method, racialBonuses, onChange, onBulkChange,
}: AllocatorProps) {
  const spent     = method === 'point-buy' ? computePointsSpent(scores) : 0
  const remaining = POINT_BUY_TOTAL - spent

  const rollAll  = () => onBulkChange(Object.fromEntries(ABILITIES.map(ab => [ab.abbr, roll4d6DropLowest()])))
  const clearAll = () => onBulkChange(Object.fromEntries(ABILITIES.map(ab => [ab.abbr, 0])))

  return (
    <div>
      {/* Point buy info bar */}
      {method === 'point-buy' && (
        <div className={`pb-info-bar ${remaining === 0 ? 'pb-info-bar--done' : ''}`}>
          <span>Points remaining:</span>
          <strong className="pb-info-bar__count">{remaining}</strong>
          <span className="pb-info-bar__total">/ {POINT_BUY_TOTAL}</span>
        </div>
      )}

      {/* Standard array chips */}
      {method === 'standard-array' && (() => {
        const assigned   = ABILITIES.map(ab => scores[ab.abbr] ?? 0).filter(v => v > 0)
        const unassigned = STANDARD_ARRAY.filter(v => !assigned.includes(v))
        return (
          <div className="sa-chips-row">
            <span className="sa-chips-label">Values to assign:</span>
            <div className="sa-chips">
              {STANDARD_ARRAY.map(v => (
                <span key={v} className={`sa-chip ${!unassigned.includes(v) ? 'sa-chip--used' : ''}`}>{v}</span>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Manual mode toolbar */}
      {method === 'manual' && (
        <div className="roll-all-bar">
          <span className="roll-all-bar__label">4d6 drop lowest per score</span>
          <button type="button" className="roll-all-btn" onClick={rollAll}>🎲 Roll All</button>
          <button type="button" className="roll-all-btn roll-all-btn--clear" onClick={clearAll}>Clear</button>
        </div>
      )}

      {/* Ability boxes */}
      <div className="ability-grid">
        {ABILITIES.map(ab => (
          <AbilityBox
            key={ab.abbr}
            ab={ab}
            scores={scores}
            racialBonus={racialBonuses[ab.full] ?? 0}
            method={method}
            remaining={remaining}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  )
}
