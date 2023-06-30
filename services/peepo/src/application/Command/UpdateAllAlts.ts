import { updateAllAlts } from '@ps2gg/alts/ws'
import { APIEmbed } from 'discord.js'
import { getAlts } from '../Query/GetAlts'

export async function updateAllAltsCommand(name: string): Promise<APIEmbed> {
  await updateAllAlts(name)
  return getAlts(name)
}
