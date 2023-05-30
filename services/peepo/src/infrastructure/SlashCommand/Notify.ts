import { Component, Command, linkedUser, Autocomplete, AutocompleteResponse, CommandResponse, Main } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { ButtonInteraction, CommandInteraction } from 'discord.js'
import { AddSubscription } from '../../application/Command/AddSubscription'
import { RemoveSubscription } from '../../application/Command/RemoveSubscription'
import { GetEventSuggestions } from '../../application/Query/GetEventSuggestions'
import { Unsubscribe } from '../../domain/Component/Unsubscribe'
import { NotifyFailureEmbed } from '../../domain/Embed/NotifyFailure'
import { NotifyOptions, Notify } from '../../domain/Meta/Notify'

@Command(Notify)
export class NotifyCommand {
  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse | undefined> {
    const { server, event } = options
    const embed = await new AddSubscription(server, event, user).execute()

    if (embed instanceof NotifyFailureEmbed) {
      interaction.followUp({ embeds: [embed], ephemeral: true })
      return
    }

    return {
      interactionContext: [event, server],
      embeds: [embed],
      ephemeral: false,
    }
  }

  @Autocomplete(Notify, 'event')
  async event(query: string): Promise<AutocompleteResponse[]> {
    return new GetEventSuggestions(query).execute()
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<void> {
    const event = interactionContext[0]
    const server = interactionContext[1]
    const embed = await new RemoveSubscription(server, event, user).execute()
    interaction.followUp({ embeds: [embed], ephemeral: true })
  }
}
