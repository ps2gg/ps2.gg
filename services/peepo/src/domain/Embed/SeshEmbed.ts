import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { Population } from '@ps2gg/population/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields?: APIEmbedField[]
  footer?: APIEmbedFooter

  constructor(readonly friends: Player[], readonly includesFriendsAlts: boolean, readonly fights: Population[]) {
    this.description = `## Get the most out of Planetside
**Best Fights**
${code(this.getFights())}
**Who's playing?**
${code(this.getFriends())}`

    this.footer = {
      icon_url: includesFriendsAlts ? 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless' : undefined,
      text: includesFriendsAlts ? "Everyone's alts included in your friends list" : "Adding your friends' alts...",
    }
  }

  getFriends(): string {
    return this.fights.length ? this.friends.map((friend) => friend.name).join('\n') : 'No frens online'
  }

  getFights(): string {
    return this.fights.length ? this.fights.map((fight) => `test: ${fight.tr}/${fight.nc}/${fight.vs}`).join('\n') : 'Coming soon:tm:'
  }
}
