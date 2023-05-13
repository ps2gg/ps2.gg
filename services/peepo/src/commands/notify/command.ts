import { getServerId } from '@ps2gg/common/util'
import { Component, Command, linkedUser, ComponentResponse, Autocomplete, AutocompleteResponse, CommandResponse, Main } from '@ps2gg/discord/command'
import { NotificationsClient } from '@ps2gg/notifications/client'
import { Subscription } from '@ps2gg/notifications/types'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { getScopeSuggestions, sanitizeScope } from '../../util/scopes'
import { Unsubscribe } from './components/unsubscribe'
import { NotifyOptions, Notify } from './config'
import { getFailureEmbed } from './embeds/failure'
import { getNotifyEmbed } from './embeds/notify'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'

@Command(Notify)
export class NotifyCommand {
  private _notifications = new NotificationsClient()
  private _population = new PopulationClient()

  @Main(Notify)
  async notify(options: NotifyOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, scope } = options
    const type = scope.split(' ')[0]
    const scopeSanitized = sanitizeScope(scope)
    const serverId = getServerId(server)
    const population = await this._population.getPopulation(scopeSanitized, serverId)

    if (!population) {
      return {
        embeds: [getFailureEmbed(server, scope)],
        ephemeral: true,
      }
    }

    const subscription = { userId: user.id, scope: scopeSanitized }
    await this._notifications.setPopulationSubscription(subscription as Subscription, serverId)

    return {
      interactionContext: [scopeSanitized, server],
      embeds: [getNotifyEmbed(server, scopeSanitized, population, type)],
      ephemeral: true,
    }
  }

  @Autocomplete(Notify, 'scope')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return getScopeSuggestions(query || 'a')
  }

  @Component(Unsubscribe)
  async unsubscribe(interactionContext: string[], @linkedUser user: User): Promise<ComponentResponse> {
    const scope = interactionContext[0]
    const server = interactionContext[1]
    const serverId = getServerId(server)
    await this._notifications.removePopulationSubscription(user.id, scope, serverId)

    return {
      embeds: [getUnsubscribeEmbed(scope, server)],
      ephemeral: true,
    }
  }
}
