import { factions } from '@ps2gg/common/constants'
import { emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField, APIEmbedFooter } from 'discord.js'

export class VerifiedCharactersEmbed implements APIEmbed {
  description: string
  fields: APIEmbedField[] = []
  footer: APIEmbedFooter

  constructor(characters: Player[], isThirdPerson = false) {
    this.description = isThirdPerson ? '## Everyone we know them as\n' : '## Everyone we know you as\n'
    if (!characters.length) this.description += code(isThirdPerson ? 'They have no characters linked' : 'You have no characters linked')
    if (!isThirdPerson) this.footer = { text: 'To link more characters, use /verify' }

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
