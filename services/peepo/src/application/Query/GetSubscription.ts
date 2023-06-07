import { PopulationClient } from '@ps2gg/population/client'
import { NotifyEmbed } from '../../domain/Embed/Notify'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'
import { GetPopulation } from './GetPopulation'

export class GetSubscription {
  _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly userId: string) {}

  async execute(): Promise<NotifyEmbed> {
    const scopes = new ScopeEntity(this.server, this.event).getCompositions()
    const population = await new GetPopulation(scopes, this.event, this.server).execute()
    const subscriptions = await this._population.getSubscriptions(this.userId, scopes[0])
    const demoSubscription = subscriptions[0]

    if (!subscriptions.length) throw new Error(`You aren't subscribed to ${this.event} on ${this.server}.`)
    return new NotifyEmbed(this.server, this.event, demoSubscription, population)
  }
}
