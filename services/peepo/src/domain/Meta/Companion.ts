import { CommandConfig } from '@ps2gg/discord/command'

export const Companion: CommandConfig = {
  name: 'companion',
  description: 'Get the most out of the game with suggestions from Peepo',
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
