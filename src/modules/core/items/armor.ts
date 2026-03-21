import type { Item } from '../../../types/module'

export const armor: Item[] = [
  {
    id: 'leather-armor',
    name: 'Leather Armor',
    type: 'armor',
    weight: 10,
    cost: '10 gp',
    description: 'Hardened leather fashioned into a protective suit.',
    armorClass: 11,
    properties: ['light'],
  },
  {
    id: 'chain-mail',
    name: 'Chain Mail',
    type: 'armor',
    weight: 55,
    cost: '75 gp',
    description: 'Rings of iron linked together into a suit of armor.',
    armorClass: 16,
    properties: ['heavy', 'noisy'],
  },
  {
    id: 'shield',
    name: 'Shield',
    type: 'armor',
    weight: 6,
    cost: '10 gp',
    description: 'A wooden or metal shield. +2 AC while wielded.',
    armorClass: 2,
    properties: ['shield'],
  },
]
