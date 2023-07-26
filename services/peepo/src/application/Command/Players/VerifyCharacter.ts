import { UserClient } from '@ps2gg/users/client'
import { VerifySuccessEmbed } from '../../../domain/Embed/Verification/VerifySuccessEmbed'

export async function verifyCharacter(characterId: string, name: string, discordId: string): Promise<VerifySuccessEmbed> {
  const users = new UserClient()
  await users.verifyCharacter(characterId, null, discordId)
  return new VerifySuccessEmbed(name)
}
