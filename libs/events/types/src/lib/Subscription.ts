export type Subscription = {
  subscriptionId?: string
  scope: string
  userId: string
  eventIsReceived?: boolean
  eventLastReceivedAt?: Date
  sendAfter?: number
  sendBefore?: number
}
