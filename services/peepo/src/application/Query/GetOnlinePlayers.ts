import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export function getOnlinePlayers(ids: string[]): Promise<Player[]> {
  const players = new PlayerClient()
  return players.findManyOnline(ids)
}
