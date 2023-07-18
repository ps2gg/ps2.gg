import { User } from '@ps2gg/users/types'
import { FriendsEmbed } from '../../../domain/Embed/FriendsEmbed'
import { getAltIds } from '../Alts/GetAltIds'
import { getOnlinePlayers } from '../Players/GetOnlinePlayers'
import { getPlayer } from '../Players/GetPlayer'
import { getFriends } from './GetFriends'
import { getFriendsWithParent } from './GetFriendsWithParents'

export async function getAltWideFriends(user: User, name: string): Promise<FriendsEmbed> {
  let characterIds = user.characterIds?.length ? user.characterIds : []

  const player = name ? await getPlayer(name) : null

  if (player && !characterIds.includes(player.id)) characterIds = characterIds.concat(player.id)

  const playersAlts = await getAltIds(characterIds)
  const playersAltIds = playersAlts.map((alt) => alt.characterId)
  const friendLookupIds = [...playersAltIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const friendsAlts = await getAltIds(friendIds)
  const friendsAltIds = friendsAlts.map((alt) => alt.characterId)
  const altWideFriendIds = [...friendIds, ...friendsAltIds]
  const alts = [...playersAlts, ...friendsAlts]
  const friends = await getOnlinePlayers(altWideFriendIds)
  const friendsWithParent = await getFriendsWithParent(friends, friendIds, alts)
  return new FriendsEmbed(friendsWithParent)
}
