import { PlayerClient } from '@ps2gg/players/client'
import { SeshEmbed } from '../../domain/Embed/SeshEmbed'

export async function getOnlinePlayers(ids: string[], includesFriendsAlts: boolean): Promise<SeshEmbed> {
  const players = new PlayerClient()
  const friends = await players.findManyOnline(ids)
  return new SeshEmbed(friends, includesFriendsAlts)
}
