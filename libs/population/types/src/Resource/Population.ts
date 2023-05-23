import { SubscribableEntity } from '@ps2gg/events/types'

export interface Population extends SubscribableEntity {
  scope: string
  tr: number
  nc: number
  vs: number
}
