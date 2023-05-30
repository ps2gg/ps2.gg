import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { UnsubscribeEmbed } from '../../domain/Embed/UnsubscribeEmbed'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'

export class RemoveSubscription {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {
    this.event = event === 'All' ? 'anything' : event
  }

  async execute(): Promise<UnsubscribeEmbed> {
    const scope = new ScopeEntity(this.server, this.event)
    const compositeScopes = scope.getCompositions()

    for (const scope of compositeScopes) {
      await this._population.removeSubscription(this.user.id, scope)
    }

    return new UnsubscribeEmbed(this.event, this.server)
  }
}
