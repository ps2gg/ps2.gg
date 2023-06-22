import { bases, continents, servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { Population } from '@ps2gg/population/types'
import { APIEmbed } from 'discord.js'

export class NotificationEmbed implements APIEmbed {
  color = EmbedColors.Success
  description?: string
  footer?: { text: string }

  constructor(readonly id: string, readonly population: Population) {
    const { tr, nc, vs } = population
    const now = Math.floor(new Date().getTime() / 1000)
    const split = id.split('.')
    const type = split[0]

    if (type === 'ESF') {
      this.setESFMetaData(split, now, tr, nc, vs)
    } else if (continents[split[0]]) {
      this.setContinentMetaData(split, now, tr, nc, vs)
    } else if (bases[split[0]]) {
      this.setBaseMetaData(split, now, tr, nc, vs)
    }
  }

  setText(now: number, event: string, server: string, continent: string, tr: number, nc: number, vs: number): void {
    this.description = `### Babe! It's <t:${now}:t>, time for ${event} Farm on ${server}${continent ? `, ${continent}` : ''}!`
    this.footer = {
      text: `Current Population: TR: ${tr} | NC: ${nc} | VS: ${vs}`,
    }
  }

  setESFMetaData(split: string[], now: number, tr: number, nc: number, vs: number): void {
    const { event, server, continent } = this.getESFMetaData(split)
    this.setText(now, event, server, continent, tr, nc, vs)
  }

  getESFMetaData(split: string[]): { event: string; server: string; continent: string } {
    const event = 'ESF'
    const continent = continents[split[1]]
    const server = servers[split[2]]
    return { event, server, continent }
  }

  setContinentMetaData(split: string[], now: number, tr: number, nc: number, vs: number): void {
    const { event, server } = this.getContinentMetaData(split)
    this.setText(now, event, server, null, tr, nc, vs)
  }

  getContinentMetaData(split: string[]): { event: string; server: string } {
    const event = continents[split[0]]
    const server = servers[split[1]]
    return { event, server }
  }

  setBaseMetaData(split: string[], now: number, tr: number, nc: number, vs: number): void {
    const { event, server } = this.getBaseMetaData(split)
    this.setText(now, event, server, null, tr, nc, vs)
  }

  getBaseMetaData(split: string[]): { event: string; server: string } {
    const event = bases[split[0]]
    const server = servers[split[1]]
    return { event, server }
  }
}
