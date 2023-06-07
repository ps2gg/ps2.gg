import { Alt } from '@ps2gg/alts/types'
import { getAltMatches } from '@ps2gg/alts/ws'
import { APIEmbed } from 'discord.js'
import { AltMatchEmbed } from '../../domain/Embed/AltMatch'

export class GetAlts {
  constructor(readonly name: string) {}

  async execute(): Promise<APIEmbed> {
    const { result } = await getAltMatches(this.name)

    if (result.error) {
      throw new Error(`Found no alts for ${this.name}`)
    } else if (result.alts.length > 16) {
      throw new Error(`Found too many alts for ${this.name}`)
    } else {
      return new AltMatchEmbed(result.alts as Alt[])
    }
  }
}
