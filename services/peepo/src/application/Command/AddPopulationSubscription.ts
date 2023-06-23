import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { APIEmbed } from 'discord.js'
import { NotifyEmbed } from '../../domain/Embed/Notify'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { SubscriptionEntity } from '../../domain/Entity/SubscriptionEntity'
import { GetPopulation } from '../Query/GetPopulation'

export class AddPopulationSubscription {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {}

  async execute(): Promise<APIEmbed> {
    const entity = new PopulationEntity(this.server, this.event)
    const ids = entity.getIds()
    const population = await new GetPopulation(ids, this.event, this.server).execute()
    let subscriptionConfig: DynamicSubscription

    for (const id of ids) {
      const subscription = (subscriptionConfig = new SubscriptionEntity(this.server, id, this.user.id))
      this._population.setSubscription(subscription)
    }

    return new NotifyEmbed(this.server, this.event, subscriptionConfig, population)
  }
}
