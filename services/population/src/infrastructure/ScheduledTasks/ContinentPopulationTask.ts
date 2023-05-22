import { Injectable, Logger } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { getContinentPopulation } from '@ps2gg/census/collections'
import { continents, servers } from '@ps2gg/common/constants'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class ContinentPopulationTask {
  private readonly _logger = new Logger()

  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/10 * * * * *')
  async handleCron(): Promise<void> {
    this._logger.log('Fetching Continent population from saerro.ps2.live')

    const all = await getContinentPopulation()

    for (const serverId of Object.keys(servers)) {
      const server = all.find((p) => p.id === parseInt(serverId))

      for (const continentId of Object.keys(continents)) {
        const { population } = server.zones.all.find((p) => p.id === parseInt(continentId))
        const scope = `${continents[continentId]}.${servers[serverId]}`
        const { tr, nc, vs } = population
        const populationSum = tr + nc + vs
        const resetReceivedState = populationSum === 0
        await this._commandBus.execute(new SetPopulation({ scope, tr, nc, vs, resetReceivedState }))
      }
    }
  }
}
