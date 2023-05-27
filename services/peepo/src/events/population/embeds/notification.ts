import { getBases } from '@ps2gg/census/collections'
import { continents, servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { Population } from '@ps2gg/population/types'
import { APIEmbed } from 'discord.js'

export async function getNotificationEmbed(scope: string, population: Population): Promise<APIEmbed> {
  const now = Math.floor(new Date().getTime() / 1000)
  const { tr, nc, vs } = population
  const bases = await getBases()
  const split = scope.split('.')
  const type = split[0]
  let event, server, continent

  if (type === 'ESF') {
    event = 'ESF'
    continent = continents[split[1]]
    server = servers[split[2]]
  }
  // continent unlock
  else if (continents[split[0]]) {
    event = continents[split[0]]
    server = servers[split[1]]
  }
  // base fight
  else if (bases[split[0]]) {
    event = bases[split[0]]
    server = servers[split[1]]
  }

  return {
    color: EmbedColors.Success,
    description: `### Babe! It's <t:${now}:t>, time for ${event} Farm on ${server}${continent ? `, ${continent}` : ''}!`,
    footer: {
      text: `Current Population: TR: ${tr} | NC: ${nc} | VS: ${vs}`,
    },
  }
}
