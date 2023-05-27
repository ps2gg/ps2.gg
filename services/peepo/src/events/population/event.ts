import { CommandResponse, Component, ComponentResponse, linkedUser } from '@ps2gg/discord/command'
import { Event, Notification } from '@ps2gg/discord/command'
import { EventResponse } from '@ps2gg/events/ws'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { getUnsubscribeEmbed } from '../../commands/notify/embeds/unsubscribe'
import { Unsubscribe } from './components/unsubscribe'
import { getNotificationEmbed } from './embeds/notification'

@Event('DomainEvent.Population.Update', 'population')
export class PopulationEvent {
  private _population = new PopulationClient()

  @Notification()
  async notifyUser(event: EventResponse): Promise<CommandResponse> {
    const scope: string = event.data.scope
    const population = await this._population.getPopulation(scope)
    return {
      interactionContext: [scope],
      embeds: [await getNotificationEmbed(scope, population)],
    }
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const scope = interactionContext[0]
    const server = scope.split('.').pop()
    await this._population.removeSubscription(user.id, scope)

    return {
      embeds: [getUnsubscribeEmbed(scope, server)],
    }
  }
}
