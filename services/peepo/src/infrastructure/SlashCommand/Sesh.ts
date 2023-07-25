import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, linkedUser, CommandResponse } from '@ps2gg/discord/command'
import { defer, reply } from '@ps2gg/discord/util'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { validateVerification } from '../../application/Command/Users/ValidateVerification'
import { getSesh } from '../../application/Query/Sesh/GetSesh'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Sesh, SeshOptions } from '../../domain/Meta/Sesh'

@Command(Sesh)
export class SeshCommand {
  @Main(Sesh)
  async sesh(options: SeshOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    return {
      interactionContext: [],
      content: 'This command is still in development, please check back later!',
    }
    /**
    await defer(interaction, true)
    const { player: name } = options

    if (!name && !user.characterIds?.length) return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
    if (name) await validateVerification(name, user, interaction)

    const sesh = await getSesh(user, name)
    return {
      interactionContext: [],
      embeds: [sesh],
    }
    */
  }

  @Autocomplete(Sesh, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
