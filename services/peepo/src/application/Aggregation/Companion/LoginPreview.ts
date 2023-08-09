import { PlayerClient } from '@ps2gg/players/client'
import { User } from '@ps2gg/users/types'
import { InteractionReplyOptions } from 'discord.js'
import { LoginPreviewEmbed } from '../../../domain/Embed/Companion/LoginPreview'

export async function getLoginPreview(user: User): Promise<InteractionReplyOptions> {
  const { characterIds } = user
  const players = new PlayerClient()
  const characters = await players.findMany(characterIds)
  const loginPreview = new LoginPreviewEmbed(characters)
  return {
    embeds: [loginPreview],
    ephemeral: true,
  }
}
