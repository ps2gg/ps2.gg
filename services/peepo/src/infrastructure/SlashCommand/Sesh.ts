import { GetPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, CommandResponse, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { GetFriends } from '../../application/Query/GetFriends'
import { GetOnlinePlayers } from '../../application/Query/GetOnlinePlayer'
import { GetPlayer } from '../../application/Query/GetPlayer'
import { Sesh, SeshOptions } from '../../domain/Meta/Sesh'

@Command(Sesh)
export class SeshCommand {
  @Main(Sesh)
  async sesh(options: SeshOptions, @linkedUser user: User): Promise<CommandResponse> {
    return {
      interactionContext: [],
      content: 'Not yet added, try again soon!',
      ephemeral: true,
    }
    /**
    const { name } = options
    const isVerified = await new VerifyCharacter(user.id, name).execute()

    if (!isVerified) throw new Error("Character couldn't be verified.")

    const player = await new GetPlayer(name).execute()
    const { friendIds } = await new GetFriends(player.id).execute()
    const friends = await new GetOnlinePlayers(friendIds).execute()
    return {
      interactionContext: [],
      embeds: [friends],
    }
     */
  }

  @Autocomplete(Sesh, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return new GetPlayerAutocomplete(query).execute()
  }
}
