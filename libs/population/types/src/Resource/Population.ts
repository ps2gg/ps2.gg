import { ServerId } from '@ps2gg/census/types'

export interface Population {
  serverId: ServerId
  scope: string
  tr: number
  nc: number
  vs: number
}
