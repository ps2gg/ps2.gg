import { servers } from '@ps2gg/common/constants'
import { CommandResponse, Component, ComponentResponse, linkedUser } from '@ps2gg/discord/command'
import { Event, Notification } from '@ps2gg/discord/command'
import { EventResponse } from '@ps2gg/events/ws'
import { User } from '@ps2gg/users/types'
import { ButtonInteraction } from 'discord.js'
import { RemovePopulationSubscription } from '../../application/Command/RemovePopulationSubscription'
import { GetPopulationNotification } from '../../application/Query/GetPopulationNotification'
import { Unsubscribe } from '../../domain/Component/Unsubscribe'

@Event('DomainEvent.Population.Update', 'population')
export class PopulationEvent {
  @Notification()
  async notifyUser(event: EventResponse): Promise<CommandResponse> {
    const id: string = event.data.id
    const embed = await new GetPopulationNotification(id).execute()
    return {
      interactionContext: [id],
      embeds: [embed],
    }
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<ComponentResponse | void> {
    const id = interactionContext[0]
    const event = id.split('.')[0]
    const server = servers[id.split('.').pop()]
    const embed = await new RemovePopulationSubscription(server, event, user).execute()
    interaction.followUp({ embeds: [embed] })
  }
}
