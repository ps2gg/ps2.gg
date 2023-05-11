import { servers } from '@ps2gg/common/constants'
import { CommandConfig } from '@ps2gg/discord/command'

export const Unsubscribe: CommandConfig = {
  name: 'unsubscribe',
  description: 'Unsubscribe from an event',
  options: [
    {
      type: 'string',
      name: 'server',
      description: 'The server you play on',
      required: true,
      choices: ['All', ...Object.values(servers)],
    },
    {
      type: 'string',
      name: 'scope',
      description: 'Categories ▸ f: facility, c: continent',
      required: true,
      autocomplete: true,
    },
  ],
}

export type UnsubscribeOptions = {
  server: string
  scope: string
}
