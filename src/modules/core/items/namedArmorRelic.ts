import type { Item } from '../../../types/module'

// ─── Body Armor (Light) ───────────────────────────────────────────────────────

const shroudOfTheMartyr: Item = {
  id: 'shroud-of-the-martyr',
  name: 'Shroud of the Martyr',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'light',
  armorClass: 13,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Blessed Martyrdom',
      description: 'If you are reduced to 0 HP, you do not fall unconscious — instead you continue fighting at 1 HP for 1 more round, immune to all damage during that round, before collapsing. Once per combat. Additionally, when you die, all allies within 30 ft immediately heal 3d6 HP and gain advantage on all rolls for 1 minute.',
    },
  ],
  lore: 'A bodyglove cut from the burial shroud of Saint Mina. When the Adepta Sororitas discovered the shroud had been looted and repurposed, they demanded its return. The Inquisitor who possessed it declined. She has survived seventeen assassination attempts since. The Sororitas have reconsidered their position.',
  description: 'Base: Bodyglove. AC 13 + DEX. +1 AC (named). Blessed Martyrdom: at 0 HP, fight for 1 more round immune to damage; on death, all allies within 30 ft heal 3d6 and gain advantage 1 min.',
  cost: 'Legendary',
  weight: 2,
  tags: ['armor', 'named', 'light', 'sororitas', 'martyr', 'relic'],
}

const wraithboneBodysuit: Item = {
  id: 'wraithbone-bodysuit',
  name: 'Wraithbone Bodysuit',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'light',
  armorClass: 14,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Living Armour',
      description: 'The wraithbone lattice regenerates. At the start of each of your turns, recover 2 HP (passive, always active). Additionally, when you take more than 15 damage in a single hit, the wraithbone hardens — gain +3 AC until the start of your next turn.',
    },
  ],
  lore: 'A bodysuit woven through with a wraithbone lattice gifted by an Aeldari Autarch to a human ally who had fought alongside her craftworld for a decade. The wraithbone is actually alive — a fragment of soul-fabric that has bonded with the wearer.',
  description: 'Base: Bodyglove with wraithbone weave. AC 14 + DEX. +1 AC (named). Living Armour: regenerate 2 HP/turn; taking 15+ damage in one hit triggers +3 AC until next turn.',
  cost: 'Legendary',
  weight: 3,
  tags: ['armor', 'named', 'light', 'eldar', 'wraithbone', 'xenos'],
}

const fleshboundVestments: Item = {
  id: 'fleshbound-vestments',
  name: 'Fleshbound Vestments',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'light',
  armorClass: 13,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Soul Anchor',
      description: 'You cannot be possessed, dominated, or mind-controlled by any power — warp, daemon, or otherwise. Additionally, once per rest, if you would fail a WIS saving throw, you may choose to succeed instead. The vestments absorb the attempt and the power is nullified.',
    },
  ],
  lore: 'Vestments woven from fibres blessed by the Grey Knights themselves for a mortal ally who would be sent places no Grey Knight could follow without drawing attention. The blessing is not decorative. The Ordo Malleus insisted on this.',
  description: 'Base: Vestments. AC 13 + DEX. +1 AC (named). Soul Anchor: immune to possession/domination/mind control; 1/rest auto-succeed any WIS save.',
  cost: 'Legendary',
  weight: 2,
  tags: ['armor', 'named', 'light', 'grey-knights', 'daemon'],
}

// ─── Body Armor (Medium) ──────────────────────────────────────────────────────

const celestineSisterMail: Item = {
  id: 'celestine-sister-mail',
  name: 'Armour of Holy Celestine',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 16,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Miracle of the Living Saint',
      description: 'Once per day, call upon the Living Saint. For 1 minute, you glow with golden light, gain a flying speed of 30 ft, your attacks deal an additional 3d6 radiant damage, and you are immune to all conditions. When the effect ends, you are fully healed.',
    },
  ],
  lore: 'Battle armour modelled on Saint Celestine\'s own, blessed by the Living Saint herself during the Thirteenth Black Crusade. Celestine placed her hand upon each plate and spoke a prayer. The armour has not needed maintenance since. The Adeptus Mechanicus is uncomfortable with this.',
  description: 'Base: Battle Sister Armour. AC 16 + DEX (max 2). +1 AC (named). Miracle of the Living Saint (1/day): 1 minute — fly 30 ft, +3d6 radiant, immune to conditions; end: full heal.',
  cost: 'Legendary',
  weight: 20,
  tags: ['armor', 'named', 'medium', 'sororitas', 'celestine', 'relic'],
}

const guardianOfMankind: Item = {
  id: 'guardian-of-mankind',
  name: 'Guardian of Mankind',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 16,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Last Line of Defence',
      description: 'When an ally within 30 ft is reduced to 0 HP, you may use your reaction to move up to your speed toward them and make one immediate attack against the creature that downed them. If this attack hits, the downed ally automatically stabilises at 1 HP and gains 1d6+3 HP from the will to survive.',
    },
  ],
  lore: 'Carapace armour worn by an Astra Militarum Commissar who served forty years and was never once wounded while soldiers in his care fell. His secret: he placed himself between every bullet and every soldier under his command, trusting in the armour and the Emperor.',
  description: 'Base: Carapace. AC 16 + DEX (max 2). +1 AC (named). Last Line of Defence (reaction): when ally downed, move + attack downer; on hit: ally stabilises at 1+1d6+3 HP.',
  cost: 'Legendary',
  weight: 22,
  tags: ['armor', 'named', 'medium', 'commissar', 'guard'],
}

const heraldOfMars: Item = {
  id: 'herald-of-mars',
  name: 'Herald of Mars',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 17,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Omnissiah\'s Blessing',
      description: 'The armour\'s machine spirit is exceptionally powerful. It can interface with and temporarily control any mechanical system within 30 ft (vehicles, doors, weapons, machinery) as a bonus action. Once per rest, grant one vehicle or weapon within 30 ft a +3 bonus to all rolls for 1 minute as the blessing flows through it.',
    },
  ],
  lore: 'A Magos Dominus\' ceremonial combat armour elevated to relic status after its machine spirit absorbed the consciousness fragment of a Forge World\'s greatest artificer as he died. The armour now contains a whisper of his genius.',
  description: 'Base: Magos Armour. AC 17 + DEX (max 2). +1 AC (named). Omnissiah\'s Blessing: control any mechanical system within 30 ft (bonus action); 1/rest grant +3 to machine within 30 ft for 1 min.',
  cost: 'Legendary',
  weight: 28,
  tags: ['armor', 'named', 'medium', 'mechanicus', 'mars'],
}

const warpBreaker: Item = {
  id: 'warpbreaker-armour',
  name: 'Warpbreaker',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'medium',
  armorClass: 16,
  maxDexBonus: 2,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Null Shell',
      description: 'The armour creates a null-field around the wearer. All psychic abilities targeting you automatically fail. Additionally, creatures with the Psyker trait within 10 ft of you must make a WIS save DC 16 each round or lose access to their psychic abilities until they are outside your aura.',
    },
  ],
  lore: 'Armour built by the Ordo Malleus incorporating null-grade materials and a psychic suppression generator. Designed for operatives sent into warp-infested zones where psykers cannot be trusted — including, theoretically, the operative\'s own psykers.',
  description: 'Base: Carapace. AC 16 + DEX (max 2). +1 AC (named). Null Shell: all psychic abilities targeting you auto-fail; psykers within 10 ft WIS DC 16 each round or lose psychic abilities while in aura.',
  cost: 'Legendary',
  weight: 24,
  tags: ['armor', 'named', 'medium', 'ordo-malleus', 'null'],
}

// ─── Body Armor (Heavy) ───────────────────────────────────────────────────────

const primarchsGrace: Item = {
  id: 'primarchs-grace',
  name: "Primarch's Grace",
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 19,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Blessed by Dorn',
      description: 'While wearing this armour, you cannot be moved from your position against your will (no pushback, no teleportation, no forced movement of any kind). Additionally, while you maintain your position, all allies within 15 ft gain +3 AC and cannot be moved involuntarily.',
    },
  ],
  lore: 'Full plate armour blessed by Rogal Dorn during the Siege of Terra. He placed it on a mortal soldier who had refused to abandon his post for three days. "Stay," he said, and placed a hand upon the shoulders. The armour understood.',
  description: 'Base: Full Carapace. AC 19. +1 AC (named). Blessed by Dorn: cannot be moved involuntarily; while stationary, allies within 15 ft gain +3 AC and cannot be moved.',
  cost: 'Legendary',
  weight: 70,
  tags: ['armor', 'named', 'heavy', 'imperial-fists', 'dorn', 'siege-of-terra'],
}

const ironCitadel: Item = {
  id: 'iron-citadel',
  name: 'Iron Citadel',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'heavy',
  armorClass: 18,
  maxDexBonus: 0,
  equipmentSlot: 'body',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Fortress Mode',
      description: 'Once per rest, as a bonus action, lock the armour into Fortress Mode. For 1 minute: gain resistance to all damage, cannot be moved (even voluntarily, you are rooted), and any melee attacker who hits you takes 2d8 piercing damage from reactive spikes. You cannot move during Fortress Mode.',
    },
  ],
  lore: 'A siege-plate worn by an Iron Hands Techmarine who converted it for human use after its original wearer fell. The servo-locks that normally anchor a Space Marine to terrain have been repurposed for defensive overclocking. The human wearer cannot move during lockdown. They survive, which is the point.',
  description: 'Base: Siege Plate. AC 18. +1 AC (named). Fortress Mode (1/rest): 1 minute — resistance to all damage, rooted, melee attackers take 2d8 piercing on each hit.',
  cost: 'Legendary',
  weight: 75,
  tags: ['armor', 'named', 'heavy', 'iron-hands', 'siege'],
}

// ─── Shields ──────────────────────────────────────────────────────────────────

const voidShieldGenerator: Item = {
  id: 'void-shield-generator',
  name: 'Void Shield Generator',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 4,
  itemAbilities: [
    {
      name: 'Void Shield',
      description: 'Once per rest, activate the void shield. The shield projects a personal void-field: the next 5 attacks that would hit you automatically miss as the void field deflects them. The field collapses after 5 deflections or 1 minute, whichever comes first.',
    },
  ],
  lore: 'A miniaturised void shield generator built into a combat shield by a Rogue Trader engineer of extraordinary skill. Full void shields require a ship. This version provides a few seconds of the same invincibility. A few seconds is enough.',
  description: 'Shield. +4 AC (named). Void Shield (1/rest): next 5 attacks auto-miss (void field collapses after 5 blocks or 1 minute).',
  cost: 'Legendary',
  weight: 15,
  tags: ['shield', 'named', 'void-shield', 'rogue-trader'],
}

const ancientBulwarkTerra: Item = {
  id: 'ancient-bulwark-terra',
  name: 'Ancient Bulwark of Terra',
  type: 'armor',
  tier: 'relic',
  isNamed: true,
  armorType: 'shield',
  equipmentSlot: 'shield',
  bonusAC: 4,
  itemAbilities: [
    {
      name: 'Unbroken Wall',
      description: 'Once per rest, raise the Ancient Bulwark and shout the Litany of Defence. All allies within 20 ft gain 20 temporary HP and cannot be frightened for 1 minute. Your own AC increases by +3 (total +7 from shield) until the temporary HP is gone.',
    },
  ],
  lore: 'A shield that defended the walls of the Imperial Palace during the Siege of Terra, bearing the marks of bolt rounds, power fists, and daemon claws from that most desperate of battles. It has been studied, blessed, and studied again. It should not still be intact. It is.',
  description: 'Shield. +4 AC (named). Unbroken Wall (1/rest): allies within 20 ft gain 20 temp HP + immunity to fear 1 min; your AC +3 additionally until temp HP expires.',
  cost: 'Legendary',
  weight: 12,
  tags: ['shield', 'named', 'terra', 'siege-of-terra', 'relic'],
}

// ─── Helmets ──────────────────────────────────────────────────────────────────

const crownOfConquest: Item = {
  id: 'crown-of-conquest',
  name: 'Crown of Conquest',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Voice of Command',
      description: 'Wearing the Crown, your voice carries supernatural authority. Once per rest, issue a single Command (as the spell) that affects all enemies within 60 ft simultaneously (WIS save DC 18 to resist). Additionally, all allied NPCs within earshot will follow your orders without requiring a roll.',
    },
  ],
  lore: 'The ceremonial helm of Lord Solar Macharius, recovered from the site of his death and blessed by three High Lords. The golden eagle crest radiates command presence — soldiers who see it fight harder, enemies who face it hesitate. This is not metaphor.',
  description: 'Helm. +1 AC (named). Voice of Command (1/rest): Command all enemies within 60 ft simultaneously (WIS DC 18). All allied NPCs follow orders without rolls.',
  cost: 'Legendary',
  weight: 3,
  tags: ['helmet', 'named', 'macharius', 'command', 'relic'],
}

const greyKnightsVisor: Item = {
  id: 'grey-knights-visor',
  name: 'Grey Knight\'s Warding Visor',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Warding Eye',
      description: 'You automatically succeed on saving throws against illusions. You can see into the warp, detecting daemonic presences within 120 ft even through walls. Once per rest, the visor can attempt to identify a daemon\'s true name (GM rolls secretly; on success, the daemon takes double damage from you for 1 minute).',
    },
  ],
  lore: 'A Grey Knights helm visor gifted to a mortal Daemonhunter by a Grey Knight Justicar who was mortally wounded. "Take my eyes," he said. "Yours are not sufficient for what lies ahead." He was correct. He died. The mortal did not.',
  description: 'Helm. +1 AC (named). Warding Eye: auto-succeed vs illusions; see daemons through walls 120 ft; 1/rest seek daemon\'s true name (double damage on success) 1 min.',
  cost: 'Legendary',
  weight: 2,
  tags: ['helmet', 'named', 'grey-knights', 'daemon'],
}

const voiceOfTheMachineGod: Item = {
  id: 'voice-of-the-machine-god',
  name: 'Voice of the Machine God',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'helmet',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Binary Communion',
      description: 'You can communicate directly with any machine spirit, no matter how ancient or damaged. Additionally, once per rest, force any single machine within sight to obey one command (no save for mindless machines; WIS DC 17 for machine spirits of exceptional character). Siege weapons, vehicles, and gun emplacements are included.',
    },
  ],
  lore: 'A Fabricator-General\'s helm containing an ancient machine spirit interface of pre-Heresy design. The helm speaks binary in the old dialect — the machines do not merely understand it, they obey it. The difference is important.',
  description: 'Helm. +1 AC (named). Binary Communion: speak with any machine spirit; 1/rest command any machine in sight to obey one order (WIS DC 17 for sapient spirits).',
  cost: 'Legendary',
  weight: 4,
  tags: ['helmet', 'named', 'mechanicus', 'machine-spirit'],
}

// ─── Cloaks ───────────────────────────────────────────────────────────────────

const voidwalkerMantle: Item = {
  id: 'voidwalker-mantle',
  name: 'Voidwalker\'s Mantle',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'cloak-backpack',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Between Worlds',
      description: 'Once per day, step between the material world and the warp. For up to 1 minute, you are incorporeal — you cannot be hit by physical attacks, can move through solid objects, and cannot interact with physical objects. You can still see and hear normally. Ending the effect is a bonus action.',
    },
  ],
  lore: 'A cloak woven from a Navigator House\'s most sacred materials — specifically, the preserved skin of a Warp Rift that was sealed during the Gothic War. The Navigator who made it was declared Hereticus by one Ordo and a Hero by another. Both were correct.',
  description: 'Cloak. +1 AC (named). Between Worlds (1/day): up to 1 minute — incorporeal, immune to physical attacks, pass through objects, cannot interact physically.',
  cost: 'Legendary',
  weight: 2,
  tags: ['cloak', 'named', 'warp', 'navigator', 'relic'],
}

const emperorsShadow: Item = {
  id: 'emperors-shadow',
  name: "Emperor's Shadow",
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'cloak-backpack',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Unseen Hand',
      description: 'While wearing this cloak, you leave no trace of your presence (no footprints, scent, psychic resonance, or recordings). Additionally, once per day, become completely undetectable — invisible, silent, scentless, without psychic presence — for 1 hour. The effect ends instantly if you attack or speak above a whisper.',
    },
  ],
  lore: 'A cloak woven by the Officio Assassinorum\'s own artificers for operations so sensitive they cannot be acknowledged. The operative who first wore it assassinated a High Lord. The incident is classified at the highest level. The cloak\'s existence is classified at a higher level.',
  description: 'Cloak. +1 AC (named). Unseen Hand (1/day): 1 hour — completely undetectable by all senses, psychic or technological; ends on attack or loud speech.',
  cost: 'Legendary',
  weight: 1,
  tags: ['cloak', 'named', 'assassinorum', 'stealth', 'relic'],
}

// ─── Accessories ─────────────────────────────────────────────────────────────

const anathemaDeviceRelic: Item = {
  id: 'anathema-device',
  name: 'Anathema Device',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Living Null',
      description: 'You become a Living Null. All psychic abilities within 30 ft of you fail automatically, including friendly ones. Daemons within 30 ft take 2d6 radiant damage per round and must succeed on a WIS save DC 17 or flee. Once per day, you may project a 60 ft null burst that banishes all daemons of CR 10 or lower instantly.',
    },
  ],
  lore: 'A device constructed by the Grey Knights from the distilled essence of three Pariah-grade Nulls. The Nulls volunteered. The result is an artificial soul-blank of unprecedented potency. The Grey Knights use it sparingly. It is terrifying to everything that touches the warp — including friendly psykers.',
  description: 'Accessory. +1 AC (named). Living Null: 30 ft nullification aura (all psychic fails, daemons 2d6/round, fear save DC 17); 1/day 60 ft burst banishes daemons CR 10 or lower.',
  cost: 'Legendary',
  weight: 1,
  tags: ['accessory', 'named', 'null', 'grey-knights', 'daemon'],
}

const heartOfTerra: Item = {
  id: 'heart-of-terra',
  name: 'Heart of Terra',
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Unyielding Will',
      description: 'You automatically succeed on all saves vs fear, despair, and mind-altering effects. Additionally, once per day, when an ally within 30 ft fails a save that would end or kill them, you may fail the save on their behalf — the effect targets you instead. You then make the save at advantage.',
    },
  ],
  lore: 'A pendant forged from a fragment of the original Golden Throne\'s superstructure, recovered during the War in Heaven and preserved for ten millennia. The metal radiates an imperceptible warmth that has kept its bearers fighting through conditions that should have broken them.',
  description: 'Accessory. +1 AC (named). Unyielding Will: auto-succeed vs fear/despair/mind effects. 1/day: take an ally\'s failed save on yourself (make it at advantage instead).',
  cost: 'Legendary',
  weight: 0,
  tags: ['accessory', 'named', 'terra', 'golden-throne', 'relic'],
}

const omnissiahsCore: Item = {
  id: 'omnissiahs-core',
  name: "Omnissiah's Core",
  type: 'gear',
  tier: 'relic',
  isNamed: true,
  equipmentSlot: 'accessory',
  bonusAC: 1,
  itemAbilities: [
    {
      name: 'Machine Ascendant',
      description: 'You are treated as a machine for the purposes of magical healing (magical healing heals you double), immunities (immune to poison and disease), and detection (psy-detection fails to register you as a biological creature). Once per day, project a 20 ft pulse: all mechanical devices restart and are fully operational, and all wounded biological creatures in range receive 3d8 healing.',
    },
  ],
  lore: 'A Mechanicus core implant of relic grade, housing a consciousness fragment of the Omnissiah\'s machine-dream. The bearer becomes partially machine — their biological processes are subtly supplemented by mechaelectrical systems. The Magos who designed it ascended to Silica Animus.',
  description: 'Accessory. +1 AC (named). Machine Ascendant: treated as machine (double magical healing, immune to poison/disease); 1/day 20 ft pulse — restart all devices + 3d8 healing to biologicals.',
  cost: 'Legendary',
  weight: 2,
  tags: ['accessory', 'named', 'mechanicus', 'omnissiah', 'relic'],
}

export const namedArmorRelic: Item[] = [
  shroudOfTheMartyr,
  wraithboneBodysuit,
  fleshboundVestments,
  celestineSisterMail,
  guardianOfMankind,
  heraldOfMars,
  warpBreaker,
  primarchsGrace,
  ironCitadel,
  voidShieldGenerator,
  ancientBulwarkTerra,
  crownOfConquest,
  greyKnightsVisor,
  voiceOfTheMachineGod,
  voidwalkerMantle,
  emperorsShadow,
  anathemaDeviceRelic,
  heartOfTerra,
  omnissiahsCore,
]
