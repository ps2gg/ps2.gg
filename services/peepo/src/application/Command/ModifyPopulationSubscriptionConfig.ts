import { ModifyPopulationSubscription } from './ModifyPopulationSubscription'

export class ModifyPopulationSubscriptionConfig {
  constructor(readonly subscriptionIds: string[], readonly value: number) {}

  async execute(): Promise<void> {
    for (const subscriptionId of this.subscriptionIds) {
      const configuration = {}

      for (const faction of ['nc', 'tr', 'vs']) {
        configuration[faction] = { $min: this.value / 3 }
      }
      await new ModifyPopulationSubscription(subscriptionId, configuration).execute()
    }
  }
}
