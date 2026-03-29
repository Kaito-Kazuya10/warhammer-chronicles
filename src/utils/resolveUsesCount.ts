import type { Character } from '../types/character'
import { getModifier } from '../store/characterStore'

/**
 * Resolves a ScalingValue formula string to a concrete number for the given character.
 *
 * Supported tokens: "proficiency", "strength", "dexterity", "constitution",
 * "intelligence", "wisdom", "charisma", or a numeric string like "1", "2", "3".
 */
export function resolveUsesCount(formula: string | undefined, character: Character): number {
  if (!formula) return 0
  const prof   = character.proficiencyBonus
  const scores = character.abilityScores

  switch (formula.toLowerCase().trim()) {
    case 'proficiency':  return prof
    case 'strength':     return Math.max(1, getModifier(scores.strength))
    case 'dexterity':    return Math.max(1, getModifier(scores.dexterity))
    case 'constitution': return Math.max(1, getModifier(scores.constitution))
    case 'intelligence': return Math.max(1, getModifier(scores.intelligence))
    case 'wisdom':       return Math.max(1, getModifier(scores.wisdom))
    case 'charisma':     return Math.max(1, getModifier(scores.charisma))
    default: {
      const n = parseInt(formula, 10)
      return isNaN(n) ? 1 : Math.max(1, n)
    }
  }
}
