import type { WarhamerModule } from '../../types/module'
import { coreRaces } from './races'
import { imperialGuardsman } from './classes/imperialGuardsman'
import { augmenticist } from './classes/augmenticist'
import { allSpells } from './spells'
import { allItems } from './items'
import { coreFeats } from './feats'
import { coreNPCs } from './npcs'
import { coreBackgrounds } from './backgrounds'

// ─── Core Module ──────────────────────────────────────────────────────────────
// Assembles all core content from subfolders.
// To add a new race: create races/myRace.ts, export it, add it here.
// To add a new class: create classes/myClass.ts, export it, add it here.

export const coreModule: WarhamerModule = {
  id: 'warhammer-core',
  name: 'Warhammer Core',
  version: '1.0.0',
  description: 'Base Warhammer races, classes, spells, items, feats, and NPCs.',
  author: 'Homebrew',
  content: {
    races: coreRaces,
    classes: [imperialGuardsman, augmenticist],
    spells: allSpells,
    items: allItems,
    feats: coreFeats,
    npcs: coreNPCs,
    backgrounds: coreBackgrounds,
  },
}
