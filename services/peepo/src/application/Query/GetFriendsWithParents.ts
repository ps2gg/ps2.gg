import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'
import { AltMatch } from './GetAltIds'

export async function getFriendsWithParent(friends: Player[], friendIds: string[], alts: AltMatch[]): Promise<Player[]> {
  const players = new PlayerClient()
  const unknownFriends = friends.filter((friend) => !friendIds.includes(friend.id))
  const lookups = []

  for (const friend of unknownFriends) {
    const alt = alts.find((alt) => alt.characterId === friend.id)
    lookups.push(players.findOne(alt.parentId).then((parent) => (friend.name += ` (${parent.name})`)))
  }

  await Promise.all(lookups)

  return friends
}
