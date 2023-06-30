import { getComponents } from '@ps2gg/discord/command'
import { Player } from '@ps2gg/players/types'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { VerifyReady } from '../../domain/Component/VerifyReady'
import { verificationCoordinator } from '../../domain/Coordinator/VerificationCoordinator'
import { getPlayer } from '../Query/GetPlayer'
import { getSelectedCharacter } from '../Query/GetSelectedCharacter'

export async function validateVerification(name: string, user: User, interaction: CommandInteraction): Promise<void> {
  const player = await getPlayer(name)
  const isVerified = user.characterIds.includes(player.id)

  if (!isVerified) return verify(player, user, interaction)
}

async function verify(player: Player, user: User, interaction: CommandInteraction): Promise<void> {
  const { name } = player
  const { embed, id } = await getSelectedCharacter(name, player)
  const components = getComponents([VerifyReady], [id, name]) // Is handled in Verify SlashCommand
  interaction.reply({
    embeds: [embed],
    ephemeral: true,
    components,
  })

  const success = await verificationCoordinator.awaitVerification(user.discordId, id)

  if (!success) throw new Error('This command requires player verification')
}
