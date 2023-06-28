import { PlayerClient } from '@ps2gg/players/client'
import { PlayerEmbed } from '../../domain/Embed/PlayerEmbed'

export async function getPlayer(name: string): Promise<{ embed: PlayerEmbed; id: string }> {
  const players = new PlayerClient()
  const player = await players.findOneByName(name)

  if (player)
    return {
      embed: new PlayerEmbed(player),
      id: player.id,
    }

  throw new Error(`Player ${name} doesn't seem to exist on the Census API.`)
}
