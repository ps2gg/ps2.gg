import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[]
  footer: APIEmbedFooter
  color: EmbedColors

  constructor(player: Player, friends: Player[]) {
    this.description = this._getDescription(friends)
    this.footer = player && player.isOnline ? this._getOnlineFooter(player) : this._getOfflineFooter()
    if (player && player.isOnline) this.color = EmbedColors.Success
  }

  private _getDescription(friends: Player[]) {
    return `## The best place to be, at all times
    Never stare at the map again.
### Best Fights
    Coming soon:tm:
### Who's playing?
    ${code(friends.length ? friends.map((friend) => friend.name).join('\n') : 'No frens online')}`
  }

  private _getOnlineFooter(player) {
    return {
      icon_url: 'https://cdn.discordapp.com/emojis/717334812083355658.webp?size=240&quality=lossless',
      text: `Playing as ${player.name}`,
    }
  }

  private _getOfflineFooter() {
    return {
      icon_url: 'https://cdn.discordapp.com/emojis/717334809621430352.webp?size=240&quality=lossless',
      text: "We don't see you online",
    }
  }
}
