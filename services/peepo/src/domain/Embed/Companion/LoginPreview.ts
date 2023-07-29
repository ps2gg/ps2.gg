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
    Here are the characters peepo knows you as
  
    ${characters.map((c) => `${emojis[factions[c.factionId].toLowerCase()]} **${c.name}**`).join('\n')}
    \u200b
    `

    this.footer = {
      text: 'If a character is missing, please add them via /verify',
    }
  }
}
