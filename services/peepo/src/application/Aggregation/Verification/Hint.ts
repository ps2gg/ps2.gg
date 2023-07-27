import { InteractionReplyOptions } from 'discord.js'
import { VerifyHintEmbed } from '../../../domain/Embed/Verification/VerifyHintEmbed'

export function getVerificationHint(): InteractionReplyOptions {
  const embed = new VerifyHintEmbed()
  return {
    embeds: [embed],
    ephemeral: true,
    components: [],
  }
}
