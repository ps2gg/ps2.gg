import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { getFriends } from '../../application/Query/GetFriends'
import { getOnlineFriends } from '../../application/Query/GetOnlineFriends'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User): Promise<CommandResponse> {
    if (!user?.characterIds?.length) {
      return {
        interactionContext: [],
        embeds: [new VerifyHintEmbed()],
      }
    }
    const { friendIds } = await getFriends(user.characterIds)
    const friends = await getOnlineFriends(friendIds)
    return {
      interactionContext: [],
      embeds: [friends],
      ephemeral: true,
    }
  }

  @Autocomplete(Friends, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
