import { getBases } from '@ps2gg/census/collections'
import { continents } from '@ps2gg/common/constants'
import { getServerId } from '@ps2gg/common/util'
import { Component, Command, linkedUser, ComponentResponse, Autocomplete, AutocompleteResponse, CommandResponse, MainCommand } from '@ps2gg/discord/command'
import { NotificationsClient } from '@ps2gg/notifications/client'
import { Subscription } from '@ps2gg/notifications/types'
import { PopulationClient } from '@ps2gg/population/client'
import { User } from '@ps2gg/users/types'
import { unsubscribe } from './components/unsubscribe'
import { NotifyOptions, notify } from './config'
import { getFailureEmbed } from './embeds/failure'
import { getNotifyEmbed } from './embeds/notify'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'

@Command(notify)
export class NotifyCommand {
  private _notifications = new NotificationsClient()
  private _population = new PopulationClient()
  private _bases: string[]
  private _continents: string[]
  private _scopes: string[]

  constructor() {
    this._preload()
  }

  @MainCommand(notify)
  async notify(options: NotifyOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, scope } = options
    const type = scope.split(' ')[0]
    const scopeSanitized = scope.split(' ').slice(1).join(' ') // cut f:, c:, etc
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

  @Autocomplete(notify, 'scope')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return this._scopes
      .filter((scope) => scope.toLowerCase().includes(query ? query.toLowerCase() : 'a'))
      .slice(0, 8)
      .map((scope) => ({ name: scope, value: scope }))
  }

  @Component(unsubscribe)
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

  // These would take too long to load on-demand
  private async _preload() {
    this._bases = Object.values(await getBases()).map((base) => `f: ${base}`)
    this._continents = Object.values(continents).map((cont) => `c: ${cont}`)
    this._scopes = [...this._continents, ...this._bases]
  }
}
