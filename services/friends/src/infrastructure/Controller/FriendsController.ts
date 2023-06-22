import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { Friends } from '@ps2gg/friends/types'
import { PopulateFriends } from '../../application/Command/PopulateFriends'
import { GetFriends } from '../../application/Query/GetFriends'

const logger = getLogger()

@Controller('/v1/friends')
export class FriendsController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) { }

  @Get('/:character_id')
  async getSingle(@Param('character_id') character_id: string, @Query('refresh') refresh: boolean): Promise<Friends> {
    if (refresh) {
      logger.debug('Refresh set, getting friends from Census')
      return this._commandBus.execute(new PopulateFriends(character_id))
    }
    return this._queryBus.execute(new GetFriends(character_id))
  }

  @Post('/populate')
  async populate(@Body('character_id') character_id: string): Promise<Friends> {
    return this._commandBus.execute(new PopulateFriends(character_id))
  }
}
