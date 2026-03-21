import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useCharacterStore } from '../../store/characterStore'
import { getAllClasses } from '../../modules/registry'
import ActionsTab    from './tabs/ActionsTab'
import InventoryTab  from './tabs/InventoryTab'
import FeaturesTab   from './tabs/FeaturesTab'
import BackgroundTab from './tabs/BackgroundTab'
import NotesTab      from './tabs/NotesTab'
import ExtrasTab     from './tabs/ExtrasTab'

// ─── Tab definitions ──────────────────────────────────────────────────────────

const STATIC_TABS = [
  { value: 'actions',    label: 'ACTIONS'    },
  { value: 'inventory',  label: 'INVENTORY'  },
  // features label resolved dynamically
  { value: 'background', label: 'BACKGROUND' },
  { value: 'notes',      label: 'NOTES'      },
  { value: 'extras',     label: 'EXTRAS'     },
] as const

// ─── ContentTabs ─────────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function ContentTabs({ characterId }: Props) {
  const character = useCharacterStore(s => s.characters.find(c => c.id === characterId))

  // Resolve dynamic features tab label
  const featuresLabel = (() => {
    if (!character?.class) return 'FEATURES & TRAITS'
    const cls = getAllClasses().find(c => c.id === character.class)
    return cls?.featureTabName?.toUpperCase() ?? 'FEATURES & TRAITS'
  })()

  return (
    <Card className="h-fit">
      <Tabs defaultValue="inventory">
        {/* Tab list — scrolls on mobile, fixed grid on md+ */}
        <TabsList
          variant="line"
          className="content-tabs-list w-full grid grid-cols-6 h-auto p-0 rounded-none border-b border-border bg-transparent"
        >
          <TabsTrigger
            value="actions"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            ACTIONS
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            INVENTORY
          </TabsTrigger>
          <TabsTrigger
            value="features"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            {featuresLabel}
          </TabsTrigger>
          <TabsTrigger
            value="background"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            BACKGROUND
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            NOTES
          </TabsTrigger>
          <TabsTrigger
            value="extras"
            className="content-tabs-trigger rounded-none text-[10px] tracking-wide uppercase py-3 data-active:text-primary"
          >
            EXTRAS
          </TabsTrigger>
        </TabsList>

        <CardContent className="pt-4">
          <TabsContent value="actions">
            <ActionsTab    characterId={characterId} />
          </TabsContent>
          <TabsContent value="inventory">
            <InventoryTab  characterId={characterId} />
          </TabsContent>
          <TabsContent value="features">
            <FeaturesTab   characterId={characterId} />
          </TabsContent>
          <TabsContent value="background">
            <BackgroundTab characterId={characterId} />
          </TabsContent>
          <TabsContent value="notes">
            <NotesTab      characterId={characterId} />
          </TabsContent>
          <TabsContent value="extras">
            <ExtrasTab     characterId={characterId} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}
