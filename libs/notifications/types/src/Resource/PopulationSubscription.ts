import { ServerId } from '@ps2gg/census/types'
import { Subscription } from './Subscription'

export interface PopulationSubscription extends PopulationSubscriptionConfig {
  subscription: Subscription
}

export interface PopulationSubscriptionConfig {
  serverId: ServerId
  min: number
  max: number
}
