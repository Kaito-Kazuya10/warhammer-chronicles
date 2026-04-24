import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { getAllAugments, getAugmentById } from '../../../modules/registry'
import { getAllClasses } from '../../../modules/registry'
import { resolveUsesCount } from '../../../utils/resolveUsesCount'
import { renderDescription } from '../../../utils/renderDescription'
import type { Augment } from '../../../types/module'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<Augment['category'], string> = {
  minor:   'bg-green-500/10 text-green-700 border-green-500/30',
  major:   'bg-blue-500/10 text-blue-700 border-blue-500/30',
  extreme: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
}

const ACTION_LABEL: Record<string, string> = {
  'action':       'Action',
  'bonus-action': 'Bonus Action',
  'reaction':     'Reaction',
  'free':         'Free',
  'passive':      'Passive',
}

const ACTION_COLOR: Record<string, string> = {
  'action':       'bg-primary/10 text-primary border-primary/30',
  'bonus-action': 'bg-[var(--wh-gold)]/10 text-[var(--wh-gold)] border-[var(--wh-gold)]/30',
  'reaction':     'bg-[var(--wh-info)]/10 text-[var(--wh-info)] border-[var(--wh-info)]/30',
  'free':         'bg-muted text-muted-foreground border-border',
}

type SlotFilter = 'all' | 'minor' | 'major' | 'extreme'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function SlotPips({ cost, filled }: { cost: number; filled?: boolean }) {
  return (
    <div className="flex gap-0.5 items-center flex-shrink-0">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-sm border ${
            i < cost
              ? filled
                ? 'bg-foreground/70 border-foreground/70'
                : 'bg-[var(--wh-gold)]/60 border-[var(--wh-gold)]/60'
              : 'bg-transparent border-border/50'
          }`}
        />
      ))}
    </div>
  )
}

// ─── AugmentRow ───────────────────────────────────────────────────────────────

function AugmentRow({
  augment,
  characterId,
  installed,
  canInstall,
  onInstall,
  onUninstall,
}: {
  augment: Augment
  characterId: string
  installed: boolean
  canInstall: boolean
  onInstall: () => void
  onUninstall: () => void
}) {
  const [open, setOpen] = useState(false)
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const hasUses    = !!(augment.usesPerRest && augment.usesCount && character)
  const featureKey = slugify(augment.name)
  const usesMax    = hasUses && character ? resolveUsesCount(augment.usesCount!, character) : 0
  const usesSpent  = character?.featureUsesSpent?.[featureKey] ?? 0

  function toggleUse(i: number) {
    if (!character) return
    const isSpent = i < usesSpent
    updateCharacter(characterId, {
      featureUsesSpent: {
        ...(character.featureUsesSpent ?? {}),
        [featureKey]: isSpent ? i : i + 1,
      },
    })
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-start gap-1 rounded-md hover:bg-muted/30 transition-colors group">
        <CollapsibleTrigger className="flex-1 text-left min-w-0 focus:outline-none">
          <div className="flex items-start gap-2 py-2 pl-2 pr-1">
            <span
              className="mt-0.5 flex-shrink-0 text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
              style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}
              aria-hidden="true"
            >
              ▶
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={`text-sm font-medium ${installed && hasUses && usesSpent >= usesMax ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                  {augment.name}
                </span>
                <SlotPips cost={augment.slotCost} />
                <Badge variant="outline" className={`text-[9px] py-0 px-1 ${CATEGORY_COLOR[augment.category]}`}>
                  {augment.category}
                </Badge>
                {augment.actionType && ACTION_LABEL[augment.actionType] && (
                  <Badge variant="outline" className={`text-[9px] py-0 px-1 ${ACTION_COLOR[augment.actionType] ?? ''}`}>
                    {ACTION_LABEL[augment.actionType]}
                  </Badge>
                )}
                {augment.isWeapon && (
                  <Badge variant="outline" className="text-[9px] py-0 px-1 bg-[var(--wh-crimson)]/10 text-[var(--wh-crimson)] border-[var(--wh-crimson)]/30">
                    Weapon
                  </Badge>
                )}
                {augment.tags?.map(tag => (
                  <span key={tag} className="text-[9px] text-muted-foreground/60">{tag}</span>
                ))}
              </div>

              {/* Use tracking checkboxes — only shown when installed */}
              {installed && hasUses && (
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: usesMax }).map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); toggleUse(i) }}
                      className={`w-4 h-4 rounded-sm border transition-colors ${
                        i < usesSpent
                          ? 'bg-foreground/70 border-foreground/70'
                          : 'bg-transparent border-border hover:border-foreground/40'
                      }`}
                      aria-label={i < usesSpent ? 'Unspend use' : 'Spend use'}
                    />
                  ))}
                  <span className="text-[9px] text-muted-foreground ml-0.5">
                    / {augment.usesPerRest === 'short' ? 'Short Rest' : 'Long Rest'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        {/* Install / Uninstall button */}
        <div className="self-start mt-1.5 mr-2 flex-shrink-0">
          {installed ? (
            <button
              onClick={onUninstall}
              className="text-[9px] px-1.5 py-0.5 rounded border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              title="Uninstall augment"
            >
              REMOVE
            </button>
          ) : (
            <button
              onClick={onInstall}
              disabled={!canInstall}
              className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${
                canInstall
                  ? 'border-primary/30 text-primary hover:bg-primary/10 cursor-pointer'
                  : 'border-border text-muted-foreground/30 cursor-not-allowed'
              }`}
              title={canInstall ? 'Install augment' : 'Not enough slots'}
            >
              INSTALL
            </button>
          )}
        </div>
      </div>

      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-xs text-muted-foreground border-l border-border">
          {renderDescription(augment.description)}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── SlotBar ──────────────────────────────────────────────────────────────────

function SlotBar({ used, max }: { used: number; max: number }) {
  const pct = max > 0 ? Math.min(1, used / max) : 0
  const color = pct >= 1 ? 'var(--wh-crimson)' : pct >= 0.75 ? 'var(--wh-warning)' : 'var(--wh-gold)'

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-mono font-bold text-foreground tabular-nums flex-shrink-0">
        {used} / {max}
      </span>
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground flex-shrink-0">slots</span>
    </div>
  )
}

// ─── LoadoutTab ───────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function LoadoutTab({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const [filter, setFilter] = useState<SlotFilter>('all')

  if (!character) return null

  const allAugments  = getAllAugments()
  const installedIds = character.installedAugmentIds ?? []

  // Slot accounting — multi-weapon-system gives +3 if installed
  const baseSlots = character.augmentSlots ?? 4
  const hasMultiWeapon = installedIds.includes('multi-weapon-system')
  const slotsMax  = hasMultiWeapon ? baseSlots + 3 : baseSlots

  const installedAugments = installedIds
    .map(id => getAugmentById(id))
    .filter((a): a is Augment => a !== undefined)

  const slotsUsed = installedAugments.reduce((sum, a) => sum + a.slotCost, 0)

  // Determine subclass name for section header
  const cls      = getAllClasses().find(c => c.id === character.class)
  const subclass = cls?.subclasses?.find(sc => sc.id === character.subclass)
  const subclassName = subclass?.name ?? 'Specialization'

  // Split available augments into universal vs subclass-specific
  const universal   = allAugments.filter(a => !a.specialization)
  const specialized = allAugments.filter(a => a.specialization === character.subclass)

  function matchesFilter(a: Augment) {
    if (filter === 'all') return true
    return a.category === filter
  }

  function install(augment: Augment) {
    updateCharacter(characterId, {
      installedAugmentIds: [...installedIds, augment.id],
    })
  }

  function uninstall(augment: Augment) {
    updateCharacter(characterId, {
      installedAugmentIds: installedIds.filter(id => id !== augment.id),
    })
  }

  const FILTERS: { value: SlotFilter; label: string }[] = [
    { value: 'all',     label: 'ALL'     },
    { value: 'minor',   label: 'MINOR'   },
    { value: 'major',   label: 'MAJOR'   },
    { value: 'extreme', label: 'EXTREME' },
  ]

  const powerCells    = character.powerCells ?? { current: 0, max: 0 }
  const hasPowerCells = powerCells.max > 0

  function setPowerCells(current: number) {
    updateCharacter(characterId, {
      powerCells: { ...powerCells, current: Math.max(0, Math.min(powerCells.max, current)) },
    })
  }

  return (
    <div className="space-y-4">

      {/* ── Slot counter ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
            Augment Slots
          </p>
          <span className="text-[9px] text-muted-foreground italic">Swap on long rest</span>
        </div>
        <SlotBar used={slotsUsed} max={slotsMax} />
      </div>

      {/* ── Power Cells (if the class resource is configured) ── */}
      {hasPowerCells && (
        <div className="rounded-md border border-[var(--wh-gold)]/20 bg-[var(--wh-gold)]/5 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
              Power Cells
            </p>
            <span className="text-[9px] text-muted-foreground italic">Recharge on short rest</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPowerCells(powerCells.current - 1)}
              disabled={powerCells.current <= 0}
              className="text-[10px] w-5 h-5 rounded border border-border text-muted-foreground hover:bg-muted/50 flex items-center justify-center flex-shrink-0 disabled:opacity-30"
            >
              −
            </button>
            <div className="flex-1 flex gap-1 flex-wrap">
              {Array.from({ length: powerCells.max }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPowerCells(i < powerCells.current ? i : i + 1)}
                  className={`w-4 h-4 rounded-sm border transition-colors ${
                    i < powerCells.current
                      ? 'border-[var(--wh-gold)]/60 bg-[var(--wh-gold)]/40'
                      : 'border-border/60 bg-transparent hover:bg-muted/40'
                  }`}
                  title={i < powerCells.current ? 'Expend cell' : 'Restore cell'}
                />
              ))}
            </div>
            <button
              onClick={() => setPowerCells(powerCells.current + 1)}
              disabled={powerCells.current >= powerCells.max}
              className="text-[10px] w-5 h-5 rounded border border-border text-muted-foreground hover:bg-muted/50 flex items-center justify-center flex-shrink-0 disabled:opacity-30"
            >
              +
            </button>
            <span className="text-sm font-mono font-bold tabular-nums flex-shrink-0 min-w-[3rem] text-right">
              {powerCells.current} / {powerCells.max}
            </span>
          </div>
        </div>
      )}

      {/* ── Installed augments ── */}
      {installedAugments.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
            Installed ({installedAugments.length})
          </p>
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {installedAugments.map(augment => (
              <AugmentRow
                key={augment.id}
                augment={augment}
                characterId={characterId}
                installed
                canInstall={false}
                onInstall={() => {}}
                onUninstall={() => uninstall(augment)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Filter bar ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {FILTERS.map(({ value, label }) => (
          <Button
            key={value}
            size="sm"
            variant={filter === value ? 'default' : 'outline'}
            onClick={() => setFilter(value)}
            className="shrink-0 text-[10px] tracking-wide h-7 px-2"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* ── Universal augments ── */}
      {(() => {
        const visible = universal.filter(a => matchesFilter(a) && !installedIds.includes(a.id))
        if (visible.length === 0) return null
        return (
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
              Universal Augments
            </p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {visible.map(augment => (
                <AugmentRow
                  key={augment.id}
                  augment={augment}
                  characterId={characterId}
                  installed={false}
                  canInstall={slotsUsed + augment.slotCost <= slotsMax}
                  onInstall={() => install(augment)}
                  onUninstall={() => {}}
                />
              ))}
            </div>
          </div>
        )
      })()}

      {/* ── Specialization augments ── */}
      {specialized.length > 0 && (() => {
        const visible = specialized.filter(a => matchesFilter(a) && !installedIds.includes(a.id))
        if (visible.length === 0) return null
        return (
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
              {subclassName} Exclusive
            </p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {visible.map(augment => (
                <AugmentRow
                  key={augment.id}
                  augment={augment}
                  characterId={characterId}
                  installed={false}
                  canInstall={slotsUsed + augment.slotCost <= slotsMax}
                  onInstall={() => install(augment)}
                  onUninstall={() => {}}
                />
              ))}
            </div>
          </div>
        )
      })()}

      {/* ── Empty state ── */}
      {universal.filter(a => matchesFilter(a) && !installedIds.includes(a.id)).length === 0 &&
       specialized.filter(a => matchesFilter(a) && !installedIds.includes(a.id)).length === 0 && (
        <div className="flex flex-col items-center justify-center h-24 gap-1 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-xl">⚙</span>
          <span className="text-xs italic">All augments installed or no matches</span>
        </div>
      )}

    </div>
  )
}
