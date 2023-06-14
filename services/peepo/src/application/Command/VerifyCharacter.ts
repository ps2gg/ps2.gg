import { PlayerClient } from '@ps2gg/players/client'
import { UserClient } from '@ps2gg/users/client'

export class VerifyCharacter {
  private _users = new UserClient()
  private _players = new PlayerClient()

  constructor(readonly userId: string, readonly name: string) {}

  async execute(): Promise<boolean> {
    const player = await this._players.getByName(this.name)

    if (!player) throw new Error(`${this.name} doesn't exist.`)

    const isVerified = await this._users.verifyCharacter(this.userId, player.id)
    console.log(isVerified)
    return !!isVerified
  }
}
