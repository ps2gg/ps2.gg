import { getAltMatches } from '@ps2gg/alts/ws'
import { AltTreeEmbed } from '../../domain/Embed/AltTree'

export class GetAltsTree {
  constructor(readonly name: string) {}

  async execute(): Promise<AltTreeEmbed> {
    const { result } = await getAltMatches(this.name)
    return new AltTreeEmbed(result as { alts: any[]; tree: any }, this.name)
  }
}
