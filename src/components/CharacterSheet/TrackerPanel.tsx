import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { useCharacterStore } from '../../store/characterStore'

// ─── Currency ─────────────────────────────────────────────────────────────────

function Currency({ characterId }: { characterId: string }) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  const field = (label: string, value: number, key: 'thrones' | 'melt' | 'aquila') => (
    <div key={key} className="flex flex-col items-center gap-0.5 flex-1">
      <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground font-medium">{label}</span>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={e =>
          updateCharacter(characterId, {
            currency: { ...character.currency, [key]: Math.max(0, Number(e.target.value) || 0) },
          })
        }
        className="h-7 text-center text-sm px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  )

  return (
    <div>
      <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Currency</p>
      <div className="flex gap-2">
        {field('Thrones', character.currency.thrones, 'thrones')}
        {field('Melt',    character.currency.melt,    'melt')}
        {field('Aquila',  character.currency.aquila,  'aquila')}
      </div>
    </div>
  )
}

// ─── Warp Bar (Psyker) ────────────────────────────────────────────────────────

function WarpBar({ characterId }: { characterId: string }) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character || character.warpBar === undefined) return null

  const value = character.warpBar
  const max   = 20
  const pct   = (value / max) * 100
  const color = pct <= 35
    ? 'oklch(0.430 0.080 235)'
    : pct <= 70
      ? 'oklch(0.45 0.12 290)'
      : 'var(--wh-warning)'

  const set = (v: number) =>
    updateCharacter(characterId, { warpBar: Math.max(0, Math.min(max, v)) })

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Warp Bar</p>
        <div className="flex items-center gap-1">
          <Button size="xs" variant="outline" onClick={() => set(value - 1)} className="w-5 h-5 p-0 text-xs">−</Button>
          <span className="font-mono text-sm font-medium w-8 text-center">{value} / {max}</span>
          <Button size="xs" variant="outline" onClick={() => set(value + 1)} className="w-5 h-5 p-0 text-xs">+</Button>
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

// ─── Augment Slots ────────────────────────────────────────────────────────────

function AugmentSlots({ characterId }: { characterId: string }) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character || character.augmentSlots === undefined) return null

  const used  = character.installedAugmentIds?.length ?? 0
  const total = character.augmentSlots

  return (
    <div>
      <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">Augment Slots</p>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`w-4 h-4 rounded border-2 transition-colors ${
              i < used
                ? 'bg-[var(--wh-info)] border-[var(--wh-info)]'
                : 'bg-transparent border-border'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground font-mono ml-1">{used} / {total}</span>
      </div>
    </div>
  )
}

// ─── GM Panel ─────────────────────────────────────────────────────────────────

function GMPanel({ characterId }: { characterId: string }) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const [gmMode, setGmMode] = useState<boolean>(
    () => localStorage.getItem('wh40k-gm-mode') === 'true'
  )

  if (!character) return null

  const toggleGm = (open: boolean) => {
    localStorage.setItem('wh40k-gm-mode', String(open))
    setGmMode(open)
    window.dispatchEvent(new Event('gm-mode-change'))
  }

  const numField = (
    label: string,
    value: number,
    max: number,
    onChange: (v: number) => void,
  ) => (
    <div key={label} className="flex items-center justify-between">
      <span className="text-xs text-foreground/70">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-muted-foreground font-mono">{value}/{max}</span>
        <Input
          type="number"
          min={0}
          max={max}
          value={value}
          onChange={e => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
          className="h-6 w-14 text-center text-xs px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  )

  return (
    <Collapsible open={gmMode} onOpenChange={toggleGm}>
      <TooltipProvider delay={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
                {gmMode ? '🔓' : '🔒'} GM Panel
              </span>
              <span
                className="text-muted-foreground text-xs transition-transform duration-200"
                style={{ transform: gmMode ? 'rotate(90deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                ▶
              </span>
            </CollapsibleTrigger>
          </TooltipTrigger>
          <TooltipContent side="right">
            Toggle GM mode to view hidden trackers
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <CollapsibleContent>
        <div className="border-l-2 border-destructive/40 pl-3 py-1 space-y-2 mt-1">
          {numField('Warp Exposure', character.warpExposure, 10,  v => updateCharacter(characterId, { warpExposure: v }))}
          {numField('Corruption',    character.corruption,   100, v => updateCharacter(characterId, { corruption: v }))}
          {numField('Faith',         character.faith,        100, v => updateCharacter(characterId, { faith: v }))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── TrackerPanel ─────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function TrackerPanel({ characterId }: Props) {
  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
          Trackers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-4">
        <Currency     characterId={characterId} />
        <WarpBar      characterId={characterId} />
        <AugmentSlots characterId={characterId} />
        <GMPanel      characterId={characterId} />
      </CardContent>
    </Card>
  )
}
