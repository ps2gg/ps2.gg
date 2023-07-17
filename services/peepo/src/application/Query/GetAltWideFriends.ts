import { User } from '@ps2gg/users/types'
import { FriendsEmbed } from '../../domain/Embed/FriendsEmbed'
import { getAltIds } from './GetAltIds'
import { getFriends } from './GetFriends'
import { getOnlinePlayers } from './GetOnlinePlayers'
import { getPlayer } from './GetPlayer'

export async function getAltWideFriends(user: User, name: string): Promise<FriendsEmbed> {
  let characterIds = user.characterIds?.length ? user.characterIds : []

  const player = name ? await getPlayer(name) : null

  if (player && !characterIds.includes(player.id)) characterIds = characterIds.concat(player.id)

  const { altIds } = await getAltIds(characterIds)
  const friendLookupIds = [...altIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const { altIds: friendAltIds, relations } = await getAltIds(friendIds)
  const onlineLookupIds = [...friendIds, ...friendAltIds]
  const friends = await getOnlinePlayers(onlineLookupIds, relations)
  return new FriendsEmbed(friends)
}
