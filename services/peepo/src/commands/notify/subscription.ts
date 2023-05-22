import { getOffsetAdjustedTimeOfDay, getServerTimezone } from '@ps2gg/common/util'
import { DynamicSubscription } from '@ps2gg/events/types'

export function getDefaultSubscription(userId: string, scope: string, server: string): DynamicSubscription {
  const filter = { $min: 12 }
  const timezone = getServerTimezone(server)
  const sendAfter = getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 16, timezone)
  const sendBefore = getOffsetAdjustedTimeOfDay(1000 * 60 * 60 * 2, timezone)
  const configuration = { tr: filter, vs: filter, nc: filter }
  const subscription = { userId, scope, sendBefore, sendAfter, configuration }
  return subscription
}
