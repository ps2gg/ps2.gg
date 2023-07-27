import { reply } from '@ps2gg/discord/util'
import { CommandInteraction } from 'discord.js'
import { verificationCoordinator } from '../../../domain/Coordinator/VerificationCoordinator'
import { getVerificationHint } from '../../Aggregation/Verification/Hint'

export async function showVerificationHint(interaction: CommandInteraction, discordId: string): Promise<void> {
  const verificationHint = getVerificationHint()
  reply(interaction, verificationHint)

  const hasBeenVerified = await verificationCoordinator.awaitVerification(discordId, 'unknown')

  if (!hasBeenVerified) throw new Error('Interaction timed out, please try again.')
}
