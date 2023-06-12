import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger('Player')

export async function getPlayer(id: string): Promise<CensusPlayer> {
  logger.info({ id }, 'Fetching player from Census')
  const census = new CensusQuery()
  const res = await census.collection('character').where('character_id').equals(id).show('name').get()

  if (!res.character_list.length) throw new PlayerDoesNotExistException(id)

  const player = res.character_list[0]
  const name = player.name.first
  return { name }
}

export class PlayerDoesNotExistException extends Error {
  constructor(id: string) {
    super(`Player ${id} does not exist`)
  }
}

export type CensusPlayer = {
  name: string
}
