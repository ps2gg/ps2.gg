import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { getBasePopulation, getBases } from '@ps2gg/census/collections'
import { ServerId } from '@ps2gg/census/types'
import { servers } from '@ps2gg/common/constants'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class BasePopulationTask {
  private readonly _logger = new Logger()

  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/30 * * * * *')
  async handleCron(): Promise<void> {
    this._logger.log('Fetching Base population from census.lithafalcon.cc')

    const bases = await getBases()
    const basePopulations = await getBasePopulation()

    for (const serverId of Object.keys(servers)) {
      if (serverId === '19') continue // Jaeger is not supported

      for (const baseId of Object.keys(bases)) {
        const base = basePopulations.find((p) => p.world_id === serverId && p.map_region_id === baseId)

        if (!base) continue
        const population = base.faction_population_upper_bound
        const tr = parseInt(population.TR)
        const nc = parseInt(population.NC)
        const vs = parseInt(population.VS)
        await this._commandBus.execute(new SetPopulation(serverId as ServerId, bases[baseId], tr, nc, vs))
      }
    }
  }
}
