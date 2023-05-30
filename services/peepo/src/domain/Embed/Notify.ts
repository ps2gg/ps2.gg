import { getServerTimezone } from '@ps2gg/common/util'
import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Population } from '@ps2gg/population/types'
import { APIEmbed } from 'discord.js'

export class NotifyEmbed implements APIEmbed {
  title = 'Notifications are underway!'
  color = EmbedColors.Success
  fields: any[]
  footer: any

  constructor(server: string, event: string, population: { tr: number; vs: number; nc: number }) {
    const { tr, vs, nc } = population
    const source = 'Pomf (saerro.ps2.live)'
    this.fields = [
      {
        name: 'Server',
        value: code(server),
        inline: true,
      },
      {
        name: 'Event',
        value: code(event),
      },
      {
        name: 'Min. Population',
        value: code('6TR · 6NC · 6VS'),
        inline: true,
      },
      {
        name: 'Between',
        value: code(`12PM-2AM ${getServerTimezone(server)}`),
        inline: true,
      },
      {
        name: 'Current Population',
        value: code(`${tr}TR · ${nc}NC · ${vs}VS`),
      },
    ]
    this.footer = {
      text: `Population data kindly provided by ${source}`,
    }
  }
}
