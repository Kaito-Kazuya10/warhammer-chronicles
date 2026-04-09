import { allWeaponryItems } from './weapons'
import { allArmorItems } from './armor'
import { consumables } from './consumables'
import { namedWeaponsMasterCrafted } from './namedWeaponsMasterCrafted'
import { namedWeaponsArtificer } from './namedWeaponsArtificer'
import { namedWeaponsRelic } from './namedWeaponsRelic'
import { namedWeaponsHeroic } from './namedWeaponsHeroic'
import { namedArmorMasterCrafted } from './namedArmorMasterCrafted'
import { namedArmorArtificer } from './namedArmorArtificer'
import { namedArmorRelic } from './namedArmorRelic'
import { namedArmorHeroic } from './namedArmorHeroic'
import type { Item } from '../../../types/module'

export const allItems: Item[] = [
  ...allWeaponryItems,
  ...allArmorItems,
  ...consumables,
  ...namedWeaponsMasterCrafted,
  ...namedWeaponsArtificer,
  ...namedWeaponsRelic,
  ...namedWeaponsHeroic,
  ...namedArmorMasterCrafted,
  ...namedArmorArtificer,
  ...namedArmorRelic,
  ...namedArmorHeroic,
]
