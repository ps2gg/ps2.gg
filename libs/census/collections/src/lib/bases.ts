import { CensusQuery } from '@ps2gg/census/api'
import { createLogger } from '@ps2gg/common/logging'

const logger = createLogger('Bases')

export async function getBases(): Promise<Bases> {
  logger.info('Fetching base names and ids')
  const census = new CensusQuery('https://census.lithafalcon.cc/s:ps2gg/get/ps2:v2/')
  const bases = await census.collection('map_region').limit(2000).show('map_region_id,facility_name').get()
  const parsed = {}

  for (const base of bases.map_region_list) {
    const { map_region_id, facility_name } = base

    if (!facility_name) continue
    // @ts-ignore
    parsed[map_region_id] = facility_name
  }
  logger.info(parsed, 'Retrieved bases')

  return parsed
}

export type Bases = {
  [id: string]: string
}
