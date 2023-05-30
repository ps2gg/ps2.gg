import { Alt } from '@ps2gg/alts/types'
import { APIEmbed } from 'discord.js'

export class AltMatchWarningEmbed implements APIEmbed {
  title: string
  description: string

  constructor(name: string, matches: any & { alts: Alt[] }) {
    if (matches) {
      this.title = `Found too many matches for ${name}.`
      this.description = `More than 16 matches (${matches.alts.length}).`
    } else {
      this.title = `No matches found for ${name}`
    }
  }
}
