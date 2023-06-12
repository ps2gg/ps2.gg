export type Subscription = {
  subscriptionId?: string
  id: string
  userId: string
  eventIsReceived?: boolean
  eventLastReceivedAt?: Date
  sendAfter?: number
  sendBefore?: number
}
