import { CommandResponse } from '@ps2gg/discord/command'
import { VerifyHintEmbed } from 'services/peepo/src/domain/Embed/Verification/VerifyHintEmbed'

export function getVerifyHint(): CommandResponse {
  return { interactionContext: [], embeds: [new VerifyHintEmbed()], ephemeral: true }
}
