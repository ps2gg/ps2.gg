import { User } from '@ps2gg/users/types'
import { SeshEmbed } from '../../../domain/Embed/SeshEmbed'
import { getAltWideFriends } from '../Alts/GetAltWideFriends'
import { getFriendsWithParent } from '../Friends/GetFriendsWithParents'
import { getOnlinePlayers } from '../Players/GetOnlinePlayers'
import { getBestFights } from './GetBestFights'

export async function getSesh(user: User, name: string): Promise<SeshEmbed> {
  const { player, friendIds, altWideFriendIds, alts } = await getAltWideFriends(user, name)
  const friends = await getOnlinePlayers(altWideFriendIds)
  const friendsWithParent = await getFriendsWithParent(friends, friendIds, alts)
  const fights = await getBestFights()
  return new SeshEmbed(player, fights, friendsWithParent)
}
