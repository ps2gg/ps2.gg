import { CommandConfig } from '@ps2gg/discord/command'

export const Sesh: CommandConfig = {
  name: 'sesh',
  description: 'Let peepo help you find the best fights on all servers, right as you play',
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
