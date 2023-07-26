import { EmbedColors } from '@ps2gg/discord/constants'
import { APIEmbed } from 'discord.js'
import { PopulationEntity } from '../../Entity/PopulationEntity'

export class UnsubscribeEmbed implements APIEmbed {
  title = 'Unsubscribed!'
  color = EmbedColors.Success
  description: string

  constructor(event: string, server: string) {
    const eventType = PopulationEntity.getEventType(event)
    const eventName = PopulationEntity.getEventName(event, eventType)
    this.description = `You will no longer receive notifications for **${eventName} ${server === 'All' ? '**' : ` on ${server}**`}`
  }
}
