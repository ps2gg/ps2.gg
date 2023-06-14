import { setupDiscordClient } from '@ps2gg/discord/client'
import { readFileSync } from 'fs'
import { DiscordListener } from './infrastructure/Discord/DiscordListener'
import { PopulationEvent } from './infrastructure/EventStream/PopulationUpdate'
import { AltCommand } from './infrastructure/SlashCommand/Alt'
import { NotifyCommand } from './infrastructure/SlashCommand/Notify'
import { SeshCommand } from './infrastructure/SlashCommand/Sesh'
import { SetupCommand } from './infrastructure/SlashCommand/Setup'
import { UnsubscribeCommand } from './infrastructure/SlashCommand/Unsubscribe'

const discord = setupDiscordClient({
  id: '715535257939607602',
  token: readFileSync('/run/secrets/peepo-token', 'utf-8'),
  activity: 'Sees all',
  commands: [new AltCommand(), new NotifyCommand(), new UnsubscribeCommand(), new SetupCommand(), new SeshCommand()],
  events: [new PopulationEvent()],
})

new DiscordListener(discord)
