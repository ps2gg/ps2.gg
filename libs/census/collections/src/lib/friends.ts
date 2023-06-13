import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

export async function getFriendIds(character_id: string): Promise<string[]> {
  logger.info({ character_id }, 'Fetching friend ids')

  const census = new CensusQuery()
  const res = await census.collection('characters_friend').where('character_id').equals(character_id).get()
  const character = res.characters_friend_list?.[0]

  if (!character) throw new CharacterNotFoundException(character_id)
  if (!character.friend_list) character.friend_list = []

  const friendIds = character.friend_list.map((f) => f.character_id)
  return friendIds
}

export class CharacterNotFoundException extends Error {
  constructor(character_id: string) {
    super(`Character not found. (character_id: ${character_id})`)
  }
}

export class NoFriendsException extends Error {
  constructor(character_id: string) {
    super(`No friends found. (character_id: ${character_id})`)
  }
}
