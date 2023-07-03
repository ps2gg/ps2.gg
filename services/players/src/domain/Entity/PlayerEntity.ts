import { Subscribable } from '@ps2gg/events/subscriptions'
import { SubscribableEntity } from '@ps2gg/events/types'
import { Player } from '@ps2gg/players/types'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
@Subscribable()
export class PlayerEntity extends SubscribableEntity implements Player {
  @PrimaryColumn('text')
  readonly id: string

  @Index()
  @Column('text')
  readonly name: string

  @Column('text')
  readonly factionId: string

  @Column('text', { nullable: true })
  readonly outfitTag: string

  @Index()
  @Column('boolean', { nullable: true })
  readonly isOnline: boolean

  @Column('timestamp', { nullable: true })
  readonly lastLogout: Date

  constructor(player: Player) {
    super()
    if (!player) return

    const { id, name, factionId, outfitTag, isOnline, lastLogout } = player
    this.id = `Player.${id}`
    this.id = id
    this.name = name
    this.factionId = factionId
    this.outfitTag = outfitTag
    this.isOnline = isOnline
    this.lastLogout = lastLogout
  }
}
