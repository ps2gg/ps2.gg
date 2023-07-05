import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { getLogger } from '@ps2gg/common/logging'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { PlayerClient } from '@ps2gg/players/client'
import { User } from '@ps2gg/users/types'
import { getFriends } from '../../application/Query/GetFriends'
import { FriendsEmbed } from '../../domain/Embed/FriendsEmbed'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

const logger = getLogger('FriendsCommand')

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User): Promise<CommandResponse> {
    if (!user?.characterIds?.length) {
      logger.info('no characters verified for this user', user)
      return {
        interactionContext: [],
        embeds: [new VerifyHintEmbed()],
      }
    }

    const { friendIds } = await getFriends(user.characterIds)

    if (!friendIds.length) logger.warn('no friends found, request may fail')

    const friends = await new GetOnlinePlayers(friendIds).execute()
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

export class GetOnlinePlayers {
  private _players = new PlayerClient()

  constructor(readonly ids: string[]) {}

  async execute(): Promise<FriendsEmbed> {
    const friends = await this._players.findManyOnline(this.ids)
    return new FriendsEmbed(friends)
  }
}
