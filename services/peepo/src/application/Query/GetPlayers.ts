import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export class GetPlayers {
  private _players = new PlayerClient()

  constructor(readonly ids: string[]) {}

  async execute(): Promise<Player[]> {
    return await this._players.getByIds(this.ids)
  }
}
