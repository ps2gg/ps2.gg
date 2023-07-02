import { APIEmbed } from 'discord.js'

export class VerifyHintEmbed implements APIEmbed {
  description: string

  constructor() {
    this.description = '### Verification required\n' + `Please use </verify:1124474254814089286> to link an ingame character.`
  }
}
