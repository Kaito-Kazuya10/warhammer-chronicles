import type { CharacterClass } from '../../../types/module'

export const imperialGuardsman: CharacterClass = {
  id: 'imperial-guardsman',
  name: 'Imperial Guardsman',
  description:
    'Among the trillions who serve in the Astra Militarum, the Imperial Guard stands as humanity\'s first and last line of defense. Forged in the crucible of regimental doctrine, every Guardsman knows their purpose: to hold the line, fire their lasgun until the power pack runs dry, and if necessary, die so that humanity may endure.',
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
    '(a) Explorer\'s pack or (b) Military pack',
    'Regimental insignia, dog tags, photo of loved ones or the Emperor',
  ],

  // ─── BASE CLASS FEATURES ─────────────────────────────────────────
  features: [
    {
      level: 1,
      name: 'Fighting Style',
      description:
        'You adopt a particular style of fighting as your specialty. Choose one of the following options. You can\'t take the same option more than once.\n\n' +
        '**Archery.** +2 bonus to attack rolls with ranged weapons.\n\n' +
        '**Defense.** While wearing armor, +1 bonus to AC.\n\n' +
        '**Dueling.** When wielding a melee weapon in one hand and no other weapons, +2 bonus to damage rolls with that weapon.\n\n' +
        '**Two-Weapon Fighting.** When you engage in two-weapon fighting, add your ability modifier to the damage of the second attack.\n\n' +
        '**Marksman.** Ignore half cover and three-quarters cover with ranged attacks. Attacking at long range doesn\'t impose disadvantage.\n\n' +
        '**Close Quarters Battle.** No disadvantage on ranged attacks against creatures within 10 feet. If you hit a creature within 10 feet with a ranged weapon on your turn, that creature can\'t take reactions until end of turn.',
    },
    {
      level: 2,
      name: 'Fire Discipline',
      description:
        'Your military training has taught you to make every shot count.\n\n' +
        '**Aimed Shot.** As an action, make one ranged weapon attack with advantage. On hit, deal extra 1d8 damage of the weapon\'s type. Uses equal to proficiency bonus per short or long rest.\n\n' +
        '**Ammo Conservation.** When you roll a natural 1 on a ranged attack (which would mark off ammunition), you can reroll the attack. You must use the new result, but don\'t mark off ammunition. Uses equal to Wisdom modifier (min 1) per long rest.',
    },
    {
      level: 2,
      name: 'Second Wind',
      description:
        'On your turn, you can use a bonus action to regain hit points equal to 1d10 + your Guardsman level. Once used, must finish a short or long rest before using again.',
    },
    {
      level: 2,
      name: 'Squad Tactics',
      description:
        '**Covering Fire.** When a creature you can see attacks a target other than you within 5 feet of you, use your reaction to impose disadvantage on the attack roll. Must be wielding a ranged weapon with line of sight. Recharges on short or long rest.\n\n' +
        '**Coordinated Assault.** Once per turn, when you hit a creature with a ranged weapon attack, if an ally is within 5 feet of that creature and isn\'t incapacitated, deal extra 1d6 damage. Increases to 2d6 at 7th level.',
    },
    {
      level: 4,
      name: 'Ability Score Improvement',
      description:
        'Increase one ability score by 2, or two ability scores by 1 each. Cannot exceed 20.',
    },
    {
      level: 5,
      name: 'Extra Attack',
      description:
        'You can attack twice, instead of once, whenever you take the Attack action on your turn.',
    },
    {
      level: 5,
      name: 'Battlefield Awareness',
      description:
        'You gain proficiency in Perception if you don\'t already have it. If already proficient, gain proficiency in another Guardsman skill. Additionally, you can\'t be surprised while conscious.',
    },
    {
      level: 7,
      name: 'Improved Fire Discipline',
      description:
        'Aimed Shot extra damage increases to 2d8, and you score a critical hit with Aimed Shot on 19-20. When you use Ammo Conservation, gain +2 to the rerolled attack.',
    },
    {
      level: 7,
      name: 'Veteran\'s Reflexes',
      description:
        'Add your Wisdom modifier to initiative rolls. When an attacker you can see makes a ranged attack against you, use your reaction to impose disadvantage. Uses equal to proficiency bonus per long rest.',
    },
    {
      level: 8,
      name: 'Ability Score Improvement',
      description:
        'Increase one ability score by 2, or two ability scores by 1 each. Cannot exceed 20.',
    },
    {
      level: 9,
      name: 'Indomitable',
      description:
        'You can reroll a failed saving throw. You must use the new roll. Once per long rest.',
    },
    {
      level: 10,
      name: 'Ability Score Improvement',
      description:
        'Increase one ability score by 2, or two ability scores by 1 each. Cannot exceed 20.',
    },
    {
      level: 10,
      name: 'Hold the Line',
      description:
        '**Last Stand.** When reduced to 0 HP but not killed outright, drop to 1 HP instead. Once per long rest.\n\n' +
        '**Backs Against the Wall.** While at or below half HP maximum, you have advantage on ranged weapon attack rolls and creatures have disadvantage on opportunity attacks against you. Always active when condition is met.',
    },
  ],

  // ─── REGIMENTS (SUBCLASSES) ──────────────────────────────────────
  subclasses: [
    // ═══════════════════════════════════════════════════════════════
    // CADIAN SHOCK TROOPER
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'cadian-shock-trooper',
      name: 'Cadian Shock Trooper',
      description:
        'The Cadian regiments are the gold standard by which all Imperial Guard forces are measured. Raised on a fortress world at the edge of the Eye of Terror, Cadians are drilled from birth in military doctrine, weapons proficiency, and tactical superiority. Even with their homeworld destroyed, the Cadian way of war endures — disciplined, coordinated, and devastatingly effective.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'Cadian Discipline — Unshakeable Nerve',
          description:
            '[CORE] Advantage on saves against being frightened. When you succeed on a save vs. frightened, use your reaction to make one ranged weapon attack against the creature that frightened you (if in range).',
        },
        {
          level: 1,
          name: 'Cadian Discipline — Born to the Gun',
          description:
            '[MAIN] Proficiency with all ranged weapons. When you make a ranged attack with a proficient weapon, you can use DEX for the damage roll if the weapon doesn\'t already allow it.',
        },
        {
          level: 1,
          name: 'Cadian Discipline — Tactical Superiority',
          description:
            '[MAIN] Add proficiency bonus to initiative rolls. When you roll initiative, grant one ally within 30 feet a bonus to their initiative equal to your WIS modifier (min +1).',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Coordinated Fire — Volley Fire',
          description:
            '[CORE] As an action, choose a target in range. You and up to two allies who can see/hear you each use their reaction to make one ranged attack against that target. If all three participate, attacks are made with advantage. Uses equal to WIS modifier (min 1) per short or long rest.',
        },
        {
          level: 3,
          name: 'Coordinated Fire — Suppressing Fire',
          description:
            '[MAIN] As an action, expend 5 rounds to suppress a 10-foot square within normal range. Until your next turn, creatures entering or starting their turn there must make a WIS save (DC 8 + prof + DEX mod) or become Suppressed (disadvantage on attacks, no reactions, must seek cover). Fearless creatures have advantage. Maintain by spending action + ammo each turn. Ends if you move 5+ feet or are incapacitated.',
        },
        {
          level: 3,
          name: 'Coordinated Fire — Fire Team Leader',
          description:
            '[MAIN] When you Help an ally\'s attack, you can do so at 30 feet (instead of 5). The assisted creature deals extra 1d4 damage on hit.',
        },
        {
          level: 3,
          name: 'Coordinated Fire — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Overwatch Protocol:** As an action, choose a 60-foot cone from you. Until you move or lose concentration (up to 10 min), when a hostile creature enters or moves in the cone, use reaction to make one ranged attack. Once per short or long rest.\n\n' +
            '**B) Rapid Fire Drill:** Aimed Shot can be part of the Attack action (replacing one attack) instead of a separate action. Lose the advantage but keep the extra damage.\n\n' +
            '**C) Enhance — Unshakeable Nerve:** Extends to allies within 10 feet (advantage vs. frightened while they can see you). Your reaction attack on a successful save adds WIS modifier to damage.',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Born in the Purple — Cadian Fortitude',
          description:
            '[CORE] AC increases by 1. When you use Second Wind, grant one ally within 30 feet temporary HP equal to your Guardsman level.',
        },
        {
          level: 6,
          name: 'Born in the Purple — Decisive Commander',
          description:
            '[MAIN] Bonus action to issue a command to one ally within 60 feet. That ally uses their reaction to: move half speed without opportunity attacks, make one weapon attack, or take the Dodge action. Uses equal to WIS modifier (min 1) per short or long rest.',
        },
        {
          level: 6,
          name: 'Born in the Purple — Combined Arms Doctrine',
          description:
            '[MAIN] Once per short rest, when you hit with a ranged attack while within 5 feet and have a melee weapon drawn, immediately make one melee attack as part of the same action. Extra 1d6 damage on hit.',
        },
        {
          level: 6,
          name: 'Born in the Purple — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Artillery Observer:** As an action, designate a creature within 120 feet. Until your next turn, all ranged attacks by you and allies against that target have advantage. Once per long rest.\n\n' +
            '**B) Tactical Withdrawal:** When an ally within 30 feet is hit, use reaction to let them move half speed without opportunity attacks. Uses equal to WIS modifier (min 1) per short or long rest.\n\n' +
            '**C) Enhance — Volley Fire:** Coordinate up to three allies (instead of two). Volley attacks deal extra 1d6 damage on hit.\n\n' +
            '**D) Enhance — Suppressing Fire:** Area increases to 15-foot square, DC increases by 2, failed saves also halve speed.',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'Cadian Stand — The Planet Broke Before the Guard Did',
          description:
            '[CORE] When reduced to 0 HP, use reaction to make one weapon attack before falling unconscious. If this kills an enemy, you drop to 1 HP instead. All allies within 30 feet gain temp HP equal to your Guardsman level.',
        },
        {
          level: 9,
          name: 'Cadian Stand — Aura of Discipline',
          description:
            '[MAIN] Allies within 10 feet have advantage on saves vs. frightened. Allies within 10 feet add +1 to ranged weapon attack rolls.',
        },
        {
          level: 9,
          name: 'Cadian Stand — Masterwork Volley',
          description:
            '[MAIN] Volley Fire attacks deal extra 1d8 damage on hit. If the target drops to 0 HP from the volley, regain one use of Volley Fire.',
        },
        {
          level: 9,
          name: 'Cadian Stand — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Cadian Commander:** Once per long rest, as an action, all allies within 30 feet who can hear you use their reaction to make one ranged attack with advantage.\n\n' +
            '**B) Last Stand Protocol:** Once per long rest, when at/below half HP, bonus action: for 1 minute, you and allies within 10 feet have advantage on all attack rolls and saves. Ends if incapacitated.\n\n' +
            '**C) Enhance — Decisive Commander:** Range increases to 120 feet. Ally can move half speed AND make one attack as part of the same reaction. Gain additional uses equal to proficiency bonus per long rest.\n\n' +
            '**D) Enhance — Combined Arms Doctrine:** Melee damage increases to 2d6. Second use per short rest. After melee attack, push target 5 feet and move 5 feet without opportunity attacks.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // CATACHAN JUNGLE FIGHTER
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'catachan-jungle-fighter',
      name: 'Catachan Jungle Fighter',
      description:
        'Catachan is a death world where everything — the plants, the animals, the very atmosphere — is trying to kill you. Those who survive to adulthood are among the toughest, most resourceful soldiers in the Imperium. Catachan Jungle Fighters excel at guerrilla warfare, ambush tactics, and close-quarters violence.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'Jungle Warfare — Death World Survivor',
          description:
            '[CORE] Proficiency in Survival and Stealth (expertise if already proficient). Advantage on Survival in jungle/forest/dense vegetation. Can use STR instead of DEX for Stealth checks.',
        },
        {
          level: 1,
          name: 'Jungle Warfare — Guerrilla Fighter',
          description:
            '[MAIN] Move through difficult terrain without extra movement. Can hide when only lightly obscured in natural cover (foliage, jungle, rubble).',
        },
        {
          level: 1,
          name: 'Jungle Warfare — Catachan Fang',
          description:
            '[MAIN] Unarmed strikes deal 1d6 + STR bludgeoning. Daggers/combat knives/small blades deal 1d6 damage and count as finesse weapons for you.',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Ambush Predator — Surprise Attack',
          description:
            '[CORE] Extra 1d6 damage on weapon attacks during first round of combat against creatures that haven\'t acted. Also triggers once per turn when you have advantage on an attack roll (even outside first round).',
        },
        {
          level: 3,
          name: 'Ambush Predator — Strike and Fade',
          description:
            '[MAIN] After the Attack action, take Hide as a bonus action. When you Hide, move up to half speed as part of the same bonus action without revealing position.',
        },
        {
          level: 3,
          name: 'Ambush Predator — Silent Kill',
          description:
            '[MAIN] On melee attack against unaware target or one you have advantage against: target makes CON save (DC 8 + prof + STR mod) or can\'t speak/make noise until end of its next turn. If attack drops target to 0 HP, it dies silently. Uses equal to proficiency bonus per long rest.',
        },
        {
          level: 3,
          name: 'Ambush Predator — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Trapper:** Spend 1 minute to set a trap in a 5-foot area. First creature entering makes DEX save (DC 8 + prof + STR or DEX mod) or takes 2d6 piercing and is restrained until end of its next turn. Max 3 traps at once. Uses equal to proficiency bonus per long rest.\n\n' +
            '**B) Predator\'s Focus:** When you deal Surprise Attack damage, mark the creature as quarry for 1 minute. Advantage on Perception/Survival to track it. First attack each turn deals extra 1d4. One quarry at a time.\n\n' +
            '**C) Enhance — Catachan Fang:** Unarmed/small blade damage increases to 1d8. On hit, can attempt grapple as a bonus action.',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Death World Conditioning — Toxin Resistance',
          description:
            '[CORE] Advantage on saves vs. poison and disease. Resistance to poison damage.',
        },
        {
          level: 6,
          name: 'Death World Conditioning — Savage Resilience',
          description:
            '[MAIN] When damage would reduce you to 0 HP (not killed outright), use reaction to move up to your speed and make one melee attack. Once per short or long rest.',
        },
        {
          level: 6,
          name: 'Death World Conditioning — Jungle Predator',
          description:
            '[MAIN] On melee hit, attempt grapple or shove as a bonus action. Advantage on Athletics checks to grapple, shove, or escape grapples.',
        },
        {
          level: 6,
          name: 'Death World Conditioning — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Unseen Stalker:** Missing a weapon attack while hidden doesn\'t reveal your position. Dim light doesn\'t impose disadvantage on Perception.\n\n' +
            '**B) Death World Toxins:** Spend 10 minutes to create toxin. Apply as bonus action. Next creature hit makes CON save (DC 8 + prof + CON mod) or takes 2d6 poison and is poisoned for 1 minute. Doses equal to proficiency bonus per long rest.\n\n' +
            '**C) Enhance — Surprise Attack:** Damage increases to 2d6. Target must also make STR save (DC 8 + prof + STR mod) or be knocked prone.',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'Apex Hunter — Master Ambusher',
          description:
            '[CORE] Take Hide as part of your movement (no action) once per turn. Advantage on initiative rolls.',
        },
        {
          level: 9,
          name: 'Apex Hunter — Relentless Assault',
          description:
            '[MAIN] On a critical hit or reducing a creature to 0 HP, make one additional weapon attack as part of the same action. Once per turn.',
        },
        {
          level: 9,
          name: 'Apex Hunter — Catachan\'s Finest',
          description:
            '[MAIN] Unarmed/small blade damage increases to 1d10 + STR (or 1d8 + STR if not previously enhanced). When you have advantage, roll the weapon\'s damage dice two additional times.',
        },
        {
          level: 9,
          name: 'Apex Hunter — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Ghost of the Jungle:** Become invisible until end of your next turn when you succeed on a Hide check. Ends on attack, spell, or taking damage. Uses equal to proficiency bonus per long rest.\n\n' +
            '**B) Apex Predator:** On melee hit, force WIS save (DC 8 + prof + STR mod). Failure: frightened of you until end of your next turn and must move away. Uses equal to proficiency bonus per long rest.\n\n' +
            '**C) Enhance — Surprise Attack:** Damage increases to 3d6. Target has disadvantage on all attack rolls until start of your next turn.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // TALLARN DESERT RAIDER
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'tallarn-desert-raider',
      name: 'Tallarn Desert Raider',
      description:
        'The Tallarn regiments are masters of mobile warfare and hit-and-run tactics, forged in the endless deserts of their homeworld. Where other regiments stand and fight, Tallarn forces move like the desert wind — swift, unpredictable, and gone before the enemy can retaliate.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'Mobile Warfare — Desert Born',
          description:
            '[CORE] Base walking speed increases by 10 feet. Ignore difficult terrain from sand, ash, or loose earth. Advantage on saves vs. exhaustion from extreme heat or dehydration.',
        },
        {
          level: 1,
          name: 'Mobile Warfare — Hit and Run',
          description:
            '[MAIN] When you Dash, make one weapon attack as a bonus action. You don\'t provoke opportunity attacks from the target for the rest of your turn.',
        },
        {
          level: 1,
          name: 'Mobile Warfare — Raider\'s Mobility',
          description:
            '[MAIN] Opportunity attacks against you are made with disadvantage. Move through spaces of creatures larger than you without extra movement.',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Lightning Assault — Rapid Strike',
          description:
            '[CORE] When you Attack with a ranged weapon, move up to 10 feet before or after each attack without provoking opportunity attacks. This doesn\'t count against total movement.',
        },
        {
          level: 3,
          name: 'Lightning Assault — Flanking Maneuver',
          description:
            '[MAIN] Bonus action to move half speed. If you end within 5 feet of a creature that an ally is also within 5 feet of, your next attack against it this turn has advantage. Uses equal to DEX modifier (min 1) per short or long rest.',
        },
        {
          level: 3,
          name: 'Lightning Assault — Dust Cloud',
          description:
            '[MAIN] When you Dash, the 5-foot area along your path becomes lightly obscured until your next turn (terrain permitting). Opportunity attacks through this area have disadvantage.',
        },
        {
          level: 3,
          name: 'Lightning Assault — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Skirmisher\'s Harass:** When you hit with a ranged attack after moving 10+ feet, target\'s speed is reduced by 10 feet until your next turn. Doesn\'t stack.\n\n' +
            '**B) Wind Runner:** Disengage as a bonus action. Speed increases by 5 feet.\n\n' +
            '**C) Enhance — Hit and Run:** Make two attacks instead of one as the bonus action. No opportunity attacks from any creature (not just target) for rest of turn.',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Born to the Saddle — Vehicle Specialist',
          description:
            '[CORE] Proficiency with all ground vehicles. Double proficiency bonus on vehicle operation/repair checks. Vehicle speed increases by 10 feet. Dash as bonus action while operating a vehicle.',
        },
        {
          level: 6,
          name: 'Born to the Saddle — Mounted Combatant',
          description:
            '[MAIN] Advantage on melee attacks against unmounted creatures smaller than your mount/vehicle. If your mount/vehicle makes a DEX save for half damage, it takes none on success and half on failure.',
        },
        {
          level: 6,
          name: 'Born to the Saddle — Evasive Maneuvers',
          description:
            '[MAIN] When targeted by an attack, use reaction to impose disadvantage. On miss, move 10 feet without opportunity attacks. Uses equal to DEX modifier (min 1) per short or long rest.',
        },
        {
          level: 6,
          name: 'Born to the Saddle — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Raider\'s Instinct:** Advantage on initiative. During first round of combat, speed is doubled.\n\n' +
            '**B) Sandstorm Assault:** As an action, you and up to two willing allies within 30 feet simultaneously move up to your respective speeds without opportunity attacks, each making one attack at the end. Once per short or long rest.\n\n' +
            '**C) Enhance — Flanking Maneuver:** Advantage on all attacks (not just the next) against the flanked creature until end of turn. Flanking attacks deal extra 1d6.',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'Desert Wind — Relentless Pursuit',
          description:
            '[CORE] Speed increases by additional 10 feet (total +20 from Desert Born). Dash as a bonus action each turn.',
        },
        {
          level: 9,
          name: 'Desert Wind — Master of Evasion',
          description:
            '[MAIN] When making a DEX save for half damage: no damage on success, half on failure.',
        },
        {
          level: 9,
          name: 'Desert Wind — Lightning Raid',
          description:
            '[MAIN] Once per turn, when you hit after moving 20+ feet, deal extra 3d6 damage. On crit, target must also make CON save (DC 8 + prof + DEX mod) or be stunned until end of your next turn.',
        },
        {
          level: 9,
          name: 'Desert Wind — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Phantom Raider:** After an attack, move half speed without opportunity attacks (doesn\'t count against movement). Uses equal to DEX modifier per short rest.\n\n' +
            '**B) Cavalry Charge:** Once per long rest, move 30+ feet straight toward a creature then hit with melee: auto-crit. Target makes STR save (DC 8 + prof + STR mod) or is knocked prone.\n\n' +
            '**C) Enhance — Lightning Raid:** Damage increases to 4d6. Target must make STR save or be knocked 10 feet in a direction of your choice.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // VOSTROYAN FIRSTBORN
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'vostroyan-firstborn',
      name: 'Vostroyan Firstborn',
      description:
        'The Vostroyan regiments carry a burden of ancient shame, atoning for their ancestors\' failure during the Horus Heresy. Every generation, the firstborn is sent to serve. Vostroyan soldiers are master marksmen, trained from childhood, fighting with cold precision and delivering death at extreme range.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'Marksman Training — Firstborn Marksman',
          description:
            '[CORE] Ignore half and three-quarters cover on ranged attacks. No disadvantage at long range.',
        },
        {
          level: 1,
          name: 'Marksman Training — Steady Aim',
          description:
            '[MAIN] When you haven\'t moved this turn, bonus action to gain advantage on your next ranged attack before end of turn.',
        },
        {
          level: 1,
          name: 'Marksman Training — Honorbound',
          description:
            '[MAIN] Advantage on death saving throws. When an ally within 30 feet drops to 0 HP, use reaction to make one ranged attack with advantage.',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Sniper — Improved Critical',
          description: '[CORE] Ranged weapon attacks crit on 19-20.',
        },
        {
          level: 3,
          name: 'Sniper — Weakpoint Targeting',
          description:
            '[MAIN] On ranged hit, choose one effect. Uses equal to DEX modifier (min 1) per short or long rest.\n\n' +
            '• **Head Shot:** CON save (DC 8 + prof + DEX) or stunned until end of its next turn.\n' +
            '• **Leg Shot:** Speed halved until end of its next turn.\n' +
            '• **Arm Shot:** Disadvantage on next attack before end of its next turn.\n' +
            '• **Vital Shot:** Extra 2d6 damage.',
        },
        {
          level: 3,
          name: 'Sniper — Overwatch Position',
          description:
            '[MAIN] As an action, choose a 60-foot cone. Until you move or lose concentration (up to 10 min), when a creature enters or ends its turn in the cone, use reaction to make one ranged attack. Once per short or long rest.',
        },
        {
          level: 3,
          name: 'Sniper — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Precision Shot:** Take -5 to attack roll for +10 damage. Can decide after seeing the roll but before knowing if it hits.\n\n' +
            '**B) Spotter\'s Eye:** Bonus action to study a target in range. Until end of your next turn, attacks ignore total cover (must know location), advantage on first attack.\n\n' +
            '**C) Enhance — Steady Aim:** Also gain +2 to damage. Can use even if you moved up to 5 feet (instead of no movement).',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Master Marksman — Extended Range',
          description:
            '[CORE] Normal range of ranged weapons increases by 50%. Long range increases by 100%.',
        },
        {
          level: 6,
          name: 'Master Marksman — Sniper\'s Focus',
          description:
            '[MAIN] Aimed Shot can target creatures up to twice normal range. Half cover is ignored for this shot.',
        },
        {
          level: 6,
          name: 'Master Marksman — Deadly Accuracy',
          description:
            '[MAIN] On a ranged crit, roll one of the weapon\'s damage dice one additional time and add it to the crit damage.',
        },
        {
          level: 6,
          name: 'Master Marksman — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Killzone:** As an action, designate a 10-foot square in range as your killzone for 1 minute. Advantage on attacks and extra 1d6 damage against creatures in the zone. Once per short or long rest.\n\n' +
            '**B) Counter-Sniper:** When a creature makes a ranged attack against you or an ally within 10 feet, use reaction to attack it. If your damage exceeds the triggering attack\'s damage, the triggering attack misses. Uses equal to DEX modifier per long rest.\n\n' +
            '**C) Enhance — Weakpoint Targeting:** Head Shot stuns for 1 minute (save end of each turn). Leg Shot reduces speed to 0 and knocks prone. Arm Shot drops one held object. Vital Shot deals 3d6.',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'Deadeye — Perfect Shot',
          description:
            '[CORE] Once per short rest, spend 1 minute lining up a shot (must see target). Next ranged attack has advantage, auto-crits if it hits, and deals max damage on all dice. Wasted if target moves 30+ feet before you fire.',
        },
        {
          level: 9,
          name: 'Deadeye — Executioner\'s Eye',
          description:
            '[MAIN] Ranged attacks ignore all cover (half, three-quarters, total). Can attack unseen creatures without disadvantage if you know their location.',
        },
        {
          level: 9,
          name: 'Deadeye — Improved Critical (Greater)',
          description: '[MAIN] Ranged weapon attacks crit on 18-20.',
        },
        {
          level: 9,
          name: 'Deadeye — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) One Shot, One Kill:** When you hit a creature at full HP, deal extra 4d6 damage. Once per long rest.\n\n' +
            '**B) Bullet Time:** Once per long rest, bonus action: for 1 minute, ranged attacks have advantage, auto-succeed Concentration checks, speed becomes 0. Ends if you move or are moved.\n\n' +
            '**C) Enhance — Perfect Shot:** Requires only 1 action to prepare (instead of 1 minute). Target threshold increases to 60 feet.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // KRIEGSMAN (DEATH KORPS OF KRIEG)
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'kriegsman',
      name: 'Kriegsman (Death Korps of Krieg)',
      description:
        'The Death Korps of Krieg hail from a world that destroyed itself in nuclear fire. Consumed by guilt, they seek atonement through service and death. Kriegsmen are the most fatalistic, disciplined, and expendable soldiers in the Imperium — masters of siege warfare, trenches, and martyrdom.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'No Pity, No Remorse, No Fear — Fatalistic Devotion',
          description: '[CORE] You are immune to being frightened.',
        },
        {
          level: 1,
          name: 'No Pity, No Remorse, No Fear — Death Before Dishonor',
          description:
            '[MAIN] When you drop to 0 HP (not killed outright), use reaction to make one melee attack against a creature in reach before falling unconscious. If this kills an enemy, you stabilize automatically.',
        },
        {
          level: 1,
          name: 'No Pity, No Remorse, No Fear — Trench Fighter',
          description:
            '[MAIN] While in a trench, foxhole, or behind fortifications: +2 AC, advantage on DEX saves vs. seen effects, and use reaction to grant an ally within 10 feet the same AC bonus until your next turn.',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Siege Warfare — Sapper Training',
          description:
            '[CORE] Proficiency with demolitions kits and mechanic\'s tools. Plant explosives as an action (detonate end of next turn): 4d6 bludgeoning in 10-foot radius (DEX save DC 8 + prof + INT mod for half). Double damage vs. structures/objects. Uses equal to proficiency bonus per long rest.',
        },
        {
          level: 3,
          name: 'Siege Warfare — Grenadier',
          description:
            '[MAIN] Throw grenades as a bonus action (instead of action). Double throw range. Creatures have disadvantage on saves against your grenades.',
        },
        {
          level: 3,
          name: 'Siege Warfare — Entrenchment',
          description:
            '[MAIN] Use an action to dig a foxhole. After 1 minute in earth/sand, create a 5-foot square of three-quarters cover.',
        },
        {
          level: 3,
          name: 'Siege Warfare — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Siege Specialist:** Explosives damage increases to 6d6, radius to 15 feet. Can set delayed detonation up to 10 minutes.\n\n' +
            '**B) Bayonet Charge:** Move 20+ feet straight toward a creature then hit with melee: extra 2d6 damage. Target makes STR save (DC 8 + prof + STR mod) or is knocked prone. Uses equal to proficiency bonus per short rest.\n\n' +
            '**C) Enhance — Trench Fighter:** Benefits now apply when prone or in any cover (not just fortifications). AC bonus increases to +3. While in trench/fortifications, ranged attacks don\'t reveal your hidden position.',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Martyrdom Protocol — Toxic Environment Adaptation',
          description:
            '[CORE] Immunity to poison damage and the poisoned condition. Can breathe in toxic atmospheres, chemical weapons, and hazardous environments.',
        },
        {
          level: 6,
          name: 'Martyrdom Protocol — Gas Warfare',
          description:
            '[MAIN] As an action, deploy a gas grenade up to 60 feet. 20-foot radius sphere of toxic gas (spreads around corners, lasts 1 min or until dispersed). Creatures entering or starting turn: CON save (DC 8 + prof + CON mod). Fail: 3d6 poison and poisoned until end of next turn. Success: half damage, not poisoned. Uses equal to CON modifier (min 1) per long rest.',
        },
        {
          level: 6,
          name: 'Martyrdom Protocol — Atonement Through Suffering',
          description:
            '[MAIN] When you take damage, use reaction to reduce it by 1d10 + CON modifier. Once per short or long rest.',
        },
        {
          level: 6,
          name: 'Martyrdom Protocol — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Expendable:** When an ally within 5 feet is targeted, use reaction to become the target instead. If hit, you have resistance to the damage.\n\n' +
            '**B) Chemical Specialist:** Gas grenades also impose disadvantage on attacks on failed save. Can choose compound type: Incendiary (fire), Hallucinogenic (frightened instead of poisoned), or Corrosive (acid, reduces target AC by 1 until repaired).\n\n' +
            '**C) Enhance — Death Before Dishonor:** Make two weapon attacks instead of one. Either hit automatically stabilizes you (no kill required).',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'For the Emperor — Last Stand',
          description:
            '[CORE] Once per long rest, when reduced to 0 HP, remain conscious for 1 round. During this round: advantage on all attacks and saves, attacks deal max damage, resistance to all damage. At end of round, drop to 0 HP and begin death saves.',
        },
        {
          level: 9,
          name: 'For the Emperor — Inspire Through Sacrifice',
          description:
            '[MAIN] When you use Death Before Dishonor, all allies within 30 feet gain temp HP equal to twice your Guardsman level and advantage on their next attack.',
        },
        {
          level: 9,
          name: 'For the Emperor — Master of Attrition',
          description:
            '[MAIN] Advantage on all CON saves and death saves. When you succeed on a death save, regain 1 HP instead of just stabilizing on three successes.',
        },
        {
          level: 9,
          name: 'For the Emperor — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Scorched Earth:** Once per long rest, as an action, detonate all remaining explosives and gas grenades centered on yourself. All creatures within 30 feet: DEX save (DC 8 + prof + CON mod). Fail: 8d6 fire + 4d6 poison, poisoned 1 minute. Success: half, not poisoned. You have resistance.\n\n' +
            '**B) Undying Will:** When Last Stand ends and you begin death saves, you have three automatic successes (stabilize immediately). Regain 1 HP at start of your next turn.\n\n' +
            '**C) Enhance — Gas Warfare:** Radius increases to 30 feet, damage to 5d6. Gas lasts 2 minutes. You are immune to all gas effects, not just your own.',
        },
      ],
    },

    // ═══════════════════════════════════════════════════════════════
    // HEAVY WEAPONS SPECIALIST
    // ═══════════════════════════════════════════════════════════════
    {
      id: 'heavy-weapons-specialist',
      name: 'Heavy Weapons Specialist',
      description:
        'Heavy Weapons Specialists wield the most devastating portable weapons in the Imperial arsenal: lascannons, heavy bolters, autocannons, and missile launchers. These soldiers provide crucial fire support, suppressing enemy positions, destroying vehicles, and laying down withering curtains of fire.',
      unlockLevel: 1,
      features: [
        // ── Level 1 ──
        {
          level: 1,
          name: 'Heavy Ordnance — Heavy Weapons Proficiency',
          description:
            '[CORE] Proficiency with all heavy weapons (heavy bolter, lascannon, autocannon, missile launcher, heavy stubber, mortar). No disadvantage from the Heavy property even if STR is below 13.',
        },
        {
          level: 1,
          name: 'Heavy Ordnance — Weapon Stabilization',
          description:
            '[MAIN] Heavy weapons don\'t require Setup action before firing. Can move up to half speed on the same turn you fire a heavy weapon without disadvantage.',
        },
        {
          level: 1,
          name: 'Heavy Ordnance — Sustained Fire Doctrine',
          description:
            '[MAIN] When you hit with a heavy weapon, your next heavy weapon attack against the same target before end of your next turn has advantage.',
        },
        // ── Level 3 ──
        {
          level: 3,
          name: 'Fire Support — Suppressive Barrage',
          description:
            '[CORE] As an action, expend 10 rounds of heavy ammo to create a 20-foot square of heavy suppression within range. Until your next turn, creatures entering or starting turn: WIS save (DC 8 + prof + STR or DEX mod). Fail: Heavily Suppressed (disadvantage on attacks/checks, speed halved, no reactions). Fearless creatures have advantage. Maintain by using action + ammo each turn.',
        },
        {
          level: 3,
          name: 'Fire Support — Fortified Position',
          description:
            '[MAIN] When you don\'t move on your turn, until your next turn: +2 AC, heavy weapon attacks deal extra 1d6 damage, advantage on STR/CON saves to maintain position. Damage increases to 2d6 at 7th level.',
        },
        {
          level: 3,
          name: 'Fire Support — Loader\'s Efficiency',
          description:
            '[MAIN] Reload heavy weapons as bonus action (instead of action). Reroll 1s on heavy weapon damage dice (must use new roll).',
        },
        {
          level: 3,
          name: 'Fire Support — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Pinpoint Barrage:** Reduce Suppressive Barrage to 10-foot square: DC increases by 2 and failed saves take 2d6 damage of weapon type.\n\n' +
            '**B) Bracing Expert:** Fortified Position also grants half cover (+2 AC and DEX saves) to allies within 5 feet. You cannot be moved against your will while using it.\n\n' +
            '**C) Enhance — Sustained Fire Doctrine:** Advantage also applies when switching to a different target within 10 feet of the original. If both attacks hit the same target, second deals extra 1d6.',
        },
        // ── Level 6 ──
        {
          level: 6,
          name: 'Walking Fortress — Improved Fortification',
          description:
            '[CORE] Fortified Position AC bonus increases to +3. Advantage on saves vs. prone, push, or involuntary movement. Allies within 10 feet gain half cover.',
        },
        {
          level: 6,
          name: 'Walking Fortress — Devastating Fire',
          description:
            '[MAIN] On heavy weapon hit, deal extra 3d6 damage. Vehicles/constructs have disadvantage on next attack. Uses equal to proficiency bonus per short or long rest.',
        },
        {
          level: 6,
          name: 'Walking Fortress — Anti-Armor Specialist',
          description:
            '[MAIN] Heavy weapon attacks ignore damage resistance. Against vehicles, constructs, or heavy armor targets, crit on 19-20.',
        },
        {
          level: 6,
          name: 'Walking Fortress — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Mobile Emplacement:** Fortified Position works if you moved up to 10 feet (instead of 0). When you end your turn having moved 10 feet or less, set up Fortified Position (no action).\n\n' +
            '**B) Armor Piercing Rounds:** Once per turn on heavy weapon hit, target makes CON save (DC 8 + prof + STR mod). Fail: AC reduced by 2 until end of your next turn. Doesn\'t stack.\n\n' +
            '**C) Enhance — Suppressive Barrage:** Area increases to 30-foot square. Failed saves also take 2d6 weapon damage. Can maintain while moving up to 5 feet per turn.',
        },
        // ── Level 9 ──
        {
          level: 9,
          name: 'Emperor\'s Hammer — Maximum Firepower',
          description:
            '[CORE] When you Attack with a heavy weapon, make three attacks instead of two (or two instead of one without Extra Attack).',
        },
        {
          level: 9,
          name: 'Emperor\'s Hammer — Overwhelming Barrage',
          description:
            '[MAIN] Once per short rest, as an action: make one heavy weapon attack against each creature of your choice in a 30-foot cone with advantage. OR focus on one target — three attacks with advantage. If 2+ hit the focused target, CON save (DC 8 + prof + STR or DEX mod) or stunned until end of your next turn.',
        },
        {
          level: 9,
          name: 'Emperor\'s Hammer — Unbreakable Anchor',
          description:
            '[MAIN] While using Fortified Position: resistance to bludgeoning, piercing, and slashing damage, and heavy weapon attacks ignore all cover. Lasts a number of rounds equal to proficiency bonus per long rest.',
        },
        {
          level: 9,
          name: 'Emperor\'s Hammer — Options',
          description:
            '[CHOOSE ONE]\n\n' +
            '**A) Walking Tank:** Wield vehicle-mounted heavy weapons. Extra die of damage but must remain stationary (0 movement) while firing. Double carrying capacity for heavy weapons.\n\n' +
            '**B) Final Salvo:** Once per long rest, when reduced to 0 HP, use reaction to fire one Overwhelming Barrage before falling unconscious. Auto-hits all targets.\n\n' +
            '**C) Enhance — Devastating Fire:** Damage increases to 4d6. Against vehicles/constructs, additional 2d6 damage and target speed reduced to 0 until end of its next turn.',
        },
      ],
    },
  ],
  tags: ['martial', 'ranged', 'military', 'imperial'],
}
