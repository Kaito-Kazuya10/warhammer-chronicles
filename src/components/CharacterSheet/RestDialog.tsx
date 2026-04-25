import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useCharacterStore, getModifier } from '../../store/characterStore'
import { getClassById, getGeneModificationById } from '../../modules/registry'
import { resolveUsesCount } from '../../utils/resolveUsesCount'
import type { Character, SpellSlots } from '../../types/character'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function resetSpellSlots(slots: SpellSlots): SpellSlots {
  const result: SpellSlots = {}
  for (const [level, slot] of Object.entries(slots)) {
    result[Number(level)] = { ...slot, used: 0 }
  }
  return result
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  characterId: string
  restType: 'short' | 'long'
  open: boolean
  onClose: () => void
}

// ─── RestDialog ───────────────────────────────────────────────────────────────

export default function RestDialog({ characterId, restType, open, onClose }: Props) {
  const character       = useCharacterStore(s => s.characters.find(c => c.id === characterId))
  const updateCharacter = useCharacterStore(s => s.updateCharacter)

  const [hpGained,   setHpGained]   = useState(0)
  const [diceSpent,  setDiceSpent]  = useState(0)
  const [rollLog,    setRollLog]    = useState<string[]>([])

  // Reset local state whenever the dialog opens
  useEffect(() => {
    if (open) {
      setHpGained(0)
      setDiceSpent(0)
      setRollLog([])
    }
  }, [open])

  if (!character) return null

  const cls       = character.class ? getClassById(character.class) : undefined
  const subclass  = cls?.subclasses?.find(sc => sc.id === character.subclass)
  const hitDie    = cls?.hitDie ?? 8
  const conMod    = getModifier(character.abilityScores.constitution)
  const conModStr = conMod >= 0 ? `+${conMod}` : String(conMod)
  const availDice = Math.max(0, character.level - character.hitDiceUsed - diceSpent)

  // Gather limited-use features at or below character level
  const allFeatures = [
    ...(cls?.features ?? []).filter(f => f.level <= character.level),
    ...(subclass?.features ?? []).filter(f => f.level <= character.level),
  ].filter(f =>
    f.usesPerRest &&
    f.usesPerRest !== 'at-will' &&
    f.usesPerRest !== 'per-encounter' &&
    f.usesCount,
  )

  const shortRestFeatures = allFeatures.filter(f => f.usesPerRest === 'short')
  const longRestFeatures  = allFeatures // short and long rest features reset on long rest
  const featuresForRest   = restType === 'short' ? shortRestFeatures : longRestFeatures

  // Class resource
  const classResource    = cls?.classResource
  const showClassResource = classResource &&
    classResource.playerVisible &&
    (restType === 'long' || classResource.resetOn === 'short')

  // Hit dice recovery (long rest)
  const diceToRecover   = restType === 'long' ? Math.max(1, Math.floor(character.level / 2)) : 0
  const hitDiceAvailNow = character.level - character.hitDiceUsed
  const hitDiceAfterRest = Math.min(character.level, hitDiceAvailNow + diceToRecover)

  // Spell slots
  const hasSpellSlots = Object.keys(character.spellSlots).length > 0
  const hasUsedSlots  = hasSpellSlots &&
    Object.values(character.spellSlots).some(s => s.used > 0)

  // Power Cells max (Augmenticist)
  const powerCellsMax = character.powerCells?.max ?? null

  // HP after spending hit dice
  const hpAfterDice = Math.min(character.maxHitPoints, character.currentHitPoints + hpGained)

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const spendHitDie = () => {
    if (availDice <= 0) return
    const roll  = Math.floor(Math.random() * hitDie) + 1
    const gain  = Math.max(1, roll + conMod)
    const entry = `d${hitDie} → ${roll} ${conMod >= 0 ? '+' : ''}${conMod} CON = +${gain} HP`
    setRollLog(l => [...l, entry])
    setHpGained(g => g + gain)
    setDiceSpent(d => d + 1)
  }

  const handleClose = () => {
    setHpGained(0)
    setDiceSpent(0)
    setRollLog([])
    onClose()
  }

  const handleConfirm = () => {
    const patch: Partial<Character> = {}

    if (restType === 'short') {
      // Apply HP from hit dice spending
      if (hpGained > 0) {
        patch.currentHitPoints = hpAfterDice
      }
      patch.hitDiceUsed = character.hitDiceUsed + diceSpent

      // Reset class resource if it resets on short rest
      if (classResource?.resetOn === 'short') {
        if (character.powerCells !== undefined) {
          patch.powerCells = { ...character.powerCells, current: character.powerCells.max }
        }
        if (character.trickUsesRemaining !== undefined) {
          patch.trickUsesRemaining = 2 * character.proficiencyBonus
        }
        if (character.classResourceCurrent !== undefined && classResource.type === 'pool') {
          patch.classResourceCurrent = character.proficiencyBonus
        }
        if (character.classResourceDiceRemaining !== undefined) {
          patch.classResourceDiceRemaining = character.proficiencyBonus
        }
        // Warp Bar: reduce by 1d6 on short rest (does not reset to 0)
        if (character.warpBar !== undefined) {
          const roll = Math.floor(Math.random() * 6) + 1
          patch.warpBar = Math.max(0, character.warpBar - roll)
        }
      }

      // Clear spent uses for short-rest features
      const newSpent = { ...(character.featureUsesSpent ?? {}) }
      for (const f of shortRestFeatures) {
        delete newSpent[slugify(f.name)]
      }
      // Clear short-rest gene mod uses
      for (const modId of character.installedModIds ?? []) {
        const mod = getGeneModificationById(modId)
        if (mod?.surgeUsesPerRest === 'short') {
          delete newSpent[`mod-${slugify(mod.name)}`]
        }
      }
      patch.featureUsesSpent = newSpent
      patch.lastShortRest    = Date.now()

    } else {
      // Long rest — full restore
      patch.currentHitPoints = character.maxHitPoints
      patch.hitDiceUsed      = Math.max(0, character.hitDiceUsed - diceToRecover)

      // Reset all class resources
      if (character.powerCells !== undefined) {
        patch.powerCells = { ...character.powerCells, current: character.powerCells.max }
      }
      if (character.trickUsesRemaining !== undefined) {
        patch.trickUsesRemaining = 2 * character.proficiencyBonus
      }
      if (character.commandDiceRemaining !== undefined) {
        patch.commandDiceRemaining = character.proficiencyBonus
      }
      if (character.classResourceCurrent !== undefined) {
        patch.classResourceCurrent = character.proficiencyBonus
      }
      if (character.classResourceDiceRemaining !== undefined) {
        patch.classResourceDiceRemaining = character.proficiencyBonus
      }
      if (character.geneSurgesRemaining !== undefined) {
        patch.geneSurgesRemaining = character.level <= 5 ? 3 : 4
      }
      // Warp Bar resets to 0 on long rest
      if (character.warpBar !== undefined) {
        patch.warpBar = 0
      }

      // Reset spell/prayer slots
      if (hasSpellSlots) {
        patch.spellSlots = resetSpellSlots(character.spellSlots)
      }

      // Clear all feature uses
      patch.featureUsesSpent = {}
      patch.lastLongRest     = Date.now()
    }

    updateCharacter(characterId, patch)
    handleClose()
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <AlertDialog open={open} onOpenChange={v => { if (!v) handleClose() }}>
      <AlertDialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            {restType === 'short' ? '⛺ Short Rest' : '🌙 Long Rest'}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-base text-muted-foreground -mt-2">
          Duration: {restType === 'short' ? '1 hour' : '8 hours'}
        </p>

        <div className="space-y-3 py-1">
          <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            The following will be refreshed:
          </p>

          {/* ── Hit Dice / HP ─────────────────────────────────────────────── */}
          {restType === 'short' ? (
            /* Hit Dice Spender */
            <div className="border border-border rounded-md p-3 space-y-2">
              <p className="text-base font-medium">Hit Dice</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Available:{' '}
                  <span className="font-mono font-semibold text-foreground">
                    {availDice}/{character.level} d{hitDie}
                  </span>
                </span>
                {hpGained > 0 && (
                  <span className="text-[var(--wh-success)] font-medium font-mono">
                    +{hpGained} HP → {hpAfterDice}/{character.maxHitPoints}
                  </span>
                )}
              </div>
              {rollLog.length > 0 && (
                <div className="text-xs text-muted-foreground space-y-0.5 font-mono border-l-2 border-border pl-2">
                  {rollLog.map((entry, i) => <div key={i}>{entry}</div>)}
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={spendHitDie}
                disabled={availDice <= 0}
                className="w-full text-sm h-7"
              >
                Spend 1 Hit Die (d{hitDie} {conModStr} CON)
              </Button>
            </div>
          ) : (
            /* Long rest — HP + dice summary */
            <div className="border border-border rounded-md p-3 space-y-2">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">Wounds (HP)</span>
                <span className="text-[var(--wh-success)] font-mono text-sm">
                  → {character.maxHitPoints} / {character.maxHitPoints}
                </span>
              </div>
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">Hit Dice Recovered</span>
                <span className="text-[var(--wh-info)] font-mono text-sm">
                  +{diceToRecover} d{hitDie}
                  {' '}({hitDiceAvailNow} → {hitDiceAfterRest} / {character.level})
                </span>
              </div>
            </div>
          )}

          {/* ── Class Resource ────────────────────────────────────────────── */}
          {showClassResource && classResource && (
            <div className="border border-border rounded-md p-3">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">{classResource.name}</span>
                <span className="text-[var(--wh-info)] font-mono text-sm">
                  Reset to max{powerCellsMax !== null ? ` (${powerCellsMax})` : ''}
                </span>
              </div>
            </div>
          )}

          {/* ── Spell / Prayer Slots (long rest) ──────────────────────────── */}
          {restType === 'long' && hasUsedSlots && (
            <div className="border border-border rounded-md p-3">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">Spell / Prayer Slots</span>
                <span className="text-[var(--wh-info)] font-mono text-sm">Fully restored</span>
              </div>
            </div>
          )}

          {/* ── Feature uses ──────────────────────────────────────────────── */}
          {featuresForRest.length > 0 && (
            <div className="border border-border rounded-md p-3 space-y-1.5">
              <p className="text-base font-medium">Features recharged:</p>
              {featuresForRest.map(f => {
                const max = resolveUsesCount(f.usesCount, character)
                const restLabel = f.usesPerRest === 'short' ? 'SR' : 'LR'
                return (
                  <div key={f.name} className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground truncate">{f.name}</span>
                    <span className="text-xs font-mono text-[var(--wh-success)] whitespace-nowrap flex-shrink-0">
                      {max} use{max !== 1 ? 's' : ''} [{restLabel}]
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <Button variant="outline" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            {restType === 'short' ? 'Confirm Short Rest' : 'Confirm Long Rest'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
