import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'
import { Player } from '@ps2gg/players/types'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
@Subscribable()
@Index('name')
export class PlayerEntity extends SubscribableEntity implements Player {
  @PrimaryColumn('text')
  readonly id: string

  @Column('text')
  readonly name: string

  @Column('boolean', { nullable: true })
  readonly isOnline: boolean

  @Column('timestamp', { nullable: true })
  readonly lastLogout: Date

  constructor(player: Player) {
    super()
    if (!player) return

    const { id, name, isOnline, lastLogout } = player
    this.id = `Player.${id}`
    this.id = id
    this.name = name
    this.isOnline = isOnline
    this.lastLogout = lastLogout
  }
}
