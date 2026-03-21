// ─── Dice Roll Types ──────────────────────────────────────────────────────────

export interface DiceRollResult {
  id: string
  timestamp: number
  label: string
  rollType: 'ability' | 'skill' | 'save' | 'initiative' | 'attack' | 'damage' | 'general'
  diceExpression: string
  rolls: number[]
  modifier: number
  modifierBreakdown: string
  total: number
  isNat20?: boolean
  isNat1?: boolean
  // For advantage/disadvantage d20 rolls
  advantageRolls?: [number, number]
  advantageMode?: 'advantage' | 'disadvantage'
}

// ─── Primitives ───────────────────────────────────────────────────────────────

export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

export function rollDice(count: number, sides: number): number[] {
  return Array.from({ length: count }, () => rollDie(sides))
}

// ─── Check / Save ─────────────────────────────────────────────────────────────

export function rollCheck(
  label: string,
  rollType: DiceRollResult['rollType'],
  modifier: number,
  modifierBreakdown: string,
  advantageMode?: 'advantage' | 'disadvantage',
): DiceRollResult {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random())

  if (advantageMode) {
    const r1 = rollDie(20)
    const r2 = rollDie(20)
    const chosen = advantageMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2)
    const total  = chosen + modifier
    return {
      id,
      timestamp: Date.now(),
      label,
      rollType,
      diceExpression: modifier >= 0 ? `2d20kh1+${modifier}` : `2d20kl1${modifier}`,
      rolls: [chosen],
      modifier,
      modifierBreakdown,
      total,
      isNat20: chosen === 20,
      isNat1:  chosen === 1,
      advantageRolls: [r1, r2],
      advantageMode,
    }
  }

  const d20   = rollDie(20)
  const total = d20 + modifier
  return {
    id,
    timestamp: Date.now(),
    label,
    rollType,
    diceExpression: modifier >= 0 ? `1d20+${modifier}` : `1d20${modifier}`,
    rolls: [d20],
    modifier,
    modifierBreakdown,
    total,
    isNat20: d20 === 20,
    isNat1:  d20 === 1,
  }
}

// ─── General Roll ─────────────────────────────────────────────────────────────

export function rollGeneral(count: number, sides: number): DiceRollResult {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random())

  const rolls = rollDice(count, sides)
  const total = rolls.reduce((a, b) => a + b, 0)
  return {
    id,
    timestamp: Date.now(),
    label: `${count}d${sides}`,
    rollType: 'general',
    diceExpression: `${count}d${sides}`,
    rolls,
    modifier: 0,
    modifierBreakdown: '',
    total,
  }
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function fmtMod(n: number): string {
  return n >= 0 ? `+${n}` : String(n)
}

export function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
