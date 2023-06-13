import { Command, Main, Autocomplete, AutocompleteResponse, CommandResponse } from '@ps2gg/discord/command'
import { GetFriends } from '../../application/Query/GetFriends'
import { GetOnlinePlayers } from '../../application/Query/GetOnlinePlayer'
import { GetPlayer } from '../../application/Query/GetPlayer'
import { GetPlayerNameSuggestions } from '../../application/Query/GetPlayerNameSuggestions'
import { Sesh, SeshOptions } from '../../domain/Meta/Sesh'

@Command(Sesh)
export class SeshCommand {
  @Main(Sesh)
  async sesh(options: SeshOptions): Promise<CommandResponse> {
    const player = await new GetPlayer(options.name).execute()
    const { friendIds } = await new GetFriends(player.id).execute()
    const friends = await new GetOnlinePlayers(friendIds).execute()
    return {
      interactionContext: [],
      embeds: [friends],
    }
  }

  @Autocomplete(Sesh, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return new GetPlayerNameSuggestions(query).execute()
  }
}
