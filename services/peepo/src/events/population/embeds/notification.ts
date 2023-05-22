import { servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { EventResponse } from '@ps2gg/events/ws'
import { APIEmbed } from 'discord.js'

export function getNotificationEmbed(scope: string, server: string): APIEmbed {
  const now = Math.floor(new Date().getTime() / 1000)
  return {
    color: EmbedColors.Success,
    description: `Babe! It's <t:${now}:t>, time for ${scope} Farm on ${server}!`,
  }
}
