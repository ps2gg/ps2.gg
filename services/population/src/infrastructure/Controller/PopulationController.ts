import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Population } from '@ps2gg/population/types'
import { SetPopulation } from '../../application/Command/SetPopulation'
import { GetPopulation } from '../../application/Query/GetPopulation'

@Controller('/v1/population')
export class PopulationController {
  constructor(private readonly _commandBus: CommandBus, private readonly _queryBus: QueryBus) {}

  @Post('/')
  async save(@Body() population: Population): Promise<Population> {
    return this._commandBus.execute(new SetPopulation(population))
  }

  @Get('/')
  async get(@Query('scope') scope: string): Promise<Population> {
    return this._queryBus.execute(new GetPopulation(scope))
  }
}
