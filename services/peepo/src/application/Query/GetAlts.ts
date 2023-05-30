import { Alt } from '@ps2gg/alts/types'
import { getAltMatches } from '@ps2gg/alts/ws'
import { APIEmbed } from 'discord.js'
import { AltMatchEmbed } from '../../domain/Embed/AltMatch'
import { AltMatchErrorEmbed } from '../../domain/Embed/AltMatchError'
import { AltMatchWarningEmbed } from '../../domain/Embed/AltMatchWarning'

export class GetAlts {
  constructor(readonly name: string) {}

  async execute(): Promise<APIEmbed> {
    const { result } = await getAltMatches(this.name)

    if (result.error) {
      return new AltMatchErrorEmbed(this.name, result)
    } else if (result.alts.length > 16) {
      return new AltMatchWarningEmbed(this.name, result)
    } else {
      return new AltMatchEmbed(result.alts as Alt[])
    }
  }
}
