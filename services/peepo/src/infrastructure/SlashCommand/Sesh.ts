import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, linkedUser, getComponents } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { validateVerification } from '../../application/Command/ValidateVerification'
import { getFriends } from '../../application/Query/GetFriends'
import { getOnlinePlayers } from '../../application/Query/GetOnlinePlayer'
import { getPlayer } from '../../application/Query/GetPlayer'
import { Sesh, SeshOptions } from '../../domain/Meta/Sesh'

@Command(Sesh)
export class SeshCommand {
  @Main(Sesh)
  async sesh(options: SeshOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<any> {
    const { player: name } = options
    await validateVerification(name, user, interaction)
    const player = await getPlayer(name)
    const { friendIds } = await getFriends(player.id)
    const friends = await getOnlinePlayers(friendIds)
    return {
      interactionContext: [],
      embeds: [friends],
    }
  }

  @Autocomplete(Sesh, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
