import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, linkedUser, CommandResponse } from '@ps2gg/discord/command'
import { defer, reply } from '@ps2gg/discord/util'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { validateVerification } from '../../application/Command/Users/ValidateVerification'
import { getSuggestions } from '../../application/Query/Companion/GetSuggestions'
import { VerifyHintEmbed } from '../../domain/Embed/VerifyHintEmbed'
import { Companion, CompanionOptions } from '../../domain/Meta/Companion'

@Command(Companion)
export class CompanionCommand {
  @Main(Companion)
  async companion(options: CompanionOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    return {
      interactionContext: [],
      content: 'This command is still in development, please check back later!',
    }
    /**
    await defer(interaction, true)
    const { player: name } = options

    if (!name && !user.characterIds?.length) return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
    if (name) await validateVerification(name, user, interaction)

    const suggestions = await getSuggestions(user, name)
    return {
      interactionContext: [],
      embeds: [suggestions],
    }
    */
  }

  @Autocomplete(Companion, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }
}
