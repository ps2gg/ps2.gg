import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'
import { AltRelation } from './GetAltIds'

export async function getOnlinePlayers(ids: string[], relations?: AltRelation[]): Promise<Player[]> {
  const players = new PlayerClient()
  const onlinePlayers = await players.findManyOnline(ids)
  attachParentNames(onlinePlayers, relations)
  return onlinePlayers
}

function attachParentNames(players: Player[], relations?: AltRelation[]) {
  if (!relations) return players

  for (const player of players) {
    const parent = relations.find((r) => r.child === player.name)?.parent

    if (parent && parent !== player.name) player.name += ` (${parent})`
  }
}
