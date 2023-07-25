import { Player } from '@ps2gg/players/types'
import { User } from '@ps2gg/users/types'
import { getFriends } from '../Friends/GetFriends'
import { getPlayer } from '../Players/GetPlayer'
import { AltMatch, getAltIds } from './GetAltIds'

export async function getAltWideFriends(user: User, name: string): Promise<{ player: Player; friendIds: string[]; altWideFriendIds: string[]; alts: AltMatch[] }> {
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
  return { player, friendIds, altWideFriendIds, alts }
}
