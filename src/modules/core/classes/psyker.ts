import type { CharacterClass } from '../../../types/module'

export const psyker: CharacterClass = {
  id: 'psyker',
  name: 'Psyker',
  description:
    "You are cursed — blessed and damned in equal measure. A psyker carries within them a soul that burns too brightly. You can hear the whispers of the Warp, feel the pull of entities beyond the veil, and channel power that can reshape flesh, shatter minds, immolate worlds, or glimpse fate itself. Every time you reach into the Immaterium, you risk catastrophe. Every power you manifest cracks open a door to a realm of nightmares. And yet you must use these gifts, because the Imperium needs weapons it can barely control.",
  hitDie: 6,
  primaryAbility: ['intelligence', 'wisdom'],
  savingThrows: ['intelligence', 'wisdom'],
  skillChoices: [
    'deception',
    'history',
    'insight',
    'intimidation',
    'investigation',
    'medicine',
    'perception',
    'persuasion',
    'religion',
  ],
  numSkillChoices: 2,
  armorProficiencies: [],
  weaponProficiencies: ['daggers', 'quarterstaffs', 'light crossbows', 'stub guns', 'laspistols'],
  toolProficiencies: [],
  startingEquipmentOptions: [
    '(a) A laspistol and 2 power packs or (b) A stub gun and 20 rounds',
    '(a) A quarterstaff or (b) A dagger',
    "(a) Scholar's pack or (b) Explorer's pack",
    'A Psychic Focus crystal (worth 50 Thrones)',
    'Sanctioning brand (if Sanctioned) or concealment tools (if Unsanctioned)',
  ],
  startingEquipmentResolved: {
    0: { a: ['laspistol'],    b: ['stub-pistol'] },
    1: { a: ['quarterstaff'], b: ['combat-knife'] },
    2: { a: [],               b: [] },
    3: { grant: [] },
    4: { grant: [] },
  },
  startingWealthFormula: '3d4 × 10 Thrones',

  featureTabName: 'Warp Disciplines',
  subclassLabel: 'Discipline',

  classResource: {
    name: 'Warp Bar',
    type: 'bar',
    maxFormula: '20',
    resetOn: 'short',
    playerVisible: true,
    description:
      'Every psychic power fills the Warp Bar. Cantrips add +1; leveled powers add level + 1. At 20 (25 at level 10), you must roll on the Perils of the Warp table. The bar resets to 0 after Perils triggers. Reduces by 1d6 on short rest.',
  },

  features: [
    // ── Level 1 ──────────────────────────────────────────────────────
    {
      level: 1,
      name: 'Psychic Powers (Spellcasting)',
      description:
        'You channel raw Warp energy through force of will.\n\n' +
        '**Psychic Ability:** Choose INT or WIS at 1st level (permanent). Power Save DC = 8 + proficiency + psychic ability modifier. Power Attack Bonus = proficiency + psychic ability modifier.\n\n' +
        '**Power Slots:** See class table. Restored on long rest.\n\n' +
        '**Preparing Powers:** After long rest, prepare Psyker level + psychic ability modifier (minimum 1) powers from the Psyker Power List.\n\n' +
        "**Cantrips:** Always available, don't count against prepared. Still generate +1 Warp Point each.\n\n" +
        '**Warp Points:** Cantrips +1; leveled powers = level + 1. When Warp Bar reaches 20, roll on Perils of the Warp table.\n\n' +
        '**Ritual Casting:** Powers with the ritual tag can be cast in 10 extra minutes without consuming a slot. Still generates Warp Points.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Sanctioning Status',
      description:
        '[CHOOSE ONE] Choose your Sanctioning Status at 1st level. This choice is permanent.\n\n' +
        '**Sanctioned Psyker** (Soul-bound to the Emperor):\n' +
        "• Emperor's Ward: +2 to WIS saves vs Perils. +1 to Perils table rolls (+2 at L5, +3 at L9).\n" +
        '• Disciplined Mind: Meditation as bonus action 1/long rest. Reduce Warp Bar by 1d4 + PA mod on short rest meditation.\n' +
        '• Imperial Authority: Proficiency in Religion. Recognized as sanctioned.\n' +
        '• DRAWBACK — The Dampening: Power save DC reduced by 1.\n' +
        '• DRAWBACK — Bound to the Throne: Cannot learn powers from Forbidden Tomes or Chaos grimoires.\n\n' +
        '**Unsanctioned Psyker** (Raw, unshackled, hunted):\n' +
        '• Unbound Power: Power save DC increased by +1. When Pushing, choose two bonuses instead of one.\n' +
        '• Warp Intuition: Proficiency in Deception. Advantage on saves vs other psyker powers.\n' +
        '• Hidden Gift: Deception check to suppress psychic aura for 1 hour.\n' +
        '• DRAWBACK — Warp Hunger: +1 additional Warp Point per leveled power cast.\n' +
        '• DRAWBACK — Hunted: Detection by Divine/Warp Sense reveals you as unsanctioned.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Psychic Focus',
      description:
        'An object that serves as a conduit for Warp energy — a crystal shard, carved bone fetish, sanctified skull, or engraved amulet.\n\n' +
        '**While holding your Focus:**\n' +
        '• Concentration Anchor: +1 to CON saves to maintain concentration on powers.\n' +
        '• Spell Focus: Serves as material component for any power without a specific cost.\n' +
        '• Warp Conduit: 1/short rest, cast a cantrip with 0 Warp Points.\n\n' +
        '**Focus Integrity:** 3 points. Each time you trigger Perils (Warp Bar reaches max), focus loses 1 Integrity regardless of Perils result.\n\n' +
        '**Cracked Focus (0 Integrity):** Lose Concentration Anchor and Warp Conduit. Gain +1 additional Warp Point per casting.\n\n' +
        '**Repairing:** 1 hour meditation during rest restores 1 point. Crystal wright can fully restore for 100 Thrones/point.',
      featureType: 'base',
      actionType: 'passive',
    },

    // ── Level 2 ──────────────────────────────────────────────────────
    {
      level: 2,
      name: 'Warp Echo',
      description:
        'When you cast a psychic power of 1st level or higher, you gain a Warp Echo effect based on your discipline. Lasts until the start of your next turn. Only one echo active at a time (new casting replaces current). Cantrips do not trigger echoes.\n\n' +
        "**Biomancer — Vital Surge:** Gain temporary HP equal to the power's level.\n" +
        '**Pyromancer — Immolation Aura:** Creatures hitting you in melee within 5 ft take 1d4 fire damage.\n' +
        '**Telepath — Psychic Awareness:** Sense surface emotions of all creatures within 30 ft. Cannot be surprised.\n' +
        '**Diviner — Precognitive Flicker:** +1 to AC and saving throws.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 2,
      name: 'Warp Sense',
      description:
        'You automatically sense Warp-taint, psychic activity, and daemonic presence within 60 feet (no check required). You know direction and intensity (minor/moderate/severe/catastrophic). Use an action + INT (Arcana) or WIS (Perception) check DC 12 for specific details.\n\nYou also have advantage on saving throws against environmental Warp effects (Warp storms, tainted zones, corrupted artifacts).',
      featureType: 'base',
      actionType: 'passive',
      tags: ['sensory', 'utility'],
    },

    // ── Level 3 ──────────────────────────────────────────────────────
    {
      level: 3,
      name: 'Psychic Resilience',
      description:
        'You gain proficiency in Constitution saving throws. If you already have CON save proficiency (from multiclass or other source), you instead gain proficiency in the ability score (INT or WIS) that is NOT your psychic ability.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
    },

    // ── Level 4 ──────────────────────────────────────────────────────
    {
      level: 4,
      name: 'Ability Score Improvement',
      description: "You can increase one ability score by 2, or two by 1. Can't exceed 20. Alternatively, choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ── Level 5 ──────────────────────────────────────────────────────
    {
      level: 5,
      name: 'Focus Evolution',
      description:
        'Your Psychic Focus evolves.\n\n' +
        '**Increased Integrity:** Maximum Integrity Points increases to 5.\n\n' +
        '**Amplified Conduit:** While holding focus, power save DC increases by +1.\n\n' +
        '**Improved Warp Conduit:** Use Warp Conduit (0 Warp Point cantrip) a number of times equal to your proficiency bonus per short rest.\n\n' +
        '**Emergency Absorption:** 1/long rest, when Perils would trigger, channel excess into focus. Warp Bar resets to 10 (not 0), Perils does not trigger. Focus loses 2 Integrity Points. If this would Crack the focus, you take 2d6 psychic damage from overflow.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 5,
      name: 'Empowered Casting',
      description:
        'When you cast a psychic power that deals damage, add your psychic ability modifier to one damage roll of the power.\n\nWhen you cast a power that requires a saving throw but deals no damage, impose −1 penalty to the first saving throw against it.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['damage'],
    },

    // ── Level 7 ──────────────────────────────────────────────────────
    {
      level: 7,
      name: 'Improved Warp Echo',
      description:
        'Your Warp Echoes intensify.\n\n' +
        '**Biomancer — Regenerative Surge:** Temporary HP = power level × 2. Also gain resistance to one damage type of your choice until echo fades.\n\n' +
        '**Pyromancer — Inferno Aura:** Melee attackers within 5 ft take 1d6 fire damage (up from 1d4). Creatures ending their turn within 5 ft take fire damage equal to your psychic ability modifier.\n\n' +
        "**Telepath — Mind Reader:** Read surface thoughts (not just emotions) of all creatures within 30 ft. Advantage on CHA checks and attack rolls against creatures whose thoughts you read. They don't know unless they succeed on INT save vs your DC.\n\n" +
        '**Diviner — Foresight Flash:** +2 to AC and saves (up from +1). First attack against you while echo is active has disadvantage.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 7,
      name: 'Psychic Fortitude',
      description:
        '**Iron Will.** Advantage on saves against being charmed, frightened, or having your mind read.\n\n**Psychic Backlash.** When you succeed on a save against a psychic power or effect, use your reaction to deal 2d6 psychic damage to the source (within 60 ft, must see it). Uses: Proficiency bonus per long rest.',
      featureType: 'base',
      actionType: 'reaction',
      usesPerRest: 'long',
      usesCount: 'proficiency',
      tags: ['defensive', 'damage'],
    },

    // ── Level 8 ──────────────────────────────────────────────────────
    {
      level: 8,
      name: 'Ability Score Improvement',
      description: "You can increase one ability score by 2, or two by 1. Can't exceed 20. Alternatively, choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ── Level 10 ─────────────────────────────────────────────────────
    {
      level: 10,
      name: 'Ability Score Improvement',
      description: "You can increase one ability score by 2, or two by 1. Can't exceed 20. Alternatively, choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 10,
      name: 'Master of the Warp',
      description:
        '**Expanded Threshold.** Warp Bar maximum increases to 25 (Perils at 25 instead of 20). When Perils does trigger, roll with −2 penalty on the Perils table.\n\n' +
        '**Warp Mastery.** 1/long rest, when Warp Bar would reach max and trigger Perils, make WIS save DC 18. On success, Warp Bar resets to half max (12) and Perils does not trigger. On failure, Perils triggers but you have advantage on any saves within the Perils result.\n\n' +
        '**Perfected Focus.** Focus Integrity max increases to 7. Grants +2 to concentration saves (up from +1). 1/long rest, prevent focus Integrity loss entirely.\n\n' +
        '**Warp Echo Persistence.** Echo now lasts until end of your next turn (instead of start). Cantrips can now trigger your Warp Echo as though a 1st-level power was cast.',
      featureType: 'base',
      actionType: 'passive',
    },
  ],

  // ── SUBCLASSES (PSYCHIC DISCIPLINES) ─────────────────────────────────
  subclasses: [
    // ── 1. BIOMANCER ─────────────────────────────────────────────────
    {
      id: 'biomancer',
      name: 'Biomancer',
      description:
        "Biomancers are psykers whose souls resonate with the vital energies of the Warp — the raw forces of life, growth, death, and transformation. Where other psykers project outward, you turn power inward, reshaping your own flesh with terrifying precision. You are the tankiest psyker, the primary healer, and a capable melee combatant when enhanced.",
      unlockLevel: 1,
      flavorQuote: 'My flesh is my weapon. My body is my fortress. The Warp remakes me, and I remake the Warp.',
      identity: 'Self-enhancement, healing, biological manipulation',
      recommendedAbilities: 'WIS > CON > INT',
      features: [
        // Level 1
        { level: 1, name: 'Resilient Body', description: 'Your HP maximum increases by 1 for each Psyker level you have (retroactive). Effectively a d8 hit die.', featureType: 'core', actionType: 'passive', tags: ['defensive'] },
        { level: 1, name: 'Biomantic Attunement', description: 'When you cast a [BIO] power that targets yourself, you can use your Constitution modifier instead of your psychic ability modifier for the save DC or attack bonus.', featureType: 'main', actionType: 'passive' },
        { level: 1, name: 'Biological Awareness', description: "As an action, determine a creature's HP percentage (full/bloodied/critical), whether they are diseased or poisoned, and whether they have cybernetic augmentations. Range: 30 feet. No Warp Points.", featureType: 'main', actionType: 'action', tags: ['sensory', 'utility'] },
        // Level 3
        { level: 3, name: 'Enhanced Physiology', description: '[CORE] When you cast a [BIO] power on yourself, simultaneously gain one enhancement for the duration (or 1 minute if instantaneous): +2 STR, +2 DEX, or +2 CON. One at a time. New [BIO] self-cast replaces previous. Can exceed 20.', featureType: 'core', actionType: 'passive' },
        { level: 3, name: 'Life Tap', description: '[MAIN] Bonus action: Spend HP (up to Psyker level) to reduce Warp Bar by half the HP spent (rounded down, minimum 1). Uses: Proficiency bonus per long rest.', featureType: 'main', actionType: 'bonus-action', usesPerRest: 'long', usesCount: 'proficiency' },
        { level: 3, name: 'Biomantic Affinity', description: '[MAIN] Powers with the [BIO] tag cost 1 fewer Warp Point (minimum 1).', featureType: 'main', actionType: 'passive' },
        // Level 6
        { level: 6, name: 'Regenerative Casting', description: "[CORE] When you cast a [BIO] power of 2nd level or higher, regain HP equal to the power's level. Automatic, no action or Warp Point cost.", featureType: 'core', actionType: 'passive', tags: ['healing'] },
        { level: 6, name: 'Evolved Form', description: '[MAIN] Choose one permanent adaptation (changeable on long rest): Natural Weapons (1d6 + STR, magical), Climbing Speed 30 ft, Swimming Speed 30 ft + water breathing, or Enhanced Senses (darkvision 120 ft, advantage on smell/hearing Perception).', featureType: 'main', actionType: 'passive' },
        { level: 6, name: 'Life Link', description: "[CHOOSE ONE] When you cast a [BIO] power on an ally within 30 ft, both you and the ally regain HP equal to the power's level + your psychic ability modifier. Uses: Proficiency bonus per long rest.", featureType: 'option', optionGroup: 'biomancer-level-6', actionType: 'passive', tags: ['healing'] },
        { level: 6, name: 'Toxic Adaptation', description: "[CHOOSE ONE] Immune to poison damage, poisoned condition, and all diseases. As an action, touch a creature: CON save vs your DC or poisoned for 1 minute (repeat save each turn). Uses: Proficiency bonus per long rest.", featureType: 'option', optionGroup: 'biomancer-level-6', actionType: 'action', usesPerRest: 'long', usesCount: 'proficiency', tags: ['defensive'] },
        { level: 6, name: 'Maximized Healing', description: '[CHOOSE ONE] When you cast a [BIO] power that restores HP, you can maximize the healing (use max on each healing die). Once per short rest.', featureType: 'option', optionGroup: 'biomancer-level-6', actionType: 'free', usesPerRest: 'short', usesCount: '1', tags: ['healing'] },
        // Level 9
        { level: 9, name: 'Perfect Biology', description: "[CORE] You no longer age. Immune to all diseases and poisons. Ability scores can reach 22 through biomantic enhancement (Enhanced Physiology). Remove one exhaustion level automatically on long rest.", featureType: 'core', actionType: 'passive', tags: ['defensive'] },
        { level: 9, name: 'Biomantic Apotheosis (Master Power)', description: "[MAIN] You learn the exclusive power Biomantic Apotheosis (5th level, [BIO], Action, Self, Conc. up to 1 min, +6 Warp). Transform: STR and CON +4 (max 24), natural weapons 2d8 + STR, 30 temp HP, regenerate 5 HP/turn, resistance to nonmagical physical damage, unarmed reach 10 ft. Gain 1 exhaustion when it ends. Doesn't count against prepared.", featureType: 'main', actionType: 'action', tags: ['damage', 'defensive'] },
        { level: 9, name: 'Regeneration', description: '[CHOOSE ONE] Permanent passive: Regain 5 HP at start of each turn (if at least 1 HP). Fire and acid reduce this to 0 until start of next turn.', featureType: 'option', optionGroup: 'biomancer-level-9', actionType: 'passive', tags: ['healing'] },
        { level: 9, name: 'Adaptive Evolution', description: '[CHOOSE ONE] Reaction when you take damage: gain resistance to that damage type until end of your next turn. Uses: Proficiency bonus per long rest.', featureType: 'option', optionGroup: 'biomancer-level-9', actionType: 'reaction', usesPerRest: 'long', usesCount: 'proficiency', tags: ['defensive'] },
        { level: 9, name: 'Biomantic Apotheosis (Enhanced)', description: '[CHOOSE ONE] Apotheosis duration extends to 10 minutes, gain fly speed 30 ft, temp HP increases to 50, no exhaustion when it ends.', featureType: 'option', optionGroup: 'biomancer-level-9', sourceFeature: 'biomantic-apotheosis', actionType: 'passive', tags: ['damage', 'defensive', 'movement'] },
      ],
    },

    // ── 2. PYROMANCER ─────────────────────────────────────────────────
    {
      id: 'pyromancer',
      name: 'Pyromancer',
      description:
        "Pyromancers are psykers whose souls burn with the destructive energies of the Warp — channeling the Immaterium's fury as literal fire. Your power is not subtle. It is a roaring conflagration that reduces enemies to ash and lights the battlefield like a second sun. You are the primary area damage dealer, excelling at clearing rooms, denying terrain, and annihilating clustered enemies.",
      unlockLevel: 1,
      flavorQuote: 'I am the flame that purges. I am the fire that cleanses. I am the Warp made inferno.',
      identity: 'Area damage, fire control, terrain denial, destruction',
      recommendedAbilities: 'INT > CON > WIS',
      features: [
        // Level 1
        { level: 1, name: 'Inner Fire', description: 'Resistance to fire damage. When you take fire damage and reduce it with resistance, gain temporary HP equal to half the damage taken (after resistance).', featureType: 'core', actionType: 'passive', tags: ['defensive'] },
        { level: 1, name: 'Combustion', description: 'When you deal fire damage with a psychic power, force target to CON save vs your DC. On failure, target catches fire: 1d4 fire damage at start of each turn for 1 minute. Action to extinguish. Max ignited creatures = psychic ability modifier.', featureType: 'main', actionType: 'passive', tags: ['damage'] },
        { level: 1, name: 'Pyrokinetic Control', description: 'Action: manipulate nonmagical fire within 30 ft — extinguish up to 10 ft, double size up to 10 ft, shape flames, or change color. No Warp Points.', featureType: 'main', actionType: 'action', tags: ['utility'] },
        // Level 3
        { level: 3, name: 'Intensified Flames', description: '[CORE] Your fire damage from psychic powers ignores resistance to fire damage. Creatures immune to fire instead treat it as resistance (half damage instead of none).', featureType: 'core', actionType: 'passive', tags: ['damage'] },
        { level: 3, name: 'Selective Conflagration', description: '[MAIN] When you cast a [PYR] area power, exclude up to your psychic ability modifier creatures from the area. No extra Warp Points.', featureType: 'main', actionType: 'passive', tags: ['support'] },
        { level: 3, name: 'Pyromantic Affinity', description: '[MAIN] Powers with the [PYR] tag cost 1 fewer Warp Point (minimum 1).', featureType: 'main', actionType: 'passive' },
        // Level 6
        { level: 6, name: 'Firestorm Aura', description: '[CORE] When you cast a [PYR] power, all hostile creatures within 10 ft take fire damage equal to your psychic ability modifier. Once per casting, immediately after the power takes effect.', featureType: 'core', actionType: 'passive', tags: ['damage'] },
        { level: 6, name: 'Daemon-Fire', description: '[MAIN] Fire damage dice increase by one size (d4→d6, d6→d8, d8→d10, d10→d12) when targeting daemons, undead, or Chaos-corrupted creatures. Applies to all fire damage from your psychic powers.', featureType: 'main', actionType: 'passive', tags: ['damage'] },
        { level: 6, name: 'Flame Shield', description: '[CHOOSE ONE] Reaction when you take damage: create a burst of protective Warp-fire. Reduce incoming damage by 2d6. Creatures adjacent to you take fire damage equal to the reduction. Uses: Proficiency bonus per long rest.', featureType: 'option', optionGroup: 'pyromancer-level-6', actionType: 'reaction', usesPerRest: 'long', usesCount: 'proficiency', tags: ['defensive'] },
        { level: 6, name: 'Warp Fire Wall', description: '[CHOOSE ONE] Reaction when a creature within 60 ft attacks: create a wall of Warp-fire (5 ft high, 20 ft long, 1 ft thick) at a point within 60 ft. Lasts until start of your next turn. Passing through or starting turn within 5 ft: 3d8 fire damage. Uses: Proficiency bonus per long rest.', featureType: 'option', optionGroup: 'pyromancer-level-6', actionType: 'reaction', usesPerRest: 'long', usesCount: 'proficiency', tags: ['defensive', 'damage'] },
        { level: 6, name: 'Supercharged Flames', description: '[CHOOSE ONE] 1/short rest, when you cast a [PYR] power that deals fire damage, maximize the damage (use max on each die). Costs additional +1d4 Warp Points.', featureType: 'option', optionGroup: 'pyromancer-level-6', actionType: 'free', usesPerRest: 'short', usesCount: '1', tags: ['damage'] },
        { level: 6, name: 'Pyromantic Detonation', description: '[CHOOSE ONE] When a creature ignited via Combustion drops to 0 HP, it explodes. All creatures within 10 ft: DEX save vs your DC, 2d6 fire damage (half on success). Can chain if explosion ignites another creature that also dies.', featureType: 'option', optionGroup: 'pyromancer-level-6', actionType: 'passive', tags: ['damage'] },
        // Level 9
        { level: 9, name: 'Pyroclasm', description: '[CORE] Immune to fire damage (upgraded from resistance). Shed bright light 30 ft, dim 30 ft (suppress/resume as bonus action). While active, daemons and undead in bright light have disadvantage on attacks against you.', featureType: 'core', actionType: 'passive', tags: ['defensive'] },
        { level: 9, name: 'Inferno Incarnate (Master Power)', description: "[MAIN] Exclusive power (5th level, [PYR], Action, Self, Conc. up to 1 min, +6 Warp). Become pure Warp-fire: fly 60 ft, immune to fire and radiant, melee attackers take 2d8 fire, creatures starting turn within 10 ft take PA mod + proficiency fire damage, [PYR] powers deal extra 2d6 fire, move through creatures/objects as difficult terrain. When it ends, 4d6 fire damage in 30 ft radius (DEX save half). Doesn't count against prepared.", featureType: 'main', actionType: 'action', tags: ['damage', 'movement'] },
        { level: 9, name: 'Apocalyptic Fire', description: '[CHOOSE ONE] 1/long rest, action: Warp-fire pillar at point within 300 ft. 60-foot radius, DEX save, 10d6 fire damage (half on success). Area becomes difficult terrain for 1 minute. +8 Warp Points.', featureType: 'option', optionGroup: 'pyromancer-level-9', actionType: 'action', usesPerRest: 'long', usesCount: '1', tags: ['damage'] },
        { level: 9, name: 'Eternal Flame', description: '[CHOOSE ONE] Creatures ignited via Combustion can no longer extinguish flames by nonmagical means. Requires magical healing, full water submersion, or a 2nd+ level power/prayer slot from a psyker or Zealot. Combustion damage increases to 1d8/turn.', featureType: 'option', optionGroup: 'pyromancer-level-9', actionType: 'passive', tags: ['damage'] },
        { level: 9, name: 'Inferno Incarnate (Enhanced)', description: '[CHOOSE ONE] Duration extends to 10 minutes. Fly speed 90 ft. Regenerate 5 HP/turn. End-of-power explosion: 8d6 fire in 60-ft radius.', featureType: 'option', optionGroup: 'pyromancer-level-9', sourceFeature: 'inferno-incarnate', actionType: 'passive', tags: ['damage', 'healing', 'movement'] },
      ],
    },

    // ── 3. TELEPATH ───────────────────────────────────────────────────
    {
      id: 'telepath',
      name: 'Telepath',
      description:
        "Telepaths are psykers whose souls resonate with the minds of others — reaching through the Warp to read thoughts, implant suggestions, crush wills, and dominate the weak. Your power is insidious, invisible, and devastating. You excel at interrogation, infiltration, communication, crowd control, and turning enemies against each other.",
      unlockLevel: 1,
      flavorQuote: "I know what you're thinking. I know what you're going to do before you do it. And there is nothing you can do to stop me.",
      identity: 'Mind control, social manipulation, debuffs, information gathering',
      recommendedAbilities: 'INT > CHA > CON',
      features: [
        // Level 1
        { level: 1, name: 'Surface Read', description: 'Action: Read surface thoughts and emotional state of one creature within 30 ft. WIS save. On failure: learn emotional state and current surface thoughts. On success: emotional state only. Target unaware unless succeeds by 5+. Generates +1 Warp Point.', featureType: 'core', actionType: 'action', tags: ['utility'] },
        { level: 1, name: 'Mental Fortitude', description: 'Advantage on saves against being charmed. Automatically aware when a creature attempts to read your thoughts or influence your mind with psychic powers, even on failure.', featureType: 'main', actionType: 'passive', tags: ['defensive'] },
        { level: 1, name: 'Telepathic Speech', description: "Speak telepathically to any creature within 60 ft you can see. No shared language needed. Target can respond telepathically. Silent, instantaneous, generates no Warp Points.", featureType: 'main', actionType: 'passive', tags: ['utility'] },
        // Level 3
        { level: 3, name: 'Psychic Intrusion', description: '[CORE] When you force a creature to save against a [TEL] power, impose disadvantage on the save. Uses: Proficiency bonus per long rest. Must decide before the creature rolls.', featureType: 'core', actionType: 'free', usesPerRest: 'long', usesCount: 'proficiency', tags: ['control'] },
        { level: 3, name: 'Persistent Mind Link', description: '[MAIN] Mind Link no longer requires concentration. Range becomes unlimited (same plane). Maintain links with up to 8 creatures indefinitely. Always know direction and distance to linked creatures.', featureType: 'main', actionType: 'passive', tags: ['utility'] },
        { level: 3, name: 'Telepathic Affinity', description: '[MAIN] Powers with the [TEL] tag cost 1 fewer Warp Point (minimum 1).', featureType: 'main', actionType: 'passive' },
        // Level 6
        { level: 6, name: 'Mind Rend', description: '[CORE] When you deal psychic damage with a power, target has disadvantage on its next attack roll before end of its next turn.', featureType: 'core', actionType: 'passive', tags: ['control'] },
        { level: 6, name: 'Psychic Interrogation', description: '[MAIN] Spend 1 minute probing a mind. INT save. On failure: learn one specific piece of info (name, location, code, memory). Follow-up questions require new saves. Target aware of intrusion on any result. Immune for 24 hours on success. Generates +3 Warp Points per attempt.', featureType: 'main', actionType: 'special', tags: ['utility'] },
        { level: 6, name: 'Puppeteer', description: '[CHOOSE ONE] When you have a creature charmed, bonus action to command one specific action on its next turn (move, attack, use object, drop item). WIS save to resist (separate from charm). Uses: Proficiency bonus per long rest.', featureType: 'option', optionGroup: 'telepath-level-6', actionType: 'bonus-action', usesPerRest: 'long', usesCount: 'proficiency', tags: ['control'] },
        { level: 6, name: 'Mind Fortress', description: '[CHOOSE ONE] You and friendly creatures within 30 ft gain resistance to psychic damage and advantage on saves against being charmed or frightened. Always active while conscious.', featureType: 'option', optionGroup: 'telepath-level-6', actionType: 'passive', tags: ['defensive', 'support'] },
        { level: 6, name: 'Psychic Feedback', description: "[CHOOSE ONE] When a creature succeeds on a save against your [TEL] power, it still takes psychic damage equal to your psychic ability modifier + proficiency bonus. Also has disadvantage on concentration checks until start of your next turn.", featureType: 'option', optionGroup: 'telepath-level-6', actionType: 'passive', tags: ['damage'] },
        // Level 9
        { level: 9, name: 'Absolute Domination', description: '[CORE] Your charm and mind-control effects ignore immunity to the charmed condition for non-daemon, non-construct creatures. Normally-immune creatures instead have advantage on saves. Only mindless constructs, mindless undead, and daemons remain truly immune.', featureType: 'core', actionType: 'passive', tags: ['control'] },
        { level: 9, name: 'Psychic Dominion (Master Power)', description: "[MAIN] Exclusive power (5th level, [TEL], Action, 120 ft, Conc. up to 1 min, +6 Warp). Choose up to 6 creatures. WIS save. On failure: you decide their actions, movement, and reactions each turn. Repeat save at end of each turn. Creatures with INT 8+ save with disadvantage. Perceive through any dominated creature's senses as bonus action. Doesn't count against prepared.", featureType: 'main', actionType: 'action', tags: ['control'] },
        { level: 9, name: 'Mind Blank Aura', description: '[CHOOSE ONE] You and allies within 30 ft are immune to divination effects, psychic damage, and any thought-reading/location-determining psychic effects. Always active while conscious. Creatures in aura cannot be scryed upon.', featureType: 'option', optionGroup: 'telepath-level-9', actionType: 'passive', tags: ['defensive', 'support'] },
        { level: 9, name: 'Psychic Puppet Master', description: "[CHOOSE ONE] When you dominate a creature, you gain access to all its knowledge, skills, and proficiencies for the duration. You can use its special abilities and features as your own. Does not grant its HP, physical stats, or psychic powers.", featureType: 'option', optionGroup: 'telepath-level-9', actionType: 'passive', tags: ['control', 'utility'] },
        { level: 9, name: 'Psychic Dominion (Enhanced)', description: '[CHOOSE ONE] No longer requires concentration. Duration extends to 10 minutes. Repeated saves at disadvantage. Dominate up to 10 creatures instead of 6.', featureType: 'option', optionGroup: 'telepath-level-9', sourceFeature: 'psychic-dominion', actionType: 'passive', tags: ['control'] },
      ],
    },

    // ── 4. DIVINER ────────────────────────────────────────────────────
    {
      id: 'diviner',
      name: 'Diviner',
      description:
        "Diviners are psykers attuned to the flow of time and causality — they perceive the strands of fate that bind all things and can pluck those strands to alter what will be. Your power is the most subtle: no fire, no mind control, no biological transformation. Instead, you see what has not yet happened and act accordingly. You are the ultimate support and defensive caster.",
      unlockLevel: 1,
      flavorQuote: 'I have seen the threads of fate. I have seen how they end. And I have chosen to cut them differently.',
      identity: 'Fate manipulation, defensive superiority, party support, precognition',
      recommendedAbilities: 'WIS > CON > INT',
      features: [
        // Level 1
        { level: 1, name: 'Portent', description: 'When you finish a long rest, roll 2d20 and record the results (Portent dice). You can replace any attack roll, ability check, or saving throw made by you or a creature you can see within 60 ft with one of your Portent dice. Must choose before the roll. Each die used only once. Unused dice lost on next long rest.', featureType: 'core', actionType: 'free' },
        { level: 1, name: 'Prescient Dodge', description: "Add your psychic ability modifier to initiative rolls. Can't be surprised while conscious. Even when surprised, can still take reactions during the surprise round.", featureType: 'main', actionType: 'passive' },
        { level: 1, name: 'Glimpse of the Future', description: '1/long rest: 10 minutes meditation to receive a brief vision. Ask the GM one yes/no question about events likely in the next hour. GM answers truthfully based on current circumstances. Generates +2 Warp Points.', featureType: 'main', actionType: 'special', usesPerRest: 'long', usesCount: '1', tags: ['utility'] },
        // Level 3
        { level: 3, name: 'Improved Portent', description: '[CORE] Roll 3d20 for Portent (up from 2). You can now use a Portent die as a reaction after seeing the natural result (not just before the roll).', featureType: 'core', actionType: 'passive' },
        { level: 3, name: 'Chrono-Sense', description: '[MAIN] Advantage on initiative rolls and Perception checks. Your warband cannot be ambushed while you are conscious.', featureType: 'main', actionType: 'passive', tags: ['support'] },
        { level: 3, name: 'Divination Affinity', description: '[MAIN] Powers with the [DIV] tag cost 1 fewer Warp Point (minimum 1).', featureType: 'main', actionType: 'passive' },
        // Level 6
        { level: 6, name: 'Bend Fate', description: '[CORE] When you or an ally within 60 ft fails a saving throw, use your reaction to force a reroll (must use new result). Cannot use Bend Fate and a Portent die on the same roll. Uses: Proficiency bonus per long rest.', featureType: 'core', actionType: 'reaction', usesPerRest: 'long', usesCount: 'proficiency', tags: ['support'] },
        { level: 6, name: 'Visions of the Future', description: '[MAIN] During a rest, enter deep trance. Ask GM one question (not limited to yes/no) about events in next 24 hours. Brief, accurate answer. Generates +3 Warp Points. 1/long rest.', featureType: 'main', actionType: 'special', usesPerRest: 'long', usesCount: '1', tags: ['utility'] },
        { level: 6, name: 'Temporal Dodge', description: '[CHOOSE ONE] Reaction when hit: add psychic ability modifier to AC against that attack (potentially turning hit into miss). If miss, move 10 ft without provoking OA (brief time phase). Uses: Proficiency bonus per long rest.', featureType: 'option', optionGroup: 'diviner-level-6', actionType: 'reaction', usesPerRest: 'long', usesCount: 'proficiency', tags: ['defensive', 'movement'] },
        { level: 6, name: 'Prescient Counter', description: '[CHOOSE ONE] When a creature within 60 ft casts a psychic power or spell, use reaction to cast Objuration without slot or Warp Points. 1/short rest.', featureType: 'option', optionGroup: 'diviner-level-6', actionType: 'reaction', usesPerRest: 'short', usesCount: '1', tags: ['control'] },
        { level: 6, name: 'Shared Foresight', description: '[CHOOSE ONE] Portent dice can replace rolls for any creature within 120 ft (up from 60). When using a Portent die to help an ally, that ally gains +2 AC until start of their next turn.', featureType: 'option', optionGroup: 'diviner-level-6', actionType: 'passive', tags: ['support'] },
        // Level 9
        { level: 9, name: 'Master of Fate', description: '[CORE] Portent dice increase to 4d20. When using a Portent die, you can add or subtract up to your psychic ability modifier from the recorded result before applying it.', featureType: 'core', actionType: 'passive' },
        { level: 9, name: 'Temporal Manipulation (Master Power)', description: "Each turn, choose one temporal effect:\n• Accelerate: Additional action (one attack, Dash, Disengage, Hide, Use Object).\n• Rewind: Return to position at start of previous turn, regain HP equal to damage taken since then (max 20). Warp Bar unchanged.\n• Freeze: One creature within 60 ft WIS save, on failure speed 0 and no reactions until start of your next turn.\nWhen ended: disadvantage on attacks and checks until end of next turn. Doesn't count against prepared.", featureType: 'main', actionType: 'action', tags: ['support', 'control'] },
        { level: 9, name: 'Inevitable Fate', description: "[CHOOSE ONE] 1/long rest: Declare one attack roll, ability check, or saving throw within 120 ft automatically succeeds or fails (your choice, before roll). Cannot be used on death saves. Costs +1d6 Warp Points and +1d4 Corruption.", featureType: 'option', optionGroup: 'diviner-level-9', actionType: 'free', usesPerRest: 'long', usesCount: '1' },
        { level: 9, name: 'Prophecy', description: "[CHOOSE ONE] 1/long rest: 10-minute prophetic trance. Receive detailed vision about one topic — enemy weakness, location dangers, event outcomes, or person's secrets. GM provides substantial information (can reveal stat blocks, trap locations, hidden passages, conspiracies). Generates +5 Warp Points and +1 Corruption.", featureType: 'option', optionGroup: 'diviner-level-9', actionType: 'special', usesPerRest: 'long', usesCount: '1', tags: ['utility'] },
        { level: 9, name: 'Temporal Manipulation (Enhanced)', description: '[CHOOSE ONE] No longer requires concentration. Duration extends to 10 minutes. Choose two temporal effects per turn instead of one. Disorientation at end is removed.', featureType: 'option', optionGroup: 'diviner-level-9', sourceFeature: 'temporal-manipulation', actionType: 'passive', tags: ['support', 'control'] },
      ],
    },
  ],

  tags: ['caster', 'warp', 'glass-cannon'],
}
