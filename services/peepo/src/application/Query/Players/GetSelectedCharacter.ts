import { Player } from '@ps2gg/players/types'
import { VerifyPlayerEmbed } from '../../../domain/Embed/Verification/VerifyPlayerEmbed'
import { getPlayer } from './GetPlayer'

export async function getSelectedCharacter(name: string, player?: Player, refresh?: boolean): Promise<{ embed: VerifyPlayerEmbed; id: string }> {
  player = player || (await getPlayer(name, refresh))

  if (player) {
    return {
      embed: new VerifyPlayerEmbed(player),
      id: player.id,
    }
  }

  throw new Error(`Player ${name} doesn't seem to exist on the Census API.`)
}
