import { AggregateRoot } from '@nestjs/cqrs'
import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'
import { Population } from '@ps2gg/population/types'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
@Subscribable()
export class PopulationEntity extends AggregateRoot implements Population, SubscribableEntity {
  @PrimaryColumn('text')
  readonly scope: string

  @Column('boolean', { nullable: true })
  readonly resetReceivedState: boolean

  @Column('int', { nullable: false })
  readonly tr: number

  @Column('int', { nullable: false })
  readonly nc: number

  @Column('int', { nullable: false })
  readonly vs: number

  constructor(population: Population) {
    super()
    if (!population) return
    const { scope, tr, nc, vs } = population
    this.scope = scope
    this.tr = tr
    this.nc = nc
    this.vs = vs
    // @ts-ignore
    console.log(this.__isSubscribable)
  }
}
