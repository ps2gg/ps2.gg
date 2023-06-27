import { APIEmbed } from 'discord.js'

export class VerifyLogPromptEmbed implements APIEmbed {
  description?: string

  constructor(discordId: string, name: string) {
    this.description = `### <@${discordId}> used \`/verify\` for ${name}`
  }
}
