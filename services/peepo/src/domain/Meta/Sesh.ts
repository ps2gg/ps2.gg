import { CommandConfig } from '@ps2gg/discord/command'

export const Sesh: CommandConfig = {
  name: 'sesh',
  description: 'Start a gaming sesh with Peepo',
  options: [
    {
      type: 'string',
      name: 'player',
      description: 'your ingame name',
      autocomplete: true,
    },
  ],
}

export type SeshOptions = {
  player: string
}
