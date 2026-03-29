import type { Augment } from '../../../types/module'

// ─────────────────────────────────────────────────────────────────────────────
//  1-SLOT AUGMENTS (Minor) — Universal
// ─────────────────────────────────────────────────────────────────────────────

const opticalEnhancements: Augment = {
  id: 'optical-enhancements',
  name: 'Optical Enhancements',
  description:
    'Your eyes have been replaced or augmented with cybernetic optics.\n\n' +
    '• Darkvision 60 feet (or +30 feet if you already have darkvision)\n' +
    '• Advantage on Perception checks based on sight\n' +
    '• You can zoom in on distant objects (see clearly up to 300 feet away)\n' +
    "• Built-in recording: you can perfectly recall anything you've seen in the last 24 hours",
  slotCost: 1,
  category: 'minor',
  tags: ['sensory', 'utility'],
}

const audioFilters: Augment = {
  id: 'audio-filters',
  name: 'Audio Filters',
  description:
    'Your ears have been upgraded with mechanical audio processing.\n\n' +
    '• You cannot be deafened\n' +
    '• Advantage on Perception checks based on hearing\n' +
    '• You can filter out specific sounds (ignore loud noises, focus on whispers)\n' +
    "• Built-in recording: you can perfectly recall anything you've heard in the last 24 hours",
  slotCost: 1,
  category: 'minor',
  tags: ['sensory', 'utility'],
}

const builtInToolkit: Augment = {
  id: 'built-in-toolkit',
  name: 'Built-in Toolkit',
  description:
    'Your fingers, hands, and forearms contain integrated tools.\n\n' +
    "• You always have mechanic's tools, thieves' tools, and basic implements available\n" +
    '• You can use tools while your hands are otherwise occupied (grappled, restrained, holding weapons)\n' +
    '• Advantage on checks made with integrated tools\n' +
    '• You can use tools as a bonus action (lockpicking, repairs, hacking all take bonus action instead of action)',
  slotCost: 1,
  category: 'minor',
  actionType: 'bonus-action',
  tags: ['utility'],
}

const hiddenStorage: Augment = {
  id: 'hidden-storage',
  name: 'Hidden Storage',
  description:
    'Concealed compartments in your body.\n\n' +
    '• You can store up to 10 pounds of items inside your body (small weapons, tools, data-slates, valuables)\n' +
    '• Stored items cannot be found by normal searches (requires medical scanner or X-ray)\n' +
    '• You can retrieve or store items as a free action (you just open a panel and pull them out)\n' +
    '• Useful for smuggling, concealing weapons, or keeping important items safe',
  slotCost: 1,
  category: 'minor',
  actionType: 'free',
  tags: ['utility'],
}

const reinforcedFrame: Augment = {
  id: 'reinforced-frame',
  name: 'Reinforced Frame',
  description:
    'Your skeleton and musculature have been reinforced.\n\n' +
    '• +1 AC permanently (subdermal plating and reinforced bones)\n' +
    '• You count as one size larger for determining carrying capacity and push/drag/lift limits\n' +
    '• Advantage on saves vs being knocked prone\n' +
    '• Your unarmed strikes deal +1 damage',
  slotCost: 1,
  category: 'minor',
  tags: ['defensive', 'combat'],
}

const targetingOptics: Augment = {
  id: 'targeting-optics',
  name: 'Targeting Optics',
  description:
    'Basic targeting assistance integrated into your vision.\n\n' +
    '• +1 to ranged attack rolls\n' +
    '• You ignore half cover (your optics calculate trajectories around obstacles)\n' +
    '• You can see in dim light as if it were bright light, and in darkness as if it were dim light (enhanced light gathering)',
  slotCost: 1,
  category: 'minor',
  tags: ['combat', 'sensory'],
}

const combatStimInjector: Augment = {
  id: 'combat-stim-injector',
  name: 'Combat Stimulant Dispenser',
  description:
    'Automated emergency drug injector.\n\n' +
    '• When you drop to half your maximum hit points or lower, you can use your reaction to inject yourself with combat stimulants\n' +
    '• You gain 10 temporary hit points and advantage on your next attack roll\n' +
    '• Uses: Once per short rest',
  slotCost: 1,
  category: 'minor',
  actionType: 'reaction',
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['defensive', 'combat'],
}

const voxcasterImplant: Augment = {
  id: 'voxcaster-implant',
  name: 'Voxcaster Implant',
  description:
    'Built-in communication system.\n\n' +
    '• You can communicate via vox with any other voxcaster within 10 miles\n' +
    '• You can encrypt your transmissions (only intended recipients can understand)\n' +
    '• You can record and replay messages\n' +
    '• You can project your voice up to 100 feet away at loudspeaker volume',
  slotCost: 1,
  category: 'minor',
  tags: ['utility'],
}

const cogitatorImplant: Augment = {
  id: 'cogitator-implant',
  name: 'Cogitator Implant',
  description:
    'Data processing and memory enhancement.\n\n' +
    '• +1 to Intelligence checks\n' +
    "• You have perfect memory: can recall anything you've seen, heard, or read\n" +
    '• You can perform complex calculations instantly\n' +
    '• Advantage on saves vs effects that would alter or erase your memories',
  slotCost: 1,
  category: 'minor',
  tags: ['utility', 'sensory'],
}

const subdermalArmorPlating: Augment = {
  id: 'subdermal-armor-plating',
  name: 'Subdermal Armor Plating',
  description:
    'Thin armor plates under your skin.\n\n' +
    '• +1 AC permanently (stacks with Reinforced Frame if you have both)\n' +
    '• Resistance to slashing damage from non-magical weapons (plates deflect blades)\n' +
    '• Your skin appears metallic in bright light (obvious augmentation)',
  slotCost: 1,
  category: 'minor',
  tags: ['defensive'],
}

const chronoImplant: Augment = {
  id: 'chrono-implant',
  name: 'Chrono Implant',
  description:
    'Built-in chronometer and navigation systems.\n\n' +
    '• You always know the exact time\n' +
    "• You always know your precise location (as long as you're on a planet with working satellites)\n" +
    "• You cannot be lost (you can always navigate back to a place you've been)\n" +
    '• +2 to initiative rolls (represents perfect internal timing)',
  slotCost: 1,
  category: 'minor',
  tags: ['utility'],
}

const respiratoryFilter: Augment = {
  id: 'respiratory-filter',
  name: 'Respiratory Filter',
  description:
    'Your lungs have been augmented with filtration systems.\n\n' +
    '• You have advantage on saves vs inhaled toxins, gas, and airborne diseases\n' +
    '• You can hold your breath for 1 hour (instead of minutes)\n' +
    '• You can breathe in polluted or thin atmospheres without penalty\n' +
    '• Immune to being suffocated by smoke, ash, or dust',
  slotCost: 1,
  category: 'minor',
  tags: ['defensive', 'utility'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  2-SLOT AUGMENTS (Major) — Universal
// ─────────────────────────────────────────────────────────────────────────────

const interfacePort: Augment = {
  id: 'interface-port',
  name: 'Interface Port',
  description:
    'Direct neural connection to technology.\n\n' +
    '• You can touch any electronic device or machine and interface with it directly\n' +
    '• You can hack, control, or understand any technological system with a Technology check (advantage on the check)\n' +
    '• You can communicate with machine spirits and simple AI\n' +
    '• You can spend 1 Power Cell to automatically succeed on a Technology check (once per short rest)',
  slotCost: 2,
  category: 'major',
  actionType: 'action',
  powerCellCost: 1,
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['utility', 'hacking'],
}

const repairMechadendrite: Augment = {
  id: 'repair-mechadendrite',
  name: 'Repair Mechadendrite',
  description:
    'A flexible mechanical limb for repairs and construction.\n\n' +
    '• You have a 10-foot reach mechadendrite that can manipulate objects, use tools, and perform repairs\n' +
    '• Bonus action: You can repair a construct, vehicle, or piece of equipment, restoring 1d8 + your Intelligence modifier hit points\n' +
    '• Uses: Proficiency bonus times per short rest\n' +
    '• The mechadendrite can also grapple creatures (STR 14 for grapple checks)',
  slotCost: 2,
  category: 'major',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: 'proficiency',
  tags: ['utility', 'support', 'healing'],
}

const combatMechadendrite: Augment = {
  id: 'combat-mechadendrite',
  name: 'Combat Mechadendrite',
  description:
    'A weaponized mechadendrite for fighting.\n\n' +
    '• You have a 10-foot reach mechadendrite that can attack\n' +
    '• It counts as a monk weapon and deals your Martial Arts damage die + DEX modifier\n' +
    '• You can choose bludgeoning, piercing, or slashing damage type for each attack\n' +
    '• The mechadendrite can grapple and restrain creatures at range\n' +
    '• You can use it for Flurry of Blows and other Power Cell abilities',
  slotCost: 2,
  category: 'major',
  isWeapon: true,
  weaponProperties: ['reach'],
  tags: ['combat', 'weapon'],
}

const medicalScanner: Augment = {
  id: 'medical-scanner',
  name: 'Medical Scanner',
  description:
    'Advanced diagnostic systems.\n\n' +
    '• You can scan any creature within 30 feet and learn: current and maximum hit points, all conditions/diseases/poisons affecting them, and one vulnerability or resistance (your choice)\n' +
    '• Bonus action: Make a Wisdom (Medicine) check to diagnose a creature (advantage on the check)\n' +
    '• You gain proficiency in Medicine (or expertise if already proficient)',
  slotCost: 2,
  category: 'major',
  actionType: 'bonus-action',
  tags: ['utility', 'healing', 'sensory'],
}

const servoSkullController: Augment = {
  id: 'servo-skull-controller',
  name: 'Servo-Skull Controller',
  description:
    'You can create and control servo-skulls.\n\n' +
    '• During a long rest, you can build one servo-skull from available materials\n' +
    '• Servo-Skull Stats: Tiny construct, AC 12, 10 HP, Fly 30 feet, INT 8, follows your commands\n' +
    '• Can scout, record data, carry small objects (up to 5 pounds)\n' +
    '• Can attack: +your proficiency to hit, 1d4 + 2 damage (choice of piercing or bludgeoning)\n' +
    '• You can have one servo-skull active at a time\n' +
    '• If destroyed, you can build a new one during your next long rest',
  slotCost: 2,
  category: 'major',
  tags: ['utility', 'support'],
}

const integratedFistWeapon: Augment = {
  id: 'integrated-fist-weapon',
  name: 'Integrated Fist Weapon',
  description:
    'Your fists have been weaponized with power fields, shock systems, or blades.\n\n' +
    '• Your unarmed strikes deal your Martial Arts die + DEX modifier + 1d6 extra damage\n' +
    '• Choose one damage type for the extra damage: force, lightning, fire, or slashing\n' +
    '• Your unarmed strikes count as magical and deal this damage type\n' +
    '• Critical hits with unarmed strikes roll one additional weapon damage die',
  slotCost: 2,
  category: 'major',
  isWeapon: true,
  tags: ['combat', 'weapon'],
}

const strengthAugmentation: Augment = {
  id: 'strength-augmentation',
  name: 'Strength Augmentation',
  description:
    'Hydraulic muscle enhancement.\n\n' +
    '• +2 to Strength score (maximum 20)\n' +
    '• You count as two sizes larger for push/drag/lift calculations\n' +
    '• Advantage on Strength checks and saves\n' +
    '• Your unarmed strikes and melee attacks deal +2 damage',
  slotCost: 2,
  category: 'major',
  tags: ['combat', 'utility'],
}

const enhancedReflexes: Augment = {
  id: 'enhanced-reflexes',
  name: 'Enhanced Reflexes',
  description:
    'Neural acceleration and reflex boosters.\n\n' +
    '• +2 to Dexterity score (maximum 20)\n' +
    '• +2 to initiative rolls\n' +
    '• Advantage on Dexterity saves\n' +
    '• When you roll for initiative, you can choose to act first in the first round (once per long rest)',
  slotCost: 2,
  category: 'major',
  tags: ['combat', 'defensive'],
}

const grapplingMechadendrite: Augment = {
  id: 'grappling-mechadendrite',
  name: 'Grappling Mechadendrite',
  description:
    'Utility mechadendrite optimized for grappling and manipulation.\n\n' +
    '• 10-foot reach mechadendrite (can manipulate objects, pull levers, pick locks from range)\n' +
    '• Can grapple creatures at range (up to 10 feet away)\n' +
    "• Advantage on grapple checks with the mechadendrite (it's very strong)\n" +
    '• Can use the mechadendrite to climb (advantage on Athletics checks to climb)\n' +
    '• Can use it as a weapon (deals your Martial Arts die + DEX)',
  slotCost: 2,
  category: 'major',
  isWeapon: true,
  weaponProperties: ['reach'],
  tags: ['utility', 'combat', 'weapon'],
}

const jumpJets: Augment = {
  id: 'jump-jets',
  name: 'Jump Jets',
  description:
    'Integrated jets for enhanced mobility.\n\n' +
    '• Your jump distance triples (not doubles, triples)\n' +
    "• You can hover in place for up to 1 minute per day (doesn't have to be consecutive)\n" +
    '• You take no falling damage from falls of 60 feet or less (jets slow your descent)\n' +
    '• Once per short rest, you can activate jets as a bonus action to gain +30 feet fly speed for 1 minute',
  slotCost: 2,
  category: 'major',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['movement'],
}

const integratedWeaponCustom: Augment = {
  id: 'integrated-weapon-custom',
  name: 'Integrated Weapon (Custom)',
  description:
    "Choose one martial weapon. It's integrated into your body.\n\n" +
    '• The weapon is part of your body and cannot be disarmed\n' +
    '• It counts as a monk weapon (benefits from Martial Arts, can be used with Flurry of Blows)\n' +
    '• You can use DEX for attack and damage rolls with it\n' +
    '• It deals its normal weapon damage (not Martial Arts die, unless Martial Arts die is higher)\n' +
    '• You can conceal the weapon (it retracts into your arm or unfolds from your body)\n\n' +
    'Examples: Integrated chainsword, integrated power maul, integrated las pistol',
  slotCost: 2,
  category: 'major',
  isWeapon: true,
  weaponProperties: ['finesse'],
  tags: ['combat', 'weapon'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  3-SLOT AUGMENTS (Extreme) — Universal
// ─────────────────────────────────────────────────────────────────────────────

const forceFieldGenerator: Augment = {
  id: 'force-field-generator',
  name: 'Force Field Generator',
  description:
    'Personal shield projector.\n\n' +
    '• Bonus action: You activate your force field\n' +
    '• You gain temporary hit points equal to 5 × your Augmenticist level\n' +
    '• While you have these temporary hit points, you have resistance to all damage\n' +
    '• The field lasts until the temporary hit points are depleted or 10 minutes pass\n' +
    '• Uses: Once per short rest',
  slotCost: 3,
  category: 'extreme',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['defensive'],
}

const flightSystem: Augment = {
  id: 'flight-system',
  name: 'Flight System',
  description:
    'Full flight capability (jetpack, grav-thrusters, or anti-gravity field).\n\n' +
    '• You gain a fly speed equal to your walking speed\n' +
    '• You can hover in place\n' +
    "• You don't take falling damage (flight systems catch you)\n" +
    '• Flight is at-will and costs no resources (your power cells sustain it continuously)',
  slotCost: 3,
  category: 'extreme',
  tags: ['movement'],
}

const advancedTargetingArray: Augment = {
  id: 'advanced-targeting-array',
  name: 'Advanced Targeting Array',
  description:
    'Military-grade combat systems.\n\n' +
    '• +2 to all attack rolls (ranged and melee)\n' +
    '• Critical hits occur on 19-20 (instead of just 20)\n' +
    '• You can see invisible creatures within 60 feet\n' +
    '• Once per turn, you can reroll a missed attack (must use new roll)\n' +
    '• You have advantage on initiative rolls',
  slotCost: 3,
  category: 'extreme',
  tags: ['combat'],
}

const stealthFieldGenerator: Augment = {
  id: 'stealth-field-generator',
  name: 'Stealth Field Generator',
  description:
    'Active camouflage / cloaking device.\n\n' +
    '• Bonus action: You become invisible for 1 minute\n' +
    "• This invisibility doesn't end when you attack or cast spells\n" +
    '• You have advantage on Stealth checks while invisible\n' +
    '• Creatures have disadvantage on attacks against you while invisible\n' +
    '• Uses: Proficiency bonus times per long rest',
  slotCost: 3,
  category: 'extreme',
  actionType: 'bonus-action',
  usesPerRest: 'long',
  usesCount: 'proficiency',
  tags: ['utility', 'combat'],
}

const plasmaWeaponIntegration: Augment = {
  id: 'plasma-weapon-integration',
  name: 'Plasma Weapon Integration',
  description:
    'A shoulder-mounted or arm-mounted plasma weapon.\n\n' +
    '• Counts as an integrated weapon\n' +
    '• Damage: 2d10 + DEX modifier, fire damage\n' +
    '• Range: 60/180 feet\n' +
    '• **Overcharge:** Before attacking, declare overcharge. On hit, deal an extra 3d10 fire damage. You take 1d10 fire damage (Gets Hot).\n' +
    '• **AoE:** Can fire in 30-foot radius sphere at a point within range. All creatures make DEX save or take 4d10 fire damage, half on success. Uses: Once per long rest',
  slotCost: 3,
  category: 'extreme',
  actionType: 'action',
  isWeapon: true,
  tags: ['combat', 'weapon'],
}

const nanoRepairSystem: Augment = {
  id: 'nano-repair-system',
  name: 'Nano-Repair System',
  description:
    'Self-repair nanites.\n\n' +
    "• At the start of each of your turns, you regain 1d8 hit points automatically\n" +
    "• If you're below half your maximum hit points, this increases to 2d8\n" +
    '• If you take fire or acid damage, the nanites shut down until the start of your next turn\n' +
    '• This is always active (no action required, no resource cost)',
  slotCost: 3,
  category: 'extreme',
  tags: ['defensive', 'healing'],
}

const multiWeaponSystem: Augment = {
  id: 'multi-weapon-system',
  name: 'Multi-Weapon System',
  description:
    'You can install more augments.\n\n' +
    '• Your Augment Slot maximum increases by 3\n' +
    '• This augment costs 3 slots but grants 3 more — net zero, but unlocks room for an additional powerful augment\n\n' +
    '**Why take this?** If you want both Force Field Generator AND Flight System (both 3-slot), you need 6 slots. This augment effectively makes room for both.',
  slotCost: 3,
  category: 'extreme',
  tags: ['utility'],
}

const omegaLevelTargeting: Augment = {
  id: 'omega-level-targeting',
  name: 'Omega-Level Targeting',
  description:
    'Perfect accuracy systems.\n\n' +
    '• You automatically hit with all attacks against any target you can see within 120 feet\n' +
    '• You still roll damage normally\n' +
    "• Critical hits: roll a d20 after confirming the hit — on 19-20, it's a critical\n" +
    '• Limitation: Only works for ranged attacks and unarmed strikes (not spells or saves)\n' +
    '• Uses: Active for 1 minute, once per long rest',
  slotCost: 3,
  category: 'extreme',
  actionType: 'bonus-action',
  usesPerRest: 'long',
  usesCount: '1',
  tags: ['combat'],
}

const emergencyTeleporter: Augment = {
  id: 'emergency-teleporter',
  name: 'Emergency Teleporter',
  description:
    'One-use escape mechanism.\n\n' +
    '• When you would be reduced to 0 hit points, you can activate the teleporter as a reaction\n' +
    "• You teleport to a safe location within 1 mile that you're familiar with\n" +
    '• You stabilize at 1 hit point automatically\n' +
    '• Uses: Once per long rest',
  slotCost: 3,
  category: 'extreme',
  actionType: 'reaction',
  usesPerRest: 'long',
  usesCount: '1',
  tags: ['defensive', 'movement'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  TECH-INTEGRATOR Specialization Augments
// ─────────────────────────────────────────────────────────────────────────────

const empProjector: Augment = {
  id: 'emp-projector',
  name: 'EMP Projector',
  description:
    "You've installed an electromagnetic pulse generator in your chest or palm.\n\n" +
    '• Action: You emit an EMP burst in a 20-foot radius sphere centered on you\n' +
    '• All electronic devices in the area shut down for 1 minute\n' +
    '• Creatures with cybernetic augments must make a CON save or be stunned until end of their next turn\n' +
    '• Constructs take 3d8 lightning damage and have disadvantage on the save\n' +
    '• Uses: Proficiency bonus times per long rest',
  slotCost: 2,
  category: 'major',
  specialization: 'tech-integrator',
  actionType: 'action',
  usesPerRest: 'long',
  usesCount: 'proficiency',
  tags: ['combat', 'hacking', 'control'],
}

const hostileOverrideImplant: Augment = {
  id: 'hostile-override-implant',
  name: 'Hostile Override Implant',
  description:
    'Your neural interface can force-hack enemy cybernetics mid-combat.\n\n' +
    '• Bonus action: Target one creature with cybernetics within 60 feet\n' +
    '• They must make an INT save (DC = 8 + proficiency + INT)\n' +
    '• On failure, choose one effect until end of their next turn:\n' +
    '  — Force them to drop one held item\n' +
    '  — Blind their cybernetic eyes (disadvantage on attacks)\n' +
    '  — Lock one cybernetic limb (speed reduced by 10 feet)\n' +
    '  — Cause intense pain (disadvantage on concentration checks)\n' +
    '• Uses: Proficiency bonus times per short rest',
  slotCost: 2,
  category: 'major',
  specialization: 'tech-integrator',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: 'proficiency',
  tags: ['hacking', 'control', 'combat'],
}

const weaponizedMechadendrite: Augment = {
  id: 'weaponized-mechadendrite',
  name: 'Weaponized Mechadendrite',
  description:
    'Your utility mechadendrite has been reinforced and weaponized for combat.\n\n' +
    '• Your mechadendrite can be used as a monk weapon\n' +
    '• It has 10-foot reach (longer than normal unarmed strikes)\n' +
    '• Deals your Martial Arts die + DEX modifier damage\n' +
    '• Can be used with Flurry of Blows and all monk abilities\n' +
    '• Can grapple creatures with reach (10 feet away)\n' +
    '• Can manipulate objects at range (pick locks, press buttons from 10 feet)',
  slotCost: 2,
  category: 'major',
  specialization: 'tech-integrator',
  isWeapon: true,
  weaponProperties: ['reach'],
  tags: ['combat', 'utility', 'weapon'],
}

const omniToolIntegration: Augment = {
  id: 'omni-tool-integration',
  name: 'Omni-Tool Integration',
  description:
    'Your body contains an array of tools and implements for any situation.\n\n' +
    "• You have all tools integrated into your body (mechanic's, thieves', hacker tools, medkit, etc.)\n" +
    '• Advantage on all checks made with integrated tools\n' +
    '• You can use tools as a bonus action\n' +
    '• You gain expertise in Technology checks made with your integrated tools\n' +
    '• You can use integrated tools while grappled, restrained, or when hands are otherwise occupied',
  slotCost: 2,
  category: 'major',
  specialization: 'tech-integrator',
  actionType: 'bonus-action',
  tags: ['utility', 'hacking'],
}

const advancedScannerArray: Augment = {
  id: 'advanced-scanner-array',
  name: 'Advanced Scanner Array',
  description:
    'Your optical and sensor systems are state-of-the-art.\n\n' +
    '• You can see all technological devices within 120 feet, even through walls (up to 1 foot of stone, 1 inch of metal)\n' +
    '• You can identify the function of any device you can see\n' +
    '• You automatically detect traps, alarms, and security systems with a glance\n' +
    '• Action: Scan a creature to learn all cybernetic augments they have, current hit points, vulnerabilities/resistances, and one special ability',
  slotCost: 2,
  category: 'major',
  specialization: 'tech-integrator',
  actionType: 'action',
  tags: ['sensory', 'hacking', 'utility'],
}

const techScreamEmitter: Augment = {
  id: 'tech-scream-emitter',
  name: 'Tech-Scream Emitter',
  description:
    'You can emit a burst of corrupted scrapcode and electromagnetic noise.\n\n' +
    '• Action: You emit a tech-scream in a 30-foot cone\n' +
    '• All creatures in the cone with cybernetics or electronic equipment must make an INT save\n' +
    '• On failure: Take 4d8 psychic damage and disadvantage on attacks and ability checks until end of next turn\n' +
    '• On success: Half damage, no disadvantage\n' +
    '• Constructs have disadvantage on the save and take an extra 2d8 damage\n' +
    '• Uses: Once per short rest',
  slotCost: 3,
  category: 'extreme',
  specialization: 'tech-integrator',
  actionType: 'action',
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['combat', 'hacking', 'control'],
}

const turretControlArray: Augment = {
  id: 'turret-control-array',
  name: 'Turret Control Array',
  description:
    'You have advanced systems for controlling automated weapons.\n\n' +
    '• You can control up to 3 automated weapon systems simultaneously (turrets, servitor weapons, unmanned guns)\n' +
    '• Range of control: 120 feet\n' +
    '• Bonus action: Make one attack with each controlled weapon\n' +
    '• Controlled weapons use your attack bonus and Power Cell save DC\n' +
    '• You can attempt to seize control of enemy weapons with an INT (Technology) check (DC 15)',
  slotCost: 3,
  category: 'extreme',
  specialization: 'tech-integrator',
  actionType: 'bonus-action',
  tags: ['combat', 'hacking', 'support'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  MEDICAE SAVANT Specialization Augments
// ─────────────────────────────────────────────────────────────────────────────

const drugDispenserArray: Augment = {
  id: 'drug-dispenser-array',
  name: 'Drug Dispenser Array',
  description:
    'Integrated drug synthesizers and injection systems.\n\n' +
    'You can create and administer combat drugs as a bonus action (range: touch or 30 feet via mechadendrite). Choose one drug effect:\n\n' +
    '**Stimm** (Combat Enhancement): Advantage on next attack roll or ability check until end of their next turn. Uses: Proficiency bonus per short rest.\n\n' +
    '**Painkiller** (Damage Resistance): Resistance to the next instance of damage they take. Duration: 1 minute or until triggered.\n\n' +
    '**Antitoxin** (Condition Removal): Target can immediately repeat a save vs poison or disease with advantage.\n\n' +
    '**Adrenal Boost** (Emergency Movement): Target can immediately move up to their speed as a reaction.',
  slotCost: 2,
  category: 'major',
  specialization: 'medicae-savant',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: 'proficiency',
  tags: ['healing', 'support'],
}

const nanoRepairInjector: Augment = {
  id: 'nano-repair-injector',
  name: 'Nano-Repair Injector',
  description:
    'You can inject self-replicating medical nanites for sustained healing.\n\n' +
    '• Action: Inject target within 30 feet with medical nanites\n' +
    '• Target regains 2d8 hit points immediately\n' +
    '• For the next minute, at the start of each of their turns, they regain 1d8 hit points\n' +
    '• If they take fire or acid damage, the nanites are destroyed (healing ends)\n' +
    '• Uses: Proficiency bonus times per long rest',
  slotCost: 3,
  category: 'extreme',
  specialization: 'medicae-savant',
  actionType: 'action',
  usesPerRest: 'long',
  usesCount: 'proficiency',
  tags: ['healing', 'support'],
}

const bioscanImplant: Augment = {
  id: 'bioscan-implant',
  name: 'Bioscan Implant',
  description:
    'Advanced medical scanners integrated into your optical systems.\n\n' +
    '• You can see the current hit points of any creature within 60 feet\n' +
    '• You can see all diseases, poisons, and conditions affecting them\n' +
    '• You automatically know if a creature is below half health, quarter health, or dying\n' +
    "• Bonus action: Analyze a creature's physiology and learn one vulnerability or resistance they have",
  slotCost: 2,
  category: 'major',
  specialization: 'medicae-savant',
  actionType: 'bonus-action',
  tags: ['sensory', 'healing', 'utility'],
}

const lifeSupportImplant: Augment = {
  id: 'life-support-implant',
  name: 'Life Support Implant',
  description:
    'Backup organs, redundant systems, and automated medical protocols.\n\n' +
    '• When you are reduced to 0 hit points but not killed outright, you automatically stabilize\n' +
    '• You regain 1 hit point after 1 minute of being stabilized\n' +
    '• You have advantage on death saving throws\n' +
    '• You are immune to being killed by massive damage (you always get to stabilize first)',
  slotCost: 2,
  category: 'major',
  specialization: 'medicae-savant',
  tags: ['defensive'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  BALLISTIC FRAME Specialization Augments
// ─────────────────────────────────────────────────────────────────────────────

const targetingMatrixSuite: Augment = {
  id: 'targeting-matrix-suite',
  name: 'Targeting Matrix Suite',
  description:
    'Military-grade targeting computers integrated into your neural network.\n\n' +
    '• +2 to all ranged attack rolls (stacks with DEX modifier)\n' +
    '• You can see invisible creatures within 60 feet (thermal sensors)\n' +
    '• You ignore the Heavily Obscured condition for ranged attacks\n' +
    '• Once per turn, you can reroll a missed ranged attack (must use new roll)',
  slotCost: 3,
  category: 'extreme',
  specialization: 'ballistic-frame',
  tags: ['combat', 'sensory'],
}

const stabilizationHarness: Augment = {
  id: 'stabilization-harness',
  name: 'Stabilization Harness',
  description:
    'Hydraulic stabilizers and recoil compensators allow firing while moving.\n\n' +
    "• You don't have disadvantage on ranged attacks from being prone\n" +
    "• You can reload weapons as a free action\n" +
    '• When you Dash, you can still make ranged attacks as a bonus action\n' +
    '• Advantage on saves vs being knocked prone',
  slotCost: 2,
  category: 'major',
  specialization: 'ballistic-frame',
  tags: ['combat', 'movement'],
}

const rotaryCannonMount: Augment = {
  id: 'rotary-cannon-mount',
  name: 'Rotary Cannon Mount',
  description:
    'A heavy rotary cannon mounted on your shoulder or arm.\n\n' +
    '• Damage: 2d8 + DEX modifier, piercing damage\n' +
    '• Range: 100/300 feet\n' +
    '• Properties: Heavy, Rapid Fire\n' +
    '• **Full Burst:** As an action, fire the full rotary belt at one target. On hit, roll 6d8 + DEX modifier damage. Uses: Once per short rest (requires reload)',
  slotCost: 3,
  category: 'extreme',
  specialization: 'ballistic-frame',
  actionType: 'action',
  isWeapon: true,
  weaponProperties: ['heavy'],
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['combat', 'weapon'],
}

const missilePodSystem: Augment = {
  id: 'missile-pod-system',
  name: 'Missile Pod System',
  description:
    'Micro-missiles integrated into your armor or shoulders.\n\n' +
    '• Action: Fire micro-missiles — choose up to 3 targets within 120 feet\n' +
    '• Make a ranged attack against each target\n' +
    '• Damage: 2d6 + DEX modifier, fire damage per missile\n' +
    '• Each missile explodes: creatures within 5 feet take half damage (DEX save for none)\n' +
    '• Uses: Once per short rest (reload as bonus action)',
  slotCost: 3,
  category: 'extreme',
  specialization: 'ballistic-frame',
  actionType: 'action',
  isWeapon: true,
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['combat', 'weapon'],
}

const plasmaCannonIntegration: Augment = {
  id: 'plasma-cannon-integration',
  name: 'Plasma Cannon Integration',
  description:
    'A shoulder-mounted plasma cannon.\n\n' +
    '• Damage: 2d10 + DEX modifier, fire damage\n' +
    '• Range: 60/180 feet\n' +
    '• **Overcharge:** On hit, deal an extra 2d10 fire damage, but you take 1d6 fire damage (Gets Hot).\n' +
    '• **AoE Mode:** Fire in a 20-foot radius sphere at a point within range. All creatures make DEX save or take 3d10 fire damage, half on success.',
  slotCost: 3,
  category: 'extreme',
  specialization: 'ballistic-frame',
  actionType: 'action',
  isWeapon: true,
  tags: ['combat', 'weapon'],
}

const ammoForge: Augment = {
  id: 'ammo-forge',
  name: 'Ammo Forge',
  description:
    'Integrated ammunition fabrication systems.\n\n' +
    '• All your integrated weapons have unlimited ammunition\n' +
    '• You can create ammunition for non-integrated weapons (las power packs, bolter magazines, autogun rounds)\n' +
    '• During a short rest, you can produce 100 rounds of basic ammunition or 2 power packs\n' +
    '• You can sell this ammunition (1 Throne per 10 rounds)',
  slotCost: 2,
  category: 'major',
  specialization: 'ballistic-frame',
  tags: ['utility'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  VELOCITY FRAME Specialization Augments
// ─────────────────────────────────────────────────────────────────────────────

const enhancedServos: Augment = {
  id: 'enhanced-servos',
  name: 'Enhanced Servos',
  description:
    'Your leg and arm servos have been upgraded to military-grade.\n\n' +
    '• +10 feet movement speed (stacks with all other bonuses)\n' +
    "• You can take the Dash action as a free action once per turn\n" +
    '• Your jump distance doubles\n' +
    '• Advantage on Acrobatics and Athletics checks',
  slotCost: 2,
  category: 'major',
  specialization: 'velocity-frame',
  tags: ['movement'],
}

const gravSuspensors: Augment = {
  id: 'grav-suspensors',
  name: 'Grav-Suspensors',
  description:
    'Anti-gravity systems allow limited flight.\n\n' +
    '• You gain a fly speed equal to your walking speed\n' +
    '• You can hover in place\n' +
    "• You don't take falling damage (grav-suspensors catch you)\n" +
    '• You can walk on air (move vertically as if climbing stairs)\n' +
    '• Limitation: Flying costs Power Cells — 1 Power Cell per minute of flight',
  slotCost: 3,
  category: 'extreme',
  specialization: 'velocity-frame',
  tags: ['movement'],
}

const accelerationBoosters: Augment = {
  id: 'acceleration-boosters',
  name: 'Acceleration Boosters',
  description:
    'Burst thrusters for sudden acceleration.\n\n' +
    '• Bonus action: Activate boosters to gain +30 feet movement speed until end of your turn\n' +
    '• **Afterburner:** Once per short rest, activate for 1 minute. While active, your movement speed doubles and you leave a trail of energy that deals 1d6 fire damage to creatures who enter it',
  slotCost: 2,
  category: 'major',
  specialization: 'velocity-frame',
  actionType: 'bonus-action',
  usesPerRest: 'short',
  usesCount: '1',
  tags: ['movement', 'combat'],
}

const momentumDampeners: Augment = {
  id: 'momentum-dampeners',
  name: 'Momentum Dampeners',
  description:
    'Kinetic energy absorption systems.\n\n' +
    '• You take no falling damage from any height\n' +
    '• You cannot be knocked prone by effects (forced movement still works, but you land on your feet)\n' +
    "• Reaction: When hit by a melee attack, completely negate the damage and gain +10 feet movement speed until end of your next turn\n" +
    '• Uses for reaction: Proficiency bonus times per long rest',
  slotCost: 2,
  category: 'major',
  specialization: 'velocity-frame',
  actionType: 'reaction',
  usesPerRest: 'long',
  usesCount: 'proficiency',
  tags: ['defensive', 'movement'],
}

const phaseShifter: Augment = {
  id: 'phase-shifter',
  name: 'Phase-Shifter',
  description:
    'True teleportation technology.\n\n' +
    '• Your Blink Step range increases to 60 feet (instead of 30)\n' +
    '• You can blink as a reaction when targeted by an attack, spending 1 Power Cell\n' +
    '• You can blink through solid objects (5 feet of stone, 1 foot of metal)\n' +
    '• **Mass Blink:** Once per long rest, you can blink along with up to 4 willing creatures within 10 feet of you',
  slotCost: 3,
  category: 'extreme',
  specialization: 'velocity-frame',
  actionType: 'reaction',
  powerCellCost: 1,
  tags: ['movement', 'defensive'],
}

const velocityStrikeAugment: Augment = {
  id: 'velocity-strike-augment',
  name: 'Velocity Strike Augment',
  description:
    "Your strikes hit harder when you're moving fast.\n\n" +
    '• Move at least 15 feet before an unarmed strike: +1d8 force damage\n' +
    '• Move at least 30 feet before an unarmed strike: +2d8 force damage\n' +
    '• Move at least 50 feet before an unarmed strike: +3d8 force damage\n' +
    '• This stacks with the Momentum Strikes feature from your Specialization',
  slotCost: 2,
  category: 'major',
  specialization: 'velocity-frame',
  tags: ['combat'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const universalAugments: Augment[] = [
  // 1-slot (minor)
  opticalEnhancements, audioFilters, builtInToolkit, hiddenStorage,
  reinforcedFrame, targetingOptics, combatStimInjector, voxcasterImplant,
  cogitatorImplant, subdermalArmorPlating, chronoImplant, respiratoryFilter,
  // 2-slot (major)
  interfacePort, repairMechadendrite, combatMechadendrite, medicalScanner,
  servoSkullController, integratedFistWeapon, strengthAugmentation,
  enhancedReflexes, grapplingMechadendrite, jumpJets, integratedWeaponCustom,
  // 3-slot (extreme)
  forceFieldGenerator, flightSystem, advancedTargetingArray, stealthFieldGenerator,
  plasmaWeaponIntegration, nanoRepairSystem, multiWeaponSystem, omegaLevelTargeting,
  emergencyTeleporter,
]

export const techIntegratorAugments: Augment[] = [
  empProjector, hostileOverrideImplant, weaponizedMechadendrite,
  omniToolIntegration, advancedScannerArray, techScreamEmitter, turretControlArray,
]

export const medicaeSavantAugments: Augment[] = [
  drugDispenserArray, nanoRepairInjector, bioscanImplant, lifeSupportImplant,
]

export const ballisticFrameAugments: Augment[] = [
  targetingMatrixSuite, stabilizationHarness, rotaryCannonMount,
  missilePodSystem, plasmaCannonIntegration, ammoForge,
]

export const velocityFrameAugments: Augment[] = [
  enhancedServos, gravSuspensors, accelerationBoosters, momentumDampeners,
  phaseShifter, velocityStrikeAugment,
]

export const allAugments: Augment[] = [
  ...universalAugments,
  ...techIntegratorAugments,
  ...medicaeSavantAugments,
  ...ballisticFrameAugments,
  ...velocityFrameAugments,
]
