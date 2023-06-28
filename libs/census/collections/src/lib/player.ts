import { HttpException, HttpStatus } from '@nestjs/common'
import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

function getBaseQuery() {
  return new CensusQuery().collection('character').resolve('outfit')
}

export async function getPlayer(id: string): Promise<CensusPlayer> {
  logger.debug({ id }, 'fetch player from Census')
  const query = getBaseQuery().where('character_id').equals(id)
  const res = await query.get()

  if (!res.character_list?.length) throw new PlayerDoesNotExistException(id)

  const player = res.character_list[0]
  const name = player.name.first
  const factionId = player.faction_id
  const outfitTag = player.outfit?.alias
  return { id, name, factionId, outfitTag }
}

export async function getPlayerByName(name: string): Promise<CensusPlayer> {
  logger.debug({ name }, 'fetch player from Census')
  const query = getBaseQuery().where('name.first_lower').equals(name.toLowerCase())
  const res = await query.get()

  if (!res.character_list?.length) throw new PlayerDoesNotExistException(name)

  const player = res.character_list[0]
  const id = player.character_id
  const nameActual = player.name.first
  const factionId = player.faction_id
  const outfitTag = player.outfit?.alias
  return { id, name: nameActual, factionId, outfitTag }
}

export class PlayerDoesNotExistException extends HttpException {
  constructor(id: string) {
    super(`${id} does not exist on the Census API`, HttpStatus.NOT_FOUND)
  }
}

export type CensusPlayer = {
  id?: string
  name?: string
  factionId: string
  outfitTag?: string
}
