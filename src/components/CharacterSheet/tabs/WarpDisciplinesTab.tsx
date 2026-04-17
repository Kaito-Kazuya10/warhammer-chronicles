import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { getAllSpells, getSpellById } from '../../../modules/registry'
import { renderDescription } from '../../../utils/renderDescription'
import type { Spell, PsychicDiscipline } from '../../../types/module'

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_LABEL: Record<number, string> = {
  0: 'Cantrip', 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th',
}

const ORDINAL: Record<number, string> = {
  1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th',
}

type DisciplineFilter = 'ALL' | PsychicDiscipline

const DISCIPLINE_FILTERS: { value: DisciplineFilter; label: string }[] = [
  { value: 'ALL', label: 'ALL' },
  { value: 'BIO', label: 'BIO' },
  { value: 'PYR', label: 'PYR' },
  { value: 'TEL', label: 'TEL' },
  { value: 'DIV', label: 'DIV' },
]

const DISCIPLINE_COLOR: Record<string, string> = {
  BIO: 'bg-green-500/10 text-green-700 border-green-500/30',
  PYR: 'bg-orange-500/10 text-orange-700 border-orange-500/30',
  TEL: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
  DIV: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
  ALL: 'bg-muted/60 text-muted-foreground border-border',
}

// ─── WarpBar ─────────────────────────────────────────────────────────────────

function WarpBar({ current, max, onChange }: { current: number; max: number; onChange: (v: number) => void }) {
  const pct   = max > 0 ? Math.min(1, current / max) : 0
  const color = pct >= 1 ? 'var(--wh-crimson)' : pct >= 0.75 ? 'var(--wh-warning)' : 'hsl(var(--primary))'

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
          Warp Bar
        </p>
        <span className="text-[9px] text-muted-foreground italic">
          Perils at {max}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, current - 1))}
          className="text-[10px] w-5 h-5 rounded border border-border text-muted-foreground hover:bg-muted/50 flex items-center justify-center flex-shrink-0"
          title="−1 Warp"
        >
          −
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${pct * 100}%`, backgroundColor: color }}
          />
        </div>
        <button
          onClick={() => onChange(Math.min(max, current + 1))}
          className="text-[10px] w-5 h-5 rounded border border-border text-muted-foreground hover:bg-muted/50 flex items-center justify-center flex-shrink-0"
          title="+1 Warp"
        >
          +
        </button>
        <span className="text-sm font-mono font-bold tabular-nums flex-shrink-0 min-w-[3rem] text-right">
          {current} / {max}
        </span>
        <button
          onClick={() => onChange(0)}
          className="text-[9px] px-1.5 py-0.5 rounded border border-border text-muted-foreground/60 hover:bg-muted/50 flex-shrink-0"
          title="Reset Warp Bar (after Perils)"
        >
          RESET
        </button>
      </div>

      {current >= max && (
        <p className="text-[9px] text-[var(--wh-crimson)] font-semibold animate-pulse">
          ⚠ PERILS OF THE WARP — Roll on the Perils table now!
        </p>
      )}
    </div>
  )
}

// ─── SlotPips ─────────────────────────────────────────────────────────────────

function SlotPips({
  level,
  total,
  used,
  onToggle,
}: {
  level: number
  total: number
  used: number
  onToggle: (newUsed: number) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground w-6 flex-shrink-0">
        {ORDINAL[level]}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const isUsed = i < used
          return (
            <button
              key={i}
              onClick={() => onToggle(isUsed ? used - 1 : used + 1)}
              title={isUsed ? 'Mark as available' : 'Use slot'}
              className={`w-4 h-4 rounded-sm border transition-colors ${
                isUsed
                  ? 'border-[var(--wh-gold)]/60 bg-[var(--wh-gold)]/30'
                  : 'border-border/60 bg-transparent hover:bg-muted/40'
              }`}
            />
          )
        })}
      </div>
      <span className="text-[9px] text-muted-foreground/60 tabular-nums">
        {total - used} left
      </span>
    </div>
  )
}

// ─── PowerRow ─────────────────────────────────────────────────────────────────

function PowerRow({
  power,
  prepared,
  canPrepare,
  alwaysPrepared,
  availableSlots,
  onPrepare,
  onUnprepare,
  onCast,
  onCastCantrip,
}: {
  power: Spell
  prepared: boolean
  canPrepare: boolean
  alwaysPrepared: boolean
  availableSlots: number[]  // levels with slots remaining
  onPrepare: () => void
  onUnprepare: () => void
  onCast: (level: number) => void
  onCastCantrip?: () => void
}) {
  const [open, setOpen] = useState(false)
  const isCantrip = power.level === 0

  const levelBadge = LEVEL_LABEL[power.level] ?? `${power.level}th`
  const discColor  = DISCIPLINE_COLOR[power.discipline ?? 'ALL'] ?? DISCIPLINE_COLOR['ALL']

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-1 rounded-md hover:bg-muted/30 transition-colors group">
        <CollapsibleTrigger className="flex-1 text-left min-w-0 focus:outline-none">
          <div className="flex items-start gap-2 py-2 pl-2 pr-1">
            <span
              className="mt-0.5 flex-shrink-0 text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
              style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}
              aria-hidden
            >
              ▶
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-medium text-foreground">{power.name}</span>
                {power.warpCost !== undefined && (
                  <span className="text-[9px] text-purple-500/80 font-mono">+{power.warpCost}⚡</span>
                )}
                <Badge variant="outline" className="text-[9px] py-0 px-1 border-border/40 text-muted-foreground">
                  {levelBadge}
                </Badge>
                {power.discipline && power.discipline !== 'ALL' && (
                  <Badge variant="outline" className={`text-[9px] py-0 px-1 ${discColor}`}>
                    {power.discipline}
                  </Badge>
                )}
                {power.isRitual && (
                  <Badge variant="outline" className="text-[9px] py-0 px-1 border-amber-500/30 text-amber-600 bg-amber-500/10">
                    RITUAL
                  </Badge>
                )}
                {alwaysPrepared && (
                  <Badge variant="outline" className="text-[9px] py-0 px-1 border-purple-500/30 text-purple-600 bg-purple-500/10">
                    AUTO
                  </Badge>
                )}
                <span className="text-[9px] text-muted-foreground/50">{power.castingTime}</span>
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <div className="self-start mt-1.5 mr-2 flex-shrink-0 flex items-center gap-1">
          {/* Cast button for cantrips */}
          {isCantrip && (prepared || alwaysPrepared) && onCastCantrip && (
            <button
              onClick={onCastCantrip}
              className="text-[9px] px-1.5 py-0.5 rounded border border-purple-500/30 text-purple-600 hover:bg-purple-500/10 transition-colors"
              title={`Cast (costs ${power.warpCost ?? 1} warp)`}
            >
              CAST
            </button>
          )}

          {/* Cast buttons (for prepared non-cantrip powers) */}
          {(prepared || alwaysPrepared) && !isCantrip && availableSlots.filter(l => l >= power.level).slice(0, 2).map(slotLevel => (
            <button
              key={slotLevel}
              onClick={() => onCast(slotLevel)}
              className="text-[9px] px-1.5 py-0.5 rounded border border-purple-500/30 text-purple-600 hover:bg-purple-500/10 transition-colors"
              title={`Cast using ${ORDINAL[slotLevel]} level slot`}
            >
              {ORDINAL[slotLevel]}
            </button>
          ))}

          {/* Prepare / Unprepare */}
          {alwaysPrepared ? null : prepared ? (
            <button
              onClick={onUnprepare}
              className="text-[9px] px-1.5 py-0.5 rounded border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
            >
              UNPREPARE
            </button>
          ) : (
            <button
              onClick={onPrepare}
              disabled={!canPrepare && !isCantrip}
              className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                canPrepare || isCantrip
                  ? 'border-purple-500/30 text-purple-600 hover:bg-purple-500/10 cursor-pointer'
                  : 'border-border text-muted-foreground/30 cursor-not-allowed'
              }`}
              title={canPrepare || isCantrip ? 'Prepare power' : 'Preparation limit reached'}
            >
              PREPARE
            </button>
          )}
        </div>
      </div>

      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-xs text-muted-foreground border-l border-purple-500/20 space-y-1.5">
          <div>{renderDescription(power.description)}</div>
          {power.higherLevels && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-purple-500/60 mb-0.5">At Higher Levels</p>
              <div>{renderDescription(power.higherLevels)}</div>
            </div>
          )}
          {power.range && (
            <div className="flex gap-3 text-[9px] text-muted-foreground/60">
              <span>Range: {power.range}</span>
              {power.duration && <span>Duration: {power.duration}</span>}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── WarpDisciplinesTab ───────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function WarpDisciplinesTab({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const [discFilter, setDiscFilter] = useState<DisciplineFilter>('ALL')

  if (!character) return null

  // ── Power data ──────────────────────────────────────────────────────────────
  const allPowers       = getAllSpells().filter(s => s.spellSource === 'psyker')
  const preparedIds     = character.preparedSpellIds ?? []
  const slots           = character.spellSlots ?? {}

  // ── Warp Bar ────────────────────────────────────────────────────────────────
  const warpMax     = character.level >= 10 ? 25 : 20
  const warpCurrent = character.warpBar ?? 0

  function setWarpBar(v: number) {
    updateCharacter(characterId, { warpBar: v })
  }

  // ── Prep limit ──────────────────────────────────────────────────────────────
  const intMod = Math.floor((character.abilityScores.intelligence - 10) / 2)
  const wisMod = Math.floor((character.abilityScores.wisdom - 10) / 2)
  const psychicMod = Math.max(intMod, wisMod)
  const prepLimit  = Math.max(1, character.level + psychicMod)

  // ── Prepared powers (split: always vs chosen) ───────────────────────────────
  const alwaysPreparedPowers = allPowers.filter(p => p.alwaysPrepared)
  const alwaysPreparedIds    = new Set(alwaysPreparedPowers.map(p => p.id))
  const chosenPrepared = preparedIds
    .map(id => getSpellById(id))
    .filter((p): p is Spell => p !== undefined && p.spellSource === 'psyker' && !alwaysPreparedIds.has(p.id))
  // Cantrips in preparedSpellIds also count as chosen prepared
  const prepCountable = chosenPrepared.filter(p => p.level > 0)

  // ── Slot helpers ─────────────────────────────────────────────────────────────
  const availableSlots = Object.entries(slots)
    .filter(([, s]) => s.total > 0 && s.used < s.total)
    .map(([lvl]) => Number(lvl))
    .sort((a, b) => a - b)

  function handleCast(power: Spell, level: number) {
    const slotData = slots[level]
    if (!slotData || slotData.used >= slotData.total) return
    const cost    = power.warpCost ?? (power.level + 1)
    const newWarp = Math.min(warpMax, warpCurrent + cost)
    updateCharacter(characterId, {
      warpBar: newWarp,
      spellSlots: { ...slots, [level]: { ...slotData, used: slotData.used + 1 } },
    })
  }

  function handleCastCantrip(power: Spell) {
    const cost    = power.warpCost ?? 1
    const newWarp = Math.min(warpMax, warpCurrent + cost)
    updateCharacter(characterId, { warpBar: newWarp })
  }

  function toggleSlot(level: number, newUsed: number) {
    const slotData = slots[level]
    if (!slotData) return
    updateCharacter(characterId, {
      spellSlots: { ...slots, [level]: { ...slotData, used: Math.max(0, Math.min(slotData.total, newUsed)) } },
    })
  }

  // ── Prepare / Unprepare ───────────────────────────────────────────────────
  function prepare(power: Spell) {
    if (preparedIds.includes(power.id)) return
    updateCharacter(characterId, { preparedSpellIds: [...preparedIds, power.id] })
  }

  function unprepare(power: Spell) {
    updateCharacter(characterId, {
      preparedSpellIds: preparedIds.filter(id => id !== power.id),
    })
  }

  // ── Filter ───────────────────────────────────────────────────────────────
  function matchesFilter(p: Spell) {
    if (discFilter === 'ALL') return true
    return p.discipline === discFilter || p.discipline === 'ALL'
  }

  // ── Pool (non-prepared, non-always) ──────────────────────────────────────
  const poolPowers = allPowers.filter(
    p => !alwaysPreparedIds.has(p.id) && !preparedIds.includes(p.id) && matchesFilter(p)
  )

  // Slot levels with slots
  const slotLevels = Object.entries(slots)
    .filter(([, s]) => s.total > 0)
    .map(([lvl]) => Number(lvl))
    .sort((a, b) => a - b)

  const canPrepare = prepCountable.length < prepLimit

  return (
    <div className="space-y-4">

      {/* ── Warp Bar ── */}
      <div className="rounded-md border border-purple-500/20 bg-purple-500/5 p-3">
        <WarpBar current={warpCurrent} max={warpMax} onChange={setWarpBar} />
      </div>

      {/* ── Power Slots ── */}
      {slotLevels.length > 0 ? (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-2">
            Power Slots
          </p>
          <div className="space-y-1.5">
            {slotLevels.map(lvl => (
              <SlotPips
                key={lvl}
                level={lvl}
                total={slots[lvl].total}
                used={slots[lvl].used}
                onToggle={newUsed => toggleSlot(lvl, newUsed)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[9px] text-muted-foreground/50 italic">
          No power slots — level up to gain slots.
        </p>
      )}

      {/* ── Always Prepared ── */}
      {alwaysPreparedPowers.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
            Always Prepared
          </p>
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {alwaysPreparedPowers.map(p => (
              <PowerRow
                key={p.id}
                power={p}
                prepared
                canPrepare={false}
                alwaysPrepared
                availableSlots={availableSlots}
                onPrepare={() => {}}
                onUnprepare={() => {}}
                onCast={lvl => handleCast(p, lvl)}
                onCastCantrip={() => handleCastCantrip(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Prepared Powers ── */}
      {chosenPrepared.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
            Prepared ({prepCountable.length} / {prepLimit})
          </p>
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {chosenPrepared.map(p => (
              <PowerRow
                key={p.id}
                power={p}
                prepared
                canPrepare={false}
                alwaysPrepared={false}
                availableSlots={availableSlots}
                onPrepare={() => {}}
                onUnprepare={() => unprepare(p)}
                onCast={lvl => handleCast(p, lvl)}
                onCastCantrip={() => handleCastCantrip(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Discipline Filter ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DISCIPLINE_FILTERS.map(({ value, label }) => (
          <Button
            key={value}
            size="sm"
            variant={discFilter === value ? 'default' : 'outline'}
            onClick={() => setDiscFilter(value)}
            className="shrink-0 text-[10px] tracking-wide h-7 px-2"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* ── Available Powers Pool ── */}
      {poolPowers.length > 0 ? (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
            Available Powers
          </p>
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {poolPowers.map(p => (
              <PowerRow
                key={p.id}
                power={p}
                prepared={false}
                canPrepare={canPrepare}
                alwaysPrepared={false}
                availableSlots={[]}
                onPrepare={() => prepare(p)}
                onUnprepare={() => {}}
                onCast={() => {}}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-24 gap-1 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-xl">🔮</span>
          <span className="text-xs italic">All powers prepared or no matches</span>
        </div>
      )}

    </div>
  )
}
