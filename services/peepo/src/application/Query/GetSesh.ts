import { Player } from '@ps2gg/players/types'
import { SeshEmbed } from '../../domain/Embed/SeshEmbed'
import { AltRelation } from './GetAltIds'
import { getOnlinePlayers } from './GetOnlinePlayers'

export async function getSesh(friendIds: string[], relations: AltRelation[], player: Player): Promise<SeshEmbed> {
  const friends = await getOnlinePlayers(friendIds, relations)
  return new SeshEmbed(friends, player)
}
