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

  const playersAlts = await getAltIds(characterIds)
  const playersAltIds = playersAlts.map((alt) => alt.characterId)
  const friendLookupIds = [...playersAltIds, ...characterIds]
  const { friendIds } = await getFriends(friendLookupIds)
  const friendsAlts = await getAltIds(friendIds)
  const friendsAltIds = friendsAlts.map((alt) => alt.characterId)
  const altWideFriendIds = [...friendIds, ...friendsAltIds]
  const alts = [...playersAlts, ...friendsAlts]
  return getSesh(player, friendIds, altWideFriendIds, alts)
}
