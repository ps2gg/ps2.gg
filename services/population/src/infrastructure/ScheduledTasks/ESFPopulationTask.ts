import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Cron } from '@nestjs/schedule'
import { SaerroESFPopulation, getESFPopulation } from '@ps2gg/census/collections'
import { continents, servers } from '@ps2gg/common/constants'
import { SetPopulation } from '../../application/Command/SetPopulation'

@Injectable()
export class ESFPopulationTask {
  constructor(private readonly _commandBus: CommandBus) {}

  @Cron('*/10 * * * * *')
  async handleCron(): Promise<void> {
    const all = await getESFPopulation()

    for (const serverId of Object.keys(servers)) {
      this.populateServer(serverId, all)
    }
  }

  populateServer(serverId: string, all: SaerroESFPopulation[]): void {
    const server = all.find((p) => p.id === parseInt(serverId))

    for (const continentId of Object.keys(continents)) {
      this.populateContinent(continentId, server, serverId)
    }
  }

  async populateContinent(continentId: string, server: SaerroESFPopulation, serverId: string): Promise<void> {
    const { vehicles } = server.zones.all.find((p) => p.id === parseInt(continentId))
    const id = `ESF.${continentId}.${serverId}`
    const { tr, nc, vs } = {
      tr: this.deflate(vehicles['mosquito'].tr),
      nc: this.deflate(vehicles['reaver'].nc),
      vs: this.deflate(vehicles['scythe'].vs),
    }
    const populationSum = tr + nc + vs
    const __resetSubscriptions = populationSum === 0
    await this._commandBus.execute(new SetPopulation({ id, tr, nc, vs, __resetSubscriptions }))
  }

  deflate(population: number): number {
    return Math.floor(population / 2)
  }
}
