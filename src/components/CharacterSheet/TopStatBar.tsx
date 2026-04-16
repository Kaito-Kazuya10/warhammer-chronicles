import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { useCharacterStore, getModifier, getProficiencyBonus } from '../../store/characterStore'
import { getAllRaces, getAllClasses, getItemById } from '../../modules/registry'
import { armorTierDefinitions } from '../../modules/core/items/armor'
import { useDiceStore } from '../../store/diceStore'
import { rollCheck, fmtMod } from '../../utils/dice'
import type { AbilityScores } from '../../types/character'
import RestDialog from './RestDialog'

// ─── Constants ────────────────────────────────────────────────────────────────

const ABILITIES: { key: keyof AbilityScores; label: string; abbr: string }[] = [
  { key: 'strength',     label: 'STRENGTH',     abbr: 'STR' },
  { key: 'dexterity',    label: 'DEXTERITY',    abbr: 'DEX' },
  { key: 'constitution', label: 'CONSTITUTION', abbr: 'CON' },
  { key: 'intelligence', label: 'INTELLIGENCE', abbr: 'INT' },
  { key: 'wisdom',       label: 'WISDOM',       abbr: 'WIS' },
  { key: 'charisma',     label: 'CHARISMA',     abbr: 'CHA' },
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
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border-2 border-border shadow-md"
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
            {className && ` — ${className}`}
            {subclassName && ` · ${subclassName}`}
          </p>

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

      {/* Level Up button — top right, replaces XP box */}
      {canLevelUp && (
        <Button
          size="sm"
          onClick={onLevelUp}
          className="flex-shrink-0 font-bold tracking-wider"
        >
          LEVEL UP ↑
        </Button>
      )}
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
  const addRoll        = useDiceStore(s => s.addRoll)
  const showRollContext = useDiceStore(s => s.showRollContext)
  const mod    = getModifier(score)
  const modStr = mod >= 0 ? `+${mod}` : String(mod)

  const doRoll = (mode?: 'advantage' | 'disadvantage') => {
    addRoll(rollCheck(`${label} Check`, 'ability', mod, `${fmtMod(mod)} ${label}`, mode))
  }

  return (
    <div className="flex flex-col items-center justify-between border border-border bg-muted/20 rounded-md p-2 gap-0.5 min-w-0">
      <span className="text-[8px] uppercase tracking-[0.08em] text-muted-foreground font-medium text-center leading-tight">{label}</span>

      {/* Modifier — left-click to roll, right-click for adv/dis */}
      <span
        className="text-2xl font-bold text-foreground leading-none font-mono cursor-pointer hover:text-primary hover:scale-110 active:scale-95 transition-all select-none group"
        role="button"
        tabIndex={0}
        aria-label={`Roll ${label} check (${modStr})`}
        onClick={() => doRoll()}
        onContextMenu={e => { e.preventDefault(); showRollContext(e.clientX, e.clientY, doRoll) }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); doRoll() } }}
        title={`Left-click to roll · Right-click for Advantage/Disadvantage`}
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
    <div className="flex flex-col items-center justify-center border border-border bg-muted/20 rounded-md p-3 gap-1.5 min-w-0">
      <span className="text-2xl font-bold font-mono text-foreground leading-none">{children}</span>
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
  const [delta,    setDelta]    = useState('')
  const [restType, setRestType] = useState<'short' | 'long' | null>(null)

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
      {/* Row 1 — Heal / Damage */}
      <div className="flex items-center gap-1.5">
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

      {/* Row 2 — Rest buttons */}
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRestType('short')}
          className="text-xs gap-1.5 text-foreground flex-1"
          title="Short Rest (1 hour)"
        >
          <Moon size={12} /> Short Rest
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setRestType('long')}
          className="text-xs gap-1.5 text-foreground flex-1"
          title="Long Rest (8 hours)"
        >
          <Sun size={12} /> Long Rest
        </Button>
      </div>

      {/* Rest dialogs */}
      {restType && (
        <RestDialog
          characterId={characterId}
          restType={restType}
          open={restType !== null}
          onClose={() => setRestType(null)}
        />
      )}

      {/* HP numbers row — two equal boxes */}
      <div className="flex items-stretch gap-2">
        <div className="flex flex-col items-center border border-border bg-muted/20 rounded-md px-3 py-2 flex-1">
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">CURRENT</span>
          <EditableNumber
            value={character.currentHitPoints}
            onChange={v => setHitPoints(characterId, v)}
            className="text-3xl"
          />
        </div>
        <div className="flex flex-col items-center border border-border bg-muted/20 rounded-md px-3 py-2 flex-1">
          <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">MAX</span>
          <EditableNumber
            value={character.maxHitPoints}
            onChange={v => updateCharacter(characterId, { maxHitPoints: Math.max(1, v) })}
            className="text-3xl"
          />
        </div>
        {character.temporaryHitPoints > 0 && (
          <div className="flex flex-col items-center border border-blue-500/30 bg-blue-500/5 rounded-md px-3 py-2 flex-1">
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground mb-0.5">TEMP</span>
            <EditableNumber
              value={character.temporaryHitPoints}
              onChange={v => updateCharacter(characterId, { temporaryHitPoints: Math.max(0, v) })}
              className="text-3xl text-blue-500"
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
  const addRoll           = useDiceStore(s => s.addRoll)
  const showRollContext   = useDiceStore(s => s.showRollContext)

  if (!character) return null
  const dexMod    = getModifier(character.abilityScores.dexterity)
  const dexModStr = dexMod >= 0 ? `+${dexMod}` : String(dexMod)

  // ── Effective AC computation ──────────────────────────────────────────────
  // Find all equipped items
  const equippedItems = character.inventory
    .filter(inv => inv.equipped !== false)
    .map(inv => ({ inv, item: getItemById(inv.itemId) }))
    .filter((e): e is { inv: typeof e.inv; item: NonNullable<typeof e.item> } => !!e.item)

  // Body armor (armorType: light/medium/heavy)
  const bodyArmor = equippedItems.find(e =>
    e.item.type === 'armor' &&
    (e.item.armorType === 'light' || e.item.armorType === 'medium' || e.item.armorType === 'heavy')
  )

  // Compute tier bonusAC for body armor
  const bodyTierOverride = bodyArmor?.inv.tierOverride ?? bodyArmor?.item.tier ?? 'standard'
  const bodyArmorTierDef = armorTierDefinitions.find(d => d.tier === bodyTierOverride)

  // Sum bonusAC from non-body equipped items (shields, helmets, accessories, named body armor bonusAC)
  const bonusACFromOther = equippedItems.reduce((sum, { item }) => {
    if (item === bodyArmor?.item) return sum
    return sum + (item.bonusAC ?? 0)
  }, 0)

  let effectiveAC: number
  let acBreakdown: string

  if (bodyArmor) {
    const baseAC = bodyArmor.item.armorClass ?? 10
    const maxDex = bodyArmor.item.maxDexBonus ?? Infinity
    const dexContrib = Math.min(dexMod, maxDex)
    const tierBonus = bodyArmorTierDef?.bonusAC ?? 0
    // Named body armor also has bonusAC on the item itself
    const namedBonus = bodyArmor.item.isNamed ? (bodyArmor.item.bonusAC ?? 0) : 0
    effectiveAC = baseAC + dexContrib + tierBonus + namedBonus + bonusACFromOther
    acBreakdown = `${bodyArmor.item.name} ${baseAC}` +
      (dexContrib !== 0 ? ` + DEX ${dexContrib > 0 ? '+' : ''}${dexContrib}` : '') +
      (tierBonus > 0 ? ` + ${bodyTierOverride === 'master-crafted' ? 'MC' : bodyTierOverride} +${tierBonus}` : '') +
      (namedBonus > 0 ? ` + named +${namedBonus}` : '') +
      (bonusACFromOther > 0 ? ` + items +${bonusACFromOther}` : '')
  } else {
    // Unarmored: 10 + DEX + any bonus items
    effectiveAC = 10 + dexMod + bonusACFromOther
    acBreakdown = `Unarmored 10 + DEX ${dexMod >= 0 ? '+' : ''}${dexMod}` +
      (bonusACFromOther > 0 ? ` + items +${bonusACFromOther}` : '')
  }
  // ─────────────────────────────────────────────────────────────────────────

  const rollInitiative = (mode?: 'advantage' | 'disadvantage') => {
    addRoll(rollCheck('Initiative', 'initiative', dexMod, `${fmtMod(dexMod)} DEX`, mode))
  }

  return (
    <Card className="p-4">
      {/* ── Character identity header ── */}
      <CharacterHeader characterId={characterId} onLevelUp={onLevelUp} />

      {/* ── Stats — equal thirds ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Column 1: Ability scores 3×2 */}
        <div className="grid grid-cols-3 gap-1.5">
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

        {/* Column 2: Combat stats bento 3×2 */}
        <div className="grid grid-cols-3 gap-1.5">
          <StatBox label="PROF BONUS">+{character.proficiencyBonus}</StatBox>

          {/* Speed — editable */}
          <div className="flex flex-col items-center justify-center border border-border bg-muted/20 rounded-md p-3 gap-1.5">
            <div className="flex items-baseline gap-0.5">
              <input
                type="number"
                value={character.speed}
                onChange={e => updateCharacter(characterId, { speed: Number(e.target.value) || 30 })}
                onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur() }}
                className="text-2xl font-bold font-mono text-foreground bg-transparent border-none outline-none w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-muted-foreground">ft</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">SPEED</span>
          </div>

          {/* Initiative — rollable */}
          <div
            className="flex flex-col items-center justify-center border border-border bg-muted/20 rounded-md p-3 gap-1.5 cursor-pointer hover:border-primary/60 hover:bg-muted/40 active:scale-95 transition-all"
            role="button"
            tabIndex={0}
            aria-label={`Roll Initiative (${dexModStr})`}
            onClick={() => rollInitiative()}
            onContextMenu={e => { e.preventDefault(); showRollContext(e.clientX, e.clientY, rollInitiative) }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rollInitiative() } }}
            title="Left-click to roll · Right-click for Advantage/Disadvantage"
          >
            <span className="text-2xl font-bold font-mono text-foreground leading-none">{dexModStr}</span>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">INITIATIVE</span>
          </div>

          {/* Armor class — auto-computed from equipped armor */}
          <div
            className="flex flex-col items-center justify-center border border-border bg-muted/20 rounded-md p-3 gap-1.5"
            title={acBreakdown}
          >
            <span className="text-2xl font-bold font-mono text-foreground leading-none">{effectiveAC}</span>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">AC</span>
          </div>

          {/* Inspiration toggle */}
          <div className="flex flex-col items-center justify-center border border-border bg-muted/20 rounded-md p-3 gap-1.5">
            <Toggle
              pressed={character.inspiration}
              onPressedChange={(v: boolean) => updateCharacter(characterId, { inspiration: v })}
              size="sm"
              variant="outline"
              className={`text-3xl border-none p-0 h-auto leading-none ${character.inspiration ? 'text-[var(--wh-gold)]' : 'text-muted-foreground/40'}`}
              aria-label="Toggle inspiration"
            >
              {character.inspiration ? '★' : '☆'}
            </Toggle>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium leading-tight text-center">INSP</span>
          </div>
        </div>

        {/* Column 3: HP */}
        <HPSection characterId={characterId} />

      </div>
    </Card>
  )
}
