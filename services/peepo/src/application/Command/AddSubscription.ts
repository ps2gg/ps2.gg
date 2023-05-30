import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { APIEmbed } from 'discord.js'
import { NotifyEmbed } from '../../domain/Embed/Notify'
import { NotifyFailureEmbed } from '../../domain/Embed/NotifyFailure'
import { ScopeEntity } from '../../domain/Entity/ScopeEntity'
import { SubscriptionEntity } from '../../domain/Entity/SubscriptionEntity'

export class AddSubscription {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {}

  async execute(): Promise<APIEmbed> {
    const scope = new ScopeEntity(this.server, this.event)
    const compositeScopes = scope.getCompositions()
    const populationSum = { tr: 0, nc: 0, vs: 0 }

    for (const scope of compositeScopes) {
      const population = await this._population.getPopulation(scope)

      if (!population) return new NotifyFailureEmbed(this.server, this.event)
      populationSum.nc += population.nc
      populationSum.tr += population.tr
      populationSum.vs += population.vs

      const subscription = new SubscriptionEntity(this.server, scope, this.user.id)
      await this._population.setSubscription(subscription)
    }

    return new NotifyEmbed(this.server, this.event, populationSum)
  }
}
