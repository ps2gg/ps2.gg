import { UserClient } from '@ps2gg/users/client'
import { User } from '@ps2gg/users/types'

export async function getLinkedUser(discordId: string): Promise<User> {
  const users = new UserClient()
  return users.getDiscordUser(discordId)
}
