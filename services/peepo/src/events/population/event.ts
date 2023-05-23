import { servers } from '@ps2gg/common/constants'
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
  notifyUser(event: EventResponse): CommandResponse {
    const { scope } = event.data
    const [scopePrefix, server]: string[] = scope.split('.')
    return {
      interactionContext: [scopePrefix, server],
      embeds: [getNotificationEmbed(scopePrefix, server)],
    }
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const scope = interactionContext[0]
    const server = interactionContext[1]
    const compositeScope = `${server}.${scope}`
    await this._population.removeSubscription(user.id, compositeScope)

    return {
      embeds: [getUnsubscribeEmbed(scope, server)],
    }
  }
}
