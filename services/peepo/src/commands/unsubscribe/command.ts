import { getBases } from '@ps2gg/census/collections'
import { ServerId } from '@ps2gg/census/types'
import { continents, servers } from '@ps2gg/common/constants'
import { getServerId } from '@ps2gg/common/util'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, MainCommand, linkedUser } from '@ps2gg/discord/command'
import { NotificationsClient } from '@ps2gg/notifications/client'
import { User } from '@ps2gg/users/types'
import { UnsubscribeOptions, unsubscribe } from './config'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'

@Command(unsubscribe)
export class UnsubscribeCommand {
  private _subscriptions = new NotificationsClient()
  private _bases: string[]
  private _continents: string[]
  private _scopes: string[]

  constructor() {
    this._preload()
  }

  @MainCommand(unsubscribe)
  async unsubscribe(options: UnsubscribeOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, scope } = options

    if (server === 'All') {
      await this._unsubscribeFromAllServers(user, scope)
    } else {
      await this._unsubscribeFromSingleServer(user, scope, server as ServerId)
    }

    return {
      embeds: [getUnsubscribeEmbed(scope === 'All' ? 'anything' : sanitizeScope(scope), server)],
      ephemeral: true,
    }
  }

  private async _unsubscribeFromAllServers(user: User, scope: string) {
    for (const serverId of Object.keys(servers)) {
      if (scope === 'All') {
        this._unsubscribeFromAllScopes(user, serverId as ServerId)
      } else {
        await this._subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId as ServerId)
      }
    }
  }

  private async _unsubscribeFromSingleServer(user: User, scope: string, server: ServerId) {
    const serverId = getServerId(server)

    if (scope === 'All') {
      await this._unsubscribeFromAllScopes(user, serverId)
    } else {
      await this._subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId)
    }
  }

  private async _unsubscribeFromAllScopes(user: User, serverId: ServerId) {
    for (const s of this._scopes) {
      const scope = sanitizeScope(s)
      console.log(scope)
      await this._subscriptions.removePopulationSubscription(user.id, sanitizeScope(scope), serverId)
    }
  }

  @Autocomplete(unsubscribe, 'scope')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return this._scopes
      .filter((scope) => scope.toLowerCase().includes(query ? query.toLowerCase() : 'a'))
      .slice(0, 8)
      .map((scope) => ({ name: scope, value: scope }))
  }

  // These would take too long to load on-demand
  private async _preload() {
    this._bases = Object.values(await getBases()).map((base) => `f: ${base}`)
    this._continents = Object.values(continents).map((cont) => `c: ${cont}`)
    this._scopes = ['All', ...this._bases, ...this._continents]
  }
}

function sanitizeScope(scope: string): string {
  return scope.split(' ').slice(1).join(' ')
}
