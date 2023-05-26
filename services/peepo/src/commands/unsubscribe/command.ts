import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { getScopeSuggestions, sanitizeScope } from '../../util/scopes'
import { UnsubscribeOptions, Unsubscribe } from './config'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'
import { unsubscribe } from './unsubscribe'

@Command(Unsubscribe)
export class UnsubscribeCommand {
  @Main(Unsubscribe)
  async unsubscribe(options: UnsubscribeOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, scope } = options
    await unsubscribe(user, scope, server)

    return {
      interactionContext: [],
      embeds: [getUnsubscribeEmbed(scope === 'All' ? 'anything' : sanitizeScope(scope), server)],
      ephemeral: true,
    }
  }

  @Autocomplete(Unsubscribe, 'scope')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return getScopeSuggestions(query, true)
  }
}
