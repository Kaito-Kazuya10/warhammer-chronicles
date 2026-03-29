import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { useCharacterStore, getModifier, getProficiencyBonus } from '../../store/characterStore'
import { getAllRaces, getAllClasses } from '../../modules/registry'
import { useDiceStore } from '../../store/diceStore'
import { rollCheck, fmtMod } from '../../utils/dice'
import type { AbilityScores } from '../../types/character'

// ─── Constants ────────────────────────────────────────────────────────────────

const ABILITIES: { key: keyof AbilityScores; label: string; abbr: string }[] = [
  { key: 'strength',     label: 'STR', abbr: 'STR' },
  { key: 'dexterity',    label: 'DEX', abbr: 'DEX' },
  { key: 'constitution', label: 'CON', abbr: 'CON' },
  { key: 'intelligence', label: 'INT', abbr: 'INT' },
  { key: 'wisdom',       label: 'WIS', abbr: 'WIS' },
  { key: 'charisma',     label: 'CHA', abbr: 'CHA' },
]

// ─── Character Header ─────────────────────────────────────────────────────────

function CharacterHeader({ characterId, onLevelUp }: { characterId: string; onLevelUp?: () => void }) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const [showLevelDown, setShowLevelDown] = useState(false)
  if (!character) return null

  const races    = getAllRaces()
  const classes  = getAllClasses()
  const raceName = races.find(r => r.id === character.race)?.name ?? ''
  const cls      = classes.find(c => c.id === character.class)
  const className    = cls?.name ?? ''
  const subclassName = cls?.subclasses?.find(sc => sc.id === character.subclass)?.name
  const canLevelUp = character.class && character.level < 10

  const handleLevelDown = () => {
    if (character.level <= 1) return
    const newLevel = character.level - 1
    // Remove featureChoices for option groups at the removed level
    const sub = cls?.subclasses?.find(sc => sc.id === character.subclass)
    const removedGroups = (sub?.features ?? [])
      .filter(f => f.level === character.level && f.optionGroup)
      .map(f => f.optionGroup!)
    const newChoices = { ...(character.featureChoices ?? {}) }
    for (const g of removedGroups) delete newChoices[g]

    updateCharacter(characterId, {
      level: newLevel,
      proficiencyBonus: getProficiencyBonus(newLevel),
      featureChoices: newChoices,
    })
    setShowLevelDown(false)
  }

  return (
    <div className="flex items-start gap-3 pb-4 mb-4 border-b border-border">
      {character.portrait && (
        <img
          src={character.portrait}
          alt="Portrait"
          className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-border"
        />
      )}
      <div className="flex-1 min-w-0">
        <Input
          value={character.name}
          onChange={e => updateCharacter(characterId, { name: e.target.value })}
          placeholder="Character Name"
          className="text-xl font-bold border-0 border-b border-border rounded-none px-0 h-auto py-0 mb-1 focus-visible:ring-0 shadow-none bg-transparent w-full"
        />
        <div className="flex items-center gap-1.5 flex-wrap">
          <p className="text-sm text-muted-foreground truncate">
            Level{' '}
            <input
              type="number"
              min={1}
              max={20}
              value={character.level}
              onChange={e => updateCharacter(characterId, { level: Math.max(1, Number(e.target.value) || 1) })}
              className="w-7 text-center text-sm bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {raceName && ` ${raceName}`}
            {className && ` ${className}`}
            {subclassName && ` · ${subclassName}`}
          </p>

          {/* Level Up button */}
          {canLevelUp && (
            <Button
              size="sm"
              onClick={onLevelUp}
              className="h-5 px-2 text-[10px] font-bold tracking-wider"
            >
              LEVEL UP
            </Button>
          )}

          {/* Level Down button */}
          {character.level > 1 && !showLevelDown && (
            <button
              onClick={() => setShowLevelDown(true)}
              className="w-5 h-5 rounded text-[10px] text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/40 transition-colors flex items-center justify-center"
              title="Reduce level"
            >
              −
            </button>
          )}
          {showLevelDown && (
            <span className="inline-flex items-center gap-1 text-[10px]">
              <span className="text-muted-foreground">Reduce to Lv {character.level - 1}?</span>
              <button onClick={handleLevelDown} className="text-destructive hover:underline font-semibold">Yes</button>
              <button onClick={() => setShowLevelDown(false)} className="text-muted-foreground hover:underline">No</button>
            </span>
          )}
        </div>
      </div>
      {/* XP */}
      <div className="flex flex-col items-center flex-shrink-0">
        <input
          type="number"
          min={0}
          value={character.experiencePoints}
          onChange={e => updateCharacter(characterId, { experiencePoints: Math.max(0, Number(e.target.value) || 0) })}
          className="w-16 text-center text-sm bg-transparent border border-border rounded-md outline-none focus:border-ring py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">XP</span>
      </div>
    </div>
  )
}

// ─── Ability Score Block ──────────────────────────────────────────────────────

function AbilityScoreBlock({
  abilityKey,
  label,
  score,
  onChange,
}: {
  abilityKey: string
  label: string
  score: number
  onChange: (v: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const addRoll = useDiceStore(s => s.addRoll)
  const mod    = getModifier(score)
  const modStr = mod >= 0 ? `+${mod}` : String(mod)

  const handleRoll = () => {
    const result = rollCheck(
      `${label} Check`,
      'ability',
      mod,
      `${fmtMod(mod)} ${label}`,
    )
    addRoll(result)
  }

  return (
    <div className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5 min-w-0">
      <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{label}</span>

      {/* Modifier — clickable to roll */}
      <span
        className="text-2xl font-bold text-foreground leading-none font-mono cursor-pointer hover:text-primary hover:scale-110 active:scale-95 transition-all select-none group"
        role="button"
        tabIndex={0}
        aria-label={`Roll ${label} check (${modStr})`}
        onClick={handleRoll}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRoll() } }}
        title={`Click to roll ${label} check`}
      >
        {modStr}
      </span>

      {editing ? (
        <Input
          type="number"
          min={1}
          max={30}
          defaultValue={score}
          autoFocus
          onBlur={e => { onChange(Number(e.target.value)); setEditing(false) }}
          onKeyDown={e => {
            if (e.key === 'Enter')  { onChange(Number((e.target as HTMLInputElement).value)); setEditing(false) }
            if (e.key === 'Escape') setEditing(false)
          }}
          className="h-6 w-12 text-center text-sm px-1"
        />
      ) : (
        <span
          className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none leading-none"
          aria-label={`${abilityKey} score: ${score}, click to edit`}
          onClick={() => setEditing(true)}
        >
          {score}
        </span>
      )}
    </div>
  )
}

// ─── Stat Box ─────────────────────────────────────────────────────────────────

function StatBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5 min-w-0">
      <span className="text-xl font-bold font-mono text-foreground leading-none">{children}</span>
      <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground text-center font-medium leading-tight">
        {label}
      </span>
    </div>
  )
}

// ─── Editable Number ─────────────────────────────────────────────────────────

function EditableNumber({
  value,
  onChange,
  className,
}: {
  value: number
  onChange: (v: number) => void
  className?: string
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value) || 0)}
      onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
      className={`bg-transparent border-none outline-none text-center font-bold font-mono text-foreground min-w-0 w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${className ?? ''}`}
    />
  )
}

// ─── HP Section ──────────────────────────────────────────────────────────────

function HPSection({ characterId }: { characterId: string }) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const setHitPoints    = useCharacterStore(s => s.setHitPoints)
  const [delta, setDelta] = useState('')

  if (!character) return null

  const applyHeal = () => {
    const n = parseInt(delta)
    if (!isNaN(n) && n > 0) { setHitPoints(characterId, character.currentHitPoints + n); setDelta('') }
  }
  const applyDamage = () => {
    const n = parseInt(delta)
    if (!isNaN(n) && n > 0) { setHitPoints(characterId, character.currentHitPoints - n); setDelta('') }
  }

  const pct = character.maxHitPoints > 0
    ? Math.max(0, Math.min(100, (character.currentHitPoints / character.maxHitPoints) * 100))
    : 0
  const hpColor = pct > 50
    ? 'var(--wh-hp-high)'
    : pct > 25
      ? 'var(--wh-hp-mid)'
      : 'var(--wh-hp-low)'

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      {/* Heal / damage controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Input
          type="number"
          placeholder="0"
          value={delta}
          onChange={e => setDelta(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') applyHeal() }}
          className="h-7 w-14 text-center text-sm px-1"
          min={0}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={applyHeal}
          className="text-[var(--wh-success)] border-[var(--wh-success)]/40 hover:bg-[var(--wh-success)]/10 hover:border-[var(--wh-success)]/60 text-xs"
        >
          HEAL ↑
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={applyDamage}
          className="text-[var(--wh-warning)] border-[var(--wh-warning)]/40 hover:bg-[var(--wh-warning)]/10 hover:border-[var(--wh-warning)]/60 text-xs"
        >
          DMG ↓
        </Button>
      </div>

      {/* HP numbers row */}
      <div className="flex items-baseline gap-1">
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">CURRENT</span>
          <EditableNumber
            value={character.currentHitPoints}
            onChange={v => setHitPoints(characterId, v)}
            className="text-3xl"
          />
        </div>
        <span className="text-muted-foreground text-2xl pb-0.5">/</span>
        <div className="flex flex-col items-center">
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">MAX</span>
          <EditableNumber
            value={character.maxHitPoints}
            onChange={v => updateCharacter(characterId, { maxHitPoints: Math.max(1, v) })}
            className="text-xl"
          />
        </div>
        {character.temporaryHitPoints > 0 && (
          <div className="flex flex-col items-center ml-2">
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">TEMP</span>
            <EditableNumber
              value={character.temporaryHitPoints}
              onChange={v => updateCharacter(characterId, { temporaryHitPoints: Math.max(0, v) })}
              className="text-xl text-blue-500"
            />
          </div>
        )}
      </div>

      {/* HP bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: hpColor }}
        />
      </div>

      <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-medium">WOUNDS</p>
    </div>
  )
}

// ─── TopStatBar ───────────────────────────────────────────────────────────────

interface Props {
  characterId: string
  onLevelUp?: () => void
}

export default function TopStatBar({ characterId, onLevelUp }: Props) {
  const character         = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter   = useCharacterStore(s => s.updateCharacter)
  const updateAbilityScore = useCharacterStore(s => s.updateAbilityScore)

  if (!character) return null

  const addRoll   = useDiceStore(s => s.addRoll)
  const dexMod    = getModifier(character.abilityScores.dexterity)
  const dexModStr = dexMod >= 0 ? `+${dexMod}` : String(dexMod)

  const rollInitiative = () => {
    addRoll(rollCheck('Initiative', 'initiative', dexMod, `${fmtMod(dexMod)} DEX`))
  }

  return (
    <Card className="p-4">
      {/* ── Character identity header ── */}
      <CharacterHeader characterId={characterId} onLevelUp={onLevelUp} />

      {/* ── Stats ── */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-6 items-start">

        {/* Ability scores: 3×2 on mobile, 6-in-a-row on sm+ */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 w-full sm:w-auto">
          {ABILITIES.map(ab => (
            <AbilityScoreBlock
              key={ab.key}
              abilityKey={ab.key}
              label={ab.label}
              score={character.abilityScores[ab.key]}
              onChange={v => updateAbilityScore(characterId, ab.key, v)}
            />
          ))}
        </div>

        {/* Divider — desktop only */}
        <div className="w-px bg-border self-stretch hidden sm:block" />

        {/* Combat stats: 2-col grid on mobile, flex on sm+ */}
        <div className="grid grid-cols-2 sm:flex gap-1.5 items-start">
          <StatBox label="PROF BONUS">+{character.proficiencyBonus}</StatBox>

          {/* Speed — editable */}
          <div className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5">
            <div className="flex items-baseline gap-0.5">
              <input
                type="number"
                value={character.speed}
                onChange={e => updateCharacter(characterId, { speed: Number(e.target.value) || 30 })}
                onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
                className="text-xl font-bold font-mono text-foreground bg-transparent border-none outline-none w-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-muted-foreground">ft</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">SPEED</span>
          </div>

          {/* Initiative — rollable */}
          <div
            className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5 cursor-pointer hover:border-primary/60 hover:bg-accent/5 active:scale-95 transition-all"
            role="button"
            tabIndex={0}
            aria-label={`Roll Initiative (${dexModStr})`}
            onClick={rollInitiative}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rollInitiative() } }}
            title="Click to roll Initiative"
          >
            <span className="text-xl font-bold font-mono text-foreground leading-none">{dexModStr}</span>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">INITIATIVE</span>
          </div>

          {/* Armor class */}
          <div className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5">
            <input
              type="number"
              value={character.armorClass}
              onChange={e => updateCharacter(characterId, { armorClass: Number(e.target.value) || 10 })}
              onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
              className="text-xl font-bold font-mono text-foreground bg-transparent border-none outline-none w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">AC</span>
          </div>

          {/* Inspiration toggle */}
          <div className="flex flex-col items-center justify-between border border-border rounded-md p-2 gap-0.5">
            <Toggle
              pressed={character.inspiration}
              onPressedChange={(v: boolean) => updateCharacter(characterId, { inspiration: v })}
              size="sm"
              variant="outline"
              className={`text-lg border-none p-0 h-auto ${character.inspiration ? 'text-[var(--wh-gold)]' : 'text-muted-foreground/40'}`}
              aria-label="Toggle inspiration"
            >
              {character.inspiration ? '★' : '☆'}
            </Toggle>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">INSP</span>
          </div>
        </div>

        {/* Divider — desktop only */}
        <div className="w-px bg-border self-stretch hidden sm:block" />

        {/* HP */}
        <div className="w-full sm:w-auto sm:flex-1 sm:min-w-[240px]">
          <HPSection characterId={characterId} />
        </div>

      </div>
    </Card>
  )
}
