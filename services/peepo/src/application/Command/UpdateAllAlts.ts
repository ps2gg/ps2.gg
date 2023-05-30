import { updateAllAlts } from '@ps2gg/alts/ws'
import { APIEmbed } from 'discord.js'
import { GetAlts } from '../Query/GetAlts'

export class UpdateAllAlts {
  constructor(readonly name: string) {}

  async execute(): Promise<APIEmbed> {
    await updateAllAlts(this.name)
    return new GetAlts(this.name).execute()
  }
}
