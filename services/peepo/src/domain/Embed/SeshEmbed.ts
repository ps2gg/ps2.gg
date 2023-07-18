import { factions, servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[]
  color: EmbedColors
  footer = {
    icon_url: 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless',
    text: "Everyone's alts included",
  }

  constructor(player: Player, friends: Player[]) {
    this.description = this._getDescription(friends)
    if (player && player.isOnline) this.color = EmbedColors.Success
  }

  private _getDescription(friends: Player[]) {
    return `## The best place to be, at all times
    Always see what's happening
### Best Fights
    Coming soon:tm:
### Who's playing?
    ${this._getFriends(friends)}`
  }

  private _getFriends(friends: Player[]) {
    if (!friends.length) return code('No frens online :(', 'css')
    let string = ''

    for (const friend of friends) {
      const server = servers[friend.serverId]
      const faction = factions[friend.factionId]
      const blop = `${friend.name} [${server} ${faction}]`
      string += blop.length > 40 ? blop.slice(0, 40 - 3) + '...' : blop
      string += '\n'
    }
    return code(string, 'css')
  }
}
