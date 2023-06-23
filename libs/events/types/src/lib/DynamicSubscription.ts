import { Subscription } from './Subscription'

export type DynamicSubscription = {
  configuration?: SubscriptionConfiguration
} & Subscription

export type SubscriptionConfiguration = {
  [key: string]: Filter
}

export type Filter = { $min?: number; $max?: number; $equals?: any }
