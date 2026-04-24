import type { CharacterClass } from '../../../types/module'

/**
 * GENE-FIGHTER
 *
 * Source: WH40K_Gene_Fighter.docx
 * Barbarian chassis reskinned as genetic enhancement / biological weapon.
 * Subclass (Genetic Archetype) at Level 3. Archetype features at 3, 6, 9.
 * Base class features at every level.
 *
 * 3 Genetic Archetypes:
 *   - Abomination Juggernaut (unstoppable tank, massive size)
 *   - Elemental Chimera (elemental damage, reactive defenses)
 *   - Apex Predator (natural weapons, stealth, hunting)
 *
 * Class Resources:
 *   - Gene-Surges (pool, long rest reset, 3 at L1 → 4 at L6)
 *   - Genetic Stability Score (CON mod + proficiency × 2)
 *   - Genetic Instability tracker (0–10, GM-facing)
 *
 * Gene Modifications use their own GeneModification content type.
 * Modification data lives in geneModifications.ts, registered separately.
 */

export const geneFighter: CharacterClass = {
  id: 'gene-fighter',
  name: 'Gene-Fighter',
  description:
    "In the grim darkness of the far future, war demands evolution. You are a living weapon — flesh and bone enhanced, modified, and pushed beyond human limits through forbidden science, combat stimms, and genetic manipulation. Your body is a canvas of enhancement — bones reinforced with metallic compounds, blood that ignites when exposed to air, muscles that swell beyond natural limits. Every battle you survive makes you stronger. Every modification changes you further. The question is not whether you will become a monster — it is whether you will master the monster before it consumes you.",
  hitDie: 12,
  primaryAbility: ['strength', 'constitution'],
  savingThrows: ['strength', 'constitution'],
  skillChoices: [
    'athletics',
    'acrobatics',
    'intimidation',
    'perception',
    'survival',
    'medicine',
    'insight',
  ],
  numSkillChoices: 3,
  armorProficiencies: ['light', 'medium', 'shields'],
  weaponProficiencies: ['simple', 'martial'],
  toolProficiencies: [],
  startingEquipmentOptions: [
    '(a) Flak armor or (b) Leather armor',
    '(a) Chainsword and combat shield or (b) Two combat knives or (c) Power maul',
    '(a) Autopistol and 40 rounds or (b) 3 frag grenades',
    "(a) Explorer's pack or (b) Underhive pack",
    'Gene-treatment scars, injectable port (cosmetic), combat stimm injector',
  ],
  startingEquipmentResolved: {
    0: { a: ['guard-flak'],                                      b: ['flak-jacket'] },
    1: { a: ['chainsword', 'combat-shield'], b: ['combat-knife', 'combat-knife'], c: ['power-maul'] },
    2: { a: ['autopistol'],                                      b: ['frag-grenade', 'frag-grenade', 'frag-grenade'] },
    3: { a: [],                                                  b: [] },
    4: { grant: [] },
  },
  startingWealthFormula: '5d4 × 10 Thrones',

  featureTabName: 'Bio Modifications',
  subclassLabel: 'Genetic Archetype',

  classResource: {
    name: 'Gene-Surges',
    type: 'pool',
    maxFormula: 'See class table',
    resetOn: 'long',
    playerVisible: true,
    description:
      'Gene-Surges overlock all your modifications simultaneously. Lasts 1 minute. 3 uses at L1, 4 at L6. After Gene-Surge ends, you must make a Stability Check (CON save, DC = 10 + number of mods × 2).',
  },

  // ─────────────────────────────────────────────────────────────────────
  //  BASE CLASS FEATURES
  // ─────────────────────────────────────────────────────────────────────

  features: [
    // ─── Level 1 ──────────────────────────────────────────────────────
    {
      level: 1,
      name: 'Gene-Modifications',
      description:
        'Your body has been enhanced through genetic modification, chemical treatment, or biological augmentation. These modifications are permanent changes to your physiology.\n\n' +
        '**Genetic Stability Score** = Constitution modifier + (Proficiency Bonus × 2). This is how many Stability Points of modifications you can safely maintain.\n\n' +
        '**Modification Costs:** Minor = 1 Stability Point (no side effects), Major = 2 Points (manageable side effects), Extreme = 3 Points (serious side effects).\n\n' +
        '**Exceeding Threshold:** For each point over your Stability Score: disadvantage on CON saves, -1 AC, vulnerable to poison/disease. At 3+ over, risk mutation.\n\n' +
        '**Starting Mods:** Choose modifications totaling up to your Genetic Stability Score. At 3rd level, gain access to archetype-exclusive modifications.\n\n' +
        '**Each modification has three components:** Passive Effect (always active), enhanced effect During Gene-Surge, and Side Effect (mechanical cost).',
      featureType: 'base',
      actionType: 'passive',
    },
    {
      level: 1,
      name: 'Gene-Surge',
      description:
        'As a bonus action, enter a Gene-Surge lasting 1 minute (10 rounds). Ends early if knocked unconscious or ended as a bonus action.\n\n' +
        '**While in Gene-Surge:**\n' +
        '• Resistance to bludgeoning, piercing, and slashing damage\n' +
        '• +2 bonus to damage rolls with melee weapons and unarmed strikes\n' +
        '• Advantage on Strength checks and Strength saving throws\n' +
        '• Speed increases by 10 feet\n' +
        "• All Gene-Modifications become more potent (see each mod's \"During Gene-Surge\" effect)\n\n" +
        '**Restrictions:** Cannot cast spells, concentrate on spells, perform delicate tasks, or speak coherently (single-word commands only).\n\n' +
        '**Stability Check (after Surge ends):** CON save, DC = 10 + (number of mods × 2). Modifiers: +1 per unused Stability Point (Stability Reserve), +2 for ending early (Early Exit), disadvantage if over threshold.\n' +
        '• Success: No ill effects.\n' +
        '• Fail by 1–4: 1d6 necrotic per mod (cannot be reduced).\n' +
        '• Fail by 5–9: 1d8 necrotic per mod (cannot be reduced).\n' +
        '• Fail by 10+: 1d8 necrotic per mod + 1 Genetic Instability point.',
      featureType: 'base',
      actionType: 'bonus-action',
      usesPerRest: 'long',
      usesCount: 'gene-surge',
      tags: ['damage', 'defensive'],
    },
    {
      level: 1,
      name: 'Unarmored Defense',
      description:
        'While you are not wearing armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
    },

    // ─── Level 2 ──────────────────────────────────────────────────────
    {
      level: 2,
      name: 'Reckless Attack',
      description:
        'When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
      featureType: 'base',
      actionType: 'free',
      tags: ['attack'],
    },
    {
      level: 2,
      name: 'Danger Sense',
      description:
        'You have advantage on Dexterity saving throws against effects you can see, such as traps and explosions. To gain this benefit, you cannot be blinded, deafened, or incapacitated.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['defensive'],
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
    {
      level: 5,
      name: 'Fast Movement',
      description:
        'Your base walking speed increases by 10 feet while you are not wearing heavy armor. This stacks with the speed increase from Gene-Surge (total +20 feet during Surge).',
      featureType: 'base',
      actionType: 'passive',
      tags: ['movement'],
    },

    // ─── Level 6 ──────────────────────────────────────────────────────
    {
      level: 6,
      name: 'Adapted Physiology',
      description:
        'Your body has begun to stabilize around your modifications. You gain a +2 bonus to your Genetic Stability Score.\n\nAdditionally, you can now change one of your known Gene-Modifications when you finish a long rest, representing your body adapting and evolving. The new modification must be one you meet the prerequisites for. You cannot change modifications granted by your subclass.',
      featureType: 'base',
      actionType: 'passive',
    },

    // ─── Level 7 ──────────────────────────────────────────────────────
    {
      level: 7,
      name: 'Primal Instinct',
      description:
        'Your enhanced senses and combat instincts have become razor-sharp.\n\n' +
        '**Brutal Intuition.** You gain proficiency in one skill from: Athletics, Acrobatics, Perception, or Survival. If already proficient, you gain expertise.\n\n' +
        '**Combat Awareness.** You can add your Constitution modifier (minimum +1) to your initiative rolls.\n\n' +
        '**Predatory Focus.** When you roll initiative, you can choose one creature you can see within 60 feet. Until the start of your next turn, you have advantage on attack rolls against that creature, and it has disadvantage on attack rolls against creatures other than you.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack'],
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

    // ─── Level 9 ──────────────────────────────────────────────────────
    {
      level: 9,
      name: 'Brutal Critical',
      description:
        'When you score a critical hit with a melee weapon attack or unarmed strike, you can roll one additional weapon damage die when determining the extra damage.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['attack', 'damage'],
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
      name: 'Perfected Form',
      description:
        'You have mastered your enhanced biology.\n\n' +
        '**Ultimate Stability.** Your Genetic Stability Score increases by an additional 3 points (total +5 from levels 6 and 10 combined).\n\n' +
        '**Controlled Surge.** When you make a Stability Check at the end of Gene-Surge, you can add your proficiency bonus to the saving throw. This stacks with Stability Reserve and Early Exit bonuses.\n\n' +
        '**Regenerative Enhancement.** At the start of each of your turns while in Gene-Surge, if you are below half your hit point maximum, you regain hit points equal to your Constitution modifier (minimum 1).\n\n' +
        '**Reduced Downtime.** You can use Gene-Surge one additional time between long rests.',
      featureType: 'base',
      actionType: 'passive',
      tags: ['healing', 'defensive'],
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  //  SUBCLASSES (GENETIC ARCHETYPES)
  // ─────────────────────────────────────────────────────────────────────

  subclasses: [
    // ─────────────────────────────────────────────────────────────────
    //  1. ABOMINATION JUGGERNAUT
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'abomination-juggernaut',
      name: 'Abomination Juggernaut',
      description:
        "You are the unstoppable force. Whether you are an Ogryn pushed beyond even your superhuman baseline, a human bulked to impossible proportions, or a Beastman whose mutations have been weaponized into pure resilience, you are designed to absorb punishment and keep fighting. Where others dodge, you endure. Where others defend, you advance. Nothing stops the Juggernaut.",
      unlockLevel: 3,
      flavorQuote: "They tried to stop me. Lasguns, bolters, even grenades. I kept walking. I always keep walking.",
      identity: 'Massive size, exceptional durability, unstoppable charges, tank',
      recommendedAbilities: 'STR > CON > DEX',

      features: [
        {
          level: 3,
          name: 'Size Enhancement',
          description:
            "If you are Medium, you can choose to become Large. If already Large (such as an Ogryn), you count as one size larger for grappling, shoving, and carrying capacity. When Large (or counting as Huge): your reach with melee attacks increases by 5 feet, you can wield weapons designed for creatures one size larger, and you count as one size larger for determining whether you can be moved or knocked prone.",
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Immovable',
          description:
            'While in Gene-Surge, you cannot be moved against your will by any effect, and you have advantage on saving throws against being knocked prone, pushed, or pulled.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive'],
        },
        {
          level: 3,
          name: "Juggernaut's Advance",
          description:
            "When you take the Dash action, you can move through the space of any creature that is one size smaller than you. When you do, that creature must succeed on a Strength saving throw (DC = 8 + proficiency + STR) or be knocked prone and take 1d6 + your Strength modifier bludgeoning damage. You can affect each creature only once per turn.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'control', 'movement'],
        },
        {
          level: 6,
          name: 'Crushing Blow',
          description:
            'When you hit a creature with a melee weapon attack or unarmed strike, you can make it a Crushing Blow. The target must succeed on a Strength saving throw (DC = 8 + proficiency + STR) or be knocked prone and stunned until the end of your next turn. Uses: Proficiency bonus per long rest.\n\nDuring Gene-Surge: The target has disadvantage on the saving throw, and on a failed save, is also pushed 10 feet away from you.',
          featureType: 'core',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['attack', 'control'],
        },
        {
          level: 6,
          name: 'Abhuman Supremacy',
          description:
            "Your racial features are enhanced to their ultimate potential.\n\n**For Ogryn:** Powerful Build counts as Gargantuan for carrying/pushing. Big Grip lets you dual-wield two-handed weapons (bonus action for second). Ogryn Toughness grants +2 HP per level instead of +1.\n\n**For Beastman:** Horns deal 2d6 + STR. Charge attack deals +3d6. Thick Hide grants AC 14 + DEX.\n\n**For Non-Abhumans (Manufactured Juggernaut):** You gain Powerful Build. Your Unarmored Defense becomes 12 + DEX + CON (instead of 10). When you use Reckless Attack, you gain temporary hit points equal to your Constitution modifier.",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'defensive'],
        },
        {
          level: 9,
          name: 'Relentless',
          description:
            'If you drop to 0 hit points while in Gene-Surge and do not die outright, you can make a DC 15 Constitution saving throw. On a success, you drop to 1 hit point instead. Each time you use this after the first before finishing a long rest, the DC increases by 5.',
          featureType: 'core',
          actionType: 'special',
          tags: ['defensive'],
        },
        {
          level: 9,
          name: 'Siege Breaker',
          description:
            'Your melee attacks deal double damage to objects and structures. When you take the Attack action against a structure or object, you can make one additional attack as part of the same action.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 9,
          name: 'Immovable Object',
          description:
            'You have advantage on all Strength and Constitution saving throws. You are immune to being grappled, restrained, or paralyzed. Difficult terrain costs you no extra movement.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['defensive', 'movement'],
        },
        {
          level: 9,
          name: 'Terrifying Presence',
          description:
            'When a creature starts its turn within 10 feet of you while you are in Gene-Surge, it must succeed on a Wisdom saving throw (DC = 8 + proficiency + CON) or be frightened of you until the start of its next turn. Creatures that fail by 5 or more also cannot take reactions until the start of their next turn.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['control'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    //  2. ELEMENTAL CHIMERA
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'elemental-chimera',
      name: 'Elemental Chimera',
      description:
        "You are a living elemental weapon, your biology twisted and enhanced to channel fundamental forces through science rather than sorcery. Your modifications draw from phosphorescent organs that ignite your blood, specialized glands that generate electrical charges, modified digestive systems that produce industrial-strength acid, or bones mineralized into metallic compounds. You are a chimera in the truest sense: a fusion of incompatible elements forced into terrible harmony.",
      unlockLevel: 3,
      flavorQuote: "They asked what I'd become. I showed them — my blood turned to acid, my breath to flame, lightning dancing across my skin.",
      identity: 'Elemental damage, reactive defenses, environmental manipulation, high-risk high-reward',
      recommendedAbilities: 'CON > STR > DEX',

      features: [
        {
          level: 3,
          name: 'Elemental Infusion',
          description:
            "Choose one permanent elemental type: Fire, Bio-Electricity, Acid, or Metal/Stone. You gain resistance to your element's damage type (fire/lightning/acid/bludgeoning).\n\n**Elemental Strike:** Once per turn when you hit with a melee weapon attack or unarmed strike, you deal an extra 1d6 damage of your element type. Increases to 2d6 at 6th level and 3d6 at 9th.\n\n**During Gene-Surge:** Resistance becomes immunity. Elemental Strike damage doubles. You emit an Elemental Aura (see Elemental Fury).",
          featureType: 'core',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 3,
          name: 'Elemental Fury',
          description:
            'When you activate Gene-Surge, you can release an explosion of elemental energy.\n\n**Elemental Explosion:** All creatures within 10 feet make a DEX save (DC = 8 + proficiency + CON). On a failed save, they take 2d6 damage of your element type (half on success). Increases to 3d6 at 6th and 4d6 at 9th.\n\n**Elemental Aura:** For the duration of Gene-Surge, you emit a 10-foot radius aura. When a creature starts its turn in the aura or enters it for the first time on a turn, it takes your element damage equal to your CON modifier (minimum 1).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Elemental Shaping',
          description:
            'When you deal damage of your chosen element type, you can choose to have it ignore resistance (but not immunity). Uses: Proficiency bonus per long rest.',
          featureType: 'core',
          actionType: 'free',
          usesPerRest: 'long',
          usesCount: 'proficiency',
          tags: ['damage'],
        },
        {
          level: 6,
          name: 'Controlled Emission',
          description:
            'You can suppress your Elemental Aura during Gene-Surge, choosing which creatures within the aura are affected and which are not.',
          featureType: 'main',
          actionType: 'passive',
        },
        {
          level: 6,
          name: 'Elemental Adaptation',
          description:
            'Choose one benefit based on your element:\n\n' +
            '**Fire:** You can move through fire and lava without taking damage. You leave a trail of flames (5 ft wide, 10 ft long) dealing CON modifier fire damage to creatures that enter.\n\n' +
            '**Bio-Electricity:** Your speed increases by 10 feet. You can climb on any surface (including ceilings) at normal speed.\n\n' +
            '**Acid:** Your acid attacks ignore cover bonuses to AC. You can target specific objects with precision (door hinges, rope bindings, armor straps).\n\n' +
            '**Metal/Stone:** You can magnetize your body, attracting or repelling metal objects within 15 feet. Contested STR check to pull weapons from enemies, or pull yourself to metal surfaces as a bonus action (15 feet).',
          featureType: 'main',
          actionType: 'passive',
          tags: ['damage', 'movement', 'utility'],
        },
        {
          level: 9,
          name: 'Elemental Form',
          description:
            'When you enter Gene-Surge, you can transform into your Elemental Form (in addition to normal Surge effects).\n\n' +
            '**Universal:** Size increases by one category, bright light 20 ft, advantage on Intimidation, melee reach +5 ft.\n\n' +
            '**Fire Form:** Move through spaces as narrow as 1 inch. Creatures that touch/hit you in melee take 4d6 fire damage. Leave trail of fire (2d6 damage).\n\n' +
            '**Bio-Electricity Form:** Fly speed = 2× walking speed. Teleport 30 ft once per turn. Lightning arcs to second creature within 15 ft for half damage.\n\n' +
            '**Acid Form:** Burrow speed = walking speed. Ground within 15 ft becomes difficult terrain dealing 2d6 acid damage. Acid sprays in 10-ft cone when hit (3d6, DEX save).\n\n' +
            '**Metal/Stone Form:** Tremorsense 30 ft. +3 AC. Immunity to physical damage from non-magical weapons. Earthquake strike knocks prone within 15 ft (DEX save).\n\n' +
            '**Transformation Strain:** Stability Check DC increases by 5 after using Elemental Form.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['damage', 'defensive'],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────
    //  3. APEX PREDATOR
    // ─────────────────────────────────────────────────────────────────
    {
      id: 'apex-predator',
      name: 'Apex Predator',
      description:
        "You have become nature's perfect killing machine, your body enhanced with predatory adaptations that would normally require millions of years of evolution. Your modifications draw from the animal kingdom: the claws of a felid, the venomous fangs of serpents, the armored carapace of arthropods, the regenerative capability of amphibians, the enhanced senses of predators. But these are not crude animal grafts — they are refined, perfected, and combined in ways nature never achieved.",
      unlockLevel: 3,
      flavorQuote: 'They wanted to make me stronger, faster, better. They succeeded. They also made me... hungry.',
      identity: 'Natural weapons, enhanced senses, stealth, ambush, high single-target damage',
      recommendedAbilities: 'STR > DEX > CON',

      features: [
        {
          level: 3,
          name: 'Natural Weapons',
          description:
            'You grow natural weapons of your choice (claws, fangs, bone spurs, retractable talons). Your unarmed strikes deal 1d6 + STR modifier slashing, piercing, or bludgeoning damage (your choice). These natural weapons count as magical for overcoming resistance. You can use Dexterity instead of Strength for attack and damage rolls with your natural weapons.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack'],
        },
        {
          level: 3,
          name: 'Predatory Senses',
          description:
            'Choose one: Darkvision 60 feet (or increase existing by 30 feet), advantage on Perception checks that rely on smell or hearing, or Blindsight 10 feet.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['sensory'],
        },
        {
          level: 3,
          name: "Hunter's Instinct",
          description:
            "You have advantage on Wisdom (Survival) checks to track creatures, and you can track at a fast pace without penalty. Additionally, you can determine the health status of any creature you can see within 60 feet (healthy, injured, or near death).",
          featureType: 'main',
          actionType: 'passive',
          tags: ['utility'],
        },
        {
          level: 3,
          name: 'Pounce',
          description:
            'If you move at least 15 feet in a straight line toward a creature and hit it with a melee attack on the same turn, you can force a Strength saving throw (DC = 8 + proficiency + STR). On a failed save, the target is knocked prone and you can make one additional natural weapon attack as a bonus action. If the target is already prone, your additional attack scores a critical hit.',
          featureType: 'main',
          actionType: 'free',
          tags: ['attack', 'control'],
        },
        {
          level: 6,
          name: 'Improved Natural Weapons',
          description:
            'Your natural weapons deal 1d10 damage (or 2d10 if you have Retractable Claws). Additionally, your natural weapon attacks score a critical hit on a roll of 19–20.',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack', 'damage'],
        },
        {
          level: 6,
          name: 'Savage Strikes',
          description:
            'When you take the Attack action and make only natural weapon attacks, you can make one additional natural weapon attack as a bonus action.',
          featureType: 'main',
          actionType: 'bonus-action',
          tags: ['attack'],
        },
        {
          level: 6,
          name: 'Killer Instinct',
          description:
            "You have advantage on attack rolls against any creature that is below its hit point maximum. Additionally, you can always sense the location of creatures within 30 feet that are below half their hit point maximum (even if invisible or hidden).",
          featureType: 'main',
          actionType: 'passive',
          tags: ['attack', 'sensory'],
        },
        {
          level: 6,
          name: 'Terrifying Visage',
          description:
            'When you roll initiative, each creature of your choice that can see you within 30 feet must succeed on a Wisdom saving throw (DC = 8 + proficiency + CHA) or be frightened of you until the end of your next turn.',
          featureType: 'main',
          actionType: 'passive',
          tags: ['control'],
        },
        {
          level: 9,
          name: 'Perfect Predator Form',
          description:
            'When you enter Gene-Surge, you can transform into your Perfect Predator form.\n\n' +
            '**Physical:** Size +1 category, natural weapons deal 3d10, reach +5 ft, speed +20 ft (total +30 with base Surge).\n\n' +
            '**Senses:** Blindsight 60 ft, tremorsense 30 ft, see invisible/ethereal, advantage on Perception/Survival.\n\n' +
            '**Pounce (Improved):** 20 ft charge auto-knocks prone, two bonus action natural weapon attacks with advantage.\n\n' +
            '**Rending Strikes:** Two+ natural weapon hits on same creature deal extra 2d10 slashing + bleeding (2d6/turn until DC 15 Medicine or magical healing).\n\n' +
            '**Terrifying Presence:** 60 ft radius, WIS save each turn or frightened. Disadvantage on attacks/checks while frightened.\n\n' +
            '**Evasion:** Advantage on DEX saves. No damage on successful DEX save (half on fail).\n\n' +
            '**Regeneration:** Regain 10 HP at start of turn (suppressed by fire/acid).\n\n' +
            '**Hunting Focus:** Choose one creature when transforming — always know its location, advantage on attacks, ignore its resistances, it has disadvantage on saves vs your abilities.\n\n' +
            '**Transformation Strain:** Stability Check DC +5 after using this form. DC 15 WIS save when form ends or remain feral for 1 hour (can distinguish friend from foe but cannot speak, use items, or perform complex actions).',
          featureType: 'core',
          actionType: 'passive',
          tags: ['attack', 'damage', 'defensive', 'control'],
        },
      ],
    },
  ],

  tags: ['martial', 'melee', 'biological', 'tank'],
}
