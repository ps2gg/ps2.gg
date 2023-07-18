import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export async function getOnlinePlayers(ids: string[]): Promise<Player[]> {
  const players = new PlayerClient()
  const onlinePlayers = await players.findManyOnline(ids)
  attachParentNames(onlinePlayers)
  return onlinePlayers
}

function attachParentNames(players: Player[]) {}
