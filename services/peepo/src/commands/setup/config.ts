import { CommandConfig } from '@ps2gg/discord/command'
import { PermissionFlagsBits } from 'discord.js'

export const Setup: CommandConfig = {
  name: 'setup',
  description: 'Sets up various admin tools',
  permissions: PermissionFlagsBits.Administrator,
}
