import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { SetFriends } from '../../application/Command/SetFriends'
import { GetFriends } from '../../application/Query/GetFriends'

@Controller('/v1/friends')
export class FriendsController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/')
  async get(@Query() character_id: string): Promise<Friends> {
    return this._queryBus.execute(new GetFriends(character_id))
  }

  @Post('/')
  async post(@Body() friends: Friends): Promise<Friends> {
    return this._commandBus.execute(new SetFriends(friends))
  }
}
