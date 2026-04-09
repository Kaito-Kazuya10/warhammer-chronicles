import type { Item } from '../../../types/module'

// ─── Body Armor (Light) ───────────────────────────────────────────────────────

const saintsCaul: Item = {
  id: 'saints-caul',
  name: "Saint's Caul",
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'light',
  armorClass: 15,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Miracle of the Undying',
      description: 'You cannot be permanently killed while wearing the Caul. When reduced to 0 HP, make a death save at the start of your next turn — on any result, you immediately return to 1 HP and the first creature that damaged you takes 4d10 radiant damage. This occurs once per combat, then requires a long rest to recharge.',
    },
  ],
  lore: 'A garment cut from the burial cloth of the first recorded Imperial Saint — a woman whose name has been worn away by ten thousand years of veneration but whose sacrifice echoed so loudly that her clothing remembers it. The Ecclesiarchy claims it. It has a habit of appearing elsewhere.',
  description: 'Base: Holy Vestments. AC 15 + DEX. +2 AC (named). LEGENDARY Miracle of the Undying (1/combat): at 0 HP, return to 1 HP on death save; first attacker takes 4d10 radiant.',
  cost: 'Unique',
  weight: 1,
  tags: ['armor', 'named', 'light', 'saint', 'heroic', 'ecclesiarchy'],
}

const aeldariAspectShroud: Item = {
  id: 'aeldari-aspect-shroud',
  name: 'Aspect Shroud of Khaine',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'light',
  armorClass: 15,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Bladewind Avatar',
      description: 'Once per day, the Shroud awakens the Bloody-Handed God\'s aspect within you. For 1 minute: you gain 60 ft movement, your attacks deal +4d6 bonus damage and crit on a 16-20, you cannot be targeted by abilities that require line of sight (you move too fast), and you may make 2 bonus attacks per turn (not as part of the Attack action).',
    },
  ],
  lore: 'The personal armour of an Aeldari Exarch of the Striking Scorpions who transcended their warrior-path and became something else entirely — a mortal avatar of Khaine. When they gifted it to a human ally, the Aeldari believed the human had the capacity to carry it. They were not wrong.',
  description: 'Base: Aspect Armour. AC 15 + DEX. +2 AC (named). LEGENDARY Bladewind Avatar (1/day): 1 minute — 60 ft move, +4d6 damage, crits 16-20, 2 bonus attacks per turn, untargetable by sight-based effects.',
  cost: 'Unique',
  weight: 3,
  tags: ['armor', 'named', 'light', 'eldar', 'khaine', 'heroic'],
}

const veilOfNocturne: Item = {
  id: 'veil-of-nocturne',
  name: 'Veil of Nocturne',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'light',
  armorClass: 14,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Forge-Born Endurance',
      description: 'You gain immunity to fire and extreme heat. When you take any damage, gain 3 temporary HP (passive, always active). Once per day, as a bonus action, erupt in Salamanders forge-fire: for 1 minute, all your attacks deal +3d6 fire damage and any creature that touches or strikes you with a melee attack takes 2d6 fire damage.',
    },
  ],
  lore: 'A robe woven from Nocturnean fire-salamander hide, blessed by the Salamanders Chapter and gifted to a mortal companion who walked through Nocturne\'s volcanic fields without hesitation. The hide is thousands of years old. It has never been damaged by flame.',
  description: 'Base: Heavy Robe. AC 14 + DEX. +2 AC (named). LEGENDARY Forge-Born Endurance: immune to fire; +3 temp HP per damage taken (passive); 1/day 1 min all attacks +3d6 fire, melee attackers take 2d6 fire.',
  cost: 'Unique',
  weight: 4,
  tags: ['armor', 'named', 'light', 'salamanders', 'fire', 'heroic'],
}

// ─── Body Armor (Medium) ──────────────────────────────────────────────────────

const emperorsGuardPlate: Item = {
  id: 'emperors-guard-plate',
  name: "Emperor's Guard Plate",
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 18,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Shield of the Undying',
      description: 'Once per day, for 1 minute, become an avatar of the Emperor\'s protection. During this time: all allies within 30 ft gain +5 AC and cannot be reduced below 1 HP. You are immune to all damage. All enemies within 30 ft must make a WIS save DC 20 or drop their weapons in terror (reroll each round).',
    },
  ],
  lore: 'Armour worn by the last of the Seneschal Guard who defended the Emperor\'s throne room during the Siege of Terra. He held the door for six hours, alone, while the Emperor was carried to the Golden Throne. When the doors were finally opened, he was still standing. The armour had kept him alive through what should have been impossible.',
  description: 'Base: Elite Carapace. AC 18 + DEX (max 2). +2 AC (named). LEGENDARY Shield of the Undying (1/day): 1 minute — immune to damage; allies within 30 ft +5 AC and can\'t die; enemies WIS DC 20 or disarmed in terror.',
  cost: 'Unique',
  weight: 24,
  tags: ['armor', 'named', 'medium', 'terra', 'heroic', 'seneschal'],
}

const warMantleOfLorgar: Item = {
  id: 'war-mantle-of-absolution',
  name: 'Mantle of Absolution',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 17,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Word of Absolution',
      description: 'Once per day, speak the Word of Absolution in High Gothic. All enemies within 60 ft that hear it must make a CHA save DC 20 or be struck with divine guilt: they immediately drop to their knees, cannot attack, and must confess their sins (actual speech) for 1 minute. Chaos-marked entities take 8d6 radiant damage instead.',
    },
  ],
  lore: 'The ceremonial battle-mantle of the last loyal Chaplain of the Word Bearers before the Heresy. He refused the call of Chaos and fought his own Legion for thirty years. The mantle was recovered after his death and blessed by the Ecclesiarchy as a symbol of faith in the darkness.',
  description: 'Base: Chaplain\'s Armour. AC 17 + DEX (max 2). +2 AC (named). LEGENDARY Word of Absolution (1/day): all enemies 60 ft CHA DC 20 or kneel and confess 1 min; chaos-marked take 8d6 radiant.',
  cost: 'Unique',
  weight: 21,
  tags: ['armor', 'named', 'medium', 'chaplain', 'heroic', 'word-bearers'],
}

const ironHeartOfMars: Item = {
  id: 'iron-heart-of-mars',
  name: 'Iron Heart of Mars',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 18,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Apotheosis of the Machine',
      description: 'Once per day, for 1 minute, undergo machine apotheosis. You become a construct: immune to all biological effects (poison, disease, charm, fear, sleep), gain STR and CON of 24, move at double speed, and your unarmed attacks deal 3d8 bludgeoning. Additionally, you can interface with and override any machine within 60 ft without a roll.',
    },
  ],
  lore: 'The pinnacle of Martian armour craft — a full-body exoskeletal harness fused with a Magos Dominus\' neural interface. The Omnissiah\'s machine-dream flows through it. Wearing it, the boundary between flesh and machine becomes a philosophical question rather than a physical one.',
  description: 'Base: Magos Exoskeleton. AC 18 + DEX (max 2). +2 AC (named). LEGENDARY Apotheosis of the Machine (1/day): 1 minute — become construct, STR/CON 24, double speed, unarmed 3d8, override any machine 60 ft.',
  cost: 'Unique',
  weight: 35,
  tags: ['armor', 'named', 'medium', 'mechanicus', 'heroic', 'mars'],
}

// ─── Body Armor (Heavy) ───────────────────────────────────────────────────────

const throneGuardPlate: Item = {
  id: 'throne-guard-plate',
  name: 'Throne Guard Plate',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 21,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Eternal Vigil',
      description: 'You cannot be killed, only incapacitated. If reduced to 0 HP, instead drop to 1 HP and become immune to all damage for 1 round. You may not benefit from healing while in Eternal Vigil — you simply endure. Once per day, activate full Vigil: for 10 minutes, you are immune to all damage, all conditions, and cannot be moved. You cannot attack during full Vigil.',
    },
  ],
  lore: 'Armour worn by a Custodian Guard for twelve hundred years before it was gifted to a mortal champion who had saved the Custodian\'s life. The Custodian spent three years modifying it for human use. The result is the most protective suit of non-powered armour ever created for a mortal.',
  description: 'Base: Auramite Carapace. AC 21. +2 AC (named). LEGENDARY Eternal Vigil: cannot be killed (drop to 1 HP, immune 1 round). 1/day full Vigil 10 min — immune to all damage, conditions, and movement.',
  cost: 'Unique',
  weight: 80,
  tags: ['armor', 'named', 'heavy', 'custodians', 'heroic', 'auramite'],
}

const godforgedPlate: Item = {
  id: 'godforged-plate',
  name: 'Godforged Plate',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 20,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: The Emperor\'s Own Blessing',
      description: 'Once per day, the Golden Light of the Emperor manifests through the plate. For 1 minute: you gain a +10 bonus to AC (total AC 32+), all attacks you make automatically hit, and you radiate 30 ft of blinding golden light. All enemies in the light must make a CON save DC 20 each round or be blinded. Allies in the light are immune to fear and heal 2d8 per round.',
    },
  ],
  lore: 'Armour forged in the fires of Terra by the Emperor Himself during the Unification Wars. It was designed for His greatest mortal champion. That champion has died and been reborn twelve times across ten thousand years. Each time, the armour waits.',
  description: 'Base: Emperor-Forged Plate. AC 20. +2 AC (named). LEGENDARY The Emperor\'s Own Blessing (1/day): 1 minute — +10 AC, attacks auto-hit, 30 ft golden light (CON DC 20 or blind; allies immune to fear + 2d8 heal/round).',
  cost: 'Unique',
  weight: 90,
  tags: ['armor', 'named', 'heavy', 'heroic', 'emperor', 'unification-wars'],
}

// ─── Shields ──────────────────────────────────────────────────────────────────

const aegisOfTheImperium: Item = {
  id: 'aegis-of-the-imperium',
  name: 'Aegis of the Imperium',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 5,
  itemAbilities: [
    {
      name: 'LEGENDARY: Imperium Stands',
      description: 'Once per day, drive the Aegis into the ground. A 40 ft radius golden dome forms around your position, lasting 1 minute. Enemies cannot enter the dome (stopped at the edge, no save). Any attack from outside the dome that targets something inside must beat AC 30 to strike anyone within it. All within the dome heal 3d6 per round.',
    },
  ],
  lore: 'The grandest shield ever crafted by mortal hands — built to specifications dictated by the Emperor Himself for the Siege of Terra, and lost when the champion who carried it was swallowed by a rift. It resurfaced ten thousand years later in the hands of a child soldier. The rift remembers.',
  description: 'Shield. +5 AC (named). LEGENDARY Imperium Stands (1/day): 40 ft dome 1 minute — enemies cannot enter; all attacks from outside must beat AC 30; allies inside heal 3d6/round.',
  cost: 'Unique',
  weight: 20,
  tags: ['shield', 'named', 'heroic', 'terra', 'emperor'],
}

const sistersSanctuaryShield: Item = {
  id: 'sisters-sanctuary-shield',
  name: 'Sisters\' Sanctuary Shield',
  type: 'armor',
  tier: 'heroic',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 4,
  itemAbilities: [
    {
      name: 'LEGENDARY: Sanctuary of Faith',
      description: 'Once per day, invoke the Sanctuary. For 10 minutes, a sacred aura extends 30 ft from the shield. Daemons cannot enter the aura and are banished (WIS DC 20) if already inside. No creature inside can die — when reduced to 0 HP, they are instead knocked unconscious and stable. Enemies outside take double damage from attacks originating within the sanctuary.',
    },
  ],
  lore: 'Carried by the last Canoness of the Order of the Valorous Heart through the Fall of Cadia. She raised it against the sky as Cadia broke. The planet fell. The Sanctuary around her survived intact. Three hundred soldiers walked out of the rubble behind her shield.',
  description: 'Shield. +4 AC (named). LEGENDARY Sanctuary of Faith (1/day): 30 ft aura 10 min — daemons banished DC 20; no one inside dies; enemies outside take double damage.',
  cost: 'Unique',
  weight: 12,
  tags: ['shield', 'named', 'heroic', 'sororitas', 'cadia'],
}

// ─── Helmets ──────────────────────────────────────────────────────────────────

const crownOfTheImperator: Item = {
  id: 'crown-of-the-imperator',
  name: 'Crown of the Imperator',
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Will of the Emperor',
      description: 'Once per day, invoke the Emperor\'s will. All allies on the battlefield (no range limit) immediately act as if inspired: they gain advantage on all rolls, are immune to fear and mind control, and deal an additional 2d6 radiant on all attacks for 1 minute. All enemies on the battlefield (no range limit) must make a WIS save DC 22 or be Frightened for 1 minute.',
    },
  ],
  lore: 'The war helm of a Lord Solar who claimed to have received the Crown directly from a golden vision. Whether this was the Emperor\'s psychic projection, a dying psyker\'s hallucination, or something else is a matter the Inquisition has decided not to investigate too thoroughly.',
  description: 'Helm. +2 AC (named). LEGENDARY Will of the Emperor (1/day): all allies everywhere — advantage on all rolls, immune to fear/control, +2d6 radiant 1 min; all enemies everywhere WIS DC 22 or Frightened.',
  cost: 'Unique',
  weight: 4,
  tags: ['helmet', 'named', 'heroic', 'lord-solar', 'emperor'],
}

const masqueOfFinalJudgement: Item = {
  id: 'masque-of-final-judgement',
  name: 'Masque of Final Judgement',
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: The Verdict',
      description: 'Once per day, fix the Masque\'s gaze upon one target you can see. They must make a WIS save DC 22. On a failure, they are judged: they cannot take aggressive actions toward you or your allies for 1 hour; if they attempt to, they take 6d10 psychic damage and the compulsion resets. On a success, they take 4d10 psychic damage and are stunned for 1 round.',
    },
  ],
  lore: 'The ceremonial masque of an Inquisitor-Lord who judged two hundred worlds over four centuries. It was buried with him. It was not buried long. The masque carries the weight of ten thousand verdicts. Some of those judged are still alive. They feel it every day.',
  description: 'Helm. +2 AC (named). LEGENDARY The Verdict (1/day): WIS DC 22 — fail: cannot aggress for 1 hour (violation = 6d10 psychic); success: 4d10 psychic + stunned 1 round.',
  cost: 'Unique',
  weight: 2,
  tags: ['helmet', 'named', 'heroic', 'inquisition', 'judge'],
}

// ─── Cloaks ───────────────────────────────────────────────────────────────────

const cloakOfTheEternalCrusade: Item = {
  id: 'cloak-of-the-eternal-crusade',
  name: 'Cloak of the Eternal Crusade',
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'cloak-backpack',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Crusade Without End',
      description: 'Once per day, plant the banner and speak the Crusade vow. All allies within 100 ft are immediately healed to full HP, cured of all conditions, and gain +4 to all attack rolls, saving throws, and skill checks for 1 minute. No ally within this aura can die for the duration — when reduced to 0 HP they are instead at 1 HP with 10 temporary HP.',
    },
  ],
  lore: 'The personal cloak of Lord Militant Macharius, who launched the greatest crusade since the Great Crusade itself and never stopped moving. The cloak has been on every inhabited world in 100 sectors. It carries the faith of billions of soldiers who believed in what it represented.',
  description: 'Cloak. +2 AC (named). LEGENDARY Crusade Without End (1/day): all allies 100 ft — full heal, cure all conditions, +4 to all rolls 1 min; cannot die during effect (0 HP → 1 HP + 10 temp HP).',
  cost: 'Unique',
  weight: 3,
  tags: ['cloak', 'named', 'heroic', 'macharius', 'crusade'],
}

// ─── Accessories ─────────────────────────────────────────────────────────────

const emperorsSeal: Item = {
  id: 'emperors-seal',
  name: "Emperor's Seal",
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Authority of the Throne',
      description: 'The Seal is the Emperor\'s absolute authority made manifest. Once per day, hold it aloft. Any creature that can see it must make a CHA save DC 25 or immediately and completely submit — they will follow any order you give for 24 hours, including against their own interests, except self-destruction. Chaos daemons instead take 10d10 radiant damage (no save) and are banished.',
    },
  ],
  lore: 'The actual seal of the Emperor of Mankind, used during the Unification Wars to bind planetary governors to His will. It was lost during the Horus Heresy. Its reappearance has been declared impossible by twelve separate Inquisitors. It keeps appearing anyway.',
  description: 'Accessory. +2 AC (named). LEGENDARY Authority of the Throne (1/day): CHA DC 25 or submit and follow orders 24 hours; chaos daemons take 10d10 radiant (no save) and are banished.',
  cost: 'Unique',
  weight: 0,
  tags: ['accessory', 'named', 'heroic', 'emperor', 'seal'],
}

const omnissiahsHeartstone: Item = {
  id: 'omnissiahs-heartstone',
  name: "Omnissiah's Heartstone",
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: God of Machines',
      description: 'Once per day, for 1 minute, become the God of Machines. You have absolute control of all technology within 300 ft — you may activate, deactivate, aim, and fire any weapon system, open or close any door, override any defence, or shut down any engine without any roll. All mechanical constructs (servitors, robots, dreadnoughts) within 300 ft will also follow your commands.',
    },
  ],
  lore: 'A fragment of the original Omnissiah\'s own core, preserved since the Machine God\'s first manifestation on Mars. The Mechanicus does not speak of this openly. They worship it behind sealed doors. They will do anything to keep it on Mars. It keeps leaving.',
  description: 'Accessory. +2 AC (named). LEGENDARY God of Machines (1/day): 1 minute — absolute control of all technology within 300 ft; mechanical constructs obey commands.',
  cost: 'Unique',
  weight: 1,
  tags: ['accessory', 'named', 'heroic', 'mechanicus', 'omnissiah'],
}

const vortexStone: Item = {
  id: 'vortex-stone',
  name: 'Vortex Stone',
  type: 'gear',
  tier: 'heroic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 2,
  itemAbilities: [
    {
      name: 'LEGENDARY: Void Rip',
      description: 'Once per day, hurl the Vortex Stone at a point within 30 ft. A 10 ft radius vortex appears. Everything in the vortex is instantly obliterated — no save, no death save, no resurrection possible. The vortex lasts 1d4 rounds, moving 10 ft in a random direction each round. The stone returns to your hand when the vortex closes.',
    },
  ],
  lore: 'One of three Vortex Stones created during the War in Heaven by a now-dead Aeldari weapon-smith whose name cannot be spoken. The stones annihilate everything they touch. The other two were used to end the War in Heaven. This one survived as a warning. Or a temptation.',
  description: 'Accessory. +2 AC (named). LEGENDARY Void Rip (1/day): 10 ft radius vortex at target point, instant obliteration no save; lasts 1d4 rounds drifting randomly.',
  cost: 'Unique',
  weight: 1,
  tags: ['accessory', 'named', 'heroic', 'eldar', 'war-in-heaven', 'vortex'],
}

export const namedArmorHeroic: Item[] = [
  saintsCaul,
  aeldariAspectShroud,
  veilOfNocturne,
  emperorsGuardPlate,
  warMantleOfLorgar,
  ironHeartOfMars,
  throneGuardPlate,
  godforgedPlate,
  aegisOfTheImperium,
  sistersSanctuaryShield,
  crownOfTheImperator,
  masqueOfFinalJudgement,
  cloakOfTheEternalCrusade,
  emperorsSeal,
  omnissiahsHeartstone,
  vortexStone,
]
