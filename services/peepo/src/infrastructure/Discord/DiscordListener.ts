import { DiscordController } from '@ps2gg/discord/controllers'
import { logMessageAndInteraction } from '@ps2gg/discord/logging'
import { logGuildMemberAdd } from '@ps2gg/discord/util'
import { Message } from 'discord.js'

export class DiscordListener {
  constructor(discord: DiscordController) {
    discord.client.on('guildMemberAdd', (member) => {
      discord.onGuildMemberAdd(member, [(member) => logGuildMemberAdd(discord.client, member)])
    })

    discord.client.on('messageCreate', (message: Message) => {
      discord.onMessage(message, [logMessageAndInteraction])
    })

    discord.client.on('interactionCreate', (interaction) => {
      discord.onInteraction(interaction, [logMessageAndInteraction])
    })
  }
}
