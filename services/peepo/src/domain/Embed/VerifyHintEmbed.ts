import { APIEmbed } from 'discord.js'

export class VerifyHintEmbed implements APIEmbed {
  description: string

  constructor() {
    this.description = '### Verification required\n' + `Please use </verify:1126581814312579098> to link an ingame character.`
  }
}
