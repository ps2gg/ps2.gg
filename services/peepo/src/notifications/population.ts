/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { servers } from '@ps2gg/common/constants'
import { EmbedColors } from '@ps2gg/discord/constants'
import { Discord } from '@ps2gg/discord/controllers'
import { EventResponse } from '@ps2gg/events/ws'
import { UsersClient } from '@ps2gg/users/client'
import { User } from 'discord.js'

export async function handlePopulationUpdate(message: EventResponse, discord: Discord): Promise<void> {
  const users = new UsersClient()
  const { subscription } = message.data
  const { discordId } = await users.getUser(subscription.userId)

  if (!discordId) return // Shouldn't happen until Overlay subscriptions are a thing
  const user: User = await discord.client.users.fetch(discordId)
  const now = Math.floor(new Date().getTime() / 1000)

  user.send({
    embeds: [
      {
        color: EmbedColors.Success,
        description: `Babe! It's <t:${now}:t>, time for ${subscription.scope} Farm on ${servers[message.data.serverId]}!`,
        // TODO: Add unsubscribe button
      },
    ],
  })
}
