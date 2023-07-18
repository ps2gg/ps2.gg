import { PopulationClient } from '@ps2gg/population/client'

export async function getPopulation(ids: string[], event: string, server: string): Promise<{ tr: number; nc: number; vs: number }> {
  const population = new PopulationClient()
  const populationSum = { tr: 0, nc: 0, vs: 0 }

  for (const id of ids) {
    const pop = await population.getPopulation(id)

    if (!pop) throw new Error(`No population data found, are you sure ${event} exists on ${server}?`)
    populationSum.nc += pop.nc
    populationSum.tr += pop.tr
    populationSum.vs += pop.vs
  }

  return populationSum
}
