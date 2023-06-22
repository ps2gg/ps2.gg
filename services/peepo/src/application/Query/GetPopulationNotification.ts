import { PopulationClient } from '@ps2gg/population/client'
import { NotificationEmbed } from '../../domain/Embed/Notification'

export class GetPopulationNotification {
  private _population = new PopulationClient()

  constructor(readonly id: string) {}

  async execute(): Promise<NotificationEmbed> {
    const population = await this._population.getPopulation(this.id)
    return new NotificationEmbed(this.id, population)
  }
}
