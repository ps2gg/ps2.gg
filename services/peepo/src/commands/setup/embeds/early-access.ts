import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export function getEarlyAccessEmbed(): APIEmbed {
  return {
    color: EmbedColors.System,
    description:
      '## Here you can try new features that are still in development.\n\n **Please note:** We will release features in their most minimal shape possible. What you see here is not reflective of the final product. Bugs and other issues may be present as well.\n\n**Join with the button below.**',
  }
}
