import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export async function getPlayer(name: string, refresh?: boolean): Promise<Player> {
  const players = new PlayerClient()
  const player = await players.findOneByName(name, refresh)

  if (!player) throw new Error(`${name} doesn't exist.`)

  return player
}
