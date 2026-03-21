import { weapons } from './weapons'
import { armor } from './armor'
import { consumables } from './consumables'
import type { Item } from '../../../types/module'

export const allItems: Item[] = [
  ...weapons,
  ...armor,
  ...consumables,
]
