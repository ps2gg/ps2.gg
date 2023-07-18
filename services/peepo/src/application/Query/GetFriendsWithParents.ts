import { PlayerClient } from '@ps2gg/players/client'
import { Player } from '@ps2gg/players/types'
import { AltMatch } from './GetAltIds'

export async function getFriendsWithParent(friends: Player[], friendIds: string[], alts: AltMatch[]): Promise<Player[]> {
  const players = new PlayerClient()
  const unknownFriends = friends.filter((friend) => !friendIds.includes(friend.id))
  const lookupIds: string[] = []

  for (const friend of unknownFriends) {
    const alt = alts.find((alt) => alt.characterId === friend.id)
    lookupIds.push(alt.parentId)
  }

  const parents = await players.findMany(lookupIds)

  for (const friend of unknownFriends) {
    const alt = alts.find((alt) => alt.characterId === friend.id)
    const parent = parents.find((parent) => parent.id === alt.parentId)
    friend.name += ` (${parent.name})`
  }

  return friends
}
