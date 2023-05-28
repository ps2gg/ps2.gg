import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { getESFPopulation } from '@ps2gg/census/collections'
import { continents, servers } from '@ps2gg/common/constants'
import { capitalize } from '@ps2gg/common/util'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class ESFPopulationTask {
  private readonly _logger = new Logger()

  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/10 * * * * *')
  async handleCron(): Promise<void> {
    this._logger.log('Fetching Continent population from saerro.ps2.live')

    const all = await getESFPopulation()

    for (const serverId of Object.keys(servers)) {
      const server = all.find((p) => p.id === parseInt(serverId))

      for (const continentId of Object.keys(continents)) {
        const { vehicles } = server.zones.all.find((p) => p.id === parseInt(continentId))
        const scope = `ESF.${continentId}.${serverId}`
        const { tr, nc, vs } = {
          tr: deflate(vehicles['mosquito'].tr),
          nc: deflate(vehicles['reaver'].nc),
          vs: deflate(vehicles['scythe'].vs),
        }
        const populationSum = tr + nc + vs
        const resetReceivedState = populationSum === 0
        await this._commandBus.execute(new SetPopulation({ scope, tr, nc, vs, resetReceivedState }))
      }
    }
  }
}

function deflate(population: number): number {
  return Math.floor(population / 3)
}
