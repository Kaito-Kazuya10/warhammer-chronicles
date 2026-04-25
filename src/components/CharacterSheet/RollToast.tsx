import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDiceStore } from '../../store/diceStore'
import { fmtTime } from '../../utils/dice'

// ─── Roll type icons ──────────────────────────────────────────────────────────

const ROLL_ICONS: Record<string, string> = {
  ability:    '💪',
  skill:      '🎯',
  save:       '🛡',
  initiative: '⚡',
  attack:     '⚔',
  damage:     '💥',
  general:    '🎲',
}

// ─── RollToast ────────────────────────────────────────────────────────────────

export default function RollToast() {
  const { latestRoll, dismissLatest } = useDiceStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!latestRoll) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(dismissLatest, 3000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [latestRoll, dismissLatest])

  if (!latestRoll) return null

  const roll = latestRoll
  const icon = ROLL_ICONS[roll.rollType] ?? '🎲'

  const borderClass = roll.isNat20
    ? 'border-amber-400 shadow-lg shadow-amber-400/30'
    : roll.isNat1
      ? 'border-red-400 shadow-lg shadow-red-400/30'
      : 'border-border shadow-md'

  const totalClass = roll.isNat20
    ? 'text-amber-500'
    : roll.isNat1
      ? 'text-red-500'
      : 'text-foreground'

  // Format the dice breakdown string
  const breakdown = roll.advantageRolls
    ? `d20: [${roll.advantageRolls[0]}, ${roll.advantageRolls[1]}] → ${roll.rolls[0]}${roll.modifierBreakdown ? `  ${roll.modifierBreakdown}` : ''}`
    : roll.rollType === 'general'
      ? `[${roll.rolls.join(' + ')}]${roll.rolls.length > 1 ? ` = ${roll.total}` : ''}`
      : `d20: ${roll.rolls[0]}${roll.modifierBreakdown ? `  ${roll.modifierBreakdown}` : ''}`

  return (
    <div
      className="fixed top-16 left-1/2 -tranzinc-x-1/2 z-50 pointer-events-auto"
      style={{ animation: 'toast-enter 200ms ease-out' }}
    >
      <Card
        role="alert"
        aria-live="assertive"
        className={`w-72 cursor-pointer border-2 ${borderClass} bg-card`}
        onClick={dismissLatest}
      >
        <div className="p-3 space-y-1">
          {/* Header: icon + label */}
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">
              {icon} {roll.label}
            </span>
            <span className="text-xs text-muted-foreground">{fmtTime(roll.timestamp)}</span>
          </div>

          {/* Big total */}
          <div className={`text-4xl font-bold text-center py-1 leading-none ${totalClass}`}>
            {roll.total}
          </div>

          {/* Breakdown */}
          <p className="text-xs text-muted-foreground text-center font-mono">{breakdown}</p>

          {/* Special badges */}
          <div className="flex justify-center gap-1.5">
            {roll.isNat20 && (
              <Badge className="bg-amber-500/20 text-amber-600 border-amber-400 text-xs font-bold">
                NAT 20!
              </Badge>
            )}
            {roll.isNat1 && (
              <Badge className="bg-red-500/20 text-red-600 border-red-400 text-xs">
                NAT 1...
              </Badge>
            )}
            {roll.advantageMode && (
              <Badge variant="outline" className="text-xs capitalize">
                {roll.advantageMode}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
