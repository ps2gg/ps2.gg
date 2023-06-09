import { PopulationClient } from '@ps2gg/population/client'

export class GetPopulation {
  private _population = new PopulationClient()

  constructor(readonly scopes: string[], readonly event: string, readonly server: string) {}

  async execute(): Promise<{ tr: number; nc: number; vs: number }> {
    const populationSum = { tr: 0, nc: 0, vs: 0 }

    for (const scope of this.scopes) {
      const population = await this._population.getPopulation(scope)

      if (!population) throw new Error(`No population data found, are you sure ${this.event} exists on ${this.server}?`)
      populationSum.nc += population.nc
      populationSum.tr += population.tr
      populationSum.vs += population.vs
    }

    return populationSum
  }
}
