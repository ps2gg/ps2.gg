import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export function getFailureEmbed(server: string, scope: string): APIEmbed {
  return {
    title: `No population data for ${scope} on ${server}`,
    description: `Are you sure ${scope} exists?`,
    color: EmbedColors.Failure,
  }
}
