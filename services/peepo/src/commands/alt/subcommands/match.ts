import { CommandConfig } from '@ps2gg/discord/command'

export const Match: CommandConfig = {
  name: 'match',
  description: 'Shows all alt characters of a given player',
  options: [
    {
      type: 'string',
      name: 'name',
      description: 'ingame name',
      required: true,
      autocomplete: true,
    },
    {
      type: 'boolean',
      name: 'full',
      description: 'show stats for all classes',
    },
  ],
}

export type MatchOptions = {
  name: string
  full: boolean
}
