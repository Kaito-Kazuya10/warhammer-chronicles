import { useDiceStore, type CampaignRoll } from '@/store/diceStore'
import { useSessionStore } from '@/store/sessionStore'
import type { CampaignChannelHandlers } from './campaignChannel'

function rowToSession(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    campaignId: row.campaign_id as string,
    title: row.title as string | null,
    status: row.status as 'active' | 'ended' | 'archived',
    startedAt: row.started_at as string,
    endedAt: row.ended_at as string | null,
    sharedSummary: row.shared_summary as string | null,
    dmNotes: row.dm_notes as string | null,
  }
}

export function createCampaignHandlers(
  characterNameMap: Map<string, string>,
): CampaignChannelHandlers {
  return {
    onRollInsert: (row) => {
      const roll: CampaignRoll = {
        id: row.id as string,
        campaignId: row.campaign_id as string,
        sessionId: row.session_id as string | null,
        characterId: row.character_id as string | null,
        userId: row.user_id as string,
        label: row.label as string,
        rollType: row.roll_type as string,
        diceExpression: row.dice_expression as string,
        rolls: row.rolls as number[],
        modifier: row.modifier as number,
        total: row.total as number,
        isNat20: row.is_nat20 as boolean,
        isNat1: row.is_nat1 as boolean,
        createdAt: row.created_at as string,
        characterName: row.character_id
          ? characterNameMap.get(row.character_id as string)
          : undefined,
      }
      useDiceStore.getState().appendCampaignRoll(roll)
    },

    onSessionChange: (row) => {
      const session = rowToSession(row)
      if (session.status === 'active') {
        useSessionStore.getState().setActiveSession(session)
      } else {
        useSessionStore.getState().setActiveSession(null)
      }
    },
  }
}
