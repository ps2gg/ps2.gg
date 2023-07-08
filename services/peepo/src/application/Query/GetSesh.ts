import { SeshEmbed } from '../../domain/Embed/SeshEmbed'
import { AltRelation } from './GetAltIds'
import { getOnlinePlayers } from './GetOnlinePlayers'

export async function getSesh(friendIds: string[], relations: AltRelation[], includesFriendsAlts: boolean): Promise<SeshEmbed> {
  const friends = await getOnlinePlayers(friendIds, relations)
  return new SeshEmbed(friends, includesFriendsAlts)
}
