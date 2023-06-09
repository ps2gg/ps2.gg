import { getOffsetAdjustedTimeOfDay, getServerTimezone } from '@ps2gg/common/util'
import { ModifyPopulationSubscription } from './ModifyPopulationSubscription'

export class ModifyPopulationSubscriptionTime {
  constructor(readonly subscriptionIds: string[], readonly server: string, readonly sendBefore?: number, readonly sendAfter?: number) {}

  async execute(): Promise<void> {
    const { subscriptionIds, server, sendAfter, sendBefore } = this
    const timezone = getServerTimezone(server)
    const timezoneAdjustedSendBefore = getOffsetAdjustedTimeOfDay(sendBefore, timezone)
    const timezoneAdjustedSendAfter = getOffsetAdjustedTimeOfDay(sendAfter, timezone)

    for (const subscriptionId of subscriptionIds) {
      await new ModifyPopulationSubscription(subscriptionId, undefined, timezoneAdjustedSendBefore, timezoneAdjustedSendAfter).execute()
    }
  }
}
