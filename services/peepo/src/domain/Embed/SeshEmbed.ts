import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields?: APIEmbedField[]
  footer?: APIEmbedFooter

  constructor(friends: Player[], includesFriendsAlts: boolean) {
    this.description = `## Get the most out of Planetside
    ### Best Fights
    Coming soon:tm:\n### Who's playing?
    ${code(friends.length ? friends.map((friend) => friend.name).join('\n') : 'No frens online')}`

    this.footer = {
      icon_url: includesFriendsAlts ? 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless' : undefined,
      text: includesFriendsAlts ? "Everyone's alts included in your friends list" : "Adding your friends' alts...",
    }
  }
}
