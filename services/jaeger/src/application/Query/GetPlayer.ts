import { PlayerClient } from '@ps2gg/players/client'
import { PlayerEmbed } from '../../domain/Embed/PlayerEmbed'

export class GetPlayer {
  _players = new PlayerClient()

  constructor(readonly name: string) {}

  async execute(): Promise<{ embed: PlayerEmbed; id: string }> {
    const player = await this._players.findOneByName(this.name)

    if (player)
      return {
        embed: new PlayerEmbed(player),
        id: player.id,
      }

    throw new Error(`Player ${this.name} doesn't seem to exist on the Census API.`)
  }
}
