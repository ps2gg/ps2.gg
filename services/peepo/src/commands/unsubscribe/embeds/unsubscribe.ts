import { servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'

export function getUnsubscribeEmbed(scope: string, server: string): APIEmbed {
  return {
    title: `Unsubscribed!`,
    description: `You will no longer receive notifications for ${scope} ${server === 'All' ? '' : ` on ${servers[server]}`}`,
    color: EmbedColors.Success,
  }
}
