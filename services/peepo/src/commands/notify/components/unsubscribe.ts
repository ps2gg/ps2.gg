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
      label: 'Unsubscribe',
      style: ButtonStyle.Secondary,
      disabled: false,
    },
    processed: {
      label: 'Unsubscribe',
      style: ButtonStyle.Secondary,
      disabled: false,
    },
  },
}
