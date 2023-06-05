export type DynamicEvent = {
  [key: string]: any
} & { scope: string }

export interface SubscribableEntity {
  scope: string
  resetReceivedState: boolean
  __isSubscribable?: true
}

export const minimumEventDelay = 1000 * 60 * 10
