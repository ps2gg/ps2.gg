import { APIEmbed } from 'discord.js'

export class VerifyHintEmbed implements APIEmbed {
  description: string
  thumbnail = {
    url: 'https://em-content.zobj.net/source/microsoft-teams/363/locked_1f512.png',
  }

  constructor() {
    this.description =
      '## Just one more step\n' +
      `Please use </verify:1132574313606819855> to link one of your ingame characters.
We need this to ensure that only you can use your own ingame data.`
  }
}
