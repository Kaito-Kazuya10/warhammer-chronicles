import type { Item, ItemTier } from '../../../types/module'

// ─── Weapon Properties Reference ─────────────────────────────────────────────

export interface WeaponProperty {
  id: string
  name: string
  shortDescription: string
  fullDescription: string
}

export const weaponProperties: WeaponProperty[] = [
  {
    id: 'armor-penetration',
    name: 'Armor Penetration',
    shortDescription: 'Ignores up to 2 AC from armor.',
    fullDescription: 'This weapon ignores up to 2 points of AC bonus from armor (not DEX, shields, or natural armor). Represents energy fields or mono-molecular edges that bypass physical protection.',
  },
  {
    id: 'blast',
    name: 'Blast (X ft)',
    shortDescription: 'Area effect — targets make DEX save.',
    fullDescription: 'Affects an area. Choose a point within range. All creatures within X feet make a DEX save (DC = 8 + DEX + proficiency) or take full damage (half on success). Cannot target specific creatures.',
  },
  {
    id: 'charge',
    name: 'Charge (bonus damage)',
    shortDescription: 'Extra damage after 20 ft straight-line move.',
    fullDescription: 'When you move at least 20 feet in a straight line toward a target and hit with this weapon on the same turn, deal the listed bonus damage.',
  },
  {
    id: 'entangle',
    name: 'Entangle',
    shortDescription: 'Restrains target, no damage.',
    fullDescription: 'Target must make a STR save (DC = 8 + DEX + proficiency) or be restrained until they escape (STR check DC 13 as an action). No damage dealt.',
  },
  {
    id: 'finesse',
    name: 'Finesse',
    shortDescription: 'Use STR or DEX for attack and damage.',
    fullDescription: 'Use either STR or DEX for attack and damage rolls.',
  },
  {
    id: 'gets-hot',
    name: 'Gets Hot',
    shortDescription: 'Overheat risk — 1d6 fire on natural 1.',
    fullDescription: 'When you roll a natural 1 on an attack, you take 1d6 fire damage (the weapon overheats or misfires). With Weapon Training (Special), you can use your reaction to vent the weapon and take no damage.',
  },
  {
    id: 'heavy',
    name: 'Heavy',
    shortDescription: 'Small creatures have disadvantage; may need setup.',
    fullDescription: 'Small creatures have disadvantage on attacks. May require setup (placing bipod, bracing) as a bonus action before the first attack on your turn.',
  },
  {
    id: 'indirect',
    name: 'Indirect',
    shortDescription: 'Fire at unseen targets with a spotter.',
    fullDescription: 'Can fire at targets you cannot see, provided an ally can spot for you (uses their action). Attacks made this way have disadvantage unless a spotter provides coordinates.',
  },
  {
    id: 'knockback',
    name: 'Knockback',
    shortDescription: 'Push target 5 ft on hit (STR save).',
    fullDescription: 'On hit, you can force the target to make a STR save (DC = 8 + STR + proficiency) or be pushed 5 feet away from you.',
  },
  {
    id: 'knockdown',
    name: 'Knockdown',
    shortDescription: 'Knock target prone on hit (STR save).',
    fullDescription: 'On hit, target makes a STR save (DC = 8 + STR + proficiency) or is knocked prone. On a critical hit, they are knocked prone automatically.',
  },
  {
    id: 'light',
    name: 'Light',
    shortDescription: 'Two-weapon fighting eligible; quick draw.',
    fullDescription: 'Can be used for two-weapon fighting. Can be drawn or stowed as part of another action.',
  },
  {
    id: 'loading',
    name: 'Loading',
    shortDescription: 'One shot per turn; bonus action to reload.',
    fullDescription: 'You can only fire once per turn regardless of Extra Attack. Reloading uses your bonus action.',
  },
  {
    id: 'melta',
    name: 'Melta',
    shortDescription: 'Double damage dice at half range.',
    fullDescription: "When attacking a target within half the weapon's normal range, roll all damage dice twice and take the higher result. Devastating at close range, merely powerful at max range.",
  },
  {
    id: 'mounted',
    name: 'Mounted',
    shortDescription: 'Needs tripod/mount; STR 16+ to fire unmounted.',
    fullDescription: 'Requires mounting on a tripod, vehicle, or fortification to fire without disadvantage. A creature with STR 16+ can fire unmounted with disadvantage. Setting up/dismounting takes an action.',
  },
  {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    shortDescription: 'Fire twice with disadvantage on both.',
    fullDescription: 'As your Attack action, you can fire twice with this weapon, but both attacks have disadvantage. Represents sustained automatic fire.',
  },
  {
    id: 'reach',
    name: 'Reach',
    shortDescription: '+5 ft melee range.',
    fullDescription: 'Adds 5 feet to your melee range.',
  },
  {
    id: 'rending',
    name: 'Rending',
    shortDescription: 'Critical hits on 19–20.',
    fullDescription: 'Critical hits occur on 19–20 instead of just 20.',
  },
  {
    id: 'silent',
    name: 'Silent',
    shortDescription: 'No noise; stealth-friendly.',
    fullDescription: 'This weapon makes no significant noise. Enemies beyond 30 feet do not automatically detect the shot. Useful for stealth operations.',
  },
  {
    id: 'spread',
    name: 'Spread',
    shortDescription: '+1 to hit at close range; disadvantage at long.',
    fullDescription: 'When attacking a target within half normal range, you gain +1 to the attack roll. At long range, you have disadvantage (pellets scatter).',
  },
  {
    id: 'toxic',
    name: 'Toxic',
    shortDescription: 'CON save or extra 1d6 poison damage.',
    fullDescription: 'On a hit, the target must make a CON save (DC 13) at the start of their next turn or take an additional 1d6 poison damage. Creatures immune to poison are unaffected.',
  },
  {
    id: 'two-handed',
    name: 'Two-handed',
    shortDescription: 'Requires two hands.',
    fullDescription: 'Requires two hands to wield.',
  },
  {
    id: 'unwieldy',
    name: 'Unwieldy',
    shortDescription: 'No opportunity attacks; -2 initiative.',
    fullDescription: 'You cannot use this weapon for opportunity attacks. Your initiative is reduced by 2 while wielding it (the weapon is cumbersome).',
  },
  {
    id: 'versatile',
    name: 'Versatile (Xd)',
    shortDescription: 'One-hand or two-hand; higher two-hand damage.',
    fullDescription: 'Can be used one-handed or two-handed. Two-handed damage is shown in parentheses.',
  },
  {
    id: 'stun',
    name: 'Stun (CON save DC X)',
    shortDescription: 'Stun target on hit (CON save).',
    fullDescription: 'On hit, target must make a CON save (at the listed DC) or be stunned until the end of your next turn.',
  },
  {
    id: 'pain',
    name: 'Pain (WIS save DC X)',
    shortDescription: 'Disadvantage on next action (WIS save).',
    fullDescription: 'On hit, target must make a WIS save (at the listed DC) or have disadvantage on the next attack roll or ability check it makes before the end of its next turn.',
  },
  {
    id: 'psychic-channel',
    name: 'Psychic Channel',
    shortDescription: 'Psyker only — expend slot for bonus damage.',
    fullDescription: 'Psyker only. When you hit with this weapon, you can expend a power slot to deal extra force damage: the slot level × 1d8 force damage.',
  },
  {
    id: 'grapple-bonus',
    name: 'Grapple Bonus (+X)',
    shortDescription: 'Bonus to grapple checks while wielding.',
    fullDescription: 'You gain the listed bonus to grapple checks while wielding this weapon.',
  },
  {
    id: 'breaks-on-crit',
    name: 'Breaks on Crit',
    shortDescription: 'Weapon destroyed on critical hit.',
    fullDescription: 'This weapon is destroyed when you roll a critical hit with it.',
  },
]

/**
 * ARMORY — Base Weapons of the 41st Millennium
 *
 * Organization:
 *   I.   Ranged Weapons (Las, Bolt, Auto, Stub, Plasma, Melta, Flame,
 *        Shotgun, Special/Exotic, Heavy, General/Civilian, Xenos)
 *   II.  Melee Weapons (Simple, Martial, Chain, Power, Force,
 *        Special/Exotic, Improvised)
 *   III. Grenades & Explosives (Grenades, Demo Charges, Mines, Missiles)
 *   IV.  Special Ammunition
 */

// ─── I. RANGED WEAPONS ────────────────────────────────────────────────────────

// ── Las Weapons ───────────────────────────────────────────────────────────────

const laspistol: Item = {
  id: 'laspistol', name: 'Laspistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 40, long: 120 },
  damage: '1d6', damageType: 'energy',
  properties: ['Light'],
  description: 'Standard-issue sidearm of the Imperial Guard. Reliable, easy to maintain, and powered by rechargeable power packs. The weapon of last resort for officers, support personnel, and anyone who needs a hand free. Ammo: Power Pack.',
  cost: '15 Thrones', weight: 2,
  tags: ['las', 'common'],
}

const lasgun: Item = {
  id: 'lasgun', name: 'Lasgun', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d8', damageType: 'energy',
  properties: ['Rapid Fire'],
  description: 'The most common weapon in the Imperium. Billions are produced annually, and it is the backbone of the Imperial Guard. Reliable, easy to maintain, and powered by rechargeable power packs. Not the most powerful weapon, but it holds the line. Ammo: Power Pack.',
  cost: '25 Thrones', weight: 4,
  tags: ['las', 'common'],
}

const lasCarbine: Item = {
  id: 'las-carbine', name: 'Las Carbine', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d6', damageType: 'energy',
  properties: ['Light', 'Rapid Fire'],
  description: 'A compact variant of the lasgun favored by scouts, vehicle crews, and urban fighters. Shorter barrel means less range but easier handling. Ammo: Power Pack.',
  cost: '20 Thrones', weight: 3,
  tags: ['las', 'common'],
}

const longLas: Item = {
  id: 'long-las', name: 'Long-Las', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 150, long: 600 },
  damage: '1d10', damageType: 'energy',
  properties: ['Heavy', 'Two-handed'],
  description: 'Extended-barrel lasgun used by regimental snipers. The focusing crystal is precision-cut for maximum beam coherence at extreme range. Ammo: Power Pack.',
  cost: '75 Thrones', weight: 5,
  tags: ['las', 'uncommon'],
}

const hotShotLasgun: Item = {
  id: 'hot-shot-lasgun', name: 'Hot-Shot Lasgun', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d10', damageType: 'energy',
  properties: ['Armor Penetration'],
  description: 'High-powered lasgun used by Tempestus Scions and elite troops. Draws from specialized hot-shot power packs that burn out quickly but punch through armor. Ammo: Hot-Shot Pack.',
  cost: '200 Thrones', weight: 4,
  tags: ['las', 'rare'],
}

const hotShotLaspistol: Item = {
  id: 'hot-shot-laspistol', name: 'Hot-Shot Laspistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d8', damageType: 'energy',
  properties: ['Light', 'Armor Penetration'],
  description: 'Compact hot-shot variant for officers and specialists who need armor penetration in a sidearm. Ammo: Hot-Shot Pack.',
  cost: '150 Thrones', weight: 2,
  tags: ['las', 'rare'],
}

const multilaser: Item = {
  id: 'multilaser', name: 'Multilaser', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '2d8', damageType: 'energy',
  properties: ['Heavy', 'Rapid Fire', 'Mounted'],
  description: 'Multi-barreled las weapon typically vehicle-mounted. Devastating sustained fire. Requires Weapon Training (Heavy). Ammo: Power Cell.',
  cost: '500 Thrones', weight: 25,
  tags: ['las', 'rare', 'heavy-weapon'],
}

// ── Bolt Weapons ──────────────────────────────────────────────────────────────

const boltPistol: Item = {
  id: 'bolt-pistol', name: 'Bolt Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 40, long: 120 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Light', 'Rending'],
  description: 'A compact bolter firing mass-reactive shells that detonate inside the target. Standard sidearm for Space Marines, prized by Inquisitorial agents. Ammo: Bolt Magazine.',
  cost: '100 Thrones', weight: 3,
  tags: ['bolt', 'uncommon'],
}

const boltgun: Item = {
  id: 'boltgun', name: 'Boltgun (Bolter)', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d12', damageType: 'piercing',
  properties: ['Rapid Fire', 'Rending'],
  description: 'The iconic weapon of the Adeptus Astartes and elite Imperial forces. Fires gyro-stabilized, self-propelled mass-reactive bolts that penetrate and detonate. Ammo: Bolt Magazine.',
  cost: '150 Thrones', weight: 5,
  tags: ['bolt', 'uncommon'],
}

const boltCarbine: Item = {
  id: 'bolt-carbine', name: 'Bolt Carbine', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Rapid Fire', 'Rending'],
  description: 'Compact bolt weapon for close-quarters operations. Less range than the full bolter but more maneuverable. Ammo: Bolt Magazine.',
  cost: '125 Thrones', weight: 4,
  tags: ['bolt', 'uncommon'],
}

const heavyBolter: Item = {
  id: 'heavy-bolter', name: 'Heavy Bolter', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '2d8', damageType: 'piercing',
  properties: ['Heavy', 'Rapid Fire', 'Rending', 'Mounted'],
  description: 'Devastating heavy weapon that fires larger-caliber bolt rounds at a high rate. Requires Weapon Training (Heavy). Ammo: Belt Feed.',
  cost: '600 Thrones', weight: 30,
  tags: ['bolt', 'rare', 'heavy-weapon'],
}

const stormBolter: Item = {
  id: 'storm-bolter', name: 'Storm Bolter', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '2d6', damageType: 'piercing',
  properties: ['Rapid Fire', 'Rending'],
  description: 'Twin-linked bolter firing two bolts simultaneously. Exceptional firepower in a handheld package. Ammo: Bolt Magazine.',
  cost: '400 Thrones', weight: 6,
  tags: ['bolt', 'rare'],
}

// ── Auto Weapons ──────────────────────────────────────────────────────────────

const autopistol: Item = {
  id: 'autopistol', name: 'Autopistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d6', damageType: 'piercing',
  properties: ['Light', 'Rapid Fire'],
  description: 'Common automatic pistol found throughout the Imperium. Cheap, reliable, and easy to conceal. The preferred weapon of gangers, civilians, and anyone who needs a gun they can afford. Ammo: Magazine.',
  cost: '10 Thrones', weight: 2,
  tags: ['auto', 'common'],
}

const autogun: Item = {
  id: 'autogun', name: 'Autogun', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d8', damageType: 'piercing',
  properties: ['Rapid Fire'],
  description: 'Standard automatic rifle. Less reliable than the lasgun but hits harder with solid projectiles. Common among planetary defense forces, gangs, and mercenaries. Ammo: Magazine.',
  cost: '20 Thrones', weight: 4,
  tags: ['auto', 'common'],
}

const heavyStubber: Item = {
  id: 'heavy-stubber', name: 'Heavy Stubber', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Heavy', 'Rapid Fire', 'Mounted'],
  description: "Belt-fed heavy automatic weapon. The poor man's heavy bolter. Requires Weapon Training (Heavy). Ammo: Belt Feed.",
  cost: '150 Thrones', weight: 20,
  tags: ['auto', 'uncommon', 'heavy-weapon'],
}

const assaultCannon: Item = {
  id: 'assault-cannon', name: 'Assault Cannon', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '2d8', damageType: 'piercing',
  properties: ['Heavy', 'Rapid Fire', 'Mounted'],
  description: 'Multi-barreled rotary cannon that fires at an extraordinary rate. Requires Weapon Training (Heavy). Ammo: Belt Feed.',
  cost: '800 Thrones', weight: 30,
  tags: ['auto', 'very-rare', 'heavy-weapon'],
}

// ── Stub Weapons ──────────────────────────────────────────────────────────────

const stubPistol: Item = {
  id: 'stub-pistol', name: 'Stub Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 90 },
  damage: '1d6', damageType: 'piercing',
  properties: ['Light'],
  description: 'The most basic firearm in the Imperium. Single-action, reliable, and cheap. Ammo: Cylinder (6).',
  cost: '8 Thrones', weight: 2,
  tags: ['stub', 'common'],
}

const stubRevolver: Item = {
  id: 'stub-revolver', name: 'Stub Revolver', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 40, long: 120 },
  damage: '1d8', damageType: 'piercing',
  properties: [],
  description: 'A heavier revolver with better range and stopping power than the basic stub pistol. Ammo: Cylinder (6).',
  cost: '12 Thrones', weight: 2,
  tags: ['stub', 'common'],
}

const stubAutomatic: Item = {
  id: 'stub-automatic', name: 'Stub Automatic', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d6', damageType: 'piercing',
  properties: ['Light', 'Rapid Fire'],
  description: 'Magazine-fed semi-automatic stub pistol. Higher capacity than a revolver. Ammo: Magazine.',
  cost: '15 Thrones', weight: 2,
  tags: ['stub', 'common'],
}

const handCannon: Item = {
  id: 'hand-cannon', name: 'Hand Cannon', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 40, long: 120 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Heavy'],
  description: 'An oversized stub revolver firing massive-caliber rounds. Popular with bounty hunters and underhive enforcers. Ammo: Cylinder (5).',
  cost: '50 Thrones', weight: 3,
  tags: ['stub', 'uncommon'],
}

// ── Plasma Weapons ────────────────────────────────────────────────────────────

const plasmaPistol: Item = {
  id: 'plasma-pistol', name: 'Plasma Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '2d6', damageType: 'fire',
  properties: ['Gets Hot', 'Armor Penetration'],
  description: 'Fires superheated plasma that can melt through armor. Dangerously prone to overheating. Requires Weapon Training (Special). Ammo: 6 shots.',
  cost: '300 Thrones', weight: 3,
  tags: ['plasma', 'rare', 'special-training'],
}

const plasmaGun: Item = {
  id: 'plasma-gun', name: 'Plasma Gun', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '2d8', damageType: 'fire',
  properties: ['Gets Hot', 'Armor Penetration', 'Two-handed'],
  description: 'Full-sized plasma weapon capable of destroying heavy infantry and light vehicles. Requires Weapon Training (Special). Ammo: 8 shots.',
  cost: '500 Thrones', weight: 6,
  tags: ['plasma', 'rare', 'special-training'],
}

const plasmaCannon: Item = {
  id: 'plasma-cannon', name: 'Plasma Cannon', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '2d10', damageType: 'fire',
  properties: ['Heavy', 'Gets Hot', 'Blast (10 ft)', 'Mounted'],
  description: 'Devastating area-effect plasma weapon. Requires Weapon Training (Special) AND (Heavy). Ammo: 6 shots.',
  cost: '1200 Thrones', weight: 35,
  tags: ['plasma', 'very-rare', 'special-training', 'heavy-weapon'],
}

// ── Melta Weapons ─────────────────────────────────────────────────────────────

const infernoPistol: Item = {
  id: 'inferno-pistol', name: 'Inferno Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 15, long: 30 },
  damage: '2d6', damageType: 'fire',
  properties: ['Armor Penetration', 'Melta'],
  description: 'Compact melta weapon. Devastating at point-blank range. Requires Weapon Training (Special). Ammo: 4 shots.',
  cost: '500 Thrones', weight: 3,
  tags: ['melta', 'very-rare', 'special-training'],
}

const meltagun: Item = {
  id: 'meltagun', name: 'Meltagun', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 20, long: 40 },
  damage: '2d8', damageType: 'fire',
  properties: ['Armor Penetration', 'Melta', 'Two-handed'],
  description: 'Anti-armor fusion weapon that reduces targets to slag at close range. Requires Weapon Training (Special). Ammo: 6 shots.',
  cost: '400 Thrones', weight: 6,
  tags: ['melta', 'rare', 'special-training'],
}

const multiMelta: Item = {
  id: 'multi-melta', name: 'Multi-Melta', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 60 },
  damage: '2d10', damageType: 'fire',
  properties: ['Heavy', 'Armor Penetration', 'Melta', 'Mounted'],
  description: 'Twin-linked melta weapon. Vehicle killer. Requires Weapon Training (Special) AND (Heavy). Ammo: 8 shots.',
  cost: '1000 Thrones', weight: 30,
  tags: ['melta', 'very-rare', 'special-training', 'heavy-weapon'],
}

// ── Flame Weapons ─────────────────────────────────────────────────────────────

const handFlamer: Item = {
  id: 'hand-flamer', name: 'Hand Flamer', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 15 },
  damage: '1d6', damageType: 'fire',
  properties: ['Blast (15 ft cone)'],
  description: 'Compact promethium thrower. Area effect — targets make DEX save. Ammo: 4 shots.',
  cost: '60 Thrones', weight: 3,
  tags: ['flame', 'uncommon'],
}

const flamer: Item = {
  id: 'flamer', name: 'Flamer', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 20 },
  damage: '2d6', damageType: 'fire',
  properties: ['Blast (20 ft cone)', 'Two-handed'],
  description: 'Standard promethium flamer. Clears rooms, trenches, and xenos nests with equal effectiveness. Ammo: 6 shots.',
  cost: '100 Thrones', weight: 6,
  tags: ['flame', 'uncommon'],
}

const heavyFlamer: Item = {
  id: 'heavy-flamer', name: 'Heavy Flamer', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30 },
  damage: '2d8', damageType: 'fire',
  properties: ['Heavy', 'Blast (30 ft cone)', 'Mounted'],
  description: 'Extended-range heavy flamer with larger fuel reserves. Requires Weapon Training (Heavy). Ammo: 8 shots.',
  cost: '350 Thrones', weight: 20,
  tags: ['flame', 'rare', 'heavy-weapon'],
}

// ── Shotguns ──────────────────────────────────────────────────────────────────

const pumpShotgun: Item = {
  id: 'pump-shotgun', name: 'Pump Shotgun', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 60 },
  damage: '1d8', damageType: 'piercing',
  properties: ['Spread'],
  description: 'Standard pump-action shotgun. Effective at close range. Ammo: 6 shells.',
  cost: '15 Thrones', weight: 4,
  tags: ['shotgun', 'common'],
}

const combatShotgun: Item = {
  id: 'combat-shotgun', name: 'Combat Shotgun', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 90 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Spread', 'Rapid Fire'],
  description: 'Military-grade semi-automatic shotgun with extended magazine. Ammo: 8 shells.',
  cost: '50 Thrones', weight: 5,
  tags: ['shotgun', 'uncommon'],
}

const ripperGun: Item = {
  id: 'ripper-gun', name: 'Ripper Gun', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 20, long: 40 },
  damage: '1d12', damageType: 'piercing',
  properties: ['Spread', 'Heavy'],
  description: 'Oversized Ogryn shotgun that fires a spread of solid slugs, nails, and scrap. Doubles as a club. Ammo: 4 shells.',
  cost: '200 Thrones', weight: 10,
  tags: ['shotgun', 'rare'],
}

// ── Special / Exotic Ranged ───────────────────────────────────────────────────

const needlePistol: Item = {
  id: 'needle-pistol', name: 'Needle Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 25, long: 50 },
  damage: '1d4', damageType: 'poison',
  properties: ['Light', 'Silent', 'Toxic'],
  description: 'Fires chemically-tipped crystal needles. Nearly silent. Favored by assassins and Inquisitorial agents. Ammo: 10 needles.',
  cost: '250 Thrones', weight: 1,
  tags: ['exotic', 'rare'],
}

const needleRifle: Item = {
  id: 'needle-rifle', name: 'Needle Rifle', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d6', damageType: 'poison',
  properties: ['Silent', 'Toxic', 'Two-handed'],
  description: 'Long-range needle weapon for covert elimination. Ammo: 12 needles.',
  cost: '400 Thrones', weight: 3,
  tags: ['exotic', 'rare'],
}

const webPistol: Item = {
  id: 'web-pistol', name: 'Web Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 15, long: 30 },
  damage: '', damageType: '',
  properties: ['Entangle'],
  description: 'Fires a sticky web that entangles targets. No damage — pure restraint. Ammo: 3 shots.',
  cost: '200 Thrones', weight: 2,
  tags: ['exotic', 'rare'],
}

const webber: Item = {
  id: 'webber', name: 'Webber', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 60 },
  damage: '', damageType: '',
  properties: ['Entangle', 'Two-handed'],
  description: 'Full-sized web projector with greater range and capacity. Ammo: 6 shots.',
  cost: '350 Thrones', weight: 5,
  tags: ['exotic', 'rare'],
}

const grenadeLauncher: Item = {
  id: 'grenade-launcher', name: 'Grenade Launcher', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: 'Varies', damageType: '',
  properties: ['Versatile (grenade type)'],
  description: 'Fires standard grenades at extended range. Damage and effects depend on grenade loaded. Ammo: 1 grenade (reload).',
  cost: '100 Thrones', weight: 5,
  tags: ['launcher', 'uncommon'],
}

const missileLauncher: Item = {
  id: 'missile-launcher', name: 'Missile Launcher', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 120, long: 480 },
  damage: 'Varies', damageType: '',
  properties: ['Heavy', 'Two-handed', 'Versatile (missile type)'],
  description: 'Fires guided missiles. Accepts frag, krak, and flakk warheads. Ammo: 1 missile (reload).',
  cost: '500 Thrones', weight: 12,
  tags: ['launcher', 'rare'],
}

const sniperRifle: Item = {
  id: 'sniper-rifle', name: 'Sniper Rifle', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 150, long: 600 },
  damage: '1d10', damageType: 'piercing',
  properties: ['Heavy', 'Two-handed'],
  description: 'Precision ballistic rifle with high-magnification scope. Ammo: Magazine.',
  cost: '80 Thrones', weight: 5,
  tags: ['exotic', 'uncommon'],
}

// ── Heavy Weapons ─────────────────────────────────────────────────────────────

const lascannon: Item = {
  id: 'lascannon', name: 'Lascannon', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 150, long: 600 },
  damage: '2d10', damageType: 'energy',
  properties: ['Heavy', 'Armor Penetration', 'Mounted'],
  description: 'The premier anti-armor las weapon. Fires a concentrated beam that can punch through tank armor. Requires Weapon Training (Heavy). Ammo: Per Shot.',
  cost: '800 Thrones', weight: 30,
  tags: ['las', 'rare', 'heavy-weapon'],
}

const autocannon: Item = {
  id: 'autocannon', name: 'Autocannon', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 120, long: 480 },
  damage: '2d8', damageType: 'piercing',
  properties: ['Heavy', 'Rapid Fire', 'Mounted'],
  description: 'Belt-fed heavy autocannon. Devastating sustained fire against infantry and light vehicles. Requires Weapon Training (Heavy). Ammo: Belt Feed.',
  cost: '600 Thrones', weight: 30,
  tags: ['auto', 'rare', 'heavy-weapon'],
}

const mortar: Item = {
  id: 'mortar', name: 'Mortar', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 200, long: 800 },
  damage: '2d8', damageType: 'bludgeoning',
  properties: ['Heavy', 'Blast (15 ft)', 'Indirect', 'Mounted'],
  description: 'Indirect-fire tube weapon. Can hit targets behind cover with a spotter. Requires Weapon Training (Heavy). Ammo: Per Shot.',
  cost: '300 Thrones', weight: 20,
  tags: ['explosive', 'uncommon', 'heavy-weapon'],
}

// ── General / Civilian ────────────────────────────────────────────────────────

const huntingRifle: Item = {
  id: 'hunting-rifle', name: 'Hunting Rifle', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '1d8', damageType: 'piercing',
  properties: ['Two-handed'],
  description: 'Standard bolt-action hunting rifle. Common on frontier worlds. Ammo: Magazine.',
  cost: '20 Thrones', weight: 5,
  tags: ['civilian', 'common'],
}

const sling: Item = {
  id: 'sling', name: 'Sling', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d4', damageType: 'bludgeoning',
  properties: [],
  description: 'Primitive sling weapon. Unlimited ammunition with suitable stones. Ammo: Unlimited.',
  cost: '1 Thrones', weight: 0,
  tags: ['civilian', 'common'],
}

const handCrossbow: Item = {
  id: 'hand-crossbow', name: 'Hand Crossbow', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d6', damageType: 'piercing',
  properties: ['Light', 'Silent'],
  description: 'Compact crossbow. Silent operation makes it useful for stealth. Ammo: 1 bolt (reload).',
  cost: '10 Thrones', weight: 2,
  tags: ['civilian', 'common'],
}

const crossbow: Item = {
  id: 'crossbow', name: 'Crossbow', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d8', damageType: 'piercing',
  properties: ['Two-handed', 'Silent', 'Loading'],
  description: 'Full-sized crossbow. Powerful but slow to reload. Ammo: 1 bolt (reload).',
  cost: '15 Thrones', weight: 5,
  tags: ['civilian', 'common'],
}

const bow: Item = {
  id: 'bow', name: 'Bow', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d6', damageType: 'piercing',
  properties: ['Two-handed'],
  description: 'Simple bow. Common on feral and feudal worlds. Ammo: 1 arrow.',
  cost: '5 Thrones', weight: 2,
  tags: ['civilian', 'common'],
}

const throwingKnife: Item = {
  id: 'throwing-knife', name: 'Throwing Knife', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'thrown',
  range: { normal: 20, long: 60 },
  damage: '1d4', damageType: 'piercing',
  properties: ['Light', 'Finesse', 'Thrown'],
  attackAbility: 'finesse',
  description: 'Balanced knife designed for throwing. Unlimited supply assumed. Ammo: Unlimited.',
  cost: '2 Thrones', weight: 0.5,
  tags: ['civilian', 'common'],
}

// ── Xenos Weapons ─────────────────────────────────────────────────────────────

const shurikenPistol: Item = {
  id: 'shuriken-pistol', name: 'Shuriken Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 30, long: 120 },
  damage: '1d8', damageType: 'slashing',
  properties: ['Light', 'Rending'],
  description: 'Aeldari weapon firing mono-molecular discs at extreme velocity. Requires xenos weapon proficiency. Ammo: Disc (40).',
  cost: '200 Thrones', weight: 1,
  tags: ['xenos', 'aeldari', 'rare'],
}

const shurikenCatapult: Item = {
  id: 'shuriken-catapult', name: 'Shuriken Catapult', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d10', damageType: 'slashing',
  properties: ['Rapid Fire', 'Rending'],
  description: 'Standard Aeldari infantry weapon. Fires a stream of razor-sharp discs. Requires xenos weapon proficiency. Ammo: Disc (80).',
  cost: '350 Thrones', weight: 3,
  tags: ['xenos', 'aeldari', 'rare'],
}

const splinterPistol: Item = {
  id: 'splinter-pistol', name: 'Splinter Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 25, long: 50 },
  damage: '1d6', damageType: 'poison',
  properties: ['Light', 'Toxic'],
  description: 'Drukhari weapon firing shards of crystallized toxin. Requires xenos weapon proficiency. Ammo: Crystal (40).',
  cost: '300 Thrones', weight: 1,
  tags: ['xenos', 'drukhari', 'very-rare'],
}

const splinterRifle: Item = {
  id: 'splinter-rifle', name: 'Splinter Rifle', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 80, long: 320 },
  damage: '1d8', damageType: 'poison',
  properties: ['Rapid Fire', 'Toxic'],
  description: 'Drukhari standard infantry weapon. Fires volleys of toxic crystal shards. Requires xenos weapon proficiency. Ammo: Crystal (80).',
  cost: '500 Thrones', weight: 3,
  tags: ['xenos', 'drukhari', 'very-rare'],
}

const pulsePistol: Item = {
  id: 'pulse-pistol', name: 'Pulse Pistol', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 40, long: 120 },
  damage: '1d8', damageType: 'energy',
  properties: ['Light', 'Armor Penetration'],
  description: "T'au pulse technology in pistol form. Superior armor penetration. Requires xenos weapon proficiency. Ammo: Power Cell.",
  cost: '250 Thrones', weight: 2,
  tags: ['xenos', 'tau', 'very-rare'],
}

const pulseRifle: Item = {
  id: 'pulse-rifle', name: 'Pulse Rifle', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 100, long: 400 },
  damage: '1d10', damageType: 'energy',
  properties: ['Armor Penetration', 'Two-handed'],
  description: "Standard T'au Fire Warrior weapon. Exceptional range and penetration. Requires xenos weapon proficiency. Ammo: Power Cell.",
  cost: '450 Thrones', weight: 4,
  tags: ['xenos', 'tau', 'very-rare'],
}

const pulseCarbine: Item = {
  id: 'pulse-carbine', name: 'Pulse Carbine', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'ranged',
  range: { normal: 60, long: 240 },
  damage: '1d8', damageType: 'energy',
  properties: ['Armor Penetration'],
  description: "Compact T'au pulse weapon with integrated photon grenade launcher. Requires xenos weapon proficiency. Ammo: Power Cell.",
  cost: '350 Thrones', weight: 3,
  tags: ['xenos', 'tau', 'very-rare'],
}

// ─── II. MELEE WEAPONS ────────────────────────────────────────────────────────

// ── Simple Melee ──────────────────────────────────────────────────────────────

const unarmedStrike: Item = {
  id: 'unarmed-strike', name: 'Unarmed Strike', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1', damageType: 'bludgeoning', attackAbility: 'finesse',
  properties: [],
  description: 'Punches, kicks, headbutts. Damage is 1 + STR modifier.',
  cost: '', weight: 0,
  tags: ['melee', 'common'],
}

const combatKnife: Item = {
  id: 'combat-knife', name: 'Combat Knife', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Light', 'Finesse', 'Thrown (20/60)'],
  description: 'Standard-issue combat blade. Versatile — can be used for slashing, piercing, or throwing.',
  cost: '2 Thrones', weight: 1,
  tags: ['melee', 'common'],
}

const club: Item = {
  id: 'club', name: 'Club', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'bludgeoning',
  properties: ['Light'],
  description: 'Simple bludgeon. Pipe, baton, or carved wood.',
  cost: '1 Thrones', weight: 2,
  tags: ['melee', 'common'],
}

const quarterstaff: Item = {
  id: 'quarterstaff', name: 'Quarterstaff', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'bludgeoning',
  versatileDamage: '1d8',
  properties: ['Versatile (1d8)'],
  description: 'A sturdy staff of wood or metal. Two-handed grip increases striking power.',
  cost: '2 Thrones', weight: 4,
  tags: ['melee', 'common'],
}

const spear: Item = {
  id: 'spear', name: 'Spear', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'piercing',
  versatileDamage: '1d8',
  properties: ['Thrown (20/60)', 'Versatile (1d8)'],
  description: 'Simple thrusting weapon. Can be thrown or used two-handed.',
  cost: '3 Thrones', weight: 3,
  tags: ['melee', 'common'],
}

const hatchet: Item = {
  id: 'hatchet', name: 'Hatchet', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'slashing',
  properties: ['Light', 'Thrown (20/60)'],
  description: 'Small hand axe suitable for melee or throwing.',
  cost: '3 Thrones', weight: 2,
  tags: ['melee', 'common'],
}

const mace: Item = {
  id: 'mace', name: 'Mace', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'bludgeoning',
  versatileDamage: '1d8',
  properties: ['Versatile (1d8)'],
  description: 'Flanged striking weapon effective against armored targets.',
  cost: '5 Thrones', weight: 4,
  tags: ['melee', 'common'],
}

const greatClub: Item = {
  id: 'great-club', name: 'Great Club', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d8', damageType: 'bludgeoning',
  properties: ['Two-handed', 'Heavy'],
  description: 'Oversized bludgeon. Popular with Ogryn and anyone who values simplicity.',
  cost: '2 Thrones', weight: 10,
  tags: ['melee', 'common'],
}

// ── Martial Melee ─────────────────────────────────────────────────────────────

const monoKnife: Item = {
  id: 'mono-knife', name: 'Mono-Knife', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d6', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Light', 'Finesse', 'Armor Penetration (-1 AC)'],
  description: 'Mono-molecular edged knife. Cuts through armor with ease.',
  cost: '25 Thrones', weight: 1,
  tags: ['melee', 'uncommon'],
}

const sword: Item = {
  id: 'sword', name: 'Sword', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing',
  versatileDamage: '1d10',
  properties: ['Versatile (1d10)'],
  description: 'Standard military sword. Versatile and reliable.',
  cost: '15 Thrones', weight: 3,
  tags: ['melee', 'common'],
}

const warAxe: Item = {
  id: 'war-axe', name: 'War Axe', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing',
  versatileDamage: '1d10',
  properties: ['Versatile (1d10)'],
  description: 'Military battle axe. Can be used one-handed with a shield or two-handed for more power.',
  cost: '15 Thrones', weight: 4,
  tags: ['melee', 'common'],
}

const warHammer: Item = {
  id: 'war-hammer', name: 'War Hammer', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'bludgeoning',
  versatileDamage: '1d10',
  properties: ['Versatile (1d10)'],
  description: 'Crushing hammer designed for punching through armor.',
  cost: '15 Thrones', weight: 4,
  tags: ['melee', 'common'],
}

const flail: Item = {
  id: 'flail', name: 'Flail', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'bludgeoning',
  properties: ['Ignores Shield AC bonus'],
  description: 'Chain-linked striking head that wraps around shields and parries.',
  cost: '15 Thrones', weight: 3,
  tags: ['melee', 'common'],
}

const halberd: Item = {
  id: 'halberd', name: 'Halberd', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Heavy', 'Reach', 'Two-handed'],
  description: 'Polearm combining axe blade, hook, and spike. Extended reach.',
  cost: '20 Thrones', weight: 6,
  tags: ['melee', 'common'],
}

const glaive: Item = {
  id: 'glaive', name: 'Glaive', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Heavy', 'Reach', 'Two-handed'],
  description: 'Long-hafted slashing polearm. Sweeping cuts at extended range.',
  cost: '20 Thrones', weight: 6,
  tags: ['melee', 'common'],
}

const greatsword: Item = {
  id: 'greatsword', name: 'Greatsword', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '2d6', damageType: 'slashing',
  properties: ['Heavy', 'Two-handed'],
  description: 'Massive two-handed sword. Devastating sweeping strikes.',
  cost: '30 Thrones', weight: 6,
  tags: ['melee', 'uncommon'],
}

const maul: Item = {
  id: 'maul', name: 'Maul', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '2d6', damageType: 'bludgeoning',
  properties: ['Heavy', 'Two-handed'],
  description: 'Enormous two-handed crushing weapon. Shatters armor and bone.',
  cost: '15 Thrones', weight: 10,
  tags: ['melee', 'common'],
}

const whip: Item = {
  id: 'whip', name: 'Whip', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d4', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Finesse', 'Reach'],
  description: 'Flexible whip with extended reach. Low damage but excellent control.',
  cost: '5 Thrones', weight: 3,
  tags: ['melee', 'common'],
}

// ── Chain Weapons ─────────────────────────────────────────────────────────────

const chainsword: Item = {
  id: 'chainsword', name: 'Chainsword', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing',
  properties: ['Rending'],
  description: 'Sword with a motorized chain of monomolecular teeth running along the blade. Iconic weapon of the Imperium. Crits on 19-20.',
  cost: '50 Thrones', weight: 4,
  tags: ['chain', 'uncommon'],
}

const chainaxe: Item = {
  id: 'chainaxe', name: 'Chainaxe', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Rending', 'Two-handed'],
  description: 'Heavier chain weapon with axe-head configuration. More devastating than the chainsword but requires two hands.',
  cost: '65 Thrones', weight: 6,
  tags: ['chain', 'uncommon'],
}

const chainGlaive: Item = {
  id: 'chain-glaive', name: 'Chain Glaive', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Rending', 'Heavy', 'Reach', 'Two-handed'],
  description: 'Polearm with a chain-edged blade. Combines reach with the rending power of chain weapons.',
  cost: '150 Thrones', weight: 8,
  tags: ['chain', 'rare'],
}

const eviscerator: Item = {
  id: 'eviscerator', name: 'Eviscerator', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '2d6', damageType: 'slashing',
  properties: ['Rending', 'Heavy', 'Two-handed'],
  description: 'Enormous two-handed chainsword nearly as tall as a human. Favored by Redemptionists and Sisters Repentia.',
  cost: '200 Thrones', weight: 12,
  tags: ['chain', 'rare'],
}

// ── Power Weapons (count as magical) ─────────────────────────────────────────

const powerSword: Item = {
  id: 'power-sword', name: 'Power Sword', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Finesse', 'Armor Penetration'],
  requiresAttunement: false,
  description: 'Sword surrounded by a disruptive energy field that allows it to cut through armor and energy fields. Counts as magical.',
  cost: '300 Thrones', weight: 3,
  tags: ['power', 'rare', 'magical'],
}

const powerAxe: Item = {
  id: 'power-axe', name: 'Power Axe', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Armor Penetration'],
  description: 'Axe with a power field generator. Devastating against armored targets. Counts as magical.',
  cost: '300 Thrones', weight: 5,
  tags: ['power', 'rare', 'magical'],
}

const powerMaul: Item = {
  id: 'power-maul', name: 'Power Maul', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'bludgeoning',
  properties: ['Armor Penetration', 'Knockback'],
  description: 'Bludgeoning weapon with a power field that amplifies impact force. Sends targets flying. Counts as magical.',
  cost: '300 Thrones', weight: 5,
  tags: ['power', 'rare', 'magical'],
}

const powerFist: Item = {
  id: 'power-fist', name: 'Power Fist', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '2d6', damageType: 'bludgeoning',
  properties: ['Armor Penetration', 'Heavy', 'Unwieldy'],
  description: 'Armored gauntlet with a power field. Shatters ferrocrete on impact. Too cumbersome for opportunity attacks. Counts as magical.',
  cost: '500 Thrones', weight: 8,
  tags: ['power', 'very-rare', 'magical'],
}

const lightningClaw: Item = {
  id: 'lightning-claw', name: 'Lightning Claw', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Light', 'Finesse', 'Armor Penetration', 'Rending'],
  description: 'Gauntlet fitted with energized talons. Fast, precise, and devastating. Counts as magical.',
  cost: '500 Thrones', weight: 3,
  tags: ['power', 'very-rare', 'magical'],
}

const thunderHammer: Item = {
  id: 'thunder-hammer', name: 'Thunder Hammer', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'bludgeoning',
  properties: ['Heavy', 'Two-handed', 'Armor Penetration', 'Knockdown'],
  description: 'Massive hammer that releases a concussive energy blast on impact. Knocks targets prone on crits. Counts as magical.',
  cost: '600 Thrones', weight: 12,
  tags: ['power', 'very-rare', 'magical'],
}

// ── Force Weapons (Psyker only, magical) ─────────────────────────────────────

const forceSword: Item = {
  id: 'force-sword', name: 'Force Sword', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d8', damageType: 'slashing', attackAbility: 'finesse',
  properties: ['Finesse', 'Psychic Channel'],
  description: 'A blade that channels psychic energy. Only a psyker can activate its Psychic Channel property. Counts as magical.',
  cost: '350 Thrones', weight: 3,
  tags: ['force', 'rare', 'magical', 'psyker-only'],
}

const forceAxe: Item = {
  id: 'force-axe', name: 'Force Axe', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d10', damageType: 'slashing',
  properties: ['Psychic Channel'],
  description: 'Heavy axe that channels psychic energy for devastating strikes. Psyker only. Counts as magical.',
  cost: '350 Thrones', weight: 5,
  tags: ['force', 'rare', 'magical', 'psyker-only'],
}

const forceStave: Item = {
  id: 'force-stave', name: 'Force Stave', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d6', damageType: 'bludgeoning',
  versatileDamage: '1d8',
  properties: ['Versatile (1d8)', 'Reach', 'Psychic Channel'],
  description: 'Staff that focuses psychic energy. Reach and versatility make it the most popular psyker melee weapon. Counts as magical.',
  cost: '300 Thrones', weight: 4,
  tags: ['force', 'rare', 'magical', 'psyker-only'],
}

// ── Special / Exotic Melee ────────────────────────────────────────────────────

const shockMaul: Item = {
  id: 'shock-maul', name: 'Shock Maul', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d6+1d4', damageType: 'bludgeoning',
  properties: ['Stun (CON save DC 13)'],
  description: 'Electrified striking weapon used by Arbites and enforcers. Bludgeoning + lightning damage. Can stun targets.',
  cost: '75 Thrones', weight: 4,
  tags: ['exotic', 'uncommon'],
}

const neuralWhip: Item = {
  id: 'neural-whip', name: 'Neural Whip', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d4', damageType: 'psychic', attackAbility: 'finesse',
  properties: ['Finesse', 'Reach', 'Pain (WIS save DC 13 or disadvantage)'],
  description: 'Whip that overloads pain receptors. Psychic damage and crippling pain on failed saves.',
  cost: '250 Thrones', weight: 2,
  tags: ['exotic', 'rare'],
}

const huntingLance: Item = {
  id: 'hunting-lance', name: 'Hunting Lance', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '2d6', damageType: 'piercing',
  properties: ['Reach', 'Charge (extra 1d6)', 'Single Use on charge'],
  description: 'Explosive-tipped lance used by Rough Riders. Devastating on the charge but the tip is destroyed on impact.',
  cost: '40 Thrones', weight: 8,
  tags: ['exotic', 'uncommon'],
}

const trenchKnife: Item = {
  id: 'trench-knife', name: 'Trench Knife', type: 'weapon', tier: 'standard',
  weaponCategory: 'martial', rangeType: 'melee',
  damage: '1d4', damageType: 'piercing', attackAbility: 'finesse',
  properties: ['Light', 'Finesse', 'Grapple bonus (+2 to grapple checks)'],
  description: 'Knuckle-guard knife designed for trench fighting. Excellent for grappling.',
  cost: '8 Thrones', weight: 1,
  tags: ['exotic', 'common'],
}

// ── Improvised ────────────────────────────────────────────────────────────────

const pipeMetalRod: Item = {
  id: 'pipe-metal-rod', name: 'Pipe / Metal Rod', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'bludgeoning',
  properties: [],
  description: 'Improvised bludgeon. Found everywhere in the underhive.',
  cost: '', weight: 3,
  tags: ['improvised', 'common'],
}

const brokenBottle: Item = {
  id: 'broken-bottle', name: 'Broken Bottle', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'slashing',
  properties: ['Light'],
  description: 'Smashed bottle used as an improvised slashing weapon.',
  cost: '', weight: 1,
  tags: ['improvised', 'common'],
}

const miningPick: Item = {
  id: 'mining-pick', name: 'Mining Pick', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'piercing',
  properties: ['Heavy'],
  description: 'Mining tool repurposed as a weapon. Heavy and brutal.',
  cost: '5 Thrones', weight: 6,
  tags: ['improvised', 'common'],
}

const wrenchSpanner: Item = {
  id: 'wrench-spanner', name: 'Wrench / Spanner', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'bludgeoning',
  properties: ['Light'],
  description: 'Heavy wrench. The weapon of choice for desperate Tech-Priests and angry engineers.',
  cost: '3 Thrones', weight: 3,
  tags: ['improvised', 'common'],
}

const shovelEntrenching: Item = {
  id: 'shovel-entrenching', name: 'Shovel (Entrenching)', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'slashing',
  versatileDamage: '1d8',
  properties: ['Versatile (1d8)'],
  description: 'Standard-issue entrenching tool. The Death Korps of Krieg consider it a primary weapon.',
  cost: '3 Thrones', weight: 5,
  tags: ['improvised', 'common'],
}

const chairStool: Item = {
  id: 'chair-stool', name: 'Chair / Stool', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d6', damageType: 'bludgeoning',
  properties: ['Two-handed', 'Breaks on crit'],
  description: 'Improvised bludgeon. Shatters on a critical hit, leaving you with splinters.',
  cost: '', weight: 8,
  tags: ['improvised', 'common'],
}

const torchLit: Item = {
  id: 'torch-lit', name: 'Torch (lit)', type: 'weapon', tier: 'standard',
  weaponCategory: 'simple', rangeType: 'melee',
  damage: '1d4', damageType: 'fire',
  properties: ['Light'],
  description: 'A burning torch. Light source and improvised fire weapon.',
  cost: '1 Thrones', weight: 1,
  tags: ['improvised', 'common'],
}

// ─── III. GRENADES & EXPLOSIVES ───────────────────────────────────────────────

// ── Grenades ──────────────────────────────────────────────────────────────────

const fragGrenade: Item = {
  id: 'frag-grenade', name: 'Frag Grenade', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '3d6', consumableDamageType: 'piercing',
  consumableEffect: 'All creatures in 15-foot radius make DEX save. Failure: 3d6 piercing damage. Success: half.',
  description: 'Standard fragmentation grenade. Shrapnel tears through soft targets.',
  cost: '10 Thrones', weight: 1,
  tags: ['grenade', 'common'],
}

const krakGrenade: Item = {
  id: 'krak-grenade', name: 'Krak Grenade', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '5-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d8', consumableDamageType: 'bludgeoning',
  consumableEffect: 'Anti-armor shaped charge. 4d8 bludgeoning in 5-foot radius (DEX save half). Deals double damage to vehicles and structures.',
  description: 'Shaped-charge anti-armor grenade.',
  cost: '25 Thrones', weight: 1,
  tags: ['grenade', 'uncommon'],
}

const smokeGrenade: Item = {
  id: 'smoke-grenade', name: 'Smoke Grenade', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableEffect: 'Creates a heavily obscured area for 1 minute (3 rounds in wind). No damage.',
  description: 'Fills an area with thick smoke, blocking line of sight.',
  cost: '5 Thrones', weight: 1,
  tags: ['grenade', 'common'],
}

const stunGrenade: Item = {
  id: 'stun-grenade', name: 'Stun Grenade (Photon Flash)', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'constitution',
  consumableEffect: 'All creatures in 15-foot radius make CON save. Failure: blinded and deafened for 1 minute. No damage.',
  description: 'Blinding flash and deafening bang. Non-lethal crowd control.',
  cost: '10 Thrones', weight: 1,
  tags: ['grenade', 'common'],
}

const fireBomb: Item = {
  id: 'fire-bomb', name: 'Fire Bomb', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '10-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '2d6', consumableDamageType: 'fire',
  consumableEffect: '2d6 fire damage in 10-foot radius (DEX save half). Area burns for 1 round — 1d6 fire damage at start of turn to creatures in area.',
  description: 'Improvised incendiary device. Sets an area ablaze.',
  cost: '8 Thrones', weight: 1,
  tags: ['grenade', 'common'],
}

const gasGrenade: Item = {
  id: 'gas-grenade', name: 'Gas Grenade (Choke)', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'constitution',
  consumableDamage: '1d6', consumableDamageType: 'poison',
  consumableEffect: '1d6 poison damage in 15-foot radius. CON save or poisoned for 1 minute. Area becomes obscured.',
  description: 'Releases choking gas that poisons and obscures.',
  cost: '20 Thrones', weight: 1,
  tags: ['grenade', 'uncommon'],
}

const hallucinogenGrenade: Item = {
  id: 'hallucinogen-grenade', name: 'Hallucinogen Grenade', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'wisdom',
  consumableEffect: 'All creatures in 15-foot radius make WIS save. Failure: confused (as Confusion spell) for 1 minute. No damage.',
  description: 'Releases psychoactive compounds that cause vivid, terrifying hallucinations.',
  cost: '50 Thrones', weight: 1,
  tags: ['grenade', 'rare'],
}

const empGrenade: Item = {
  id: 'emp-grenade', name: 'EMP Grenade (Haywire)', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '60 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'constitution',
  consumableDamage: '3d6', consumableDamageType: 'lightning',
  consumableEffect: '3d6 lightning damage vs machines and augmetics only. Disables affected targets for 1 round. No effect on organic creatures without augmetics.',
  description: 'Electromagnetic pulse grenade. Devastating to machines and cybernetics.',
  cost: '30 Thrones', weight: 1,
  tags: ['grenade', 'uncommon'],
}

const meltaBomb: Item = {
  id: 'melta-bomb', name: 'Melta Bomb', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Touch (placed)', consumableAreaOfEffect: '5-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d10', consumableDamageType: 'fire',
  consumableEffect: 'Must be placed adjacent to target (action). 1 round fuse. 4d10 fire damage in 5-foot radius (DEX save half). Anti-armor.',
  description: 'Fusion charge designed to melt through vehicle armor and fortifications.',
  cost: '100 Thrones', weight: 2,
  tags: ['grenade', 'rare'],
}

// ── Demolition Charges ────────────────────────────────────────────────────────

const demoCharge: Item = {
  id: 'demo-charge', name: 'Demo Charge', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '20-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '6d6', consumableDamageType: 'bludgeoning',
  consumableEffect: '6d6 bludgeoning in 20-foot radius (DEX save half). STR save or knocked prone on failure. Timer or remote detonation.',
  description: 'Standard demolition charge. Timer or remote detonation.',
  cost: '50 Thrones', weight: 3,
  tags: ['explosive', 'uncommon'],
}

const shapedCharge: Item = {
  id: 'shaped-charge', name: 'Shaped Charge', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '10-foot cone',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d10', consumableDamageType: 'bludgeoning',
  consumableEffect: '4d10 bludgeoning in 10-foot cone (directional, DEX save half). Deals double damage to structures.',
  description: 'Directional explosive designed for breaching walls and fortifications.',
  cost: '75 Thrones', weight: 2,
  tags: ['explosive', 'uncommon'],
}

const detPackSmall: Item = {
  id: 'det-pack-small', name: 'Det Pack (Small)', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d6', consumableDamageType: 'bludgeoning',
  consumableEffect: '4d6 bludgeoning in 15-foot radius (DEX save half). Adhesive backing. Timer or tripwire detonation.',
  description: 'Small adhesive explosive pack.',
  cost: '40 Thrones', weight: 1,
  tags: ['explosive', 'uncommon'],
}

const detPackLarge: Item = {
  id: 'det-pack-large', name: 'Det Pack (Large)', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '30-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '8d6', consumableDamageType: 'bludgeoning',
  consumableEffect: '8d6 bludgeoning in 30-foot radius (DEX save half). Building-scale demolition. Timer or remote detonation.',
  description: 'Large demolition pack. Brings down buildings.',
  cost: '150 Thrones', weight: 5,
  tags: ['explosive', 'rare'],
}

// ── Mines ─────────────────────────────────────────────────────────────────────

const antiPersonnelMine: Item = {
  id: 'anti-personnel-mine', name: 'Anti-Personnel Mine', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '10-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '3d8', consumableDamageType: 'piercing',
  consumableEffect: '3d8 piercing in 10-foot radius (DEX save half). Perception DC 15 to spot. Proximity or pressure trigger.',
  description: 'Buried explosive triggered by proximity or pressure.',
  cost: '30 Thrones', weight: 2,
  tags: ['mine', 'uncommon'],
}

const antiVehicleMine: Item = {
  id: 'anti-vehicle-mine', name: 'Anti-Vehicle Mine', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '5-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '6d8', consumableDamageType: 'bludgeoning',
  consumableEffect: '6d8 bludgeoning in 5-foot radius (DEX save half). Triggers on 500+ lbs of pressure. Deals double damage to vehicles.',
  description: 'Heavy mine designed to destroy vehicles and heavy equipment.',
  cost: '50 Thrones', weight: 5,
  tags: ['mine', 'uncommon'],
}

const shockMine: Item = {
  id: 'shock-mine', name: 'Shock Mine', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: 'Placed', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'constitution',
  consumableDamage: '2d6', consumableDamageType: 'lightning',
  consumableEffect: '2d6 lightning in 15-foot radius. CON save or stunned for 1 round.',
  description: 'Non-lethal(ish) mine that delivers a massive electrical shock.',
  cost: '60 Thrones', weight: 2,
  tags: ['mine', 'rare'],
}

// ── Missiles ──────────────────────────────────────────────────────────────────

const fragMissile: Item = {
  id: 'frag-missile', name: 'Frag Missile', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '120/480 feet', consumableAreaOfEffect: '15-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d6', consumableDamageType: 'piercing',
  consumableEffect: 'Standard anti-infantry missile. 4d6 piercing in 15-foot radius (DEX save half). Fired from Missile Launcher.',
  description: 'Fragmentation warhead for the missile launcher.',
  cost: '25 Thrones', weight: 3,
  tags: ['missile', 'uncommon'],
}

const krakMissile: Item = {
  id: 'krak-missile', name: 'Krak Missile', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '120/480 feet', consumableAreaOfEffect: '5-foot radius',
  consumableSaveDC: '8 + proficiency + dexterity', consumableSaveAbility: 'dexterity',
  consumableDamage: '4d10', consumableDamageType: 'bludgeoning',
  consumableEffect: 'Anti-armor warhead. 4d10 bludgeoning in 5-foot radius (DEX save half). Deals double damage to vehicles and structures.',
  description: 'Shaped-charge anti-armor warhead for the missile launcher.',
  cost: '40 Thrones', weight: 3,
  tags: ['missile', 'uncommon'],
}

const flakkMissile: Item = {
  id: 'flakk-missile', name: 'Flakk Missile', type: 'consumable', tier: 'standard',
  consumableActionType: 'action', consumableCharges: 1,
  consumableRange: '120/480 feet',
  consumableDamage: '3d8', consumableDamageType: 'piercing',
  consumableEffect: 'Anti-air missile. 3d8 piercing, single target. Advantage on attack rolls against flying targets. Fired from Missile Launcher.',
  description: 'Proximity-fused anti-air warhead for the missile launcher.',
  cost: '50 Thrones', weight: 3,
  tags: ['missile', 'rare'],
}

// ─── IV. SPECIAL AMMUNITION ───────────────────────────────────────────────────

const manStopperRounds: Item = {
  id: 'man-stopper-rounds', name: 'Man-Stopper Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: '+1 damage per die rolled. High-velocity armor-piercing rounds. Compatible: Bolt, Auto, Stub weapons. Magazine holds half normal capacity.',
  description: 'High-velocity armor-piercing ammunition. Compatible with Bolt, Auto, and Stub weapons.',
  cost: '3x base ammo cost', weight: 0.5,
  tags: ['ammo', 'uncommon'],
}

const infernoRounds: Item = {
  id: 'inferno-rounds', name: 'Inferno Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: 'Damage type becomes fire. On hit, target takes 1d4 fire at start of next turn (burning propellant). Compatible: Bolt weapons only.',
  description: 'Incendiary bolt shells that set targets ablaze.',
  cost: '5x base ammo cost', weight: 0.5,
  tags: ['ammo', 'rare'],
}

const krakenRounds: Item = {
  id: 'kraken-rounds', name: 'Kraken Penetrator Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: 'Gain Armor Penetration property. Double normal range increments. Compatible: Bolt weapons only.',
  description: 'Armor-piercing bolt shells with extended-range propellant.',
  cost: '5x base ammo cost', weight: 0.5,
  tags: ['ammo', 'rare'],
}

const dumdumRounds: Item = {
  id: 'dumdum-rounds', name: 'Dumdum Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: 'Gain Rending property (crit on 19-20). BUT target gains +1 AC vs this attack (less effective vs armor). Compatible: Auto, Stub weapons.',
  description: 'Expanding rounds that cause devastating wounds to unarmored targets.',
  cost: '2x base ammo cost', weight: 0.5,
  tags: ['ammo', 'uncommon'],
}

const toxicRounds: Item = {
  id: 'toxic-rounds', name: 'Toxic Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: 'On hit, target makes CON save DC 14 or poisoned for 1 minute. Creatures immune to poison unaffected. Compatible: Needle, Stub weapons.',
  description: 'Chemically-treated ammunition coated in synthesized toxins.',
  cost: '10x base ammo cost', weight: 0.5,
  tags: ['ammo', 'rare'],
}

const overchargedPowerPack: Item = {
  id: 'overcharged-power-pack', name: 'Overcharged Power Pack', type: 'consumable', tier: 'standard',
  consumableEffect: '+2 damage per hit. Natural 1 or 2 expends the power pack (burns out faster). Compatible: Las weapons.',
  description: 'Power pack modified for higher output at the cost of reliability.',
  cost: '3x base ammo cost', weight: 0.5,
  tags: ['ammo', 'uncommon'],
}

const sanctifiedAmmo: Item = {
  id: 'sanctified-ammunition', name: 'Sanctified Ammunition', type: 'consumable', tier: 'standard',
  consumableEffect: 'Weapon counts as magical for overcoming resistances. +1d4 radiant damage vs daemons and warp entities. Compatible: Any ballistic weapon.',
  description: 'Ammunition blessed by Ecclesiarchy priests. Potent against the unholy.',
  cost: '5x base ammo cost', weight: 0.5,
  tags: ['ammo', 'rare'],
}

const tracerRounds: Item = {
  id: 'tracer-rounds', name: 'Tracer Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: 'No damage bonus. Hit target glows for 1 minute. Attacks against illuminated target ignore invisibility and concealment. Compatible: Any ballistic weapon.',
  description: 'Phosphorescent-tipped rounds that illuminate targets on hit.',
  cost: '2x base ammo cost', weight: 0.5,
  tags: ['ammo', 'common'],
}

const frangibleRounds: Item = {
  id: 'frangible-rounds', name: 'Frangible Rounds', type: 'consumable', tier: 'standard',
  consumableEffect: '+1d4 damage vs unarmored targets (AC 12 or less). No bonus vs armored targets. Compatible: Auto, Stub weapons.',
  description: 'Fragmenting rounds designed for maximum soft-target damage.',
  cost: '2x base ammo cost', weight: 0.5,
  tags: ['ammo', 'common'],
}

const blessedBoltShells: Item = {
  id: 'blessed-bolt-shells', name: 'Blessed Bolt Shells', type: 'consumable', tier: 'standard',
  consumableEffect: '+1d6 radiant damage vs daemons, undead, and chaos-corrupted creatures. No bonus vs other targets. Compatible: Bolt weapons only.',
  description: 'Bolt shells individually blessed by an Ecclesiarchy priest. Sacred ammunition for sacred targets.',
  cost: '8x base ammo cost', weight: 0.5,
  tags: ['ammo', 'rare'],
}

// ─── Ammo Data ────────────────────────────────────────────────────────────────
// Applied to ranged weapons at export time via spread merge.

const ammoData: Record<string, Partial<Item>> = {
  // Las Weapons
  'laspistol':          { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Power Pack',          rechargeable: true  },
  'lasgun':             { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Power Pack',          rechargeable: true  },
  'las-carbine':        { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Power Pack',          rechargeable: true  },
  'long-las':           { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Power Pack',          rechargeable: true  },
  'hot-shot-lasgun':    { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Hot-Shot Pack',       rechargeable: false },
  'hot-shot-laspistol': { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Hot-Shot Pack',       rechargeable: false },
  'multilaser':         { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Power Cell',          rechargeable: true  },
  // Bolt Weapons
  'bolt-pistol':        { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Bolt Magazine',       rechargeable: false },
  'boltgun':            { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Bolt Magazine',       rechargeable: false },
  'bolt-carbine':       { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Bolt Magazine',       rechargeable: false },
  'heavy-bolter':       { ammoType: 'belt', ammoCapacity: 40, ammoName: 'Belt Feed',           rechargeable: false },
  'storm-bolter':       { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Bolt Magazine',       rechargeable: false },
  // Auto Weapons
  'autopistol':         { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Magazine',            rechargeable: false },
  'autogun':            { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Magazine',            rechargeable: false },
  'heavy-stubber':      { ammoType: 'belt', ammoCapacity: 40, ammoName: 'Belt Feed',           rechargeable: false },
  'assault-cannon':     { ammoType: 'belt', ammoCapacity: 40, ammoName: 'Belt Feed',           rechargeable: false },
  // Stub Weapons
  'stub-pistol':        { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Cylinder (6)',        rechargeable: false },
  'stub-revolver':      { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Cylinder (6)',        rechargeable: false },
  'stub-automatic':     { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Magazine',            rechargeable: false },
  'hand-cannon':        { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Cylinder (5)',        rechargeable: false },
  // Plasma Weapons
  'plasma-pistol':      { ammoType: 'shot', ammoCapacity: 6,  ammoName: 'Plasma Flask',        rechargeable: false },
  'plasma-gun':         { ammoType: 'shot', ammoCapacity: 8,  ammoName: 'Plasma Flask',        rechargeable: false },
  'plasma-cannon':      { ammoType: 'shot', ammoCapacity: 6,  ammoName: 'Plasma Flask',        rechargeable: false },
  // Melta Weapons
  'inferno-pistol':     { ammoType: 'shot', ammoCapacity: 4,  ammoName: 'Promethium Canister', rechargeable: false },
  'meltagun':           { ammoType: 'shot', ammoCapacity: 6,  ammoName: 'Promethium Canister', rechargeable: false },
  'multi-melta':        { ammoType: 'shot', ammoCapacity: 8,  ammoName: 'Promethium Canister', rechargeable: false },
  // Flame Weapons
  'hand-flamer':        { ammoType: 'shot', ammoCapacity: 4,  ammoName: 'Promethium Tank',     rechargeable: false },
  'flamer':             { ammoType: 'shot', ammoCapacity: 6,  ammoName: 'Promethium Tank',     rechargeable: false },
  'heavy-flamer':       { ammoType: 'shot', ammoCapacity: 8,  ammoName: 'Promethium Tank',     rechargeable: false },
  // Shotguns
  'pump-shotgun':       { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Shell Box (6)',       rechargeable: false },
  'combat-shotgun':     { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Shell Box (8)',       rechargeable: false },
  'ripper-gun':         { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Shell Box (4)',       rechargeable: false },
  // Special / Exotic
  'needle-pistol':      { ammoType: 'shot', ammoCapacity: 10, ammoName: 'Needle Clip',         rechargeable: false },
  'needle-rifle':       { ammoType: 'shot', ammoCapacity: 12, ammoName: 'Needle Clip',         rechargeable: false },
  'web-pistol':         { ammoType: 'shot', ammoCapacity: 3,  ammoName: 'Web Canister',        rechargeable: false },
  'webber':             { ammoType: 'shot', ammoCapacity: 6,  ammoName: 'Web Canister',        rechargeable: false },
  'grenade-launcher':   { ammoType: 'shot', ammoCapacity: 1,  ammoName: 'Grenade (loaded)',    rechargeable: false },
  'missile-launcher':   { ammoType: 'shot', ammoCapacity: 1,  ammoName: 'Missile (loaded)',    rechargeable: false },
  'sniper-rifle':       { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Magazine',            rechargeable: false },
  // Heavy Weapons
  'lascannon':          { ammoType: 'shot', ammoCapacity: 5,  ammoName: 'Power Cell',          rechargeable: true  },
  'autocannon':         { ammoType: 'belt', ammoCapacity: 30, ammoName: 'Belt Feed',           rechargeable: false },
  'mortar':             { ammoType: 'shot', ammoCapacity: 10, ammoName: 'Mortar Shell',        rechargeable: false },
  // Civilian
  'hunting-rifle':      { ammoType: 'pack', ammoCapacity: 4,  ammoName: 'Magazine',            rechargeable: false },
  'sling':              { ammoType: 'unlimited' },
  'hand-crossbow':      { ammoType: 'shot', ammoCapacity: 1,  ammoName: 'Bolt',                rechargeable: false },
  'crossbow':           { ammoType: 'shot', ammoCapacity: 1,  ammoName: 'Bolt',                rechargeable: false },
  'bow':                { ammoType: 'shot', ammoCapacity: 20, ammoName: 'Arrow',               rechargeable: false },
  'throwing-knife':     { ammoType: 'unlimited' },
  // Xenos
  'shuriken-pistol':    { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Disc (40)',           rechargeable: false },
  'shuriken-catapult':  { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Disc (80)',           rechargeable: false },
  'splinter-pistol':    { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Crystal (40)',        rechargeable: false },
  'splinter-rifle':     { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Crystal (80)',        rechargeable: false },
  'pulse-pistol':       { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Power Cell',          rechargeable: true  },
  'pulse-rifle':        { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Power Cell',          rechargeable: true  },
  'pulse-carbine':      { ammoType: 'pack', ammoCapacity: 3,  ammoName: 'Power Cell',          rechargeable: true  },
}

// ─── Tier Upgrade Tables ──────────────────────────────────────────────────────

export interface TierDefinition {
  tier: ItemTier
  color: string
  bonusAttack: number
  bonusDamage: string   // '' | '+1' | '+1d6' | '+2d4' | '+2d6'
  hasTraitSlot: boolean
}

export const tierDefinitions: TierDefinition[] = [
  { tier: 'standard',       color: 'white',  bonusAttack: 0, bonusDamage: '',     hasTraitSlot: false },
  { tier: 'master-crafted', color: 'green',  bonusAttack: 1, bonusDamage: '+1',   hasTraitSlot: false },
  { tier: 'artificer',      color: 'purple', bonusAttack: 2, bonusDamage: '+1d6', hasTraitSlot: true  },
  { tier: 'relic',          color: 'gold',   bonusAttack: 3, bonusDamage: '+2d4', hasTraitSlot: true  },
  { tier: 'heroic',         color: 'red',    bonusAttack: 3, bonusDamage: '+2d6', hasTraitSlot: true  },
]

export interface RollableTrait {
  roll: number
  name: string
  effect: string
}

/** Artificer Traits — roll 1d10 when upgrading to Artificer tier */
export const artificerTraits: RollableTrait[] = [
  { roll: 1,  name: 'Reliable',   effect: 'This weapon never misfires. Ignore natural 1 ammo consumption. Gets Hot triggers only on natural 1 (not 1–2 for untrained users).' },
  { roll: 2,  name: 'Keen Edge',  effect: 'Critical hit range expands by 1 (e.g., 20 becomes 19–20, or 19–20 becomes 18–20).' },
  { roll: 3,  name: 'Swift',      effect: 'You can reload this weapon as a free action without using your object interaction. Drawing/stowing is also free.' },
  { roll: 4,  name: 'Balanced',   effect: 'When you miss with this weapon, you gain +2 to your next attack roll with it (until end of your next turn).' },
  { roll: 5,  name: 'Searing',    effect: 'On a critical hit, the target takes an additional 1d8 fire damage and must make a CON save (DC 14) or be set ablaze (1d4 fire damage at start of each turn until extinguished as an action).' },
  { roll: 6,  name: 'Steady',     effect: 'You ignore disadvantage from long range, prone firing, or environmental penalties (wind, rain, darkness) with this weapon.' },
  { roll: 7,  name: 'Brutal',     effect: 'When you roll the maximum on any damage die with this weapon, you may reroll that die and add the result (exploding dice). Each die can only explode once.' },
  { roll: 8,  name: 'Guardian',   effect: "While wielding this weapon, you gain +1 AC. The weapon's machine spirit deflects incoming attacks with micro-adjustments." },
  { roll: 9,  name: 'Hungering',  effect: 'When you reduce a creature to 0 HP with this weapon, you gain temporary hit points equal to your proficiency bonus.' },
  { roll: 10, name: 'Marked',     effect: 'Choose an enemy type (Daemons, Orks, Eldar, Chaos Marines, etc.). This weapon deals an additional 1d6 damage against that enemy type.' },
]

/** Relic Traits — roll 1d10 when upgrading to Relic tier. REPLACES Artificer trait. */
export const relicTraits: RollableTrait[] = [
  { roll: 1,  name: 'Daemonbane',    effect: 'Extra 2d6 radiant damage to daemons, warp entities, and chaos-corrupted creatures. Glows faintly in the presence of warp taint (60 ft detection).' },
  { roll: 2,  name: 'Unyielding',    effect: 'Cannot be disarmed, destroyed, or damaged by any means. If thrown, returns to your hand at start of your next turn. Functions in hostile environments (void, extreme heat, acid).' },
  { roll: 3,  name: 'Executioner',   effect: 'When you hit a creature below half its maximum HP, deal an additional 2d8 damage. The weapon senses weakness.' },
  { roll: 4,  name: 'Shieldbreaker', effect: 'Attacks ignore AC bonuses from armor and shields (still affected by DEX and natural armor). Energy field or molecular disruption effect.' },
  { roll: 5,  name: 'Reaping',       effect: 'When you kill a creature, immediately make one additional attack against a different creature within range as a free action. Once per turn.' },
  { roll: 6,  name: 'Living Metal',  effect: 'The weapon repairs itself during short rests. Once per long rest, heals you for 2d10 HP when reduced below half your maximum HP (automatic trigger).' },
  { roll: 7,  name: 'Warp-Touched',  effect: 'Deals force damage instead of normal type (force cannot be resisted by conventional means). However, psykers within 30 feet can sense it.' },
  { roll: 8,  name: 'Thunderous',    effect: 'On a critical hit, all enemies within 10 feet of the target must make a CON save (DC 15) or be stunned until the end of their next turn. Shockwave.' },
  { roll: 9,  name: 'Phasic',        effect: 'Once per short rest, declare an attack phases through cover. Ignores all cover bonuses and can target creatures behind total cover within range.' },
  { roll: 10, name: 'Soul-Drinker',  effect: "When you reduce a creature to 0 HP, store its life force. As a bonus action on a later turn, release stored energy to gain advantage on all attacks until the end of your turn. One charge at a time." },
]

/** Heroic Abilities — roll 1d6 when upgrading to Heroic tier. REPLACES Relic trait. */
export const heroicAbilities: RollableTrait[] = [
  { roll: 1, name: "Emperor's Judgment", effect: 'Once per long rest, declare a Judgment before attacking. If the attack hits, it automatically deals maximum damage on all dice (no rolling). If it misses, the ability is not expended.' },
  { roll: 2, name: 'Annihilation',        effect: "Once per long rest as an action, unleash the weapon's full power. All creatures in a 30 ft cone (ranged) or 15 ft radius (melee) take 8d6 damage of the weapon's type. DEX save (DC 17) for half." },
  { roll: 3, name: 'Undying Fury',        effect: 'While wielding this weapon, when reduced to 0 HP, choose to remain at 1 HP instead. Once per long rest. For 1 minute after triggering, you deal double damage dice with this weapon.' },
  { roll: 4, name: 'Command Aura',        effect: "While wielding this weapon, all allies within 30 feet gain +1 to attack rolls and saving throws. The weapon's legend inspires those who fight alongside its bearer." },
  { roll: 5, name: 'Nemesis',             effect: "Choose this weapon's nemesis enemy type upon receiving it. Against that enemy type, all bonus damage dice are maximized (no rolling) and you have advantage on attacks." },
  { roll: 6, name: 'Reality Splitter',    effect: 'Once per long rest, cut through reality itself. As an action, open a rift to any location you have visited within 1 mile (lasts 1 round, party can step through). Alternatively, use offensively: the attack hits a creature on the ethereal/warp plane simultaneously, dealing weapon damage to both.' },
]

export const TIER_ORDER: ItemTier[] = ['standard', 'master-crafted', 'artificer', 'relic', 'heroic']

// ─── Exports ──────────────────────────────────────────────────────────────────

export const rangedWeapons: Item[] = ([
  laspistol, lasgun, lasCarbine, longLas, hotShotLasgun, hotShotLaspistol, multilaser,
  boltPistol, boltgun, boltCarbine, heavyBolter, stormBolter,
  autopistol, autogun, heavyStubber, assaultCannon,
  stubPistol, stubRevolver, stubAutomatic, handCannon,
  plasmaPistol, plasmaGun, plasmaCannon,
  infernoPistol, meltagun, multiMelta,
  handFlamer, flamer, heavyFlamer,
  pumpShotgun, combatShotgun, ripperGun,
  needlePistol, needleRifle, webPistol, webber, grenadeLauncher, missileLauncher, sniperRifle,
  lascannon, autocannon, mortar,
  huntingRifle, sling, handCrossbow, crossbow, bow, throwingKnife,
  shurikenPistol, shurikenCatapult, splinterPistol, splinterRifle, pulsePistol, pulseRifle, pulseCarbine,
] as Item[]).map(w => ({ ...w, ...(ammoData[w.id] ?? {}) }) as Item)

export const meleeWeapons: Item[] = [
  unarmedStrike, combatKnife, club, quarterstaff, spear, hatchet, mace, greatClub,
  monoKnife, sword, warAxe, warHammer, flail, halberd, glaive, greatsword, maul, whip,
  chainsword, chainaxe, chainGlaive, eviscerator,
  powerSword, powerAxe, powerMaul, powerFist, lightningClaw, thunderHammer,
  forceSword, forceAxe, forceStave,
  shockMaul, neuralWhip, huntingLance, trenchKnife,
  pipeMetalRod, brokenBottle, miningPick, wrenchSpanner, shovelEntrenching, chairStool, torchLit,
]

export const grenadesAndExplosives: Item[] = [
  fragGrenade, krakGrenade, smokeGrenade, stunGrenade, fireBomb, gasGrenade,
  hallucinogenGrenade, empGrenade, meltaBomb,
  demoCharge, shapedCharge, detPackSmall, detPackLarge,
  antiPersonnelMine, antiVehicleMine, shockMine,
  fragMissile, krakMissile, flakkMissile,
]

export const specialAmmunition: Item[] = [
  manStopperRounds, infernoRounds, krakenRounds, dumdumRounds, toxicRounds,
  overchargedPowerPack, sanctifiedAmmo, tracerRounds, frangibleRounds, blessedBoltShells,
]

export const allWeaponryItems: Item[] = [
  ...rangedWeapons,
  ...meleeWeapons,
  ...grenadesAndExplosives,
  ...specialAmmunition,
]
