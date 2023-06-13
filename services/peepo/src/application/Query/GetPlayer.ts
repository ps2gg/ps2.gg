import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'

export class GetPlayer {
  private _players = new PlayerClient()

  constructor(readonly name: string) {}

  async execute(): Promise<Player> {
    const player = await this._players.getByName(this.name)

    // TODO: populate player if not already done
    if (!player) throw new Error(`${this.name} not yet recorded`)

    return player
  }
}
