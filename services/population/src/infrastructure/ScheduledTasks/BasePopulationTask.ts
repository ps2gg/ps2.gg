import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { getBasePopulation } from '@ps2gg/census/collections'
import { bases, servers } from '@ps2gg/common/constants'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class BasePopulationTask {
  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/30 * * * * *')
  async handleCron(): Promise<void> {
    const basePopulations = await getBasePopulation()

    for (const serverId of Object.keys(servers)) {
      if (serverId === '19') continue // Jaeger is not supported

      for (const baseId of Object.keys(bases)) {
        const base = basePopulations.find((p) => p.world_id === serverId && p.map_region_id === baseId)

        if (!base) continue
        const maxPopulation = base.faction_population_upper_bound
        const populationPercentages = base.faction_population_percentage
        const id = `${baseId}.${serverId}`
        const population = {
          tr: parseInt(maxPopulation.TR) || 0,
          nc: parseInt(maxPopulation.NC) || 0,
          vs: parseInt(maxPopulation.VS) || 0,
        }
        const percentages = {
          tr: parseInt(populationPercentages.TR) || 0,
          nc: parseInt(populationPercentages.NC) || 0,
          vs: parseInt(populationPercentages.VS) || 0,
        }
        const populationSum = population.tr + population.nc + population.vs
        const __resetSubscriptions = populationSum === 0
        await this._commandBus.execute(new SetPopulation({ id, __resetSubscriptions, ...population }, percentages))
      }
    }
  }
}
