export type DynamicEvent = {
  [key: string]: any
} & { id: string }

export const minimumEventDelay = 1000 * 60 * 10
