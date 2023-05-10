import { Subscription } from '@ps2gg/notifications/types'

export type EventSubscription = {
  events: string[]
  userId: string
}

export type EventAction = {
  action: 'subscribe' | 'unsubscribe'
}

export type EventResponse = {
  event: string
  data: any & { subscription: Subscription }
}

export type EventRequest = {
  event: string
  data?: any & { userId: string }
}
