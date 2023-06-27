import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class VerifyLogSuccessEmbed implements APIEmbed {
  description?: string
  color = EmbedColors.Success
  footer = { text: 'Powered by ps2.gg' }

  constructor(discordId: string, name: string) {
    const now = Math.floor(new Date().getTime() / 1000)
    this.description = `### <@${discordId}> has been verified as ${name}\nVerified <t:${now}:R>`
  }
}
