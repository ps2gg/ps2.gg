import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class VerifyLogFailureEmbed implements APIEmbed {
  description?: string
  color = EmbedColors.Failure

  constructor(discordId: string, name: string, error?: Error) {
    this.description = `### <@${discordId}> has failed to verify as ${name}\nReason: ${error ? error.message : 'Took more than 15s to login'}`
  }
}
