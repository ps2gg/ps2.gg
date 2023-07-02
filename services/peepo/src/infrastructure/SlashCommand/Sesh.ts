import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, linkedUser, CommandResponse } from '@ps2gg/discord/command'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { validateVerification } from '../../application/Command/ValidateVerification'
import { getAltWideFriends } from '../../application/Query/GetAltWideFriends'
import { getFriends } from '../../application/Query/GetFriends'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Sesh, SeshOptions } from '../../domain/Meta/Sesh'

@Command(Sesh)
export class SeshCommand {
  @Main(Sesh)
  async sesh(options: SeshOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    await interaction.deferReply({ ephemeral: true })
    const { player: name } = options

    if (!name && !user.characterIds?.length) return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
    if (name) await validateVerification(name, user, interaction)

    const friends = await getAltWideFriends(user, name)
    await interaction.editReply({ embeds: [friends] })
    const friendsAllAlts = await getAltWideFriends(user, name, true)
    return {
      interactionContext: [],
      embeds: [friendsAllAlts],
    }
  }

  @Autocomplete(Sesh, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
