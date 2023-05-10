import { servers } from '@ps2gg/common/constants'
import { CommandConfig } from '@ps2gg/discord/command'

export const fights: CommandConfig = {
  name: 'nasons',
  description: 'Unsubscribes you from nasons farm',
  options: [
    {
      type: 'string',
      name: 'server',
      description: 'The server you play on',
      required: true,
      choices: ['All', ...Object.values(servers)],
    },
  ],
}

export type FightsOptions = {
  server: string
}
