import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { RemoveSubscription } from '../../application/Command/RemoveSubscription'
import { GetEventSuggestions } from '../../application/Query/GetEventSuggestions'
import { UnsubscribeOptions, Unsubscribe } from '../../domain/Meta/Unsubscribe'

@Command(Unsubscribe)
export class UnsubscribeCommand {
  @Main(Unsubscribe)
  async unsubscribe(options: UnsubscribeOptions, @linkedUser user: User): Promise<CommandResponse> {
    const { server, event } = options
    const embed = await new RemoveSubscription(server, event, user).execute()
    return {
      interactionContext: [],
      embeds: [embed],
      ephemeral: true,
    }
  }

  @Autocomplete(Unsubscribe, 'event')
  async scope(query: string): Promise<AutocompleteResponse[]> {
    return new GetEventSuggestions(query).execute()
  }
}