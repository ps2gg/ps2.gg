import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { getESFPopulation } from '@ps2gg/census/collections'
import { continents, servers } from '@ps2gg/common/constants'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class ESFPopulationTask {
  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/10 * * * * *')
  async handleCron(): Promise<void> {
    const all = await getESFPopulation()

    for (const serverId of Object.keys(servers)) {
      const server = all.find((p) => p.id === parseInt(serverId))

      for (const continentId of Object.keys(continents)) {
        const { vehicles } = server.zones.all.find((p) => p.id === parseInt(continentId))
        const id = `ESF.${continentId}.${serverId}`
        const { tr, nc, vs } = {
          tr: deflate(vehicles['mosquito'].tr),
          nc: deflate(vehicles['reaver'].nc),
          vs: deflate(vehicles['scythe'].vs),
        }
        const populationSum = tr + nc + vs
        const __resetSubscriptions = populationSum === 0
        await this._commandBus.execute(new SetPopulation({ id, tr, nc, vs, __resetSubscriptions }))
      }
    }
  }
}

function deflate(population: number): number {
  return Math.floor(population / 2)
}
