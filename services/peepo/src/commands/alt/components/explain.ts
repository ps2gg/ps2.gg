import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const explain: ComponentConfig = {
  id: 'alt-explain',
  state: {
    default: {
      label: 'Explain',
      style: ButtonStyle.Secondary,
      disabled: false,
    },
    processing: {
      label: 'Generating Graphs...',
      style: ButtonStyle.Secondary,
      disabled: true,
    },
    processed: {
      label: 'Explain',
      style: ButtonStyle.Secondary,
    },
  },
}
