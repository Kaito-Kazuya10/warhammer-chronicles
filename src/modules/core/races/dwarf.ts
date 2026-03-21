import type { Race } from '../../../types/module'

export const dwarf: Race = {
  id: 'dwarf',
  name: 'Dwarf',
  description: 'Stout and resilient, dwarves hail from the mountain holds of Karaz Ankor.',
  abilityScoreIncreases: { constitution: 2 },
  speed: 25,
  size: 'medium',
  traits: [
    {
      name: 'Darkvision',
      description: 'You can see in dim light within 60 feet as if it were bright light.',
    },
    {
      name: 'Dwarven Resilience',
      description: 'You have advantage on saving throws against poison and resistance against poison damage.',
    },
    {
      name: 'Stonecunning',
      description: 'Whenever you make a History check related to stonework, you are considered proficient and add double your proficiency bonus.',
    },
  ],
  languages: ['Common', 'Dwarvish'],
}
