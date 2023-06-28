import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export async function getPlayers(ids: string[]): Promise<Player[]> {
  const players = new PlayerClient()
  return players.findMany(ids)
}
