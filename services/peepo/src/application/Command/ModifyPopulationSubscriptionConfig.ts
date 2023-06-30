import { modifyPopulationSubscription } from './ModifyPopulationSubscription'

export async function modifyPopulationSubscriptionConfig(subscriptionIds: string[], value: number): Promise<void> {
  for (const subscriptionId of subscriptionIds) {
    const configuration = {}

    for (const faction of ['nc', 'tr', 'vs']) {
      configuration[faction] = { $min: value / 3 }
    }
    await modifyPopulationSubscription(subscriptionId, configuration)
  }
}
