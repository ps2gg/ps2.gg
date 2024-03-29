import { getPlayerAutocomplete } from '@ps2gg/alts/ws'
import { sanitizeCharacterName } from '@ps2gg/common/util'
import { Command, Main, Autocomplete, AutocompleteResponse, CommandResponse, Component, ComponentResponse } from '@ps2gg/discord/command'
import { DiscordCommand } from '@ps2gg/discord/types'
import { defer, sendChannel } from '@ps2gg/discord/util'
import { APIEmbed, ButtonInteraction, CommandInteraction } from 'discord.js'
import { verifyCharacter } from '../../application/Command/VerifyCharacter'
import { getPlayer } from '../../application/Query/GetPlayer'
import { VerifyReady } from '../../domain/Components/VerifyReady'
import { VerifyLogFailureEmbed } from '../../domain/Embed/VerifyLogFailureEmbed'
import { VerifyLogPromptEmbed } from '../../domain/Embed/VerifyLogPromptEmbed'
import { VerifyLogStartEmbed } from '../../domain/Embed/VerifyLogStartEmbed'
import { VerifyLogSuccessEmbed } from '../../domain/Embed/VerifyLogSuccessEmbed'
import { Verify, VerifyOptions } from '../../domain/Meta/Verify'

@Command(Verify)
export class VerifyCommand extends DiscordCommand {
  @Main(Verify)
  async verify(options: VerifyOptions, interaction: CommandInteraction): Promise<CommandResponse> {
    await defer(interaction, true)
    const name = sanitizeCharacterName(options.name)
    const { user } = interaction
    const { embed, id } = await getPlayer(name)
    this.logPrompt(name, user.id)
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
      this.logStart(name, discordId)
      const embed = await verifyCharacter(id, name, discordId)
      this.logSuccess(name, discordId)
      return { embeds: [embed] }
    } catch (error) {
      if (error?.response?.status === 408) {
        this.logFailure(name, discordId)
        throw new Error('Verification timed out. Please try again.')
      }
      this.logFailure(name, discordId, error as Error)
      throw error
    }
  }

  logPrompt(name: string, discordId: string): void {
    const embed = new VerifyLogPromptEmbed(discordId, name)
    this.sendLogs(embed)
  }

  logStart(name: string, discordId: string): void {
    const embed = new VerifyLogStartEmbed(discordId, name)
    this.sendLogs(embed)
  }

  logSuccess(name: string, discordId: string): void {
    const embed = new VerifyLogSuccessEmbed(discordId, name)
    this.sendLogs(embed)
  }

  logFailure(name: string, discordId: string, error?: Error): void {
    const embed = new VerifyLogFailureEmbed(discordId, name, error)
    this.sendLogs(embed)
  }

  sendLogs(embed: APIEmbed): void {
    const staging = process.env['PS2GG_STAGING']
    sendChannel(this.client, '1090392395427885198', '1121101663848112239', { embeds: [embed] })
    if (staging) sendChannel(this.client, '207168033918025729', '1120080493191373040', { embeds: [embed] })
  }
}
