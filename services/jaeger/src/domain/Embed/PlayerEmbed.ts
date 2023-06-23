import { factions } from '@ps2gg/common/constants'
import { code } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { APIEmbed } from 'discord.js'

export class PlayerEmbed implements APIEmbed {
  description?: string
  fields: any[]

  constructor(player: Player) {
    this.description =
      '### Selected character:\n' +
      code(`${player.outfitTag ? `[${player.outfitTag}] ` : ''}${player.name} · ${factions[player.factionId]}\n`, 'css') +
      '\n**Next step:**\n Hit the button below and log in within 15 seconds'
  }
}
