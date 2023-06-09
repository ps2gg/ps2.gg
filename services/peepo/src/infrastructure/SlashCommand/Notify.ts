import {
  Component,
  Command,
  linkedUser,
  Autocomplete,
  AutocompleteResponse,
  CommandResponse,
  Main,
  ComponentResponse,
  ProgressiveComponent,
} from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { AnySelectMenuInteraction, ButtonInteraction, CommandInteraction } from 'discord.js'
import { AddPopulationSubscription } from '../../application/Command/AddPopulationSubscription'
import { ModifyPopulationSubscriptionConfig } from '../../application/Command/ModifyPopulationSubscriptionConfig'
import { ModifyPopulationSubscriptionTime } from '../../application/Command/ModifyPopulationSubscriptionTime'
import { RemovePopulationSubscription } from '../../application/Command/RemovePopulationSubscription'
import { GetEventSuggestions } from '../../application/Query/GetEventSuggestions'
import { GetPopulationSubscriptionIds } from '../../application/Query/GetPopulationSubscriptionIds'
import { GetSubscription } from '../../application/Query/GetSubscription'
import { NotifyConfigurePopulation } from '../../domain/Component/NotifyConfigurePopulation'
import { NotifyConfigureSendAfter, NotifyConfigureSendBefore } from '../../domain/Component/NotifyConfigureTime'
import { Unsubscribe } from '../../domain/Component/Unsubscribe'
import { NotifyOptions, Notify } from '../../domain/Meta/Notify'

@Command(Notify)
export class NotifyCommand {
  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse | undefined> {
    const { server, event } = options
    const embed = await new AddPopulationSubscription(server, event, user).execute()
    return { interactionContext: [server, event], embeds: [embed] }
  }

  @Autocomplete(Notify, 'event')
  async event(query: string): Promise<AutocompleteResponse[]> {
    return new GetEventSuggestions(query).execute()
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<void> {
    const server = interactionContext[0]
    const event = interactionContext[1]
    const embed = await new RemovePopulationSubscription(server, event, user).execute()
    interaction.followUp({ embeds: [embed], ephemeral: true })
  }

  @ProgressiveComponent(NotifyConfigurePopulation, 'Configure')
  async configurePopulationTr(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await new GetPopulationSubscriptionIds(server, event, user).execute()
    await new ModifyPopulationSubscriptionConfig(subscriptionIds, value).execute()
    const embed = await new GetSubscription(server, event, user.id).execute()
    return {
      embeds: [embed],
    }
  }

  @ProgressiveComponent(NotifyConfigureSendAfter, 'Configure')
  async configureSendAfter(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await new GetPopulationSubscriptionIds(server, event, user).execute()
    await new ModifyPopulationSubscriptionTime(subscriptionIds, server, undefined, value).execute()
    const embed = await new GetSubscription(server, event, user.id).execute()
    return {
      embeds: [embed],
    }
  }

  @ProgressiveComponent(NotifyConfigureSendBefore, 'Configure')
  async configureSendBefore(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await new GetPopulationSubscriptionIds(server, event, user).execute()
    await new ModifyPopulationSubscriptionTime(subscriptionIds, server, value).execute()
    const embed = await new GetSubscription(server, event, user.id).execute()
    return {
      embeds: [embed],
    }
  }
}
