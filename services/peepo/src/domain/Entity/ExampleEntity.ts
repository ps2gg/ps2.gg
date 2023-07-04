import { AggregateRoot } from '@nestjs/cqrs'
import { Example } from '@ps2gg/test/types'
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { ulid } from 'ulid'

@Entity()
export class ExampleEntity extends AggregateRoot implements Example {
  @PrimaryColumn('text')
  id: string

  @Column('timestamp', { nullable: false })
  createdAt: Date

  constructor(example: Example) {
    super()
    if (!example) return
    const { id, createdAt } = example
    this.id = id || ulid().toLowerCase()
    this.createdAt = createdAt || new Date()
  }
}
