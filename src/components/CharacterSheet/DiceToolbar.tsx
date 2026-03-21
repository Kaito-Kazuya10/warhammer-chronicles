import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDiceStore } from '../../store/diceStore'
import { rollGeneral, rollCheck } from '../../utils/dice'

// ─── Quick dice sizes ─────────────────────────────────────────────────────────

const QUICK_DICE = [4, 6, 8, 10, 12, 20, 100]

// ─── DiceToolbar ─────────────────────────────────────────────────────────────

export default function DiceToolbar() {
  const addRoll = useDiceStore(s => s.addRoll)

  const [count,    setCount]    = useState(1)
  const [sides,    setSides]    = useState(20)
  const [advMode,  setAdvMode]  = useState<'normal' | 'advantage' | 'disadvantage'>('normal')

  const handleQuickRoll = (s: number) => {
    if (s === 20 && advMode !== 'normal') {
      const result = rollCheck(
        advMode === 'advantage' ? 'Roll (Advantage)' : 'Roll (Disadvantage)',
        'general',
        0,
        '',
        advMode,
      )
      addRoll(result)
    } else {
      addRoll(rollGeneral(1, s))
    }
  }

  const handleCustomRoll = () => {
    const n = Math.max(1, Math.min(20, count))
    const s = Math.max(2, sides)
    if (s === 20 && n === 1 && advMode !== 'normal') {
      const result = rollCheck(
        advMode === 'advantage' ? 'Roll (Advantage)' : 'Roll (Disadvantage)',
        'general',
        0,
        '',
        advMode,
      )
      addRoll(result)
    } else {
      addRoll(rollGeneral(n, s))
    }
  }

  return (
    <div className="space-y-2">
      {/* Quick dice row */}
      <div className="flex flex-wrap gap-1">
        {QUICK_DICE.map(s => (
          <Button
            key={s}
            variant="outline"
            onClick={() => handleQuickRoll(s)}
            className={`h-8 px-2 text-xs font-mono min-w-[36px] ${s === 20 && advMode !== 'normal' ? 'border-primary text-primary' : ''}`}
          >
            d{s}
          </Button>
        ))}
      </div>

      {/* Advantage / Disadvantage toggles (for d20) */}
      <div className="flex gap-1.5 items-center">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">d20 mode:</span>
        {(['normal', 'advantage', 'disadvantage'] as const).map(mode => (
          <Button
            key={mode}
            size="sm"
            variant={advMode === mode ? 'default' : 'outline'}
            onClick={() => setAdvMode(mode)}
            className="h-6 text-[10px] px-2 capitalize"
          >
            {mode === 'normal' ? 'Normal' : mode === 'advantage' ? 'Adv' : 'Dis'}
          </Button>
        ))}
      </div>

      {/* Custom roll row */}
      <div className="flex items-center gap-1.5">
        <Input
          type="number"
          min={1}
          max={20}
          value={count}
          onChange={e => setCount(Math.max(1, Number(e.target.value) || 1))}
          className="h-7 w-12 text-center text-sm px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-muted-foreground text-sm font-mono">d</span>
        <Input
          type="number"
          min={2}
          max={1000}
          value={sides}
          onChange={e => setSides(Math.max(2, Number(e.target.value) || 6))}
          className="h-7 w-14 text-center text-sm px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          size="sm"
          onClick={handleCustomRoll}
          className="h-7 text-xs px-3"
        >
          Roll
        </Button>
      </div>
    </div>
  )
}
