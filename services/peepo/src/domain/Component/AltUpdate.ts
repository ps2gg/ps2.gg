import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const AltUpdate: ComponentConfig = {
  id: 'alt-update',
  state: {
    default: {
      label: 'Update',
      style: ButtonStyle.Secondary,
    },
    processing: {
      label: 'Updating...',
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    processed: {
      label: 'Updated',
      style: ButtonStyle.Secondary,
      emoji: '✅',
      disabled: true,
    },
  },
}
