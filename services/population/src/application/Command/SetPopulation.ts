import { ServerId } from '@ps2gg/census/types'
import { Population } from '@ps2gg/population/types'

export class SetPopulation implements Population {
  constructor(public serverId: ServerId, public scope: string, public tr: number, public nc: number, public vs: number) {}
}
