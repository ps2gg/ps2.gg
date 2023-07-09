import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields?: APIEmbedField[]
  footer?: APIEmbedFooter

  constructor(friends: Player[], player: Player) {
    this.description = `## The best place to be, at all times
    Never waste your time with bad fights again
### Best Fights
    Coming soon:tm:\n### Who's playing?
    ${code(friends.length ? friends.map((friend) => friend.name).join('\n') : 'No frens online')}`

    if (player && player.isOnline) {
      this.footer = {
        icon_url: 'https://cdn.discordapp.com/emojis/717334812083355658.webp?size=240&quality=lossless',
        text: `Playing as ${player.name}`,
      }
    } else {
      this.footer = {
        icon_url: 'https://cdn.discordapp.com/emojis/717334809621430352.webp?size=240&quality=lossless',
        text: "We don't see you online",
      }
    }
  }
}
