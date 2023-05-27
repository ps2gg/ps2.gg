import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { getScopeSuggestions } from '../../util/scopes'
import { UnsubscribeOptions, Unsubscribe } from './config'
import { getUnsubscribeEmbed } from './embeds/unsubscribe'
import { unsubscribe } from './unsubscribe'

@Command(Unsubscribe)
export class UnsubscribeCommand {
  @Main(Unsubscribe)
  async unsubscribe(options: UnsubscribeOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, event } = options
    await unsubscribe(user, event, server)

    return {
      interactionContext: [],
      embeds: [getUnsubscribeEmbed(event === 'All' ? 'anything' : event, server)],
      ephemeral: true,
    }
  }

  @Autocomplete(Unsubscribe, 'event')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return getScopeSuggestions(query, true)
  }
}
