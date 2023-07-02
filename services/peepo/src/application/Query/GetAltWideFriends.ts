import { User } from '@ps2gg/users/types'
import { SeshEmbed } from '../../domain/Embed/SeshFriendsEmbed'
import { getAltIds } from './GetAltIds'
import { getFriends } from './GetFriends'
import { getOnlinePlayers } from './GetOnlinePlayer'
import { getPlayer } from './GetPlayer'

export async function getAltWideFriends(user: User, name: string, includesFriendsAlts = false): Promise<SeshEmbed> {
  let characterIds = user.characterIds?.length ? user.characterIds : []

  const player = name ? await getPlayer(name) : null
  const alreadyLinked = characterIds.includes(player.id)

  if (player && !alreadyLinked) characterIds = characterIds.concat(player.id)

  const altIds = await getAltIds(characterIds)
  const friendLookupIds = [...altIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const friendAltIds = includesFriendsAlts ? await getAltIds(friendIds) : []
  const onlineLookupIds = [...friendIds, ...friendAltIds]
  const friends = await getOnlinePlayers(onlineLookupIds, includesFriendsAlts)
  return friends
}
