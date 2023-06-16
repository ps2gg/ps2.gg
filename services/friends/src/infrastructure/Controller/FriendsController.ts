import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { PopulateFriends } from '../../application/Command/PopulateFriends'
import { GetFriends } from '../../application/Query/GetFriends'
import { getLogger } from '@ps2gg/common/logging'

const logger = getLogger()

@Controller('/v1/friends')
export class FriendsController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) { }

  @Get('/:character_id')
  async getSingle(@Param('character_id') character_id, @Query('refresh') refresh: boolean): Promise<Friends> {
    logger.info({ refresh })
    if (refresh)
      return this._commandBus.execute(new PopulateFriends(character_id))
    return this._queryBus.execute(new GetFriends(character_id))
  }


  @Post('/populate')
  async populate(@Body('character_id') character_id: string): Promise<Friends> {
    return this._commandBus.execute(new PopulateFriends(character_id))
  }
}
