import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Player } from '@ps2gg/players/types'
import { PopulatePlayers } from '../../application/Command/PopulatePlayers'
import { GetOnlinePlayers } from '../../application/Query/GetOnlinePlayers'
import { GetPlayers } from '../../application/Query/GetPlayers'

@Controller('/v1/players')
export class PlayersController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Post('/get')
  async get(@Body('ids') ids: string[]): Promise<Player[]> {
    return this._queryBus.execute(new GetPlayers(ids))
  }

  @Post('/')
  async populate(@Body('ids') ids: string[]): Promise<Player[]> {
    return this._commandBus.execute(new PopulatePlayers(ids))
  }

  @Post('/online/get')
  async getOnline(@Body('ids') ids: string[]): Promise<Player[]> {
    return this._queryBus.execute(new GetOnlinePlayers(ids))
  }
}
