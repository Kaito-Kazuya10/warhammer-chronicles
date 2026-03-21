import { useState } from 'react'
import type { CharacterClass, Subclass } from '../../../types/module'
import { getAllClasses } from '../../../modules/registry'
import { useCreation } from '../CreationContext'
import CardPicker from '../components/CardPicker'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ABILITY_ABBR: Record<string, string> = {
  strength: 'STR', dexterity: 'DEX', constitution: 'CON',
  intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA',
}

const SUBCLASS_LABEL: Record<string, string> = {
  'imperial-guardsman': 'Regiment',
}

function getSubclassLabel(classId: string): string {
  return SUBCLASS_LABEL[classId] ?? 'Specialization'
}

function getFirstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0] : text.slice(0, 100) + '…'
}

function stripBold(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, '$1')
}

function formatSkillName(skill: string): string {
  return skill.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function hasFightingStyleFeature(cls: CharacterClass): boolean {
  return cls.features.some(f => f.level === 1 && f.name.toLowerCase().includes('fighting style'))
}

function parseFightingStyles(cls: CharacterClass): { name: string; desc: string }[] {
  const feature = cls.features.find(
    f => f.level === 1 && f.name.toLowerCase().includes('fighting style'),
  )
  if (!feature) return []
  return feature.description
    .split('\n\n')
    .filter(chunk => chunk.trimStart().startsWith('**'))
    .map(chunk => {
      const match = chunk.match(/^\*\*([^*]+)\.\*\*\s*([\s\S]+)$/)
      if (!match) return null
      return { name: match[1].trim(), desc: match[2].trim() }
    })
    .filter((x): x is { name: string; desc: string } => x !== null)
}

// ─── Class card ────────────────────────────────────────────────────────────────

function ClassCard({
  cls,
  isExpanded,
  onToggle,
  onSelect,
}: {
  cls: CharacterClass
  isExpanded: boolean
  onToggle: () => void
  onSelect: () => void
}) {
  return (
    <div className={`class-card${isExpanded ? ' class-card--expanded' : ''}`}>
      {/* Header — always visible */}
      <div className="class-card__header" onClick={onToggle} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onToggle()}>
        <div className="class-card__header-left">
          <span className="class-card__name">{cls.name}</span>
          {!isExpanded && (
            <>
              <span className="class-card__summary">{getFirstSentence(cls.description)}</span>
              <div className="ability-tags" style={{ marginTop: '4px' }}>
                {cls.primaryAbility.map(ab => (
                  <span key={ab} className="ability-tag ability-tag--choice">
                    {ABILITY_ABBR[ab] ?? ab.toUpperCase()}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="class-card__header-right">
          <span className="class-card__hitdie">d{cls.hitDie}</span>
          <span className="class-card__chevron">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div className="class-card__body">
          <p className="class-card__desc">{cls.description}</p>

          <div className="class-card__details">
            {/* Primary abilities */}
            <div className="class-card__detail-row">
              <span className="class-card__detail-label">Primary Abilities</span>
              <div className="ability-tags">
                {cls.primaryAbility.map(ab => (
                  <span key={ab} className="ability-tag ability-tag--choice">
                    {ABILITY_ABBR[ab] ?? ab.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Saving throws */}
            <div className="class-card__detail-row">
              <span className="class-card__detail-label">Saving Throws</span>
              <div className="ability-tags">
                {cls.savingThrows.map(ab => (
                  <span key={ab} className="ability-tag ability-tag--pos">
                    {ABILITY_ABBR[ab] ?? ab.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Armor */}
            {cls.armorProficiencies && cls.armorProficiencies.length > 0 && (
              <div className="class-card__detail-row">
                <span className="class-card__detail-label">Armor</span>
                <span className="class-card__detail-value">
                  {cls.armorProficiencies.map(capitalize).join(', ')}
                </span>
              </div>
            )}

            {/* Weapons */}
            {cls.weaponProficiencies && cls.weaponProficiencies.length > 0 && (
              <div className="class-card__detail-row">
                <span className="class-card__detail-label">Weapons</span>
                <span className="class-card__detail-value">
                  {cls.weaponProficiencies.map(capitalize).join(', ')}
                </span>
              </div>
            )}

            {/* Tools */}
            {cls.toolProficiencies && cls.toolProficiencies.length > 0 && (
              <div className="class-card__detail-row">
                <span className="class-card__detail-label">Tools</span>
                <span className="class-card__detail-value">
                  {cls.toolProficiencies.join(', ')}
                </span>
              </div>
            )}

            {/* Skills */}
            <div className="class-card__detail-row class-card__detail-row--block">
              <span className="class-card__detail-label">
                Skills (choose {cls.numSkillChoices})
              </span>
              <span className="class-card__detail-value">
                {cls.skillChoices.map(formatSkillName).join(', ')}
              </span>
            </div>

            {/* Starting equipment */}
            {cls.startingEquipmentOptions && cls.startingEquipmentOptions.length > 0 && (
              <div className="class-card__detail-row class-card__detail-row--block">
                <span className="class-card__detail-label">Starting Equipment</span>
                <ul className="class-card__equip-list">
                  {cls.startingEquipmentOptions.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            className="class-select-btn"
            onClick={e => { e.stopPropagation(); onSelect() }}
          >
            Select This Class
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Selected class summary bar ───────────────────────────────────────────────

function SelectedClassBar({ cls, onClear }: { cls: CharacterClass; onClear: () => void }) {
  return (
    <div className="selected-class-bar">
      <div className="selected-class-bar__left">
        <span className="selected-class-bar__eyebrow">Class</span>
        <div className="selected-class-bar__info">
          <span className="selected-class-bar__name">{cls.name}</span>
          <span className="class-card__hitdie">d{cls.hitDie}</span>
          <div className="ability-tags">
            {cls.primaryAbility.map(ab => (
              <span key={ab} className="ability-tag ability-tag--choice">
                {ABILITY_ABBR[ab] ?? ab.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button className="selected-class-bar__change" onClick={onClear}>
        Change
      </button>
    </div>
  )
}

// ─── Subclass card + detail ────────────────────────────────────────────────────

function SubclassCard({ sub, isSelected }: { sub: Subclass; isSelected: boolean }) {
  const truncated = sub.description.length > 100
    ? sub.description.slice(0, 97) + '…'
    : sub.description
  return (
    <div className={`species-card${isSelected ? ' species-card--selected' : ''}`}>
      <p className="species-card__name">{sub.name}</p>
      <p className="species-card__desc">{truncated}</p>
    </div>
  )
}

function SubclassDetail({ sub }: { sub: Subclass }) {
  const level1Features = sub.features.filter(f => f.level === 1)
  return (
    <div className="subclass-detail">
      <h3 className="subclass-detail__name">{sub.name}</h3>
      <p className="subclass-detail__desc">{sub.description}</p>
      {level1Features.length > 0 && (
        <div className="species-detail__section">
          <h4 className="species-detail__section-title">Starting Features</h4>
          <ul className="trait-list">
            {level1Features.map(f => {
              const preview = stripBold(f.description).split('\n\n')[0]
              const trimmed = preview.length > 150 ? preview.slice(0, 147) + '…' : preview
              return (
                <li key={f.name} className="trait-item trait-item--green">
                  <span className="trait-item__name">{f.name}.</span>{' '}
                  <span className="trait-item__desc">{trimmed}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

// ─── Fighting style picker ─────────────────────────────────────────────────────

function FightingStylePicker({ cls }: { cls: CharacterClass }) {
  const { draft, updateDraft } = useCreation()
  const styles = parseFightingStyles(cls)
  if (styles.length === 0) return null

  return (
    <div className="fighting-style-section">
      <h3 className="fighting-style-section__title">Fighting Style</h3>
      <p className="fighting-style-section__desc">
        Choose a fighting specialization that defines your combat approach.
      </p>
      <div className="fighting-style-list" role="radiogroup">
        {styles.map(style => {
          const isSelected = draft.fightingStyle === style.name
          return (
            <div
              key={style.name}
              className={`fighting-style-option${isSelected ? ' fighting-style-option--selected' : ''}`}
              onClick={() => updateDraft({ fightingStyle: style.name })}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && updateDraft({ fightingStyle: style.name })}
            >
              <div className="fighting-style-option__radio">
                <div className={`radio-dot${isSelected ? ' radio-dot--active' : ''}`} />
              </div>
              <div className="fighting-style-option__content">
                <span className="fighting-style-option__name">{style.name}</span>
                <span className="fighting-style-option__desc">{style.desc}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── ClassStep root ────────────────────────────────────────────────────────────

export default function ClassStep() {
  const { draft, updateDraft } = useCreation()
  const classes = getAllClasses()
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const selectedClass = draft.classId
    ? classes.find(c => c.id === draft.classId) ?? null
    : null

  const handleClassSelect = (cls: CharacterClass) => {
    updateDraft({ classId: cls.id, subclassId: null, fightingStyle: null })
    setExpandedId(null)
  }

  const handleClassClear = () => {
    updateDraft({ classId: null, subclassId: null, fightingStyle: null })
    setExpandedId(null)
    setQuery('')
  }

  const filtered = query.trim()
    ? classes.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : classes

  // ── Empty module state ────────────────────────────────────────────────────────
  if (classes.length === 0) {
    return (
      <div>
        <div className="step-intro">
          <h2 className="step-intro__title">Choose Your Class</h2>
        </div>
        <div className="empty-state">
          No classes available. Check that modules are loaded.
        </div>
      </div>
    )
  }

  // ── Phase 1: no class selected — show accordion ──────────────────────────────
  if (!selectedClass) {
    return (
      <div>
        <div className="step-intro">
          <h2 className="step-intro__title">Choose Your Class</h2>
          <p className="step-intro__desc">
            Your class determines your combat role, abilities, and how you've been trained to
            survive in the 41st Millennium.
          </p>
        </div>

        <div className="card-picker__search-wrap" style={{ marginBottom: '16px' }}>
          <span className="card-picker__search-icon">⌕</span>
          <input
            type="text"
            className="card-picker__search"
            placeholder="Search classes…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="card-picker__search-clear" onClick={() => setQuery('')}>×</button>
          )}
        </div>

        <div className="class-list">
          {filtered.map(cls => (
            <ClassCard
              key={cls.id}
              cls={cls}
              isExpanded={expandedId === cls.id}
              onToggle={() => setExpandedId(prev => prev === cls.id ? null : cls.id)}
              onSelect={() => handleClassSelect(cls)}
            />
          ))}
          {filtered.length === 0 && (
            <p className="card-picker__empty">No classes match "{query}"</p>
          )}
        </div>
      </div>
    )
  }

  // ── Phase 2: class selected — show summary + subclass + fighting style ────────
  const label = getSubclassLabel(selectedClass.id)
  const subclasses = selectedClass.subclasses ?? []
  // Show fighting style picker once subclass is chosen (or immediately if class has none)
  const showFightingStyle = hasFightingStyleFeature(selectedClass) &&
    (subclasses.length === 0 || !!draft.subclassId)

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Choose Your Class</h2>
        <p className="step-intro__desc">
          Your class determines your combat role, abilities, and how you've been trained to
          survive in the 41st Millennium.
        </p>
      </div>

      <SelectedClassBar cls={selectedClass} onClear={handleClassClear} />

      {subclasses.length > 0 && (
        <div className="subclass-section">
          <h3 className="subclass-section__title">Choose Your {label}</h3>
          <p className="subclass-section__desc">
            Your {label.toLowerCase()} defines your specialization within the {selectedClass.name} class.
          </p>
          <CardPicker
            items={subclasses}
            selectedId={draft.subclassId}
            onSelect={id => updateDraft({ subclassId: id })}
            renderCard={(sub, isSelected) => <SubclassCard sub={sub} isSelected={isSelected} />}
            renderDetail={sub => <SubclassDetail sub={sub} />}
            searchPlaceholder={`Search ${label.toLowerCase()}s…`}
          />
        </div>
      )}

      {showFightingStyle && <FightingStylePicker cls={selectedClass} />}
    </div>
  )
}
