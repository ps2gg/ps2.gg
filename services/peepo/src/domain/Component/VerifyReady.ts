import { ComponentConfig } from '@ps2gg/discord/command'
import { ButtonStyle } from 'discord.js'

export const VerifyReady: ComponentConfig = {
  id: 'verify.ready',
  state: {
    default: {
      label: 'Verify',
      style: ButtonStyle.Primary,
    },
    processing: {
      label: 'Waiting for login (15s)',
      style: ButtonStyle.Primary,
      disabled: true,
    },
    processed: {
      label: 'Verified!',
      style: ButtonStyle.Success,
      disabled: true,
    },
  },
}
