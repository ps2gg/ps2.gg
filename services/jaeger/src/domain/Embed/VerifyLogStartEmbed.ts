import { APIEmbed } from 'discord.js'

export class VerifyLogStartEmbed implements APIEmbed {
  description?: string

  constructor(discordId: string, name: string) {
    this.description = `### <@${discordId}> has started the verification process for ${name}\nWaiting for their login...`
  }
}
