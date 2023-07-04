import { PopulationClient } from '@ps2gg/population/client'
import { Population } from '@ps2gg/population/types'

export async function getFights(userId: string): Promise<Population[]> {
  const population = new PopulationClient()
  const ids = []
  const fights = await population.getSubscriptions(userId)
  return []
}
