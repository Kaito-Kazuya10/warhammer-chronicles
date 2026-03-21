import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible'
import { useCharacterStore } from '../../store/characterStore'
import { getAllClasses, getAllBackgrounds } from '../../modules/registry'

// ─── Collapsible section ──────────────────────────────────────────────────────

function ProfSection({
  label,
  items,
  defaultOpen = true,
}: {
  label: string
  items: string[]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 text-left focus:outline-none group">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          {label}
        </span>
        <span
          className="text-muted-foreground text-xs transition-transform duration-200"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
          aria-hidden="true"
        >
          ▶
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="pb-2 pt-0.5">
          {items.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {items.map(item => (
                <Badge key={item} variant="outline" className="text-[10px] h-4 px-1.5">
                  {item}
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground italic">None</span>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// ─── ProficiencyPanel ─────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function ProficiencyPanel({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))

  if (!character) return null

  const allClasses     = getAllClasses()
  const allBackgrounds = getAllBackgrounds()
  const cls = allClasses.find(c => c.id === character.class)
  const bg  = allBackgrounds.find(b => b.id === character.background)

  const armor   = cls?.armorProficiencies  ?? []
  const weapons = cls?.weaponProficiencies ?? []
  const tools   = [
    ...(cls?.toolProficiencies ?? []),
    ...(bg?.toolProficiencies  ?? []),
  ]
  const languages = character.languages

  return (
    <Card>
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
          Proficiencies &amp; Languages
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-0 divide-y divide-border">
        <ProfSection label="Armor"     items={armor}     defaultOpen />
        <ProfSection label="Weapons"   items={weapons}   defaultOpen />
        <ProfSection label="Tools"     items={tools}     defaultOpen={false} />
        <ProfSection label="Languages" items={languages} defaultOpen={false} />
      </CardContent>
    </Card>
  )
}
