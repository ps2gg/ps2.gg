import { servers } from '@ps2gg/common/constants'
import { CommandConfig } from '@ps2gg/discord/command'

export const Notify: CommandConfig = {
  name: 'notify',
  description: "Get notifications when it's worth logging in",
  options: [
    {
      type: 'string',
      name: 'server',
      description: 'The server you play on',
      required: true,
      choices: Object.values(servers),
    },
    {
      type: 'string',
      name: 'event',
      description: 'What you get notified for. (Fight, Unlock, Vehicles)',
      required: true,
      autocomplete: true,
    },
  ],
}

export type NotifyOptions = {
  server: string
  event: string
}
