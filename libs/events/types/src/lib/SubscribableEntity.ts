import { AggregateRoot } from '@nestjs/cqrs'
import { Column, Index, PrimaryColumn } from 'typeorm'

export class SubscribableEntity extends AggregateRoot {
  @PrimaryColumn('text')
  @Index({ unique: true })
  id: string

  @Column('boolean', { default: true })
  resetReceivedState: boolean

  // For typeorm subscriber to distinguish between entities that are subscribable and those that are not
  __isSubscribable = true

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(entity?: any) {
    super()
    if (!entity) return
    const { id, resetReceivedState } = entity
    this.id = id
    this.resetReceivedState = resetReceivedState
  }
}
