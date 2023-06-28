import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

export async function getFriendIds(character_id: string): Promise<string[]> {
  logger.debug({ character_id }, 'Fetching friend ids')

  const census = new CensusQuery()
  const res = await census.collection('character').where('character_id').equals(character_id).resolve('friends').get()

  if (!res.character_list || !res.character_list[0]) {
    logger.error({ res }, 'Could not fetch friends from Census API')
    throw new CharacterNotFoundException(character_id)
  }
  const character = res.character_list[0]

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
