import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'
import { Population } from '@ps2gg/population/types'
import { Column, Entity } from 'typeorm'

@Entity()
@Subscribable()
export class PopulationEntity extends SubscribableEntity implements Population {
  @Column('int', { nullable: false })
  readonly tr: number

  @Column('int', { nullable: false })
  readonly nc: number

  @Column('int', { nullable: false })
  readonly vs: number

  @Column('boolean', { default: false })
  override resetReceivedState: boolean

  constructor(population: Population) {
    super()
    if (!population) return
    const { id, tr, nc, vs } = population
    this.id = id
    this.tr = tr
    this.nc = nc
    this.vs = vs
  }
}
