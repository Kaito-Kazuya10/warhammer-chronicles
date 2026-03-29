import type { GeneModification } from '../../../types/module'

/**
 * GENE-MODIFICATIONS — Complete Catalog
 *
 * Source: WH40K_Gene_Fighter.docx
 *
 * Uses the existing GeneModification interface from module.ts.
 * Each mod has: passiveEffect, geneSurgeEffect, sideEffect (null for minor),
 * stabilityCost, tier, category, and optional archetype gating.
 *
 * Organization:
 *   1. Base Modifications (any Gene-Fighter)
 *      - 5 Minor (1 SP), 5 Major (2 SP), 5 Extreme (3 SP)
 *   2. Abomination Juggernaut exclusives
 *   3. Elemental Chimera exclusives (4 elements)
 *   4. Apex Predator exclusives
 */

// ─────────────────────────────────────────────────────────────────────────────
//  BASE MODIFICATIONS — Minor (1 Stability Point, no side effects)
// ─────────────────────────────────────────────────────────────────────────────

const enhancedMusculature: GeneModification = {
  id: 'enhanced-musculature',
  name: 'Enhanced Musculature',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your muscle fibers have been reinforced and multiplied.',
  passiveEffect: '+1 to Strength checks and Strength saving throws. Carrying capacity increases by 50%. Advantage on Athletics checks to jump.',
  geneSurgeEffect: '+3 to Strength checks and saves (replacing +1). Melee weapon attacks deal an extra 1d6 damage. You can use your action to make a powerful shove, pushing a creature up to 15 feet away.',
  category: 'physical',
  tags: ['combat'],
}

const reinforcedSkeleton: GeneModification = {
  id: 'reinforced-skeleton',
  name: 'Reinforced Skeleton',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your bones have been strengthened with synthetic compounds.',
  passiveEffect: '+1 to AC. Advantage on saves against effects that would break bones or cripple you. Cannot be knocked prone by effects dealing less than 10 damage.',
  geneSurgeEffect: '+2 to AC (replacing +1). Immune to being knocked prone. When you succeed on a save against forced movement, you can use your reaction to move half the distance toward the source instead.',
  category: 'defensive',
  tags: ['defensive'],
}

const improvedReflexes: GeneModification = {
  id: 'improved-reflexes',
  name: 'Improved Reflexes',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your nervous system has been enhanced to react faster.',
  passiveEffect: '+1 to initiative rolls. Advantage on Dexterity saving throws against effects you can see. You can use your reaction to give yourself +2 AC against one attack.',
  geneSurgeEffect: '+3 to initiative (replacing +1). You can take one additional reaction per round. Opportunity attacks against you have disadvantage.',
  category: 'physical',
  tags: ['defensive'],
}

const enhancedCardiovascular: GeneModification = {
  id: 'enhanced-cardiovascular',
  name: 'Enhanced Cardiovascular System',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your heart and lungs have been enhanced for superior endurance.',
  passiveEffect: '+1 hit point per Gene-Fighter level (retroactive). Can hold breath for twice as long. Advantage on Constitution checks for endurance activities.',
  geneSurgeEffect: 'Gain temporary hit points equal to your Gene-Fighter level at the start of each of your turns. Immune to exhaustion for the duration. Movement speed increases by an additional 10 feet.',
  category: 'metabolic',
  tags: ['defensive'],
}

const denseTissue: GeneModification = {
  id: 'dense-tissue',
  name: 'Dense Tissue',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your skin and muscle tissue have become unnaturally dense.',
  passiveEffect: '+1 AC (if using Unarmored Defense). Advantage on Constitution saving throws. Resistance to bludgeoning damage from falling.',
  geneSurgeEffect: '+2 AC (total, replacing +1). Resistance to bludgeoning damage. When hit by a critical hit, you can use your reaction to make it a normal hit instead.',
  category: 'defensive',
  tags: ['defensive'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  BASE MODIFICATIONS — Major (2 Stability Points)
// ─────────────────────────────────────────────────────────────────────────────

const redundantOrgans: GeneModification = {
  id: 'redundant-organs',
  name: 'Redundant Organs',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your vital organs have been duplicated and dispersed throughout your body.',
  passiveEffect: 'Advantage on death saving throws. When stabilized after being reduced to 0 HP, you regain 1 hit point. Cannot be killed instantly by critical hits to vital areas.',
  geneSurgeEffect: 'Automatically succeed on death saving throws. If reduced to 0 HP by an attack, use reaction for DC 15 CON save to drop to 1 HP instead. Regain 5 HP at start of each turn while below half HP max.',
  sideEffect: 'You must eat 50% more food per day or gain one level of exhaustion after 2 days of insufficient nutrition. Medicine checks to treat you have disadvantage.',
  category: 'metabolic',
  tags: ['defensive'],
}

const adrenalBoosters: GeneModification = {
  id: 'adrenal-boosters',
  name: 'Adrenal Boosters',
  tier: 'major',
  stabilityCost: 2,
  description: 'Modified adrenal glands flood your system with combat hormones.',
  passiveEffect: '+2 to initiative rolls. Cannot be surprised while conscious. When you roll initiative, move up to half your speed as a free action before anyone else acts.',
  geneSurgeEffect: '+5 to initiative (replacing +2). Advantage on initiative rolls. On your first turn of combat, you can take one additional action.',
  sideEffect: 'Disadvantage on Wisdom saving throws (overstimulated). Must succeed on a DC 10 Constitution saving throw to benefit from a long rest (retry after 1 hour on failure).',
  category: 'metabolic',
  tags: ['combat'],
}

const combatMetabolism: GeneModification = {
  id: 'combat-metabolism',
  name: 'Combat Metabolism',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your metabolism has been enhanced to process nutrients for rapid energy.',
  passiveEffect: 'When you eat a ration during a short rest, regain additional HP equal to your CON modifier. You can consume any organic material for minimal nutrition. Advantage on saves vs poison and disease.',
  geneSurgeEffect: 'Consume a ration as a bonus action to immediately regain 2d8 + CON modifier HP. Immune to poison damage and the poisoned condition for the duration.',
  sideEffect: 'If you go more than 4 hours without eating, you gain one level of exhaustion. You consume rations at twice the normal rate.',
  category: 'metabolic',
  tags: ['healing'],
}

const enhancedLungCapacity: GeneModification = {
  id: 'enhanced-lung-capacity',
  name: 'Enhanced Lung Capacity',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your lungs have been expanded and reinforced.',
  passiveEffect: 'Hold breath for 10× normal. Advantage on saves vs inhaled toxins and gases. Survive in thin atmospheres without penalty.',
  geneSurgeEffect: 'Breathe in any atmosphere (including underwater and vacuum) for the duration. Use action to exhale in a 15-foot cone — STR save (DC = 8 + prof + CON) or be pushed 10 feet and knocked prone. Immune to suffocation.',
  sideEffect: 'You breathe more heavily than normal — disadvantage on Stealth checks in quiet environments. In enclosed spaces with limited air, you consume oxygen twice as fast.',
  surgeActionType: 'action',
  category: 'physical',
  tags: ['utility'],
}

const neuralAccelerators: GeneModification = {
  id: 'neural-accelerators',
  name: 'Neural Accelerators',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your brain processes information at superhuman speed.',
  passiveEffect: '+1 to Intelligence, Wisdom, and Charisma saves. Cannot be surprised. Read and comprehend written material in half the normal time.',
  geneSurgeEffect: '+3 to INT/WIS/CHA saves (replacing +1). Dash or Disengage as free action on each turn. Advantage on initiative rolls.',
  sideEffect: 'Disadvantage on Charisma (Persuasion) checks (you speak too quickly). Disadvantage on Wisdom (Insight) checks (you overthink social cues).',
  category: 'sensory',
  tags: ['defensive', 'utility'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  BASE MODIFICATIONS — Extreme (3 Stability Points)
// ─────────────────────────────────────────────────────────────────────────────

const berserkerGlands: GeneModification = {
  id: 'berserker-glands',
  name: 'Berserker Glands',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Modified glands flood your system with rage-inducing hormones.',
  passiveEffect: 'When reduced to half HP or fewer, use reaction to enter minor fury for 1 minute: resistance to physical damage, +2 melee damage, advantage on Strength checks. Once per short rest.',
  geneSurgeEffect: 'Full berserker rage: immunity to physical damage from non-magical weapons, +4 melee damage, one additional melee attack as bonus action, immune to frightened and charmed. HOWEVER: you cannot distinguish friend from foe — must attack nearest creature each round.',
  sideEffect: 'Disadvantage on all Charisma checks except Intimidation. When you see another creature take damage within 30 feet, DC 10 WIS save or use movement to approach it on your next turn. Cannot benefit from the Help action.',
  passiveActionType: 'reaction',
  surgeUsesPerRest: 'short',
  surgeUsesCount: '1',
  category: 'metabolic',
  tags: ['combat', 'damage'],
}

const adaptiveBiology: GeneModification = {
  id: 'adaptive-biology',
  name: 'Adaptive Biology',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your body can rapidly adapt to threats.',
  passiveEffect: 'When you take damage of a specific type, gain resistance to that type until the end of your next turn. Advantage on saves against effects you have been exposed to before (GM tracks). Survive in extreme environments for 1 hour before ill effects.',
  geneSurgeEffect: 'When you take damage of any type, immediately gain immunity to that type for 1 round. Gain resistance to all damage types you have NOT taken damage from yet during this Surge. Advantage on all saving throws.',
  sideEffect: 'Each long rest, roll d20 — on 1–3, one physical feature changes randomly (permanent until it changes again). When rolling Hit Dice to heal during a short rest, roll twice and take the lower result.',
  category: 'metabolic',
  tags: ['defensive'],
}

const perfectKillerInstinct: GeneModification = {
  id: 'perfect-killer-instinct',
  name: 'Perfect Killer Instinct',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your predatory instincts have been honed to supernatural precision.',
  passiveEffect: "Advantage on attacks against creatures that haven't taken a turn in combat yet. Bonus action to study a creature: learn its AC, current HP, and any resistances/immunities. Advantage on Survival checks to track.",
  geneSurgeEffect: 'Attacks against surprised creatures automatically score critical hits. When you reduce a creature to 0 HP, immediately move up to half your speed and make one additional attack against a different creature. Sense the location of any creature within 60 feet.',
  sideEffect: 'When you see a creature below half HP, DC 12 WIS save or become fixated (must approach and attack it, repeat save at end of each turn). Cannot take Help action while fixated. Disadvantage on Insight checks in social situations.',
  passiveActionType: 'bonus-action',
  category: 'sensory',
  tags: ['combat', 'damage'],
}

const regenerativeMutation: GeneModification = {
  id: 'regenerative-mutation',
  name: 'Regenerative Mutation',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your body regenerates from injuries at an incredible rate.',
  passiveEffect: 'At the start of each turn, if you have at least 1 HP and are below your HP maximum, regain HP equal to your CON modifier (minimum 1). Regrow lost limbs over 1d4 days. Advantage on death saving throws.',
  geneSurgeEffect: 'Regeneration increases to 3 × CON modifier per turn. Automatically stabilize when dying. Lost limbs regrow within 1 minute during Surge. Fire and acid CANNOT suppress your regeneration during Gene-Surge.',
  sideEffect: 'Must eat three times normal food or regeneration ceases. Outside Gene-Surge, fire and acid damage suppresses regeneration until end of your next turn if you regenerated more than 5 HP that turn. Disadvantage on CON saves to maintain concentration.',
  category: 'metabolic',
  tags: ['healing'],
}

const hulkingTransformation: GeneModification = {
  id: 'hulking-transformation',
  name: 'Hulking Transformation',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your body can swell to massive proportions.',
  passiveEffect: 'As a bonus action, increase size by one category for 10 minutes (Medium→Large, Large→Huge). While enlarged: STR +2 (max 22), melee damage +1d4, reach +5 feet. Once per long rest.',
  geneSurgeEffect: 'Automatically enlarge (stacks with Gene-Surge). STR +4 total from this mod. Melee damage +1d4 +1d6. HP maximum increases by 20 for the duration.',
  sideEffect: 'Disadvantage on Stealth checks when enlarged. Cannot fit through normal doorways or corridors. When enlargement ends, take 1d8 necrotic damage from cellular stress.',
  passiveActionType: 'bonus-action',
  surgeUsesPerRest: 'long',
  surgeUsesCount: '1',
  category: 'physical',
  tags: ['combat'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  ABOMINATION JUGGERNAUT Exclusive Modifications
// ─────────────────────────────────────────────────────────────────────────────

const titanicMusculature: GeneModification = {
  id: 'titanic-musculature',
  name: 'Titanic Musculature',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your muscles swell to grotesque proportions, granting strength beyond mortal limits.',
  passiveEffect: 'STR score +2 (max 22). Carrying capacity and push/drag/lift doubles. Count as one size larger for carrying capacity.',
  geneSurgeEffect: 'STR score +4 total (max 24). Melee weapon attacks deal an extra 1d6 damage. Advantage on Strength checks to break objects.',
  sideEffect: 'Disadvantage on Dexterity saving throws and cannot take the Dodge action (swollen musculature reduces coordination).',
  archetype: 'abomination-juggernaut',
  category: 'physical',
  tags: ['combat'],
}

const adamantineBones: GeneModification = {
  id: 'adamantine-bones',
  name: 'Adamantine Bones',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your skeleton has been reinforced with metallic compounds, making your bones virtually unbreakable.',
  passiveEffect: 'Resistance to bludgeoning damage. Advantage on saves against bone-breaking/crippling effects. Cannot be crippled or have limbs severed by normal means.',
  geneSurgeEffect: 'Resistance extends to all physical damage (bludgeoning, piercing, slashing). Use reaction to turn a critical hit into a normal hit. Immune to being knocked prone.',
  sideEffect: 'Vulnerability to lightning damage (metallic bones conduct electricity). Weight increases by 50% — automatically fail Athletics (Swimming) checks. Disadvantage on checks involving unstable surfaces.',
  archetype: 'abomination-juggernaut',
  category: 'defensive',
  tags: ['defensive'],
}

const unstoppableMomentum: GeneModification = {
  id: 'unstoppable-momentum',
  name: 'Unstoppable Momentum',
  tier: 'major',
  stabilityCost: 2,
  description: "Once you start moving, nothing can halt your advance.",
  passiveEffect: 'When you Dash, speed increases by additional 10 feet until end of turn. Difficult terrain costs no extra movement. Advantage on saves/checks against being moved against your will.',
  geneSurgeEffect: 'When you move 15+ feet in a straight line and hit with melee, target must STR save (DC = 8 + prof + STR) or be pushed 10 feet and knocked prone. Move through spaces of creatures one size larger. Opportunity attacks against you have disadvantage.',
  sideEffect: 'Cannot take the Dodge action. Must use at least half your movement speed each turn (cannot remain stationary unless grappled, restrained, or incapacitated).',
  archetype: 'abomination-juggernaut',
  category: 'physical',
  tags: ['movement', 'combat'],
}

const ironHide: GeneModification = {
  id: 'iron-hide',
  name: 'Iron Hide',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your skin has thickened and hardened into natural armor plating.',
  passiveEffect: '+2 AC. Resistance to damage from environmental hazards (extreme heat, cold, radiation). When hit by melee attack, attacker takes 1d4 piercing damage.',
  geneSurgeEffect: '+4 AC (replacing +2). Reflected damage increases to 2d4. Resistance to fire and cold damage.',
  sideEffect: 'DEX score treated as 2 lower for DEX saves and DEX-based skill checks (minimum 1). Cannot benefit from light armor (it cannot conform to your plating).',
  archetype: 'abomination-juggernaut',
  category: 'defensive',
  tags: ['defensive'],
}

const regenerativeCore: GeneModification = {
  id: 'regenerative-core',
  name: 'Regenerative Core',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your internal organs have been duplicated and enhanced with regenerative capability.',
  passiveEffect: 'At start of each turn, if at least 1 HP and below half HP max, regain HP equal to CON modifier (min 1). Advantage on death saves. Automatically stabilize when dying.',
  geneSurgeEffect: 'Regeneration increases to 2 × CON modifier per turn. Use reaction for DC 15 CON save to drop to 1 HP instead of 0 (once per long rest).',
  sideEffect: 'Must consume twice normal food or regeneration ceases. Fire and acid suppress regeneration until end of next turn. While unconscious, require twice normal time to recover naturally.',
  archetype: 'abomination-juggernaut',
  category: 'metabolic',
  tags: ['healing'],
}

const enhancedVitality: GeneModification = {
  id: 'enhanced-vitality',
  name: 'Enhanced Vitality',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your cardiovascular and respiratory systems have been enhanced to superhuman efficiency.',
  passiveEffect: 'HP maximum increases by your Gene-Fighter level. Hold breath for twice as long. Advantage on CON checks for endurance.',
  geneSurgeEffect: 'Gain temporary HP equal to Gene-Fighter level + CON modifier at start of each turn. Immune to exhaustion for the duration.',
  archetype: 'abomination-juggernaut',
  category: 'metabolic',
  tags: ['defensive'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTAL CHIMERA — Fire Modifications
// ─────────────────────────────────────────────────────────────────────────────

const ignitedBlood: GeneModification = {
  id: 'ignited-blood',
  name: 'Ignited Blood',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your blood has been infused with phosphorescent compounds that ignite when exposed to air.',
  passiveEffect: 'When hit with melee attack, attacker takes 2d6 fire damage. Resistance to cold damage. Emit dim light in a 10-foot radius.',
  geneSurgeEffect: 'Melee attackers take 4d6 fire damage. Use reaction when damaged to ignite — all creatures within 5 feet DEX save (DC = 8 + prof + CON) or 2d6 fire damage (half on success).',
  sideEffect: 'Emit constant dim light and heat — automatically fail Stealth in darkness. Take 1d4 fire damage at start of each turn during Gene-Surge. Flammable objects you carry ignite within 1 hour unless stored in fireproof containers.',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'fire'],
}

const infernoCore: GeneModification = {
  id: 'inferno-core',
  name: 'Inferno Core',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your internal temperature has been elevated to furnace levels.',
  passiveEffect: 'Immune to environmental cold. Objects you touch for more than 1 round begin to smolder. Use action to superheat a metal object — extra 1d6 fire damage on next hit.',
  geneSurgeEffect: 'Creatures grappling you or grappled by you take 2d6 fire damage at start of their turns. Melee hits ignite target (1d6 fire damage per turn until extinguished).',
  sideEffect: 'Creatures within 5 feet for more than 10 minutes take 1d4 fire damage. During Surge, range increases to 10 feet and damage to 2d6. Cannot benefit from healing administered by touch unless healer has fire resistance/immunity.',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'fire'],
}

const plasmaBreath: GeneModification = {
  id: 'plasma-breath',
  name: 'Plasma Breath',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Modified glands in your throat allow you to exhale superheated plasma.',
  passiveEffect: 'Action: exhale fire in 15-foot cone. DEX save (DC = 8 + prof + CON) or 2d6 fire damage (half on success). Uses: proficiency bonus per long rest.',
  geneSurgeEffect: 'Breath weapon damage increases to 4d6. Cone extends to 30 feet. Can use as bonus action.',
  sideEffect: 'Using breath weapon causes 2d6 fire damage to you (internal burns, cannot be reduced). Disadvantage on Persuasion and Deception checks requiring speech. Cannot whisper (disadvantage on Stealth requiring silence).',
  passiveActionType: 'action',
  surgeActionType: 'bonus-action',
  surgeUsesPerRest: 'long',
  surgeUsesCount: 'proficiency',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'fire'],
}

const thermalRegulation: GeneModification = {
  id: 'thermal-regulation',
  name: 'Thermal Regulation',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your body can rapidly adjust its temperature.',
  passiveEffect: 'Resistance to both fire and cold damage. Immune to exhaustion from extreme temperatures. Leave no heat signature (advantage on Stealth vs thermal detection).',
  geneSurgeEffect: 'Immunity to fire and cold damage. Choose to radiate intense heat or cold when activating Surge — Elemental Aura deals your choice of fire or cold damage.',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'fire'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTAL CHIMERA — Bio-Electricity Modifications
// ─────────────────────────────────────────────────────────────────────────────

const electricOrgans: GeneModification = {
  id: 'electric-organs',
  name: 'Electric Organs',
  tier: 'major',
  stabilityCost: 2,
  description: 'Modified organs generate powerful charges throughout your body.',
  passiveEffect: 'Unarmed strikes deal extra 1d6 lightning damage. Action: touch shock — CON save (DC = 8 + prof + CON) or stunned until end of your next turn. Uses: proficiency bonus per long rest.',
  geneSurgeEffect: 'Unarmed strikes deal extra 2d6 lightning damage. Melee hits force CON save or target cannot take reactions until end of your next turn.',
  sideEffect: 'Electronic devices malfunction when you touch them unless you concentrate (requires action). Disadvantage on Technology checks with delicate electronics. Allies within 5 feet wearing metal armor take 1d4 lightning damage when you Attack.',
  passiveActionType: 'action',
  surgeUsesPerRest: 'long',
  surgeUsesCount: 'proficiency',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'lightning'],
}

const chainLightningReflexes: GeneModification = {
  id: 'chain-lightning-reflexes',
  name: 'Chain Lightning Reflexes',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Electrical impulses race through your enhanced nervous system at superhuman speed.',
  passiveEffect: 'DEX score +2 (max 20). Dash or Disengage as bonus action. Advantage on initiative rolls.',
  geneSurgeEffect: 'DEX score +4 total (max 22). Movement speed doubles. One additional reaction per round. Opportunity attacks against you have disadvantage.',
  sideEffect: 'Disadvantage on Stealth when not moving. DC 12 CON save to benefit from a long rest (body will not calm down; retry after 1 hour on failure, gain only short rest benefits on fail).',
  archetype: 'elemental-chimera',
  category: 'physical',
  tags: ['movement', 'lightning'],
}

const stormSkin: GeneModification = {
  id: 'storm-skin',
  name: 'Storm Skin',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your skin constantly generates static electricity that can discharge in devastating arcs.',
  passiveEffect: 'Creatures within 5 feet that hit you with metal weapons or while wearing metal armor take 2d6 lightning damage. Once per short rest: 60-foot line, 5 ft wide lightning bolt — DEX save (DC = 8 + prof + CON) or 4d6 lightning damage (half on success).',
  geneSurgeEffect: 'Melee attackers take 4d6 lightning damage regardless of weapon type. Lightning bolt as bonus action. Gain fly speed equal to walking speed (riding electrical charges).',
  sideEffect: 'Automatically fail Stealth in darkness (visible sparking). On a natural 1 attack roll, take 2d6 lightning damage from feedback. Cannot be healed by creatures wearing metal armor or using metal instruments.',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'lightning'],
}

const electromagneticPulse: GeneModification = {
  id: 'electromagnetic-pulse-gene',
  name: 'Electromagnetic Pulse',
  tier: 'major',
  stabilityCost: 2,
  description: 'You can generate a localized EMP burst.',
  passiveEffect: 'Immune to being stunned or paralyzed by electrical effects. Once per short rest, action: 20-foot radius EMP. Unattended electronics shut down for 1 minute. Constructs: CON save (DC = 8 + prof + CON) or stunned for 1 round.',
  geneSurgeEffect: 'EMP radius increases to 40 feet. Constructs that fail are paralyzed for 1 minute (repeat save each turn). Pulse can affect worn/carried electronic items.',
  sideEffect: 'Cannot benefit from cybernetic augmentations or electronic equipment yourself (they malfunction in your electrical field). Includes vox-casters, auspexes, and all tech-based gear. Tech-Priests have disadvantage on checks to repair/augment you.',
  passiveActionType: 'action',
  surgeUsesPerRest: 'short',
  surgeUsesCount: '1',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['control', 'lightning'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTAL CHIMERA — Acid Modifications
// ─────────────────────────────────────────────────────────────────────────────

const corrosiveBlood: GeneModification = {
  id: 'corrosive-blood',
  name: 'Corrosive Blood',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your blood has been chemically altered to become a powerful acid.',
  passiveEffect: "Melee attackers take 2d6 acid damage and their weapon takes permanent -1 damage penalty (destroyed at -5). Acid spit: ranged attack at 30 feet, 2d6 acid + DEX save or -1 AC until cleaned. Uses: proficiency bonus per long rest.",
  geneSurgeEffect: 'Melee attackers take 4d6 acid damage, weapons take -2. Acid spit deals 4d6 and -2 AC. Acid spit as bonus action.',
  sideEffect: 'When someone heals you with Medicine, medical equipment, or touch-healing, they take 1d6 acid damage and healing has disadvantage. Cannot wear normal armor (dissolves within 1 hour); must use specially treated armor at 5× normal price.',
  passiveActionType: 'action',
  surgeUsesPerRest: 'long',
  surgeUsesCount: 'proficiency',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'acid'],
}

const acidSecretionGlands: GeneModification = {
  id: 'acid-secretion-glands',
  name: 'Acid Secretion Glands',
  tier: 'major',
  stabilityCost: 2,
  description: 'Modified glands allow you to secrete controlled amounts of industrial-strength acid.',
  passiveEffect: 'Bonus action: coat melee weapons with acid for 1 minute — extra 1d6 acid damage. Uses: proficiency bonus per long rest. Dissolve non-magical restraints in 1 round. Advantage on checks to escape grapples.',
  geneSurgeEffect: 'Acid coating deals extra 2d6 damage. Hits force CON save (DC = 8 + prof + CON) or disadvantage on attacks until end of their next turn (eyes burn). Ground in your space becomes difficult terrain for 1 minute.',
  sideEffect: 'Acid activates involuntarily — at end of each long rest, one random non-magical item you carry takes permanent -1 to AC or damage (destroyed at -3). Disadvantage on Sleight of Hand checks.',
  passiveActionType: 'bonus-action',
  surgeUsesPerRest: 'long',
  surgeUsesCount: 'proficiency',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'acid'],
}

const causticImmunity: GeneModification = {
  id: 'caustic-immunity',
  name: 'Caustic Immunity',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Your entire biology has adapted to acidic environments.',
  passiveEffect: 'Immunity to acid damage. Breathe in toxic/caustic atmospheres without harm. Consume spoiled food, poison, and toxic substances without effect.',
  geneSurgeEffect: 'Action: pass acid immunity to one creature you touch for 1 minute. Reaction when you take damage: spray acid in 10-foot cone — DEX save (DC = 8 + prof + CON) or 2d6 acid damage.',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'acid'],
}

const dissolvingTouch: GeneModification = {
  id: 'dissolving-touch',
  name: 'Dissolving Touch',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your touch can dissolve almost anything.',
  passiveEffect: 'Unarmed strikes deal extra 1d6 acid damage. Touch an object to dissolve it (2d6 acid damage per round of contact). Non-magical metal objects you strike with unarmed attacks have AC reduced by 1 (cumulative, destroyed at AC 0).',
  geneSurgeEffect: 'Unarmed strikes deal extra 3d6 acid damage. Unarmed hits reduce target AC by 1 until short rest (armor dissolving). Walk through walls of organic material or non-magical metal (5 feet per round).',
  sideEffect: 'Everything you touch eventually deteriorates. Cannot hold items in bare hands for extended periods. All items you carry take permanent -1 to AC/durability after each long rest (destroyed at -3). Must use specially treated gloves (100 Thrones, replaced weekly).',
  archetype: 'elemental-chimera',
  category: 'offensive',
  tags: ['damage', 'acid'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  ELEMENTAL CHIMERA — Metal/Stone Modifications
// ─────────────────────────────────────────────────────────────────────────────

const metallicBones: GeneModification = {
  id: 'metallic-bones',
  name: 'Metallic Bones',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your skeleton has been reinforced with metallic compounds.',
  passiveEffect: 'Resistance to bludgeoning damage. Cannot be moved against will by push/pull effects. Advantage on Athletics checks to grapple.',
  geneSurgeEffect: 'Resistance to all physical damage. Bludgeoning weapon attacks deal extra 1d6 damage. Immune to being knocked prone.',
  sideEffect: 'Vulnerability to lightning damage. Cannot swim (you sink) — auto-fail Athletics (Swimming). Easily detected by metal detectors (disadvantage on Stealth in areas with tech surveillance).',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'metal'],
}

const crystallineCarapace: GeneModification = {
  id: 'crystalline-carapace',
  name: 'Crystalline Carapace',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your skin has developed crystalline plates that refract and deflect attacks.',
  passiveEffect: '+2 AC. Resistance to radiant and necrotic damage. Reaction when hit with melee: attacker takes 2d6 piercing damage (sharp crystals erupt).',
  geneSurgeEffect: '+4 AC total. Crystal damage increases to 4d6. Ranged attacks against you have disadvantage (projectiles deflect).',
  sideEffect: 'Critical hits ignore your resistance and deal extra 1d6 damage (crystalline structure shatters). Disadvantage on Stealth (refract light, make noise). Cannot wear medium or heavy armor.',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'metal'],
}

const stoneFlesh: GeneModification = {
  id: 'stone-flesh',
  name: 'Stone Flesh',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your skin and muscle tissue have been mineralized.',
  passiveEffect: '+1 AC. Resistance to fire damage. Hold breath indefinitely (metabolism slows to near-stasis).',
  geneSurgeEffect: '+3 AC total. Resistance to fire, cold, and lightning. Bonus action: enter stone form (petrified but heal 10 HP/round, can end at start of any turn).',
  sideEffect: 'Natural healing from Hit Dice during short rests restores only half normal. Disadvantage on Medicine checks to treat you (special tools needed). Weight doubles.',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'metal'],
}

const geologicalDensity: GeneModification = {
  id: 'geological-density',
  name: 'Geological Density',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your entire body has become extraordinarily dense and heavy.',
  passiveEffect: 'STR score +2 (max 20). Cannot be moved by creatures your size or smaller. Bludgeoning weapon attacks deal extra 1d4 damage.',
  geneSurgeEffect: 'STR +4 total (max 22). Bludgeoning attacks deal extra 2d6 (replacing 1d4). When you jump and land, creatures within 5 feet DEX save (DC = 8 + prof + STR) or knocked prone.',
  sideEffect: 'Weight increases by 200%. Cannot ride normal mounts. Auto-fail Athletics (Swimming). Unstable floors/bridges may collapse (GM discretion). Movement speed reduced by 5 feet.',
  archetype: 'elemental-chimera',
  category: 'physical',
  tags: ['combat', 'metal'],
}

const reactivePlating: GeneModification = {
  id: 'reactive-plating',
  name: 'Reactive Plating',
  tier: 'major',
  stabilityCost: 2,
  description: 'Metallic plates beneath your skin can rapidly shift to deflect incoming attacks.',
  passiveEffect: 'Reaction when hit by ranged attack: +5 AC against that attack (potentially causing miss). Resistance to damage from firearms and energy weapons.',
  geneSurgeEffect: 'Reactive plating without expending reaction (once per turn). When you deflect a ranged attack, redirect it at a creature within 30 feet — ranged attack with proficiency + CON modifier.',
  sideEffect: 'Speed reduced by 5 feet. Disadvantage on Acrobatics checks. Cannot wear heavy armor.',
  passiveActionType: 'reaction',
  archetype: 'elemental-chimera',
  category: 'defensive',
  tags: ['defensive', 'metal'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  APEX PREDATOR Exclusive Modifications
// ─────────────────────────────────────────────────────────────────────────────

const retractableClaws: GeneModification = {
  id: 'retractable-claws',
  name: 'Retractable Claws',
  tier: 'minor',
  stabilityCost: 1,
  description: 'Razor-sharp claws extend from your knuckles or fingertips on command.',
  passiveEffect: "Natural weapons deal 1d8 damage (increased from 1d6). Claws let you climb at normal speed with advantage on Athletics checks to climb.",
  geneSurgeEffect: "Natural weapons deal 2d8 damage. Critical hits with natural weapons cause bleeding: 1d6 slashing damage at start of each of target's turns until DC 12 Medicine check or action to stanch.",
  archetype: 'apex-predator',
  category: 'offensive',
  tags: ['combat'],
}

const venomousFangs: GeneModification = {
  id: 'venomous-fangs',
  name: 'Venomous Fangs',
  tier: 'major',
  stabilityCost: 2,
  description: 'Hollow fangs inject potent venom into your prey.',
  passiveEffect: 'Natural weapon hits can inject venom — CON save (DC = 8 + prof + CON) or 2d6 poison damage and poisoned until end of your next turn. Uses: proficiency bonus per long rest. Immunity to poison damage and poisoned condition.',
  geneSurgeEffect: 'Venom damage increases to 4d6. Failed saves also cause paralysis until end of your next turn. Venom without expending uses.',
  sideEffect: 'Saliva is caustic — cannot administer first aid, feed allies potions, or perform mouth-to-mouth without poisoning them (they must make the venom save). Take 1d4 poison damage consuming food not specially prepared.',
  archetype: 'apex-predator',
  category: 'offensive',
  tags: ['damage', 'control'],
}

const prehensileTail: GeneModification = {
  id: 'prehensile-tail',
  name: 'Prehensile Tail',
  tier: 'major',
  stabilityCost: 2,
  description: 'A powerful, flexible tail gives you enhanced balance and an additional appendage.',
  passiveEffect: 'Prehensile tail can manipulate objects, hold items (up to 10 lbs), and attack. Bonus action tail attack: 1d6 + STR bludgeoning. Advantage on Acrobatics, cannot be knocked prone on solid ground. Tail can grapple creatures your size or smaller (hands free).',
  geneSurgeEffect: 'Tail grapples creatures one size larger. Tail attack deals 2d6. Bonus action to constrict grappled creature for 2d6 bludgeoning.',
  sideEffect: 'Obvious mutation, cannot be hidden under normal clothing. Enemies can target tail specifically (AC = your AC - 2, HP = 20). If severed, lose all benefits until it regenerates after 7 days. Disadvantage on checks to disguise yourself.',
  passiveActionType: 'bonus-action',
  archetype: 'apex-predator',
  category: 'physical',
  tags: ['combat', 'utility'],
}

const chitinousCarapace: GeneModification = {
  id: 'chitinous-carapace',
  name: 'Chitinous Carapace',
  tier: 'major',
  stabilityCost: 2,
  description: "Armored plates form across your body like an insect's exoskeleton.",
  passiveEffect: '+2 AC (stacks with Unarmored Defense). Resistance to poison damage. Dodge action lets you retract into carapace: resistance to all damage until start of next turn (but cannot move or take actions).',
  geneSurgeEffect: '+4 AC total. Resistance to all physical damage. Carapace grows spikes — melee attackers take 2d6 piercing damage.',
  sideEffect: 'Speed reduced by 5 feet. Disadvantage on Stealth (clicking/scraping noises). Cannot wear armor (carapace interferes).',
  archetype: 'apex-predator',
  category: 'defensive',
  tags: ['defensive'],
}

const compoundEyes: GeneModification = {
  id: 'compound-eyes',
  name: 'Compound Eyes',
  tier: 'major',
  stabilityCost: 2,
  description: 'Your eyes have been replaced with compound insectoid eyes.',
  passiveEffect: 'Darkvision 120 feet. Cannot be flanked, advantage on Perception to spot hidden creatures. See in UV spectrum: detect invisible creatures within 30 feet, see traces of blood/chemicals.',
  geneSurgeEffect: 'Truesight 30 feet. See through illusions and disguises automatically. Advantage on all attack rolls (perfect movement tracking).',
  sideEffect: 'Disadvantage on attacks and Perception in direct sunlight or bright light unless wearing protective goggles. Inhuman eyes cause disadvantage on Charisma checks except Intimidation with non-enhanced creatures.',
  archetype: 'apex-predator',
  category: 'sensory',
  tags: ['sensory'],
}

const regenerativeFlesh: GeneModification = {
  id: 'regenerative-flesh',
  name: 'Regenerative Flesh',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your body can regrow lost tissue at an extraordinary rate.',
  passiveEffect: 'At start of each turn, if at least 1 HP, regain HP equal to CON modifier (min 1). Regrow lost limbs over 1d4 days. Advantage on death saves.',
  geneSurgeEffect: 'Regeneration increases to 2 × CON modifier per turn. Automatically stabilize when dying. Severed limbs regrow within 1 minute during Surge.',
  sideEffect: 'Must eat twice normal food or regeneration stops. Fire and acid suppress regeneration until end of next turn. Each time you regenerate 10+ HP in a single turn, DC 10 CON save or gain a minor cosmetic mutation (not Genetic Instability).',
  archetype: 'apex-predator',
  category: 'metabolic',
  tags: ['healing'],
}

const chameleonicSkin: GeneModification = {
  id: 'chameleonic-skin',
  name: 'Chameleonic Skin',
  tier: 'extreme',
  stabilityCost: 3,
  description: 'Your skin can change color and texture to blend with your surroundings.',
  passiveEffect: 'Advantage on Stealth checks. Action: become invisible until you move, take an action, or take damage. Change skin color/pattern at will.',
  geneSurgeEffect: 'Remain invisible while moving and attacking (as Greater Invisibility). Attacks against you have disadvantage. Advantage on all attack rolls.',
  sideEffect: 'Vulnerability to fire damage (burns and scars skin, disabling camouflage in affected area for 24 hours). Strong emotions cause involuntary color changes — disadvantage on Deception checks. Cannot maintain invisibility while frightened, charmed, or enraged.',
  passiveActionType: 'action',
  archetype: 'apex-predator',
  category: 'physical',
  tags: ['utility'],
}

const enhancedMusculatureFeline: GeneModification = {
  id: 'enhanced-musculature-feline',
  name: 'Enhanced Musculature (Feline)',
  tier: 'major',
  stabilityCost: 2,
  description: "Your muscles have been restructured like a great cat's, granting explosive strength.",
  passiveEffect: 'Jump distances triple. Advantage on Athletics checks to jump, climb, or swim. Fall from any height without damage if landing on feet (always land on feet unless incapacitated). Speed +10 feet.',
  geneSurgeEffect: 'Speed +30 feet total. Standing jumps without running start. When you jump and land within 5 feet of a creature, STR save (DC = 8 + prof + STR) or knocked prone.',
  sideEffect: 'Disadvantage on Wisdom saves against being frightened (twitchy reflexes). Disadvantage on Stealth when hiding in one place for more than 1 minute. Cannot benefit from Help action (too unpredictable).',
  archetype: 'apex-predator',
  category: 'physical',
  tags: ['movement', 'combat'],
}

const packHunterPheromones: GeneModification = {
  id: 'pack-hunter-pheromones',
  name: 'Pack Hunter Pheromones',
  tier: 'minor',
  stabilityCost: 1,
  description: 'You secrete pheromones that enhance pack coordination.',
  passiveEffect: 'Allies within 10 feet gain advantage on attacks against any creature you attacked since start of your last turn. Communicate basic concepts to creatures with INT 3 or lower via pheromones. Advantage on Animal Handling checks.',
  geneSurgeEffect: 'Pheromone range increases to 30 feet. Allies within range also gain +1d6 damage on attacks against creatures you attacked. Help action grants advantage to all allies within range (instead of just one).',
  archetype: 'apex-predator',
  category: 'physical',
  tags: ['support'],
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const baseGeneModifications: GeneModification[] = [
  enhancedMusculature, reinforcedSkeleton, improvedReflexes, enhancedCardiovascular, denseTissue,
  redundantOrgans, adrenalBoosters, combatMetabolism, enhancedLungCapacity, neuralAccelerators,
  berserkerGlands, adaptiveBiology, perfectKillerInstinct, regenerativeMutation, hulkingTransformation,
]

export const juggernautModifications: GeneModification[] = [
  titanicMusculature, adamantineBones, unstoppableMomentum, ironHide, regenerativeCore, enhancedVitality,
]

export const chimeraFireModifications: GeneModification[] = [
  ignitedBlood, infernoCore, plasmaBreath, thermalRegulation,
]

export const chimeraElectricityModifications: GeneModification[] = [
  electricOrgans, chainLightningReflexes, stormSkin, electromagneticPulse,
]

export const chimeraAcidModifications: GeneModification[] = [
  corrosiveBlood, acidSecretionGlands, causticImmunity, dissolvingTouch,
]

export const chimeraMetalModifications: GeneModification[] = [
  metallicBones, crystallineCarapace, stoneFlesh, geologicalDensity, reactivePlating,
]

export const chimeraModifications: GeneModification[] = [
  ...chimeraFireModifications,
  ...chimeraElectricityModifications,
  ...chimeraAcidModifications,
  ...chimeraMetalModifications,
]

export const apexPredatorModifications: GeneModification[] = [
  retractableClaws, venomousFangs, prehensileTail, chitinousCarapace,
  compoundEyes, regenerativeFlesh, chameleonicSkin, enhancedMusculatureFeline, packHunterPheromones,
]

export const allGeneModifications: GeneModification[] = [
  ...baseGeneModifications,
  ...juggernautModifications,
  ...chimeraModifications,
  ...apexPredatorModifications,
]
