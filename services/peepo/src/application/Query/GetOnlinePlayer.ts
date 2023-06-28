import { PlayerClient } from '@ps2gg/players/client'
import { SeshFriendsEmbed } from '../../domain/Embed/SeshFriendsEmbed'

export async function getOnlinePlayers(ids: string[]): Promise<SeshFriendsEmbed> {
  const players = new PlayerClient()
  const friends = await players.findManyOnline(ids)
  return new SeshFriendsEmbed(friends)
}
