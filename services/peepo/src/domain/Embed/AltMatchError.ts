import { Alt } from '@ps2gg/alts/types'
import { APIEmbed } from 'discord.js'

export class AltMatchErrorEmbed implements APIEmbed {
  title: string
  description: string

  constructor(name: string, matches: any & { alts: Alt[] }) {
    this.title = `Found no alts for ${name}.`
    this.description = matches.error
  }
}
