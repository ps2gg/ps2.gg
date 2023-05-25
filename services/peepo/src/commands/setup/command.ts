import { Command, CommandResponse, Component, ComponentResponse, SubCommand } from '@ps2gg/discord/command'
import { ButtonInteraction } from 'discord.js'
import { EarlyAccessJoin } from './components/early-access-join'
import { Setup } from './config'
import { getEarlyAccessEmbed } from './embeds/early-access'
import { EarlyAccess } from './subcommands/early-access'

@Command(Setup)
export class SetupCommand {
  @SubCommand(EarlyAccess)
  async earlyAccessGateway(): Promise<CommandResponse> {
    const gatewayEmbed = getEarlyAccessEmbed()
    return {
      embeds: [gatewayEmbed],
      ephemeral: true,
    }
  }

  @Component(EarlyAccessJoin)
  async earlyAccessJoin(interaction: ButtonInteraction): Promise<ComponentResponse> {
    console.log(interaction.user.id)
    // Assign early access role to user
    // TODO: make discord user object available to components
  }
}
