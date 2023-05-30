import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class NotifyFailureEmbed implements APIEmbed {
  title: string
  description: string
  color: number

  constructor(server: string, event: string) {
    this.title = `No population data for ${event} on ${server}`
    this.description = `Are you sure ${event} exists?`
    this.color = EmbedColors.Failure
  }
}
