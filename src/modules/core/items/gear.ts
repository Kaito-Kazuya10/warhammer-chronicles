import type { Item } from '../../../types/module'

// ─── Survival Essentials ─────────────────────────────────────────────────────

const survivalGear: Item[] = [
  {
    id: 'ration-pack-1-week',
    name: 'Ration Pack (1 Week)',
    type: 'gear',
    description: 'Imperial-standard field rations. Nutritionally complete. Taste optional.',
    cost: '5 Thrones',
    weight: 3,
  },
  {
    id: 'water-canteen',
    name: 'Water Canteen',
    type: 'gear',
    description: 'Standard-issue canteen. Holds 2 liters. Insulated.',
    cost: '2 Thrones',
    weight: 1,
  },
  {
    id: 'water-purifier',
    name: 'Water Purifier',
    type: 'gear',
    description: 'Compact filtration unit. Purifies contaminated water in 10 minutes.',
    cost: '15 Thrones',
    weight: 1,
  },
  {
    id: 'bedroll',
    name: 'Bedroll',
    type: 'gear',
    description: 'Lightweight thermal bedroll. Rated for sub-zero environments.',
    cost: '3 Thrones',
    weight: 3,
  },
  {
    id: 'bivouac-tent',
    name: 'Bivouac Tent',
    type: 'gear',
    description: 'Two-person shelter. Sets up in 5 minutes. Blocks wind and light rain.',
    cost: '10 Thrones',
    weight: 5,
  },
  {
    id: 'fire-starter-kit',
    name: 'Fire Starter Kit',
    type: 'gear',
    description: 'Ignition flint, tinder packs, and wind guard. Works in most conditions.',
    cost: '2 Thrones',
    weight: 0.5,
  },
  {
    id: 'climbing-kit',
    name: 'Climbing Kit',
    type: 'gear',
    description: 'Pitons, carabiners, 50 ft. rope, harness. Advantage on Athletics checks to climb.',
    cost: '25 Thrones',
    weight: 5,
  },
  {
    id: 'rope-50ft',
    name: 'Rope (50 ft.)',
    type: 'gear',
    description: 'Synthetic-fiber rope. Rated for 500 lbs.',
    cost: '5 Thrones',
    weight: 5,
  },
  {
    id: 'grappling-hook',
    name: 'Grappling Hook',
    type: 'gear',
    description: 'Four-pronged steel hook. Attaches to any standard rope.',
    cost: '8 Thrones',
    weight: 2,
  },
  {
    id: 'mess-kit',
    name: 'Mess Kit',
    type: 'gear',
    description: 'Field cooking set. Pot, pan, utensils, cup. Compact.',
    cost: '3 Thrones',
    weight: 1,
  },
]

// ─── Illumination & Vision ───────────────────────────────────────────────────

const illuminationGear: Item[] = [
  {
    id: 'stab-light',
    name: 'Stab-Light',
    type: 'gear',
    description: 'Handheld electric lantern. Bright light 40 ft, dim 40 ft. Runs for 24 hours on a charge.',
    cost: '10 Thrones',
    weight: 1,
  },
  {
    id: 'preysense-goggles',
    name: 'Preysense Goggles',
    type: 'gear',
    tier: 'master-crafted',
    description: 'Thermal-imaging goggles. See heat signatures through smoke, fog, and darkness (60 ft).',
    cost: '100 Thrones',
    weight: 0.5,
  },
  {
    id: 'lumen-globe',
    name: 'Lumen Globe',
    type: 'gear',
    description: 'Hovering light sphere. Follows the user and provides bright light 20 ft, dim 20 ft. Lasts 8 hours.',
    cost: '20 Thrones',
    weight: 0.5,
  },
]

// ─── Tools & Utility ─────────────────────────────────────────────────────────

const toolsGear: Item[] = [
  {
    id: 'multikey',
    name: 'Multikey',
    type: 'tool',
    description: 'Universal mechanical lock pick set. +2 to Sleight of Hand checks to pick locks.',
    cost: '20 Thrones',
    weight: 0.5,
  },
  {
    id: 'excruciator-kit',
    name: 'Excruciator Kit',
    type: 'tool',
    description: 'Interrogation tools. Not for the squeamish. +2 to Intimidation checks during interrogation.',
    cost: '30 Thrones',
    weight: 3,
  },
  {
    id: 'manacles',
    name: 'Manacles',
    type: 'gear',
    description: 'Imperial-pattern restraints. DC 20 Strength to break, DC 18 Sleight of Hand to pick.',
    cost: '10 Thrones',
    weight: 2,
  },
  {
    id: 'chain-10ft',
    name: 'Chain (10 ft.)',
    type: 'gear',
    description: 'Hardened steel chain. DC 20 Strength to break. Multiple uses.',
    cost: '8 Thrones',
    weight: 5,
  },
  {
    id: 'purity-seal-kit',
    name: 'Purity Seal Kit',
    type: 'gear',
    description: 'Wax, ribbon, and prayer scrolls. Used to bless equipment and mark faith.',
    cost: '5 Thrones',
    weight: 0.5,
  },
  {
    id: 'writing-kit',
    name: 'Writing Kit',
    type: 'gear',
    description: 'Ink, quills, parchment sheets, and a leather folder. Standard administratum issue.',
    cost: '3 Thrones',
    weight: 1,
  },
  {
    id: 'backpack-military',
    name: 'Backpack (Military)',
    type: 'gear',
    description: 'Large-frame rucksack with waterproof lining. Increases carry capacity by 30 lbs.',
    cost: '10 Thrones',
    weight: 2,
  },
  {
    id: 'tool-kit-general',
    name: 'Tool Kit (General)',
    type: 'tool',
    description: 'Wrench set, pliers, screwdrivers, hammer. Covers basic mechanical work. +2 to related checks.',
    cost: '15 Thrones',
    weight: 5,
  },
  {
    id: 'disguise-kit',
    name: 'Disguise Kit',
    type: 'tool',
    description: 'Cosmetics, prosthetics, hair dye, contact lenses. +2 to Deception checks to maintain a disguise.',
    cost: '25 Thrones',
    weight: 2,
  },
  {
    id: 'poisoners-kit',
    name: 'Poisoner\'s Kit',
    type: 'tool',
    description: 'Vials, reagents, distilling apparatus. Craft poisons and specific antidotes. Requires proficiency.',
    cost: '50 Thrones',
    weight: 2,
  },
]

// ─── Environmental Protection ────────────────────────────────────────────────

const environmentalGear: Item[] = [
  {
    id: 'rebreather',
    name: 'Rebreather',
    type: 'gear',
    description: 'Compact gas mask with a 2-hour filter. Protects against toxic atmosphere and airborne pathogens.',
    cost: '15 Thrones',
    weight: 1,
  },
  {
    id: 'rad-cloak',
    name: 'Rad-Cloak',
    type: 'gear',
    description: 'Lead-lined cloak. Grants advantage on saves against radiation exposure.',
    cost: '30 Thrones',
    weight: 3,
  },
  {
    id: 'desert-survival-kit',
    name: 'Desert Survival Kit',
    type: 'gear',
    description: 'Sunshield cloak, moisture reclamator, UV goggles. Advantage on saves against extreme heat and dehydration.',
    cost: '20 Thrones',
    weight: 3,
  },
]

// ─── Export ──────────────────────────────────────────────────────────────────

export const allGear: Item[] = [
  ...survivalGear,
  ...illuminationGear,
  ...toolsGear,
  ...environmentalGear,
]
