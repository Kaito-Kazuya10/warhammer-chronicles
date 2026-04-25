import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { getAllSpells, getSpellById } from '../../../modules/registry'
import { renderDescription } from '../../../utils/renderDescription'
import type { Spell } from '../../../types/module'

// ─── Types ────────────────────────────────────────────────────────────────────

type LevelFilter = 'all' | '0' | '1' | '2' | '3'

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_LABEL: Record<number, string> = {
  0: 'Cantrip',
  1: '1st',
  2: '2nd',
  3: '3rd',
}

const LEVEL_COLOR: Record<number, string> = {
  0: 'bg-muted text-muted-foreground border-border',
  1: 'bg-[var(--wh-gold)]/10 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
  2: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  3: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
}

const ACTION_LABEL: Record<string, string> = {
  '1 action':       'Action',
  '1 bonus action': 'Bonus Action',
  '1 reaction':     'Reaction',
}

const ACTION_COLOR = 'bg-primary/10 text-primary border-primary/30'
const BONUS_COLOR  = 'bg-[var(--wh-gold)]/10 text-[var(--wh-gold)] border-[var(--wh-gold)]/30'
const REACT_COLOR  = 'bg-[var(--wh-info)]/10 text-[var(--wh-info)] border-[var(--wh-info)]/30'

function actionColor(castingTime: string) {
  if (castingTime === '1 bonus action') return BONUS_COLOR
  if (castingTime === '1 reaction') return REACT_COLOR
  return ACTION_COLOR
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcPrepLimit(level: number, charisma: number): number {
  const chaMod = Math.floor((charisma - 10) / 2)
  return Math.max(1, Math.floor(level / 2) + chaMod)
}

// ─── SlotPips ─────────────────────────────────────────────────────────────────

function SlotPips({
  level,
  slots,
  onToggle,
}: {
  level: number
  slots: { total: number; used: number }
  onToggle: (index: number) => void
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold w-6 flex-shrink-0">
        {LEVEL_LABEL[level]}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: slots.total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onToggle(i)}
            className={`w-5 h-5 rounded-sm border transition-colors ${
              i < slots.used
                ? 'bg-[var(--wh-gold)]/80 border-[var(--wh-gold)]'
                : 'bg-transparent border-border hover:border-[var(--wh-gold)]/50'
            }`}
            aria-label={i < slots.used ? 'Recover slot' : 'Use slot'}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground tabular-nums">
        {slots.total - slots.used} / {slots.total}
      </span>
    </div>
  )
}

// ─── PrayerRow ────────────────────────────────────────────────────────────────

function PrayerRow({
  prayer,
  isPrepared,
  canPrepare,
  availableSlots,
  onPrepare,
  onUnprepare,
  onCast,
}: {
  prayer: Spell
  isPrepared: boolean
  canPrepare: boolean
  availableSlots: number[]   // slot levels that still have uses remaining
  onPrepare: () => void
  onUnprepare: () => void
  onCast: (slotLevel: number) => void
}) {
  const [open, setOpen] = useState(false)
  const isCantrip = prayer.level === 0
  const labelColor = LEVEL_COLOR[prayer.level] ?? LEVEL_COLOR[1]
  const actionLbl = ACTION_LABEL[prayer.castingTime]

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-1 rounded-md hover:bg-muted/30 transition-colors group">
        <CollapsibleTrigger className="flex-1 text-left min-w-0 focus:outline-none">
          <div className="flex items-start gap-2 py-2 pl-2 pr-1">
            <span
              className="mt-0.5 flex-shrink-0 text-sm text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
              style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}
              aria-hidden="true"
            >
              ▶
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base font-medium text-foreground">{prayer.name}</span>
                <Badge variant="outline" className={`text-[11px] py-0 px-1 ${labelColor}`}>
                  {LEVEL_LABEL[prayer.level] ?? prayer.level}
                </Badge>
                {actionLbl && (
                  <Badge variant="outline" className={`text-[11px] py-0 px-1 ${actionColor(prayer.castingTime)}`}>
                    {actionLbl}
                  </Badge>
                )}
                {prayer.tags?.map(tag => (
                  <span key={tag} className="text-[11px] text-muted-foreground/60">{tag}</span>
                ))}
              </div>

              {/* Cast buttons — only for prepared non-cantrips */}
              {isPrepared && !isCantrip && availableSlots.length > 0 && (
                <div className="flex items-center gap-1 mt-1">
                  {availableSlots.map(sl => (
                    <button
                      key={sl}
                      onClick={e => { e.stopPropagation(); onCast(sl) }}
                      className="text-[11px] px-1.5 py-0.5 rounded border border-[var(--wh-gold)]/30 text-[var(--wh-gold)] hover:bg-[var(--wh-gold)]/10 transition-colors"
                    >
                      Cast {LEVEL_LABEL[sl]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        {/* Prepare / Unprepare */}
        <div className="self-start mt-1.5 mr-2 flex-shrink-0">
          {isPrepared ? (
            isCantrip ? null : (
              <button
                onClick={onUnprepare}
                className="text-[11px] px-1.5 py-0.5 rounded border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              >
                UNPREPARE
              </button>
            )
          ) : (
            <button
              onClick={onPrepare}
              disabled={!canPrepare && !isCantrip}
              className={`text-[11px] px-1.5 py-0.5 rounded border transition-colors ${
                canPrepare || isCantrip
                  ? 'border-[var(--wh-gold)]/30 text-[var(--wh-gold)] hover:bg-[var(--wh-gold)]/10 cursor-pointer'
                  : 'border-border text-muted-foreground/30 cursor-not-allowed'
              }`}
              title={canPrepare || isCantrip ? 'Prepare prayer' : 'Preparation limit reached'}
            >
              PREPARE
            </button>
          )}
        </div>
      </div>

      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-sm text-muted-foreground border-l border-border space-y-1">
          {renderDescription(prayer.description)}
          {prayer.higherLevels && (
            <p className="text-xs italic text-muted-foreground/70">
              <strong>At Higher Levels:</strong> {prayer.higherLevels}
            </p>
          )}
          <p className="text-[11px] text-muted-foreground/50">
            {prayer.castingTime} · {prayer.range} · {prayer.duration}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── PrayersTab ───────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function PrayersTab({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const [filter, setFilter] = useState<LevelFilter>('all')

  if (!character) return null

  const allPrayers   = getAllSpells().filter(s => s.spellSource === 'prayer')
  const preparedIds  = character.preparedSpellIds ?? []
  const slots        = character.spellSlots ?? {}

  // Cantrips are always "prepared" — never count toward prep limit
  const preparedNonCantrips = preparedIds.filter(id => {
    const sp = getSpellById(id)
    return sp?.spellSource === 'prayer' && (sp.level ?? 0) > 0
  })

  const prepLimit  = calcPrepLimit(character.level, character.abilityScores.charisma)
  const prepCount  = preparedNonCantrips.length
  const canPrepare = prepCount < prepLimit

  // Available slot levels (level > 0, has remaining uses)
  const availableSlots: number[] = Object.entries(slots)
    .filter(([, s]) => s.used < s.total)
    .map(([lvl]) => Number(lvl))
    .filter(lvl => lvl > 0)
    .sort((a, b) => a - b)

  function matchesFilter(prayer: Spell) {
    if (filter === 'all') return true
    return String(prayer.level) === filter
  }

  function prepare(prayer: Spell) {
    updateCharacter(characterId, {
      preparedSpellIds: [...preparedIds, prayer.id],
    })
  }

  function unprepare(prayer: Spell) {
    updateCharacter(characterId, {
      preparedSpellIds: preparedIds.filter(id => id !== prayer.id),
    })
  }

  function castAtLevel(slotLevel: number) {
    const current = slots[slotLevel]
    if (!current || current.used >= current.total) return
    updateCharacter(characterId, {
      spellSlots: {
        ...slots,
        [slotLevel]: { ...current, used: current.used + 1 },
      },
    })
  }

  function toggleSlot(level: number, index: number) {
    const current = slots[level]
    if (!current) return
    const isUsed = index < current.used
    updateCharacter(characterId, {
      spellSlots: {
        ...slots,
        [level]: { ...current, used: isUsed ? index : index + 1 },
      },
    })
  }

  const slotLevels = Object.keys(slots)
    .map(Number)
    .filter(lvl => lvl > 0 && slots[lvl]?.total > 0)
    .sort((a, b) => a - b)

  const preparedPrayers  = preparedIds.map(id => getSpellById(id)).filter((s): s is Spell => s?.spellSource === 'prayer')
  const cantrips         = allPrayers.filter(p => p.level === 0)
  const unpreparedPool   = allPrayers.filter(p => p.level > 0 && !preparedIds.includes(p.id))

  const FILTERS: { value: LevelFilter; label: string }[] = [
    { value: 'all', label: 'ALL' },
    { value: '0',   label: 'CANTRIP' },
    { value: '1',   label: '1ST' },
    { value: '2',   label: '2ND' },
    { value: '3',   label: '3RD' },
  ]

  return (
    <div className="space-y-4">

      {/* ── Prayer Slots ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
            Prayer Slots
          </p>
          <span className="text-[11px] text-muted-foreground italic">Regain on long rest</span>
        </div>
        {slotLevels.length === 0 ? (
          <p className="text-sm text-muted-foreground/50 italic">
            No prayer slots — gain them by levelling up.
          </p>
        ) : (
          <div className="border border-border rounded-md divide-y divide-border/50">
            {slotLevels.map(lvl => (
              <div key={lvl} className="px-3 py-2">
                <SlotPips
                  level={lvl}
                  slots={slots[lvl]}
                  onToggle={i => toggleSlot(lvl, i)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Prepared Prayers ── */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
            Prepared Prayers
          </p>
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {prepCount} / {prepLimit}
          </span>
        </div>

        {/* Cantrips — always shown, always prepared */}
        {cantrips.filter(p => matchesFilter(p) || filter === 'all' || filter === '0').length > 0 && (
          <div className="mb-1">
            <p className="text-[11px] text-muted-foreground/60 mb-0.5 pl-1">Sacred Rites (Cantrips)</p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {cantrips.map(prayer => (
                <PrayerRow
                  key={prayer.id}
                  prayer={prayer}
                  isPrepared
                  canPrepare={false}
                  availableSlots={[]}
                  onPrepare={() => {}}
                  onUnprepare={() => {}}
                  onCast={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {preparedPrayers.filter(p => p.level > 0).length > 0 ? (
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {preparedPrayers
              .filter(p => p.level > 0 && matchesFilter(p))
              .map(prayer => (
                <PrayerRow
                  key={prayer.id}
                  prayer={prayer}
                  isPrepared
                  canPrepare={false}
                  availableSlots={availableSlots.filter(sl => sl >= prayer.level)}
                  onPrepare={() => {}}
                  onUnprepare={() => unprepare(prayer)}
                  onCast={sl => castAtLevel(sl)}
                />
              ))}
          </div>
        ) : (
          filter === 'all' || filter !== '0'
            ? <p className="text-sm text-muted-foreground/50 italic pl-1">No prayers prepared.</p>
            : null
        )}
      </div>

      {/* ── Filter bar ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTERS.map(({ value, label }) => (
          <Button
            key={value}
            size="sm"
            variant={filter === value ? 'default' : 'outline'}
            onClick={() => setFilter(value)}
            className="shrink-0 text-xs tracking-wide h-7 px-2"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* ── Available Prayer Pool ── */}
      {(() => {
        const visible = unpreparedPool.filter(p => matchesFilter(p))
        if (visible.length === 0 && filter !== '0') return (
          <div className="flex flex-col items-center justify-center h-16 gap-1 text-muted-foreground/40 border border-dashed border-border rounded-lg">
            <span className="text-sm italic">All matching prayers prepared</span>
          </div>
        )
        if (visible.length === 0) return null
        return (
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
              Available Prayers
            </p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {visible.map(prayer => (
                <PrayerRow
                  key={prayer.id}
                  prayer={prayer}
                  isPrepared={false}
                  canPrepare={canPrepare}
                  availableSlots={[]}
                  onPrepare={() => prepare(prayer)}
                  onUnprepare={() => {}}
                  onCast={() => {}}
                />
              ))}
            </div>
          </div>
        )
      })()}

    </div>
  )
}
