import { DynamicSubscription, SubscriptionConfiguration } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'

export async function modifyPopulationSubscription(subscriptionId: string, configuration?: SubscriptionConfiguration, sendBefore?: number, sendAfter?: number): Promise<DynamicSubscription> {
  const population = new PopulationClient()
  return population.modifySubscription(subscriptionId, configuration, sendBefore, sendAfter)
}

