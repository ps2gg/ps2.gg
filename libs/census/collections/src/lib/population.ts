import { CensusQuery } from '@ps2gg/census/api'
import { getLogger } from '@ps2gg/common/logging'
import axios from 'axios'

const logger = getLogger()

export async function getBasePopulation(): Promise<CensusBasePopulation[]> {
  logger.debug('fetch base population from Sanctuary Census')
  const census = new CensusQuery('https://census.lithafalcon.cc/s:ps2gg/get/ps2:v2/')
  const mapState = await census.collection('map_state').limit(5000).show('world_id,map_region_id,faction_population_upper_bound').get()
  return mapState.map_state_list
}

export async function getContinentPopulation(): Promise<SaerroContinentPopulation[]> {
  logger.debug('fetch continent population from Saerro')
  const req = await axios.get(`https://saerro.ps2.live/graphql?query={allWorlds%20{id%20zones%20{all%20{id%20population%20{nc%20tr%20vs}}}}}`)
  const { data } = req
  return data.data?.allWorlds
}

export async function getESFPopulation(): Promise<SaerroESFPopulation[]> {
  logger.debug('fetch ESF population from Saerro')
  const req = await axios.get(
    'https://saerro.ps2.live/graphql?query={%20allWorlds%20{%20id%20zones%20{%20all%20{%20id%20vehicles%20{%20mosquito%20{%20nc%20tr%20vs%20}%20reaver%20{%20nc%20tr%20vs%20}%20scythe%20{%20nc%20tr%20vs%20}}}}}}'
  )
  const { data } = req
  return data.data?.allWorlds
}

export type CensusBasePopulation = {
  world_id: string
  map_region_id: string
  faction_population_upper_bound: {
    NC: string
    TR: string
    VS: string
  }
}

export type SaerroContinentPopulation = {
  id: number
  zones: {
    all: {
      id: number
      population: SaerroPopulation
    }[]
  }
}

export type SaerroESFPopulation = {
  id: number
  zones: {
    all: {
      id: number
      vehicles: {
        mosquito: SaerroPopulation
        reaver: SaerroPopulation
        scythe: SaerroPopulation
      }
    }[]
  }
}

export type SaerroPopulation = {
  nc: number
  tr: number
  vs: number
}
