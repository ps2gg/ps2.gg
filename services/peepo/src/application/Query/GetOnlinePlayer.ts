import { PlayerClient } from '@ps2gg/players/client'
import { SeshFriendsEmbed } from '../../domain/Embed/SeshFriendsEmbed'

export class GetOnlinePlayers {
  private _players = new PlayerClient()

  constructor(readonly ids: string[]) {}

  async execute(): Promise<SeshFriendsEmbed> {
    const friends = await this._players.getOnlineByIds(this.ids)
    return new SeshFriendsEmbed(friends)
  }
}
