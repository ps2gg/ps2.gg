import { SeshEmbed } from '../../domain/Embed/SeshEmbed'
import { getOnlinePlayers } from './GetOnlinePlayers'

export async function getSesh(friendIds: string[], includesFriendsAlts: boolean): Promise<SeshEmbed> {
  const friends = await getOnlinePlayers(friendIds)
  return new SeshEmbed(friends, includesFriendsAlts)
}
