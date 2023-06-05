import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const AltReset: ComponentConfig = {
  id: 'alt-reset',
  state: {
    default: {
      label: 'Reset View',
      style: ButtonStyle.Secondary,
      disabled: false,
    },
    processing: {
      label: 'Resetting...',
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    processed: {
      label: 'Reset View',
      style: ButtonStyle.Secondary,
    },
  },
}
