import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { showVerification } from '../../application/Command/Verification/ShowVerification'
import { showVerificationHint } from '../../application/Command/Verification/ShowVerificationHint'
import { getAltWideFriends } from '../../application/Query/Friends/GetAltWideFriends'
import { VerifyHintEmbed } from '../../domain/Embed/Verification/VerifyHintEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    await interaction.deferReply({ ephemeral: true })
    const { player } = options

    if (!player && !user.characterIds?.length) await showVerificationHint(interaction, user.discordId)
    if (player) await showVerification(player, user, interaction)

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
