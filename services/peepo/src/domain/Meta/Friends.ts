import { CommandConfig } from '@ps2gg/discord/command'

export const Friends: CommandConfig = {
  name: 'friends',
  description: 'See all your friends on every server, alt matched!',
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
  player: string
}
