import { CommandConfig } from '@ps2gg/discord/command'

export const Verify: CommandConfig = {
  name: 'verify',
  description: 'Verify your ingame character.',
  options: [
    {
      type: 'string',
      name: 'name',
      description: 'your ingame name',
      required: true,
      autocomplete: true,
    },
  ],
}

export type VerifyOptions = {
  name: string
}
