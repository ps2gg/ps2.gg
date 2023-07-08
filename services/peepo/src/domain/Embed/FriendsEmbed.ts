import { factions } from '@ps2gg/common/constants'
import { emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class FriendsEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[] = []
  footer: APIEmbedFooter

  constructor(friends: Player[], includesFriendsAlts = false) {
    this.description = `## Global alt-wide friends\n${friends.length ? '' : code('No frens online')}`
    this.footer = {
      icon_url: includesFriendsAlts ? 'https://cdn.discordapp.com/emojis/715544975730802688.webp?size=240&quality=lossless' : undefined,
      text: includesFriendsAlts ? "Everyone's alts included" : "Adding your friends' alts...",
    }

    const nc = getCharactersByFaction(friends, 'NC')
    const tr = getCharactersByFaction(friends, 'TR')
    const vs = getCharactersByFaction(friends, 'VS')
    const ns = getCharactersByFaction(friends, 'NS')

    if (nc) this.fields.push(nc)
    if (tr) this.fields.push(tr)
    if (vs) this.fields.push(vs)
    if (ns) this.fields.push(ns)
  }
}

function getCharactersByFaction(players: Player[], faction: string): APIEmbedField | null {
  players = players.filter((f) => factions[f.factionId] == faction)
  return players.length
    ? {
        name: `${emojis[faction.toLowerCase()]} ${faction}`,
        value: `${code(players.map((player) => `${player.outfitTag ? `[${player.outfitTag}] ` : ''}${player.name.padEnd(25)}`).join('\n'))}`,
      }
    : null
}
