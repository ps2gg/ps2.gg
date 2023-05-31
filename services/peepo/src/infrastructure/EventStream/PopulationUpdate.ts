import { CommandResponse, Component, ComponentResponse, linkedUser } from '@ps2gg/discord/command'
import { Event, Notification } from '@ps2gg/discord/command'
import { EventResponse } from '@ps2gg/events/ws'
import { User } from '@ps2gg/users/types'
import { RemoveSubscription } from '../../application/Command/RemoveSubscription'
import { GetPopulationNotification } from '../../application/Query/GetPopulationNotification'
import { Unsubscribe } from '../../domain/Component/Unsubscribe'

@Event('DomainEvent.Population.Update', 'population')
export class PopulationEvent {
  @Notification()
  async notifyUser(event: EventResponse): Promise<CommandResponse> {
    const scope: string = event.data.scope
    const embed = await new GetPopulationNotification(scope).execute()
    return {
      interactionContext: [scope],
      embeds: [embed],
    }
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const event = interactionContext[0]
    const server = event.split('.').pop()
    const embed = await new RemoveSubscription(server, event, user).execute()
    return {
      embeds: [embed],
    }
  }
}
