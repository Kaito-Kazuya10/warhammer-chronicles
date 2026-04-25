import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCharacterStore, getModifier } from '../../store/characterStore'

// ─── Sense Row ────────────────────────────────────────────────────────────────

function SenseRow({ value, line1, line2 }: { value: number; line1: string; line2: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-2xl font-bold text-foreground tabular-nums w-9 text-center flex-shrink-0">
        {value}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-medium">
          {line1}
        </span>
        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.15em] font-medium">
          {line2}
        </span>
      </div>
    </div>
  )
}

// ─── PassiveSenses ────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function PassiveSenses({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))

  if (!character) return null

  const wisMod = getModifier(character.abilityScores.wisdom)
  const intMod = getModifier(character.abilityScores.intelligence)
  const prof    = character.proficiencyBonus

  const passPerc = 10 + wisMod + (character.skills.perception    ? prof : 0)
  const passInv  = 10 + intMod + (character.skills.investigation ? prof : 0)
  const passIns  = 10 + wisMod + (character.skills.insight       ? prof : 0)

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-sm font-bold tracking-widest uppercase text-muted-foreground">
          Passive Senses
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-1">
        <SenseRow value={passPerc} line1="PASSIVE" line2="PERCEPTION" />
        <Separator />
        <SenseRow value={passInv}  line1="PASSIVE" line2="INVESTIGATION" />
        <Separator />
        <SenseRow value={passIns}  line1="PASSIVE" line2="INSIGHT" />
      </CardContent>
    </Card>
  )
}
