import { AggregateRoot } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { Entity, PrimaryColumn, Column } from 'typeorm'
import { ulid } from 'ulid'

@Entity()
export class FriendsEntity extends AggregateRoot implements Friends {
  @PrimaryColumn('text')
  readonly character_id: string

  @Column('text', { array: true, nullable: false })
  readonly friendIds: string[]

  constructor(example: Friends) {
    super()
    if (!example) return
    this.character_id = example.character_id
    this.friendIds = example.friendIds
  }
}
