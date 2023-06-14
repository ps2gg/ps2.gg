import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export class GetPlayers {
  private _players = new PlayerClient()

  constructor(readonly ids: string[]) {}

  async execute(): Promise<Player[]> {
    return this._players.getMany(this.ids)
  }
}
