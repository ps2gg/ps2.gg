import { AggregateRoot } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class FriendsEntity extends AggregateRoot implements Friends {
  @PrimaryColumn('text')
  readonly id: string

  @Column('text', { array: true, nullable: false })
  friendIds: string[]

  constructor(friends: Friends) {
    super()
    if (!friends) return
    this.id = friends.id
    this.friendIds = friends.friendIds
  }
}
