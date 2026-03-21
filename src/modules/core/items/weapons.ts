import type { Item } from '../../../types/module'

export const weapons: Item[] = [
  {
    id: 'longsword',
    name: 'Longsword',
    type: 'weapon',
    weight: 3,
    cost: '15 gp',
    description: 'A standard Empire longsword, reliable and well-balanced.',
    properties: ['versatile'],
    damage: '1d8',
    damageType: 'slashing',
  },
  {
    id: 'handaxe',
    name: 'Handaxe',
    type: 'weapon',
    weight: 2,
    cost: '5 gp',
    description: 'A light axe that can be thrown or used in close quarters.',
    properties: ['light', 'thrown'],
    damage: '1d6',
    damageType: 'slashing',
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    type: 'weapon',
    weight: 5,
    cost: '25 gp',
    description: 'A reliable ranged weapon favoured by Empire soldiers.',
    properties: ['ranged', 'loading'],
    damage: '1d8',
    damageType: 'piercing',
  },
]
