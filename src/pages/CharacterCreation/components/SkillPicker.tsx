// ─── Skill → governing ability mapping ───────────────────────────────────────

export const SKILL_ABILITY: Record<string, string> = {
  acrobatics:     'DEX',
  animalHandling: 'WIS',
  athletics:      'STR',
  deception:      'CHA',
  history:        'INT',
  insight:        'WIS',
  intimidation:   'CHA',
  investigation:  'INT',
  medicine:       'WIS',
  nature:         'INT',
  perception:     'WIS',
  performance:    'CHA',
  persuasion:     'CHA',
  religion:       'INT',
  sleightOfHand:  'DEX',
  stealth:        'DEX',
  survival:       'WIS',
  xenology:       'INT',
  technology:     'INT',
  warpControl:    'WIS',
}

export function formatSkillName(skill: string): string {
  return skill.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())
}

// ─── Single skill row ─────────────────────────────────────────────────────────

interface SkillRowProps {
  skill: string
  isChecked: boolean
  isDisabled: boolean
  note?: string
  onClick?: () => void
}

function SkillRow({ skill, isChecked, isDisabled, note, onClick }: SkillRowProps) {
  const handleClick = !isDisabled ? onClick : undefined

  return (
    <div
      className={[
        'skill-row',
        isDisabled ? 'skill-row--disabled' : 'skill-row--clickable',
        isChecked  ? 'skill-row--checked'  : '',
      ].join(' ')}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      onKeyDown={e => e.key === 'Enter' && handleClick?.()}
    >
      {/* Custom checkbox square */}
      <div className={[
        'skill-checkbox',
        isChecked  ? 'skill-checkbox--checked'  : '',
        isDisabled ? 'skill-checkbox--disabled' : '',
      ].join(' ')}>
        {isChecked && <span className="skill-checkbox__check">✓</span>}
      </div>

      {/* Name + optional note */}
      <div className="skill-row__info">
        <span className="skill-row__name">{formatSkillName(skill)}</span>
        {note && <span className="skill-row__note">{note}</span>}
      </div>

      {/* Governing ability badge */}
      <span className="skill-row__ability">{SKILL_ABILITY[skill] ?? '—'}</span>
    </div>
  )
}

// ─── SkillPicker ──────────────────────────────────────────────────────────────

interface SkillPickerProps {
  /** All skill options offered by the class */
  classSkills: string[]
  /** How many the player must pick */
  numChoices: number
  /** Skills already granted by background (shown as locked/pre-checked if they overlap) */
  backgroundSkills: string[]
  /** Player's current selections stored in draft.selectedSkills */
  selectedSkills: string[]
  onToggle: (skill: string) => void
  className: string
}

export default function SkillPicker({
  classSkills,
  numChoices,
  backgroundSkills,
  selectedSkills,
  onToggle,
  className,
}: SkillPickerProps) {
  const atLimit = selectedSkills.length >= numChoices

  return (
    <div className="skills-section">
      <h3 className="skills-section__title">
        From {className} — choose {numChoices}
      </h3>
      <div className="skills-list">
        {classSkills.map(skill => {
          const isFromBg   = backgroundSkills.includes(skill)
          const isSelected = selectedSkills.includes(skill)
          // Disable if: granted by background, OR cap reached and not already selected
          const isDisabled = isFromBg || (!isSelected && atLimit)

          return (
            <SkillRow
              key={skill}
              skill={skill}
              isChecked={isFromBg || isSelected}
              isDisabled={isDisabled}
              note={isFromBg ? '(already from Background)' : undefined}
              onClick={() => onToggle(skill)}
            />
          )
        })}
      </div>
    </div>
  )
}
