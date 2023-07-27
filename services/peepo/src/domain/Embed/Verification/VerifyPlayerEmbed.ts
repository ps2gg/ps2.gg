import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

export class VerifyPlayerEmbed implements APIEmbed {
  description: string
  thumbnail = {
    url: 'https://i.imgur.com/ua8y2eo.png',
  }

  constructor(player: Player) {
    this.description =
      '## Please verify your character\n' +
      `To make sure it's really you, please
- **1)** Start the game
- **2)** Press **"Verify"** below
- **3)** Log in as **${player.name}**
`
  }
}
