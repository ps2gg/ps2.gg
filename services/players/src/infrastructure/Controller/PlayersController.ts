import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Player } from '@ps2gg/players/types'
import { PrimePlayers } from '../../application/Command/PrimePlayers'
import { GetOnlinePlayers } from '../../application/Query/GetOnlinePlayers'
import { GetPlayers } from '../../application/Query/GetPlayers'

@Controller('/v1/players')
export class PlayersController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/')
  async get(@Query('ids[]') ids: string[]): Promise<Player[]> {
    return this._queryBus.execute(new GetPlayers(ids))
  }

  @Get('/online')
  async getOnline(@Query('ids[]') ids: string[]): Promise<Player[]> {
    return this._queryBus.execute(new GetOnlinePlayers(ids))
  }

  @Post('/prime')
  async prime(@Body('ids') ids: string[]): Promise<Player[]> {
    return this._commandBus.execute(new PrimePlayers(ids))
  }
}
