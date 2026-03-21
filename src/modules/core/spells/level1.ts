import type { Spell } from '../../../types/module'

export const level1Spells: Spell[] = [
  {
    id: 'magic-missile',
    name: 'Magic Missile',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description: 'Create three glowing darts of magical force. Each dart hits automatically for 1d4+1 force damage. All darts can target the same or different creatures.',
    higherLevels: 'Create one additional dart for each spell slot level above 1st.',
    tags: ['force', 'damage', 'auto-hit'],
  },
  {
    id: 'cure-wounds',
    name: 'Cure Wounds',
    level: 1,
    school: 'Evocation',
    castingTime: '1 action',
    range: 'Touch',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description: 'Restore 1d8 + spellcasting modifier hit points to a creature you touch.',
    higherLevels: 'Healing increases by 1d8 for each slot level above 1st.',
    tags: ['healing'],
  },
]
