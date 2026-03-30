import { cantrips } from './cantrips'
import { level1Spells } from './level1'
import { allZealotPrayers } from './zealotPrayers'
import { allPsykerPowers } from './psykerPowers'
import type { Spell } from '../../../types/module'

export const allSpells: Spell[] = [
  ...cantrips,
  ...level1Spells,
  ...allZealotPrayers,
  ...allPsykerPowers,
]
