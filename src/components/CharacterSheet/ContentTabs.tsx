import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useCharacterStore } from '../../store/characterStore'
import { getAllClasses } from '../../modules/registry'
import ActionsTab    from './tabs/ActionsTab'
import InventoryTab  from './tabs/InventoryTab'
import FeaturesTab   from './tabs/FeaturesTab'
import LoadoutTab    from './tabs/LoadoutTab'
import PrayersTab          from './tabs/PrayersTab'
import GeneModTab          from './tabs/GeneModTab'
import WarpDisciplinesTab  from './tabs/WarpDisciplinesTab'
import BackgroundTab       from './tabs/BackgroundTab'
import NotesTab      from './tabs/NotesTab'
import ExtrasTab     from './tabs/ExtrasTab'

// Classes that use the loadout system instead of FeaturesTab
const LOADOUT_CLASSES = new Set(['augmenticist'])
// Classes that use the prayer system instead of FeaturesTab
const PRAYER_CLASSES  = new Set(['zealot'])
// Classes that use the gene modification system instead of FeaturesTab
const GENE_MOD_CLASSES = new Set(['gene-fighter'])
// Classes that use the warp disciplines system instead of FeaturesTab
const WARP_CLASSES = new Set(['psyker'])

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

  const usesLoadout  = character?.class ? LOADOUT_CLASSES.has(character.class) : false
  const usesPrayers  = character?.class ? PRAYER_CLASSES.has(character.class) : false
  const usesGeneMods = character?.class ? GENE_MOD_CLASSES.has(character.class) : false
  const usesWarp     = character?.class ? WARP_CLASSES.has(character.class) : false

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
            {usesLoadout
              ? <LoadoutTab           characterId={characterId} />
              : usesPrayers
                ? <PrayersTab         characterId={characterId} />
                : usesGeneMods
                  ? <GeneModTab       characterId={characterId} />
                  : usesWarp
                    ? <WarpDisciplinesTab characterId={characterId} />
                    : <FeaturesTab    characterId={characterId} />
            }
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
