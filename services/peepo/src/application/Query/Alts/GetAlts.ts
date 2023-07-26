import { Alt } from '@ps2gg/alts/types'
import { getAltMatches } from '@ps2gg/alts/ws'
import { APIEmbed } from 'discord.js'
import { AltMatchEmbed } from '../../../domain/Embed/Alts/AltMatchEmbed'

export async function getAlts(name: string, full?: boolean): Promise<APIEmbed> {
  const { result } = await getAltMatches(name)

  if (result.error) {
    throw new Error(`Found no alts for ${name}`)
  } else if (result.alts.length > 16) {
    throw new Error(`Found too many alts for ${name}`)
  } else {
    return new AltMatchEmbed(result.alts as Alt[], full)
  }
}
