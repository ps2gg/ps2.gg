import { factions } from '@ps2gg/common/constants'
import { emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField } from 'discord.js'

export class VerifiedCharactersEmbed implements APIEmbed {
  description = '## Everyone we know you as\n'
  footer = { text: 'To link more characters, use /verify' }
  fields: APIEmbedField[] = []

  constructor(characters: Player[]) {
    if (!characters.length) this.description += code('No characters linked')

    const nc = getCharactersByFaction(characters, 'NC')
    const tr = getCharactersByFaction(characters, 'TR')
    const vs = getCharactersByFaction(characters, 'VS')
    const ns = getCharactersByFaction(characters, 'NS')

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
        value: `${code(players.map((friend) => `${friend.outfitTag ? `[${friend.outfitTag}] ` : ''}${friend.name}`).join('\n'))}`,
      }
    : null
}
