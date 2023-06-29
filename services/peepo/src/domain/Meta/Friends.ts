import { CommandConfig } from '@ps2gg/discord/command'

export const Friends: CommandConfig = {
  name: 'friends',
  description: 'Shows a list of all your friends',
  options: [
    {
      type: 'string',
      name: 'name',
      description: 'your ingame name, will be removed as soon as verification is stable',
      required: false,
      autocomplete: true,
    },
  ],
}

export type FriendsOptions = {
  name: string
}
