import type { Spell } from '../../../types/module'

// ─── CANTRIPS (Level 0) — +1 Warp Point each ─────────────────────────────────

export const psykerCantrips: Spell[] = [
  {
    id: 'mind-spark', name: 'Mind Spark', level: 0, school: 'Evocation',
    castingTime: '1 action', range: '60 feet', components: ['V', 'S'],
    duration: 'Instantaneous', spellSource: 'psyker', discipline: 'TEL',
    warpCost: 1,
    description: "You lance a bolt of raw psychic energy at a creature's neural pathways. Make a ranged power attack. On a hit, the target takes 1d10 psychic damage.",
    higherLevels: 'Damage increases to 2d10 at 5th level and 3d10 at 10th level.',
    tags: ['damage'],
  },
  {
    id: 'warp-flame', name: 'Warp Flame', level: 0, school: 'Evocation',
    castingTime: '1 action', range: '60 feet', components: ['V', 'S'],
    duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR',
    warpCost: 1,
    description: 'You hurl a mote of purple-tinged Warp-fire at a creature or object. Make a ranged power attack. On a hit, the target takes 1d10 fire damage. Flammable objects ignite if not being worn or carried.',
    higherLevels: 'Damage increases to 2d10 at 5th level and 3d10 at 10th level.',
    tags: ['damage', 'fire'],
  },
  {
    id: 'warp-blade', name: 'Warp Blade', level: 0, school: 'Evocation',
    castingTime: '1 bonus action', range: 'Self', components: ['V', 'S'],
    duration: '1 minute', spellSource: 'psyker', discipline: 'ALL',
    warpCost: 1,
    description: 'You manifest a crackling blade of psychic energy in your free hand. For the duration, you can make melee power attacks dealing 1d8 force damage. It sheds dim light in 10 feet and counts as magical.',
    higherLevels: 'Damage increases to 2d8 at 5th level and 3d8 at 10th level.',
    tags: ['damage', 'attack'],
  },
  {
    id: 'presage', name: 'Presage', level: 0, school: 'Divination',
    castingTime: '1 action', range: 'Self', components: ['V', 'S'],
    duration: '1 round', spellSource: 'psyker', discipline: 'DIV',
    warpCost: 1,
    description: 'A fracture-flash of the immediate future. Until the end of your next turn, the next attack roll, ability check, or saving throw you make is rolled with advantage.',
    tags: ['support'],
  },
  {
    id: 'thought-whisper', name: 'Thought Whisper', level: 0, school: 'Enchantment',
    castingTime: '1 action', range: '120 feet', components: ['V', 'S'],
    duration: 'Instantaneous', spellSource: 'psyker', discipline: 'TEL',
    warpCost: 1,
    description: 'You project a brief telepathic message (up to 25 words) into the mind of one creature within range you can see. The target hears your words clearly and can reply telepathically with a message of equal length.',
    tags: ['utility'],
  },
  {
    id: 'psychic-light', name: 'Psychic Light', level: 0, school: 'Evocation',
    castingTime: '1 action', range: 'Touch', components: ['V'],
    duration: '1 hour', spellSource: 'psyker', discipline: 'ALL',
    warpCost: 1,
    description: 'You touch one object no larger than 3 feet. For the duration, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light is faintly blue-violet. Dismiss as a free action.',
    tags: ['utility'],
  },
  {
    id: 'fortify', name: 'Fortify', level: 0, school: 'Abjuration',
    castingTime: '1 action', range: 'Touch', components: ['V', 'S'],
    duration: '1 hour', spellSource: 'psyker', discipline: 'BIO',
    warpCost: 1,
    description: 'You touch a willing creature and bolster their tissue with biomantic vitality. The target gains 1d4 temporary hit points. No effect on undead or constructs.',
    higherLevels: 'Increases to 2d4 at 5th level and 3d4 at 10th level.',
    tags: ['support', 'healing'],
  },
  {
    id: 'psychic-hand', name: 'Psychic Hand', level: 0, school: 'Conjuration',
    castingTime: '1 action', range: '30 feet', components: ['V', 'S'],
    duration: '1 minute', spellSource: 'psyker', discipline: 'ALL',
    warpCost: 1,
    description: 'You project a spectral, translucent hand. It can manipulate objects, open unlocked doors, retrieve items (up to 10 pounds). Cannot attack or activate psychic items. Move up to 30 feet as a bonus action.',
    tags: ['utility'],
  },
  {
    id: 'biomantic-repair', name: 'Biomantic Repair', level: 0, school: 'Necromancy',
    castingTime: '1 action', range: 'Touch', components: ['V', 'S'],
    duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO',
    warpCost: 1,
    description: 'You channel a faint thread of biomantic energy into a living creature. The target regains 1 hit point. Alternatively, stabilize a creature at 0 HP without a Medicine check. No effect on undead or constructs.',
    tags: ['healing'],
  },
  {
    id: 'psychic-shock', name: 'Psychic Shock', level: 0, school: 'Evocation',
    castingTime: '1 action', range: 'Self (10-foot radius)', components: ['V', 'S'],
    duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL',
    warpCost: 1,
    description: 'You emit a sharp burst of undirected psychic force. Every creature within 10 feet (other than you) must succeed on an INT save or take 1d6 psychic damage.',
    higherLevels: 'Increases to 2d6 at 5th level and 3d6 at 10th level.',
    tags: ['damage'],
  },
  {
    id: 'phantom-visage', name: 'Phantom Visage', level: 0, school: 'Illusion',
    castingTime: '1 action', range: '30 feet', components: ['V', 'S'],
    duration: '1 minute', spellSource: 'psyker', discipline: 'TEL',
    warpCost: 1,
    description: 'You plant a minor psychic illusion near a point within range — a sound, an image of an object no larger than a 5-foot cube, or both. Investigation check (your power save DC) reveals it as psychic in origin.',
    tags: ['utility'],
  },
  {
    id: 'warp-sense-cantrip', name: 'Warp Sense', level: 0, school: 'Divination',
    castingTime: '1 action', range: 'Self', components: ['V', 'S'],
    duration: 'Concentration, up to 10 minutes', spellSource: 'psyker', discipline: 'DIV',
    warpCost: 1, isRitual: true,
    description: 'You open your awareness to Warp currents. For the duration, you sense active psychic powers, Warp-taint, daemonic entities, and Chaos corruption within 30 feet. You know direction and intensity but not precise source unless you use an action to focus.',
    tags: ['utility', 'sensory'],
  },
]

// ─── 1ST LEVEL POWERS — +2 Warp Points each ──────────────────────────────────

export const psykerPowers1st: Spell[] = [
  { id: 'smite', name: 'Smite', level: 1, school: 'Evocation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 2, description: 'Ranged power attack. On hit, 3d8 psychic damage.', higherLevels: '+1d8 per slot level above 1st.', alwaysPrepared: true, tags: ['damage'] },
  { id: 'psychic-shield', name: 'Psychic Shield', level: 1, school: 'Abjuration', castingTime: '1 reaction', range: '30 feet', components: ['V', 'S'], duration: '1 round', spellSource: 'psyker', discipline: 'ALL', warpCost: 2, description: 'Reaction when you or a creature within 30 ft is hit. Target gains +5 AC including against the triggering attack, until start of your next turn.', tags: ['defensive'] },
  { id: 'mind-link', name: 'Mind Link', level: 1, school: 'Enchantment', castingTime: '1 action', range: '30 feet', components: ['V', 'S'], duration: '1 hour', spellSource: 'psyker', discipline: 'TEL', warpCost: 2, isRitual: true, description: 'Forge a telepathic link between up to 8 willing creatures. Telepathic communication regardless of language, same plane.', alwaysPrepared: true, tags: ['utility'] },
  { id: 'iron-arm', name: 'Iron Arm', level: 1, school: 'Transmutation', castingTime: '1 bonus action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'BIO', warpCost: 2, description: 'Flesh hardens. AC becomes 16 + DEX modifier (if not already higher), advantage on STR checks and saves, unarmed strikes deal 1d6 + STR bludgeoning.', higherLevels: 'At 3rd level, AC becomes 18 + DEX modifier.', alwaysPrepared: true, tags: ['defensive'] },
  { id: 'warp-fire', name: 'Warp Fire', level: 1, school: 'Evocation', castingTime: '1 action', range: 'Self (15-foot cone)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR', warpCost: 2, description: 'Each creature in a 15-foot cone: DEX save. On failure, 3d6 fire damage; on success, half. Ignites flammable objects.', higherLevels: '+1d6 per slot level above 1st.', alwaysPrepared: true, tags: ['damage', 'fire'] },
  { id: 'psychic-scream', name: 'Psychic Scream', level: 1, school: 'Enchantment', castingTime: '1 action', range: 'Self (15-foot radius)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 2, description: 'Each creature within 15 feet: WIS save. On failure, 2d6 psychic damage and frightened until end of your next turn. On success, half damage, not frightened.', higherLevels: '+1d6 per slot level above 1st.', tags: ['damage', 'control'] },
  { id: 'precognition', name: 'Precognition', level: 1, school: 'Divination', castingTime: '1 bonus action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 2, description: "Can't be surprised, advantage on attack rolls, ability checks, and saves. Attacks against you have disadvantage.", higherLevels: 'At 5th level, duration becomes 10 minutes.', alwaysPrepared: true, tags: ['support', 'defensive'] },
  { id: 'force-push', name: 'Force Push', level: 1, school: 'Evocation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 2, description: 'STR save. On failure, target pushed 10 feet and knocked prone. On success, pushed 5 feet, remains standing. Targets Large or smaller.', higherLevels: 'At 3rd level, Huge. At 5th level, Gargantuan.', tags: ['control'] },
  { id: 'endurance', name: 'Endurance', level: 1, school: 'Abjuration', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: '8 hours', spellSource: 'psyker', discipline: 'BIO', warpCost: 2, description: 'Target gains 5 temporary HP and advantage on CON saves for the duration.', higherLevels: '+5 temporary HP per slot level above 1st.', alwaysPrepared: true, tags: ['support', 'defensive'] },
  { id: 'hallucination', name: 'Hallucination', level: 1, school: 'Illusion', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 2, description: "INT save. On failure, frightened of you, must Dash away each turn. Repeat save at end of each turn.", alwaysPrepared: true, tags: ['control'] },
  { id: 'warp-speed', name: 'Warp Speed', level: 1, school: 'Transmutation', castingTime: '1 bonus action', range: 'Touch', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'BIO', warpCost: 2, description: '+10 feet speed, +2 AC, advantage on DEX saves, Dash or Disengage as bonus action.', higherLevels: 'At 3rd level, speed +20 feet instead.', tags: ['support', 'movement'] },
  { id: 'objuration', name: 'Objuration', level: 1, school: 'Abjuration', castingTime: '1 reaction', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 2, description: 'Reaction when creature within 60 ft casts a power. Target saves vs your DC or their power fails (slot still consumed). Against Zealot prayers and Tech-Priest invocations, target saves with advantage.', tags: ['control'] },
  { id: 'soul-shriek', name: 'Soul Shriek', level: 1, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'TEL', warpCost: 2, description: 'WIS save. On failure, 2d8 psychic damage and deafened until end of your next turn. On success, half damage, not deafened.', higherLevels: '+1d8 per slot level above 1st.', tags: ['damage'] },
  { id: 'witch-mark', name: 'Witch-Mark', level: 1, school: 'Evocation', castingTime: '1 bonus action', range: '90 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 2, description: 'Brand a creature with a Warp-fire sigil. Your attacks and damaging powers deal extra 1d6 fire damage to the marked target. Target sheds dim light 5 ft and cannot benefit from invisibility.', tags: ['damage', 'fire'] },
  { id: 'glimpse-of-fate', name: 'Glimpse of Fate', level: 1, school: 'Divination', castingTime: '1 reaction', range: '30 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'DIV', warpCost: 2, description: 'Reaction when you or ally within 30 ft is attacked. Target adds 1d4 to AC against the triggering attack. If the attack misses as a result, target can immediately move 5 feet without provoking OA.', tags: ['defensive', 'support'] },
  { id: 'haemorrhage', name: 'Haemorrhage', level: 1, school: 'Necromancy', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 2, description: 'CON save. On failure, 2d10 necrotic damage. On success, half. No effect on constructs or creatures without blood.', higherLevels: '+1d10 per slot level above 1st.', tags: ['damage'] },
]

// ─── 2ND LEVEL POWERS — +3 Warp Points each ──────────────────────────────────

export const psykerPowers2nd: Spell[] = [
  { id: 'puppet-master', name: 'Puppet Master', level: 2, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 3, description: "Override a humanoid's motor control. WIS save. On failure, paralyzed. Repeat save each turn. While paralyzed, use bonus action to force target to move its speed and/or make one attack (using its statistics).", higherLevels: 'Duration 10 minutes at 5th level.', tags: ['control'] },
  { id: 'mind-scan', name: 'Mind Scan', level: 2, school: 'Divination', castingTime: '1 action', range: '30 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 3, isRitual: true, description: "Probe a creature's mind. INT save. On failure, read surface thoughts, advantage on CHA checks against it, learn one specific fact. Target unaware unless succeeds by 5+.", tags: ['utility'] },
  { id: 'biomantic-healing', name: 'Biomantic Healing', level: 2, school: 'Evocation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 3, description: 'Target regains 2d8 + your psychic ability modifier HP. No effect on undead or constructs.', higherLevels: '+1d8 per slot level above 2nd.', tags: ['healing'] },
  { id: 'warp-blast', name: 'Warp Blast', level: 2, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 3, description: 'Detonation of raw Warp energy at a point. 20-foot radius. DEX save. On failure, 4d6 force damage. On success, half.', higherLevels: '+1d6 per slot level above 2nd.', tags: ['damage'] },
  { id: 'psychic-shroud', name: 'Psychic Shroud', level: 2, school: 'Illusion', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Concentration, up to 1 hour', spellSource: 'psyker', discipline: 'TEL', warpCost: 3, description: 'Target becomes invisible. Ends if target attacks or casts.', higherLevels: 'At 4th level, 2 targets. At 6th level, 4 targets.', tags: ['utility'] },
  { id: 'life-leech', name: 'Life Leech', level: 2, school: 'Necromancy', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 3, description: 'Ranged power attack. On hit, 3d10 necrotic damage. You regain HP equal to half damage dealt.', higherLevels: '+1d10 per slot level above 2nd.', tags: ['damage', 'healing'] },
  { id: 'levitation', name: 'Levitation', level: 2, school: 'Transmutation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 10 minutes', spellSource: 'psyker', discipline: 'ALL', warpCost: 3, isRitual: true, description: 'Telekinetically lift one creature or object (up to 500 lbs). Unwilling: CON save. Move target 20 feet in any direction as bonus action. Repeat save each turn.', tags: ['control', 'utility'] },
  { id: 'psychic-barrage', name: 'Psychic Barrage', level: 2, school: 'Evocation', castingTime: '1 action', range: 'Self (30-foot cone)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 3, description: '30-foot cone. INT save. On failure, 3d8 psychic damage and disadvantage on next attack roll. On success, half damage, no other effect.', higherLevels: '+1d8 per slot level above 2nd.', tags: ['damage'] },
  { id: 'warp-mirror', name: 'Warp Mirror', level: 2, school: 'Illusion', castingTime: '1 reaction', range: 'Self', components: ['V', 'S'], duration: '1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 3, description: 'Create 3 illusory duplicates. When attacked while duplicates remain, roll d20. On 11+, attack strikes a duplicate, destroying it. Ends when all destroyed or duration expires.', tags: ['defensive'] },
  { id: 'psychic-communion', name: 'Psychic Communion', level: 2, school: 'Enchantment', castingTime: '1 minute', range: 'Unlimited (same plane)', components: ['V', 'S'], duration: '1 round', spellSource: 'psyker', discipline: 'TEL', warpCost: 3, isRitual: true, description: 'Project a telepathic message across any distance to a creature you are personally familiar with. Up to 25 words. Target recognizes you and can reply with equal length.', tags: ['utility'] },
  { id: 'inferno-bolts', name: 'Inferno Bolts', level: 2, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR', warpCost: 3, description: 'Conjure three bolts of Warp-fire. Ranged power attack per bolt. Each deals 2d6 fire damage. If 2+ bolts hit same creature, CON save or catch fire (1d4 per turn).', higherLevels: '+1 bolt per slot level above 2nd.', tags: ['damage', 'fire'] },
  { id: 'temporal-warning', name: 'Temporal Warning', level: 2, school: 'Divination', castingTime: '1 bonus action', range: 'Touch', components: ['V', 'S'], duration: '8 hours', spellSource: 'psyker', discipline: 'DIV', warpCost: 3, isRitual: true, description: "Target cannot be surprised, has advantage on initiative rolls, and awakens immediately if danger approaches during sleep.", tags: ['support'] },
  { id: 'immolate', name: 'Immolate', level: 2, school: 'Evocation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 3, description: "DEX save. On failure, 3d6 fire damage immediately and 2d6 per turn. CON save (action) to extinguish. On success, half initial, no ignition. Water does not extinguish Warp-fire.", tags: ['damage', 'fire'] },
  { id: 'compel', name: 'Compel', level: 2, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V'], duration: '1 round', spellSource: 'psyker', discipline: 'TEL', warpCost: 3, description: 'WIS save. On failure, creature must follow a one-word command on its next turn: Approach, Drop, Flee, Grovel, or Halt.', higherLevels: '+1 additional target per slot level above 2nd.', tags: ['control'] },
]

// ─── 3RD LEVEL POWERS — +4 Warp Points each ──────────────────────────────────

export const psykerPowers3rd: Spell[] = [
  { id: 'warp-inferno', name: 'Warp Inferno', level: 3, school: 'Evocation', castingTime: '1 action', range: '150 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR', warpCost: 4, description: '20-foot radius. DEX save. On failure, 8d6 fire damage. On success, half. Ignites flammable objects. Leaves scorched crater radiating faint Warp energy for 1 hour.', higherLevels: '+1d6 per slot level above 3rd.', tags: ['damage', 'fire'] },
  { id: 'psychic-lightning', name: 'Psychic Lightning', level: 3, school: 'Evocation', castingTime: '1 action', range: 'Self (100-foot line)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 4, description: '100-foot line, 5 ft wide. DEX save. On failure, 6d6 lightning damage. On success, half. Metal armor/heavy cybernetics: save with disadvantage.', higherLevels: '+1d6 per slot level above 3rd.', tags: ['damage'] },
  { id: 'mass-hallucination', name: 'Mass Hallucination', level: 3, school: 'Illusion', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 4, description: 'Choose up to 6 creatures. INT save. On failure, disadvantage on attack rolls and ability checks, cannot take reactions. Repeat save each turn.', tags: ['control'] },
  { id: 'warp-teleport', name: 'Warp Teleport', level: 3, school: 'Conjuration', castingTime: '1 action', range: '500 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 4, description: 'Teleport yourself and up to 8 willing creatures you can touch to an unoccupied space you can see within range.', higherLevels: 'At 5th level, range becomes 1 mile.', tags: ['utility', 'movement'] },
  { id: 'living-lightning', name: 'Living Lightning', level: 3, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 4, description: '5-foot sphere of crackling Warp-lightning. When it appears and at start of each turn, creatures within 10 feet: DEX save, 4d6 lightning damage (half on success). Move 30 feet as bonus action.', higherLevels: '+1d6 per slot level above 3rd.', tags: ['damage'] },
  { id: 'mental-fortress', name: 'Mental Fortress', level: 3, school: 'Abjuration', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: '8 hours', spellSource: 'psyker', discipline: 'TEL', warpCost: 4, description: 'Immune to psychic damage, cannot be charmed, frightened, or mind-read. Divination powers targeting the creature automatically fail.', tags: ['defensive'] },
  { id: 'biomantic-enhancement', name: 'Biomantic Enhancement', level: 3, school: 'Transmutation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'BIO', warpCost: 4, description: '+2 to STR, DEX, or CON (your choice). Advantage on checks/saves using that ability. +1d6 melee weapon damage if STR is chosen.', higherLevels: 'At 6th level, bonus becomes +4.', tags: ['support'] },
  { id: 'force-barrier', name: 'Force Barrier', level: 3, school: 'Abjuration', castingTime: '1 action', range: 'Self (10-foot radius)', components: ['V', 'S'], duration: 'Concentration, up to 10 minutes', spellSource: 'psyker', discipline: 'ALL', warpCost: 4, description: 'Invisible dome of telekinetic force. Creatures inside when formed can pass freely; nothing from outside can enter. AC 15, 100 HP. If shattered, creatures within 5 feet take 2d6 force damage.', higherLevels: '+20 HP per slot level above 3rd.', tags: ['defensive'] },
  { id: 'psychic-plague', name: 'Psychic Plague', level: 3, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 4, description: 'INT save. On failure, 4d8 psychic damage immediately and 2d8 at start of each turn. Repeat save each turn.', higherLevels: '+1d8 initial damage per slot level above 3rd.', tags: ['damage'] },
  { id: 'prescience', name: 'Prescience', level: 3, school: 'Divination', castingTime: '1 action', range: '30 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 4, description: 'Target rolls 2d20 and uses either result for attack rolls and saving throws.', tags: ['support'] },
  { id: 'biomantic-reconstruction', name: 'Biomantic Reconstruction', level: 3, school: 'Evocation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 4, description: 'Target regains 4d8 + psychic ability modifier HP. End one condition: blinded, deafened, paralyzed, or poisoned. Can mend broken bones but not regrow limbs.', higherLevels: '+1d8 per slot level above 3rd.', tags: ['healing'] },
  { id: 'pyre-of-the-warp', name: 'Pyre of the Warp', level: 3, school: 'Evocation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 4, description: '10-foot tall pillar of Warp-fire (5-foot radius). Creatures entering or starting turn: DEX save, 4d8 fire damage (half on success). Move 30 feet as bonus action. Ignites flammable objects.', higherLevels: '+1d8 per slot level above 3rd.', tags: ['damage', 'fire', 'control'] },
  { id: 'thread-sight', name: 'Thread Sight', level: 3, school: 'Divination', castingTime: '1 action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 10 minutes', spellSource: 'psyker', discipline: 'DIV', warpCost: 4, isRitual: true, description: 'See invisible creatures/objects, detect illusions automatically, see true form of shapechangers, perceive into the thin border of the Warp overlapping realspace out to 120 feet.', tags: ['sensory', 'utility'] },
]

// ─── 4TH LEVEL POWERS — +5 Warp Points each ──────────────────────────────────

export const psykerPowers4th: Spell[] = [
  { id: 'vortex-of-doom', name: 'Vortex of Doom', level: 4, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'ALL', warpCost: 5, description: 'Miniature Warp vortex, 10-foot radius. Each turn: CON save. On failure, 6d6 force damage and pulled 10 feet toward center. On success, half damage, not pulled. Center: restrained until next turn.', higherLevels: '+1d6 per slot level above 4th.', tags: ['damage', 'control'] },
  { id: 'psychic-shriek', name: 'Psychic Shriek', level: 4, school: 'Evocation', castingTime: '1 action', range: 'Self (30-foot cone)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 5, description: '30-foot cone. INT save. On failure, 8d6 psychic damage and stunned until end of your next turn. On success, half damage, not stunned. Creatures reduced to 0 HP die instantly.', higherLevels: '+2d6 per slot level above 4th.', tags: ['damage', 'control'] },
  { id: 'gate-of-infinity', name: 'Gate of Infinity', level: 4, school: 'Conjuration', castingTime: '1 action', range: '1 mile', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 5, description: 'Teleport you and up to 8 willing creatures to a location within range you can clearly visualize or have visited. If occupied space, 4d6 force damage and teleport fails.', tags: ['utility', 'movement'] },
  { id: 'biomantic-regeneration', name: 'Biomantic Regeneration', level: 4, school: 'Evocation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'BIO', warpCost: 5, description: 'Target regains 10 HP at start of each turn. Severed minor extremities regrow. Fire/acid prevents regeneration for 1 turn. No effect on undead/constructs.', higherLevels: '+5 HP per slot level above 4th.', tags: ['healing'] },
  { id: 'dominate', name: 'Dominate', level: 4, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 5, description: "Seize control of a humanoid's mind. WIS save. On failure, you decide actions, movement, reactions. Perceive through senses as bonus action. Repeat save each time it takes damage.", higherLevels: 'At 6th level, duration 10 minutes.', tags: ['control'] },
  { id: 'force-storm', name: 'Force Storm', level: 4, school: 'Evocation', castingTime: '1 action', range: '150 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'ALL', warpCost: 5, description: '20-foot radius, 40-foot cylinder. STR save: on failure, 4d10 bludgeoning and knocked prone; success, half, not prone. Area = difficult terrain. Start of each of your turns, creatures in area take 2d10 bludgeoning (no save).', higherLevels: '+1d10 initial per slot level above 4th.', tags: ['damage', 'control'] },
  { id: 'null-zone', name: 'Null Zone', level: 4, school: 'Abjuration', castingTime: '1 action', range: 'Self (30-foot radius)', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'ALL', warpCost: 5, description: 'Anti-psychic field. Psykers in zone: disadvantage on power attacks, save DCs reduced by 2. Creatures: advantage on saves vs psychic powers. Active psychic effects suppressed. Daemons: disadvantage on all rolls. You are NOT immune to your own Null Zone.', tags: ['control'] },
  { id: 'temporal-distortion', name: 'Temporal Distortion', level: 4, school: 'Transmutation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 5, description: 'Choose Accelerate (willing: extra action, speed doubled, +2 AC, incapacitated 1 turn when ended) or Decelerate (unwilling: WIS save, on failure speed halved, -2 AC/DEX saves, no reactions, action OR bonus action only, repeat save each turn).', tags: ['support', 'control'] },
  { id: 'warp-conflagration', name: 'Warp Conflagration', level: 4, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR', warpCost: 5, description: '40-foot radius. DEX save. On failure, 6d6 fire + 3d6 psychic damage. On success, half. Area ablaze for 1 minute (2d6 fire damage to creatures entering or starting turn there).', tags: ['damage', 'fire'] },
  { id: 'psychic-surgery', name: 'Psychic Surgery', level: 4, school: 'Transmutation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: '1 hour', spellSource: 'psyker', discipline: 'BIO', warpCost: 5, isRitual: true, description: 'Choose one: cure disease/neutralize poison; remove one exhaustion level; restore one lost sense; mend one broken bone/organ; or reduce Corruption by 1d4 points (you take 2d6 psychic damage absorbing taint). Cannot regrow limbs.', tags: ['healing', 'utility'] },
]

// ─── 5TH LEVEL POWERS — +6 Warp Points each ──────────────────────────────────

export const psykerPowers5th: Spell[] = [
  { id: 'warp-rift', name: 'Warp Rift', level: 5, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'ALL', warpCost: 6, description: 'Screaming wound in reality (10 ft diameter). Each turn, creatures within 20 ft: CHA save. On failure, 6d10 force damage and 1d4 Corruption. On success, half damage, no Corruption. 50% chance each round (d20: 11+) of disgorging 1d3 lesser daemons hostile to all.', higherLevels: '+1d10 per slot level above 5th.', tags: ['damage'] },
  { id: 'psychic-annihilation', name: 'Psychic Annihilation', level: 5, school: 'Enchantment', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'TEL', warpCost: 6, description: 'INT save. On failure, 10d10 psychic damage and stunned 1 minute (repeat save each turn). On success, half damage, not stunned. If reduced to 0 HP, head ruptures — only 6th+ level powers can revive.', tags: ['damage'] },
  { id: 'mass-biomantic-healing', name: 'Mass Biomantic Healing', level: 5, school: 'Evocation', castingTime: '1 action', range: '60 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 6, description: 'Up to 6 creatures regain 3d8 + psychic ability modifier HP. End one condition per target: blinded, deafened, paralyzed, poisoned, or one exhaustion level.', higherLevels: '+1d8 per slot level above 5th.', tags: ['healing'] },
  { id: 'perfect-prescience', name: 'Perfect Prescience', level: 5, school: 'Divination', castingTime: '1 bonus action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 6, description: "Can't be surprised, advantage on all attacks/checks/saves, attacks against you have disadvantage, two reactions per round. Eyes glow solid silver.", tags: ['support', 'defensive'] },
  { id: 'force-cage', name: 'Force Cage', level: 5, school: 'Evocation', castingTime: '1 action', range: '100 feet', components: ['V', 'S'], duration: '1 hour', spellSource: 'psyker', discipline: 'ALL', warpCost: 6, description: 'Choose cage (10-foot cube, bars with 1-inch gaps) or box (airtight 10-foot cube). Nothing passes through. AC 20, 200 HP, immune to psychic damage. Escape: CHA save DC 20, failure = 4d10 force damage.', tags: ['control'] },
  { id: 'warp-time', name: 'Warp Time', level: 5, school: 'Transmutation', castingTime: '1 action', range: 'Self', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'DIV', warpCost: 6, description: 'Take one additional turn immediately while time is frozen for all others. Cannot affect frozen creatures or objects held by them. Once per long rest without a slot; subsequent uses require a slot.', tags: ['support'] },
  { id: 'soul-storm', name: 'Soul Storm', level: 5, school: 'Evocation', castingTime: '1 action', range: 'Self (60-foot radius)', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'PYR', warpCost: 6, description: '60-foot radius. DEX save. On failure, 8d8 fire damage and set ablaze (2d8 per turn, action to extinguish). On success, half, not ignited. You are immune. All flammable objects within 60 feet ignite.', tags: ['damage', 'fire'] },
  { id: 'telepathic-network', name: 'Telepathic Network', level: 5, school: 'Enchantment', castingTime: '1 action', range: '1 mile', components: ['V', 'S'], duration: '24 hours', spellSource: 'psyker', discipline: 'TEL', warpCost: 6, isRitual: true, description: 'Link up to 12 willing creatures. Telepathic communication regardless of language/distance (same plane), always know direction and distance to linked creatures, advantage on saves vs charmed/frightened while network persists.', tags: ['support', 'utility'] },
  // Discipline Mastery powers
  { id: 'biomantic-apotheosis', name: 'Biomantic Apotheosis', level: 5, school: 'Transmutation', castingTime: '1 action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'BIO', warpCost: 6, description: 'Biomancer Mastery Only. Transform: STR and CON +4 (max 24), natural weapons 2d8 + STR, 30 temp HP, regen 5 HP/turn, resistance to nonmagical physical, unarmed reach 10 ft. 1 exhaustion when ended.', tags: ['damage', 'defensive'] },
  { id: 'inferno-incarnate', name: 'Inferno Incarnate', level: 5, school: 'Evocation', castingTime: '1 action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 6, description: 'Pyromancer Mastery Only. Become pure Warp-fire: fly 60 ft, immune to fire/radiant, melee attackers take 2d8 fire, creatures within 10 ft take PA mod + prof fire damage, [PYR] powers +2d6 fire. When ended, 4d6 fire in 30 ft radius (DEX half).', tags: ['damage', 'movement'] },
  { id: 'psychic-dominion', name: 'Psychic Dominion', level: 5, school: 'Enchantment', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'TEL', warpCost: 6, description: "Telepath Mastery Only. Choose up to 6 creatures. WIS save. On failure, you decide their actions/movement/reactions each turn. Repeat save each turn. INT 8+ save with disadvantage. Perceive through any dominated creature's senses as bonus action.", tags: ['control'] },
  { id: 'temporal-manipulation', name: 'Temporal Manipulation', level: 5, school: 'Transmutation', castingTime: '1 action', range: 'Self', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'DIV', warpCost: 6, description: 'Diviner Mastery Only. Each turn choose: Accelerate (extra action — one attack, Dash, Disengage, Hide, Use Object), Rewind (return to previous position, regain damage taken max 20 HP), or Freeze (one creature within 60 ft WIS save or speed 0, no reactions). Disadvantage on attacks/checks when ended.', tags: ['support', 'control'] },
]

// ─── 6TH LEVEL POWERS — +7 Warp Points each ──────────────────────────────────

export const psykerPowers6th: Spell[] = [
  { id: 'psychic-storm', name: 'Psychic Storm', level: 6, school: 'Evocation', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'ALL', warpCost: 7, description: '60-foot radius. WIS save. On failure, 8d8 psychic damage and stunned until end of your next turn. On success, half, not stunned. Fail by 5+: stunned 1 minute (repeat save each turn). Detectable by any psyker within 1 mile.', tags: ['damage', 'control'] },
  { id: 'mass-domination', name: 'Mass Domination', level: 6, school: 'Enchantment', castingTime: '1 action', range: '90 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 hour', spellSource: 'psyker', discipline: 'TEL', warpCost: 7, description: 'Up to 4 humanoids. WIS save. On failure, charmed — regards you as trusted ally, follows spoken suggestions. Repeat save when damaged. Unaware they were charmed when effect ends.', tags: ['control'] },
  { id: 'biomantic-resurrection', name: 'Biomantic Resurrection', level: 6, school: 'Necromancy', castingTime: '1 minute', range: 'Touch', components: ['V', 'S', 'M'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 7, description: 'Reverse cellular death on a creature that died within last 10 minutes. Returns with all HP. Neutralizes poisons, cures nonmagical diseases. 2 exhaustion levels. Cannot restore: old age death, missing vital organs, souls consumed by Warp entities.', tags: ['healing'] },
  { id: 'true-seeing', name: 'True Seeing', level: 6, school: 'Divination', castingTime: '1 action', range: 'Touch', components: ['V', 'S', 'M'], duration: '1 hour', spellSource: 'psyker', discipline: 'DIV', warpCost: 7, isRitual: true, description: 'Truesight 120 ft: see through darkness, detect invisible, perceive illusions automatically, see true form of shapechanged creatures, perceive faint Warp-echoes of recent psychic events (within last hour).', tags: ['sensory', 'utility'] },
  { id: 'immaterium-breach', name: 'Immaterium Breach', level: 6, school: 'Evocation', castingTime: '1 action', range: '150 feet', components: ['V', 'S'], duration: 'Concentration, up to 1 minute', spellSource: 'psyker', discipline: 'PYR', warpCost: 7, description: 'Wall of Warp-fire up to 100 ft long, 20 ft high, 5 ft thick. One side radiates 5d8 fire to creatures within 10 ft. Entering or starting turn inside: 7d8 fire. Cannot be extinguished by nonmagical means. Killed creatures reduced to ash — only 6th+ level powers can revive.', tags: ['damage', 'fire', 'control'] },
  { id: 'precognitive-collapse', name: 'Precognitive Collapse', level: 6, school: 'Divination', castingTime: '1 action', range: '120 feet', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'DIV', warpCost: 7, description: 'Force all timelines to collapse into catastrophe for one creature. CHA save. On failure, 10d8 psychic damage, ages 1d10 years, disadvantage on all ability checks and saves for 24 hours. On success, half damage, no other effects. No effect on constructs or psychic-immune creatures.', tags: ['damage'] },
  { id: 'fleshcraft', name: 'Fleshcraft', level: 6, school: 'Transmutation', castingTime: '1 action', range: 'Touch', components: ['V', 'S'], duration: 'Instantaneous', spellSource: 'psyker', discipline: 'BIO', warpCost: 7, description: 'Radical biomantic restructuring on a willing or unconscious creature. Choose one: regrow a lost limb (1 minute, target incapacitated); permanently alter appearance to any humanoid form; remove one permanent Corruption mutation; or permanently grant darkvision 60 ft, +1 natural AC, or water breathing. Only one permanent Fleshcraft alteration at a time.', tags: ['healing', 'utility'] },
  { id: 'communion-of-minds', name: 'Communion of Minds', level: 6, school: 'Enchantment', castingTime: '1 action', range: 'Self (60-foot radius)', components: ['V', 'S'], duration: 'Concentration, up to 10 minutes', spellSource: 'psyker', discipline: 'TEL', warpCost: 7, description: 'All willing creatures within 60 ft linked: share senses (perceive through any linked creature as bonus action), cannot be surprised, advantage on initiative, +2 to attacks vs enemies adjacent to a linked ally, share language. If linked creature drops to 0 HP, all others take 1d6 psychic damage.', tags: ['support', 'utility'] },
]

// ─── All Powers Combined ──────────────────────────────────────────────────────

export const allPsykerPowers: Spell[] = [
  ...psykerCantrips,
  ...psykerPowers1st,
  ...psykerPowers2nd,
  ...psykerPowers3rd,
  ...psykerPowers4th,
  ...psykerPowers5th,
  ...psykerPowers6th,
]
