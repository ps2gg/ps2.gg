import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class UnsubscribeEmbed implements APIEmbed {
  title = 'Unsubscribed!'
  color = EmbedColors.Success
  description: string

  constructor(event: string, server: string) {
    this.description = `You will no longer receive notifications for ${event} ${server === 'All' ? '' : ` on ${server}`}`
  }
}
