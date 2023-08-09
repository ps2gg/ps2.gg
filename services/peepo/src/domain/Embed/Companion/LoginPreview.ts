import { factions } from '@ps2gg/common/constants'
import { emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedFooter } from 'discord.js'

export class LoginPreviewEmbed implements APIEmbed {
  description: string
  footer?: APIEmbedFooter

  constructor(characters: Player[]) {
    this.description = `## Waiting for your login...
    Please start playing on one of your linked characters, so peepo can find the right fights for you.
  
    ${characters.map((c) => `${emojis[factions[c.factionId].toLowerCase()]} **${c.name}**`).join('\n')}
    \u200b
    `

    this.footer = {
      text: 'If a character is missing, you can add them via /verify',
    }
  }
}
