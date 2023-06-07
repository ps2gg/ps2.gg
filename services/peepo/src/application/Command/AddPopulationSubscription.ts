import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { APIEmbed } from 'discord.js'
import { NotifyEmbed } from '../../domain/Embed/Notify'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'
import { SubscriptionEntity } from '../../domain/Entity/SubscriptionEntity'
import { GetPopulation } from '../Query/GetPopulation'

export class AddPopulationSubscription {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {}

  async execute(): Promise<APIEmbed> {
    const scope = new ScopeEntity(this.server, this.event)
    const compositeScopes = scope.getCompositions()
    const population = await new GetPopulation(compositeScopes, this.event, this.server).execute()
    let subscriptionConfig: DynamicSubscription

    for (const scope of compositeScopes) {
      const subscription = (subscriptionConfig = new SubscriptionEntity(this.server, scope, this.user.id))
      this._population.setSubscription(subscription)
    }

    return new NotifyEmbed(this.server, this.event, subscriptionConfig, population)
  }
}
