import { useState } from 'react'
import TopStatBar from './TopStatBar'
import LeftColumn from './LeftColumn'
import SkillList from './SkillList'
import ContentTabs from './ContentTabs'
import RollToast from './RollToast'
import RollHistoryPanel from './RollHistoryPanel'
import RollContextMenu from './RollContextMenu'
import LevelUpFlow from './LevelUp/LevelUpFlow'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'
import './sheet.css'

// ─── CharacterSheet ───────────────────────────────────────────────────────────

interface Props {
  characterId: string
}

export default function CharacterSheet({ characterId }: Props) {
  const [showLevelUp, setShowLevelUp] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 space-y-4">
      {/* Floating roll toast — shows on every new roll */}
      <RollToast />

      {/* Right-click roll context menu (advantage / disadvantage) */}
      <RollContextMenu />

      {/* Slide-out roll history panel */}
      <RollHistoryPanel />

      {/* Level Up side panel */}
      <Sheet open={showLevelUp} onOpenChange={setShowLevelUp}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full p-0"
          style={{ maxWidth: 600 }}
        >
          <LevelUpFlow
            characterId={characterId}
            onClose={() => setShowLevelUp(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Top stat bar (includes identity header) */}
      <TopStatBar characterId={characterId} onLevelUp={() => setShowLevelUp(true)} />

      {/*
        Responsive three-section layout:
        Mobile (<md):  single column — Skills first, then LeftColumn, then Tabs
        Tablet (md):   two columns — [LeftColumn+SkillList stacked | ContentTabs]
        Desktop (lg):  three columns — [LeftColumn | SkillList | ContentTabs]
      */}
      <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] lg:grid-cols-[220px_260px_1fr] gap-4 items-start">

        {/* SkillList: order-1 on mobile, col-1 row-2 on tablet, col-2 on desktop */}
        <div className="order-1 md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1">
          <SkillList characterId={characterId} />
        </div>

        {/* LeftColumn: order-2 on mobile, col-1 row-1 on tablet, col-1 on desktop */}
        <div className="order-2 md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1">
          <LeftColumn characterId={characterId} />
        </div>

        {/* ContentTabs: order-3 on mobile, col-2 spanning rows on tablet, col-3 on desktop */}
        <div className="order-3 md:col-start-2 md:row-start-1 md:row-span-2 lg:col-start-3 lg:row-span-1">
          <ContentTabs characterId={characterId} />
        </div>
      </div>
    </div>
  )
}
