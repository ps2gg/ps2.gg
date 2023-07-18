import { getAltMatches } from '@ps2gg/alts/ws'
import { AltTreeEmbed } from '../../../domain/Embed/AltTreeEmbed'

export async function getAltsTree(name: string): Promise<AltTreeEmbed> {
  const { result } = await getAltMatches(name)
  return new AltTreeEmbed(result as { alts: any[]; tree: any }, name)
}
