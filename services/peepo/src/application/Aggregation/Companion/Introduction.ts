import { getComponents } from '@ps2gg/discord/command'
import { InteractionReplyOptions } from 'discord.js'
import { IntroductionServerSelect } from '../../../domain/Component/Companion/IntroductionServerSelect'
import { CompanionIntroductionEmbed } from '../../../domain/Embed/Companion/Introduction'

export function getIntroduction(interactionId: string): InteractionReplyOptions {
  const embed = new CompanionIntroductionEmbed()
  const components = getComponents([IntroductionServerSelect], [interactionId])
  return {
    embeds: [embed],
    ephemeral: true,
    components,
  }
}
