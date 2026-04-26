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

// ─── Streak-dampened RNG ─────────────────────────────────────────────────────
// Tracks a "luck balance" for d20 rolls. When the player rolls consistently
// below or above average, a small nudge (max ±2) is applied to the next roll.
// The nudge decays each roll so it never accumulates into a guaranteed outcome.
// Non-d20 rolls (damage, hit dice, etc.) are pure random — no pity applied.

let _luckBalance = 0
const LUCK_DECAY   = 0.85
const LUCK_WEIGHT  = 0.35
const MAX_NUDGE    = 2

function pureRoll(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

function nudgedD20(): number {
  const raw = pureRoll(20)
  const deviation = raw - 10.5
  _luckBalance = _luckBalance * LUCK_DECAY + deviation * LUCK_WEIGHT

  const nudge = Math.round(Math.max(-MAX_NUDGE, Math.min(MAX_NUDGE, -_luckBalance * 0.3)))
  const result = Math.max(1, Math.min(20, raw + nudge))

  return result
}

// ─── Primitives ───────────────────────────────────────────────────────────────

export function rollDie(sides: number): number {
  if (sides === 20) return nudgedD20()
  return pureRoll(sides)
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

// ─── Damage Roll ─────────────────────────────────────────────────────────────

export function rollDamage(
  baseDice: string,
  modifier: number,
  bonusDice: string,
  label: string,
  modBreakdown: string,
): DiceRollResult {
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random())

  const baseMatch = baseDice.match(/(\d+)d(\d+)/)
  const baseRolls = baseMatch
    ? rollDice(Number(baseMatch[1]), Number(baseMatch[2]))
    : []

  const bonusStr = bonusDice.replace(/^\+/, '').trim()
  const bonusMatch = bonusStr.match(/(\d+)d(\d+)/)
  const bonusRolls = bonusMatch
    ? rollDice(Number(bonusMatch[1]), Number(bonusMatch[2]))
    : []

  const total = baseRolls.reduce((a, b) => a + b, 0)
    + bonusRolls.reduce((a, b) => a + b, 0)
    + modifier

  const modPart = modifier > 0 ? `+${modifier}` : modifier < 0 ? String(modifier) : ''
  const bonusPart = bonusStr ? `+${bonusStr}` : ''
  const diceExpression = `${baseDice}${modPart}${bonusPart}`

  return {
    id,
    timestamp: Date.now(),
    label: `${label} Damage`,
    rollType: 'damage',
    diceExpression,
    rolls: [...baseRolls, ...bonusRolls],
    modifier,
    modifierBreakdown: modBreakdown,
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
