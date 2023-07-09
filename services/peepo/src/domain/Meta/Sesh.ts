import { CommandConfig } from '@ps2gg/discord/command'

export const Sesh: CommandConfig = {
  name: 'sesh',
  description: 'Have peepo show you the best fights, as you play',
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
