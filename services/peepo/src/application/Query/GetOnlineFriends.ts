import { PlayerClient } from '@ps2gg/players/client'
import { FriendsEmbed } from '../../domain/Embed/FriendsEmbed'

export async function getOnlineFriends(ids: string[]): Promise<FriendsEmbed> {
  const players = new PlayerClient()
  const friends = await players.findManyOnline(ids)
  return new FriendsEmbed(friends)
}
