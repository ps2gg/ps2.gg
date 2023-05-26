import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const EarlyAccessJoin: ComponentConfig = {
  id: 'setup.early-access-join',
  state: {
    default: {
      label: 'Join',
      style: ButtonStyle.Primary,
    },
    processing: {
      label: 'Join',
      style: ButtonStyle.Primary,
    },
    processed: {
      label: 'Join',
      style: ButtonStyle.Primary,
    },
  },
}
