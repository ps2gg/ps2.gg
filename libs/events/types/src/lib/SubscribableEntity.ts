import { AggregateRoot } from '@nestjs/cqrs'
import { Column, Index, PrimaryColumn } from 'typeorm'

export class SubscribableEntity extends AggregateRoot {
  @PrimaryColumn('text')
  @Index({ unique: true })
  id: string

  @Column('boolean', { nullable: true })
  __resetSubscriptions: boolean

  // For typeorm subscriber to distinguish between entities that are subscribable and those that are not
  __isSubscribable = true

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(entity?: any) {
    super()
    if (!entity) return
    const { id, __resetSubscriptions } = entity
    this.id = id
    this.__resetSubscriptions = __resetSubscriptions
  }
}
