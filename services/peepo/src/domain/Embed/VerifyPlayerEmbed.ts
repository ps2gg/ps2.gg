import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

export class VerifyPlayerEmbed implements APIEmbed {
  description: string

  constructor(player: Player) {
    this.description = '### Just one more step\n' + `Press "Verify" below and log in as **${player.name}**, so we know it's you.`
  }
}
