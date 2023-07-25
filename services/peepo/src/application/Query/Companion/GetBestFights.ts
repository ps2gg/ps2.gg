import { PopulationClient } from '@ps2gg/population/client'
import { Population } from '@ps2gg/population/types'

export async function getBestFights(): Promise<Population[]> {
  const population = new PopulationClient()
  const fights = await population.getBestFights()
  return fights.slice(0, 8)
}
