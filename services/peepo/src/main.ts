import { setupDiscordGateway } from '@ps2gg/discord/client'
import { readFileSync } from 'fs'
import { DiscordListener } from './infrastructure/Discord/DiscordListener'
import { PopulationEvent } from './infrastructure/EventStream/PopulationUpdate'
import { AltCommand } from './infrastructure/SlashCommand/Alt'
import { CompanionCommand } from './infrastructure/SlashCommand/Companion'
import { FriendsCommand } from './infrastructure/SlashCommand/Friends'
import { NotifyCommand } from './infrastructure/SlashCommand/Notify'
import { SetupCommand } from './infrastructure/SlashCommand/Setup'
import { UnsubscribeCommand } from './infrastructure/SlashCommand/Unsubscribe'
import { VerifyCommand } from './infrastructure/SlashCommand/Verify'
import { WhoAmICommand } from './infrastructure/SlashCommand/WhoAmI'
import { bootstrap } from './worker'

const discord = setupDiscordGateway({
  id: '715535257939607602',
  token: readFileSync('/run/secrets/peepo-token', 'utf-8'),
  activity: 'Sees all',
  commands: [
    new AltCommand(),
    new NotifyCommand(),
    new UnsubscribeCommand(),
    new SetupCommand(),
    new CompanionCommand(),
    new FriendsCommand(),
    new VerifyCommand(),
    new WhoAmICommand(),
  ],
  events: [new PopulationEvent()],
  restrictions: {
    development: {
      channels: ['1107543568807116920'],
    },
    staging: {
      channels: ['1111585621711007804', '1111583463041159228'],
    },
    production: {
      channels: ['944930552753029220', '1107815786728403074'],
    },
  },
})

new DiscordListener(discord)
bootstrap()
