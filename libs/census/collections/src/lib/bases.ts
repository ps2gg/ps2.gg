import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

export async function getBases(): Promise<Bases> {
  logger.info('Fetching base names and ids from Sanctuary Census')
  const census = new CensusQuery('https://census.lithafalcon.cc/s:ps2gg/get/ps2:v2/')
  const bases = await census.collection('map_region').limit(2000).show('map_region_id,facility_name').get()
  const parsed: any = {}

  for (const base of bases.map_region_list) {
    const { map_region_id, facility_name } = base

    if (!facility_name) continue
    parsed[map_region_id] = facility_name
  }
  logger.info(parsed, 'Retrieved bases')
  return parsed
}

export type Bases = {
  [id: string]: string
}
