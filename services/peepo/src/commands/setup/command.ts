import { Command, CommandResponse, Component, ComponentResponse, SubCommand } from '@ps2gg/discord/command'
import { addRoleFromInteraction } from '@ps2gg/discord/util'
import { ButtonInteraction } from 'discord.js'
import { EarlyAccessJoin } from './components/early-access-join'
import { Setup } from './config'
import { EarlyAccessGatewayEmbed } from './embeds/early-access'
import { EarlyAccessJoinEmbed } from './embeds/early-access-join'
import { EarlyAccess } from './subcommands/early-access'

@Command(Setup)
export class SetupCommand {
  @SubCommand(EarlyAccess)
  async earlyAccessGateway(): Promise<CommandResponse> {
    return {
      interactionContext: [],
      embeds: [EarlyAccessGatewayEmbed],
    }
  }

  @Component(EarlyAccessJoin)
  async earlyAccessJoin(interactionContext: string[], interaction: ButtonInteraction): Promise<void> {
    addRoleFromInteraction('Early Access', interaction)
    interaction.followUp(EarlyAccessJoinEmbed)
  }
}
