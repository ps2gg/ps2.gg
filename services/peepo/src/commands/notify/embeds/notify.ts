import { getServerTimezone } from '@ps2gg/common/util'
import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { Population } from '@ps2gg/population/types'
import { APIEmbed } from 'discord.js'

export function getNotifyEmbed(server: string, event: string, population: Population, type: string): APIEmbed {
  const { tr, vs, nc } = population
  const source = type === 'Fight' ? 'Falcon (census.lithafalcon.cc)' : 'Pomf (saerro.ps2.live)'
  return {
    title: `Notifications are underway!`,
    color: EmbedColors.Success,
    fields: [
      {
        name: 'Server',
        value: code(server),
        inline: true,
      },
      {
        name: 'Event',
        value: code(event),
        inline: true,
      },
      {
        name: 'Between',
        value: code(`16PM - 2AM ${getServerTimezone(server)}`),
        inline: true,
      },
      {
        name: 'Min. TR',
        value: code('12 Players'),
        inline: true,
      },
      {
        name: 'Min. NC',
        value: code('12 Players'),
        inline: true,
      },
      {
        name: 'Min. VS',
        value: code('12 Players'),
        inline: true,
      },

      {
        name: 'Current Population',
        value: code(`${tr}TR · ${nc}NC · ${vs}VS`),
      },
    ],
    footer: {
      text: `Population data kindly provided by ${source}`,
    },
  }
}
