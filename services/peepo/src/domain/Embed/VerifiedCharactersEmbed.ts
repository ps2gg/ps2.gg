import { factions } from '@ps2gg/common/constants'
import { emojis } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed, APIEmbedField } from 'discord.js'

export class VerifiedCharactersEmbed implements APIEmbed {
  description = '## Everyone we know you as'
  footer = { text: 'To link more characters, use /verify' }
  fields: APIEmbedField[] = []

  constructor(friends: Player[]) {
    if (!friends.length) this.description += code('No characters linked')

    const nc = getFriendsByFaction(friends, 'NC')
    const tr = getFriendsByFaction(friends, 'TR')
    const vs = getFriendsByFaction(friends, 'VS')

    if (nc) this.fields.push(nc)
    if (tr) this.fields.push(tr)
    if (vs) this.fields.push(vs)
  }
}

function getFriendsByFaction(players: Player[], faction: string): APIEmbedField | null {
  players = players.filter((f) => factions[f.factionId] == faction)
  return players.length
    ? {
        name: `${emojis[faction.toLowerCase()]} ${faction}`,
        value: `${code(players.map((friend) => `${friend.outfitTag ? `[${friend.outfitTag}] ` : ''}${friend.name}`).join('\n'))}`,
      }
    : null
}
