import type { Spell } from '../../../types/module'

/**
 * ZEALOT PRAYERS
 *
 * Source: WH40K_Zealot.docx — "Zealot Prayer List" section
 *
 * Prayers use the existing Spell interface with spellSource: 'prayer'.
 * Key differences from Psyker powers:
 *   - No warpCost (prayers don't fill the Warp Bar)
 *   - No perilsRisk (prayers don't risk Perils)
 *   - No discipline tag (no BIO/PYR/TEL)
 *   - CHA is the casting ability (not INT/WIS)
 *   - Uses prayer slots (same structure as spell slots)
 *   - UI renders gold/radiant theme instead of purple/warp
 *
 * Some prayers are always prepared (alwaysPrepared: true).
 */

// ─────────────────────────────────────────────────────────────────────────────
//  CANTRIPS (Sacred Rites) — Level 0
// ─────────────────────────────────────────────────────────────────────────────

const emperorsJudgment: Spell = {
  id: 'emperors-judgment',
  name: "Emperor's Judgment",
  level: 0,
  school: 'Evocation',
  castingTime: '1 action',
  range: '60 feet',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    "You call down a mote of the Emperor's wrath. The target must succeed on a DEX save or take 1d8 radiant damage. The target gains no benefit from cover.",
  higherLevels: 'Damage increases to 2d8 at 5th level and 3d8 at 10th level.',
  spellSource: 'prayer',
  tags: ['damage', 'radiant'],
}

const litanyOfGuidance: Spell = {
  id: 'litany-of-guidance',
  name: 'Litany of Guidance',
  level: 0,
  school: 'Divination',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Concentration, up to 1 minute',
  description:
    'You touch one willing creature and whisper a brief litany. Once before the duration ends, the target can roll a d4 and add it to one ability check of its choice. It can roll the die before or after making the check.',
  spellSource: 'prayer',
  tags: ['support'],
}

const emperorsLight: Spell = {
  id: 'emperors-light',
  name: "Emperor's Light",
  level: 0,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V'],
  duration: '1 hour',
  description:
    'You touch one object. For the duration, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object blocks the light. The prayer ends if you use it again or dismiss it (no action required).',
  spellSource: 'prayer',
  tags: ['utility'],
}

const riteOfPreservation: Spell = {
  id: 'rite-of-preservation',
  name: 'Rite of Preservation',
  level: 0,
  school: 'Necromancy',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    'You touch a living creature that has 0 hit points. The creature becomes stable. This prayer has no effect on undead or constructs.',
  spellSource: 'prayer',
  tags: ['healing'],
}

const voiceOfTheEmperorCantrip: Spell = {
  id: 'voice-of-the-emperor-cantrip',
  name: 'Voice of the Emperor',
  level: 0,
  school: 'Transmutation',
  castingTime: '1 action',
  range: '30 feet',
  components: ['V'],
  duration: 'Up to 1 minute',
  description:
    "You manifest a minor sign of the Emperor's power. Choose one: your voice booms up to three times as loud; you cause flames to flicker, brighten, or change color; you cause harmless tremors in the ground; you create an instantaneous sound (thunder, a choir, etc.); you cause an unlocked door or window to fly open or slam shut; or you alter the appearance of your eyes for 1 minute.",
  spellSource: 'prayer',
  tags: ['utility'],
}

const sanctifiedStrike: Spell = {
  id: 'sanctified-strike',
  name: 'Sanctified Strike',
  level: 0,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Self (5 feet)',
  components: ['V', 'S'],
  duration: '1 round',
  description:
    "As part of the action used to cast this prayer, you must make a melee weapon attack against one creature within 5 feet. On a hit, the target suffers the attack's normal effects and takes an additional 1d8 radiant damage if it moves before the start of your next turn.",
  higherLevels: 'Damage increases to 2d8 at 5th level and 3d8 at 10th level.',
  spellSource: 'prayer',
  tags: ['damage', 'radiant', 'attack'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  1ST LEVEL PRAYERS
// ─────────────────────────────────────────────────────────────────────────────

const litanyOfFaith: Spell = {
  id: 'litany-of-faith',
  name: 'Litany of Faith',
  level: 1,
  school: 'Enchantment',
  castingTime: '1 action',
  range: '30 feet',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 1 minute',
  description:
    'You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the prayer ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.',
  spellSource: 'prayer',
  tags: ['support'],
}

const shieldOfTheEmperor: Spell = {
  id: 'shield-of-the-emperor',
  name: 'Shield of the Emperor',
  level: 1,
  school: 'Abjuration',
  castingTime: '1 bonus action',
  range: '60 feet',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 10 minutes',
  description:
    'A shimmering field of golden light appears around a creature of your choice within range. The target gains a +2 bonus to AC for the duration.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['defensive', 'support'],
}

const emperorsMercy: Spell = {
  id: 'emperors-mercy',
  name: "Emperor's Mercy",
  level: 1,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    'A creature you touch regains a number of hit points equal to 1d8 + your CHA modifier. This prayer has no effect on undead or constructs.',
  higherLevels: 'The healing increases by 1d8 for each slot level above 1st.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['healing'],
}

const voiceOfAuthority: Spell = {
  id: 'voice-of-authority',
  name: 'Voice of Authority',
  level: 1,
  school: 'Enchantment',
  castingTime: '1 action',
  range: '60 feet',
  components: ['V'],
  duration: '1 round',
  description:
    'You speak a one-word command to a creature you can see within range. The target must succeed on a WIS save or follow the command on its next turn. The command must be one word: Approach, Drop, Flee, Grovel, or Halt.',
  higherLevels: 'You can target one additional creature per slot level above 1st.',
  spellSource: 'prayer',
  tags: ['control'],
}

const wardAgainstCorruption: Spell = {
  id: 'ward-against-corruption',
  name: 'Ward Against Corruption',
  level: 1,
  school: 'Abjuration',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 10 minutes',
  description:
    "Until the prayer ends, one willing creature you touch is protected. Daemons, undead, and Chaos-corrupted creatures have disadvantage on attack rolls against the target. The target can't be charmed, frightened, or possessed by them, and if already affected, gains a new saving throw.",
  spellSource: 'prayer',
  tags: ['defensive', 'anti-chaos'],
}

const righteousFury: Spell = {
  id: 'righteous-fury',
  name: 'Righteous Fury',
  level: 1,
  school: 'Enchantment',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Concentration, up to 1 minute',
  description:
    "A willing creature you touch is imbued with divine fury. Until the prayer ends, the creature gains temporary hit points equal to your CHA modifier at the start of each of its turns and can't be frightened. If already frightened, the condition is suppressed.",
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['support', 'defensive'],
}

const holyBolt: Spell = {
  id: 'holy-bolt',
  name: 'Holy Bolt',
  level: 1,
  school: 'Evocation',
  castingTime: '1 action',
  range: '120 feet',
  components: ['V', 'S'],
  duration: '1 round',
  description:
    'A flash of golden light streaks toward a creature within range. Make a ranged prayer attack. On a hit, the target takes 4d6 radiant damage and the next attack roll made against it before the end of your next turn has advantage.',
  higherLevels: 'Damage increases by 1d6 per slot level above 1st.',
  spellSource: 'prayer',
  tags: ['damage', 'radiant', 'attack'],
}

const cleansingFlame: Spell = {
  id: 'cleansing-flame',
  name: 'Cleansing Flame',
  level: 1,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Self (15-foot cone)',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    'Sacred fire roars from your hands. Each creature in a 15-foot cone must make a DEX save. A creature takes 3d6 fire damage on a failed save, or half as much on a successful one.',
  higherLevels: 'Damage increases by 1d6 per slot level above 1st.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['damage', 'fire'],
}

const emperorsSanctuary: Spell = {
  id: 'emperors-sanctuary',
  name: "Emperor's Sanctuary",
  level: 1,
  school: 'Abjuration',
  castingTime: '1 bonus action',
  range: '30 feet',
  components: ['V', 'S', 'M'],
  duration: '1 minute',
  description:
    "You ward one creature within range. Until the prayer ends, any creature who targets the warded creature with an attack or harmful prayer must first make a WIS save. On a failed save, the creature must choose a new target or lose the attack/prayer. This prayer doesn't protect against area effects.",
  spellSource: 'prayer',
  tags: ['defensive', 'support'],
}

const wrathfulSmite: Spell = {
  id: 'wrathful-smite',
  name: 'Wrathful Smite',
  level: 1,
  school: 'Evocation',
  castingTime: '1 bonus action',
  range: 'Self',
  components: ['V'],
  duration: 'Concentration, up to 1 minute',
  description:
    "The next time you hit with a melee weapon attack during this prayer's duration, your attack deals an extra 1d6 radiant damage. Additionally, the target must make a WIS save or be frightened of you until the prayer ends.",
  spellSource: 'prayer',
  tags: ['damage', 'radiant', 'control'],
}

const searingSmite: Spell = {
  id: 'searing-smite',
  name: 'Searing Smite',
  level: 1,
  school: 'Evocation',
  castingTime: '1 bonus action',
  range: 'Self',
  components: ['V'],
  duration: 'Concentration, up to 1 minute',
  description:
    "The next time you hit with a melee weapon attack during this prayer's duration, your weapon flares with holy fire and the attack deals an extra 1d6 fire damage. At the start of each of its turns, the target takes 1d6 fire damage until it or another creature uses an action to extinguish the flames.",
  higherLevels: 'Initial extra damage increases by 1d6 per slot level above 1st.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['damage', 'fire'],
}

const detectHeresy: Spell = {
  id: 'detect-heresy',
  name: 'Detect Heresy',
  level: 1,
  school: 'Divination',
  castingTime: '1 action',
  range: 'Self',
  components: ['V', 'S'],
  duration: 'Concentration, up to 10 minutes',
  description:
    'For the duration, you sense the presence and general direction of daemons, undead, Chaos-tainted creatures, and active Warp effects within 30 feet of you. You can use your action to learn the exact type and location. The prayer can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.',
  spellSource: 'prayer',
  tags: ['utility', 'anti-chaos'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  2ND LEVEL PRAYERS
// ─────────────────────────────────────────────────────────────────────────────

const purificationRite: Spell = {
  id: 'purification-rite',
  name: 'Purification Rite',
  level: 2,
  school: 'Abjuration',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    "You touch a creature and can end one disease, one poison, or one of the following conditions affecting it: blinded, deafened, paralyzed, or poisoned. You can also reduce a creature's Corruption by 1d4 points (this can only be used once per creature per long rest).",
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['healing', 'anti-chaos'],
}

const spiritOfTheMartyr: Spell = {
  id: 'spirit-of-the-martyr',
  name: 'Spirit of the Martyr',
  level: 2,
  school: 'Evocation',
  castingTime: '1 bonus action',
  range: '60 feet',
  components: ['V', 'S'],
  duration: '1 minute',
  description:
    'You conjure a spectral weapon of a fallen saint within range. On the turn you cast it, you can make a melee prayer attack against a creature within 5 feet of the weapon. On a hit, the target takes 1d8 + your CHA modifier radiant damage. As a bonus action on subsequent turns, you can move the weapon up to 20 feet and repeat the attack.',
  higherLevels: 'Damage increases by 1d8 for every two slot levels above 2nd.',
  spellSource: 'prayer',
  tags: ['damage', 'radiant'],
}

const blessingOfEndurance: Spell = {
  id: 'blessing-of-endurance',
  name: 'Blessing of Endurance',
  level: 2,
  school: 'Abjuration',
  castingTime: '1 action',
  range: '30 feet',
  components: ['V', 'S', 'M'],
  duration: '8 hours',
  description:
    "You bolster up to three creatures within range with divine vitality. Each target's hit point maximum and current hit points increase by 5 for the duration.",
  higherLevels: 'Increase by an additional 5 per slot level above 2nd.',
  spellSource: 'prayer',
  tags: ['support', 'defensive'],
}

const chainsOfFaith: Spell = {
  id: 'chains-of-faith',
  name: 'Chains of Faith',
  level: 2,
  school: 'Enchantment',
  castingTime: '1 action',
  range: '60 feet',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 1 minute',
  description:
    'Ethereal golden chains wrap around a humanoid you can see within range. The target must succeed on a WIS save or be paralyzed for the duration. At the end of each of its turns, the target can make another WIS save, ending the effect on a success.',
  higherLevels: 'Target one additional humanoid per slot level above 2nd.',
  spellSource: 'prayer',
  tags: ['control'],
}

const massRestoration: Spell = {
  id: 'mass-restoration',
  name: 'Mass Restoration',
  level: 2,
  school: 'Evocation',
  castingTime: '10 minutes',
  range: '30 feet',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    'Up to six creatures of your choice within range each regain hit points equal to 2d8 + your CHA modifier. This prayer has no effect on undead or constructs.',
  higherLevels: 'Healing increases by 1d8 per slot level above 2nd.',
  spellSource: 'prayer',
  tags: ['healing'],
}

const emperorsTruth: Spell = {
  id: 'emperors-truth',
  name: "Emperor's Truth",
  level: 2,
  school: 'Enchantment',
  castingTime: '1 action',
  range: 'Self (15-foot radius)',
  components: ['V', 'S'],
  duration: '10 minutes',
  description:
    "You create a zone of truth within a 15-foot radius sphere centered on you. Until the prayer ends, a creature that enters the area for the first time or starts its turn there must make a CHA save. On a failed save, a creature can't speak a deliberate lie while in the radius. An affected creature is aware of the prayer.",
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['utility', 'control'],
}

const consecrateWeapon: Spell = {
  id: 'consecrate-weapon',
  name: 'Consecrate Weapon',
  level: 2,
  school: 'Transmutation',
  castingTime: '1 bonus action',
  range: 'Touch',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 1 hour',
  description:
    'You touch a nonmagical weapon. Until the prayer ends, that weapon becomes a +1 weapon and deals radiant damage instead of its normal damage type.',
  higherLevels: 'With a 3rd-level slot, the bonus becomes +2.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['support', 'attack'],
}

const silenceOfTheFaithful: Spell = {
  id: 'silence-of-the-faithful',
  name: 'Silence of the Faithful',
  level: 2,
  school: 'Illusion',
  castingTime: '1 action',
  range: '120 feet',
  components: ['V', 'S'],
  duration: 'Concentration, up to 10 minutes',
  description:
    'You create a 20-foot-radius sphere of holy silence centered on a point within range. No sound can be created within or pass through the sphere. Any creature entirely inside is immune to thunder damage and deafened. Casting a prayer that includes a verbal component is impossible within the sphere. Psyker powers are unaffected (they use the Warp, not sound).',
  spellSource: 'prayer',
  tags: ['control', 'utility'],
}

const divineAegis: Spell = {
  id: 'divine-aegis',
  name: 'Divine Aegis',
  level: 2,
  school: 'Abjuration',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S', 'M'],
  duration: '1 hour',
  description:
    'A willing creature you touch gains a ward of divine protection. The first time the target would take damage, the ward absorbs up to 10 + your CHA modifier points of damage, then the prayer ends.',
  higherLevels: 'Absorption increases by 10 per slot level above 2nd.',
  spellSource: 'prayer',
  tags: ['defensive'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  3RD LEVEL PRAYERS
// ─────────────────────────────────────────────────────────────────────────────

const martyrdomDenied: Spell = {
  id: 'martyrdom-denied',
  name: 'Martyrdom Denied',
  level: 3,
  school: 'Necromancy',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S', 'M'],
  duration: 'Instantaneous',
  description:
    "You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This prayer can't return to life a creature that has died of old age, nor can it restore any missing body parts. The raised creature gains 2 levels of exhaustion.",
  spellSource: 'prayer',
  tags: ['healing'],
}

const banishTheUnclean: Spell = {
  id: 'banish-the-unclean',
  name: 'Banish the Unclean',
  level: 3,
  school: 'Abjuration',
  castingTime: '1 action',
  range: '120 feet',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    "You attempt to end a prayer, psychic power, or Warp effect on one creature, object, or area within range. For each effect, make a CHA ability check (DC 10 + the effect's level). On a success, the effect ends.",
  spellSource: 'prayer',
  tags: ['utility', 'anti-chaos'],
}

const choirOfTheFaithful: Spell = {
  id: 'choir-of-the-faithful',
  name: 'Choir of the Faithful',
  level: 3,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Self (15-foot radius)',
  components: ['V', 'S', 'M'],
  duration: 'Concentration, up to 10 minutes',
  description:
    'Spectral saints orbit you in a 15-foot radius. When a creature enters the area for the first time on a turn or starts its turn there, it takes 3d8 radiant damage (WIS save for half). Creatures you designate as allies are unaffected. Daemons and undead have disadvantage on the save.',
  higherLevels: 'Damage increases by 1d8 per slot level above 3rd.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['damage', 'radiant'],
}

const cleanseCorruption: Spell = {
  id: 'cleanse-corruption',
  name: 'Cleanse Corruption',
  level: 3,
  school: 'Abjuration',
  castingTime: '1 action',
  range: 'Touch',
  components: ['V', 'S'],
  duration: 'Instantaneous',
  description:
    "At your touch, all curses and Chaos taint affecting one creature end. If the creature is attuned to a cursed item, the attunement ends. Additionally, the creature's Corruption is reduced by 2d6 points.",
  spellSource: 'prayer',
  tags: ['healing', 'anti-chaos'],
}

const crusadeOfFaith: Spell = {
  id: 'crusade-of-faith',
  name: 'Crusade of Faith',
  level: 3,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Self (30-foot radius)',
  components: ['V'],
  duration: 'Concentration, up to 1 minute',
  description:
    'Holy power radiates from you in an aura with a 30-foot radius, awakening boldness in friendly creatures. Until the prayer ends, each non-hostile creature in the aura (including you) deals an extra 1d4 radiant damage when it hits with a weapon attack.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['support', 'damage'],
}

const lightOfTheEmperor: Spell = {
  id: 'light-of-the-emperor',
  name: 'Light of the Emperor',
  level: 3,
  school: 'Abjuration',
  castingTime: '1 action',
  range: '30 feet',
  components: ['V', 'S'],
  duration: 'Concentration, up to 1 minute',
  description:
    'You bestow hope and vitality. Choose any number of creatures within range. For the duration, each target has advantage on WIS saves and death saving throws, and regains the maximum number of hit points possible from any healing.',
  spellSource: 'prayer',
  alwaysPrepared: true,
  tags: ['support', 'healing'],
}

const emperorsRadiance: Spell = {
  id: 'emperors-radiance',
  name: "Emperor's Radiance",
  level: 3,
  school: 'Evocation',
  castingTime: '1 action',
  range: 'Self (60-foot radius)',
  components: ['V', 'S', 'M'],
  duration: '1 hour',
  description:
    "The Emperor's light fills the area. Bright light fills a 60-foot radius sphere centered on you, and dim light for an additional 60 feet. Daemons and undead in the bright light have disadvantage on attack rolls. If any of this prayer's area overlaps with an area of magical darkness or Warp shadow, the darkness is dispelled.",
  spellSource: 'prayer',
  tags: ['utility', 'anti-chaos'],
}

const holyFire: Spell = {
  id: 'holy-fire',
  name: 'Holy Fire',
  level: 3,
  school: 'Evocation',
  castingTime: '1 action',
  range: '150 feet',
  components: ['V', 'S', 'M'],
  duration: 'Instantaneous',
  description:
    'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms into a 20-foot-radius sphere of sacred fire. Each creature in the area must make a DEX save. A creature takes 6d6 fire damage and 2d6 radiant damage on a failed save, or half as much on a successful one. Daemons and undead take an additional 2d6 radiant damage.',
  spellSource: 'prayer',
  tags: ['damage', 'fire', 'radiant', 'anti-chaos'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const zealotCantrips: Spell[] = [
  emperorsJudgment,
  litanyOfGuidance,
  emperorsLight,
  riteOfPreservation,
  voiceOfTheEmperorCantrip,
  sanctifiedStrike,
]

export const zealotPrayers1st: Spell[] = [
  litanyOfFaith,
  shieldOfTheEmperor,
  emperorsMercy,
  voiceOfAuthority,
  wardAgainstCorruption,
  righteousFury,
  holyBolt,
  cleansingFlame,
  emperorsSanctuary,
  wrathfulSmite,
  searingSmite,
  detectHeresy,
]

export const zealotPrayers2nd: Spell[] = [
  purificationRite,
  spiritOfTheMartyr,
  blessingOfEndurance,
  chainsOfFaith,
  massRestoration,
  emperorsTruth,
  consecrateWeapon,
  silenceOfTheFaithful,
  divineAegis,
]

export const zealotPrayers3rd: Spell[] = [
  martyrdomDenied,
  banishTheUnclean,
  choirOfTheFaithful,
  cleanseCorruption,
  crusadeOfFaith,
  lightOfTheEmperor,
  emperorsRadiance,
  holyFire,
]

export const allZealotPrayers: Spell[] = [
  ...zealotCantrips,
  ...zealotPrayers1st,
  ...zealotPrayers2nd,
  ...zealotPrayers3rd,
]
