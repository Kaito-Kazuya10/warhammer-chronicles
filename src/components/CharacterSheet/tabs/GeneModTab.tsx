import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { useDiceStore } from '../../../store/diceStore'
import { getAllGeneModifications, getGeneModificationById, getAllClasses } from '../../../modules/registry'
import { renderDescription } from '../../../utils/renderDescription'
import { rollCheck } from '../../../utils/dice'
import type { GeneModification } from '../../../types/module'

// ─── Types ────────────────────────────────────────────────────────────────────

type TierFilter = 'all' | 'minor' | 'major' | 'extreme'

// ─── Constants ────────────────────────────────────────────────────────────────

const TIER_COLOR: Record<GeneModification['tier'], string> = {
  minor:   'bg-green-500/10 text-green-700 border-green-500/30',
  major:   'bg-blue-500/10 text-blue-700 border-blue-500/30',
  extreme: 'bg-purple-500/10 text-purple-700 border-purple-500/30',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcStabilityScore(conScore: number, proficiencyBonus: number): number {
  const conMod = Math.floor((conScore - 10) / 2)
  return conMod + proficiencyBonus * 2
}

// ─── StabilityBar ─────────────────────────────────────────────────────────────

function StabilityBar({ used, max }: { used: number; max: number }) {
  const pct   = max > 0 ? Math.min(1, used / max) : 0
  const color = pct >= 1 ? 'var(--wh-crimson)' : pct >= 0.75 ? 'var(--wh-warning)' : 'hsl(var(--primary))'

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
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground flex-shrink-0">SP</span>
    </div>
  )
}

// ─── StabPips ─────────────────────────────────────────────────────────────────

function StabPips({ cost, installed }: { cost: number; installed?: boolean }) {
  return (
    <div className="flex gap-0.5 items-center flex-shrink-0">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-sm border ${
            i < cost
              ? installed
                ? 'bg-foreground/70 border-foreground/70'
                : 'bg-primary/60 border-primary/60'
              : 'bg-transparent border-border/50'
          }`}
        />
      ))}
    </div>
  )
}

// ─── GeneModRow ───────────────────────────────────────────────────────────────

function GeneModRow({
  mod,
  installed,
  canInstall,
  onInstall,
  onUninstall,
}: {
  mod: GeneModification
  installed: boolean
  canInstall: boolean
  onInstall: () => void
  onUninstall: () => void
}) {
  const [open, setOpen] = useState(false)

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
                <span className="text-sm font-medium text-foreground">{mod.name}</span>
                <StabPips cost={mod.stabilityCost} installed={installed} />
                <Badge variant="outline" className={`text-[9px] py-0 px-1 ${TIER_COLOR[mod.tier]}`}>
                  {mod.tier}
                </Badge>
                {mod.tags?.map(tag => (
                  <span key={tag} className="text-[9px] text-muted-foreground/60">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        <div className="self-start mt-1.5 mr-2 flex-shrink-0">
          {installed ? (
            <button
              onClick={onUninstall}
              className="text-[9px] px-1.5 py-0.5 rounded border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
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
              title={canInstall ? 'Install modification' : 'Exceeds stability threshold'}
            >
              INSTALL
            </button>
          )}
        </div>
      </div>

      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-xs text-muted-foreground border-l border-border space-y-1.5">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 mb-0.5">Passive Effect</p>
            <div>{renderDescription(mod.passiveEffect)}</div>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-widest text-primary/60 mb-0.5">During Gene-Surge</p>
            <div>{renderDescription(mod.geneSurgeEffect)}</div>
          </div>
          {mod.sideEffect && (
            <div>
              <p className="text-[9px] uppercase tracking-widest text-[var(--wh-warning)]/70 mb-0.5">Side Effect</p>
              <div className="text-[var(--wh-warning)]/80">{renderDescription(mod.sideEffect)}</div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── GeneModTab ───────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function GeneModTab({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const addRoll         = useDiceStore(s => s.addRoll)
  const [filter, setFilter] = useState<TierFilter>('all')

  if (!character) return null

  const allMods      = getAllGeneModifications()
  const installedIds = character.installedModIds ?? []

  // Stability budget
  const stabilityMax  = calcStabilityScore(character.abilityScores.constitution, character.proficiencyBonus)
  const installedMods = installedIds
    .map(id => getGeneModificationById(id))
    .filter((m): m is GeneModification => m !== undefined)
  const stabilityUsed = installedMods.reduce((sum, m) => sum + m.stabilityCost, 0)

  // Gene-Surge state
  const isInSurge = character.isInGeneSurge ?? false

  function toggleSurge() {
    updateCharacter(characterId, { isInGeneSurge: !isInSurge })
  }

  // Stability Check roll:
  // freeSlots = stabilityMax - stabilityUsed
  //   > 0 → bonus (more free = easier)
  //   = 0 → flat
  //   < 0 → penalty (over limit)
  function rollStabilityCheck() {
    const freeSlots = stabilityMax - stabilityUsed
    const breakdown = freeSlots === 0
      ? 'No free stability (at max)'
      : freeSlots > 0
        ? `+${freeSlots} free stability slots`
        : `${freeSlots} over stability threshold`
    addRoll(rollCheck('Gene Stability Check', 'general', freeSlots, breakdown))
  }

  // Archetype name for section header
  const cls        = getAllClasses().find(c => c.id === character.class)
  const subclass   = cls?.subclasses?.find(sc => sc.id === character.subclass)
  const archName   = subclass?.name ?? 'Archetype'

  // Split pool: base (no archetype) vs archetype-exclusive
  const baseMods      = allMods.filter(m => !m.archetype)
  const archetypeMods = allMods.filter(m => m.archetype === character.subclass)

  function matchesFilter(m: GeneModification) {
    return filter === 'all' || m.tier === filter
  }

  function install(mod: GeneModification) {
    updateCharacter(characterId, {
      installedModIds: [...installedIds, mod.id],
    })
  }

  function uninstall(mod: GeneModification) {
    updateCharacter(characterId, {
      installedModIds: installedIds.filter(id => id !== mod.id),
    })
  }

  const FILTERS: { value: TierFilter; label: string }[] = [
    { value: 'all',     label: 'ALL'     },
    { value: 'minor',   label: 'MINOR'   },
    { value: 'major',   label: 'MAJOR'   },
    { value: 'extreme', label: 'EXTREME' },
  ]

  const overThreshold = stabilityUsed > stabilityMax

  return (
    <div className="space-y-4">

      {/* ── Stability + Gene-Surge row ── */}
      <div className="rounded-md border border-green-500/20 bg-green-500/5 p-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">
              Genetic Stability
              <span className="ml-1 text-muted-foreground/50 normal-case tracking-normal font-normal">
                (CON mod + prof × 2)
              </span>
            </p>
          </div>
          {/* Gene-Surge toggle */}
          <button
            onClick={toggleSurge}
            className={`shrink-0 text-[9px] px-2 py-1 rounded border transition-colors font-semibold tracking-widest ${
              isInSurge
                ? 'border-green-500/60 bg-green-500/20 text-green-400 hover:bg-green-500/30'
                : 'border-border text-muted-foreground/60 hover:border-green-500/40 hover:text-green-400/70'
            }`}
            title={isInSurge ? 'End Gene-Surge' : 'Activate Gene-Surge'}
          >
            {isInSurge ? '🧬 SURGING' : 'GENE-SURGE'}
          </button>
        </div>

        <StabilityBar used={stabilityUsed} max={stabilityMax} />

        <div className="flex items-center justify-between gap-2">
          {overThreshold ? (
            <p className="text-[9px] text-[var(--wh-crimson)] font-semibold">
              ⚠ Over threshold by {stabilityUsed - stabilityMax} SP — stability check penalty active
            </p>
          ) : (
            <p className="text-[9px] text-muted-foreground/50 italic">
              {stabilityMax - stabilityUsed > 0
                ? `+${stabilityMax - stabilityUsed} bonus to stability check`
                : 'At limit — no bonus or penalty'}
            </p>
          )}
          <button
            onClick={rollStabilityCheck}
            className="shrink-0 text-[9px] px-2 py-1 rounded border border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors tracking-wider"
            title="Roll Gene Stability Check (d20 ± free stability slots)"
          >
            🎲 STABILITY CHECK
          </button>
        </div>
      </div>

      {/* ── Installed Modifications ── */}
      {installedMods.length > 0 && (
        <div>
          <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
            Installed ({installedMods.length})
          </p>
          <div className="divide-y divide-border/50 border border-border rounded-md">
            {installedMods.map(mod => (
              <GeneModRow
                key={mod.id}
                mod={mod}
                installed
                canInstall={false}
                onInstall={() => {}}
                onUninstall={() => uninstall(mod)}
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

      {/* ── Base Modifications pool ── */}
      {(() => {
        const visible = baseMods.filter(m => matchesFilter(m) && !installedIds.includes(m.id))
        if (visible.length === 0) return null
        return (
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
              Base Modifications
            </p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {visible.map(mod => (
                <GeneModRow
                  key={mod.id}
                  mod={mod}
                  installed={false}
                  canInstall={true}
                  onInstall={() => install(mod)}
                  onUninstall={() => {}}
                />
              ))}
            </div>
          </div>
        )
      })()}

      {/* ── Archetype Modifications pool ── */}
      {archetypeMods.length > 0 && (() => {
        const visible = archetypeMods.filter(m => matchesFilter(m) && !installedIds.includes(m.id))
        if (visible.length === 0) return null
        return (
          <div>
            <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-1">
              {archName} Exclusive
            </p>
            <div className="divide-y divide-border/50 border border-border rounded-md">
              {visible.map(mod => (
                <GeneModRow
                  key={mod.id}
                  mod={mod}
                  installed={false}
                  canInstall={true}
                  onInstall={() => install(mod)}
                  onUninstall={() => {}}
                />
              ))}
            </div>
          </div>
        )
      })()}

      {/* ── Empty state ── */}
      {baseMods.filter(m => matchesFilter(m) && !installedIds.includes(m.id)).length === 0 &&
       archetypeMods.filter(m => matchesFilter(m) && !installedIds.includes(m.id)).length === 0 && (
        <div className="flex flex-col items-center justify-center h-24 gap-1 text-muted-foreground/50 border border-dashed border-border rounded-lg">
          <span className="text-xl">🧬</span>
          <span className="text-xs italic">All modifications installed or no matches</span>
        </div>
      )}

    </div>
  )
}
