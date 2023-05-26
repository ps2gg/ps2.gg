import { setupDiscordClient } from '@ps2gg/discord/client'
import { logMessageAndInteraction } from '@ps2gg/discord/logging'
import { logGuildMemberAdd } from '@ps2gg/discord/util'
import { Message } from 'discord.js'
import { readFileSync } from 'fs'
import { AltCommand } from './commands/alt/command'
import { redirectLegacyAltSpy } from './commands/alt/redirect'
import { removeNoneThreadedMessage } from './commands/alt/threads'
import { NotifyCommand } from './commands/notify/command'
import { SetupCommand } from './commands/setup/command'
import { UnsubscribeCommand } from './commands/unsubscribe/command'
import { PopulationEvent } from './events/population/event'

/**
 * Discord setup
 */
const discord = setupDiscordClient({
  id: '715535257939607602',
  token: readFileSync('/run/secrets/peepo-token', 'utf-8'),
  activity: 'Sees all',
  commands: [new AltCommand(), new NotifyCommand(), new UnsubscribeCommand(), new SetupCommand()],
  events: [new PopulationEvent()],
})

discord.client.on('guildMemberAdd', (member) => {
  discord.onGuildMemberAdd(member, [(member) => logGuildMemberAdd(discord.client, member)])
})

discord.client.on('messageCreate', (message: Message) => {
  discord.onMessage(message, [logMessageAndInteraction, redirectLegacyAltSpy, removeNoneThreadedMessage])
})

discord.client.on('interactionCreate', (interaction) => {
  discord.onInteraction(interaction, [logMessageAndInteraction])
})
