import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export class VerifiedEmbed implements APIEmbed {
  title?: string
  color = EmbedColors.Success
  footer = { text: 'Verification process powered by ps2.gg' }

  constructor(name: string) {
    this.title = `${name} has been verified! An admin will get to you shortly.`
  }
}
