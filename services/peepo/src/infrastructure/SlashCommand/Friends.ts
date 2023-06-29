import { GetPlayerAutocomplete } from '@ps2gg/alts/ws'
import { getLogger } from '@ps2gg/common/logging'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { PlayerClient } from '@ps2gg/players/client'
import { User } from '@ps2gg/users/types'
import { GetFriends } from '../../application/Query/GetFriends'
import { FriendsEmbed, VerifyHintEmbed } from '../../domain/Embed/FriendsEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

const logger = getLogger('FriendsCommand')

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User): Promise<CommandResponse> {
    if (!user.characterIds.length) {
      logger.info('no characters verified for this user', user)
      return {
        interactionContext: [],
        embeds: [new VerifyHintEmbed()],
      }
    }

    const allFriends: string[] = []
    user.characterIds.forEach(async (cId) => {
      const { friendIds } = await new GetFriends(cId).execute()
      allFriends.concat(friendIds)
    })

    const friendsDedup = Array.from(new Set(allFriends.values()))

    const friends = await new GetOnlinePlayers(friendsDedup).execute()
    return {
      interactionContext: [],
      embeds: [friends],
    }
  }

  @Autocomplete(Friends, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return [
      {
        name: 'Admutin',
        value: 'Admutin',
        // value: '5428055175457831777',
      },
      {
        name: 'AdmutinVS',
        value: 'admutinvs',
      },
    ]
    // return new GetPlayerAutocomplete(query).execute()
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
