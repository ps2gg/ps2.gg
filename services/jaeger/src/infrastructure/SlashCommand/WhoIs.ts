import { Command, Main, CommandResponse, Component, ComponentResponse } from '@ps2gg/discord/command'
import { CommandInteraction, MentionableSelectMenuInteraction } from 'discord.js'
import { getLinkedUser } from '../../application/Query/GetLinkedUser'
import { getPlayers } from '../../application/Query/GetPlayers'
import { WhoIsSelect } from '../../domain/Components/WhoIsSelect'
import { VerifiedCharactersEmbed } from '../../domain/Embed/VerifiedCharactersEmbed'
import { WhoIs } from '../../domain/Meta/WhoIs'

@Command(WhoIs)
export class WhoIsCommand {
  @Main(WhoIs)
  async whoIs(options: null, interaction: CommandInteraction): Promise<CommandResponse> {
    return {
      interactionContext: [],
      content: '### Select a user to view:',
      ephemeral: true,
    }
  }

  @Component(WhoIsSelect)
  async selectUser(interactionContext: string[], interaction: MentionableSelectMenuInteraction): Promise<ComponentResponse> {
    const user = interaction.users.first()
    const linkedUser = await getLinkedUser(user.id)
    const characters = linkedUser?.characterIds.length ? await getPlayers(linkedUser.characterIds) : []
    return {
      embeds: [new VerifiedCharactersEmbed(characters, true)],
    }
  }
}
