import { factions } from '@ps2gg/common/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

function printFriends(friends: Player[], faction: string): string {
  friends = friends.filter((f) => factions[f.factionId] == faction)

  return friends.length ? `${faction} \n${code(friends.map((friend) => `${friend.outfitTag ? `[${friend.outfitTag}]` : ''} ${friend.name}`).join('\n'))} \n` : ''
}

export class FriendsEmbed implements APIEmbed {
  title = 'Online Friends'
  description: string

  constructor(friends: Player[]) {
    this.description = friends.length
      ? `${printFriends(friends, 'NC')} ${printFriends(friends, 'TR')} ${printFriends(friends, 'VS')}  ${printFriends(friends, 'NS')}`
      : code('No frens online :(')
  }
}
