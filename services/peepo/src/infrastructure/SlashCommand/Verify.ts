import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { sanitizeCharacterName } from '@ps2gg/common/util'
import { Command, Main, Autocomplete, AutocompleteResponse, CommandResponse, Component, ComponentResponse } from '@ps2gg/discord/command'
import { DiscordCommand } from '@ps2gg/discord/types'
import { defer } from '@ps2gg/discord/util'
import { ButtonInteraction, CommandInteraction } from 'discord.js'
import { verifyCharacter } from '../../application/Command/Players/VerifyCharacter'
import { getSelectedCharacter } from '../../application/Query/Players/GetSelectedCharacter'
import { VerifyReady } from '../../domain/Component/Verification/VerifyReady'
import { verificationCoordinator } from '../../domain/Coordinator/VerificationCoordinator'
import { Verify, VerifyOptions } from '../../domain/Meta/Verify'

@Command(Verify)
export class VerifyCommand extends DiscordCommand {
  @Main(Verify)
  async verify(options: VerifyOptions, interaction: CommandInteraction): Promise<CommandResponse> {
    await defer(interaction, true)
    const name = sanitizeCharacterName(options.name)
    const { embed, id } = await getSelectedCharacter(name, null, true)
    return {
      interactionContext: [id, name],
      embeds: [embed],
      ephemeral: true,
    }
  }

  @Autocomplete(Verify, 'name')
  async playerName(query: string): Promise<AutocompleteResponse[]> {
    return getPlayerAutocomplete(query)
  }

  @Component(VerifyReady)
  async verifyReady(interactionContext: string[], interaction: ButtonInteraction): Promise<ComponentResponse> {
    const id = interactionContext[0]
    const name = interactionContext[1]
    const { user } = interaction
    const discordId = user.id

    try {
      const embed = await verifyCharacter(id, name, discordId)
      verificationCoordinator.completeVerification(discordId, id)
      verificationCoordinator.completeVerification(discordId, 'unknown') // When triggered via hint
      return { embeds: [embed] }
    } catch (error) {
      if (error?.response?.status === 408) {
        throw new Error('Verification timed out. Please try again.')
      }
      throw error
    }
  }
}
