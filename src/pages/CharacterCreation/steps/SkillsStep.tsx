import { getAllClasses, getAllBackgrounds } from '../../../modules/registry'
import { useCreation } from '../CreationContext'
import SkillPicker, { formatSkillName, SKILL_ABILITY } from '../components/SkillPicker'

// ─── Background auto-grant row ────────────────────────────────────────────────

function BgSkillRow({ skill }: { skill: string }) {
  return (
    <div className="skill-row skill-row--disabled skill-row--checked skill-row--bg">
      <div className="skill-checkbox skill-checkbox--checked skill-checkbox--bg">
        <span className="skill-checkbox__check">✓</span>
      </div>
      <div className="skill-row__info">
        <span className="skill-row__name">{formatSkillName(skill)}</span>
        <span className="skill-row__note">(from Background)</span>
      </div>
      <span className="skill-row__ability">{SKILL_ABILITY[skill] ?? '—'}</span>
    </div>
  )
}

// ─── SkillsStep ───────────────────────────────────────────────────────────────

export default function SkillsStep() {
  const { draft, updateDraft } = useCreation()

  const cls = draft.classId
    ? getAllClasses().find(c => c.id === draft.classId) ?? null
    : null
  const bg = draft.backgroundId
    ? getAllBackgrounds().find(b => b.id === draft.backgroundId) ?? null
    : null

  const classSkills      = cls?.skillChoices   ?? []
  const numChoices       = cls?.numSkillChoices ?? 0
  const backgroundSkills = (bg?.skillProficiencies ?? []) as string[]

  const remaining = numChoices - draft.selectedSkills.length
  const done      = remaining === 0

  const handleToggle = (skill: string) => {
    const current = draft.selectedSkills
    if (current.includes(skill)) {
      updateDraft({ selectedSkills: current.filter(s => s !== skill) })
    } else if (current.length < numChoices) {
      updateDraft({ selectedSkills: [...current, skill] })
    }
  }

  // Edge case: no class selected yet
  if (!cls) {
    return (
      <div className="step-placeholder">
        <p className="step-placeholder__label">Step 5</p>
        <h2 className="step-placeholder__title">Skills</h2>
        <p style={{ color: 'var(--creation-text-secondary)', fontSize: '14px', marginTop: '8px' }}>
          No class selected. Go back to Step 2 to choose a class.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Choose Your Skills</h2>
        <p className="step-intro__desc">
          Skills represent your character's trained capabilities beyond raw ability scores.
          Your background grants skills automatically; you choose additional skills from your class list.
        </p>
      </div>

      {/* Counter */}
      <div className={`skills-counter ${done ? 'skills-counter--done' : ''}`}>
        {done
          ? '✓ All skills selected'
          : `Select ${remaining} more skill${remaining !== 1 ? 's' : ''}`
        }
      </div>

      {/* Background auto-granted skills */}
      {bg && backgroundSkills.length > 0 && (
        <div className="skills-section">
          <h3 className="skills-section__title">From {bg.name}</h3>
          <div className="skills-list">
            {backgroundSkills.map(skill => (
              <BgSkillRow key={skill} skill={skill} />
            ))}
          </div>
        </div>
      )}

      {/* Class skill choices */}
      <SkillPicker
        classSkills={classSkills}
        numChoices={numChoices}
        backgroundSkills={backgroundSkills}
        selectedSkills={draft.selectedSkills}
        onToggle={handleToggle}
        className={cls.name}
      />
    </div>
  )
}
