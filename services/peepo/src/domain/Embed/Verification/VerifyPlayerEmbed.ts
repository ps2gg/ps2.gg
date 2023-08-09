import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

export class VerifyPlayerEmbed implements APIEmbed {
  description: string
  thumbnail = {
    url: 'https://i.imgur.com/sAcwume.png',
  }

  constructor(player: Player) {
    this.description =
      '## Please verify your character\n' +
      `To make sure it's really you, please
- Start the game
- Press **"Verify"** below
- Log in as **${player.name}**
`
  }
}
