import { User } from '@ps2gg/users/types'
import { SeshEmbed } from '../../domain/Embed/SeshEmbed'
import { getAltIds } from './GetAltIds'
import { getFriends } from './GetFriends'
import { getPlayer } from './GetPlayer'
import { getSesh } from './GetSesh'

export async function getAltWideSesh(user: User, name: string): Promise<SeshEmbed> {
  let characterIds = user.characterIds?.length ? user.characterIds : []

  const player = name ? await getPlayer(name) : null

  if (player && !characterIds.includes(player.id)) characterIds = characterIds.concat(player.id)

  const { altIds } = await getAltIds(characterIds)
  const friendLookupIds = [...altIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const { altIds: friendAltIds, relations } = await getAltIds(friendIds)
  const onlineLookupIds = [...friendIds, ...friendAltIds]
  const friends = await getSesh(onlineLookupIds, relations, player)
  return friends
}
