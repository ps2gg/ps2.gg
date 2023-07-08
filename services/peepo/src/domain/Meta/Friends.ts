import { CommandConfig } from '@ps2gg/discord/command'

export const Friends: CommandConfig = {
  name: 'friends',
  description: 'Shows a list of all online friends of your verified Characters',
  options: [
    {
      type: 'string',
      name: 'player',
      description: 'your ingame name',
      autocomplete: true,
    },
  ],
}

export type FriendsOptions = {
  name: string
}
