import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

export class SeshFriendsEmbed implements APIEmbed {
  title = 'Friends'
  description: string

  constructor(friends: Player[]) {
    this.description = code(friends.length ? friends.map((friend) => `**${friend.name}**`).join('\n') : 'No frens online')
  }
}
