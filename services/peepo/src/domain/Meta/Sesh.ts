import { CommandConfig } from '@ps2gg/discord/command'

export const Sesh: CommandConfig = {
  name: 'sesh',
  description: 'Start a gaming sesh with Peepo',
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

export type SeshOptions = {
  name: string
}
