import type { CharacterClass } from '../../../types/module'

/**
 * AUGMENTICIST
 *
 * Source: 04_augmenticist.md
 * Monk chassis reskinned as cybernetic enhancement.
 * Subclass (Specialization) at Level 3. Specialization features at 3, 6, 9.
 * Base class features at every level.
 *
 * 4 Specializations:
 *   - Tech-Integrator (hacker / battlefield controller)
 *   - Medicae Savant (combat medic)
 *   - Ballistic Frame (ranged weapons platform)
 *   - Velocity Frame (hypermobile striker)
 *
 * Class Resources:
 *   - Power Cells (pool, resets on short rest, starts at level 2)
 *   - Augment Slots (tracked on Character type, not ClassResource)
 *   - Martial Arts die (scales with level, encoded in feature descriptions)
 */

export const augmenticist: CharacterClass = {
  id: 'augmenticist',
  name: 'Augmenticist',
  description:
    "Your body has been enhanced with cybernetic implants that provide both utility and combat capabilities. Unlike the Gene-Fighter's permanent biological modifications, your augmentations are modular — you can swap and reconfigure your systems during a long rest. Where others rely on faith, fury, or firepower, you rely on the certainty of steel.",
  hitDie: 8,
  primaryAbility: ['dexterity', 'wisdom'],
  savingThrows: ['dexterity', 'intelligence'],
  skillChoices: [
    'acrobatics',
    'athletics',
    'technology',
    'insight',
    'medicine',
    'perception',
    'stealth',
    'survival',
  ],
  numSkillChoices: 3,
  armorProficiencies: ['light'],
  weaponProficiencies: ['simple', 'improvised weapons', 'unarmed strikes'],
  toolProficiencies: ["Mechanic's tools"],
  startingEquipmentOptions: [
    "(a) Leather armor or (b) Armored jacket and explorer's pack",
    '(a) Two combat knives or (b) Any simple weapon',
    "Mechanic's tools",
    "(a) Dungeoneer's pack or (b) Explorer's pack",
    'Starting augments (see Augmentation System)',
  ],
  startingWealthFormula: '4d4 × 10 Thrones',

  featureTabName: 'Augment Loadout',
  subclassLabel: 'Specialization',

  classResource: {
    name: 'Power Cells',
    type: 'pool',
    maxFormula: 'See class table',
    resetOn: 'short',
    playerVisible: true,
    description:
      'Power Cells fuel your augment abilities and class features. You gain Power Cells at level 2 (2 cells) scaling to 10 at level 10. Save DC = 8 + proficiency bonus + Wisdom modifier.',
  },

  // ─── BASE CLASS FEATURES ───────────────────────────────────────────────────

  features: [
    // ─── Level 1 ────────────────────────────────────────────────────────────
    {
      level: 1,
      name: 'Augmentation System',
      description:
        'Your body has been enhanced with cybernetic implants. You have a number of Augment Slots based on your level (4 at level 1, scaling to 8 at level 10). Each augment occupies 1, 2, or 3 slots depending on its complexity.\n\nAt 1st level, choose augments from the Universal Augments list totaling 4 or fewer slots. During a long rest, you can remove augments and install new ones. At 3rd level when you choose your Specialization, you also gain access to exclusive Specialization Augments.',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Unarmored Defense',
      description:
        'While you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier. You can use Unarmored Defense even while wearing light armor, using the better AC calculation.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
    },
    {
      level: 1,
      name: 'Martial Arts',
      description:
        'Your cybernetic enhancements grant you mastery of unarmed combat. While unarmed or wielding monk weapons, you can use Dexterity instead of Strength for attack and damage rolls. You can roll your Martial Arts die in place of the normal damage (1d6 at levels 1–4, 1d8 at levels 5–8, 1d10 at levels 9–10). When you take the Attack action with an unarmed strike or monk weapon, you can make one unarmed strike as a bonus action.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
    },

    // ─── Level 2 ────────────────────────────────────────────────────────────
    {
      level: 2,
      name: 'Power Cells',
      description:
        'Your cybernetic systems are powered by internal energy cells. You have 2 Power Cells at level 2, scaling to 10 at level 10. All expended Power Cells are regained on a short or long rest.\n\n**Power Cell Save DC** = 8 + your proficiency bonus + your Wisdom modifier\n\n**Flurry of Blows.** After the Attack action, spend 1 Power Cell to make two unarmed strikes as a bonus action.\n\n**Patient Defense.** Spend 1 Power Cell to take the Dodge action as a bonus action.\n\n**Step of the Wind.** Spend 1 Power Cell to Disengage or Dash as a bonus action, and your jump distance is doubled for the turn.',
      featureType: 'base',
      actionType: 'bonus-action',
      tags: ['attack', 'defensive', 'movement'],
    },
    {
      level: 2,
      name: 'Integrated Weapons',
      description:
        "Your unarmed strikes count as magical for overcoming resistance and immunity to nonmagical attacks and damage. Any augment that provides a weapon benefits from your Martial Arts feature — uses your Martial Arts damage die (if higher), can use Dexterity for attack/damage rolls, and works with Flurry of Blows and other Power Cell abilities. If you have multiple weapon augments installed, you can choose which one to use for each attack.",
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
    },
    {
      level: 2,
      name: 'Unarmored Movement',
      description:
        'Your speed increases by 10 feet while you are not wearing medium or heavy armor and not wielding a shield. This bonus increases as you level: +10 feet (levels 2–4), +15 feet (levels 5–8), +20 feet (levels 9–10).',
      featureType: 'base',
      actionType: 'passive',
      tags: ['movement'],
    },

    // ─── Level 3 ────────────────────────────────────────────────────────────
    {
      level: 3,
      name: 'Deflect Missiles',
      description:
        'You can use your reaction to deflect or catch a missile when hit by a ranged weapon attack. The damage is reduced by 1d10 + your Dexterity modifier + your Augmenticist level. If you reduce the damage to 0, you can catch the missile if it is small enough to hold in one hand and you have a hand free. You can then spend 1 Power Cell to make a ranged attack with it as part of the same reaction (proficiency, 20/60 ft range).',
      featureType: 'base',
      actionType: 'reaction',
      tags: ['defensive'],
    },

    // ─── Level 4 ────────────────────────────────────────────────────────────
    {
      level: 4,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score by 2, or two ability scores by 1. You can't increase an ability score above 20. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 4,
      name: 'Slow Fall',
      description:
        'You can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your Augmenticist level.',
      featureType: 'base',
      actionType: 'reaction',
      tags: ['defensive'],
    },

    // ─── Level 5 ────────────────────────────────────────────────────────────
    {
      level: 5,
      name: 'Extra Attack',
      description:
        'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
    },
    {
      level: 5,
      name: 'Stunning Strike',
      description:
        'When you hit another creature with a melee weapon attack, you can spend 1 Power Cell to attempt a stunning strike. The target must succeed on a Constitution saving throw (DC = your Power Cell save DC) or be stunned until the end of your next turn.',
      featureType: 'base',
      actionType: 'free',
      tags: ['control', 'attack'],
    },

    // ─── Level 6 ────────────────────────────────────────────────────────────
    {
      level: 6,
      name: 'System Hardening',
      description:
        "Your cybernetic systems have been reinforced against external threats.\n\n**Electromagnetic Resistance.** You have advantage on saving throws against effects that would disable, stun, or shut down your augments (EMP attacks, scrapcode, tech-disruption).\n\n**Augment Durability.** Your augments cannot be forcibly removed or destroyed by attacks that don't reduce you to 0 hit points.\n\n**Rapid Reboot.** If an effect disables your augments, you can spend 1 Power Cell as a bonus action to force an emergency reboot, ending the effect immediately.",
      featureType: 'base',
      actionType: 'bonus-action',
      tags: ['defensive'],
    },

    // ─── Level 7 ────────────────────────────────────────────────────────────
    {
      level: 7,
      name: 'Evasion',
      description:
        'When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
    },
    {
      level: 7,
      name: 'Stillness of Mind',
      description:
        'You can use your action to end one effect on yourself that is causing you to be charmed or frightened.',
      featureType: 'base',
      actionType: 'action',
      tags: ['defensive'],
    },

    // ─── Level 8 ────────────────────────────────────────────────────────────
    {
      level: 8,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score by 2, or two ability scores by 1. You can't increase an ability score above 20. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 9 ────────────────────────────────────────────────────────────
    {
      level: 9,
      name: 'Advanced Integration',
      description:
        "Your cybernetics have reached a level of integration that blurs the line between human and machine.\n\n**Neural Optimization.** Your Power Cell maximum increases by 3 (in addition to your normal Power Cells).\n\n**Rapid Augment Switching.** You can now swap out one augment during a short rest (instead of requiring a long rest).\n\n**System Synergy.** Choose two augments you currently have installed. These augments gain enhanced effects: damage bonuses increase by +2, skill bonuses become expertise, utility functions gain one additional use per rest, and combat abilities can be used as a bonus action (if action) or free action (if bonus action). You can change which two augments benefit whenever you reconfigure during a long rest.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 10 ───────────────────────────────────────────────────────────
    {
      level: 10,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score by 2, or two ability scores by 1. You can't increase an ability score above 20. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 10,
      name: 'Perfected Machine',
      description:
        "You have achieved the ultimate synthesis of flesh and steel.\n\n**Self-Repair Systems.** At the start of your turn, if you have at least 1 hit point, you regain hit points equal to your Wisdom modifier (minimum 1). If below half your maximum hit points, this increases to your Wisdom modifier + your proficiency bonus.\n\n**Optimal Performance.** You no longer need to eat, drink, breathe, or sleep. You require 4 hours of light activity to gain the benefits of a long rest. You are immune to disease and poison (both the condition and damage type).\n\n**Overload Protocols.** Once per long rest, as a bonus action, activate Overload for 1 minute: Martial Arts die increases by one size (d10 becomes d12), +2 AC, movement speed doubles, advantage on all STR/DEX/CON checks and saves, +1d10 force damage on all attacks. After Overload ends, you gain 1 level of exhaustion.\n\n**Machine Apotheosis.** Your unarmed strikes can deal force damage instead of bludgeoning (your choice on each attack).",
      featureType: 'base',
      actionType: 'bonus-action',
      usesPerRest: 'long',
      usesCount: '1',
      tags: ['healing', 'defensive', 'attack'],
    },
  ],

  // ─── SUBCLASSES (SPECIALIZATIONS) ──────────────────────────────────────────

  subclasses: [
    // ─── 1. TECH-INTEGRATOR ─────────────────────────────────────────────────
    {
      id: 'tech-integrator',
      name: 'Tech-Integrator',
      description:
        "Combat-viable hacker and tech manipulator. You fight by controlling the technological battlefield — disabling enemy weapons, hacking cybernetics, commandeering automated systems, and weaponizing the environment.",
      unlockLevel: 3,
      flavorQuote: 'The machine spirits obey those who understand their language. I speak fluent binary.',
      identity: 'Hacker, battlefield controller, tech manipulator',
      recommendedAbilities: 'DEX > INT > WIS',

      features: [
        // ── Level 3: Tech Savant ──────────────────────────────────────────────
        {
          level: 3,
          name: 'Universal Interface',
          description:
            'You gain expertise in the Technology skill (double your proficiency bonus). You can interface with any electronic device by touching it (no tools required). You can attempt to hack, control, or understand any technological system with a Technology check. You have advantage on Intelligence (Technology) checks to understand alien, archaic, or corrupted technology.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['utility'],
        },
        {
          level: 3,
          name: 'Combat Hacking',
          description:
            "As a bonus action, you can attempt to disable one piece of technological equipment worn or wielded by a creature within 30 feet. Choose one effect:\n\n• **Weapon Jam:** Target's ranged weapon malfunctions and cannot fire until they spend an action to clear it (WIS save to resist).\n• **Optics Blind:** Target with cybernetic eyes/targeting has disadvantage on attack rolls until end of their next turn (WIS save).\n• **System Shock:** Target with cybernetic augments takes 1d8 lightning damage and must succeed on a WIS save or have disadvantage on next attack.\n• **Interface Lock:** One piece of electronic equipment locks up for 1 minute (no save if unattended, WIS save if actively controlled).\n\nUses: Proficiency bonus per short rest. Save DC = 8 + proficiency + Intelligence modifier.",
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'proficiency',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Machine Repair',
          description:
            'As a bonus action, you can touch a damaged construct, vehicle, or piece of technological equipment and restore 1d8 + your Intelligence modifier hit points to it. Uses: Proficiency bonus per short rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'proficiency',
          tags: ['healing', 'support'],
        },

        // ── Level 6: System Override ──────────────────────────────────────────
        {
          level: 6,
          name: 'Enhanced Combat Hacking',
          description:
            'Your Combat Hacking improves: range increases to 60 feet, you can now affect two pieces of equipment or two targets simultaneously, damage increases to 2d8 lightning, and targets that rely heavily on technology (cybernetics, power armor, constructs) have disadvantage on the saving throw.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 6,
          name: 'Weaponize Environment',
          description:
            "As an action, you can spend 2 Power Cells to weaponize technological elements in your environment. Choose one effect:\n\n• **Explosive Overload:** Target one electronic device within 60 feet. It explodes in a 15-foot radius. DEX save (DC = 8 + proficiency + INT) or 4d10 fire damage, half on success.\n• **Turret Override:** Take control of an automated weapon within 60 feet. INT (Technology) check contested or DC 15. On success, you control it for 1 minute using your attack bonus.\n• **Mass Shutdown:** All electronic devices in a 30-foot radius centered on a point within 60 feet shut down for 1 minute. Creatures with cybernetics: CON save or stunned until end of their next turn. Constructs have disadvantage.\n\nUses: Once per short rest.",
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['control', 'damage'],
        },
        {
          level: 6,
          name: 'Construct Domination',
          description:
            'You can spend 3 Power Cells as an action to attempt to take control of a construct, servitor, or cybernetically-dominated creature within 60 feet. The target must make an Intelligence saving throw (DC = your Power Cell save DC). On failure, you control the creature for 10 minutes. It can repeat the save at the end of each turn (with advantage if damaged by you or allies). Constructs with INT 6 or lower have disadvantage; INT 12 or higher have advantage.',
          featureType: 'main',
          actionType: 'action',
          tags: ['control'],
        },

        // ── Level 9: System Master ────────────────────────────────────────────
        {
          level: 9,
          name: 'Total Control',
          description:
            'Your Construct Domination improves dramatically: you can control up to 3 constructs simultaneously, range increases to 120 feet, duration increases to 1 hour. You can spend 5 Power Cells (instead of 3) to make control permanent on constructs with INT 4 or lower. Dominated constructs have advantage on attack rolls and saving throws under your control.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Cybernetic Fry',
          description:
            'Once per short rest, as an action, touch a creature or hit with an unarmed strike. If they have cybernetic augments or are a construct, they must make a Constitution saving throw (DC = your Power Cell save DC). On failure: 6d10 lightning damage, paralyzed for 1 minute (repeat save each turn), all cybernetic systems shut down until they succeed. On success: half damage, not paralyzed. Against constructs: 8d10 lightning damage instead.',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['damage', 'control'],
        },
        {
          level: 9,
          name: 'Multi-Target Hacking',
          description:
            'Your Combat Hacking can now affect up to 4 targets simultaneously (instead of 2). You can mix and match effects — each target can suffer a different hack.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Network Intrusion',
          description:
            'You are always connected to local technology networks. Within 1 mile of a settlement, hive, or technological installation, you can: access any public information or records, monitor communications, detect specific types of technology, send encrypted messages to any device, and trigger alarms/open doors/cause minor malfunctions remotely. This is at-will and requires no action.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['utility'],
        },
      ],
    },

    // ─── 2. MEDICAE SAVANT ──────────────────────────────────────────────────
    {
      id: 'medicae-savant',
      name: 'Medicae Savant',
      description:
        "Combat medic who fights on the front lines while keeping allies alive. You punch enemies while simultaneously injecting stimms into wounded allies. The ONLY martial class with significant healing.",
      unlockLevel: 3,
      flavorQuote: "In the Emperor's mercy, there is healing. In my mechadendrites, there is salvation.",
      identity: 'Combat medic, frontline healer, support striker',
      recommendedAbilities: 'DEX > WIS > CON',

      features: [
        // ── Level 3: Medical Mechadendrites ───────────────────────────────────
        {
          level: 3,
          name: 'Emergency Injection',
          description:
            'As a bonus action, you can inject a target within 30 feet with emergency medical nanites. The target regains hit points equal to 1d8 + your Wisdom modifier. Uses: Wisdom modifier (minimum 1) per short rest.',
          featureType: 'core',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'wisdom',
          tags: ['healing', 'support'],
        },
        {
          level: 3,
          name: 'Combat Stabilization',
          description:
            'As a bonus action, you can stabilize a dying creature within 30 feet. They immediately stop making death saving throws and are stable at 0 hit points. This is at-will (no limit).',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['healing', 'support'],
        },
        {
          level: 3,
          name: 'Medical Expertise',
          description:
            'You gain proficiency in Medicine (or expertise if already proficient). You can diagnose diseases, poisons, and injuries with a glance (bonus action, automatic success on Medicine checks DC 15 or lower). You can use a medkit as a bonus action (instead of an action), and when you do, the target regains an extra 1d8 hit points.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['utility', 'healing'],
        },
        {
          level: 3,
          name: 'Combat Medic Training',
          description:
            "You can heal and attack in the same turn without penalty. Using Emergency Injection as a bonus action doesn't prevent you from attacking. You can use Flurry of Blows even if you used Emergency Injection this turn. You have advantage on Medicine checks made during combat.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['healing', 'attack'],
        },

        // ── Level 6: Advanced Medical Systems ─────────────────────────────────
        {
          level: 6,
          name: 'Improved Healing',
          description:
            'Your Emergency Injection improves: healing increases to 2d8 + your Wisdom modifier, range increases to 60 feet, and you can target two creatures simultaneously (costs 1 use but heals both).',
          featureType: 'core',
          actionType: 'passive',
          tags: ['healing', 'support'],
        },
        {
          level: 6,
          name: 'Resuscitation Protocols',
          description:
            "Once per short rest, as an action, you can touch an ally who has died within the last minute and restore them to life with 1 hit point. The ally's body must be mostly intact, and you must touch them (30-foot mechadendrite range applies).",
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['healing'],
        },
        {
          level: 6,
          name: 'Combat Surgery',
          description:
            'As an action, touch an ally and remove one of the following conditions: Blinded, Deafened, Paralyzed, Poisoned, or one disease. Uses: Proficiency bonus per long rest.',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['healing', 'support'],
        },
        {
          level: 6,
          name: 'Medical Analysis',
          description:
            "When you use your action to stabilize or heal a creature, you learn their current and maximum hit points, all conditions affecting them, all diseases or poisons, and whether they have any special vulnerabilities or resistances. This information updates automatically for all allies you've healed within the last hour.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['utility'],
        },

        // ── Level 9: Life Support Matrix ──────────────────────────────────────
        {
          level: 9,
          name: 'Mass Healing',
          description:
            'Once per short rest, as an action, activate your life support matrix. Medical nanites flood a 30-foot radius around you. Choose up to 6 creatures in the area (including yourself). Each creature regains 4d8 + your Wisdom modifier hit points. Additionally, all chosen creatures gain temporary hit points equal to your Wisdom modifier + your proficiency bonus.',
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['healing', 'support'],
        },
        {
          level: 9,
          name: 'Sustaining Field',
          description:
            'You project a field of medical energy around yourself. All allies within 30 feet gain: advantage on death saving throws, extra healing equal to your Wisdom modifier from any source, advantage on saves vs disease and poison, and automatic 1d4 HP regen at the start of their turn if below half HP. This field is always active while conscious.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['healing', 'support'],
        },
        {
          level: 9,
          name: 'Emergency Override',
          description:
            'Once per long rest, when an ally within 60 feet would be reduced to 0 hit points, you can use your reaction to prevent it. The ally drops to 1 hit point instead and cannot be reduced below 1 HP until the end of their next turn. After the effect ends, the ally must make a DC 15 Constitution save or gain 1 level of exhaustion.',
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['healing', 'support', 'defensive'],
        },
        {
          level: 9,
          name: 'Perfect Diagnosis',
          description:
            'You instantly know the exact nature of any injury, disease, poison, or curse affecting a creature within 60 feet. No check required. You also know the exact method to cure or remove the condition (though you may not have the resources to do so).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['utility'],
        },
      ],
    },

    // ─── 3. BALLISTIC FRAME ─────────────────────────────────────────────────
    {
      id: 'ballistic-frame',
      name: 'Ballistic Frame',
      description:
        "Walking weapons platform. Your body has been transformed into an integrated weapons system with shoulder-mounted guns, wrist-mounted blasters, chest-mounted cannons, and targeting computers. The only Augmenticist who can be equally effective at range and melee.",
      unlockLevel: 3,
      flavorQuote: "I don't need to carry a gun. I AM the gun.",
      identity: 'Ranged DPS, suppressive fire, mobile weapons platform',
      recommendedAbilities: 'DEX > WIS > CON',

      features: [
        // ── Level 3: Integrated Arsenal ───────────────────────────────────────
        {
          level: 3,
          name: 'Integrated Arsenal',
          description:
            "You have 3 integrated weapon systems (choose from: Wrist Blaster, Shoulder Cannon, Chest Blaster, Integrated Fist Guns). You can change which weapons you have during a long rest. Each integrated weapon: counts as a monk weapon, uses Dexterity for attack/damage, works with Flurry of Blows and Power Cell abilities, has unlimited ammunition, and cannot be disarmed.\n\n**Wrist Blaster:** Martial Arts die + DEX, force, 60/180 ft, Light.\n**Shoulder Cannon:** 1d10 + DEX, fire/lightning/force (choose), 80/240 ft, Heavy (bonus action to aim first time each turn).\n**Chest Blaster:** 2d6 force (no DEX), 30-ft cone, DEX save for half, once per short rest.\n**Integrated Fist Guns:** Martial Arts die + DEX, piercing, 30/90 ft, no disadvantage within 5 feet.\n\nWhen you take the Attack action, you can attack with different weapons on each attack.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Rapid Fire Protocol',
          description:
            'As a bonus action, designate one of your integrated weapons for rapid fire. Until the end of your turn, that weapon deals an extra 1d6 damage on all attacks. Uses: Proficiency bonus per short rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'proficiency',
          tags: ['damage', 'attack'],
        },
        {
          level: 3,
          name: 'Targeting Optics',
          description:
            'You ignore half cover and three-quarters cover with your integrated weapons. Your targeting computers calculate bullet trajectory around obstacles.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },

        // ── Level 6: Weapons Platform ─────────────────────────────────────────
        {
          level: 6,
          name: 'Improved Arsenal',
          description:
            "You can now install 4 integrated weapons (instead of 3). Additionally: you don't have disadvantage on ranged attacks from being prone, you can see in complete darkness to 120 feet, critical hits with integrated weapons occur on 19-20, and when you hit with a ranged attack you can use your reaction to make one more ranged attack against a different creature within 30 feet of the first target.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 6,
          name: 'Suppressive Fire',
          description:
            "You can spend 2 Power Cells as an action to lay down suppressive fire. Choose a 20-foot cube within your weapon range. Until the start of your next turn, any creature that starts its turn in the cube or enters it must make a Wisdom save (DC = Power Cell save DC) or be suppressed (disadvantage on attacks, can't take reactions, must seek cover). You can maintain suppression on subsequent turns by spending 2 Power Cells per turn as a bonus action.",
          featureType: 'main',
          actionType: 'action',
          tags: ['control'],
        },
        {
          level: 6,
          name: 'Emergency Overcharge',
          description:
            "Once per short rest, as a bonus action, overcharge all your integrated weapons for 1 minute: all integrated weapons deal an extra 2d6 damage, you can attack with TWO different integrated weapons when you take the Attack action, and your Rapid Fire Protocol bonus action doesn't cost a use. After the effect ends, you have disadvantage on ranged attack rolls for 1 minute (overheated).",
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['damage', 'attack'],
        },

        // ── Level 9: Arsenal Apotheosis ───────────────────────────────────────
        {
          level: 9,
          name: 'Maximum Firepower',
          description:
            'You can now install 5 integrated weapons. Choose one more from the list, or create a custom weapon with your GM (1d10 base, 60–120 ft range, one special property).',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 9,
          name: 'Full Auto Protocol',
          description:
            'Once per short rest, activate full auto as a bonus action for 1 minute. When you take the Attack action, you can make three attacks instead of two. Each attack uses a different integrated weapon and you can target different creatures. All attacks have advantage.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'damage'],
        },
        {
          level: 9,
          name: 'Devastating Salvo',
          description:
            'Once per long rest, as an action, unleash every weapon system simultaneously. All creatures in a 60-foot cone must make a Dexterity save (DC = Power Cell save DC). On failure: 6d10 force damage, knocked prone, stunned until end of their next turn. On success: half damage, not prone or stunned. After use, all integrated weapons shut down for 1 minute (cooldown).',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage', 'control'],
        },
        {
          level: 9,
          name: 'Adaptive Ammunition',
          description:
            'Your internal fabrication systems produce specialized ammunition. When you make an attack with an integrated weapon, you can choose to deal fire, cold, lightning, or acid damage instead of its normal damage type. You can switch freely between attacks.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack'],
        },
      ],
    },

    // ─── 4. VELOCITY FRAME ──────────────────────────────────────────────────
    {
      id: 'velocity-frame',
      name: 'Velocity Frame',
      description:
        "Hypermobile skirmisher with superhuman speed and agility. You combine monk mobility with cybernetic enhancement to become impossible to pin down. The fastest class in the game.",
      unlockLevel: 3,
      flavorQuote: "You can't hit what you can't catch.",
      identity: 'Mobile striker, skirmisher, scout, flanker',
      recommendedAbilities: 'DEX > WIS > CON',

      features: [
        // ── Level 3: Enhanced Mobility Systems ────────────────────────────────
        {
          level: 3,
          name: 'Superior Movement',
          description:
            'Your base walking speed increases by 20 feet (in addition to Unarmored Movement). You can run on vertical surfaces and across ceilings as if normal ground (must end movement on horizontal surface or fall). You ignore difficult terrain of any kind. You have advantage on saves/checks to resist being grappled, restrained, or knocked prone, and standing from prone costs 0 movement.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 3,
          name: 'Evasive Movement',
          description:
            'You can take the Disengage or Dash action as a bonus action (even without spending a Power Cell). This stacks with Step of the Wind — if you spend a Power Cell, you get both Disengage AND Dash as a bonus action, plus double jump distance.',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['movement'],
        },

        // ── Level 6: Phase Blink ──────────────────────────────────────────────
        {
          level: 6,
          name: 'Blink Step',
          description:
            "You can spend 1 Power Cell as a bonus action to blink up to 30 feet to an unoccupied space you can see. This movement doesn't provoke opportunity attacks and can pass through enemy spaces. Can be used multiple times per turn (spend more Power Cells).",
          featureType: 'core',
          actionType: 'bonus-action',
          tags: ['movement'],
        },
        {
          level: 6,
          name: 'Reactive Blink',
          description:
            'When you would be hit by an attack, you can use your reaction to spend 2 Power Cells and blink up to 15 feet away. The attack misses automatically. This repositioning happens before the attack resolves.',
          featureType: 'main',
          actionType: 'reaction',
          tags: ['defensive', 'movement'],
        },
        {
          level: 6,
          name: 'Momentum Strikes',
          description:
            'When you move at least 20 feet in a straight line before making an unarmed strike, that strike deals an extra 2d6 damage (kinetic momentum). This can trigger multiple times per turn if you keep moving.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage', 'attack'],
        },
        {
          level: 6,
          name: 'Blur Form',
          description:
            'When you move at least 30 feet on your turn, you gain the following benefits until the start of your next turn: attacks against you have disadvantage, you have advantage on Dexterity saving throws, and you leave a trail of after-images behind you.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'movement'],
        },

        // ── Level 9: Kinetic Apotheosis ───────────────────────────────────────
        {
          level: 9,
          name: 'Transcendent Speed',
          description:
            'Your speed increases by another 20 feet (total +40 feet from Specialization features). Your jump distance and height triple. At 9th level, your speed is typically 70 feet (30 base + 20 Unarmored Movement + 20 Enhanced Mobility + 20 Transcendent Speed).',
          featureType: 'core',
          actionType: 'passive',
          tags: ['movement'],
        },
        {
          level: 9,
          name: 'Multi-Strike Blitz',
          description:
            "Once per short rest, activate blitz mode as a bonus action for 1 minute. When you take the Attack action, you can make attacks against any number of creatures you move past (must move at least 10 feet between each attack, can attack the same creature multiple times if you move away and return). All attacks have advantage. This doesn't count as your Extra Attack — you still have normal attacks plus this ability.",
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['attack', 'movement'],
        },
        {
          level: 9,
          name: 'Untouchable',
          description:
            "Opportunity attacks against you automatically miss. You can move through enemy spaces without slowing down. When targeted by a ranged attack, you can use your reaction to deflect it (as Deflect Missiles but at range). You have advantage on initiative rolls. You can't be surprised while conscious.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'movement'],
        },
        {
          level: 9,
          name: 'Phase Step Mastery',
          description:
            'Your Blink Step improves: range increases to 60 feet, you can blink as a free action (still costs Power Cells), you can blink through walls (up to 5 feet of stone, 1 foot of metal), and when you blink you can make one unarmed strike immediately upon arrival (free attack).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['movement', 'attack'],
        },
        {
          level: 9,
          name: 'Kinetic Burst',
          description:
            'Once per long rest, as an action, move up to your full speed in a straight line. Every creature within 5 feet of any point along your path must make a Dexterity save (DC = Power Cell save DC) or take 6d8 force damage and be knocked prone. On success, half damage and not prone. You then make one unarmed strike against every creature you passed (automatic hits, roll damage normally).',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage', 'movement', 'control'],
        },
      ],
    },
  ],

  tags: ['martial', 'cybernetic', 'monk'],
}
