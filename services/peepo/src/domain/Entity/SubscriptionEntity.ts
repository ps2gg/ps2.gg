import { getOffsetAdjustedTimeOfDay, getServerTimezone } from '@ps2gg/common/util'
import { DynamicSubscription } from '@ps2gg/events/types'

export class SubscriptionEntity implements DynamicSubscription {
  readonly sendBefore: number
  readonly sendAfter: number

  constructor(
    server: string,
    readonly scope: string,
    readonly userId: string,
    readonly configuration = { tr: { $min: 6 }, vs: { $min: 6 }, nc: { $min: 6 } },
    sendBefore?: number,
    sendAfter?: number
  ) {
    const timezone = getServerTimezone(server)
    this.sendAfter = sendAfter || getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 12, timezone)
    this.sendBefore = sendBefore || getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 2, timezone)
  }
}
