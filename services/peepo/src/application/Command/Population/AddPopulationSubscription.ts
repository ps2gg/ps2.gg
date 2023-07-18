import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { APIEmbed } from 'discord.js'
import { NotifyEmbed } from '../../../domain/Embed/Notify'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'
import { SubscriptionEntity } from '../../../domain/Entity/SubscriptionEntity'
import { getPopulation } from '../../Query/Population/GetPopulation'

export async function addPopulationSubscription(server: string, event: string, user: User): Promise<APIEmbed> {
  const population = new PopulationClient()
  const entity = new PopulationEntity(server, event)
  const ids = entity.getIds()
  const pop = await getPopulation(ids, event, server)
  let subscriptionConfig: DynamicSubscription

  for (const id of ids) {
    const subscription = (subscriptionConfig = new SubscriptionEntity(server, id, user.id))
    population.setSubscription(subscription)
  }

  return new NotifyEmbed(server, event, subscriptionConfig, pop)
}
