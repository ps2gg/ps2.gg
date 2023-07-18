import { Player } from '@ps2gg/players/types'
import { SeshEmbed } from '../../../domain/Embed/SeshEmbed'
import { AltMatch } from '../Alts/GetAltIds'
import { getFriendsWithParent } from '../Friends/GetFriendsWithParents'
import { getOnlinePlayers } from '../Players/GetOnlinePlayers'

export async function getSesh(player: Player, friendIds: string[], altWideFriendIds: string[], alts: AltMatch[]): Promise<SeshEmbed> {
  const friends = await getOnlinePlayers(altWideFriendIds)
  const friendsWithParent = await getFriendsWithParent(friends, friendIds, alts)
  return new SeshEmbed(player, friendsWithParent)
}
