import { bases, factions, servers } from '@ps2gg/common/constants'
import { padNumber } from '@ps2gg/common/util'
import { EmbedColors, emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { Population } from '@ps2gg/population/types'
import { APIEmbed, APIEmbedField } from 'discord.js'

export class SeshEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[]
  color: EmbedColors
  footer = {
    icon_url: 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless',
    text: "Everyone's alts included",
  }

  constructor(player: Player, fights: Population[], friends: Player[]) {
    this.description = this._getDescription(friends, fights)
    if (fights.length || friends.length) this.color = EmbedColors.Success
  }

  private _getDescription(friends: Player[], fights: Population[]) {
    return `## The best place to be, at all times
    Always see what's happening${this._getServers(fights, friends)}`
  }

  private _getServers(fights: Population[], friends: Player[]): string {
    let string = ''

    for (const serverId of Object.keys(servers)) {
      if (serverId === '17') continue
      if (serverId === '1') continue
      const serverWideFriends = friends.filter((friend) => friend.serverId === serverId)
      const serverWideFights = fights.filter((fight) => fight.id.split('.')[1] === serverId)

      if (!serverWideFights.length) continue

      string += `\n### ${servers[serverId]}\n`
      string += this._getFights(serverWideFights)
      string += this._getFriends(serverWideFriends)
    }
    return string
  }

  private _getFights(fights: Population[]) {
    let string = ''

    for (const fight of fights) {
      const baseId = fight.id.split('.')[0]
      const base = bases[baseId]
      const population = fight.vs + fight.nc + fight.tr
      const factionBalance = Math.abs(Math.abs(fight.nc - fight.vs) - fight.tr)
      const factionBalancePercent = Math.round(100 - (factionBalance / population) * 100)
      string += `${base} (${fight.vs}/${fight.nc}/${fight.tr})\n`
    }
    return code(string, 'less')
  }

  private _getFriends(friends: Player[]) {
    if (!friends.length) return ''
    let string = '\n**Friends**'

    friends.sort((a, b) => a.factionId.localeCompare(b.factionId))
    for (const friend of friends) {
      const faction = factions[friend.factionId].toLowerCase()
      const name = friend.name.length > 40 ? friend.name.slice(0, 40 - 3) + '...' : friend.name
      string += `\n${emojis[faction]} ${name}`
    }
    return string
  }
}
