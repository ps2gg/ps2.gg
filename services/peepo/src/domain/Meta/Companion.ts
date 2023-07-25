import { CommandConfig } from '@ps2gg/discord/command'

export const Companion: CommandConfig = {
  name: 'companion',
  description: 'Let peepo help you get the most out of the game',
  options: [
    {
      type: 'string',
      name: 'player',
      description: 'your ingame name',
      autocomplete: true,
    },
  ],
}

export type CompanionOptions = {
  player: string
}
