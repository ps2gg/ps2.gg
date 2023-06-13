import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Player } from '@ps2gg/players/types'
import { PopulatePlayer } from '../../application/Command/PopulatePlayer'
import { GetPlayer } from '../../application/Query/GetPlayer'
import { GetPlayerByName } from '../../application/Query/GetPlayerByName'

@Controller('/v1/player')
export class PlayerController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/')
  async get(@Query('id') id: string, @Query('name') name: string): Promise<Player> {
    if (id) return this._queryBus.execute(new GetPlayer(id))
    else return this._queryBus.execute(new GetPlayerByName(name))
  }

  @Post('/')
  async post(@Body('id') id: string, @Body('isOnline') isOnline: boolean, @Body('lastLogout') lastLogout?: Date): Promise<Player> {
    const hasLogoutTimestamp = !isNaN(lastLogout.valueOf())
    return this._commandBus.execute(new PopulatePlayer(id, isOnline, hasLogoutTimestamp ? lastLogout : undefined))
  }
}
