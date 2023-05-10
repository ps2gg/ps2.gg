import { AggregateRoot } from '@nestjs/cqrs'
import { ServerId } from '@ps2gg/census/types'
import { Population } from '@ps2gg/population/types'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class PopulationEntity extends AggregateRoot implements Population {
  @PrimaryColumn('text')
  readonly serverId: ServerId

  @PrimaryColumn('text')
  readonly scope: string

  @Column('int', { nullable: false })
  readonly tr: number

  @Column('int', { nullable: false })
  readonly nc: number

  @Column('int', { nullable: false })
  readonly vs: number

  constructor(server: ServerId, scope: string, tr: number, nc: number, vs: number) {
    super()
    this.serverId = server
    this.scope = scope
    this.tr = tr
    this.nc = nc
    this.vs = vs
  }
}
