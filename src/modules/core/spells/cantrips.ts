import type { Spell } from '../../../types/module'

export const cantrips: Spell[] = [
  {
    id: 'firebolt',
    name: 'Fire Bolt',
    level: 0,
    school: 'Evocation',
    castingTime: '1 action',
    range: '120 feet',
    components: ['V', 'S'],
    duration: 'Instantaneous',
    description: 'Hurl a mote of fire at a creature or object. +spell attack vs AC. On hit, 1d10 fire damage. Ignites flammable objects.',
    tags: ['fire', 'damage', 'cantrip'],
  },
]
