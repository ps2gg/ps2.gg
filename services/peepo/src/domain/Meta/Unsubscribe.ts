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
      name: 'event',
      description: 'Which event to unsubscribe from',
      required: true,
      autocomplete: true,
    },
  ],
}

export type UnsubscribeOptions = {
  server: string
  event: string
}
