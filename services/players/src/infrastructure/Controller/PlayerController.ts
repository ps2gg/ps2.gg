import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Player } from '@ps2gg/players/types'
import { PopulatePlayer } from '../../application/Command/PopulatePlayer'
import { GetPlayer } from '../../application/Query/GetPlayer'

@Controller('/v1/player')
export class PlayerController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/')
  async get(@Query() id: string): Promise<Player> {
    return this._queryBus.execute(new GetPlayer(id))
  }

  @Post('/')
  async post(@Body('id') id: string, @Body('isOnline') isOnline: boolean, @Body('lastLogout') lastLogout: Date): Promise<Player> {
    return this._commandBus.execute(new PopulatePlayer(id, isOnline, lastLogout))
  }
}
