import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllClasses, getAllRaces, getAllBackgrounds } from '../../../modules/registry'
import { useCreation } from '../CreationContext'
import { ABILITIES } from '../components/AbilityScoreAllocator'
import { formatSkillName } from '../components/SkillPicker'
import { useCharacterStore, getModifier } from '../../../store/characterStore'
import type { Skills, InventoryItem, AbilityScores } from '../../../types/character'
import type { CharacterClass, Background, Race, SkillName } from '../../../types/module'
import type { CreationDraft } from '../CreationContext'

// ─── Constants ────────────────────────────────────────────────────────────────

const CHOICE_RE = /^\(a\)\s*(.+?)\s+or\s+\(b\)\s*(.+)$/i

const ALL_SKILLS: SkillName[] = [
  'acrobatics', 'animalHandling', 'arcana', 'athletics',
  'deception', 'history', 'insight', 'intimidation',
  'investigation', 'medicine', 'nature', 'perception',
  'performance', 'persuasion', 'religion', 'sleightOfHand',
  'stealth', 'survival', 'xenology', 'technology', 'warpControl',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildFinalScores(draft: CreationDraft, race: Race | null): AbilityScores {
  const scores = {} as AbilityScores
  for (const ab of ABILITIES) {
    const base   = draft.baseAbilityScores[ab.abbr] ?? 0
    const racial = (race?.abilityScoreIncreases[ab.full] ?? 0)
                 + (draft.abilityScoreChoices[ab.full] ?? 0)
    scores[ab.full] = base + racial
  }
  return scores
}

function buildSkills(draft: CreationDraft, bg: Background | null): Skills {
  const record = Object.fromEntries(ALL_SKILLS.map(s => [s, false])) as Skills
  const proficient = new Set([...(bg?.skillProficiencies ?? []), ...draft.selectedSkills])
  for (const s of proficient) {
    if (s in record) record[s as SkillName] = true
  }
  return record
}

function resolveInventory(
  draft: CreationDraft,
  cls: CharacterClass | null,
  bg: Background | null,
): InventoryItem[] {
  const items: InventoryItem[] = []
  if (!draft.useStartingWealth && cls) {
    ;(cls.startingEquipmentOptions ?? []).forEach((opt, i) => {
      const m = opt.match(CHOICE_RE)
      if (m) {
        const choice = draft.equipmentChoices[String(i)]
        if (choice === 'a') items.push({ itemId: m[1].trim(), quantity: 1 })
        else if (choice === 'b') items.push({ itemId: m[2].trim(), quantity: 1 })
      } else {
        items.push({ itemId: opt, quantity: 1 })
      }
    })
  }
  bg?.startingEquipment.forEach(item => items.push({ itemId: item, quantity: 1 }))
  return items
}

function getDisplayEquipment(
  draft: CreationDraft,
  cls: CharacterClass | null,
): string[] {
  if (!cls) return []
  return (cls.startingEquipmentOptions ?? []).map((opt, i) => {
    const m = opt.match(CHOICE_RE)
    if (m) {
      const choice = draft.equipmentChoices[String(i)]
      if (choice === 'a') return m[1].trim()
      if (choice === 'b') return m[2].trim()
      return '(not selected)'
    }
    return opt
  })
}

function fmtMod(score: number): string {
  const m = getModifier(score)
  return (m >= 0 ? '+' : '') + m
}

// ─── Small display components ─────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="review-section-title">{children}</h3>
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="review-row">
      <span className="review-row__label">{label}</span>
      <span className="review-row__value">{value}</span>
    </div>
  )
}

// ─── ReviewStep ───────────────────────────────────────────────────────────────

export default function ReviewStep() {
  const navigate = useNavigate()
  const { draft, setNameError, editId } = useCreation()
  const { createCharacter, updateCharacter, setActiveCharacter, characters } = useCharacterStore()
  const [errors, setErrors]   = useState<string[]>([])
  const [forging, setForging] = useState(false)
  const errorsRef = useRef<HTMLDivElement>(null)

  const isEditMode = !!editId
  const existingCharacter = isEditMode ? characters.find(c => c.id === editId) : null

  // ── Resolve module data ────────────────────────────────────────────────────
  const race     = draft.raceId      ? getAllRaces().find(r => r.id === draft.raceId)           ?? null : null
  const cls      = draft.classId     ? getAllClasses().find(c => c.id === draft.classId)         ?? null : null
  const bg       = draft.backgroundId ? getAllBackgrounds().find(b => b.id === draft.backgroundId) ?? null : null
  const subclass = cls?.subclasses?.find(s => s.id === draft.subclassId) ?? null

  // ── Derived values ─────────────────────────────────────────────────────────
  const finalScores = buildFinalScores(draft, race)

  // abbr-keyed map for convenient render access
  const scoreByAbbr: Record<string, number> = {}
  for (const ab of ABILITIES) scoreByAbbr[ab.abbr] = finalScores[ab.full]

  const conMod = getModifier(scoreByAbbr['CON'] ?? 10)
  const dexMod = getModifier(scoreByAbbr['DEX'] ?? 10)
  const wisMod = getModifier(scoreByAbbr['WIS'] ?? 10)
  const hp     = (cls?.hitDie ?? 8) + conMod
  const speed  = race?.speed ?? 30

  const bgSkills       = (bg?.skillProficiencies ?? []) as string[]
  const proficientSet  = new Set([...bgSkills, ...draft.selectedSkills])
  const allProfSkills  = [...proficientSet]
  const passivePerc    = 10 + wisMod + (proficientSet.has('perception') ? 2 : 0)

  // Level 1 class features (exclude fighting style — shown separately)
  const clsFeatures1      = cls?.features.filter(f => f.level === 1) ?? []
  const fsFeat            = clsFeatures1.find(f => f.name.toLowerCase().includes('fighting style'))
  const otherFeatures1    = fsFeat ? clsFeatures1.filter(f => f !== fsFeat) : clsFeatures1
  const subFeatures1      = subclass?.features.filter(f => f.level === 1) ?? []

  // Languages + tool proficiencies merged from class and background
  const allLanguages  = [...(race?.languages ?? []), ...(bg?.languages ?? [])]
  const allToolProfs  = [...(cls?.toolProficiencies ?? []), ...(bg?.toolProficiencies ?? [])]

  // Equipment for display
  const classEquip = draft.useStartingWealth ? [] : getDisplayEquipment(draft, cls)
  const bgEquip    = bg?.startingEquipment ?? []

  // ── Validation + Forge / Save ─────────────────────────────────────────────
  const handleForge = () => {
    const errs: string[] = []
    const nameEmpty = !draft.name.trim()
    if (nameEmpty)         errs.push('Character name cannot be empty.')
    if (!draft.raceId)     errs.push('No species selected.')
    if (!draft.classId)    errs.push('No class selected.')
    if (!draft.subclassId && cls?.subclasses && cls.subclasses.length > 0)
      errs.push('No subclass selected.')
    if (ABILITIES.some(ab => (draft.baseAbilityScores[ab.abbr] ?? 0) === 0)) {
      errs.push('All ability scores must be assigned.')
    }

    if (errs.length > 0) {
      setErrors(errs)
      if (nameEmpty) setNameError(true)
      setTimeout(() => errorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 10)
      return
    }

    setErrors([])
    setNameError(false)
    setForging(true)

    const skills     = buildSkills(draft, bg)
    const proficiencies = [
      ...(cls?.armorProficiencies  ?? []),
      ...(cls?.weaponProficiencies ?? []),
      ...(cls?.toolProficiencies   ?? []),
      ...(bg?.toolProficiencies    ?? []),
    ]

    if (isEditMode && editId) {
      // ── EDIT MODE: update existing character, preserve untouched fields ──
      const level = existingCharacter?.level ?? 1
      const isLevel1 = level === 1

      updateCharacter(editId, {
        name:       draft.name.trim(),
        race:       draft.raceId!,
        class:      draft.classId!,
        subclass:   draft.subclassId ?? undefined,
        background: draft.backgroundId ?? '',
        abilityScores:            finalScores,
        skills,
        savingThrowProficiencies: cls?.savingThrows ?? [],
        // Only reset HP if still level 1
        ...(isLevel1 ? {
          maxHitPoints:     Math.max(1, hp),
          currentHitPoints: Math.max(1, hp),
        } : {}),
        speed,
        armorClass:       10 + dexMod,
        initiative:       dexMod,
        proficiencies,
        languages:    allLanguages,
        portrait:     draft.portrait ?? null,
        fightingStyle: draft.fightingStyle ?? undefined,
        updatedAt:    Date.now(),
      })

      setActiveCharacter(editId)
      navigate('/sheet')
    } else {
      // ── CREATE MODE: forge a new character ──
      const id         = createCharacter()
      const inventory  = resolveInventory(draft, cls, bg)

      updateCharacter(id, {
        name:       draft.name.trim(),
        race:       draft.raceId!,
        class:      draft.classId!,
        subclass:   draft.subclassId ?? undefined,
        background: draft.backgroundId ?? '',
        level:      1,
        abilityScores:            finalScores,
        skills,
        savingThrowProficiencies: cls?.savingThrows ?? [],
        maxHitPoints:     Math.max(1, hp),
        currentHitPoints: Math.max(1, hp),
        speed,
        armorClass:       10 + dexMod,
        initiative:       dexMod,
        proficiencyBonus: 2,
        warpExposure: 0,
        corruption:   0,
        faith:        0,
        currency: {
          thrones: draft.useStartingWealth ? (draft.startingWealth ?? 0) : 0,
          melt:    0,
          aquila:  0,
        },
        spellIds:     [],
        featIds:      [],
        inventory,
        proficiencies,
        languages:    allLanguages,
        portrait:     draft.portrait ?? null,
        fightingStyle: draft.fightingStyle ?? undefined,
      })

      setActiveCharacter(id)
      navigate('/sheet')
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="review-step">
      <div className="step-intro">
        <h2 className="step-intro__title">{isEditMode ? 'Review Changes' : 'Review Your Character'}</h2>
        <p className="step-intro__desc">
          {isEditMode
            ? 'Review your changes below. Existing progress (HP, inventory, XP, notes) will be preserved.'
            : "Check your choices below. When you're ready, forge your character and begin your service to the Emperor."}
        </p>
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="review-errors" ref={errorsRef}>
          {errors.map((e, i) => (
            <p key={i} className="review-error-item">⚠ {e}</p>
          ))}
        </div>
      )}

      <div className="review-card">

        {/* ── Identity ── */}
        <div className="review-identity">
          <div className="review-portrait">
            {draft.portrait ? (
              <img src={draft.portrait} alt="Character portrait" className="review-portrait__img" />
            ) : (
              <div className="review-portrait__placeholder">?</div>
            )}
          </div>
          <div className="review-identity__info">
            <h2 className="review-identity__name">{draft.name || 'Unnamed Warrior'}</h2>
            <p className="review-identity__line1">Level {existingCharacter?.level ?? 1} {race?.name ?? '—'} {cls?.name ?? '—'}</p>
            {subclass && <p className="review-identity__subclass">{subclass.name}</p>}
            <p className="review-identity__bg">Background: {bg?.name ?? 'None'}</p>
          </div>
        </div>

        {/* ── Ability Scores ── */}
        <div className="review-section">
          <SectionTitle>Ability Scores</SectionTitle>
          <div className="review-ability-grid">
            {ABILITIES.map(ab => {
              const total = scoreByAbbr[ab.abbr] ?? 0
              return (
                <div key={ab.abbr} className="review-ability-card">
                  <span className="review-ability-card__name">{ab.abbr}</span>
                  <span className="review-ability-card__score">{total || '—'}</span>
                  <span className="review-ability-card__mod">{total ? `(${fmtMod(total)})` : ''}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Derived Stats ── */}
        <div className="review-section">
          <SectionTitle>Derived Stats</SectionTitle>
          <div className="review-stats-grid">
            <ReviewRow label="Wounds (HP)" value={Math.max(1, hp)} />
            <ReviewRow label="Armor Class"  value={10 + dexMod} />
            <ReviewRow label="Speed"        value={`${speed} ft.`} />
            <ReviewRow label="Proficiency Bonus" value="+2" />
            <ReviewRow label="Initiative"        value={fmtMod(scoreByAbbr['DEX'] ?? 10)} />
            <ReviewRow label="Passive Perception" value={passivePerc} />
          </div>
        </div>

        {/* ── Proficiencies ── */}
        <div className="review-section">
          <SectionTitle>Proficiencies</SectionTitle>
          <div className="review-prof-list">
            <ReviewRow
              label="Skills"
              value={allProfSkills.length ? allProfSkills.map(formatSkillName).join(', ') : 'None'}
            />
            <ReviewRow
              label="Saving Throws"
              value={cls?.savingThrows?.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ') ?? 'None'}
            />
            <ReviewRow label="Armor"   value={cls?.armorProficiencies?.join(', ')  || 'None'} />
            <ReviewRow label="Weapons" value={cls?.weaponProficiencies?.join(', ') || 'None'} />
            {allToolProfs.length > 0 && (
              <ReviewRow label="Tools" value={allToolProfs.join(', ')} />
            )}
            <ReviewRow label="Languages" value={allLanguages.length ? allLanguages.join(', ') : 'None'} />
          </div>
        </div>

        {/* ── Level 1 Features ── */}
        {(draft.fightingStyle || otherFeatures1.length > 0 || subFeatures1.length > 0) && (
          <div className="review-section">
            <SectionTitle>Level 1 Features</SectionTitle>
            <div className="review-features-list">
              {draft.fightingStyle && (
                <div className="review-feature-item">
                  <span className="review-feature-item__name">
                    Fighting Style: {draft.fightingStyle}
                  </span>
                </div>
              )}
              {otherFeatures1.map(f => (
                <div key={f.name} className="review-feature-item">
                  <span className="review-feature-item__name">{f.name}</span>
                </div>
              ))}
              {subFeatures1.map(f => (
                <div key={f.name} className="review-feature-item review-feature-item--subclass">
                  <span className="review-feature-item__name">{f.name}</span>
                  <span className="review-feature-item__source">({subclass?.name})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Equipment ── */}
        <div className="review-section">
          <SectionTitle>Starting Equipment</SectionTitle>

          {draft.useStartingWealth ? (
            <div className="review-wealth">
              <span className="review-wealth__amount">{draft.startingWealth ?? 0}</span>
              <span className="review-wealth__label">Thrones (Starting Wealth)</span>
            </div>
          ) : (
            <div className="review-equip-list">
              {classEquip.map((item, i) => (
                <div key={i} className="review-equip-item">
                  <span className="review-equip-item__check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
              {classEquip.length === 0 && (
                <p style={{ color: 'var(--creation-text-secondary)', fontSize: '13px' }}>
                  No class equipment selected.
                </p>
              )}
            </div>
          )}

          {bgEquip.length > 0 && (
            <div className="review-equip-list" style={{ marginTop: '10px' }}>
              <p className="review-equip-bg-label">From {bg?.name}:</p>
              {bgEquip.map((item, i) => (
                <div key={i} className="review-equip-item">
                  <span className="review-equip-item__check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>{/* /review-card */}

      {/* Forge / Save button */}
      <div className="review-forge-wrap">
        <button
          type="button"
          className="forge-btn"
          onClick={handleForge}
          disabled={forging}
        >
          {isEditMode ? 'SAVE CHANGES' : 'FORGE CHARACTER'}
        </button>
      </div>
    </div>
  )
}
