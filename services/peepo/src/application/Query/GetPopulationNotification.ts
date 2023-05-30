import { PopulationClient } from '@ps2gg/population/client'
import { NotificationEmbed } from '../../domain/Embed/NotificationEmbed'

export class GetPopulationNotification {
  private _population = new PopulationClient()

  constructor(readonly scope: string) {}

  async execute(): Promise<NotificationEmbed> {
    const population = await this._population.getPopulation(this.scope)
    return new NotificationEmbed(this.scope, population)
  }
}
