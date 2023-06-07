import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'

export class GetPopulationSubscriptionIds {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {}

  async execute(): Promise<string[]> {
    const scopes = new ScopeEntity(this.server, this.event).getCompositions()
    const subscriptionIds: string[] = []

    for (const scope of scopes) {
      const subscriptions = await this._population.getSubscriptions(this.user.id, scope)
      const subscriptionIdMap: string[] = subscriptions.map((subscription) => subscription.subscriptionId)
      subscriptionIds.push(...subscriptionIdMap)
    }

    return subscriptionIds
  }
}
