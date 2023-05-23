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
  data: any & { subscription: DynamicSubscription }
}

export type EventRequest = {
  event: string
  data?: any & { userId: string }
}
