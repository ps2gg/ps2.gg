import { ServerId } from '@ps2gg/census/types'
import { servers } from '@ps2gg/common/constants'
import { CommandResponse, Component, ComponentResponse, linkedUser } from '@ps2gg/discord/command'
import { Event, Notification } from '@ps2gg/discord/command'
import { EventResponse } from '@ps2gg/events/ws'
import { NotificationsClient } from '@ps2gg/notifications/client'
import { User } from '@ps2gg/users/types'
import { getUnsubscribeEmbed } from '../../commands/notify/embeds/unsubscribe'
import { Unsubscribe } from './components/unsubscribe'
import { getNotificationEmbed } from './embeds/notification'

@Event('DomainEvent.Population.Update')
export class PopulationEvent {
  private _notifications = new NotificationsClient()

  @Notification()
  notifyUser(event: EventResponse): CommandResponse {
    const { subscription, serverId } = event.data
    return {
      interactionContext: [subscription.scope, serverId],
      embeds: [getNotificationEmbed(event)],
    }
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const scope = interactionContext[0]
    const serverId = interactionContext[1]
    const server: string = servers[serverId]
    await this._notifications.removePopulationSubscription(user.id, scope, serverId as ServerId)

    return {
      embeds: [getUnsubscribeEmbed(scope, server)],
    }
  }
}
