import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'
import { AltMatch } from './GetAltIds'

export async function getFriendsWithParent(friends: Player[], friendIds: string[], alts: AltMatch[]): Promise<Player[]> {
  const unknownFriends = friends.filter((friend) => !friendIds.includes(friend.id))
  const lookupIds: string[] = []

  for (const friend of unknownFriends) {
    const alt = alts.find((alt) => alt.characterId === friend.id)
    lookupIds.push(alt.parentId)
  }

  const players = new PlayerClient()
  const parents = await players.findMany(lookupIds)

  for (const parent of parents) {
    const alt = alts.find((alt) => alt.parentId === parent.id)
    const friend = friends.find((friend) => friend.id === alt.characterId)
    friend.name += ` (${parent.name})`
  }

  return friends
}
