import { DynamicSubscription } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'
import { NotifyEmbed } from '../../../domain/Embed/Notify'
import { PopulationEntity } from '../../../domain/Entity/PopulationEntity'
import { getPopulation } from './GetPopulation'

export async function getSubscription(server: string, event: string, userId: string): Promise<NotifyEmbed> {
  const ids = new PopulationEntity(server, event).getIds()
  const pop = await getPopulation(ids, event, server)
  const population = new PopulationClient()
  const subscriptions = await population.getSubscriptions(userId, ids[0])
  const demoSubscription: DynamicSubscription = subscriptions[0]

  if (!subscriptions.length) throw new Error(`You aren't subscribed to ${event} on ${server}.`)
  return new NotifyEmbed(server, event, demoSubscription, pop)
}
