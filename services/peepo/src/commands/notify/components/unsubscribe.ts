import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const Unsubscribe: ComponentConfig = {
  id: 'notify.unsubscribe',
  state: {
    default: {
      label: 'Unsubscribe',
      style: ButtonStyle.Secondary,
      disabled: false,
    },
    processing: {
      label: 'Processing...',
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    processed: {
      label: 'Unsubscribed',
      style: ButtonStyle.Secondary,
      emoji: '✅',
      disabled: true,
    },
  },
}
