import type { CharacterClass } from '../../../types/module'

/**
 * ZEALOT
 *
 * Source: WH40K_Zealot.docx
 * Paladin chassis — divine martial combatant with prayer-based spellcasting.
 * Subclass (Holy Order) at Level 3. Order features at 3, 6, 9.
 * Base class features at 1, 2, 4, 5, 7, 8, 9, 10.
 *
 * 4 Holy Orders:
 *   - Redemptionist (fire, purging, smite specialist)
 *   - Crusader (sacred weapons, anti-daemon, holy warrior)
 *   - Hospitaller (healing, protection, support)
 *   - Preacher (inspiration, fear, battlefield oratory)
 *
 * Prayers use the existing Spell type with spellSource: 'prayer'.
 * Prayer data lives in zealotPrayers.ts, registered in spells array.
 * CHA-based casting. Prayer slots identical to spell slots.
 * No Warp interaction — no warpCost, no Perils risk.
 */

export const zealot: CharacterClass = {
  id: 'zealot',
  name: 'Zealot',
  description:
    "In the 41st Millennium, faith is not merely belief — it is power. The God-Emperor's light burns through you, turning prayer into miracle, devotion into divine fire, and righteous fury into a weapon that can banish daemons and shatter heresy. Your prayers do not risk Perils of the Warp. Your miracles do not attract daemons. Your light burns clean and pure — and it burns hottest when turned against the enemies of mankind.",
  hitDie: 10,
  primaryAbility: ['charisma', 'strength'],
  savingThrows: ['wisdom', 'charisma'],
  skillChoices: [
    'athletics',
    'insight',
    'intimidation',
    'medicine',
    'perception',
    'persuasion',
    'religion',
  ],
  numSkillChoices: 2,
  armorProficiencies: ['light', 'medium', 'heavy', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  startingEquipmentOptions: [
    '(a) Flak armor and shield or (b) Carapace armor',
    '(a) Chainsword or (b) Power maul and laspistol',
    '(a) Five javelins or (b) Any simple weapon',
    "(a) Priest's pack or (b) Explorer's pack",
    'Holy symbol, prayer beads, devotional texts',
  ],
  startingWealthFormula: '5d4 × 10 Thrones',

  featureTabName: 'Acts of Faith',
  subclassLabel: 'Holy Order',

  // ─────────────────────────────────────────────────────────────────────
  //  BASE CLASS FEATURES
  // ─────────────────────────────────────────────────────────────────────

  features: [
    // ─── Level 1 ──────────────────────────────────────────────────────
    {
      level: 1,
      name: 'Divine Sense',
      description:
        "As an action, you can open your awareness to detect the presence of the unholy. Until the end of your next turn, you know the location of any daemon, undead, psyker actively channeling the Warp, or source of Corruption within 40 feet of you that is not behind total cover.\n\nYou can use this feature a number of times equal to 1 + your CHA modifier per long rest.",
      featureType: 'base',
      actionType: 'action',
      usesPerRest: 'long',
      usesCount: '1 + charisma',
      tags: ['utility', 'anti-chaos'],
    },
    {
      level: 1,
      name: 'Lay on Hands',
      description:
        "Your blessed touch can heal wounds and purge afflictions. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your Zealot level × 5.\n\nAs an action, you can touch a creature and draw power from the pool to restore hit points, up to the maximum remaining. Alternatively, you can expend 5 hit points from the pool to cure one disease or neutralize one poison. You can cure multiple diseases and neutralize multiple poisons with a single use, expending hit points separately for each.\n\nThis feature has no effect on undead or constructs.",
      featureType: 'base',
      actionType: 'action',
      usesPerRest: 'long',
      tags: ['healing'],
    },
    {
      level: 1,
      name: 'Faith Conduit',
      description:
        "Your deep connection to the Emperor's light shields you from the machinations of the Warp.\n\n**The Faithful's Shield.** You gain advantage on saving throws against Warp-based effects and resistance to Warp damage. Disadvantage imposed through Warp effects is nullified.\n\n**Consecrate Ground.** You can spend 1 hour performing a ritual to consecrate an area with a 30-foot radius. For 24 hours, daemons and undead within the area take 1d6 radiant damage at the start of each of their turns, and the area counts as consecrated ground for all Faith system purposes.",
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive', 'anti-chaos'],
    },

    // ─── Level 2 ──────────────────────────────────────────────────────
    {
      level: 2,
      name: 'Fighting Style',
      description:
        "[CHOOSE ONE] You adopt a particular style of fighting as your specialty.\n\n**Defense.** While wearing armor, you gain a +1 bonus to AC.\n\n**Dueling.** When wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls.\n\n**Great Weapon Fighting.** When you roll a 1 or 2 on a damage die for a two-handed or versatile melee weapon attack, you can reroll the die and must use the new roll.\n\n**Protection.** When a creature you can see attacks a target other than you within 5 feet, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 2,
      name: 'Spellcasting (Prayers)',
      description:
        "You have learned to channel the Emperor's divine power through sacred prayers and litanies. Your prayers are not spells in the arcane sense — they are manifestations of pure faith.\n\n**Prayer Ability:** Charisma. Prayer Save DC = 8 + proficiency + CHA modifier. Prayer Attack Bonus = proficiency + CHA modifier.\n\n**Prayers Prepared:** After a long rest, you choose which prayers to prepare from the Zealot Prayer List. Number prepared = CHA modifier + half your Zealot level (rounded down, minimum 1).\n\n**Cantrips:** You know a number of Sacred Rites as shown in the class table (3 at level 2, scaling to 5 at level 10). These are always available.\n\n**Prayer Slots:** See class table. Regain all expended slots on a long rest.\n\n**No Warp Risk:** Zealot prayers do not interact with the Warp Bar, do not risk Perils of the Warp, and do not attract daemonic attention.",
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 2,
      name: 'Divine Smite',
      description:
        "When you hit a creature with a melee weapon attack, you can expend one prayer slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level prayer slot, plus 1d8 for each slot level above 1st, to a maximum of 4d8. The damage increases by 1d8 if the target is a daemon or undead.",
      featureType: 'base',
      actionType: 'free',
      tags: ['attack', 'damage'],
    },

    // ─── Level 4 ──────────────────────────────────────────────────────
    {
      level: 4,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score by 2, or two ability scores by 1. You can't increase an ability score above 20. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 5 ──────────────────────────────────────────────────────
    {
      level: 5,
      name: 'Extra Attack',
      description:
        'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
    },

    // ─── Level 7 ──────────────────────────────────────────────────────
    {
      level: 7,
      name: 'Aura of Protection',
      description:
        'Whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your CHA modifier (minimum of +1). You must be conscious to grant this bonus.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['support', 'defensive'],
    },
    {
      level: 7,
      name: 'Divine Health',
      description:
        "The divine power flowing through you makes you immune to disease, including supernatural diseases such as Nurgle's Rot and other Chaos plagues.",
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
    },

    // ─── Level 8 ──────────────────────────────────────────────────────
    {
      level: 8,
      name: 'Ability Score Improvement',
      description:
        "You can increase one ability score by 2, or two ability scores by 1. You can't increase an ability score above 20. Alternatively, you can choose a feat.",
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 10 ─────────────────────────────────────────────────────
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
      name: 'Improved Divine Smite',
      description:
        'You are so suffused with righteous might that all your melee weapon strikes carry divine power. Whenever you hit a creature with a melee weapon attack, the creature takes an extra 1d8 radiant damage. This damage is automatic and does not consume a prayer slot. It stacks with Divine Smite if you choose to also expend a slot.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack', 'damage'],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  //  SUBCLASSES (HOLY ORDERS)
  // ─────────────────────────────────────────────────────────────────────

  subclasses: [
    // ─────────────────────────────────────────────────────────────────
    //  1. REDEMPTIONIST
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'redemptionist',
      name: 'Redemptionist',
      description:
        'The Redemptionists are the most fanatical of the Emperor\'s servants. They see fire as the ultimate purifier — burning away sin, heresy, and corruption in its cleansing embrace. Where others might show mercy or restraint, you know that only total purification through flame can save the Imperium. You are judge, jury, and executioner, and your sentence is always the same: burn.',
      unlockLevel: 3,
      flavorQuote: 'Burn the heretic! Kill the mutant! Purge the unclean!',
      identity: 'Fire, purging, aggressive melee, smite specialist',
      recommendedAbilities: 'STR > CHA > CON',

      features: [
        {
          level: 3,
          name: 'Purifying Smite',
          description:
            'When you use Divine Smite, you can choose to deal fire damage instead of radiant damage. When you deal fire damage with Divine Smite, the target must succeed on a CON save (Prayer Save DC) or catch fire, taking 1d6 fire damage at the start of each of its turns for 1 minute. The target or an adjacent creature can use an action to extinguish the flames.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 3,
          name: 'Fire Resistance',
          description:
            'You have resistance to fire damage. Additionally, when you are subjected to fire damage and reduce it with resistance, you gain temporary hit points equal to half the damage taken (after resistance).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 3,
          name: "Zealot's Brand",
          description:
            'As a bonus action, you can ignite your weapon with sacred fire for 1 minute. While ignited, the weapon deals an additional 1d4 fire damage on each hit and sheds bright light in a 10-foot radius and dim light for an additional 10 feet. You can use this a number of times equal to your CHA modifier per long rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'charisma',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Immolation Aura',
          description:
            'As a bonus action, you can wreath yourself in sacred flames for 1 minute. Any creature that hits you with a melee attack while within 5 feet takes fire damage equal to your CHA modifier. Additionally, you can use your reaction when a creature within 5 feet hits you to deal 2d6 fire damage to that creature. Uses: Proficiency bonus per long rest.',
          featureType: 'core',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['defensive', 'damage'],
        },
        {
          level: 6,
          name: 'Empowered Flames',
          description:
            "Your fire-based prayers and abilities deal additional damage equal to your CHA modifier. This applies to Cleansing Flame, Searing Smite, fire-typed Divine Smite, Zealot's Brand, and any other prayer that deals fire damage.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Spread the Fire',
          description:
            'When you use Divine Smite and deal fire damage, all enemies within 10 feet of the target must make a DEX save (Prayer Save DC) or take 1d8 fire damage. On a success, they take half damage.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Flamestorm',
          description:
            '[CHOOSE ONE] Once per short rest, as an action, you unleash a burst of sacred fire. All creatures within 15 feet must make a DEX save (Prayer Save DC). They take 4d8 fire damage on a failed save, or half on a success. Daemons and undead have disadvantage on this save.',
          featureType: 'option',
          optionGroup: 'redemptionist-level-6',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Burning Zeal',
          description:
            '[CHOOSE ONE] When you reduce a creature to 0 hit points with fire damage, you regain hit points equal to your CHA modifier + your Zealot level. You can benefit from this once per turn.',
          featureType: 'option',
          optionGroup: 'redemptionist-level-6',
          actionType: 'passive',
          tags: ['healing'],
        },
        {
          level: 6,
          name: 'Purifying Smite (Enhanced)',
          description:
            '[CHOOSE ONE] Your fire-typed Divine Smite now deals an additional 1d8 fire damage on top of the normal smite dice. The ongoing fire damage from Purifying Smite increases to 2d6 per turn.',
          featureType: 'option',
          optionGroup: 'redemptionist-level-6',
          sourceFeature: 'purifying-smite',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Avatar of Flame',
          description:
            'Once per long rest, as an action, you can transform into an avatar of sacred fire for 1 minute. While transformed: you are immune to fire damage; your melee weapon attacks deal an additional 2d8 fire damage; any creature that starts its turn within 10 feet takes fire damage equal to your CHA modifier; and you shed bright light in a 30-foot radius.',
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage', 'defensive'],
        },
        {
          level: 9,
          name: 'Maximized Smite',
          description:
            'Once per long rest, when you use Divine Smite, you can choose to maximize all the damage dice (use the maximum possible number on each die instead of rolling). If the target is a daemon or undead, you also regain one expended prayer slot of 1st level.',
          featureType: 'main',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Purge the Unclean',
          description:
            "When you deal fire or radiant damage to a daemon, undead, or Chaos-corrupted creature, that creature cannot regenerate hit points until the start of your next turn. Additionally, if the creature has resistance to fire damage, your fire attacks ignore that resistance.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage', 'anti-chaos'],
        },
        {
          level: 9,
          name: 'Apocalyptic Fire',
          description:
            '[CHOOSE ONE] Once per long rest, as an action, you call down a pillar of holy fire on a point within 120 feet. All creatures in a 20-foot radius, 40-foot-high cylinder must make a DEX save. They take 8d6 fire damage and 4d6 radiant damage on a failure, or half on a success. Daemons automatically fail the save.',
          featureType: 'option',
          optionGroup: 'redemptionist-level-9',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Phoenix Rebirth',
          description:
            '[CHOOSE ONE] Once per long rest, when you are reduced to 0 hit points, you can choose to explode in sacred fire instead of falling unconscious. All creatures within 15 feet take 6d6 fire damage (DEX save for half). You then return to life with hit points equal to your Zealot level + your CHA modifier.',
          featureType: 'option',
          optionGroup: 'redemptionist-level-9',
          actionType: 'special',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage', 'defensive'],
        },
        {
          level: 9,
          name: 'Avatar of Flame (Enhanced)',
          description:
            "[CHOOSE ONE] Your Avatar of Flame duration increases to 10 minutes. While transformed, you can fly at a speed of 30 feet. Your melee weapon attacks' extra fire damage increases to 3d8.",
          featureType: 'option',
          optionGroup: 'redemptionist-level-9',
          sourceFeature: 'avatar-of-flame',
          actionType: 'passive',
          tags: ['damage', 'movement'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    //  2. CRUSADER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'crusader',
      name: 'Crusader',
      description:
        "The Crusader is the classic holy warrior — a champion who channels the Emperor's power through consecrated weapons and righteous combat. Where the Redemptionist burns with uncontrolled fury, the Crusader fights with disciplined, holy precision. Your sacred weapon glows with the Emperor's light, your armor turns aside blows through divine favor, and your very presence on the battlefield inspires those around you.",
      unlockLevel: 3,
      flavorQuote: 'For the Emperor and the glory of mankind, we march!',
      identity: 'Sacred weapons, disciplined combat, anti-daemon specialist, holy warrior',
      recommendedAbilities: 'STR > CHA > CON',

      features: [
        {
          level: 3,
          name: 'Sacred Weapon',
          description:
            "As a bonus action, you can imbue one weapon you're holding with holy power for 1 minute. For the duration, you add your CHA modifier to attack rolls made with that weapon (minimum of +1), the weapon emits bright light in a 20-foot radius and dim light for an additional 20 feet, and the weapon counts as magical. Uses: CHA modifier per long rest.",
          featureType: 'core',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'charisma',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Daemon Bane',
          description:
            'Your attacks deal an additional 1d6 radiant damage against daemons, undead, and Chaos-corrupted creatures. This damage increases to 2d6 at 9th level.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage', 'anti-chaos'],
        },
        {
          level: 3,
          name: "Crusader's Resolve",
          description:
            'You are immune to being frightened. Additionally, when you would be charmed, you can use your reaction to make a CHA save (DC equal to the effect\'s save DC) to end the effect immediately.',
          featureType: 'main',
          actionType: 'reaction',
          tags: ['defensive'],
        },
        {
          level: 6,
          name: 'War Priest',
          description:
            'When you take the Attack action on your turn, you can make one additional weapon attack as a bonus action. Uses: CHA modifier (minimum 1) per long rest.',
          featureType: 'core',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'charisma',
          tags: ['attack'],
        },
        {
          level: 6,
          name: 'Radiant Shield',
          description:
            "When you or a creature within 10 feet is hit by an attack, you can use your reaction to add your CHA modifier to the target's AC against that attack (potentially causing it to miss). If the attack still hits, the attacker takes radiant damage equal to your CHA modifier. Uses: Proficiency bonus per long rest.",
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['defensive', 'support', 'damage'],
        },
        {
          level: 6,
          name: 'Sanctified Strikes',
          description:
            "Your weapon attacks are considered magical. Additionally, once per turn when you hit a creature with a weapon attack, you can deal an additional 1d8 radiant damage (this doesn't expend a prayer slot).",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Aura of Warding',
          description:
            '[CHOOSE ONE] You and friendly creatures within 10 feet of you have resistance to damage from prayers, psychic powers, and other magical effects.',
          featureType: 'option',
          optionGroup: 'crusader-level-6',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Righteous Charge',
          description:
            '[CHOOSE ONE] When you move at least 20 feet in a straight line toward a creature and hit it with a melee weapon attack on the same turn, the attack deals an extra 2d8 radiant damage and the target must make a STR save (Prayer Save DC) or be knocked prone. Uses: Proficiency bonus per long rest.',
          featureType: 'option',
          optionGroup: 'crusader-level-6',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['attack', 'damage', 'control'],
        },
        {
          level: 6,
          name: 'Sacred Weapon (Enhanced)',
          description:
            '[CHOOSE ONE] While your Sacred Weapon is active, critical hits deal an additional 2d8 radiant damage and emit a burst of light — all enemies within 10 feet must make a CON save or be blinded until the end of their next turn.',
          featureType: 'option',
          optionGroup: 'crusader-level-6',
          sourceFeature: 'sacred-weapon',
          actionType: 'passive',
          tags: ['attack', 'damage', 'control'],
        },
        {
          level: 9,
          name: 'Holy Avenger',
          description:
            "Once per long rest, as an action, you can channel the Emperor's full might for 1 minute. While active: your weapon attacks deal an additional 2d8 radiant damage; you have advantage on saving throws against prayers and psychic powers; and you can use Divine Smite without expending prayer slots (a number of times equal to your CHA modifier during the duration).",
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['attack', 'damage', 'defensive'],
        },
        {
          level: 9,
          name: 'Undying Crusade',
          description:
            'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. When you do, each creature of your choice within 30 feet takes radiant damage equal to 2d8 + your CHA modifier. Once used, you must finish a long rest.',
          featureType: 'main',
          actionType: 'special',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['defensive', 'damage'],
        },
        {
          level: 9,
          name: 'Daemon Slayer',
          description:
            'Your Daemon Bane damage increases to 2d6. When you reduce a daemon or undead to 0 hit points, you can use your reaction to immediately make one weapon attack against another creature within reach. Additionally, daemons and undead have disadvantage on saving throws against your prayers.',
          featureType: 'main',
          actionType: 'reaction',
          tags: ['attack', 'anti-chaos'],
        },
        {
          level: 9,
          name: 'Eternal Crusade',
          description:
            '[CHOOSE ONE] Once per long rest, when you use Holy Avenger, you can extend the effect to all willing allies within 30 feet. For the duration, their weapon attacks deal an additional 1d8 radiant damage and they have advantage on saves against being frightened and charmed.',
          featureType: 'option',
          optionGroup: 'crusader-level-9',
          actionType: 'passive',
          tags: ['support', 'damage'],
        },
        {
          level: 9,
          name: 'Banishing Strike',
          description:
            "[CHOOSE ONE] When you hit a daemon with a melee weapon attack, you can force it to make a CHA save (Prayer Save DC). On a failure, the daemon is banished back to the Warp for 1 minute. If the daemon's CR is lower than your Zealot level, the banishment is permanent. Uses: Once per long rest.",
          featureType: 'option',
          optionGroup: 'crusader-level-9',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['anti-chaos', 'control'],
        },
        {
          level: 9,
          name: 'Undying Crusade (Enhanced)',
          description:
            '[CHOOSE ONE] When Undying Crusade triggers, you regain hit points equal to your Zealot level + your CHA modifier instead of dropping to 1 HP. All allies within 30 feet also gain temporary hit points equal to your CHA modifier.',
          featureType: 'option',
          optionGroup: 'crusader-level-9',
          sourceFeature: 'undying-crusade',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    //  3. HOSPITALLER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'hospitaller',
      name: 'Hospitaller',
      description:
        "The Hospitallers are the battlefield healers and protectors of the Imperial faith. Where others bring destruction, you bring restoration. Your prayers mend shattered bones, purge toxins, and shield the faithful from harm. You are the reason your squad survives — the steady hands that drag the wounded from the line, the calm voice that steadies faltering resolve, the divine light that holds death at bay.",
      unlockLevel: 3,
      flavorQuote: "The Emperor's mercy flows through my hands. I will not let you fall.",
      identity: 'Healing, protection, condition removal, support',
      recommendedAbilities: 'CHA > WIS > CON',

      features: [
        {
          level: 3,
          name: 'Empowered Healing',
          description:
            "Whenever you use a prayer to restore hit points to a creature, the creature regains additional hit points equal to 2 + the prayer's level. Additionally, your Lay on Hands pool increases to Zealot level × 6 (instead of × 5).",
          featureType: 'core',
          actionType: 'passive',
          tags: ['healing'],
        },
        {
          level: 3,
          name: 'Preserve Life',
          description:
            "As an action, you can present your holy symbol and evoke healing energy. You restore a total number of hit points equal to 5 × your Zealot level divided among any number of creatures within 30 feet. Each creature can't regain more than half its hit point maximum. Can't be used on undead or constructs. Once per long rest.",
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['healing', 'support'],
        },
        {
          level: 3,
          name: 'Blessed Hands',
          description:
            'You gain proficiency in the Medicine skill (or expertise if already proficient). When you stabilize a creature with a Medicine check, that creature also regains 1 hit point. Additionally, you can use Lay on Hands as a bonus action (instead of an action).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['healing'],
        },
        {
          level: 6,
          name: 'Protective Ward',
          description:
            'When a creature within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d8 + your CHA modifier. Uses: CHA modifier (minimum 1) per long rest.',
          featureType: 'core',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: 'charisma',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Purifying Touch',
          description:
            "You can use your Lay on Hands to cure additional conditions: in addition to disease and poison, you can expend 5 hit points from the pool to end blinded, deafened, paralyzed, or stunned. You can expend 10 hit points to end charmed or frightened. You can also expend 15 hit points to reduce a creature's Corruption by 1d6 points (once per creature per long rest).",
          featureType: 'main',
          actionType: 'passive',
          tags: ['healing', 'support', 'anti-chaos'],
        },
        {
          level: 6,
          name: 'Life Bond',
          description:
            'As an action, you can create a divine bond between yourself and one willing creature within 30 feet. For 1 hour, whenever the bonded creature takes damage, you can choose to take half that damage instead (the bonded creature takes the other half). The bond ends if you are more than 60 feet apart. Once per short rest.',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'short',
          usesCount: '1',
          tags: ['defensive', 'support'],
        },
        {
          level: 6,
          name: 'Mass Purification',
          description:
            '[CHOOSE ONE] As an action, you can end one disease, one poison, or one condition (blinded, deafened, paralyzed, poisoned, stunned) on each creature of your choice within 30 feet. Once per long rest.',
          featureType: 'option',
          optionGroup: 'hospitaller-level-6',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['healing', 'support'],
        },
        {
          level: 6,
          name: 'Beacon of Restoration',
          description:
            '[CHOOSE ONE] When you cast a prayer that restores hit points to one creature, you can also restore hit points equal to half that amount to another creature within 10 feet of the original target.',
          featureType: 'option',
          optionGroup: 'hospitaller-level-6',
          actionType: 'passive',
          tags: ['healing'],
        },
        {
          level: 6,
          name: 'Protective Ward (Enhanced)',
          description:
            '[CHOOSE ONE] Your Protective Ward reduction increases to 3d8 + your CHA modifier. Additionally, if the damage is reduced to 0, the protected creature gains temporary hit points equal to your CHA modifier.',
          featureType: 'option',
          optionGroup: 'hospitaller-level-6',
          sourceFeature: 'protective-ward',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 9,
          name: 'Resurrection Protocol',
          description:
            'Once per long rest, you can perform a 1-minute ritual to bring a creature back to life if it died within the last hour (instead of the normal 1-minute limit for Martyrdom Denied). The creature returns with half its maximum hit points and no exhaustion levels. This does not require a prayer slot.',
          featureType: 'core',
          actionType: 'special',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['healing'],
        },
        {
          level: 9,
          name: 'Sanctuary Aura',
          description:
            'As a bonus action, you can activate a 15-foot radius aura of healing that lasts for 1 minute. At the start of each of your turns, each friendly creature in the aura (including you) regains hit points equal to your CHA modifier if they have at least 1 hit point. Additionally, allies in the aura have advantage on death saving throws. Uses: Proficiency bonus per long rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['healing', 'support'],
        },
        {
          level: 9,
          name: 'Transcendent Vitality',
          description:
            "You are immune to poison and disease. You no longer age and are immune to aging effects. Additionally, when you use Lay on Hands, you can restore a creature's maximum hit point reduction (from effects like necrotic damage or life drain).",
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 9,
          name: 'Divine Intervention',
          description:
            '[CHOOSE ONE] Once per long rest, when an ally within 60 feet would be killed outright (reduced to 0 HP by massive damage or a death effect), you can use your reaction to prevent the death. The ally drops to 1 hit point instead and gains temporary hit points equal to twice your Zealot level. You take 4d10 radiant damage that cannot be reduced in any way (the cost of defying death).',
          featureType: 'option',
          optionGroup: 'hospitaller-level-9',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['healing', 'support'],
        },
        {
          level: 9,
          name: 'Shared Vitality',
          description:
            "[CHOOSE ONE] Once per long rest, as an action, you can share your life force with all allies within 30 feet. Each ally's current and maximum hit points increase by your Zealot level + your CHA modifier for 1 hour. When the effect ends, the temporary maximum returns to normal.",
          featureType: 'option',
          optionGroup: 'hospitaller-level-9',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['support', 'healing'],
        },
        {
          level: 9,
          name: 'Sanctuary Aura (Enhanced)',
          description:
            '[CHOOSE ONE] Your Sanctuary Aura radius increases to 30 feet and the healing per turn increases to 1d8 + your CHA modifier. Additionally, allies in the aura have resistance to necrotic and poison damage.',
          featureType: 'option',
          optionGroup: 'hospitaller-level-9',
          sourceFeature: 'sanctuary-aura',
          actionType: 'passive',
          tags: ['healing', 'support', 'defensive'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    //  4. PREACHER
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'preacher',
      name: 'Preacher',
      description:
        "The Preacher is the voice of the Imperial faith on the battlefield. Where the Crusader fights with a sacred blade and the Redemptionist purges with holy fire, you wage war with words, conviction, and the sheer overwhelming force of your devotion. Your sermons can inspire allies to feats of impossible courage or reduce enemies to trembling wrecks of broken will.",
      unlockLevel: 3,
      flavorQuote: "Let my words be the Emperor's sword. Let my voice shatter the resolve of the faithless.",
      identity: 'Inspiration, crowd control, fear effects, battlefield oratory',
      recommendedAbilities: 'CHA > WIS > STR',

      features: [
        {
          level: 3,
          name: 'Inspiring Sermon',
          description:
            'As an action, you can deliver a powerful sermon that empowers allies. Choose up to a number of creatures equal to your CHA modifier (minimum 1) within 30 feet who can hear you. Each creature gains temporary hit points equal to 1d8 + your CHA modifier and advantage on their next attack roll or saving throw. Uses: Proficiency bonus per long rest.',
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['support'],
        },
        {
          level: 3,
          name: 'Denounce',
          description:
            'As a bonus action, you can point at one creature within 60 feet and denounce it as an enemy of the Emperor. The target must succeed on a WIS save (Prayer Save DC) or be frightened of you until the end of your next turn. While frightened this way, the target has disadvantage on attack rolls. Uses: CHA modifier (minimum 1) per short rest.',
          featureType: 'main',
          actionType: 'bonus-action',
          usesPerRest: 'short',
          usesCount: 'charisma',
          tags: ['control'],
        },
        {
          level: 3,
          name: 'Words of Encouragement',
          description:
            'When an ally within 30 feet who can hear you fails a saving throw or misses an attack, you can use your reaction to grant them a bonus to the roll equal to your CHA modifier (potentially turning the failure into a success). Uses: CHA modifier per long rest.',
          featureType: 'main',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: 'charisma',
          tags: ['support'],
        },
        {
          level: 6,
          name: 'Mass Inspiration',
          description:
            'When you use your Inspiring Sermon, the range increases to 60 feet and you can target all friendly creatures within range (no creature limit). Additionally, the temporary hit points increase to 2d8 + your CHA modifier.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['support'],
        },
        {
          level: 6,
          name: 'Terrifying Condemnation',
          description:
            'When a creature fails its save against your Denounce, it is frightened for 1 minute (instead of until the end of your next turn) and its speed is halved while frightened. The creature can repeat the save at the end of each of its turns, ending the effect on a success.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 6,
          name: 'Rally the Faithful',
          description:
            'As an action, you can end the frightened and charmed conditions on all allies within 30 feet who can hear you. Each creature that has a condition ended this way gains advantage on all saving throws until the end of their next turn. Uses: Proficiency bonus per long rest.',
          featureType: 'main',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['support'],
        },
        {
          level: 6,
          name: 'Fanatical Devotion',
          description:
            '[CHOOSE ONE] When you use Inspiring Sermon, allies who receive temporary hit points also gain +1 to attack rolls and damage rolls for 1 minute.',
          featureType: 'option',
          optionGroup: 'preacher-level-6',
          actionType: 'passive',
          tags: ['support', 'damage'],
        },
        {
          level: 6,
          name: 'Demoralizing Presence',
          description:
            '[CHOOSE ONE] Enemies within 10 feet of you have disadvantage on saving throws against being frightened. Additionally, when an enemy within 30 feet fails a save against being frightened by any source, it takes psychic damage equal to your CHA modifier.',
          featureType: 'option',
          optionGroup: 'preacher-level-6',
          actionType: 'passive',
          tags: ['control', 'damage'],
        },
        {
          level: 6,
          name: 'Denounce (Enhanced)',
          description:
            '[CHOOSE ONE] Your Denounce can now target up to 3 creatures simultaneously. If all targets fail the save, they also take 2d6 psychic damage.',
          featureType: 'option',
          optionGroup: 'preacher-level-6',
          sourceFeature: 'denounce',
          actionType: 'passive',
          tags: ['control', 'damage'],
        },
        {
          level: 9,
          name: 'Word of the Emperor',
          description:
            'Once per long rest, as an action, you speak with the voice of the Emperor Himself. All enemies within 60 feet who can hear you must make a WIS save (Prayer Save DC). On a failure, they are stunned until the end of your next turn and frightened of you for 1 minute. On a success, they are frightened for 1 round. Daemons and Chaos-corrupted creatures have disadvantage on this save.',
          featureType: 'core',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Deathless Fervor',
          description:
            'When an ally within 30 feet who has temporary hit points from your Inspiring Sermon or other Preacher feature is reduced to 0 hit points, the ally can continue fighting. They remain conscious and can act normally until the end of their next turn, at which point they fall unconscious and must begin making death saving throws. They can be healed during this time to remain conscious.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['support'],
        },
        {
          level: 9,
          name: 'Spiritual Fortress',
          description:
            'You and allies within 10 feet of you have advantage on saving throws against psychic damage, charm effects, and Corruption. This extends your Aura of Protection with additional resistances.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'support'],
        },
        {
          level: 9,
          name: "Emperor's Wrath",
          description:
            '[CHOOSE ONE] Once per long rest, when an ally within 60 feet is reduced to 0 hit points, you can use your reaction to channel your fury into divine power. All enemies within 30 feet of the fallen ally take 4d8 radiant damage and 4d8 psychic damage (WIS save for half). All allies within 30 feet gain temporary hit points equal to twice your Zealot level.',
          featureType: 'option',
          optionGroup: 'preacher-level-9',
          actionType: 'reaction',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['damage', 'support'],
        },
        {
          level: 9,
          name: 'Undeniable Authority',
          description:
            '[CHOOSE ONE] You have advantage on all CHA checks. Additionally, once per long rest, you can use an action to command one creature within 30 feet that can hear you (no save) to perform one action of your choice on its next turn. The creature must be able to understand you. This cannot force a creature to harm itself directly.',
          featureType: 'option',
          optionGroup: 'preacher-level-9',
          actionType: 'action',
          usesPerRest: 'long',
          usesCount: '1',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Word of the Emperor (Enhanced)',
          description:
            '[CHOOSE ONE] Your Word of the Emperor now stuns for 1 minute on a failure (save at end of each turn to end the stun). Creatures that are stunned by this effect also take 2d8 radiant damage at the start of each of their turns while stunned.',
          featureType: 'option',
          optionGroup: 'preacher-level-9',
          sourceFeature: 'word-of-the-emperor',
          actionType: 'passive',
          tags: ['control', 'damage'],
        },
      ],
    },
  ],

  tags: ['divine', 'martial', 'healer', 'anti-chaos'],
}
