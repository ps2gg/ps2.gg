import { factions, servers } from '@ps2gg/common/constants'
import { EmbedColors, emojis } from '@ps2gg/discord/constants'
import { code, getFaction } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class FriendsEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[] = []
  footer: APIEmbedFooter
  color: EmbedColors

  constructor(friends: Player[], includesFriendsAlts = false) {
    this.description = `## All your friends, everywhere\nAlways see who's there to play with\n\u200b${friends.length ? '' : code('No frens online')}`
    this.footer = {
      icon_url: includesFriendsAlts ? 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless' : undefined,
      text: includesFriendsAlts ? "Everyone's alts included" : "Adding your friends' alts, this may take a while...",
    }
    if (friends.length) this.color = EmbedColors.Success
    this._populateFields(friends)
  }

  private _populateFields(friends: Player[]) {
    for (const server of Object.values(servers)) {
      const field = getCharactersByServer(friends, server)

      if (field) this.fields.push(field)
    }
  }
}

function getCharactersByServer(players: Player[], server: string) {
  players = players.filter((p) => servers[p.serverId] == server).sort((a, b) => a.name.localeCompare(b.factionId))
  return players.length
    ? {
        name: `${emojis[server.toLowerCase()]} ${server}`,
        value: `${code(
          players.map((player) => `${getFaction(factions[player.factionId])} ${player.outfitTag ? `[${player.outfitTag}] ` : ''}${player.name.padEnd(25)}`).join('\n'),
          'css'
        )}`,
      }
    : null
}
