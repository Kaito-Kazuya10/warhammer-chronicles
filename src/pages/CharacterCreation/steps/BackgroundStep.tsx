import { useState, useEffect, useRef } from 'react'
import type { Background } from '../../../types/module'
import { getAllBackgrounds } from '../../../modules/registry'
import { useCreation } from '../CreationContext'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSkillName(skill: string): string {
  return skill.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase())
}

// ─── Custom dropdown ──────────────────────────────────────────────────────────

function BackgroundSelect({
  backgrounds,
  selectedId,
  onSelect,
}: {
  backgrounds: Background[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const standard   = backgrounds.filter(b => !b.special)
  const restricted = backgrounds.filter(b =>  b.special)
  const selected   = selectedId ? backgrounds.find(b => b.id === selectedId) ?? null : null

  const pick = (id: string | null) => {
    onSelect(id)
    setIsOpen(false)
  }

  return (
    <div className="bg-select" ref={wrapRef}>
      {/* Trigger */}
      <button
        type="button"
        className={`bg-select__trigger${isOpen ? ' bg-select__trigger--open' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selected ? 'bg-select__value' : 'bg-select__placeholder'}>
          {selected ? selected.name : '— Select a Background —'}
        </span>
        <span className="bg-select__arrow" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="bg-select__dropdown" role="listbox">
          {/* Clear option */}
          <div
            className={`bg-select__option${!selectedId ? ' bg-select__option--selected' : ''}`}
            role="option"
            aria-selected={!selectedId}
            onClick={() => pick(null)}
          >
            — Select a Background —
          </div>

          {/* Standard group */}
          {standard.length > 0 && (
            <>
              <div className="bg-select__group-header">Standard Backgrounds</div>
              {standard.map(b => (
                <div
                  key={b.id}
                  className={`bg-select__option${selectedId === b.id ? ' bg-select__option--selected' : ''}`}
                  role="option"
                  aria-selected={selectedId === b.id}
                  onClick={() => pick(b.id)}
                >
                  {b.name}
                </div>
              ))}
            </>
          )}

          {/* Restricted group */}
          {restricted.length > 0 && (
            <>
              <div className="bg-select__group-header bg-select__group-header--restricted">
                ⚠ Restricted — Requires GM Approval
              </div>
              {restricted.map(b => (
                <div
                  key={b.id}
                  className={`bg-select__option bg-select__option--restricted${selectedId === b.id ? ' bg-select__option--selected' : ''}`}
                  role="option"
                  aria-selected={selectedId === b.id}
                  onClick={() => pick(b.id)}
                >
                  {b.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────

function AccordionSection({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: {
  id: string
  title: string
  isOpen: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-header"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-chevron" aria-hidden="true">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>
      <div className={`accordion-body${isOpen ? ' accordion-body--open' : ''}`}>
        <div className="accordion-body__inner">
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function BackgroundDetail({ bg }: { bg: Background }) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(['feature', 'skills']),
  )

  // Reset open sections when background changes
  useEffect(() => {
    setOpenSections(new Set(['feature', 'skills']))
  }, [bg.id])

  const toggle = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const hasProfs = (bg.toolProficiencies?.length ?? 0) > 0
    || (bg.languages?.length ?? 0) > 0
    || (bg.languageChoices ?? 0) > 0

  return (
    <div className="bg-detail">
      {/* Feature */}
      <AccordionSection
        id="feature"
        title="Background Feature"
        isOpen={openSections.has('feature')}
        onToggle={toggle}
      >
        <p className="bg-feature-name">{bg.feature.name}</p>
        <p className="bg-feature-desc">{bg.feature.description}</p>
      </AccordionSection>

      {/* Skills */}
      <AccordionSection
        id="skills"
        title="Skill Proficiencies"
        isOpen={openSections.has('skills')}
        onToggle={toggle}
      >
        <ul className="bg-list">
          {bg.skillProficiencies.map(skill => (
            <li key={skill} className="bg-list__item bg-list__item--skill">
              {formatSkillName(skill)}
            </li>
          ))}
        </ul>
        <p className="bg-list__note">These will be automatically applied to your character.</p>
      </AccordionSection>

      {/* Proficiencies & Languages */}
      {hasProfs && (
        <AccordionSection
          id="proficiencies"
          title="Proficiencies & Languages"
          isOpen={openSections.has('proficiencies')}
          onToggle={toggle}
        >
          {bg.toolProficiencies && bg.toolProficiencies.length > 0 && (
            <div className="bg-prof-group">
              <p className="bg-prof-group__label">Tool Proficiencies</p>
              <ul className="bg-list">
                {bg.toolProficiencies.map(t => (
                  <li key={t} className="bg-list__item">{t}</li>
                ))}
              </ul>
            </div>
          )}
          {bg.languages && bg.languages.length > 0 && (
            <div className="bg-prof-group">
              <p className="bg-prof-group__label">Languages</p>
              <ul className="bg-list">
                {bg.languages.map(l => (
                  <li key={l} className="bg-list__item">{l}</li>
                ))}
              </ul>
            </div>
          )}
          {bg.languageChoices && bg.languageChoices > 0 ? (
            <p className="bg-list__note">
              Choose {bg.languageChoices} additional language{bg.languageChoices > 1 ? 's' : ''} of your choice.
            </p>
          ) : null}
        </AccordionSection>
      )}

      {/* Starting Equipment */}
      <AccordionSection
        id="equipment"
        title="Starting Equipment"
        isOpen={openSections.has('equipment')}
        onToggle={toggle}
      >
        <ul className="bg-list">
          {bg.startingEquipment.map((item, i) => (
            <li key={i} className="bg-list__item">{item}</li>
          ))}
        </ul>
      </AccordionSection>
    </div>
  )
}

// ─── BackgroundStep ───────────────────────────────────────────────────────────

export default function BackgroundStep() {
  const { draft, updateDraft } = useCreation()
  const backgrounds = getAllBackgrounds()
  const selected = draft.backgroundId
    ? backgrounds.find(b => b.id === draft.backgroundId) ?? null
    : null

  if (backgrounds.length === 0) {
    return (
      <div>
        <div className="step-intro">
          <h2 className="step-intro__title">Choose Your Background</h2>
        </div>
        <div className="empty-state">
          No backgrounds available. Check that modules are loaded.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="step-intro">
        <h2 className="step-intro__title">Choose Your Background</h2>
        <p className="step-intro__desc">
          Your background reflects who you were before your career began — the experiences,
          skills, and contacts that shaped you. Background selection is optional.
        </p>
      </div>

      <BackgroundSelect
        backgrounds={backgrounds}
        selectedId={draft.backgroundId}
        onSelect={id => updateDraft({ backgroundId: id })}
      />

      {/* Restricted warning */}
      {selected?.special && (
        <div className="bg-restricted-banner" role="alert">
          ⚠ This background requires GM approval before play.
        </div>
      )}

      {/* Detail panel */}
      {selected && <BackgroundDetail bg={selected} />}
    </div>
  )
}
