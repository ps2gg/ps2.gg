import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

export async function getPopulationSubscriptionIds(server: string, event: string, user: User): Promise<string[]> {
  const population = new PopulationClient()
  const ids = new PopulationEntity(server, event).getIds()
  const subscriptionIds: string[] = []

  for (const id of ids) {
    const subscriptions = await population.getSubscriptions({ userId: user.id, id })
    const subscriptionIdMap: string[] = subscriptions.map((subscription) => subscription.subscriptionId)
    subscriptionIds.push(...subscriptionIdMap)
  }

  return subscriptionIds
}
