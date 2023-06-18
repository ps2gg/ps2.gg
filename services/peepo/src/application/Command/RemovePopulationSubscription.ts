import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { UnsubscribeEmbed } from '../../domain/Embed/UnsubscribeEmbed'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

export class RemovePopulationSubscription {
  private _population = new PopulationClient()

  constructor(readonly server: string, readonly event: string, readonly user: User) {
    this.event = event === 'All' ? 'anything' : event
  }

  async execute(): Promise<UnsubscribeEmbed> {
    const id = new PopulationEntity(this.server, this.event)
    const ids = id.getIds()

    for (const id of ids) {
      await this._population.removeSubscription({ userId: this.user.id, id })
    }

    return new UnsubscribeEmbed(this.event, this.server)
  }
}
