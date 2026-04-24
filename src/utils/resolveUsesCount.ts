import type { Character } from '../types/character'
import { getModifier } from '../store/characterStore'

function resolveToken(token: string, character: Character): number {
  const prof   = character.proficiencyBonus
  const scores = character.abilityScores

  switch (token) {
    case 'proficiency':  return prof
    case 'strength':     return getModifier(scores.strength)
    case 'dexterity':    return getModifier(scores.dexterity)
    case 'constitution': return getModifier(scores.constitution)
    case 'intelligence': return getModifier(scores.intelligence)
    case 'wisdom':       return getModifier(scores.wisdom)
    case 'charisma':     return getModifier(scores.charisma)
    case 'gene-surge':   return character.level <= 5 ? 3 : 4
    default: {
      const n = parseInt(token, 10)
      return isNaN(n) ? 0 : n
    }
  }
}

export function resolveUsesCount(formula: string | undefined, character: Character): number {
  if (!formula) return 0

  const normalized = formula.toLowerCase().trim()

  if (normalized.includes('+')) {
    const total = normalized
      .split('+')
      .reduce((sum, part) => sum + resolveToken(part.trim(), character), 0)
    return Math.max(1, total)
  }

  return Math.max(1, resolveToken(normalized, character))
}
