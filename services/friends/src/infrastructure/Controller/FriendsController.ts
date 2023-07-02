import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { validateCharacterId } from '@ps2gg/common/util'
import { Friends } from '@ps2gg/friends/types'
import { PopulateFriends } from '../../application/Command/PopulateFriends'
import { GetFriends } from '../../application/Query/GetFriends'
import { GetMultiple } from '../../application/Query/GetMultiple'

const logger = getLogger()

@Controller('/v1/friends')
export class FriendsController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/:character_id')
  async get(@Param('character_id') character_id: string, @Query('refresh') refresh?: boolean): Promise<Friends> {
    validateCharacterId(character_id)

    if (refresh) {
      logger.debug('Refresh set, getting friends from Census')
      return this._commandBus.execute(new PopulateFriends(character_id))
    }

    return this._queryBus.execute(new GetFriends(character_id))
  }

  @Get('/')
  async getMany(@Query('ids[]') ids: string[]): Promise<Friends> {
    if (typeof ids === 'string') ids = [ids] // nest doesn't use the correct type on single elements
    for (const id of ids) validateCharacterId(id)
    return this._queryBus.execute(new GetMultiple(ids))
  }

  @Post('/populate')
  async populate(@Body('character_id') character_id: string): Promise<Friends> {
    validateCharacterId(character_id)
    return this._commandBus.execute(new PopulateFriends(character_id))
  }
}
