import type { Race } from '../../../types/module'

// ═══════════════════════════════════════════════════════════════════════════════
// STANDARD SPECIES
// ═══════════════════════════════════════════════════════════════════════════════

const humanGeneric: Race = {
  id: 'human',
  name: 'Human',
  description: 'A baseline Human without a designated homeworld. Adaptable and driven, Humans are the backbone of the Imperium.',
  abilityScoreIncreases: {},
  abilityScoreChoices: { choose: 2, amount: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Adaptable',
      description: 'You gain proficiency in one skill of your choice.',
    },
    {
      name: 'Determined',
      description: 'Once per long rest, when you make a d20 roll, you may reroll the die and take either result.',
    },
  ],
  languages: ['Low Gothic'],
  tier: 'standard',
  tags: ['human'],
}

const fortressWorldHuman: Race = {
  id: 'fortress-world-human',
  name: 'Human — Fortress World',
  description: `The worlds dedicated to training the Imperiums next generation of soldiers are known as fortress worlds. 
                These planets pay their tithes to the Imperium's almost entirely in the soldiers they produce, 
                often training them since childhood to join the Astra Militarum when they come of age.`,
  abilityScoreIncreases: { dexterity: 2, constitution: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Born Shooting',
      description: 'When you score a critical hit with a ranged weapon attack, you can roll one of the weapons damage dice one additional time and add it to the extra damage of the critical hit.You are proficient with all ranged weapons regardless of class restrictions.',
    },
    {
      name: 'Duck for Cover',
      description: ' It takes only 5 feet of movement to stand up from being prone.',
    },
    {
      name: 'Fortress World Training',
      description: 'You are proficient with lasguns, laspistols, autoguns, autopistols, and light armor',
    },
    {
      name: 'Tactical Retreat',
      description: 'On your turn, you can take the Disengage action as a bonus action',
    },
  ],
  languages: ['Low Gothic', 'Imperial Codes'],
  tier: 'standard',
  tags: ['human'],
}

const hiveWorldHuman: Race = {
  id: 'hive-world-human',
  name: 'Human — Hive World',
  description: 'Your home world was a hive world, home to billions of human lives that lived in sprawling cities, with towers that could caress even the skies. These cities contain some of the highest standards of living in the highest of the hive spires, and some of the lowest quality of life that live in the slums of the lower hives.',
  abilityScoreIncreases: { dexterity: 2, charisma: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Underhive Survivor',
      description: 'You gain proficiency in Stealth and Deception if those skills are not already granted by your class.',
    },
    {
      name: 'Street Smarts',
      description: 'You have advantage on Initiative rolls made in urban or enclosed environments (buildings, tunnels, hab-blocks).',
    },
  ],
  languages: ['Low Gothic', 'Underworld'],
  tier: 'standard',
  tags: ['human'],
}

const forgeWorldHuman: Race = {
  id: 'forge-world-human',
  name: 'Human — Forge World',
  description: 'Shaped by the ceaseless industry of a Mechanicus Forge World, these Humans are as much machine-tender as they are flesh.',
  abilityScoreIncreases: { intelligence: 2, constitution: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Rite of Maintenance',
      description: 'Once per long rest, you have advantage on a Technology check to repair or operate Imperial machinery. This racial bonus stacks with the Background feature of the same name.',
    },
    {
      name: 'Machine Affinity',
      description: 'You can attune to one additional tech item beyond the normal attunement limit.',
    },
  ],
  languages: ['Low Gothic', 'Binary'],
  tier: 'standard',
  tags: ['human'],
}

const deathWorldHuman: Race = {
  id: 'death-world-human',
  name: 'Human — Death World',
  description: 'Survivors of lethal biospheres where everything wants you dead. Death Worlders are hardened to toxins, predators, and the constant threat of extinction.',
  abilityScoreIncreases: { constitution: 2, wisdom: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Toxin Resistance',
      description: 'You have advantage on saving throws against poison and disease.',
    },
    {
      name: 'Apex Predator Instinct',
      description: 'You have advantage on Perception and Survival checks made in wilderness or natural environments.',
    },
  ],
  languages: ['Low Gothic', 'Tribal'],
  tier: 'standard',
  tags: ['human'],
}

const voidBornHuman: Race = {
  id: 'void-born-human',
  name: 'Human — Void Born',
  description: 'Born and raised in the cold silence of voidships and space stations, Void Born are attuned to the rhythms of the void in ways no planet-dweller ever fully comprehends.',
  abilityScoreIncreases: { dexterity: 1, intelligence: 1, wisdom: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Zero-G Adapted',
      description: 'You suffer no movement penalties in zero-gravity environments, and difficult terrain caused by the void costs no extra movement.',
    },
    {
      name: 'Voidwise',
      description: 'You have advantage on Navigation checks and Technology checks related to ships, void suits, and void-born machinery.',
    },
    {
      name: 'Void Tongue',
      description: 'You know one additional language of your choice, reflecting the eclectic crews you grew up among.',
    },
  ],
  languages: ['Low Gothic'],
  tier: 'standard',
  tags: ['human'],
}

const nobleBornHuman: Race = {
  id: 'noble-born-human',
  name: 'Human — Noble Born',
  description: 'Children of the Imperial elite — Rogue Traders, Sector Governors, Planetary Nobility. Educated, refined, and quietly ruthless.',
  abilityScoreIncreases: { charisma: 2, intelligence: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Educated',
      description: 'You gain proficiency in History and one additional Intelligence-based skill of your choice.',
    },
    {
      name: 'High Society',
      description: 'You have advantage on Persuasion checks when dealing with Imperial nobility, clergy, and high-ranking officials.',
    },
  ],
  languages: ['Low Gothic', 'High Gothic'],
  tier: 'standard',
  tags: ['human'],
}

const ratling: Race = {
  id: 'ratling',
  name: 'Ratling',
  description: 'Small, wiry, and unerringly accurate, Ratlings are an abhuman strain prized across the Imperium for their uncanny marksmanship and their equally uncanny ability to locate food.',
  abilityScoreIncreases: { dexterity: 2, charisma: 1 },
  speed: 25,
  size: 'small',
  traits: [
    {
      name: 'Natural Sniper',
      description: "You are proficient with all ranged weapons. When applying the Sharpshooter feat's -5 attack / +10 damage option, the attack penalty is reduced to -4.",
    },
    {
      name: 'Naturally Stealthy',
      description: 'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.',
    },
    {
      name: 'Lucky',
      description: 'Once per long rest, when you make a d20 roll, you may reroll the die and take either result.',
    },
  ],
  languages: ['Low Gothic', 'Underworld'],
  tier: 'standard',
  tags: ['abhuman', 'small'],
}

const felinid: Race = {
  id: 'felinid',
  name: 'Felinid',
  description: 'Lithe and feline, Felinids are an abhuman variant rumoured to be a product of ancient genetic tampering. They are prized and distrusted in equal measure.',
  abilityScoreIncreases: { dexterity: 2, wisdom: 1 },
  speed: 35,
  size: 'medium',
  traits: [
    {
      name: 'Feline Agility',
      description: 'Once per short rest, at the start of combat on your first turn, you may double your movement speed for that round only.',
    },
    {
      name: "Cat's Claws",
      description: 'Your unarmed strikes deal 1d4 slashing damage and have the finesse property.',
    },
    {
      name: 'Darkvision',
      description: 'You can see in dim light within 60 feet as if it were bright light, and in darkness as if it were dim light.',
    },
    {
      name: 'Landing',
      description: 'You have advantage on saving throws against fall damage and reduce all fall damage by 1d6.',
    },
  ],
  languages: ['Low Gothic', 'Felinid'],
  tier: 'standard',
  tags: ['abhuman'],
}

const ogryn: Race = {
  id: 'ogryn',
  name: 'Ogryn',
  description: 'Massive, loyal, and terrifyingly strong, Ogryns are a giant abhuman strain used as shock troops and heavy labour throughout the Imperium. Simple but steadfast.',
  abilityScoreIncreases: { strength: 4, constitution: 2, intelligence: -2 },
  speed: 30,
  size: 'large',
  traits: [
    {
      name: 'Powerful Build',
      description: 'You count as one size larger when determining carrying capacity and the weight you can push, drag, or lift. You also have advantage on grapple checks.',
    },
    {
      name: "Bone 'Ead",
      description: 'While not wearing armor, your AC equals 13 + your Constitution modifier. You also have advantage on saving throws against being knocked prone.',
    },
    {
      name: 'Loyal',
      description: 'While a bonded ally (a character you have declared your ward or commanding officer) is within 30 feet of you, you have advantage on saving throws against being charmed or frightened.',
    },
  ],
  drawbacks: [
    {
      name: 'Simple Minded',
      description: 'You have disadvantage on Intelligence saving throws and all Intelligence-based skill checks. You cannot take Intelligence-based class skills at character creation.',
    },
    {
      name: 'Restricted Equipment',
      description: 'You cannot use Small or Tiny equipment without modification. Standard Imperial armor must be custom-fitted at significant cost before you can wear it.',
    },
  ],
  languages: ['Low Gothic'],
  tier: 'advanced',
  tags: ['abhuman', 'large'],
}

const squat: Race = {
  id: 'squat',
  name: 'Squat (Leagues of Votann)',
  description: "Descended from ancient void-born colonists who adapted to heavy-gravity worlds, the Squats — or Kin, as they call themselves — are stubborn, resilient, and carry millennia of grudges.",
  abilityScoreIncreases: { constitution: 2, strength: 1 },
  speed: 25,
  size: 'small',
  traits: [
    {
      name: 'Dwarven Resilience',
      description: 'You have advantage on saving throws against poison and resistance to poison damage.',
    },
    {
      name: 'Stonecunning',
      description: 'You have advantage on History and Investigation checks related to stonework, mining operations, underground structures, or geological formations.',
    },
    {
      name: 'Grudge-Bearer',
      description: 'At character creation, choose one enemy type (e.g. Chaos, Orks, Eldar, Necrons). Once per short rest, you have advantage on attack rolls against a creature of that type.',
    },
  ],
  languages: ['Low Gothic', 'Squat (Khazalid)'],
  tier: 'standard',
  tags: ['abhuman', 'small'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADVANCED SPECIES  (require GM approval)
// ═══════════════════════════════════════════════════════════════════════════════

const techfused: Race = {
  id: 'techfused',
  name: 'Techfused',
  description: 'Once Human, now something more — and perhaps something less. Techfused individuals have undergone radical augmentation until the biological is secondary to the mechanical. Servants of the Omnissiah or cautionary tales, depending on who you ask.',
  abilityScoreIncreases: { constitution: 2 },
  abilityScoreChoices: { choose: 1, amount: 1 },
  speed: 30,
  size: 'medium',
  tier: 'advanced',
  traits: [
    {
      name: 'Constructed Resilience',
      description: 'You have advantage on saving throws against poison and resistance to poison damage. You are immune to non-magical disease. You cannot be magically put to sleep.',
    },
    {
      name: 'Automatic Rest',
      description: 'A long rest for you requires only 6 hours of low-power inactivity rather than sleep. During this time you remain peripherally aware of your surroundings.',
    },
    {
      name: 'Integrated Protection',
      description: 'Your augmetic chassis grants a permanent +1 bonus to AC. Your armor takes 1 hour to don or doff and cannot be forcibly removed while you are alive.',
    },
    {
      name: 'Specialized Design',
      description: 'You gain proficiency in one skill and one tool of your choice, reflecting the specific function you were augmented for.',
    },
  ],
  drawbacks: [
    {
      name: 'Mechanical Vulnerability',
      description: 'You have vulnerability to lightning damage. Effects that specifically target constructs or machines — such as EMPs and certain tech-weapons — can affect you as if you were a construct.',
    },
  ],
  languages: ['Low Gothic', 'Binary'],
  tags: ['abhuman', 'augmetic'],
}

const nightsider: Race = {
  id: 'nightsider',
  name: 'Nightsider',
  description: 'Evolved across generations on lightless worlds, Nightsiders are adapted to permanent darkness. Their eyes are vast, their movements precise, and bright light is their greatest enemy.',
  abilityScoreIncreases: { dexterity: 2, wisdom: 1 },
  speed: 30,
  size: 'medium',
  tier: 'advanced',
  traits: [
    {
      name: 'Superior Darkvision',
      description: 'You can see in darkness (including magical darkness) as clearly as daylight up to 120 feet.',
    },
    {
      name: 'Nightsider Sign',
      description: 'You can communicate silently with other Nightsiders through a tactile touch-based language. This counts as a language proficiency and requires physical contact.',
    },
    {
      name: 'Shadow Step',
      description: 'As a bonus action, you can teleport up to 30 feet to an unoccupied space you can see that is in dim light or darkness. Recharges on a short rest.',
    },
  ],
  drawbacks: [
    {
      name: 'Light Sensitivity',
      description: 'While in direct sunlight or within 10 feet of a bright artificial light source (torch, luminator, flare), you have disadvantage on attack rolls and Perception checks.',
    },
  ],
  languages: ['Low Gothic', 'Nightsider Sign'],
  tags: ['abhuman'],
}

const longshank: Race = {
  id: 'longshank',
  name: 'Longshank',
  description: 'Tall, rangy, and adapted to the vast open voids between stars, Longshanks are an abhuman variant found predominantly in void-faring communities. Their elongated frames make them formidable in space — and somewhat awkward on planetary surfaces.',
  abilityScoreIncreases: { strength: 1, dexterity: 1, constitution: 1 },
  speed: 35,
  size: 'medium',
  tier: 'advanced',
  traits: [
    {
      name: 'Long Limbed',
      description: 'Your melee attacks have +5 feet of reach compared to a creature of the same size.',
    },
    {
      name: 'Void Adapted',
      description: 'You suffer no movement penalties in zero-gravity environments. You have advantage on saving throws against vacuum exposure and other void-related hazards.',
    },
    {
      name: 'Longshank Sign',
      description: 'You are proficient in Longshank Sign, a gestural language with no written form used by Longshank communities across the void. Counts as a language proficiency.',
    },
  ],
  languages: ['Low Gothic', 'Longshank Sign'],
  tags: ['abhuman'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW STANDARD HOMEWORLDS
// ═══════════════════════════════════════════════════════════════════════════════

const imperialWorldHuman: Race = {
  id: 'imperial-world-human',
  name: 'Human — Imperial World',
  description: 'Born on one of the millions of worlds united under the Imperial Creed, you are the backbone of humanity. The standard, the average, the inheritor of ten thousand years of Imperial dominion.',
  tier: 'standard',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  traits: [
    {
      name: 'Skill Proficiency',
      description: 'You are proficient in two skills, tools, musical instruments, or artisan\'s tools of your choice.',
    },
    {
      name: 'Additional Languages',
      description: 'You can speak, read, and write two additional languages of your choice (in addition to Low Gothic).',
    },
  ],
  languages: ['Low Gothic'],
  tags: ['human'],
}

const feralWorldHuman: Race = {
  id: 'feral-world-human',
  name: 'Human — Feral World',
  description: 'Wild and untamed, your homeworld lies within the borders of the Imperium but is exploited only for its raw resources and hardier people. You learned to survive before you learned to read — if you ever learned at all.',
  tier: 'standard',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { constitution: 2, strength: 1 },
  traits: [
    {
      name: 'Powerful Build',
      description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
    },
    {
      name: 'Primal Instincts',
      description: 'You are proficient in two of the following skills: Athletics, Intimidation, Perception, and Survival.',
    },
    {
      name: 'Unnatural Toughness',
      description: 'Your hit point maximum increases by 1 at level 1, and increases by 1 every time you gain a level.',
    },
  ],
  languages: ['Low Gothic', 'Tribal'],
  tags: ['human'],
}

const feudalWorldHuman: Race = {
  id: 'feudal-world-human',
  name: 'Human — Feudal World',
  description: 'Your home is locked in the slow rhythm of monarchy and musket. While other worlds soar between stars, yours kept its kings, its longswords, and its uncomplicated certainties. You bring those certainties with you wherever you go.',
  tier: 'standard',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { strength: 2, constitution: 1 },
  traits: [
    {
      name: 'Feudal Lore',
      description: 'You have proficiency in one of the following skills of your choice: Athletics, Nature, History (Imperial), or Survival. When you make a roll with that skill, you can choose to make that roll with advantage. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses on a long rest.',
    },
    {
      name: 'Feudal World Training',
      description: 'You are proficient with light armor, medium armor, shields, and longswords.',
    },
    {
      name: 'Relentless Endurance',
      description: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. Once you use this trait, you can\'t do so again until you finish a long rest.',
    },
    {
      name: 'Savage Attacks',
      description: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.',
    },
  ],
  languages: ['Low Gothic', 'Tribal'],
  tags: ['human'],
}

const shrineWorldHuman: Race = {
  id: 'shrine-world-human',
  name: 'Human — Shrine World',
  description: 'Your homeworld is sacred ground. Pilgrims walk its roads, saints lie buried beneath its earth, and the air itself feels heavier with prayer. Wherever you go, the Emperor goes with you — or at least, you have always believed He does.',
  tier: 'standard',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { wisdom: 2, charisma: 1 },
  traits: [
    {
      name: 'Emperor\'s Blessing',
      description: 'When you or an allied creature within 30 feet of you that you can see fails an attack roll, an ability check, or a saving throw, you can roll a d4 and add it to the result. You can use this feature a number of times equal to your proficiency bonus, regaining all expended uses on a long rest.',
    },
    {
      name: 'Resilient Mind',
      description: 'You have advantage on saving throws to resist the effects of being charmed and frightened.',
    },
  ],
  languages: ['Low Gothic', 'High Gothic'],
  tags: ['human'],
}

const warWorldHuman: Race = {
  id: 'war-world-human',
  name: 'Human — War World',
  description: 'Your world has been at war so long no one remembers what for. Born on a frontline that has been a frontline for generations, you grew up between artillery runs and field rations. The peace of other worlds feels suspicious to you.',
  tier: 'standard',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: {},
  abilityScoreChoices: { choose: 2, amount: 1 },
  traits: [
    {
      name: 'Warzone Instincts',
      description: 'You have proficiency with all simple weapons and two martial weapons of your choice. Additionally, you add your proficiency bonus to initiative rolls.',
    },
    {
      name: 'Scarred Survivor',
      description: 'When a hostile creature damages you and reduces you to half your hit point maximum or below, you gain temporary hit points equal to your proficiency bonus + your Constitution modifier (minimum 1). These temporary hit points last for 1 minute. Once you use this trait, you can\'t do so again until you finish a short rest.',
    },
    {
      name: 'Skill Bonus',
      description: 'You gain proficiency in one skill of your choice.',
    },
    {
      name: 'Additional Language',
      description: 'You can speak, read, and write one additional language of your choice.',
    },
  ],
  languages: ['Low Gothic'],
  tags: ['human'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEW ADVANCED ABHUMANS
// ═══════════════════════════════════════════════════════════════════════════════

const beastman: Race = {
  id: 'beastman',
  name: 'Beastman',
  description: 'A child born wrong — twisting horns, cloven hooves, a goat\'s voice crying for its mother. Tolerated at best by the Imperium, exiled to mines or to the front lines. Despite all of that, beastmen who are treated well are remarkably loyal.',
  tier: 'advanced',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { strength: 2, constitution: 1 },
  traits: [
    {
      name: 'Ram',
      description: 'You can use your head and horns as natural weapons to make unarmed strikes. If you hit with them, you deal 1d6 + your Strength modifier kinetic damage.',
    },
    {
      name: 'Goring Rush',
      description: 'After you move at least 20 feet in a straight line on your turn, you can make one melee attack with your natural weapons as a bonus action.',
    },
    {
      name: 'Hammering Blows',
      description: 'Immediately after you hit a creature with a melee attack as part of the Attack action on your turn, you can use a bonus action to attempt to shove that target with your head or horns. The target must be no more than one size larger than you and within 5 feet of you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Strength modifier, you push it up to 10 feet away from you.',
    },
    {
      name: 'Beast Instincts',
      description: 'You have proficiency in one of the following skills of your choice: Athletics, Intimidation, Perception, or Survival.',
    },
  ],
  drawbacks: [
    {
      name: 'Corrupted Blood',
      description: 'You start with 5 Corruption Points. This Corruption cannot be reduced below 5 by any means — it is encoded in your genetics, not a stain on your soul. (GM-enforced; not auto-applied at character creation.)',
    },
  ],
  languages: ['Low Gothic'],
  tags: ['abhuman'],
}

const mutant: Race = {
  id: 'mutant',
  name: 'Mutant',
  description: 'Genetics gone wrong — a stray rib, a crooked limb, eyes that see the wrong colors. Often shot on sight in pious territories, mutants survive in shadows and slums, on the edges of civilization. Some mutations are minor. Some are not.',
  tier: 'advanced',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { constitution: 2 },
  abilityScoreChoices: { choose: 1, amount: 1 },
  traits: [
    {
      name: 'Darkvision',
      description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.',
    },
    {
      name: 'Mutant Enhancement (Level 1)',
      description: 'Choose one of the following enhancements at level 1: Manta Glide (when you fall and aren\'t incapacitated, you can subtract up to 100 feet from the fall when calculating fall damage, and you can move up to 2 feet horizontally for every 1 foot you descend), Nimble Climber (you have a climbing speed equal to your walking speed), or Underwater Adaptation (you can breathe air and water, and you have a swimming speed equal to your walking speed).',
    },
    {
      name: 'Mutant Enhancement (Level 5)',
      description: 'At 5th level, choose one of the following options, or one of the level-1 options you didn\'t take. Grappling Appendages: two extra appendages — claws or tentacles. Each is a natural weapon dealing 1d6 + Strength modifier kinetic damage; on hit, you can grapple as a bonus action. These appendages cannot wield equipment or precisely manipulate. Carapace: you gain a +1 bonus to AC when you\'re not wearing heavy armor. Acid Spit: when you take the Attack action, you can replace one of your attacks with a stream of acid from glands in your mouth, targeting one creature or object you can see within 30 feet. The target takes 2d10 acid damage unless it succeeds on a Dexterity saving throw against a DC equal to 8 + your Constitution modifier + your proficiency bonus. You can use Acid Spit a number of times equal to your proficiency bonus, regaining all expended uses on a long rest.',
    },
  ],
  drawbacks: [
    {
      name: 'Outcast',
      description: 'You have disadvantage on Charisma checks when interacting with Imperial authorities or devout citizens. Many view you with suspicion or disgust.',
    },
  ],
  languages: ['Low Gothic'],
  tags: ['abhuman'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESTRICTED SPECIES  (GM approval required, hard class restrictions)
// ═══════════════════════════════════════════════════════════════════════════════

const blank: Race = {
  id: 'blank',
  name: 'Blank',
  description: 'You were born without a soul. The Pariah Gene, a mutation so rare it occurs in roughly one in a billion humans, makes you anathema to psykers, daemons, and the Warp itself. Most people who meet you feel a creeping wrongness they cannot name. Some adore you for it. Most fear you.',
  tier: 'restricted',
  size: 'medium',
  speed: 30,
  abilityScoreIncreases: { wisdom: 2 },
  abilityScoreChoices: { choose: 2, amount: 1 },
  incompatibleClasses: ['psyker'],
  traits: [
    {
      name: 'Soulless',
      description: 'You are invisible to the powers of the Warp. You are hidden from psychic powers and effects that determine your location, including divination. You can\'t be seen by psychic scrying. You can\'t be possessed. You are immune to psychic powers and effects that would read your thoughts or emotions, such as Detect Thoughts.',
    },
    {
      name: 'Psychic Anathema',
      description: 'You have advantage on saving throws against psychic powers.',
    },
    {
      name: 'Null Resistance',
      description: 'You have resistance to damage caused by psychic powers and effects, and to psychic damage. When you suffer the effects of a psychic power or effect, you can use this trait to become immune to any and all effects of that power or effect. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses on a long rest.',
    },
  ],
  drawbacks: [
    {
      name: 'Warp Intolerance',
      description: 'You are unable to manifest psychic powers. You cannot gain levels in the Psyker class.',
    },
    {
      name: 'Unsettling Presence',
      description: 'Your presence is deeply disturbing to all creatures with souls. You have disadvantage on Charisma (Persuasion) checks against non-Blanks. Psykers within 30 feet of you feel intense discomfort and have disadvantage on Concentration checks.',
    },
    {
      name: 'Anathema to All',
      description: 'You cannot benefit from beneficial psychic powers or effects cast by allies. Healing, buffs, wards — if it is psychic in origin, it has no effect on you. Your allies\' psyker cannot shield you or mend your wounds with Warp energy.',
    },
    {
      name: 'Dead to the Warp',
      description: 'You have no presence in the Warp whatsoever. You cannot gain Faith Points above 10, and you cannot use Acts of Faith. The Emperor\'s light does not reach a soul that does not exist.',
    },
  ],
  languages: ['Low Gothic'],
  tags: ['abhuman', 'pariah'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const coreRaces: Race[] = [
  // Standard
  humanGeneric,
  fortressWorldHuman,
  hiveWorldHuman,
  forgeWorldHuman,
  deathWorldHuman,
  voidBornHuman,
  nobleBornHuman,
  imperialWorldHuman,
  feralWorldHuman,
  feudalWorldHuman,
  shrineWorldHuman,
  warWorldHuman,
  ratling,
  felinid,
  squat,
  // Advanced (GM approval required)
  ogryn,
  techfused,
  nightsider,
  longshank,
  beastman,
  mutant,
  // Restricted (GM approval required, hard class restrictions)
  blank,
]
