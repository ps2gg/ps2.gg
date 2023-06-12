import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

export class GetPopulationSubscriptionIds {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {}

  async execute(): Promise<string[]> {
    const ids = new PopulationEntity(this.server, this.event).getIds()
    const subscriptionIds: string[] = []

    for (const id of ids) {
      const subscriptions = await this._population.getSubscriptions(this.user.id, id)
      const subscriptionIdMap: string[] = subscriptions.map((subscription) => subscription.subscriptionId)
      subscriptionIds.push(...subscriptionIdMap)
    }

    return subscriptionIds
  }
}
