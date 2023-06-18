import { DynamicSubscription } from '@ps2gg/events/types'

export type EventSubscription = {
  events: string[]
  userId: string
}

export type EventAction = {
  action: 'subscribe' | 'unsubscribe'
}

export type EventResponse = {
  event: string
  data: any & { id: string; __resetSubscriptions?: boolean }
  subscription?: DynamicSubscription
  changes?: EntityChanges
}

export type EventRequest = {
  event: string
  data?: any & { userId: string }
}

export type EntityChanges = { key: string; before: any; after: any }[]
