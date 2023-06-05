import { setupDiscordClient } from '@ps2gg/discord/client'
import { readFileSync } from 'fs'
import { DiscordController } from './infrastructure/Controller/DiscordController'
import { PopulationEvent } from './infrastructure/EventStream/PopulationUpdate'
import { AltCommand } from './infrastructure/SlashCommand/Alt'
import { NotifyCommand } from './infrastructure/SlashCommand/Notify'
import { SetupCommand } from './infrastructure/SlashCommand/Setup'
import { UnsubscribeCommand } from './infrastructure/SlashCommand/Unsubscribe'

const discord = setupDiscordClient({
  id: '715535257939607602',
  token: readFileSync('/run/secrets/peepo-token', 'utf-8'),
  activity: 'Sees all',
  commands: [new AltCommand(), new NotifyCommand(), new UnsubscribeCommand(), new SetupCommand()],
  events: [new PopulationEvent()],
})

new DiscordController(discord)
