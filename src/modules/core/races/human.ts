import type { Race } from '../../../types/module'

export const human: Race = {
  id: 'human',
  name: 'Human',
  description: 'Versatile and ambitious, humans are the most common race in the Old World.',
  abilityScoreIncreases: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Extra Language',
      description: 'You can speak, read, and write one extra language of your choice.',
    },
  ],
  languages: ['Common'],
}
