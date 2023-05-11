import { servers } from '@ps2gg/common/constants'
import { CommandConfig } from '@ps2gg/discord/command'

export const Notify: CommandConfig = {
  name: 'notify',
  description: 'Get notifications when something happens ingame',
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
      name: 'scope',
      description: 'Categories ▸ c: continent, f: facility',
      required: true,
      autocomplete: true,
    },
  ],
}

export type NotifyOptions = {
  server: string
  scope: string
}
