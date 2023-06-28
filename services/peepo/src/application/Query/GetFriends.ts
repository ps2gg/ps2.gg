import { FriendsClient } from '@ps2gg/friends/client'
import { Friends } from '@ps2gg/friends/types'

export async function getFriends(id: string): Promise<Friends> {
  const friendsClient = new FriendsClient()
  return friendsClient.get(id)
}
