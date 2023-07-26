import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { Command, Main, Autocomplete, AutocompleteResponse, linkedUser, CommandResponse, Component } from '@ps2gg/discord/command'
import { reply } from '@ps2gg/discord/util'
import { User } from '@ps2gg/users/types'
import { CommandInteraction, InteractionResponse } from 'discord.js'
import { getIntroduction } from '../../application/Aggregation/Companion/Introduction'
import { getVerifyHint } from '../../application/Aggregation/Verification/VerifyHint'
import { verifyPlayer } from '../../application/Command/Users/VerifyPlayer'
import { getSuggestions } from '../../application/Query/Companion/GetSuggestions'
import { IntroductionServerSelect } from '../../domain/Component/Companion/IntroductionServerSelect'
import { messageCoordinator } from '../../domain/Coordinator/MessageCoordinator'
import { Companion, CompanionOptions } from '../../domain/Meta/Companion'

@Command(Companion)
export class CompanionCommand {
  @Main(Companion)
  async companion(options: CompanionOptions, @linkedUser user: User, interaction: CommandInteraction): Promise<CommandResponse> {
    const { player: name } = options

    await this.showIntroduction(interaction)

    if (!name && !user.characterIds?.length) return getVerifyHint()
    if (name) await verifyPlayer(name, user, interaction)

    return this.showSuggestions(user, name)
  }

  async showIntroduction(interaction: CommandInteraction): Promise<void> {
    const introduction = getIntroduction(interaction.id)
    reply(interaction, introduction)

    const hasSelectedServer = await messageCoordinator.awaitInteraction(interaction.id)

    if (!hasSelectedServer) throw new Error('Interaction timed out, please try again.')
  }

  async showSuggestions(user: User, name: string): Promise<CommandResponse> {
    const suggestions = await getSuggestions(user, name)
    return {
      interactionContext: [],
      embeds: [suggestions],
    }
  }

  @Autocomplete(Companion, 'player')
  async search(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }

  @Component(IntroductionServerSelect)
  async serverSelect(interactionContext: string[]): Promise<void> {
    const interactionId = interactionContext[0]
    await messageCoordinator.completeInteraction(interactionId)
  }
}
