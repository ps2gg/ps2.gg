import { DynamicSubscription, SubscriptionConfiguration } from '@ps2gg/events/types'
import { PopulationClient } from '@ps2gg/population/client'

export class ModifyPopulationSubscription {
  private _population = new PopulationClient()

  constructor(readonly subscriptionId: string, readonly configuration?: SubscriptionConfiguration, readonly sendBefore?: number, readonly sendAfter?: number) {}

  async execute(): Promise<DynamicSubscription> {
    const { configuration, sendAfter, sendBefore } = this
    return this._population.modifySubscription(this.subscriptionId, configuration, sendBefore, sendAfter)
  }
}
