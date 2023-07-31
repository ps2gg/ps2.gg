import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { validateCharacterId, validateCharacterName } from '@ps2gg/common/util'
import { Player } from '@ps2gg/players/types'
import { PopulatePlayer } from '../../application/Command/PopulatePlayer'
import { SetLastActivity } from '../../application/Command/SetLastActivity'
import { GetPlayer } from '../../application/Query/GetPlayer'
import { GetPlayerByName } from '../../application/Query/GetPlayerByName'
import { NoParameterException } from '../../domain/Exception/NoParameterException'

@Controller('/v1/player')
export class PlayerController {
  constructor(private readonly _queryBus: QueryBus, private readonly _commandBus: CommandBus) {}

  @Get('/')
  async get(@Query('id') id?: string, @Query('name') name?: string): Promise<Player> {
    if (id) {
      validateCharacterId(id)
      return this._queryBus.execute(new GetPlayer(id))
    }
    if (name) {
      validateCharacterName(name)
      return this._queryBus.execute(new GetPlayerByName(name))
    }
    throw new NoParameterException()
  }

  @Post('/')
  async post(@Body('id') id: string, @Body('isOnline') isOnline?: boolean, @Body('lastLogout') lastLogout?: Date): Promise<Player> {
    validateCharacterId(id)
    const hasLogoutTimestamp = !isNaN(lastLogout.valueOf())
    return this._commandBus.execute(new PopulatePlayer(id, isOnline, hasLogoutTimestamp ? lastLogout : null))
  }

  @Post('/last-activity')
  async postLastActivity(@Body('id') id: string, @Body('lastActivity') lastActivity: Date): Promise<void> {
    validateCharacterId(id)
    return this._commandBus.execute(new SetLastActivity(id, lastActivity))
  }
}
