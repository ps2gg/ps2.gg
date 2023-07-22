import { Player } from '@ps2gg/players/types'
import { SeshEmbed } from '../../../domain/Embed/SeshEmbed'
import { AltMatch } from '../Alts/GetAltIds'
import { getFriendsWithParent } from '../Friends/GetFriendsWithParents'
import { getOnlinePlayers } from '../Players/GetOnlinePlayers'
import { getBestFights } from './GetBestFights'

export async function getSesh(player: Player, friendIds: string[], altWideFriendIds: string[], alts: AltMatch[]): Promise<SeshEmbed> {
  const friends = await getOnlinePlayers(altWideFriendIds)
  const friendsWithParent = await getFriendsWithParent(friends, friendIds, alts)
  console.log(await getBestFights())
  return new SeshEmbed(player, friendsWithParent)
}
