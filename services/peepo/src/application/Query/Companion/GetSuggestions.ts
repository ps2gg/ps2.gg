import { User } from '@ps2gg/users/types'
import { CompanionEmbed } from '../../../domain/Embed/Companion/CompanionEmbed'
import { getAltWideFriends } from '../Alts/GetAltWideFriends'
import { getFriendsWithParent } from '../Friends/GetFriendsWithParents'
import { getOnlinePlayers } from '../Players/GetOnlinePlayers'
import { getBestFights } from './GetBestFights'

export async function getSuggestions(user: User, name: string): Promise<CompanionEmbed> {
  const { player, friendIds, altWideFriendIds, alts } = await getAltWideFriends(user, name)
  const friends = await getOnlinePlayers(altWideFriendIds)
  const friendsWithParent = await getFriendsWithParent(friends, friendIds, alts)
  const fights = await getBestFights()
  return new CompanionEmbed(player, fights, friendsWithParent)
}
