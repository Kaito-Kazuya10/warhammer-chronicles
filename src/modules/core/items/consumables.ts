import type { Item } from '../../../types/module'

export const consumables: Item[] = [
  {
    id: 'healing-potion',
    name: 'Healing Potion',
    type: 'consumable',
    weight: 0.5,
    cost: '50 gp',
    description: 'Restores 2d4+2 hit points when consumed.',
    tags: ['consumable', 'healing'],
  },
  {
    id: 'antitoxin',
    name: 'Antitoxin',
    type: 'consumable',
    weight: 0,
    cost: '50 gp',
    description: 'Grants advantage on saving throws against poison for 1 hour.',
    tags: ['consumable', 'utility'],
  },
  {
    id: 'torch',
    name: 'Torch',
    type: 'consumable',
    weight: 1,
    cost: '1 cp',
    description: 'Burns for 1 hour, shedding bright light in a 20-foot radius and dim light for an additional 20 feet.',
    tags: ['consumable', 'light'],
  },
]
