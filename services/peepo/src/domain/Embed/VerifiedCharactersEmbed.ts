import { factions } from '@ps2gg/common/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

function printFriends(players: Player[], faction: string): string {
  players = players.filter((f) => factions[f.factionId] == faction)

  return players.length ? `${faction}\n ${code(players.map((friend) => `[${friend.outfitTag || '/'}] ${friend.name}`).join('\n'))} \n` : ''
}

export class VerifiedCharactersEmbed implements APIEmbed {
  title = 'Verified Characters'
  description: string

  constructor(friends: Player[]) {
    this.description = friends.length
      ? `${printFriends(friends, 'NC')} ${printFriends(friends, 'TR')} ${printFriends(friends, 'VS')}  ${printFriends(friends, 'NS')}`
      : code('No Characters verified.')
  }
}
