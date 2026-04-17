import { useEffect, useRef } from 'react'
import { useDiceStore } from '../../store/diceStore'

// Clamp position so the menu stays inside the viewport
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export default function RollContextMenu() {
  const { rollContext, hideRollContext } = useDiceStore()
  const { visible, x, y, pendingRoll } = rollContext
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on any outside click or Escape
  useEffect(() => {
    if (!visible) return
    const handleDown = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        hideRollContext()
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideRollContext()
    }
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('touchstart', handleDown)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('touchstart', handleDown)
      document.removeEventListener('keydown', handleKey)
    }
  }, [visible, hideRollContext])

  if (!visible || !pendingRoll) return null

  const menuW = 160
  const menuH = 108
  const left  = clamp(x, 8, window.innerWidth  - menuW - 8)
  const top   = clamp(y, 8, window.innerHeight - menuH - 8)

  const choose = (mode?: 'advantage' | 'disadvantage') => {
    pendingRoll(mode)
    hideRollContext()
  }

  return (
    <div
      ref={menuRef}
      style={{ position: 'fixed', left, top, zIndex: 9999, width: menuW }}
      className="rounded-lg border border-border bg-[var(--background)] shadow-xl py-1 select-none"
      onContextMenu={e => e.preventDefault()}
    >
      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60 px-3 pt-1.5 pb-1 font-semibold">
        Roll Mode
      </p>

      <button
        onClick={() => choose(undefined)}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors text-left"
      >
        <span className="text-base leading-none">🎲</span>
        <span>Normal</span>
      </button>

      <button
        onClick={() => choose('advantage')}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-400 hover:bg-green-500/10 transition-colors text-left"
      >
        <span className="text-base leading-none">⬆</span>
        <span>Advantage</span>
        <span className="ml-auto text-[9px] text-muted-foreground/50 font-mono">2d20kh</span>
      </button>

      <button
        onClick={() => choose('disadvantage')}
        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
      >
        <span className="text-base leading-none">⬇</span>
        <span>Disadvantage</span>
        <span className="ml-auto text-[9px] text-muted-foreground/50 font-mono">2d20kl</span>
      </button>
    </div>
  )
}
