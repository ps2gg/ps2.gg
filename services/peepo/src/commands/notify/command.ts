import { Component, Command, linkedUser, Autocomplete, AutocompleteResponse, CommandResponse, Main } from '@ps2gg/discord/command'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { ButtonInteraction } from 'discord.js'
import { getCompositeScopes, getScopeSuggestions } from '../../util/scopes'
import { Unsubscribe } from './components/unsubscribe'
import { NotifyOptions, Notify } from './config'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'
import { subscribe } from './subscription'

@Command(Notify)
export class NotifyCommand {
  private _population = new PopulationClient()

  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, event } = options
    const compositeScopes = getCompositeScopes(event, server)
    return subscribe(compositeScopes, user, event, server)
  }

  @Autocomplete(Notify, 'event')
  async event(query: string): Promise<AutocompleteResponse[]> {
    return getScopeSuggestions(query || '')
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User, interaction: ButtonInteraction): Promise<void> {
    const event = interactionContext[0]
    const server = interactionContext[1]
    const compositeScopes = getCompositeScopes(event, server)

    for (const compositeScope of compositeScopes) {
      await this._population.removeSubscription(user.id, compositeScope)
    }
    interaction.followUp({ embeds: [getUnsubscribeEmbed(event, server)], ephemeral: true })
  }
}
