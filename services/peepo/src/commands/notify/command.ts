import { Component, Command, linkedUser, Autocomplete, AutocompleteResponse, CommandResponse, Main } from '@ps2gg/discord/command'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { ButtonInteraction } from 'discord.js'
import { getCompositeScope, getScopeSuggestions, sanitizeScope } from '../../util/scopes'
import { Unsubscribe } from './components/unsubscribe'
import { NotifyOptions, Notify } from './config'
import { getFailureEmbed } from './embeds/failure'
import { getNotifyEmbed } from './embeds/notify'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'
import { getDefaultSubscription } from './subscription'

@Command(Notify)
export class NotifyCommand {
  private _population = new PopulationClient()

  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, event } = options
    const type = event.split(' ').pop()
    const scope = sanitizeScope(event)
    const compositeScope = getCompositeScope(scope, server)
    const population = await this._population.getPopulation(compositeScope)

    if (!population) {
      return {
        interactionContext: [scope, server],
        embeds: [getFailureEmbed(server, scope)],
        ephemeral: true,
      }
    }
    const subscription = getDefaultSubscription(user.id, compositeScope, server)
    await this._population.setSubscription(subscription)

    return {
      interactionContext: [scope, server],
      embeds: [getNotifyEmbed(server, event, population, type)],
      ephemeral: false,
    }
  }

  @Autocomplete(Notify, 'event')
  async event(query: string): Promise<AutocompleteResponse[]> {
    return getScopeSuggestions(query || 'a')
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<void> {
    const event = interactionContext[0]
    const server = interactionContext[1]
    await this._population.removeSubscription(user.id, getCompositeScope(event, server))
    interaction.followUp({ embeds: [getUnsubscribeEmbed(event, server)], ephemeral: true })
  }
}
