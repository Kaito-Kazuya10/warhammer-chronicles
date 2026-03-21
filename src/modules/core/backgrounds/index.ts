import type { Background } from '../../../types/module'

// ═══════════════════════════════════════════════════════════════════════════════
// STANDARD BACKGROUNDS
// ═══════════════════════════════════════════════════════════════════════════════

const soldier: Background = {
  id: 'soldier',
  name: 'Soldier',
  description: 'You served in the Imperial Guard, a planetary defence force, or a mercenary company — you have known war, and war has known you.',
  skillProficiencies: ['athletics', 'intimidation'],
  toolProficiencies: ['Gaming Set (one of choice)', 'Vehicles (Ground)'],
  startingEquipment: [
    'Rank insignia',
    'Dog tags',
    'Trophy from a battle',
    'Common clothes',
    '10 Thrones',
  ],
  feature: {
    name: 'Military Rank',
    description: 'Soldiers of lower rank defer to you and will follow your reasonable orders. You can access military facilities, requisition simple equipment from Imperial Guard quartermasters, and secure an audience with officers of comparable rank.',
  },
  tags: ['combat', 'imperial'],
}

const adept: Background = {
  id: 'adept',
  name: 'Adept',
  description: 'You are a trained functionary of the Administratum — a scribe, clerk, or minor official whose lifeblood is parchment and whose weapon is procedure.',
  skillProficiencies: ['history', 'investigation'],
  toolProficiencies: ["Calligrapher's Supplies", 'Forgery Kit'],
  startingEquipment: [
    'Writing kit (ink, quills, parchment)',
    'Blank Administratum forms',
    'Administratum seal (low clearance)',
    'Common clothes',
    '15 Thrones',
  ],
  feature: {
    name: 'Bureaucratic Access',
    description: 'You can navigate the labyrinthine Imperial administrative system with ease — accessing public records, expediting paperwork, and identifying the correct official to bribe. You can always locate and enter the local Administratum office in any Imperial settlement.',
  },
  tags: ['imperial', 'scholarly'],
}

const outcast: Background = {
  id: 'outcast',
  name: 'Outcast',
  description: 'Discarded by society, you have survived in the margins — in the underhives, the wastes, or the forgotten corners between hab-blocks.',
  skillProficiencies: ['survival', 'stealth'],
  toolProficiencies: ["Thieves' Tools"],
  languages: ['Underworld'],
  startingEquipment: [
    'Tattered cloak',
    'Bedroll',
    'Hunting trap',
    'Animal trophy',
    '5 Thrones',
  ],
  feature: {
    name: 'Life on the Fringe',
    description: 'You can always find a place to shelter in any settlement — abandoned buildings, maintenance corridors, forgotten sub-levels. Other outcasts, vagrants, and fringe-dwellers will share basic information and shelter with you in exchange for the same.',
  },
  tags: ['underworld', 'fringe'],
}

const ganger: Background = {
  id: 'ganger',
  name: 'Ganger',
  description: 'You grew up in the brutal hierarchy of a hive gang, where loyalty was everything and weakness was death.',
  skillProficiencies: ['intimidation', 'deception'],
  toolProficiencies: ['Gaming Set (one of choice)', "Thieves' Tools"],
  startingEquipment: [
    'Gang colors or tattoo marking',
    'Knife',
    'Crowbar',
    'Dark common clothes',
    '10 Thrones',
  ],
  feature: {
    name: 'Criminal Contacts',
    description: 'In any major settlement you can locate a criminal contact within 1d4 hours. Through your network you can fence stolen goods at 50% market value, gather information on local criminal activity, and arrange meetings with gang leadership.',
  },
  tags: ['underworld', 'criminal'],
}

const acolyte: Background = {
  id: 'acolyte',
  name: 'Acolyte',
  description: 'You have devoted your life to the Imperial Creed, serving in the Ecclesiarchy as a minor clergy, temple attendant, or wandering preacher.',
  skillProficiencies: ['insight', 'religion'],
  toolProficiencies: ["Calligrapher's Supplies"],
  languages: ['High Gothic'],
  startingEquipment: [
    'Holy symbol (aquila or local saint)',
    'Prayer book',
    'Vestments',
    '5 sticks of incense',
    'Common clothes',
    '15 Thrones',
  ],
  feature: {
    name: 'Shelter of the Faithful',
    description: 'You can always find sanctuary at any Imperial temple, shrine, or Ecclesiarchy facility. The faithful will provide food, shelter, and basic medical care. You may occasionally be asked to perform minor services — sermons, blessings, or minor administrative duties — in return.',
  },
  tags: ['imperial', 'religious'],
}

const voidBorn: Background = {
  id: 'void-born',
  name: 'Void Born',
  description: 'You were born and raised aboard a void-faring vessel, and the hum of plasma drives is as natural to you as birdsong is to a planet-dweller.',
  skillProficiencies: ['perception', 'technology'],
  toolProficiencies: ["Navigator's Tools"],
  languageChoices: 1,
  startingEquipment: [
    'Star chart (local sector)',
    'Void suit patch kit',
    'Lucky charm from your home ship',
    'Common clothes',
    '10 Thrones',
  ],
  feature: {
    name: 'Void Legs',
    description: 'You can navigate the standard layout of any Imperial ship class without a guide, and void crew instinctively treat you as one of their own. You can almost always find passage aboard a ship in exchange for labour or a small fee.',
  },
  tags: ['void', 'imperial'],
}

const mechanicumInitiate: Background = {
  id: 'mechanicum-initiate',
  name: 'Mechanicum Initiate',
  description: 'You have been touched by the Omnissiah — initiated into the lower mysteries of the Adeptus Mechanicus, trained to tend the sacred machines.',
  skillProficiencies: ['technology', 'religion'],
  toolProficiencies: ["Mechanic's Tools"],
  languages: ['Binary'],
  startingEquipment: [
    "Mechanic's tools",
    'Vial of sacred machine oil',
    'Cogwheel pendant',
    'Red robes',
    '10 Thrones',
  ],
  feature: {
    name: 'Rite of Maintenance',
    description: 'Once per long rest you have advantage on a Technology check to repair or operate Imperial machinery. Tech-Priests and Mechanicus personnel are more willing to share technical knowledge and schematics with you, recognising you as a fellow servant of the Machine God.',
  },
  tags: ['mechanicus', 'scholarly'],
}

const noble: Background = {
  id: 'noble',
  name: 'Noble',
  description: 'You were born to wealth and status, raised in the gilded corridors of power where alliances are forged with wine and broken with whispers.',
  skillProficiencies: ['persuasion', 'history'],
  toolProficiencies: ['Gaming Set (one of choice)'],
  languages: ['High Gothic'],
  startingEquipment: [
    'Fine clothes',
    'Signet ring',
    'Letter of introduction from noble patron',
    '25 Thrones',
  ],
  feature: {
    name: 'Position of Privilege',
    description: 'You are welcomed in high society and common folk generally accommodate your requests out of deference or fear. You can secure audiences with nobles and Imperial officials, and you can always find comfortable lodging — at someone else\'s expense if you play your cards right.',
  },
  tags: ['imperial', 'social'],
}

const chirurgeon: Background = {
  id: 'chirurgeon',
  name: 'Chirurgeon',
  description: 'Whether trained in an Administratum medicae facility or self-taught in the field, you have kept people alive when they had no business being so.',
  skillProficiencies: ['medicine', 'investigation'],
  toolProficiencies: ['Medkit (Medicae Tools)', "Poisoner's Kit"],
  startingEquipment: [
    'Medkit',
    'Case of medical instruments',
    'Bandages and field dressings',
    'Common clothes',
    '15 Thrones',
  ],
  feature: {
    name: 'Medical Authority',
    description: 'Your expertise grants you access to wounded or sick individuals even in restricted areas. You can requisition basic medical supplies from Imperial facilities, and medicae bays and surgical suites in settlements are available for your use.',
  },
  tags: ['scholarly', 'support'],
}

const pilgrim: Background = {
  id: 'pilgrim',
  name: 'Pilgrim',
  description: 'You walk the sacred routes of the Imperium, journeying to shrines, relics, and holy sites in an act of devotion that may take a lifetime.',
  skillProficiencies: ['religion', 'survival'],
  toolProficiencies: ["Cook's Utensils"],
  languageChoices: 1,
  startingEquipment: [
    'Holy symbol',
    "Pilgrim's staff (functions as quarterstaff)",
    "Traveler's clothes",
    'Prayer beads',
    '5 Thrones',
  ],
  feature: {
    name: "Pilgrim's Welcome",
    description: 'Fellow pilgrims and devout religious communities along established pilgrim routes will provide you with food and shelter. Devout citizens will assist with directions and basic supplies. You know the major pilgrim routes and shrine locations within the sector.',
  },
  tags: ['religious', 'travel'],
}

const enforcer: Background = {
  id: 'enforcer',
  name: 'Enforcer',
  description: 'You served as an Adeptus Arbites officer, a planetary enforcer, or a local constable — the thin red line between order and the abyss.',
  skillProficiencies: ['investigation', 'intimidation'],
  toolProficiencies: ['Vehicles (Ground)'],
  languages: ['Imperial Codes'],
  startingEquipment: [
    'Badge of office',
    'Manacles',
    'Whistle or signalling device',
    'Common clothes',
    '10 Thrones',
  ],
  feature: {
    name: "Watcher's Eye",
    description: 'You can identify law enforcement officers and agents of Imperial authority in any settlement, and they recognise you in turn. You have access to local precinct houses, can review public arrest records, and can request cooperation from local enforcers — though they may ask for something in return.',
  },
  tags: ['imperial', 'combat'],
}

const savant: Background = {
  id: 'savant',
  name: 'Savant',
  description: 'You are a scholar and collector of knowledge — historian, xeno-archaeologist, theologian, or simply someone who cannot stop reading.',
  skillProficiencies: ['history', 'investigation'],
  // The Savant's second proficiency is player's choice from Intelligence-based skills.
  // Default: investigation. The feature clarifies this is a flexible pick.
  toolProficiencies: ["Calligrapher's Supplies"],
  languageChoices: 2,
  startingEquipment: [
    'Leather-bound journal',
    'Ink and quills',
    'Scholarly robes',
    'One reference text (subject of choice)',
    '15 Thrones',
  ],
  feature: {
    name: 'Researcher',
    description: 'When you seek a piece of information, you always know where and how to find it — a library, data-vault, scholarium, or a specific knowledgeable individual. The GM may rule that certain information is genuinely inaccessible, but you will always know why. Additionally, your second skill proficiency may be any Intelligence-based skill of your choice.',
  },
  tags: ['scholarly'],
}

const merchant: Background = {
  id: 'merchant',
  name: 'Merchant',
  description: 'You have built your life on the exchange of goods, favours, and information — in the Imperium, commerce is power.',
  skillProficiencies: ['persuasion', 'insight'],
  toolProficiencies: ["Navigator's Tools or Vehicles (Ground) — player's choice"],
  languageChoices: 1,
  startingEquipment: [
    "Merchant's scales",
    'Ledger',
    'Fine clothes',
    'Sample case of trade goods',
    '20 Thrones',
  ],
  feature: {
    name: 'Trade Network',
    description: 'You have contacts among merchants, traders, and smugglers across the sector. You can buy goods at 10% below market price and sell at 10% above. You always know the approximate market value of non-unique items. You can reliably arrange transportation of goods between settlements through your network.',
  },
  tags: ['social', 'travel'],
}

const penalLegionnaire: Background = {
  id: 'penal-legionnaire',
  name: 'Penal Legionnaire',
  description: 'You were given a choice between death and service, and you chose service — now you fight to earn back what little you had.',
  skillProficiencies: ['survival', 'athletics'],
  toolProficiencies: ['Gaming Set (one of choice)'],
  languages: ['Underworld'],
  startingEquipment: [
    'Prison tattoo or brand',
    'Crude knife',
    'Tattered clothes',
    'Flask of cheap amasec',
    '5 Thrones',
  ],
  feature: {
    name: 'Hard Time',
    description: 'You can navigate prison hierarchies, identify who holds real power in any confined or stratified social structure, and survive with minimal resources. Former convicts and penal soldiers will cooperate with you out of shared experience. You can endure extreme confinement and deprivation without mechanical penalties.',
  },
  tags: ['underworld', 'criminal'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPECIAL / RESTRICTED BACKGROUNDS  (require GM approval)
// ═══════════════════════════════════════════════════════════════════════════════

const genestealerCultist: Background = {
  id: 'genestealer-cultist',
  name: 'Genestealer Cultist',
  description: 'You were born into or inducted by a Genestealer Cult — your flesh bears the mark of the xenos, your loyalty divided between the Imperium you pretend to serve and the Star Children you truly worship. Start with 8 Corruption. Requires GM approval.',
  skillProficiencies: ['deception', 'stealth'],
  toolProficiencies: ['Disguise Kit'],
  startingEquipment: [
    'Cult symbol (easily concealed)',
    'Normal clothes',
    'Concealment hood',
    '10 Thrones',
  ],
  feature: {
    name: 'Cult Network',
    description: 'Genestealer Cult cells are scattered across every planet in some form. You can make contact with a local cell within 1d6 hours in any inhabited settlement, gaining access to safe houses, cult resources, and local intelligence. Other cultists will aid you — but the cult always expects something in return, and the Patriarch\'s will is paramount.',
  },
  special: true,
  tags: ['restricted', 'xenos-tainted', 'cult'],
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export const coreBackgrounds: Background[] = [
  // Standard
  soldier,
  adept,
  outcast,
  ganger,
  acolyte,
  voidBorn,
  mechanicumInitiate,
  noble,
  chirurgeon,
  pilgrim,
  enforcer,
  savant,
  merchant,
  penalLegionnaire,
  // Restricted (GM approval required)
  genestealerCultist,
]
