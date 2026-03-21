import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useDiceStore } from '../../store/diceStore'
import DiceToolbar from './DiceToolbar'
import { fmtTime } from '../../utils/dice'
import type { DiceRollResult } from '../../utils/dice'

// ─── Roll type colors (left border) ──────────────────────────────────────────

function rollBorderColor(roll: DiceRollResult): string {
  if (roll.isNat20) return 'border-l-amber-400'
  if (roll.isNat1)  return 'border-l-red-400'
  switch (roll.rollType) {
    case 'ability':    return 'border-l-blue-400'
    case 'skill':      return 'border-l-green-400'
    case 'save':       return 'border-l-orange-400'
    case 'initiative': return 'border-l-purple-400'
    default:           return 'border-l-border'
  }
}

// ─── Roll icons ───────────────────────────────────────────────────────────────

const ROLL_ICONS: Record<string, string> = {
  ability:    '💪',
  skill:      '🎯',
  save:       '🛡',
  initiative: '⚡',
  attack:     '⚔',
  damage:     '💥',
  general:    '🎲',
}

// ─── Single roll entry ────────────────────────────────────────────────────────

function RollEntry({ roll }: { roll: DiceRollResult }) {
  const icon      = ROLL_ICONS[roll.rollType] ?? '🎲'
  const border    = rollBorderColor(roll)
  const totalClass = roll.isNat20 ? 'text-amber-500' : roll.isNat1 ? 'text-red-500' : 'text-foreground'

  const breakdown = roll.advantageRolls
    ? `[${roll.advantageRolls[0]}, ${roll.advantageRolls[1]}]→${roll.rolls[0]}${roll.modifierBreakdown ? ` ${roll.modifierBreakdown}` : ''}`
    : roll.rollType === 'general'
      ? `[${roll.rolls.join('+')}]`
      : `d20: ${roll.rolls[0]}${roll.modifierBreakdown ? `  ${roll.modifierBreakdown}` : ''}`

  return (
    <div className={`border-l-4 ${border} pl-3 pr-2 py-2 hover:bg-muted/30 transition-colors`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-foreground">
          {icon} {roll.label}
        </span>
        <span className={`text-lg font-bold font-mono tabular-nums shrink-0 ${totalClass}`}>
          {roll.total}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{breakdown}</p>
      <div className="flex items-center gap-1.5 mt-1">
        {roll.isNat20 && (
          <Badge className="bg-amber-500/20 text-amber-600 border-amber-400 text-[9px] h-4 px-1 font-bold">NAT 20!</Badge>
        )}
        {roll.isNat1 && (
          <Badge className="bg-red-500/20 text-red-600 border-red-400 text-[9px] h-4 px-1">NAT 1</Badge>
        )}
        {roll.advantageMode && (
          <Badge variant="outline" className="text-[9px] h-4 px-1 capitalize">{roll.advantageMode}</Badge>
        )}
        <span className="text-[9px] text-muted-foreground/60 ml-auto">{fmtTime(roll.timestamp)}</span>
      </div>
    </div>
  )
}

// ─── RollHistoryPanel ─────────────────────────────────────────────────────────

export default function RollHistoryPanel() {
  const { history, isHistoryOpen, setHistoryOpen, clearHistory } = useDiceStore()

  return (
    <Sheet open={isHistoryOpen} onOpenChange={setHistoryOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[350px] sm:max-w-[350px] p-0 flex flex-col gap-0"
      >
        {/* Header */}
        <SheetHeader className="border-b p-4 pb-3 flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
            Roll History
          </SheetTitle>
          <div className="flex items-center gap-1.5">
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-xs h-7 text-muted-foreground hover:text-destructive"
              >
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHistoryOpen(false)}
              className="h-7 w-7 p-0 text-muted-foreground"
            >
              ✕
            </Button>
          </div>
        </SheetHeader>

        {/* Dice toolbar */}
        <div className="border-b p-4 py-3">
          <DiceToolbar />
        </div>

        {/* Roll list */}
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground/50">
              <span className="text-2xl">🎲</span>
              <span className="text-xs italic">No rolls yet</span>
            </div>
          ) : (
            <div className="divide-y divide-border/50">
              {history.map(roll => (
                <RollEntry key={roll.id} roll={roll} />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
