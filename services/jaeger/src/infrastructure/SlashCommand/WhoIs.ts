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
    const roles = interaction.member.roles.valueOf()
    // @ts-ignore I hate discord.js
    const isAuthorized = roles.get('332587654111821827') || interaction.user.id === '83598701120978944'

    if (!isAuthorized) throw new Error('Only PSB Admins can use this command')

    return {
      interactionContext: [],
      content: '## Select a user to view:',
      ephemeral: true,
    }
  }

  @Component(WhoIsSelect)
  async selectUser(interactionContext: string[], interaction: MentionableSelectMenuInteraction): Promise<ComponentResponse> {
    const user = interaction.users.first()

    if (!user) throw new Error('Please select by users, not roles')

    const linkedUser = await getLinkedUser(user.id)
    const characters = linkedUser?.characterIds.length ? await getPlayers(linkedUser.characterIds) : []
    return {
      embeds: [new VerifiedCharactersEmbed(characters, true)],
    }
  }
}
