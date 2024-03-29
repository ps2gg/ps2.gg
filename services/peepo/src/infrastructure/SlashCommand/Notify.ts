import { sanitizeObjectNotation } from '@ps2gg/common/util'
import { Component, Command, linkedUser, Autocomplete, AutocompleteResponse, CommandResponse, Main, ComponentResponse, ProgressiveComponent } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { AnySelectMenuInteraction, ButtonInteraction, CommandInteraction } from 'discord.js'
import { addPopulationSubscription } from '../../application/Command/Population/AddPopulationSubscription'
import { modifyPopulationSubscriptionConfig } from '../../application/Command/Population/ModifyPopulationSubscriptionConfig'
import { modifyPopulationSubscriptionTime } from '../../application/Command/Population/ModifyPopulationSubscriptionTime'
import { removePopulationSubscription } from '../../application/Command/Population/RemovePopulationSubscription'
import { getEventSuggestions } from '../../application/Query/Population/GetEventSuggestions'
import { getPopulationSubscriptionIds } from '../../application/Query/Population/GetPopulationSubscriptionIds'
import { getSubscription } from '../../application/Query/Population/GetSubscription'
import { NotifyConfigurePopulation } from '../../domain/Component/Notification/NotifyConfigurePopulation'
import { NotifyConfigureSendAfter, NotifyConfigureSendBefore } from '../../domain/Component/Notification/NotifyConfigureTime'
import { Unsubscribe } from '../../domain/Component/Notification/Unsubscribe'
import { NotifyOptions, Notify } from '../../domain/Meta/Notify'

@Command(Notify)
export class NotifyCommand {
  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse | null> {
    const { server } = options
    const event = sanitizeObjectNotation(options.event)
    const embed = await addPopulationSubscription(server, event, user)
    return {
      interactionContext: [server, event],
      embeds: [embed],
      content: "**🛠️ Development Build**\nThis command is still a proof of concept. We'll announce when it's ready for regular usage.",
    }
  }

  @Autocomplete(Notify, 'event')
  async event(query: string): Promise<AutocompleteResponse[]> {
    return getEventSuggestions(query)
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<void> {
    const server = interactionContext[0]
    const event = interactionContext[1]
    const embed = await removePopulationSubscription(server, event, user)
    interaction.followUp({ embeds: [embed], ephemeral: true })
  }

  @ProgressiveComponent(NotifyConfigurePopulation, 'Configure')
  async configurePopulationTr(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await getPopulationSubscriptionIds(server, event, user)
    await modifyPopulationSubscriptionConfig(subscriptionIds, value)
    const embed = await getSubscription(server, event, user.id)
    return {
      embeds: [embed],
    }
  }

  @ProgressiveComponent(NotifyConfigureSendAfter, 'Configure')
  async configureSendAfter(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await getPopulationSubscriptionIds(server, event, user)
    await modifyPopulationSubscriptionTime(subscriptionIds, server, null, value)
    const embed = await getSubscription(server, event, user.id)
    return {
      embeds: [embed],
    }
  }

  @ProgressiveComponent(NotifyConfigureSendBefore, 'Configure')
  async configureSendBefore(interactionContext: string[], @linkedUser user: User, interaction: AnySelectMenuInteraction): Promise<ComponentResponse> {
    const value = parseInt(interaction.values[0] as string)
    const server = interactionContext[0]
    const event = interactionContext[1]
    const subscriptionIds = await getPopulationSubscriptionIds(server, event, user)
    await modifyPopulationSubscriptionTime(subscriptionIds, server, value)
    const embed = await getSubscription(server, event, user.id)
    return {
      embeds: [embed],
    }
  }
}
