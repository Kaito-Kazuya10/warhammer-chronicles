import type { Item } from '../../../types/module'

// ─── Body Armor (Light) ───────────────────────────────────────────────────────

const phantomSkin: Item = {
  id: 'phantom-skin',
  name: 'Phantom Skin',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'light',
  armorClass: 13,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Phase Shimmer',
      description: 'Once per rest, as a bonus action, activate the phase-shift weave. For 1 minute, the first melee attack that hits you each round passes through without dealing damage.',
    },
  ],
  lore: 'A bodyglove incorporating salvaged Callidus Temple phase-weave technology. The polymer responds to kinetic trauma by briefly de-phasing the affected section, allowing attacks to pass harmlessly. The effect is partial and unreliable. It has still saved more lives than most full plate armour.',
  description: 'Base: Bodyglove. AC 13 + DEX. +1 AC (named). Phase Shimmer (1/rest): 1 minute — first melee hit each round deals no damage.',
  cost: 'Very Rare',
  weight: 3,
  tags: ['armor', 'named', 'light', 'callidus', 'phase'],
}

const deathworldSkin: Item = {
  id: 'deathworld-skin',
  name: 'Deathworld Skin',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'light',
  armorClass: 14,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Apex Predator',
      description: 'While below half HP, gain +2 to all attack rolls and +2 AC as survival instincts kick in. Additionally, you cannot be reduced below 1 HP more than once per combat (second lethal hit brings you to 1 HP instead of 0).',
    },
  ],
  lore: 'Constructed from the cured hides of seventeen different Catachan Death World predators by a regiment armourer who considered it a career achievement. Each hide contributes its natural properties — acid resistance from the cave serpent, impact resistance from the Catachan ape.',
  description: 'Base: Layered Hides/Scout. AC 14 + DEX. +1 AC (named). Apex Predator: below half HP → +2 attack and +2 AC; once per combat, survive a lethal hit at 1 HP.',
  cost: 'Very Rare',
  weight: 6,
  tags: ['armor', 'named', 'light', 'catachan', 'deathworld'],
}

const voidSerpentSuit: Item = {
  id: 'void-serpent-suit',
  name: 'Void Serpent Suit',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'light',
  armorClass: 13,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Null Presence',
      description: 'While wearing this suit, your presence is psychically dampened. Psykers cannot sense you through the warp. Psychic detection abilities and warp-guided projectiles cannot target you. Additionally, once per rest, you may become completely invisible to electronic sensors for 10 minutes.',
    },
  ],
  lore: 'A full void-suit built by a Rogue Trader\'s artificer from materials recovered from a destroyed Dark Eldar raid. The outer layer is a xenos polymer that absorbs psychic resonance. The Imperial aquila on the chest is a compromise between the artificer\'s xenophilia and everyone else\'s survival.',
  description: 'Base: Void Suit. AC 13 + DEX. +1 AC (named). Null Presence: invisible to psyker detection and warp-guided targeting; 1/rest invisible to sensors 10 min.',
  cost: 'Very Rare',
  weight: 5,
  tags: ['armor', 'named', 'light', 'void', 'xenos-derived'],
}

const wardenOfTheFaithCoat: Item = {
  id: 'warden-of-the-faith',
  name: 'Warden of the Faith',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'light',
  armorClass: 12,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Zealous Ward',
      description: 'While you are conscious, all allied creatures within 10 ft of you gain +1 AC and advantage on saves vs fear and psychic effects. This aura is always active. Additionally, once per rest you may take the damage from an attack targeting an adjacent ally instead of them.',
    },
  ],
  lore: 'A Ministorum Warden\'s coat reinforced with prayer-inscribed ablative panels. The coat has been blessed by three separate Cardinals. It glows faintly when the wearer speaks the words of the Litany of Faith. The glow is not always visible, but it is always felt.',
  description: 'Base: Warden\'s Coat. AC 12 + DEX. +1 AC (named). Zealous Ward: allies within 10 ft +1 AC and fear/psychic save advantage. 1/rest: intercept an attack targeting an adjacent ally.',
  cost: 'Very Rare',
  weight: 5,
  tags: ['armor', 'named', 'light', 'ministorum', 'warden'],
}

// ─── Body Armor (Medium) ──────────────────────────────────────────────────────

const stormtrooperElite: Item = {
  id: 'stormtrooper-elite-carapace',
  name: 'Storm Trooper\'s Elite Carapace',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'medium',
  armorClass: 16,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Rapid Assault Protocol',
      description: 'Once per combat, when you move at least 20 ft toward an enemy before attacking, your first attack is automatically a critical hit and deals an additional 2d6 damage from the impact momentum.',
    },
  ],
  lore: 'Hot-shot patterns and advanced ablative composites built for Militarum Tempestus elite insertion operations. The harness locks down for rapid descent, maintains integrity through hostile atmosphere entry, and has reinforced impact plates at the shoulders for breaching.',
  description: 'Base: Carapace Armour. AC 16 + DEX (max 2). +1 AC (named). Rapid Assault Protocol (1/combat): charge 20+ ft → first attack auto-crits + 2d6 bonus.',
  cost: 'Very Rare',
  weight: 22,
  tags: ['armor', 'named', 'medium', 'stormtrooper', 'tempestus'],
}

const sororitas_vestments: Item = {
  id: 'sororitas-battle-vestments',
  name: 'Sororitas Battle Vestments',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'medium',
  armorClass: 15,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Acts of Faith',
      description: 'Once per rest, call upon the Emperor\'s grace in a moment of desperate need. You may reroll any one roll you just made (attack, save, or skill check), taking the higher result. If the rerolled result is a natural 20, you also recover 2d6 HP.',
    },
  ],
  lore: 'The personal battle vestments of a Sister of Battle, blessed through years of faithful service. The ceramite plates are inscribed with the names of all the battles the wearer survived. The blessing is not metaphorical: warp-sensitive individuals can detect a faint warmth from the armour.',
  description: 'Base: Battle Sister Armour. AC 15 + DEX (max 2). +1 AC (named). Acts of Faith (1/rest): reroll any die, take higher; nat 20 on reroll also heals 2d6.',
  cost: 'Very Rare',
  weight: 20,
  tags: ['armor', 'named', 'medium', 'sororitas', 'faith'],
}

const shadowOperativeHarness: Item = {
  id: 'shadow-operative-harness',
  name: 'Shadow Operative\'s Harness',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'medium',
  armorClass: 15,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Ghost Protocol',
      description: 'Once per rest, activate Ghost Protocol. For 1 minute, you leave no tracks, make no sound, and your presence does not register on any detection system. You may pass through crowds without being noticed (automatic, no roll). Ends early if you attack.',
    },
  ],
  lore: 'Constructed for Officio Assassinorum support operatives — those who work alongside the temple assassins but are not themselves temple-trained. The harness combines Callidus photoreactive weave with Vindicare-grade acoustic dampeners.',
  description: 'Base: Carapace Harness. AC 15 + DEX (max 2). +1 AC (named). Ghost Protocol (1/rest): 1 minute — no tracks, silent, undetectable by sensors, invisible in crowds.',
  cost: 'Very Rare',
  weight: 19,
  tags: ['armor', 'named', 'medium', 'assassinorum', 'stealth'],
}

const mechanicusWarMantle: Item = {
  id: 'mechanicus-war-mantle',
  name: 'Mechanicus War Mantle',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'medium',
  armorClass: 16,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Mechadendrite Interface',
      description: 'The mantle contains 2 integrated mechadendrite sockets. Each socket can house a mechadendrite tool or weapon. As a bonus action, you may activate or retract all mechadendritic attachments. You may use mechadendritic tools without occupying your hands.',
    },
  ],
  lore: 'A Magos-grade combat mantle with integrated mechadendrite spine-sockets and internal cogitator nodes. The ablative ceramic coating is applied over blessed alloy using a process known only to Forge World Ryza. The result is armour that is both devotion and function.',
  description: 'Base: Magos Armour/Carapace. AC 16 + DEX (max 2). +1 AC (named). Mechadendrite Interface: 2 mechadendrite sockets; retract/extend as bonus action.',
  cost: 'Very Rare',
  weight: 25,
  tags: ['armor', 'named', 'medium', 'mechanicus', 'mechadendrite'],
}

// ─── Body Armor (Heavy) ───────────────────────────────────────────────────────

const terminatorLightPlate: Item = {
  id: 'terminator-light-plate',
  name: 'Terminator-Grade Field Plate',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 18,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Unstoppable',
      description: 'Once per rest, when you would be reduced to 0 HP by an attack, you instead remain at 1 HP and gain 10 temporary HP. The attacker is also knocked back 10 ft from the force of impact on the armour.',
    },
  ],
  lore: 'A suit of full carapace plate with integrated void-suit capability, built to Terminator specifications for a mortal champion who fought alongside the Ultramarines. It is not Terminator armour — no mortal could wear that — but it comes as close as ablative ceramite can get.',
  description: 'Base: Full Carapace. AC 18. +1 AC (named). Unstoppable (1/rest): when reduced to 0 HP, stay at 1 HP with 10 temp HP; attacker knocked back 10 ft.',
  cost: 'Very Rare',
  weight: 65,
  tags: ['armor', 'named', 'heavy', 'carapace', 'ultramarines'],
}

const engineerSiegePlate: Item = {
  id: 'engineer-siege-plate',
  name: 'Siege Engineer\'s Plate',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 17,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Blast Dispersal',
      description: 'Resistance to blast and fire damage. Additionally, when an explosion occurs within 30 ft, you may use your reaction to shield nearby allies — all allies within 10 ft of you take half damage from the explosion (you take full).',
    },
  ],
  lore: 'Built for Krieg Assault Engineers who advance under fire into prepared defensive positions. Extra blast baffles at the torso, reinforced visor, and a built-in rebreather for demolitions work in toxic environments. The armourer was very proud. The Engineer survived.',
  description: 'Base: Siege Carapace. AC 17. +1 AC (named). Blast Dispersal: resistance to blast/fire; reaction to halve explosion damage for allies within 10 ft (you take full).',
  cost: 'Very Rare',
  weight: 60,
  tags: ['armor', 'named', 'heavy', 'krieg', 'engineer'],
}

const ironFathersMantle: Item = {
  id: 'iron-fathers-mantle',
  name: 'Iron Father\'s Mantle',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 17,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Machine Body',
      description: 'Once per rest, as a bonus action, temporarily overclock the suit\'s servo-assists. For 1 minute, your Strength is treated as 22, you may move through difficult terrain without penalty, and you count as one size larger for carrying capacity and grapple checks.',
    },
  ],
  lore: 'Armour built to emulate the Iron Fathers\' vision of perfect iron — flesh replaced, weakness eliminated, purpose absolute. An Iron Hands Techmarine assembled it for a mortal Magos who earned Chapter respect through decades of battlefield service alongside them.',
  description: 'Base: Heavy Carapace. AC 17. +1 AC (named). Machine Body (1/rest): 1 minute — STR treated as 22, ignore difficult terrain, count as one size larger.',
  cost: 'Very Rare',
  weight: 62,
  tags: ['armor', 'named', 'heavy', 'iron-hands', 'mechanicus'],
}

// ─── Shields ──────────────────────────────────────────────────────────────────

const custodiansBulwark: Item = {
  id: 'custodians-bulwark',
  name: 'Custodian\'s Bulwark',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 3,
  itemAbilities: [
    {
      name: 'Aegis of the Throne',
      description: 'While holding this shield, any ally within 5 ft gains +2 AC against ranged attacks. Once per rest, as a reaction to an ally within 5 ft being hit, you may interpose the shield: the ally takes no damage and you take the full hit instead.',
    },
  ],
  lore: 'A shield from the Custodian Guard\'s armoury, gifted to a mortal champion who saved the life of a Custodian at the cost of their own safety. The Custodians do not forget such debts. The shield has been inscribed with the champion\'s deeds in Custodian script.',
  description: 'Shield. +3 AC (named). Aegis of the Throne: allies within 5 ft +2 AC vs ranged; 1/rest intercept a hit targeting an adjacent ally (you take it instead).',
  cost: 'Very Rare',
  weight: 10,
  tags: ['shield', 'named', 'custodians', 'terra'],
}

const stormShieldProt: Item = {
  id: 'storm-shield-prot',
  name: 'Storm Shield',
  type: 'armor',
  tier: 'artificer',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 4,
  itemAbilities: [
    {
      name: 'Storm Wall',
      description: 'While holding Storm Shield, you have resistance to energy (lightning/plasma/las) damage. Once per rest, you may activate the storm field: for 1 minute, any melee attacker who hits you takes 1d6 lightning damage.',
    },
  ],
  lore: 'A storm shield recovered from a fallen Space Wolf Terminator by an Inquisitorial team. The Inquisitor had it re-fitted for human use — shrunk, re-strapped, the Fenrisian runes retained. The machine spirit adapted. It always does.',
  description: 'Shield. +4 AC (named). Storm Wall: resistance to energy damage; 1/rest — storm field 1 min, melee attackers take 1d6 lightning on hit.',
  cost: 'Very Rare',
  weight: 12,
  tags: ['shield', 'named', 'space-wolves', 'storm'],
}

// ─── Helmets ──────────────────────────────────────────────────────────────────

const eyeOfJudgement: Item = {
  id: 'eye-of-judgement',
  name: 'Eye of Judgement',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Truth Sight',
      description: 'Once per rest, activate Truth Sight for 1 minute. While active, you can see through illusions (automatically disbelieve all illusions), detect invisible creatures within 30 ft, and see the alignment of anyone within 10 ft (glowing red for chaos-touched, golden for faithful).',
    },
  ],
  lore: 'An Inquisitorial helm mounted with a relic psy-scanner developed by the Ordo Malleus for daemon detection. In the hands of a Puritan Inquisitor, it became an instrument of ruthless efficiency: the guilty glow and the innocent are spared.',
  description: 'Helm. +1 AC (named). Truth Sight (1/rest): 1 minute — see through illusions, detect invisible within 30 ft, see alignment aura within 10 ft.',
  cost: 'Very Rare',
  weight: 3,
  tags: ['helmet', 'named', 'inquisition', 'psy-scanner'],
}

const navigatorsEye: Item = {
  id: 'navigators-third-eye-helm',
  name: 'Navigator\'s Third Eye Helm',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Warp Sight',
      description: 'Once per rest, open the Third Eye. All creatures within 30 ft must make a WIS save DC 14 or be Stunned for 1 round. The wielder is immune to this effect. Additionally, while the helm is worn, you can perceive warp disturbances within 60 ft and predict ambushes (cannot be surprised).',
    },
  ],
  lore: 'A Navigator House helmet fitted with an artificial Third Eye — a crystal lens that amplifies and projects the Navigator\'s Lidless Stare. The original Navigator wore it during the Gothic War. She passed it to the ally who pulled her from a burning bridge.',
  description: 'Helm. +1 AC (named). Warp Sight (1/rest): WIS DC 14 vs all within 30 ft or Stunned. Cannot be surprised. Detect warp disturbances 60 ft.',
  cost: 'Very Rare',
  weight: 3,
  tags: ['helmet', 'named', 'navigator', 'warp'],
}

const deathMaskOfThePenitent: Item = {
  id: 'death-mask-penitent',
  name: 'Death Mask of the Penitent',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Gaze of the Damned',
      description: 'Once per rest, the skull-mask\'s lenses glow red and you broadcast a recorded litany of the condemned. All enemies within 20 ft must make a WIS save (DC 15) or be Frightened of you for 1 minute. Undead and daemons have disadvantage on this save.',
    },
  ],
  lore: 'A porcelain death mask crafted for a Repentia penitent who survived her sentence and was granted the mask as a symbol of her absolution. The recorded litanies of condemned heretics are embedded in the mask\'s vox unit. Their voices serve a new purpose.',
  description: 'Helm. +1 AC (named). Gaze of the Damned (1/rest): WIS DC 15 vs enemies within 20 ft or Frightened 1 minute; undead/daemons have disadvantage.',
  cost: 'Very Rare',
  weight: 2,
  tags: ['helmet', 'named', 'sororitas', 'repentia'],
}

// ─── Cloaks ───────────────────────────────────────────────────────────────────

const photoreactiveMantle: Item = {
  id: 'photoreactive-mantle',
  name: 'Photoreactive Mantle',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'cloak-backpack',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Chameleon Field',
      description: 'Once per rest, activate the chameleon field. For 10 minutes, you are invisible while moving slowly (half speed) or standing still. The field drops if you attack or take damage, and reactivates at the start of your next turn (does not consume additional uses).',
    },
  ],
  lore: 'A Callidus Temple photoreactive cloak, declassified and issued to Inquisitorial assets deemed reliable enough to carry xenos-grade technology. The polymer is technically a live organism — it feeds on ambient light and produces invisibility as a by-product.',
  description: 'Cloak. +1 AC (named). Chameleon Field (1/rest): 10 minutes — invisible at half speed or stationary; drops on attack/damage, reactivates next turn.',
  cost: 'Very Rare',
  weight: 2,
  tags: ['cloak', 'named', 'callidus', 'stealth', 'chameleon'],
}

const wardensCrimsonCape: Item = {
  id: 'wardens-crimson-cape',
  name: 'Warden\'s Crimson Cape',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'cloak-backpack',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Draw Their Attention',
      description: 'Once per rest, sweep the cape dramatically. All enemies within 30 ft must make a WIS save DC 14 or focus their attention on you until the start of their next turn. Affected enemies must target you with their next attack if within range and line of sight. Allies gain advantage on their attacks during this window.',
    },
  ],
  lore: 'The personal cape of an Imperial Commander who survived the Macharian Heresy by being the most visible target on every battlefield. His theory: if they\'re all shooting at you, they\'re not shooting your soldiers. His survival record suggests the theory was partially correct.',
  description: 'Cloak. +1 AC (named). Draw Their Attention (1/rest): WIS DC 14 vs enemies within 30 ft — forced to target you next round; allies gain advantage during this time.',
  cost: 'Very Rare',
  weight: 2,
  tags: ['cloak', 'named', 'commander', 'taunt'],
}

// ─── Accessories ─────────────────────────────────────────────────────────────

const sanctionedPsykerBand: Item = {
  id: 'sanctioned-psyker-band',
  name: 'Sanctioned Psyker\'s Focus Band',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Psychic Surge',
      description: 'Once per rest, surge psychic power through the focus band. Your next psychic ability is cast at maximum effect (treat all dice as max values) and its DC is increased by 3. However, after the surge, you must succeed on a WIS save DC 12 or gain 1 Perils of the Warp level.',
    },
  ],
  lore: 'A focus-crystal headband forged in the Black Ships for Sanctioned Psykers of exceptional power. The crystal amplifies psy-channelling but also opens the user more fully to the warp\'s current. The Scholastica Psykana considers this acceptable risk.',
  description: 'Accessory. +1 AC (named). Psychic Surge (1/rest): next psychic ability maximised and DC +3; WIS DC 12 or gain 1 Perils level.',
  cost: 'Very Rare',
  weight: 0,
  tags: ['accessory', 'named', 'psyker', 'focus'],
}

const solaritesEmbrace: Item = {
  id: 'solarites-embrace',
  name: 'Solarite\'s Embrace',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Purifying Fire',
      description: 'When you take fire damage, you heal 1d6 HP instead (fire damage converts to healing). Additionally, once per rest, you may channel stored fire energy outward: all enemies within 10 ft take 3d6 fire damage (DEX save DC 15 for half).',
    },
  ],
  lore: 'A gilded gorget forged for the Daughters of the Emperor — an Adepta Sororitas sect who walk through fire as an act of faith. The blessed gold channels incoming fire into the wearer\'s own faith-warmth. It has never been tested on involuntary contact with flame.',
  description: 'Accessory. +1 AC (named). Purifying Fire: fire damage heals 1d6 instead. 1/rest: expel stored fire — 3d6 fire in 10 ft (DEX DC 15 half).',
  cost: 'Very Rare',
  weight: 1,
  tags: ['accessory', 'named', 'sororitas', 'fire'],
}

const omegaLevel_psy_collar: Item = {
  id: 'omega-psy-collar',
  name: 'Omega-Level Psy Collar',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Psychic Nullification',
      description: 'Any psychic ability targeting you automatically fails with no roll (passive). Additionally, once per rest, you may extend this nullification to a 10 ft aura for 1 minute, preventing all psychic abilities from being used within the aura. You cannot use your own psychic abilities while the aura is active.',
    },
  ],
  lore: 'A null-grade suppression collar originally designed to bind Omega-level psykers for transport. Modified for voluntary wear by a Pariah-grade Inquisitor who had no psychic ability to suppress and found the collar\'s passive effects extremely useful when operating near hostile psykers.',
  description: 'Accessory. +1 AC (named). Psychic Nullification: all psychic abilities targeting you auto-fail. 1/rest: 10 ft aura 1 min — no psychic abilities within aura.',
  cost: 'Very Rare',
  weight: 1,
  tags: ['accessory', 'named', 'null', 'anti-psychic'],
}

const chronometer_augmetic: Item = {
  id: 'tactical-augmetic-arm',
  name: 'Tactical Augmetic Arm',
  type: 'gear',
  tier: 'artificer',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Multi-Spectral Analysis',
      description: 'The arm\'s integrated sensors allow real-time battlefield analysis. You may use a bonus action to analyse an enemy you can see: learn their HP, resistances, immunities, and any active abilities. Once per rest, the analysis grants you advantage on all rolls against that specific target for 1 minute.',
    },
  ],
  lore: 'A Mechanicus-grade tactical augmetic developed for Ordos intelligence operatives. The arm houses three auspex sensors, a targeting cogitator, and a micro-melta in the index finger for particularly intimate interrogations. The last is a standard feature.',
  description: 'Accessory. +1 AC (named). Multi-Spectral Analysis (bonus action): learn target\'s HP, resistances, immunities; 1/rest advantage vs analysed target 1 min.',
  cost: 'Very Rare',
  weight: 4,
  tags: ['accessory', 'named', 'augmetic', 'mechanicus'],
}

export const namedArmorArtificer: Item[] = [
  phantomSkin,
  deathworldSkin,
  voidSerpentSuit,
  wardenOfTheFaithCoat,
  stormtrooperElite,
  sororitas_vestments,
  shadowOperativeHarness,
  mechanicusWarMantle,
  terminatorLightPlate,
  engineerSiegePlate,
  ironFathersMantle,
  custodiansBulwark,
  stormShieldProt,
  eyeOfJudgement,
  navigatorsEye,
  deathMaskOfThePenitent,
  photoreactiveMantle,
  wardensCrimsonCape,
  sanctionedPsykerBand,
  solaritesEmbrace,
  omegaLevel_psy_collar,
  chronometer_augmetic,
]
