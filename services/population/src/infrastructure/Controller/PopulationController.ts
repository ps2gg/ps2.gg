import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ServerId } from '@ps2gg/census/types'
import { Population } from '@ps2gg/population/types'
import { SetPopulation } from '../../application/Command/SetPopulation'
import { GetPopulation } from '../../application/Query/GetPopulation'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'

@Controller('/v1/population')
export class PopulationController {
  constructor(private readonly _commandBus: CommandBus, private readonly _queryBus: QueryBus) {}

  @Post('/')
  async save(@Body() population: PopulationEntity): Promise<Population> {
    return this._commandBus.execute(new SetPopulation(population.serverId, population.scope, population.tr, population.nc, population.vs))
  }

  @Get('/')
  async get(@Query('serverId') serverId: ServerId, @Query('scope') scope: string): Promise<Population> {
    return this._queryBus.execute(new GetPopulation(serverId, scope))
  }
}
