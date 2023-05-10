import { ServerId } from '@ps2gg/census/types'

export class GetPopulation {
  constructor(readonly serverId: ServerId, readonly scope: string) {}
}
