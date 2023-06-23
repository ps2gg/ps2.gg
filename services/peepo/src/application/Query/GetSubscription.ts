import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { NotifyEmbed } from '../../domain/Embed/Notify'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { GetPopulation } from './GetPopulation'

export class GetSubscription {
  _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly userId: string) {}

  async execute(): Promise<NotifyEmbed> {
    const ids = new PopulationEntity(this.server, this.event).getIds()
    const population = await new GetPopulation(ids, this.event, this.server).execute()
    const subscriptions = await this._population.getSubscriptions({ userId: this.userId, id: ids[0] })
    const demoSubscription: DynamicSubscription = subscriptions[0]

    if (!subscriptions.length) throw new Error(`You aren't subscribed to ${this.event} on ${this.server}.`)
    return new NotifyEmbed(this.server, this.event, demoSubscription, population)
  }
}
