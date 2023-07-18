import { factions, servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter, APIEmbedImage } from 'discord.js'
import { finished } from 'stream'

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

    friends.sort((a, b) => (a.serverId + a.factionId).localeCompare(b.serverId + b.factionId))
    for (const friend of friends) {
      const server = servers[friend.serverId]
      const faction = factions[friend.factionId]
      const name = friend.name.length > 40 ? friend.name.slice(0, 40 - 3) + '...' : friend.name
      string += `${name} [${server} ${faction}]\n`
    }
    return code(string, 'css')
  }
}
