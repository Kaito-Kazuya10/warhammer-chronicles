import SavingThrows    from './SavingThrows'
import PassiveSenses   from './PassiveSenses'
import ProficiencyPanel from './ProficiencyPanel'
import TrackerPanel    from './TrackerPanel'

interface Props {
  characterId: string
}

export default function LeftColumn({ characterId }: Props) {
  return (
    <div className="space-y-3">
      <SavingThrows     characterId={characterId} />
      <PassiveSenses    characterId={characterId} />
      <ProficiencyPanel characterId={characterId} />
      <TrackerPanel     characterId={characterId} />
    </div>
  )
}
