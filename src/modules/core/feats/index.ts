import type { Feat } from '../../../types/module'

// ═══════════════════════════════════════════════════════════════════════════════
// STANDARD FEATS  (adapted from 5e, source: 'standard')
// ═══════════════════════════════════════════════════════════════════════════════

const twoWeaponFighting: Feat = {
  id: 'two-weapon-fighting',
  name: 'Two-Weapon Fighting',
  description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack. Additionally, you can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.',
  source: 'standard',
  tags: ['combat', 'melee', 'dual-wield'],
}

const sharpshooter: Feat = {
  id: 'sharpshooter',
  name: 'Sharpshooter',
  description: 'Attacking at long range no longer imposes disadvantage on your attack rolls. Ranged attacks ignore half cover and three-quarters cover. Before making a ranged attack you know will hit, you can choose to take -5 to the attack roll to deal +10 damage on a hit.',
  source: 'standard',
  tags: ['combat', 'ranged'],
}

const alert: Feat = {
  id: 'alert',
  name: 'Alert',
  description: '+5 bonus to initiative. You cannot be surprised while conscious. Creatures you have not seen do not gain advantage on attack rolls against you.',
  source: 'standard',
  tags: ['utility', 'initiative'],
}

const tough: Feat = {
  id: 'tough',
  name: 'Tough',
  description: 'Your Wound (HP) maximum increases by 2 for each character level, applied retroactively and going forward.',
  source: 'standard',
  tags: ['defense', 'hp'],
}

const lucky: Feat = {
  id: 'lucky',
  name: 'Lucky',
  description: 'You gain 3 luck points per long rest. Spend one to reroll any attack roll, ability check, or saving throw and take either result. You can also spend one when an enemy attacks you to force them to reroll their attack — you choose which roll applies.',
  source: 'standard',
  tags: ['utility'],
}

const warCaster: Feat = {
  id: 'war-caster',
  name: 'War Caster',
  prerequisite: 'Ability to cast at least one spell or psychic power',
  description: 'You have advantage on CON saving throws to maintain concentration on a spell or power. You can perform somatic components even when your hands are occupied. When a creature provokes an opportunity attack from you, you can cast a spell or activate a power targeting it instead of making a melee attack.',
  source: 'standard',
  tags: ['spellcasting', 'combat'],
}

const sentinel: Feat = {
  id: 'sentinel',
  name: 'Sentinel',
  description: 'When you hit a creature with an opportunity attack, its speed becomes 0 for the rest of the turn. Creatures within your reach provoke opportunity attacks from you even when they take the Disengage action. When a creature within 5 feet attacks a target other than you, you can use your reaction to make a melee attack against that creature.',
  source: 'standard',
  tags: ['combat', 'melee', 'defender'],
}

const greatWeaponMaster: Feat = {
  id: 'great-weapon-master',
  name: 'Great Weapon Master',
  description: 'When you score a critical hit or reduce a creature to 0 HP with a melee weapon, you can make one bonus melee attack as a bonus action. Before making a melee attack with a heavy weapon, you can choose to take -5 to the attack roll to deal +10 damage on a hit.',
  source: 'standard',
  tags: ['combat', 'melee'],
}

const mobile: Feat = {
  id: 'mobile',
  name: 'Mobile',
  description: 'Your speed increases by 10 feet. When you use the Dash action, difficult terrain does not cost extra movement for that turn. When you make a melee attack against a creature, you do not provoke opportunity attacks from it for the rest of the turn — whether or not the attack hits.',
  source: 'standard',
  tags: ['movement', 'utility'],
}

const resilient: Feat = {
  id: 'resilient',
  name: 'Resilient',
  description: 'Choose one ability score at the time of feat selection: you gain proficiency in saving throws using that ability and gain +1 to that ability score.',
  source: 'standard',
  tags: ['defense', 'saves'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// WARHAMMER-SPECIFIC FEATS  (source: 'warhammer')
// ═══════════════════════════════════════════════════════════════════════════════

const ironWill: Feat = {
  id: 'iron-will',
  name: 'Iron Will',
  description: 'The horrors of the 41st Millennium have hardened your mind. You have advantage on saving throws against fear and psychic effects. Once per long rest, when you fail a Wisdom saving throw, you can use your reaction to reroll the save and take either result.',
  source: 'warhammer',
  tags: ['warhammer', 'mental', 'defense'],
}

const throneAgent: Feat = {
  id: 'throne-agent',
  name: 'Throne Agent',
  prerequisite: 'Background: Adept, Enforcer, or Noble',
  description: 'You carry the implicit authority of the Imperium. Once per session you can invoke Imperial authority to demand cooperation from any Imperial citizen or low-ranking official. The target must make a CHA saving throw (DC 14) or comply with one reasonable request that does not directly endanger them.',
  source: 'warhammer',
  tags: ['warhammer', 'social'],
}

const suppressionVeteran: Feat = {
  id: 'suppression-veteran',
  name: 'Suppression Veteran',
  description: "You have fought in enough firefights to read and use suppression instinctively. When you take the Dodge action while in a fortified position (cover or prepared defence), you can also lay suppressing fire on one target within range as a free action. No attack roll is required — the target must make a WIS saving throw (DC 13) or be suppressed (speed 0, no reactions) until the start of your next turn.",
  source: 'warhammer',
  tags: ['warhammer', 'combat', 'ranged'],
}

const mechanicusTraining: Feat = {
  id: 'mechanicus-training',
  name: 'Mechanicus Training',
  prerequisite: 'Background: Mechanicum Initiate, or Race: Forge World Human',
  description: 'Your understanding of machine spirits runs deeper than most. You gain proficiency in the Technology skill if not already proficient, and double your proficiency bonus on Technology checks to repair, identify, or operate Imperial machinery. As a bonus action you can attempt to commune with a machine spirit (DC 12 Technology check), potentially revealing its function or current state.',
  source: 'warhammer',
  tags: ['warhammer', 'technology', 'mechanicus'],
}

const warpSense: Feat = {
  id: 'warp-sense',
  name: 'Warp Sense',
  prerequisite: 'WIS 13 or higher',
  description: 'You have developed a passive sensitivity to warp disturbances. You can detect active psykers or warp-active objects within 30 feet without taking an action. You have advantage on saving throws against psychic powers. However, your Warp Exposure increases by 1 whenever a Perils of the Warp event occurs within 60 feet of you.',
  source: 'warhammer',
  tags: ['warhammer', 'warp', 'psyker-adjacent'],
}

const combatStimms: Feat = {
  id: 'combat-stimms',
  name: 'Combat Stimms',
  description: 'You know how to use combat stimulants effectively and without killing yourself — most of the time. Once per short rest, as a bonus action you can inject a stimm: gain 1d8 temporary HP and advantage on Strength checks for 1 minute. When the effect ends, make a CON saving throw (DC 12) or gain one level of exhaustion.',
  source: 'warhammer',
  tags: ['warhammer', 'combat', 'consumable'],
}

const augmentFamiliarity: Feat = {
  id: 'augment-familiarity',
  name: 'Augment Familiarity',
  prerequisite: 'Class: Augmenticist, or Race: Techfused',
  prerequisiteClass: 'augmenticist',
  prerequisiteRace: 'techfused',
  description: 'Your affinity with cybernetic augmentation runs deep. Your augment slot maximum increases by 1. During a long rest, you can swap two augments instead of one when reconfiguring your loadout. You have advantage on checks to resist EMP effects and abilities that specifically target constructs.',
  source: 'warhammer',
  tags: ['warhammer', 'augmenticist', 'cybernetics'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const coreFeats: Feat[] = [
  // Standard
  twoWeaponFighting,
  sharpshooter,
  alert,
  tough,
  lucky,
  warCaster,
  sentinel,
  greatWeaponMaster,
  mobile,
  resilient,
  // Warhammer-specific
  ironWill,
  throneAgent,
  suppressionVeteran,
  mechanicusTraining,
  warpSense,
  combatStimms,
  augmentFamiliarity,
]
