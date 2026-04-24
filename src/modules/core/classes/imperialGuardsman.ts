import type { CharacterClass } from '../../../types/module'

/**
 * IMPERIAL GUARDSMAN
 *
 * Source: WH40K_Imperial_Guardsman.docx
 * Subclass (Regiment) at Level 1. Regiment features at 1, 3, 6, 9.
 * Base class features at 1, 2, 4, 5, 7, 8, 9, 10.
 *
 * 6 Regiments:
 *   - Cadian Shock Trooper
 *   - Catachan Jungle Fighter
 *   - Tallarn Desert Raider
 *   - Vostroyan Firstborn
 *   - Kriegsman (Death Korps of Krieg)
 *   - Heavy Weapons Specialist
 */

export const imperialGuardsman: CharacterClass = {
  id: 'imperial-guardsman',
  name: 'Imperial Guardsman',
  description:
    "Among the trillions who serve in the Astra Militarum, the Imperial Guard stands as humanity's first and last line of defense against the horrors of the galaxy. Unlike the adaptable warrior who learns combat through varied experience, the Guardsman is forged in the crucible of regimental doctrine. Your regiment is not merely your background — it is your identity, your fighting style, and your path to victory or a glorious death.",
  hitDie: 10,
  primaryAbility: ['dexterity', 'constitution', 'wisdom'],
  savingThrows: ['strength', 'constitution'],
  skillChoices: [
    'athletics',
    'intimidation',
    'perception',
    'survival',
    'medicine',
    'history',
    'insight',
  ],
  numSkillChoices: 3,
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  startingEquipmentOptions: [
    '(a) Flak armor or (b) Mesh armor',
    '(a) Lasgun and two power packs or (b) Autogun and 80 rounds',
    '(a) Combat knife and two frag grenades or (b) Chainsword',
    "(a) Explorer's pack or (b) Military pack (bedroll, mess kit, rations for 5 days, waterskin, 50 feet of rope, flashlight, 2 batteries)",
    'Regimental insignia, dog tags, photo of loved ones or the Emperor',
  ],
  startingEquipmentResolved: {
    0: { a: ['flak-armor-full'],                         b: ['mesh-armor'] },
    1: { a: ['lasgun'],                                  b: ['autogun'] },
    2: { a: ['combat-knife', 'frag-grenade', 'frag-grenade'], b: ['chainsword'] },
    3: { a: [],                                          b: ['military-pack'] },
    4: { grant: [] },
  },
  startingWealthFormula: '5d4 × 10 Thrones',

  featureTabName: 'Regimental Doctrine',
  subclassLabel: 'Regiment',

  // ─── BASE CLASS FEATURES ───────────────────────────────────────────────────

  features: [
    // ─── Level 1 ────────────────────────────────────────────────────────────
    {
      level: 1,
      name: 'Fighting Style: Archery',
      description:
        "You gain a +2 bonus to attack rolls you make with ranged weapons.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Fighting Style: Defense',
      description:
        "While you are wearing armor, you gain a +1 bonus to AC.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Fighting Style: Dueling',
      description:
        "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Fighting Style: Two-Weapon Fighting',
      description:
        "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Fighting Style: Marksman',
      description:
        "When you make a ranged weapon attack, you ignore half cover and three-quarters cover. Additionally, attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Fighting Style: Close Quarters Battle',
      description:
        "When you make a ranged weapon attack against a creature within 10 feet of you, you don't have disadvantage on the attack roll. Additionally, if you hit a creature within 10 feet of you with a ranged weapon attack on your turn, that creature can't take reactions until the end of this turn.",
      featureType: 'option',
      optionGroup: 'fighting-style',
      actionType: 'passive',
    },

    // ─── Level 2 ────────────────────────────────────────────────────────────
    {
      level: 2,
      name: 'Fire Discipline',
      description:
        "[CORE] Your military training has taught you to make every shot count and manage your ammunition effectively in prolonged engagements.\n\n" +
        "**Aimed Shot.** As an action, you can take careful aim at a target you can see within your weapon's range. Make one ranged weapon attack with advantage. If the attack hits, you deal an extra 1d8 damage of the weapon's type. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a short or long rest.\n\n" +
        "**Ammo Conservation.** When you roll a natural 1 on a ranged attack roll (which would normally cause you to mark off one magazine or power pack), you can choose to reroll that attack. If you do, you must use the new result, but you don't mark off ammunition regardless of the outcome. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a long rest.",
      featureType: 'base',
      actionType: 'action',
      usesPerRest: 'short',
      usesCount: 'proficiency',
    },
    {
      level: 2,
      name: 'Second Wind',
      description:
        '[CORE] You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your Guardsman level. Once you use this feature, you must finish a short or long rest before you can use it again.',
      featureType: 'base',
      actionType: 'bonus-action',
      usesPerRest: 'short',
      usesCount: '1',
      tags: ['healing'],
    },
    {
      level: 2,
      name: 'Squad Tactics',
      description:
        "[CORE] Your training emphasizes fighting as part of a unit rather than as an individual warrior.\n\n" +
        "**Covering Fire.** When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a ranged weapon and have line of sight to the attacker. Once you use this feature, you must finish a short or long rest before you can use it again.\n\n" +
        "**Coordinated Assault.** Once per turn, when you hit a creature with a ranged weapon attack, if an ally is within 5 feet of that creature and that ally isn't incapacitated, you deal an extra 1d6 damage. This damage increases to 2d6 at 7th level.",
      featureType: 'base',
      actionType: 'reaction',
      usesPerRest: 'short',
      usesCount: '1',
      tags: ['support', 'damage'],
    },

    // ─── Level 4 ────────────────────────────────────────────────────────────
    {
      level: 4,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 5 ────────────────────────────────────────────────────────────
    {
      level: 5,
      name: 'Extra Attack',
      description:
        'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
    },
    {
      level: 5,
      name: 'Battlefield Awareness',
      description:
        "Your experience in combat has honed your ability to read the flow of battle and react to threats. You gain proficiency in the Perception skill if you don't already have it. If you are already proficient in Perception, you gain proficiency in another skill from the Guardsman skill list.\n\nAdditionally, you can't be surprised while you are conscious.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 7 ────────────────────────────────────────────────────────────
    {
      level: 7,
      name: 'Improved Fire Discipline',
      description:
        'Your Aimed Shot feature improves. The extra damage increases to 2d8, and you score a critical hit with Aimed Shot attacks on a roll of 19–20.\n\nAdditionally, when you use Ammo Conservation, you gain a +2 bonus to the rerolled attack.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack', 'damage'],
    },
    {
      level: 7,
      name: "Veteran's Reflexes",
      description:
        "Your combat experience has sharpened your reflexes to a razor's edge. You add your Wisdom modifier to initiative rolls.\n\nAdditionally, when an attacker that you can see makes a ranged attack against you, you can use your reaction to impose disadvantage on the attack roll. You can use this reaction feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
      featureType: 'base',
      actionType: 'reaction',
      usesPerRest: 'long',
      usesCount: 'proficiency',
      tags: ['defensive'],
    },

    // ─── Level 8 ────────────────────────────────────────────────────────────
    {
      level: 8,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 9 ────────────────────────────────────────────────────────────
    {
      level: 9,
      name: 'Indomitable',
      description:
        'Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll. You can use this feature once, and you regain the ability to do so when you finish a long rest.',
      featureType: 'base',
      actionType: 'special',
      usesPerRest: 'long',
      usesCount: '1',
      tags: ['defensive'],
    },

    // ─── Level 10 ───────────────────────────────────────────────────────────
    {
      level: 10,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can't increase an ability score above 20 using this feature. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 10,
      name: 'Hold the Line',
      description:
        "You have learned to stand firm in the face of overwhelming odds.\n\n**Last Stand.** When you are reduced to 0 hit points but not killed outright, you can choose to drop to 1 hit point instead. Once you use this feature, you can't use it again until you finish a long rest.\n\n**Backs Against the Wall.** While you are at or below half your hit point maximum, you have advantage on attack rolls with ranged weapons and creatures have disadvantage on opportunity attacks against you. This benefit is always active when the condition is met.",
      featureType: 'base',
      actionType: 'special',
      usesPerRest: 'long',
      usesCount: '1',
      tags: ['defensive'],
    },
  ],

  // ─── SUBCLASSES (REGIMENTS) ────────────────────────────────────────────────

  subclasses: [
    // ─── 1. CADIAN SHOCK TROOPER ──────────────────────────────────────────
    {
      id: 'cadian-shock-trooper',
      name: 'Cadian Shock Trooper',
      description:
        'The Cadian regiments are the gold standard by which all other Imperial Guard forces are measured. Raised on a fortress world that stood at the very edge of the Eye of Terror, Cadians are drilled from birth in military doctrine, weapons proficiency, and tactical superiority. Even with their homeworld destroyed, the Cadian way of war endures across the galaxy — disciplined, coordinated, and devastatingly effective.',
      unlockLevel: 1,
      flavorQuote: 'Cadia stands! Though the planet broke, the people never did.',
      identity: 'Tactical coordination, superior accuracy, leadership, combined arms',
      recommendedFightingStyle: ['Archery', 'Marksman'],
      recommendedAbilities: 'DEX > WIS > CON',

      features: [
        // ── Level 1: Cadian Discipline ─────────────────────────────────────
        {
          level: 1,
          name: 'Unshakeable Nerve',
          description:
            "You have advantage on saving throws against being frightened. When you succeed on a saving throw against being frightened, you can use your reaction to immediately make one ranged weapon attack against the creature that attempted to frighten you, provided it is within your weapon's range.",
          featureType: 'core',
          actionType: 'reaction',
          tags: ['defensive', 'attack'],
        },
        {
          level: 1,
          name: 'Born to the Gun',
          description:
            "You gain proficiency with all ranged weapons. Additionally, when you make a ranged weapon attack with a weapon you are proficient with, you can use your Dexterity modifier for the damage roll if the weapon doesn't already allow it.",
          featureType: 'main',
          actionType: 'passive',
        },
        {
          level: 1,
          name: 'Tactical Superiority',
          description:
            'You add your proficiency bonus to initiative rolls. Additionally, when you roll initiative, you can grant one ally you can see within 30 feet a bonus to their initiative roll equal to your Wisdom modifier (minimum of +1).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['support'],
        },

        // ── Level 3: Coordinated Fire ──────────────────────────────────────
        {
          level: 3,
          name: 'Volley Fire',
          description:
            "As an action, you can coordinate fire with allies. Choose a target you can see within your weapon's range. You and up to two allies who can see or hear you can each use their reaction to make one ranged weapon attack against that target. If all three creatures participate in the volley, these attacks are made with advantage.\n\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a short or long rest.",
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: 'wisdom',
          tags: ['attack', 'support'],
        },
        {
          level: 3,
          name: 'Suppressing Fire',
          description:
            "As an action, you can expend 5 rounds of ammunition (or mark one magazine/power pack) to suppress an area. Choose a 10-foot square area within your weapon's normal range that you can see. Until the start of your next turn, the area becomes suppressed.\n\nAny creature that starts its turn in the suppressed area or enters it for the first time on a turn must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Dexterity modifier) or become suppressed until the end of their turn.\n\n**Suppressed Condition.** While suppressed, a creature has disadvantage on attack rolls, cannot take reactions, and must use its movement to seek the nearest available cover if possible. Creatures with the Fearless trait or immunity to being frightened have advantage on this saving throw.\n\nYou can maintain suppression by using your action on subsequent turns and expending ammunition each turn. Suppression ends if you move more than 5 feet, become incapacitated, or choose to end it (no action required).",
          featureType: 'main',
          actionType: 'action',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Fire Team Leader',
          description:
            "When you take the Help action to assist an ally's attack roll, you can do so at a range of 30 feet (instead of the normal 5 feet), provided you can see both the ally and their target. The assisted creature's attack deals an additional 1d4 damage on a hit.",
          featureType: 'main',
          actionType: 'action',
          tags: ['support'],
        },
        {
          level: 3,
          name: 'Overwatch Protocol',
          description:
            "[CHOOSE ONE] As an action, you can set up an overwatch position. Choose a 60-foot cone originating from you. Until you move, lose concentration (as if concentrating on a spell), or use this feature again, when a hostile creature you can see enters the cone for the first time on a turn or moves within the cone, you can use your reaction to make one ranged weapon attack against that creature. You can maintain this for up to 10 minutes. Once used, you must finish a short or long rest before using it again.",
          featureType: 'option',
          optionGroup: 'cadian-level-3',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Rapid Fire Drill',
          description:
            '[CHOOSE ONE] When you use your Aimed Shot feature, you can make it as part of the Attack action (replacing one of your attacks) instead of using a separate action. You lose the advantage on the attack roll when used this way, but you retain the extra damage.',
          featureType: 'option',
          optionGroup: 'cadian-level-3',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Unshakeable Nerve (Enhanced)',
          description:
            '[CHOOSE ONE] Your Unshakeable Nerve now extends to allies within 10 feet of you. While they can see you, they gain advantage on saving throws against being frightened. Additionally, when you succeed on a save against being frightened, the reaction attack you make gains a bonus to the damage roll equal to your Wisdom modifier.',
          featureType: 'option',
          optionGroup: 'cadian-level-3',
          sourceFeature: 'unshakeable-nerve',
          actionType: 'passive',
          tags: ['support', 'defensive'],
        },

        // ── Level 6: Born in the Purple ────────────────────────────────────
        {
          level: 6,
          name: 'Cadian Fortitude',
          description:
            'Your Armor Class increases by 1. Additionally, when you use your Second Wind feature, you can grant one ally within 30 feet who can see you temporary hit points equal to your Guardsman level.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Decisive Commander',
          description:
            "You can use a bonus action to issue a tactical command to one ally within 60 feet who can hear you. That ally can immediately use their reaction to take one of the following actions: move up to half their speed without provoking opportunity attacks, make one weapon attack, or take the Dodge action until the start of their next turn.\n\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a short or long rest.",
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'wisdom',
          tags: ['support'],
        },
        {
          level: 6,
          name: 'Combined Arms Doctrine',
          description:
            'Once per short rest, when you hit a creature with a ranged weapon attack and you are within 5 feet of it with a melee weapon drawn, you can immediately make one melee weapon attack against that creature as part of the same action. This melee attack deals an additional 1d6 damage on a hit.',
          featureType: 'main',
          actionType: 'free',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Artillery Observer',
          description:
            '[CHOOSE ONE] As an action, you can designate a single target you can see within 120 feet. Until the start of your next turn, all ranged weapon attacks made by you and your allies against that target are made with advantage. Once you use this feature, you must finish a long rest before you can use it again.',
          featureType: 'option',
          optionGroup: 'cadian-level-6',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['support'],
        },
        {
          level: 6,
          name: 'Tactical Withdrawal',
          description:
            '[CHOOSE ONE] When an ally within 30 feet of you is hit by an attack, you can use your reaction to allow that ally to immediately move up to half their speed without provoking opportunity attacks. You can use this a number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a short or long rest.',
          featureType: 'option',
          optionGroup: 'cadian-level-6',
          actionType: 'reaction',
          usesPerRest: 'short',
          usesCount: 'wisdom',
          tags: ['support', 'movement'],
        },
        {
          level: 6,
          name: 'Volley Fire (Enhanced)',
          description:
            '[CHOOSE ONE] Your Volley Fire can now coordinate up to three allies (instead of two). Attacks made as part of the volley deal an additional 1d6 damage on a hit.',
          featureType: 'option',
          optionGroup: 'cadian-level-6',
          sourceFeature: 'volley-fire',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Suppressing Fire (Enhanced)',
          description:
            '[CHOOSE ONE] Your suppression area increases to a 15-foot square. The saving throw DC increases by 2. Creatures that fail the save also have their speed halved until the end of their turn.',
          featureType: 'option',
          optionGroup: 'cadian-level-6',
          sourceFeature: 'suppressing-fire',
          actionType: 'passive',
          tags: ['control'],
        },

        // ── Level 9: Cadian Stand ──────────────────────────────────────────
        {
          level: 9,
          name: 'The Planet Broke Before the Guard Did',
          description:
            'When you are reduced to 0 hit points, you can use your reaction to make one weapon attack before falling unconscious. If this attack reduces an enemy to 0 hit points, you instead drop to 1 hit point and remain conscious. Additionally, when this feature activates, all allied creatures within 30 feet who can see you gain temporary hit points equal to your Guardsman level.',
          featureType: 'core',
          actionType: 'reaction',
          usesPerRest: 'special',
          tags: ['attack', 'defensive', 'support'],
        },
        {
          level: 9,
          name: 'Aura of Discipline',
          description:
            'All allied creatures within 10 feet of you gain advantage on saving throws against being frightened. Additionally, when an ally within 10 feet of you makes a ranged weapon attack, they add +1 to the attack roll.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['support'],
        },
        {
          level: 9,
          name: 'Masterwork Volley',
          description:
            'When you use your Volley Fire feature, all attacks made as part of the volley deal an additional 1d8 damage on a hit. If the target is reduced to 0 hit points by the volley, you regain one use of Volley Fire.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Cadian Commander',
          description:
            '[CHOOSE ONE] Once per long rest, as an action, you issue a regiment-wide command. All allies within 30 feet who can hear you can immediately use their reaction to make one ranged weapon attack with advantage.',
          featureType: 'option',
          optionGroup: 'cadian-level-9',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['support', 'attack'],
        },
        {
          level: 9,
          name: 'Last Stand Protocol',
          description:
            '[CHOOSE ONE] Once per long rest, when you are at or below half your hit point maximum, you can use a bonus action to activate Last Stand Protocol. For 1 minute, you and all allies within 10 feet gain advantage on all attack rolls and saving throws. The effect ends early if you are incapacitated.',
          featureType: 'option',
          optionGroup: 'cadian-level-9',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['support'],
        },
        {
          level: 9,
          name: 'Decisive Commander (Enhanced)',
          description:
            '[CHOOSE ONE] Your Decisive Commander range increases to 120 feet. The commanded ally can now both move up to half their speed AND make one weapon attack as part of the same reaction. You gain additional uses equal to your proficiency bonus per long rest (on top of existing short rest uses).',
          featureType: 'option',
          optionGroup: 'cadian-level-9',
          sourceFeature: 'decisive-commander',
          actionType: 'passive',
          tags: ['support'],
        },
        {
          level: 9,
          name: 'Combined Arms Doctrine (Enhanced)',
          description:
            '[CHOOSE ONE] The additional melee damage increases to 2d6. You gain a second use per short rest. After the melee attack, you can push the target 5 feet away and immediately move 5 feet in any direction without provoking opportunity attacks.',
          featureType: 'option',
          optionGroup: 'cadian-level-9',
          sourceFeature: 'combined-arms-doctrine',
          actionType: 'passive',
          tags: ['attack', 'damage', 'movement'],
        },
      ],
    },

    // ─── 2. CATACHAN JUNGLE FIGHTER ────────────────────────────────────────
    {
      id: 'catachan-jungle-fighter',
      name: 'Catachan Jungle Fighter',
      description:
        "Catachan is a death world where everything — the plants, the animals, the very atmosphere — is trying to kill you. Those who survive to adulthood are among the toughest, most resourceful soldiers in the Imperium. Catachan Jungle Fighters excel at guerrilla warfare, ambush tactics, and close-quarters violence. They trust their muscles as much as their lasguns, and when the enemy gets close, they prefer the intimate brutality of knife and fist.",
      unlockLevel: 1,
      flavorQuote: "It takes a special kind of soldier to survive Catachan. The kind that makes the galaxy's nightmares wake up screaming.",
      identity: 'Stealth, ambush tactics, close combat, survival, physical prowess',
      recommendedFightingStyle: ['Close Quarters Battle', 'Dueling'],
      recommendedAbilities: 'STR > DEX > CON',

      features: [
        // ── Level 1: Jungle Warfare ────────────────────────────────────────
        {
          level: 1,
          name: 'Death World Survivor',
          description:
            'You gain proficiency in the Survival and Stealth skills. If you are already proficient in either skill, you gain expertise in it (your proficiency bonus is doubled for ability checks using that skill). You have advantage on Survival checks made in jungle, forest, or dense vegetation environments. Additionally, you can use your Strength modifier instead of your Dexterity modifier for Stealth checks.',
          featureType: 'core',
          actionType: 'passive',
        },
        {
          level: 1,
          name: 'Guerrilla Fighter',
          description:
            'You can move through difficult terrain without expending extra movement. Additionally, when you take the Hide action in an environment with natural cover (such as foliage, jungle, forest, or rubble), you can attempt to hide even if you are only lightly obscured.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 1,
          name: 'Catachan Fang',
          description:
            'Your unarmed strikes and attacks with knives or other small blades are unnaturally deadly. Your unarmed strikes deal 1d6 + your Strength modifier bludgeoning damage. When you wield a dagger, combat knife, or similar small blade, it deals 1d6 damage (instead of its normal damage) and counts as a finesse weapon for you.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },

        // ── Level 3: Ambush Predator ───────────────────────────────────────
        {
          level: 3,
          name: 'Surprise Attack',
          description:
            "If you hit a creature with a weapon attack during the first round of combat and that creature hasn't taken a turn yet, the attack deals an extra 1d6 damage. Additionally, when you have advantage on an attack roll, you can deal this extra damage once per turn (even outside the first round of combat).",
          featureType: 'core',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Strike and Fade',
          description:
            'Immediately after you take the Attack action on your turn, you can take the Hide action as a bonus action. Additionally, when you take the Hide action, you can move up to half your speed as part of the same bonus action without revealing your position.',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['movement'],
        },
        {
          level: 3,
          name: 'Silent Kill',
          description:
            "When you make a melee weapon attack against a creature that is unaware of your presence or that you have advantage against, you can attempt a silent kill. The target must succeed on a Constitution saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be unable to speak or make noise until the end of its next turn. If the attack reduces the target to 0 hit points, it dies silently without alerting nearby creatures. You can use this feature a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.",
          featureType: 'main',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Trapper',
          description:
            '[CHOOSE ONE] You can spend 1 minute setting a trap in a 5-foot area using materials at hand. The first creature to enter the area must succeed on a Dexterity saving throw (DC = 8 + your proficiency bonus + your Strength or Dexterity modifier) or take 2d6 piercing damage and be restrained until the end of its next turn. You can maintain up to 3 traps at a time. You can use this feature a number of times equal to your proficiency bonus, regaining all uses on a long rest.',
          featureType: 'option',
          optionGroup: 'catachan-level-3',
          actionType: 'special',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['control', 'damage'],
        },
        {
          level: 3,
          name: "Predator's Focus",
          description:
            "[CHOOSE ONE] When you hit a creature with a weapon attack and deal Surprise Attack damage, you can mark that creature as your quarry for 1 minute. While the quarry is marked, you have advantage on Perception and Survival checks to track it, and the first attack you make against it each turn deals an extra 1d4 damage. You can only have one quarry at a time.",
          featureType: 'option',
          optionGroup: 'catachan-level-3',
          actionType: 'free',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Catachan Fang (Enhanced)',
          description:
            '[CHOOSE ONE] Your unarmed strikes and small blade attacks now deal 1d8 damage (instead of 1d6). Additionally, when you hit a creature with an unarmed strike or small blade, you can attempt to grapple the creature as a bonus action.',
          featureType: 'option',
          optionGroup: 'catachan-level-3',
          sourceFeature: 'catachan-fang',
          actionType: 'passive',
          tags: ['attack'],
        },

        // ── Level 6: Death World Conditioning ─────────────────────────────
        {
          level: 6,
          name: 'Toxin Resistance',
          description:
            'You have advantage on saving throws against poison and disease, and you have resistance to poison damage.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 6,
          name: 'Savage Resilience',
          description:
            "When you take damage that would reduce you to 0 hit points but doesn't kill you outright, you can use your reaction to move up to your speed and make one melee weapon attack. Once you use this feature, you can't use it again until you finish a short or long rest.",
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'defensive', 'movement'],
        },
        {
          level: 6,
          name: 'Jungle Predator',
          description:
            'When you hit a creature with a melee weapon attack, you can attempt to grapple or shove that creature as a bonus action. Additionally, you have advantage on Strength (Athletics) checks made to grapple, shove, or escape a grapple.',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['control'],
        },
        {
          level: 6,
          name: 'Unseen Stalker',
          description:
            "While you are hidden from a creature and miss it with a weapon attack, making the attack doesn't reveal your position to that creature. Additionally, dim light doesn't impose disadvantage on your Perception checks.",
          featureType: 'option',
          optionGroup: 'catachan-level-6',
          actionType: 'passive',
        },
        {
          level: 6,
          name: 'Death World Toxins',
          description:
            '[CHOOSE ONE] You can spend 10 minutes harvesting natural materials to create a potent toxin. You can apply this toxin to a weapon or piece of ammunition as a bonus action. The next creature hit by the coated weapon must make a Constitution saving throw (DC = 8 + your proficiency bonus + your Constitution modifier) or take 2d6 poison damage and be poisoned for 1 minute. You can create a number of doses equal to your proficiency bonus per long rest.',
          featureType: 'option',
          optionGroup: 'catachan-level-6',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Surprise Attack (Enhanced)',
          description:
            '[CHOOSE ONE] Your Surprise Attack damage increases to 2d6. Additionally, when you deal Surprise Attack damage, the target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be knocked prone.',
          featureType: 'option',
          optionGroup: 'catachan-level-6',
          sourceFeature: 'surprise-attack',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },

        // ── Level 9: Apex Hunter ───────────────────────────────────────────
        {
          level: 9,
          name: 'Master Ambusher',
          description:
            'You can take the Hide action as part of your movement (no action required) once per turn. Additionally, you have advantage on initiative rolls.',
          featureType: 'core',
          actionType: 'free',
          tags: ['movement'],
        },
        {
          level: 9,
          name: 'Relentless Assault',
          description:
            'When you score a critical hit with a weapon attack or reduce a creature to 0 hit points with a weapon attack, you can make one additional weapon attack as part of the same action. You can do this only once per turn.',
          featureType: 'main',
          actionType: 'free',
          tags: ['attack'],
        },
        {
          level: 9,
          name: "Catachan's Finest",
          description:
            "Your unarmed strikes and attacks with small blades now deal 1d10 + your Strength modifier damage (or 1d8 + STR if not previously enhanced). When you hit a creature that you have advantage against with an unarmed strike or small blade attack, you can roll the weapon's damage dice two additional times and add them to the damage.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Ghost of the Jungle',
          description:
            '[CHOOSE ONE] You become invisible until the end of your next turn whenever you take the Hide action and succeed on the Stealth check. This invisibility ends if you make an attack, cast a spell, or take damage. You can use this feature a number of times equal to your proficiency bonus, regaining all uses on a long rest.',
          featureType: 'option',
          optionGroup: 'catachan-level-9',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
        },
        {
          level: 9,
          name: 'Apex Predator',
          description:
            '[CHOOSE ONE] When you hit a creature with a melee weapon attack, you can force it to make a Wisdom saving throw (DC = 8 + your proficiency bonus + your Strength modifier). On a failure, the creature is frightened of you until the end of your next turn and must use its movement to move away from you. You can use this a number of times equal to your proficiency bonus, regaining all uses on a long rest.',
          featureType: 'option',
          optionGroup: 'catachan-level-9',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Surprise Attack (Greater Enhanced)',
          description:
            "[CHOOSE ONE] Your Surprise Attack damage increases to 3d6. Additionally, when you deal Surprise Attack damage, the target has disadvantage on all attack rolls until the start of your next turn.",
          featureType: 'option',
          optionGroup: 'catachan-level-9',
          sourceFeature: 'surprise-attack',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },
      ],
    },

    // ─── 3. TALLARN DESERT RAIDER ──────────────────────────────────────────
    {
      id: 'tallarn-desert-raider',
      name: 'Tallarn Desert Raider',
      description:
        'The Tallarn regiments are masters of mobile warfare and hit-and-run tactics, forged in the endless deserts of their homeworld. Where other regiments stand and fight, Tallarn forces move like the desert wind — swift, unpredictable, and gone before the enemy can retaliate. They excel at mounted operations, rapid flanking maneuvers, and exploiting enemy weaknesses with lightning-fast raids.',
      unlockLevel: 1,
      flavorQuote: 'Strike hard, strike fast, strike first. Then disappear like a mirage.',
      identity: 'Superior mobility, hit-and-run tactics, vehicle proficiency, evasion',
      recommendedFightingStyle: ['Archery', 'Close Quarters Battle'],
      recommendedAbilities: 'DEX > CON > WIS',

      features: [
        // ── Level 1: Mobile Warfare ────────────────────────────────────────
        {
          level: 1,
          name: 'Desert Born',
          description:
            'Your base walking speed increases by 10 feet. Additionally, you ignore difficult terrain caused by sand, ash, or loose earth. You have advantage on saving throws against exhaustion caused by extreme heat or dehydration.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 1,
          name: 'Hit and Run',
          description:
            "When you take the Dash action on your turn, you can make one weapon attack as a bonus action. Additionally, when you make this attack, you don't provoke opportunity attacks from the target of the attack for the rest of your turn.",
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['attack', 'movement'],
        },
        {
          level: 1,
          name: "Raider's Mobility",
          description:
            'Opportunity attacks against you are made with disadvantage. Additionally, you can move through the space of any creature that is of a size larger than yours without expending extra movement.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['movement', 'defensive'],
        },

        // ── Level 3: Lightning Assault ─────────────────────────────────────
        {
          level: 3,
          name: 'Rapid Strike',
          description:
            "When you take the Attack action and attack with a ranged weapon, you can move up to 10 feet before or after each attack without provoking opportunity attacks. This movement doesn't count against your total movement for the turn.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 3,
          name: 'Flanking Maneuver',
          description:
            'As a bonus action, you can move up to half your speed. If you end this movement within 5 feet of a creature that an ally is also within 5 feet of, the next attack you make against that creature before the end of your turn has advantage. You can use this a number of times equal to your Dexterity modifier (minimum of once), regaining all uses on a short or long rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'dexterity',
          tags: ['movement', 'attack'],
        },
        {
          level: 3,
          name: 'Dust Cloud',
          description:
            "When you take the Dash action, you kick up a cloud of dust or debris (if the terrain permits). Until the start of your next turn, the area within 5 feet of the path you moved becomes lightly obscured. Creatures attempting to make opportunity attacks against you through this area have disadvantage.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'movement'],
        },
        {
          level: 3,
          name: "Skirmisher's Harass",
          description:
            "[CHOOSE ONE] When you hit a creature with a ranged weapon attack after moving at least 10 feet on your turn, the target's speed is reduced by 10 feet until the start of your next turn. This reduction doesn't stack.",
          featureType: 'option',
          optionGroup: 'tallarn-level-3',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Wind Runner',
          description:
            '[CHOOSE ONE] You can take the Disengage action as a bonus action. Additionally, your speed increases by an additional 5 feet.',
          featureType: 'option',
          optionGroup: 'tallarn-level-3',
          actionType: 'bonus-action',
          tags: ['movement'],
        },
        {
          level: 3,
          name: 'Hit and Run (Enhanced)',
          description:
            "[CHOOSE ONE] When you use Hit and Run, you can make two weapon attacks instead of one as part of the bonus action. Additionally, you don't provoke opportunity attacks from any creature (not just the target) for the rest of your turn after using Hit and Run.",
          featureType: 'option',
          optionGroup: 'tallarn-level-3',
          sourceFeature: 'hit-and-run',
          actionType: 'passive',
          tags: ['attack', 'movement'],
        },

        // ── Level 6: Born to the Saddle ────────────────────────────────────
        {
          level: 6,
          name: 'Vehicle Specialist',
          description:
            "You gain proficiency with all ground vehicles and can add double your proficiency bonus to ability checks related to operating or repairing ground vehicles. When you are operating a ground vehicle, the vehicle's speed increases by 10 feet, and you can take the Dash action as a bonus action while operating the vehicle.",
          featureType: 'core',
          actionType: 'passive',
        },
        {
          level: 6,
          name: 'Mounted Combatant',
          description:
            'You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount or vehicle. Additionally, if your mount or vehicle is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage on a success and only half damage on a failure.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'defensive'],
        },
        {
          level: 6,
          name: 'Evasive Maneuvers',
          description:
            'When a creature you can see targets you or your vehicle with an attack, you can use your reaction to impose disadvantage on the attack roll. If the attack misses, you can immediately move up to 10 feet without provoking opportunity attacks. You can use this a number of times equal to your Dexterity modifier (minimum of once), regaining all uses on a short or long rest.',
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'short',
          usesCount: 'dexterity',
          tags: ['defensive', 'movement'],
        },
        {
          level: 6,
          name: "Raider's Instinct",
          description:
            '[CHOOSE ONE] You have advantage on initiative rolls. Additionally, during the first round of combat, your speed is doubled.',
          featureType: 'option',
          optionGroup: 'tallarn-level-6',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 6,
          name: 'Sandstorm Assault',
          description:
            '[CHOOSE ONE] As an action, you and up to two willing allies within 30 feet can simultaneously move up to your respective speeds without provoking opportunity attacks. Each creature that participates can make one weapon attack at the end of their movement. Once used, you must finish a short or long rest before using it again.',
          featureType: 'option',
          optionGroup: 'tallarn-level-6',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['support', 'attack', 'movement'],
        },
        {
          level: 6,
          name: 'Flanking Maneuver (Enhanced)',
          description:
            '[CHOOSE ONE] When you use Flanking Maneuver, you gain advantage on all attacks against the flanked creature until the end of your turn (not just the next attack). Additionally, your flanking attacks deal an extra 1d6 damage.',
          featureType: 'option',
          optionGroup: 'tallarn-level-6',
          sourceFeature: 'flanking-maneuver',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },

        // ── Level 9: Desert Wind ───────────────────────────────────────────
        {
          level: 9,
          name: 'Relentless Pursuit',
          description:
            'Your speed increases by an additional 10 feet (total of +20 feet from Desert Born). You can take the Dash action as a bonus action on each of your turns.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 9,
          name: 'Master of Evasion',
          description:
            'When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 9,
          name: 'Lightning Raid',
          description:
            'Once per turn, when you hit a creature with a weapon attack after moving at least 20 feet on your turn, you deal an extra 3d6 damage to the target. If the attack is a critical hit, the target must also succeed on a Constitution saving throw (DC = 8 + your proficiency bonus + your Dexterity modifier) or be stunned until the end of your next turn.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Phantom Raider',
          description:
            "[CHOOSE ONE] After you make an attack, you can immediately move up to half your speed without provoking opportunity attacks. This movement doesn't count against your normal movement. You can use this feature a number of times equal to your Dexterity modifier, regaining all uses on a short rest.",
          featureType: 'option',
          optionGroup: 'tallarn-level-9',
          actionType: 'free',
          usesPerRest: 'short',
          usesCount: 'dexterity',
          tags: ['movement'],
        },
        {
          level: 9,
          name: 'Cavalry Charge',
          description:
            '[CHOOSE ONE] Once per long rest, when you move at least 30 feet in a straight line toward a creature and then hit it with a melee weapon attack, the attack is automatically a critical hit. The target must also succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be knocked prone.',
          featureType: 'option',
          optionGroup: 'tallarn-level-9',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 9,
          name: 'Lightning Raid (Enhanced)',
          description:
            '[CHOOSE ONE] Your Lightning Raid damage increases to 4d6. Additionally, the target must succeed on a Strength saving throw or be knocked 10 feet in a direction of your choice.',
          featureType: 'option',
          optionGroup: 'tallarn-level-9',
          sourceFeature: 'lightning-raid',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },
      ],
    },

    // ─── 4. VOSTROYAN FIRSTBORN ────────────────────────────────────────────
    {
      id: 'vostroyan-firstborn',
      name: 'Vostroyan Firstborn',
      description:
        "The Vostroyan regiments carry a burden of ancient shame, atoning for their ancestors' failure to answer the Emperor's call during the Horus Heresy. Every generation, the firstborn of each family is sent to serve in the Imperial Guard — a tradition that has lasted ten thousand years. Vostroyan soldiers are master marksmen, trained from childhood in the use of sophisticated weapons. They fight with cold precision and aristocratic bearing, delivering death at extreme range.",
      unlockLevel: 1,
      flavorQuote: 'We fire with precision, we fight with honor, we die with dignity.',
      identity: 'Precision marksmanship, long-range superiority, honor-bound discipline',
      recommendedFightingStyle: ['Marksman', 'Archery'],
      recommendedAbilities: 'DEX > WIS > CON',

      features: [
        // ── Level 1: Marksman Training ─────────────────────────────────────
        {
          level: 1,
          name: 'Firstborn Marksman',
          description:
            "You ignore half cover and three-quarters cover when making ranged weapon attacks. Additionally, you don't have disadvantage on ranged weapon attacks made at long range.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 1,
          name: 'Steady Aim',
          description:
            "When you haven't moved on your turn, you can use a bonus action to steady your aim. You gain advantage on the next ranged weapon attack you make before the end of your turn.",
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['attack'],
        },
        {
          level: 1,
          name: 'Honorbound',
          description:
            'You have advantage on death saving throws. Additionally, when an ally within 30 feet of you drops to 0 hit points, you can use your reaction to make one ranged weapon attack against a creature you can see. This attack is made with advantage.',
          featureType: 'main',
          actionType: 'reaction',
          tags: ['attack'],
        },

        // ── Level 3: Sniper ────────────────────────────────────────────────
        {
          level: 3,
          name: 'Improved Critical',
          description:
            'Your ranged weapon attacks score a critical hit on a roll of 19–20 on the d20.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Weakpoint Targeting',
          description:
            "When you hit a creature with a ranged weapon attack, you can target a specific location to impose additional effects. Choose one:\n\n• **Head Shot:** The target must succeed on a Constitution saving throw (DC = 8 + your proficiency bonus + your Dexterity modifier) or be stunned until the end of its next turn.\n• **Leg Shot:** The target's speed is reduced by half until the end of its next turn.\n• **Arm Shot:** The target has disadvantage on its next attack roll made before the end of its next turn.\n• **Vital Shot:** The target takes an additional 2d6 damage.\n\nYou can use this feature a number of times equal to your Dexterity modifier (minimum of once), and you regain all expended uses when you finish a short or long rest.",
          featureType: 'main',
          actionType: 'free',
          usesPerRest: 'short',
          usesCount: 'dexterity',
          tags: ['attack', 'control'],
        },
        {
          level: 3,
          name: 'Overwatch Position',
          description:
            "As an action, you can set up an overwatch position. Choose a 60-foot cone originating from you. Until you move or lose concentration (as if concentrating on a spell), when a creature you can see enters the cone for the first time on a turn or ends its turn there, you can use your reaction to make one ranged weapon attack against that creature. You can maintain this for up to 10 minutes. Once used, you must finish a short or long rest before using it again.",
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Precision Shot',
          description:
            "[CHOOSE ONE] When you make a ranged weapon attack, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage. You can choose to use this feature after seeing the attack roll but before the DM says whether the attack hits or misses.",
          featureType: 'option',
          optionGroup: 'vostroyan-level-3',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 3,
          name: "Spotter's Eye",
          description:
            "As a bonus action, you can study a target you can see within your weapon's range. Until the end of your next turn, your attacks against that target ignore total cover (you must still know the target's location), and you have advantage on the first attack you make against it.",
          featureType: 'option',
          optionGroup: 'vostroyan-level-3',
          actionType: 'bonus-action',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Steady Aim (Enhanced)',
          description:
            '[CHOOSE ONE] When you use Steady Aim, you also gain a +2 bonus to the damage roll. Additionally, you can now use Steady Aim even if you moved up to 5 feet on your turn (instead of requiring no movement).',
          featureType: 'option',
          optionGroup: 'vostroyan-level-3',
          sourceFeature: 'steady-aim',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },

        // ── Level 6: Master Marksman ───────────────────────────────────────
        {
          level: 6,
          name: 'Extended Range',
          description:
            "The normal range of your ranged weapons increases by 50%, and the long range increases by 100%.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 6,
          name: "Sniper's Focus",
          description:
            "When you use your Aimed Shot feature, you can target a creature up to twice your weapon's normal range away. If the target has half cover, the cover is ignored for this shot.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 6,
          name: 'Deadly Accuracy',
          description:
            "When you score a critical hit with a ranged weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Killzone',
          description:
            "[CHOOSE ONE] As an action, you can designate a 10-foot square area within your weapon's range as your killzone. For 1 minute, you have advantage on attack rolls against any creature within the killzone, and your attacks against creatures in the killzone deal an extra 1d6 damage. You can use this once per short or long rest.",
          featureType: 'option',
          optionGroup: 'vostroyan-level-6',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Counter-Sniper',
          description:
            "[CHOOSE ONE] When a creature makes a ranged attack against you or an ally within 10 feet of you and you can see the attacker, you can use your reaction to make a ranged weapon attack against that creature. If your attack hits and deals damage greater than the triggering attack's damage, the triggering attack misses. You can use this a number of times equal to your Dexterity modifier, regaining all uses on a long rest.",
          featureType: 'option',
          optionGroup: 'vostroyan-level-6',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: 'dexterity',
          tags: ['attack', 'defensive'],
        },
        {
          level: 6,
          name: 'Weakpoint Targeting (Enhanced)',
          description:
            '[CHOOSE ONE] Your Weakpoint Targeting effects are enhanced. Head Shot stuns for 1 minute (save at end of each turn). Leg Shot reduces speed to 0 and knocks prone. Arm Shot causes the target to drop one held object. Vital Shot deals 3d6 instead of 2d6.',
          featureType: 'option',
          optionGroup: 'vostroyan-level-6',
          sourceFeature: 'weakpoint-targeting',
          actionType: 'passive',
          tags: ['control', 'damage'],
        },

        // ── Level 9: Deadeye ───────────────────────────────────────────────
        {
          level: 9,
          name: 'Perfect Shot',
          description:
            "Once per short rest, you can spend 1 minute lining up a perfect shot (you must be able to see your target during this time). Your next ranged weapon attack against that target is made with advantage, automatically scores a critical hit if it hits, and deals maximum damage on all damage dice. If the target moves more than 30 feet from its position before you make the attack, this feature is wasted.",
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 9,
          name: "Executioner's Eye",
          description:
            "Your ranged weapon attacks ignore all cover (half, three-quarters, and total). You can attack creatures you cannot see without disadvantage, provided you have some way of knowing their location.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 9,
          name: 'Improved Critical (Greater)',
          description:
            'Your ranged weapon attacks now score a critical hit on a roll of 18–20 on the d20.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 9,
          name: 'One Shot, One Kill',
          description:
            '[CHOOSE ONE] When you hit a creature that is at full hit points with a ranged weapon attack, the attack deals an additional 4d6 damage. You can use this once per long rest.',
          featureType: 'option',
          optionGroup: 'vostroyan-level-9',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Bullet Time',
          description:
            '[CHOOSE ONE] Once per long rest, you can enter a state of perfect focus as a bonus action. For 1 minute, your ranged weapon attacks have advantage, you automatically succeed on Concentration checks, and your speed becomes 0 (you cannot move). The effect ends early if you choose to move or are moved against your will.',
          featureType: 'option',
          optionGroup: 'vostroyan-level-9',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['attack'],
        },
        {
          level: 9,
          name: 'Perfect Shot (Enhanced)',
          description:
            "[CHOOSE ONE] Your Perfect Shot now requires only 1 action to prepare instead of 1 minute. Additionally, the target's movement threshold before the shot is wasted increases to 60 feet.",
          featureType: 'option',
          optionGroup: 'vostroyan-level-9',
          sourceFeature: 'perfect-shot',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
      ],
    },

    // ─── 5. KRIEGSMAN (DEATH KORPS OF KRIEG) ──────────────────────────────
    {
      id: 'kriegsman',
      name: 'Kriegsman (Death Korps of Krieg)',
      description:
        "The Death Korps of Krieg hail from a world that destroyed itself in nuclear fire during a civil war. The survivors, consumed by guilt for their world's rebellion, seek atonement through service and death. Kriegsmen are perhaps the most fatalistic, disciplined, and expendable soldiers in the Imperium. They wage siege warfare with methodical precision, dig trenches through any terrain, and welcome martyrdom as the ultimate service to the Emperor.",
      unlockLevel: 1,
      flavorQuote: 'In life, war. In death, peace. In life, shame. In death, atonement.',
      identity: 'Extreme durability, fearlessness, siege warfare, martyrdom, chemical warfare',
      recommendedFightingStyle: ['Defense', 'Close Quarters Battle'],
      recommendedAbilities: 'CON > STR > WIS',

      features: [
        // ── Level 1: No Pity, No Remorse, No Fear ─────────────────────────
        {
          level: 1,
          name: 'Fatalistic Devotion',
          description: 'You are immune to being frightened.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 1,
          name: 'Death Before Dishonor',
          description:
            'When you drop to 0 hit points but are not killed outright, you can use your reaction to make one melee weapon attack against a creature within reach before falling unconscious. If this attack reduces an enemy to 0 hit points, you stabilize automatically.',
          featureType: 'main',
          actionType: 'reaction',
          tags: ['attack'],
        },
        {
          level: 1,
          name: 'Trench Fighter',
          description:
            'When you are in a trench, foxhole, or behind fortifications, you gain the following benefits: +2 bonus to AC, advantage on Dexterity saving throws against effects you can see, and you can use your reaction to grant an ally within 10 feet the same AC bonus until the start of your next turn.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },

        // ── Level 3: Siege Warfare ─────────────────────────────────────────
        {
          level: 3,
          name: 'Sapper Training',
          description:
            "You gain proficiency with demolitions kits and mechanic's tools. You can use an action to plant explosives on a structure, fortification, or object. These explosives detonate at the end of your next turn, dealing 4d6 bludgeoning damage in a 10-foot radius (Dexterity save DC = 8 + your proficiency bonus + your Intelligence modifier for half damage). Against structures and objects, the damage is doubled. You can plant a number of explosives equal to your proficiency bonus, regaining all uses on a long rest.",
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Grenadier',
          description:
            'You can throw grenades as a bonus action instead of an action. Additionally, when you throw a grenade, you can throw it up to twice its normal range, and creatures have disadvantage on saving throws against your grenades.',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['attack', 'damage'],
        },
        {
          level: 3,
          name: 'Entrenchment',
          description:
            'You can use an action to begin digging a foxhole or trench. After 1 minute of digging in earth or sand, you create a 5-foot square area of cover that provides three-quarters cover to creatures within it. You can dig in other materials (stone, metal) with proper tools.',
          featureType: 'main',
          actionType: 'action',
          tags: ['defensive'],
        },
        {
          level: 3,
          name: 'Siege Specialist',
          description:
            '[CHOOSE ONE] Your explosives damage increases to 6d6 and the radius increases to 15 feet. You can now set explosives with a delayed detonation of up to 10 minutes.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-3',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Bayonet Charge',
          description:
            '[CHOOSE ONE] When you move at least 20 feet in a straight line toward a creature and then hit it with a melee weapon attack on the same turn, the attack deals an extra 2d6 damage. The target must succeed on a Strength saving throw (DC = 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this a number of times equal to your proficiency bonus, regaining all uses on a short rest.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-3',
          actionType: 'free',
          usesPerRest: 'short',
          usesCount: 'proficiency',
          tags: ['attack', 'damage', 'control'],
        },
        {
          level: 3,
          name: 'Trench Fighter (Enhanced)',
          description:
            '[CHOOSE ONE] Your Trench Fighter benefits now also apply when you are prone or in any form of cover (not just fortifications). The AC bonus increases to +3. Additionally, while in a trench or behind fortifications, you can make ranged attacks without revealing your position if you are hidden.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-3',
          sourceFeature: 'trench-fighter',
          actionType: 'passive',
          tags: ['defensive'],
        },

        // ── Level 6: Martyrdom Protocol ────────────────────────────────────
        {
          level: 6,
          name: 'Toxic Environment Adaptation',
          description:
            'You have immunity to poison damage and the poisoned condition. You can breathe in toxic atmospheres, chemical weapons, and other hazardous environments without suffering ill effects.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 6,
          name: 'Gas Warfare',
          description:
            "As an action, you can deploy a gas grenade up to 60 feet. The grenade creates a 20-foot radius sphere of toxic gas that spreads around corners and lasts for 1 minute or until a strong wind disperses it. Any creature that starts its turn in the area or enters it for the first time on a turn must make a Constitution saving throw (DC = 8 + your proficiency bonus + your Constitution modifier). On a failed save, the creature takes 3d6 poison damage and is poisoned until the end of its next turn. On a successful save, the creature takes half damage and is not poisoned. You can use this a number of times equal to your Constitution modifier (minimum of once), regaining all uses on a long rest.",
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: 'constitution',
          tags: ['damage', 'control'],
        },
        {
          level: 6,
          name: 'Atonement Through Suffering',
          description:
            "When you take damage, you can use your reaction to reduce the damage by an amount equal to 1d10 + your Constitution modifier. Once you use this feature, you can't use it again until you finish a short or long rest.",
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['defensive'],
        },
        {
          level: 6,
          name: 'Expendable',
          description:
            '[CHOOSE ONE] When you are within 5 feet of an ally and that ally is targeted by an attack, you can use your reaction to become the target of the attack instead. If the attack hits you, you take the damage but have resistance to it.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-6',
          actionType: 'reaction',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Chemical Specialist',
          description:
            '[CHOOSE ONE] Your gas grenades now also impose disadvantage on attack rolls for creatures that fail the saving throw. Additionally, you can create specialized chemical compounds: choose incendiary (fire damage instead of poison), hallucinogenic (target is frightened instead of poisoned), or corrosive (acid damage, also damages armor reducing AC by 1 until repaired).',
          featureType: 'option',
          optionGroup: 'kriegsman-level-6',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },
        {
          level: 6,
          name: 'Death Before Dishonor (Enhanced)',
          description:
            '[CHOOSE ONE] When you use Death Before Dishonor, you can make two weapon attacks instead of one. Additionally, if either attack hits, you automatically stabilize (regardless of whether you reduce the enemy to 0 hit points).',
          featureType: 'option',
          optionGroup: 'kriegsman-level-6',
          sourceFeature: 'death-before-dishonor',
          actionType: 'passive',
          tags: ['attack'],
        },

        // ── Level 9: For the Emperor ───────────────────────────────────────
        {
          level: 9,
          name: 'Last Stand',
          description:
            'Once per long rest, when you are reduced to 0 hit points, you can choose to remain conscious and continue fighting for 1 round. During this round, you have advantage on all attack rolls and saving throws, your attacks deal maximum damage, and you have resistance to all damage. At the end of the round, you drop to 0 hit points and must begin making death saving throws normally.',
          featureType: 'core',
          actionType: 'special',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['defensive', 'attack'],
        },
        {
          level: 9,
          name: 'Inspire Through Sacrifice',
          description:
            'When you use your Death Before Dishonor feature, all allies within 30 feet who can see you gain temporary hit points equal to twice your Guardsman level and have advantage on their next attack roll.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['support'],
        },
        {
          level: 9,
          name: 'Master of Attrition',
          description:
            'You have advantage on all Constitution saving throws and death saving throws. Additionally, when you succeed on a death saving throw, you regain 1 hit point instead of just stabilizing on three successes.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 9,
          name: 'Scorched Earth',
          description:
            '[CHOOSE ONE] Once per long rest, as an action, you detonate all remaining explosives and gas grenades in your possession simultaneously, centered on yourself. All creatures within 30 feet must make a Dexterity saving throw (DC = 8 + your proficiency bonus + your Constitution modifier). On a failure, creatures take 8d6 fire damage and 4d6 poison damage and are poisoned for 1 minute. On a success, they take half damage and are not poisoned. You have resistance to this damage.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-9',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Undying Will',
          description:
            '[CHOOSE ONE] When your Last Stand round ends and you begin making death saving throws, you have three automatic successes (you stabilize immediately). Additionally, you regain 1 hit point at the start of your next turn after stabilizing this way.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-9',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 9,
          name: 'Gas Warfare (Enhanced)',
          description:
            '[CHOOSE ONE] Your gas grenade radius increases to 30 feet and the damage increases to 5d6. The gas now lasts for 2 minutes. Additionally, you are immune to all gas effects, not just your own.',
          featureType: 'option',
          optionGroup: 'kriegsman-level-9',
          sourceFeature: 'gas-warfare',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },
      ],
    },

    // ─── 6. HEAVY WEAPONS SPECIALIST ──────────────────────────────────────
    {
      id: 'heavy-weapons-specialist',
      name: 'Heavy Weapons Specialist',
      description:
        "Not all regiments emphasize individual marksmanship or small-unit tactics. Heavy Weapons Specialists are trained to wield the most devastating portable weapons in the Imperial arsenal: lascannons, heavy bolters, autocannons, and missile launchers. These soldiers provide crucial fire support, suppressing enemy positions, destroying vehicles, and laying down withering curtains of fire that no foe can cross.",
      unlockLevel: 1,
      flavorQuote: "The Emperor's wrath made manifest through superior firepower.",
      identity: 'Heavy weapon proficiency, sustained fire, defensive positions, vehicle destruction',
      recommendedFightingStyle: ['Defense', 'Archery'],
      recommendedAbilities: 'STR > CON > DEX',

      features: [
        // ── Level 1: Heavy Ordnance ────────────────────────────────────────
        {
          level: 1,
          name: 'Heavy Weapons Proficiency',
          description:
            "You gain proficiency with all heavy weapons (heavy bolter, lascannon, autocannon, missile launcher, heavy stubber, mortar). When you wield a heavy weapon, you don't suffer disadvantage from the weapon's Heavy property, even if your Strength score is below 13.",
          featureType: 'core',
          actionType: 'passive',
        },
        {
          level: 1,
          name: 'Weapon Stabilization',
          description:
            "Heavy weapons you wield don't require you to use the Setup action before firing (if they normally would). Additionally, you can move up to half your speed on the same turn you fire a heavy weapon without suffering disadvantage on the attack roll.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 1,
          name: 'Sustained Fire Doctrine',
          description:
            'When you hit a creature with a heavy weapon attack, your next attack with a heavy weapon against the same target before the end of your next turn is made with advantage.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },

        // ── Level 3: Fire Support ──────────────────────────────────────────
        {
          level: 3,
          name: 'Suppressive Barrage',
          description:
            "As an action, you can expend 10 rounds of heavy weapon ammunition to create a devastating barrage. Choose a 20-foot square area within your weapon's normal range. Until the start of your next turn, the area is heavily suppressed. Any creature that starts its turn in the area or enters it for the first time on a turn must succeed on a Wisdom saving throw (DC = 8 + your proficiency bonus + your Strength or Dexterity modifier, your choice) or become heavily suppressed until the end of their turn.\n\n**Heavily Suppressed.** The creature has disadvantage on attack rolls and ability checks, its speed is halved, and it cannot take reactions. Creatures with the Fearless trait or immunity to being frightened have advantage on this saving throw.\n\nYou can maintain this barrage by using your action on subsequent turns and expending ammunition each turn.",
          featureType: 'core',
          actionType: 'action',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Fortified Position',
          description:
            "When you don't move on your turn, you gain the following benefits until the start of your next turn: +2 bonus to AC, your heavy weapon attacks deal an additional 1d6 damage, and you have advantage on Strength and Constitution saving throws to maintain your position. This bonus damage increases to 2d6 at 7th level.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'damage'],
        },
        {
          level: 3,
          name: "Loader's Efficiency",
          description:
            "You can reload a heavy weapon as a bonus action instead of an action. Additionally, when you roll damage with a heavy weapon, you can reroll any 1s on the damage dice (you must use the new roll).",
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Pinpoint Barrage',
          description:
            "[CHOOSE ONE] When you use Suppressive Barrage, you can choose to reduce the area to a 10-foot square. If you do, the saving throw DC increases by 2, and creatures that fail take 2d6 damage of your weapon's type.",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-3',
          actionType: 'passive',
          tags: ['damage', 'control'],
        },
        {
          level: 3,
          name: 'Bracing Expert',
          description:
            '[CHOOSE ONE] When you use Fortified Position, you can also grant half cover (+2 AC and Dexterity saves) to allies within 5 feet of you. Additionally, while using Fortified Position, you cannot be moved against your will.',
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-3',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 3,
          name: 'Sustained Fire Doctrine (Enhanced)',
          description:
            "[CHOOSE ONE] When you use Sustained Fire Doctrine, the advantage on the follow-up attack also applies if you switch to a different target within 10 feet of the original target. Additionally, if both your current and follow-up attacks hit the same target, the second attack deals an extra 1d6 damage.",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-3',
          sourceFeature: 'sustained-fire-doctrine',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },

        // ── Level 6: Walking Fortress ──────────────────────────────────────
        {
          level: 6,
          name: 'Improved Fortification',
          description:
            'When you use your Fortified Position feature, the AC bonus increases to +3, and you have advantage on saving throws against being knocked prone, pushed, or moved against your will. Additionally, while using Fortified Position, allies within 10 feet of you gain half cover.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Devastating Fire',
          description:
            "When you hit a creature with a heavy weapon attack, you can choose to make the attack devastating. The attack deals an additional 3d6 damage, and if the target is a vehicle or construct, it has disadvantage on its next attack roll. You can use this a number of times equal to your proficiency bonus, regaining all uses on a short or long rest.",
          featureType: 'main',
          actionType: 'free',
          usesPerRest: 'short',
          usesCount: 'proficiency',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Anti-Armor Specialist',
          description:
            'Your attacks with heavy weapons ignore resistance to the damage type they deal. Additionally, when you attack a vehicle, construct, or creature wearing heavy armor with a heavy weapon, you score a critical hit on a roll of 19–20.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Mobile Emplacement',
          description:
            "[CHOOSE ONE] You can now use Fortified Position even if you moved up to 10 feet on your turn (instead of requiring no movement). Additionally, when you end your turn without moving more than 10 feet, you can immediately set up your Fortified Position (no action required).",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-6',
          actionType: 'passive',
          tags: ['defensive', 'movement'],
        },
        {
          level: 6,
          name: 'Armor Piercing Rounds',
          description:
            "[CHOOSE ONE] Once per turn, when you hit a creature with a heavy weapon attack, you can force it to make a Constitution saving throw (DC = 8 + your proficiency bonus + your Strength modifier). On a failure, the creature's AC is reduced by 2 until the end of your next turn. This effect doesn't stack.",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-6',
          actionType: 'free',
          tags: ['attack'],
        },
        {
          level: 6,
          name: 'Suppressive Barrage (Enhanced)',
          description:
            "[CHOOSE ONE] Your Suppressive Barrage area increases to a 30-foot square. Creatures that fail the saving throw also take 2d6 damage of your weapon's type. You can maintain the barrage even if you move up to 5 feet per turn.",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-6',
          sourceFeature: 'suppressive-barrage',
          actionType: 'passive',
          tags: ['control', 'damage'],
        },

        // ── Level 9: Emperor's Hammer ──────────────────────────────────────
        {
          level: 9,
          name: 'Maximum Firepower',
          description:
            "When you take the Attack action with a heavy weapon, you can make three attacks instead of two (or two instead of one if you don't have Extra Attack).",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 9,
          name: 'Overwhelming Barrage',
          description:
            'Once per short rest, as an action, you make one heavy weapon attack against each creature of your choice in a 30-foot cone originating from you with advantage. Alternatively, you can focus this barrage on a single target, making three heavy weapon attacks against that target with advantage. If at least two hit, the target must succeed on a Constitution saving throw (DC = 8 + your proficiency bonus + your Strength or Dexterity modifier) or be stunned until the end of your next turn.',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'damage', 'control'],
        },
        {
          level: 9,
          name: 'Unbreakable Anchor',
          description:
            'While using your Fortified Position feature, you have resistance to bludgeoning, piercing, and slashing damage, and your heavy weapon attacks ignore all cover. You can maintain Unbreakable Anchor for a number of rounds equal to your proficiency bonus per long rest.',
          featureType: 'main',
          actionType: 'passive',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['defensive', 'attack'],
        },
        {
          level: 9,
          name: 'Walking Tank',
          description:
            '[CHOOSE ONE] You can wield heavy weapons designed for vehicle mounting. These weapons deal an extra die of damage but require you to remain stationary (0 movement) while firing. Additionally, your carrying capacity for heavy weapons is doubled.',
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-9',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 9,
          name: 'Final Salvo',
          description:
            '[CHOOSE ONE] Once per long rest, when you are reduced to 0 hit points, you can use your reaction to fire one final Overwhelming Barrage before falling unconscious. This barrage automatically hits all targets.',
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-9',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 9,
          name: 'Devastating Fire (Enhanced)',
          description:
            "[CHOOSE ONE] Your Devastating Fire additional damage increases to 4d6. Against vehicles and constructs, the attack also deals an additional 2d6 damage and the target's speed is reduced to 0 until the end of its next turn.",
          featureType: 'option',
          optionGroup: 'heavy-weapons-level-9',
          sourceFeature: 'devastating-fire',
          actionType: 'passive',
          tags: ['damage'],
        },
      ],
    },
  ],

  tags: ['ranged', 'martial', 'military'],
}
