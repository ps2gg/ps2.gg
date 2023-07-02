import { User } from '@ps2gg/users/types'
import { SeshEmbed } from '../../domain/Embed/SeshFriendsEmbed'
import { getAltIds } from './GetAltIds'
import { getFriends } from './GetFriends'
import { getOnlinePlayers } from './GetOnlinePlayer'
import { getPlayer } from './GetPlayer'

export async function getAltWideFriends(user: User, name: string, includesFriendsAlts = false): Promise<SeshEmbed> {
  let characterIds = user.characterIds?.length ? user.characterIds : []

  const player = name ? await getPlayer(name) : null

  if (player && !characterIds.includes(player.id)) characterIds = characterIds.concat(player.id)

  const altIds = await getAltIds(characterIds)
  const friendLookupIds = [...altIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const onlineLookupIds = includesFriendsAlts ? [...friendIds, ...(await getAltIds(friendIds))] : friendIds
  const friends = await getOnlinePlayers(onlineLookupIds, includesFriendsAlts)
  return friends
}
