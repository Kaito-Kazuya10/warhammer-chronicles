import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { useCharacterStore } from '../../../store/characterStore'
import { useDiceStore } from '../../../store/diceStore'
import { rollGeneral } from '../../../utils/dice'
import { getClassById, getFeatById } from '../../../modules/registry'

interface Props {
  characterId: string
}

// ─── Death Saves ──────────────────────────────────────────────────────────────

function DeathSaves({ characterId }: Props) {
  const character    = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  const successes = character.deathSaveSuccesses
  const failures  = character.deathSaveFailures

  function toggleSuccess(i: number) {
    const filled = i < successes
    updateCharacter(characterId, { deathSaveSuccesses: filled ? i : i + 1 })
  }

  function toggleFailure(i: number) {
    const filled = i < failures
    updateCharacter(characterId, { deathSaveFailures: filled ? i : i + 1 })
  }

  const circle = (filled: boolean, color: string, onClick: () => void, key: number) => (
    <button
      key={key}
      onClick={onClick}
      className={`w-6 h-6 rounded-full border-2 transition-colors ${
        filled
          ? `${color} border-transparent`
          : 'bg-transparent border-border hover:border-muted-foreground'
      }`}
      aria-label={filled ? 'Mark as unfilled' : 'Mark as filled'}
    />
  )

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Death Saves
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground w-16">Successes</span>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => circle(i < successes, 'bg-green-500', () => toggleSuccess(i), i))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground w-16">Failures</span>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => circle(i < failures, 'bg-destructive', () => toggleFailure(i), i))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Hit Dice ─────────────────────────────────────────────────────────────────

function HitDice({ characterId }: Props) {
  const character    = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  const addRoll      = useDiceStore(s => s.addRoll)
  if (!character) return null

  const cls    = character.class ? getClassById(character.class) : undefined
  const hitDie = cls?.hitDie ?? 8
  const total  = character.level
  const used   = character.hitDiceUsed
  const avail  = Math.max(0, total - used)

  function handleRollHitDie() {
    if (avail === 0) return
    const result = rollGeneral(1, hitDie)
    addRoll({ ...result, rollType: 'general', label: `Hit Die (d${hitDie})` })
  }

  function useOne() {
    if (used >= total) return
    updateCharacter(characterId, { hitDiceUsed: used + 1 })
  }

  function recoverOne() {
    if (used <= 0) return
    updateCharacter(characterId, { hitDiceUsed: used - 1 })
  }

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Hit Dice
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold font-mono">{avail}</span>
            <button
              className="text-base text-muted-foreground hover:text-primary hover:underline transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              title={avail > 0 ? `Click to roll hit die (d${hitDie})` : 'No hit dice remaining'}
              onClick={handleRollHitDie}
              disabled={avail === 0}
            >
              /{total} d{hitDie}
            </button>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-sm"
              onClick={useOne}
              disabled={avail === 0}
            >
              Use
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-sm"
              onClick={recoverOne}
              disabled={used === 0}
            >
              Recover
            </Button>
          </div>
        </div>
        {used > 0 && (
          <p className="text-sm text-muted-foreground mt-1">{used} used</p>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Languages ────────────────────────────────────────────────────────────────

function Languages({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character) return null

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {character.languages.length === 0 ? (
          <p className="text-base italic text-muted-foreground">None</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {character.languages.map(lang => (
              <Badge key={lang} variant="outline" className="text-sm">{lang}</Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Feats ────────────────────────────────────────────────────────────────────

function FeatRow({ featId }: { featId: string }) {
  const [open, setOpen] = useState(false)
  const feat = getFeatById(featId)
  if (!feat) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full text-left">
        <div className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-muted/30 transition-colors group">
          <span
            className="flex-shrink-0 text-sm text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
            style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 150ms' }}
          >
            ▶
          </span>
          <span className="flex-1 font-medium text-base">{feat.name}</span>
          {feat.source === 'warhammer' && (
            <Badge className="text-[11px] py-0 px-1 bg-[var(--wh-gold)]/15 text-[var(--wh-gold)] border-[var(--wh-gold)]/30">
              40K
            </Badge>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mx-3 mb-2 mt-0.5 pl-6 text-base text-muted-foreground border-l border-border leading-relaxed space-y-1">
          {feat.prerequisite && (
            <p className="text-xs text-muted-foreground/60 italic">
              Prerequisite: {feat.prerequisite}
            </p>
          )}
          <p>{feat.description}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function Feats({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character) return null

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Feats
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1">
        {character.featIds.length === 0 ? (
          <p className="text-base italic text-muted-foreground px-3 py-2">No feats acquired yet.</p>
        ) : (
          character.featIds.map(id => <FeatRow key={id} featId={id} />)
        )}
      </CardContent>
    </Card>
  )
}

// ─── Currency ─────────────────────────────────────────────────────────────────

function Currency({ characterId }: Props) {
  const character    = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Currency
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex gap-3">
          {(['thrones', 'melt', 'aquila'] as const).map(key => (
            <div key={key} className="flex-1 flex flex-col items-center gap-1">
              <Input
                type="number"
                min={0}
                value={character.currency[key]}
                onChange={e =>
                  updateCharacter(characterId, {
                    currency: { ...character.currency, [key]: Math.max(0, Number(e.target.value) || 0) },
                  })
                }
                className="text-center font-mono text-base h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Rest History ─────────────────────────────────────────────────────────────

function RestHistory({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  if (!character || (!character.lastShortRest && !character.lastLongRest)) return null

  function fmtTime(ts: number): string {
    return new Date(ts).toLocaleString(undefined, {
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Rest History
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 space-y-1.5">
        {character.lastShortRest && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Short Rest</span>
            <span className="text-sm font-mono text-foreground">{fmtTime(character.lastShortRest)}</span>
          </div>
        )}
        {character.lastLongRest && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Long Rest</span>
            <span className="text-sm font-mono text-foreground">{fmtTime(character.lastLongRest)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Substance History ───────────────────────────────────────────────────────

function SubstanceHistory({ characterId }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)
  if (!character) return null

  const cured = (character.addictions ?? [])
    .filter(a => a.status === 'cured')
    .sort((a, b) => (b.curedAt ?? '').localeCompare(a.curedAt ?? ''))

  const active = (character.addictions ?? []).filter(a => a.status !== 'cured')

  if (cured.length === 0 && active.length === 0) return null

  const clearHistory = () => {
    if (!confirm('Remove all cured addiction history?')) return
    updateCharacter(characterId, {
      addictions: active,
    })
  }

  const fmtDate = (iso?: string) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <Card>
      <CardHeader className="py-2 px-3 bg-muted/20 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
            Substance History
          </CardTitle>
          {cured.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory} className="h-5 text-[10px] text-destructive px-1.5">
              Clear History
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-3 space-y-2">
        {cured.length === 0 ? (
          <p className="text-xs text-muted-foreground">No substance history.</p>
        ) : (
          cured.map(a => (
            <div key={a.id} className="flex items-center justify-between text-sm border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
              <div>
                <span className="font-medium">{a.substanceName}</span>
                <span className="text-xs text-muted-foreground ml-2">DC {a.addictionDC}</span>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <div>{fmtDate(a.contractedAt)} → {fmtDate(a.curedAt)}</div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

// ─── ExtrasTab ────────────────────────────────────────────────────────────────

export default function ExtrasTab({ characterId }: Props) {
  return (
    <div className="space-y-3">
      <DeathSaves  characterId={characterId} />
      <HitDice     characterId={characterId} />
      <RestHistory characterId={characterId} />
      <Languages   characterId={characterId} />
      <Feats       characterId={characterId} />
      <Currency    characterId={characterId} />
      <SubstanceHistory characterId={characterId} />
    </div>
  )
}
