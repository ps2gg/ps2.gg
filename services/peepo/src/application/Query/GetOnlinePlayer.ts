import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export async function getOnlinePlayers(ids: string[], includesFriendsAlts: boolean): Promise<Player[]> {
  const players = new PlayerClient()
  const friends = await players.findManyOnline(ids)
  return friends
}
