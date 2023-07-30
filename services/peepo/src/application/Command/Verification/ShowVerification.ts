import { getComponents } from '@ps2gg/discord/command'
import { reply } from '@ps2gg/discord/util'
import { Player } from '@ps2gg/players/types'
import { User } from '@ps2gg/users/types'
import { CommandInteraction } from 'discord.js'
import { VerifyReady } from '../../../domain/Component/Verification/VerifyReady'
import { verificationCoordinator } from '../../../domain/Coordinator/VerificationCoordinator'
import { getPlayer } from '../../Query/Players/GetPlayer'
import { getSelectedCharacter } from '../../Query/Players/GetSelectedCharacter'

export async function showVerification(name: string, user: User, interaction: CommandInteraction): Promise<void> {
  const player = await getPlayer(name, true)
  const isVerified = user.characterIds.includes(player.id)

  if (!isVerified) return verify(player, user, interaction)
}

async function verify(player: Player, user: User, interaction: CommandInteraction): Promise<void> {
  const { name } = player
  const { embed, id } = await getSelectedCharacter(name, player)
  const components = getComponents([VerifyReady], [id, name]) // Is handled in Verify SlashCommand
  const payload = {
    embeds: [embed],
    ephemeral: true,
    components,
  }
  reply(interaction, payload)

  const success = await verificationCoordinator.awaitVerification(user.discordId, id)

  if (!success) throw new Error('This command requires player verification')

  user.characterIds.push(id)
}
