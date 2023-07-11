import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Autocomplete, AutocompleteResponse, Command, CommandResponse, Main, linkedUser } from '@ps2gg/discord/command'
import { reply } from '@ps2gg/discord/util'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { validateVerification } from '../../application/Command/ValidateVerification'
import { getAltWideFriends } from '../../application/Query/GetAltWideFriends'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Friends, FriendsOptions } from '../../domain/Meta/Friends'

@Command(Friends)
export class FriendsCommand {
  @Main(Friends)
  async friends(options: FriendsOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    const { name } = options

    if (!name && !user.characterIds?.length) return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
    if (name) await validateVerification(name, user, interaction)

    interaction.deferReply({ ephemeral: true })
    const friends = await getAltWideFriends(user, name)
    await reply(interaction, { embeds: [friends], ephemeral: true })
    const friendsAllAlts = await getAltWideFriends(user, name, true)
    return {
      interactionContext: [],
      embeds: [friendsAllAlts],
      ephemeral: true,
    }
  }

  @Autocomplete(Friends, 'name')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
