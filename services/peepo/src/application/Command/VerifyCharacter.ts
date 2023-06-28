import { UserClient } from '@ps2gg/users/client'
import { VerifySuccessEmbed } from '../../domain/Embed/VerifySuccessEmbed'

export class VerifyCharacter {
  _users = new UserClient()

  constructor(readonly characterId: string, readonly name: string, readonly discordId: string) {}

  async execute(): Promise<VerifySuccessEmbed> {
    await this._users.verifyCharacter(this.characterId, null, this.discordId)
    return new VerifySuccessEmbed(this.name)
  }
}
