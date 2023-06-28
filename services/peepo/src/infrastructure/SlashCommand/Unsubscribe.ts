import { sanitizeObjectNotation } from '@ps2gg/common/util'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { removePopulationSubscription } from '../../application/Command/RemovePopulationSubscription'
import { getEventSuggestions } from '../../application/Query/GetEventSuggestions'
import { UnsubscribeOptions, Unsubscribe } from '../../domain/Meta/Unsubscribe'

@Command(Unsubscribe)
export class UnsubscribeCommand {
  @Main(Unsubscribe)
  async unsubscribe(options: UnsubscribeOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server } = options
    const event = sanitizeObjectNotation(options.event)
    const embed = await removePopulationSubscription(server, event, user)
    return {
      interactionContext: [],
      embeds: [embed],
      ephemeral: true,
    }
  }

  @Autocomplete(Unsubscribe, 'event')
  async id(query: string): Promise<AutocompleteResponse[]> {
    return getEventSuggestions(query)
  }
}
