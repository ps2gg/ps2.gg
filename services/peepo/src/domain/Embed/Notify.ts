import { getHour, getServerTimezone } from '@ps2gg/common/util'
import { EmbedColors } from '@ps2gg/discord/constants'
import { code } from '@ps2gg/discord/util'
import { DynamicSubscription } from '@ps2gg/events/types'
import { APIEmbed } from 'discord.js'
import { PopulationEntity } from '../Entity/PopulationEntity'

export class NotifyEmbed implements APIEmbed {
  description = '## Good fights coming your way!\nYour next session will start off great\n'
  color = EmbedColors.Success
  fields: any[]
  footer: any

  constructor(server: string, event: string, subscription: DynamicSubscription, population: { tr: number; vs: number; nc: number }) {
    const { tr, vs, nc } = population
    const eventType = PopulationEntity.getEventType(event)
    const eventName = PopulationEntity.getEventName(event, eventType)
    const source = eventType === 'Base' ? 'Falcon (census.lithafalcon.cc)' : 'Pomf (saerro.ps2.live)'

    this.fields = [
      {
        name: 'Server',
        value: code(server, 'less'),
      },
      {
        name: 'Event',
        value: code(eventName, 'less'),
      },
      {
        name: 'Min. Population',
        value: code(getPopulationConfiguration(subscription)),
        inline: true,
      },
      {
        name: 'Between',
        value: code(getTimeConfiguration(subscription, server)),
        inline: true,
      },
      {
        name: 'Current Population',
        value: code(`${tr}TR · ${nc}NC · ${vs}VS`),
      },
    ]

    this.footer = {
      text: `Population data kindly provided by ${source}`,
    }
  }
}

function getPopulationConfiguration(subscription: DynamicSubscription) {
  const { configuration } = subscription
  const tr = configuration.tr?.$min
  const nc = configuration.nc?.$min
  const vs = configuration.vs?.$min
  return `${tr}TR · ${nc}NC · ${vs}VS`
}

function getTimeConfiguration(subscription: DynamicSubscription, server: string) {
  const { sendBefore, sendAfter } = subscription
  const timezone = getServerTimezone(server)
  const sendBeforeHour = getHour(sendBefore, timezone)
  const sendAfterHour = getHour(sendAfter, timezone)
  return `${sendAfterHour} - ${sendBeforeHour} ${timezone}`
}
