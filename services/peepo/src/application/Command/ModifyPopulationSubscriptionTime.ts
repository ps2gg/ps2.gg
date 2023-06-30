import { getOffsetAdjustedTimeOfDay, getServerTimezone } from '@ps2gg/common/util'
import { modifyPopulationSubscription } from './ModifyPopulationSubscription'

export async function modifyPopulationSubscriptionTime(subscriptionIds: string[], server: string, sendBefore?: number, sendAfter?: number): Promise<void> {
  const timezone = getServerTimezone(server)
  const timezoneAdjustedSendBefore = getOffsetAdjustedTimeOfDay(sendBefore, timezone)
  const timezoneAdjustedSendAfter = getOffsetAdjustedTimeOfDay(sendAfter, timezone)

  for (const subscriptionId of subscriptionIds) {
    await modifyPopulationSubscription(subscriptionId, undefined, timezoneAdjustedSendBefore, timezoneAdjustedSendAfter)
  }
}
