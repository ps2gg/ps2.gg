import { EmbedColors } from '@ps2gg/discord/constants'
import { Population } from '@ps2gg/population/types'
import { APIEmbed } from 'discord.js'

export function getNotifyEmbed(server: string, scope: string, population: Population, type: string): APIEmbed {
  const { tr, vs, nc } = population
  const source = type === 'f:' ? 'Falcon (census.lithafalcon.cc)' : 'Pomf (saerro.ps2.live)'
  return {
    title: `You are now subscribed to ${scope} Farm on ${server}!`,
    color: EmbedColors.Success,
    footer: {
      text: `Minimum Players: 12\nCurrent Population: ${tr}TR · ${nc}NC · ${vs}VS\nPopulation data kindly provided by ${source}`,
    },
  }
}
