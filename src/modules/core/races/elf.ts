import type { Race } from '../../../types/module'

export const highElf: Race = {
  id: 'elf',
  name: 'High Elf',
  description: 'Graceful and ancient, the High Elves of Ulthuan are masters of magic and war.',
  abilityScoreIncreases: { dexterity: 2, intelligence: 1 },
  speed: 30,
  size: 'medium',
  traits: [
    {
      name: 'Darkvision',
      description: 'You can see in dim light within 60 feet as if it were bright light.',
    },
    {
      name: 'Fey Ancestry',
      description: 'You have advantage on saving throws against being charmed, and magic cannot put you to sleep.',
    },
    {
      name: 'Trance',
      description: 'You do not need to sleep. You meditate deeply for 4 hours a day instead.',
    },
    {
      name: 'Cantrip',
      description: 'You know one cantrip of your choice from the wizard spell list.',
    },
  ],
  languages: ['Common', 'Elvish'],
}
