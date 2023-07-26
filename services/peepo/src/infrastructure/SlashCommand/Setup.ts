import { Command, CommandResponse, Component, SubCommand } from '@ps2gg/discord/command'
import { addRoleFromInteraction } from '@ps2gg/discord/util'
import { ButtonInteraction } from 'discord.js'
import { EarlyAccessJoinComponent } from '../../domain/Component/EarlyAccess/EarlyAccessJoin'
import { EarlyAccessGatewayEmbed } from '../../domain/Embed/EarlyAccess/EarlyAccessGateway'
import { Setup } from '../../domain/Meta/Setup'
import { SetupEarlyAccess } from '../../domain/Meta/SetupEarlyAccess'
import { EarlyAccessJoinEmbed } from '../../domain/Response/EarlyAccessJoin'

@Command(Setup)
export class SetupCommand {
  @SubCommand(SetupEarlyAccess)
  async earlyAccessGateway(): Promise<CommandResponse> {
    return {
      interactionContext: [],
      embeds: [new EarlyAccessGatewayEmbed()],
    }
  }

  @Component(EarlyAccessJoinComponent)
  async earlyAccessJoin(interactionContext: string[], interaction: ButtonInteraction): Promise<void> {
    addRoleFromInteraction('Early Access', interaction)
    interaction.followUp(new EarlyAccessJoinEmbed())
  }
}
