import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { verifyPlayer } from '../../application/Command/Users/VerifyPlayer'
import { getAltWideFriends } from '../../application/Query/Friends/GetAltWideFriends'
import { VerifyHintEmbed } from '../../domain/Embed/Verification/VerifyHintEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    const { player } = options

    if (!player && !user.characterIds?.length) return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
    if (player) await verifyPlayer(player, user, interaction)

    const friendsAllAlts = await getAltWideFriends(user, player)
    return {
      interactionContext: [],
      embeds: [friendsAllAlts],
      ephemeral: true,
    }
  }

  @Autocomplete(Friends, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
