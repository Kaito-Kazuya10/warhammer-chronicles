import { useState } from 'react'
import { getAllClasses, getAllBackgrounds } from '../../../modules/registry'
import { useCreation } from '../CreationContext'

// ─── Parsing ──────────────────────────────────────────────────────────────────

interface ChoiceEntry  { kind: 'choice'; index: number; optionA: string; optionB: string }
interface GrantedEntry { kind: 'grant';  index: number; item: string }
type EquipEntry = ChoiceEntry | GrantedEntry

const CHOICE_RE = /^\(a\)\s*(.+?)\s+or\s+\(b\)\s*(.+)$/i

function parseOptions(options: string[]): EquipEntry[] {
  return options.map((str, i) => {
    const m = str.match(CHOICE_RE)
    if (m) return { kind: 'choice', index: i, optionA: m[1].trim(), optionB: m[2].trim() }
    return { kind: 'grant', index: i, item: str }
  })
}

// ─── Wealth roller ────────────────────────────────────────────────────────────

function roll5d4(): { dice: number[]; total: number } {
  const dice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 4) + 1)
  return { dice, total: dice.reduce((a, b) => a + b, 0) * 10 }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GrantedRow({ item }: { item: string }) {
  return (
    <div className="equip-granted-row">
      <span className="equip-granted-row__check">✓</span>
      <span className="equip-granted-row__text">{item}</span>
    </div>
  )
}

function ChoiceGroup({
  entry,
  selected,
  onSelect,
}: {
  entry: ChoiceEntry
  selected: string | undefined
  onSelect: (letter: string) => void
}) {
  const options = [
    { letter: 'a', label: entry.optionA },
    { letter: 'b', label: entry.optionB },
  ]
  return (
    <div className="equip-choice-group">
      <p className="equip-choice-group__label">Equipment Choice {entry.index + 1}</p>
      <div className="equip-radio-list">
        {options.map(opt => {
          const isSelected = selected === opt.letter
          return (
            <div
              key={opt.letter}
              className={`equip-radio-row${isSelected ? ' equip-radio-row--selected' : ''}`}
              onClick={() => onSelect(opt.letter)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelect(opt.letter)}
            >
              <div className="equip-radio-circle">
                {isSelected && <div className="equip-radio-dot" />}
              </div>
              <span className="equip-radio-label">{opt.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Starting wealth panel ────────────────────────────────────────────────────

function WealthPanel() {
  const { draft, updateDraft } = useCreation()
  const [rolledDice, setRolledDice] = useState<number[] | null>(null)

  const handleRoll = () => {
    const { dice, total } = roll5d4()
    setRolledDice(dice)
    updateDraft({ startingWealth: total })
  }

  const diceSum = rolledDice ? rolledDice.reduce((a, b) => a + b, 0) : null

  return (
    <div className="wealth-panel">
      <p className="wealth-panel__desc">
        You begin with <strong>5d4 × 10 Thrones</strong> instead of starting equipment.
      </p>

      <button type="button" className="roll-all-btn" onClick={handleRoll}>
        🎲 Roll Wealth
      </button>

      {rolledDice && (
        <div className="wealth-result">
          <span className="wealth-result__dice">
            Rolled: {rolledDice.join(', ')} = {diceSum}
          </span>
          <span className="wealth-result__calc"> × 10 = </span>
          <span className="wealth-result__total">{draft.startingWealth} Thrones</span>
        </div>
      )}

      <div className="wealth-manual">
        <label className="wealth-manual__label">Or enter amount:</label>
        <div className="wealth-manual__row">
          <input
            type="number"
            className="wealth-manual__input"
            min={1}
            placeholder="e.g. 120"
            value={draft.startingWealth ?? ''}
            onChange={e => {
              const v = parseInt(e.target.value)
              updateDraft({ startingWealth: isNaN(v) ? null : v })
              setRolledDice(null)
            }}
          />
          <span className="wealth-manual__unit">Thrones</span>
        </div>
      </div>

      <p className="wealth-panel__note">
        Note: Background equipment is still granted regardless of this choice.
      </p>
    </div>
  )
}

// ─── EquipmentStep ────────────────────────────────────────────────────────────

export default function EquipmentStep() {
  const { draft, updateDraft } = useCreation()

  const cls = draft.classId
    ? getAllClasses().find(c => c.id === draft.classId) ?? null
    : null
  const bg = draft.backgroundId
    ? getAllBackgrounds().find(b => b.id === draft.backgroundId) ?? null
    : null

  const parsed  = parseOptions(cls?.startingEquipmentOptions ?? [])
  const choices = parsed.filter((e): e is ChoiceEntry  => e.kind === 'choice')
  const grants  = parsed.filter((e): e is GrantedEntry => e.kind === 'grant')

  const allChoicesMade = choices.every(e =>
    draft.equipmentChoices[String(e.index)] !== undefined
  )

  const setChoice = (index: number, letter: string) =>
    updateDraft({ equipmentChoices: { ...draft.equipmentChoices, [String(index)]: letter } })

  const switchMode = (useWealth: boolean) =>
    updateDraft({ useStartingWealth: useWealth, startingWealth: null, equipmentChoices: {} })

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Choose Your Equipment</h2>
        <p className="step-intro__desc">
          Select your starting gear or take starting wealth to purchase your own.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="method-section">
        <div className="method-selector">
          <button
            type="button"
            className={`method-btn${!draft.useStartingWealth ? ' method-btn--active' : ''}`}
            onClick={() => switchMode(false)}
          >
            Starting Equipment
          </button>
          <button
            type="button"
            className={`method-btn${draft.useStartingWealth ? ' method-btn--active' : ''}`}
            onClick={() => switchMode(true)}
          >
            Starting Wealth
          </button>
        </div>
      </div>

      {!draft.useStartingWealth ? (
        /* ── Equipment mode ── */
        <>
          {cls ? (
            <div className="equip-section">
              <h3 className="equip-section__title">From {cls.name}</h3>

              {/* Choice groups (radio) */}
              {choices.length > 0 && (
                <div className="equip-choices">
                  {choices.map(entry => (
                    <ChoiceGroup
                      key={entry.index}
                      entry={entry}
                      selected={draft.equipmentChoices[String(entry.index)]}
                      onSelect={letter => setChoice(entry.index, letter)}
                    />
                  ))}
                </div>
              )}

              {/* Auto-granted items */}
              {grants.length > 0 && (
                <div className="equip-grants">
                  <p className="equip-grants__label">Also included:</p>
                  {grants.map(e => <GrantedRow key={e.index} item={e.item} />)}
                </div>
              )}

              {choices.length > 0 && !allChoicesMade && (
                <p className="equip-incomplete-note">
                  Make a selection for each choice above to continue.
                </p>
              )}
            </div>
          ) : (
            <p className="equip-no-class">No class selected — go back to Step 2.</p>
          )}

          {/* Background auto-grants */}
          {bg && bg.startingEquipment.length > 0 && (
            <div className="equip-section">
              <h3 className="equip-section__title">From {bg.name}</h3>
              <div className="equip-grants">
                {bg.startingEquipment.map((item, i) => <GrantedRow key={i} item={item} />)}
              </div>
            </div>
          )}
        </>
      ) : (
        /* ── Wealth mode ── */
        <>
          <WealthPanel />

          {bg && bg.startingEquipment.length > 0 && (
            <div className="equip-section" style={{ marginTop: '24px' }}>
              <h3 className="equip-section__title">From {bg.name} (still granted)</h3>
              <div className="equip-grants">
                {bg.startingEquipment.map((item, i) => <GrantedRow key={i} item={item} />)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
