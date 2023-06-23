import { UserClient } from '@ps2gg/users/client'
import { VerifiedEmbed } from '../../domain/Embed/VerifiedEmbed'

export class VerifyCharacter {
  _users = new UserClient()

  constructor(readonly characterId: string, readonly name: string, readonly discordId: string) {}

  async execute(): Promise<VerifiedEmbed> {
    await this._users.verifyCharacter(this.characterId, null, this.discordId)
    return new VerifiedEmbed(this.name)
  }
}
