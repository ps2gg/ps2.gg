import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { validateObjectNotation } from '@ps2gg/common/util'
import { Population } from '@ps2gg/population/types'
import { SetPopulation } from '../../application/Command/SetPopulation'
import { GetBestFights } from '../../application/Query/GetBestFights'
import { GetPopulation } from '../../application/Query/GetPopulation'

@Controller('/v1/population')
export class PopulationController {
  constructor(private readonly _commandBus: CommandBus, private readonly _queryBus: QueryBus) {}

  @Post('/')
  async save(@Body() population: Population): Promise<Population> {
    validateObjectNotation(population.id, 'id')
    return this._commandBus.execute(new SetPopulation(population))
  }

  @Get('/')
  async get(@Query('id') id: string): Promise<Population> {
    validateObjectNotation(id, 'id')
    return this._queryBus.execute(new GetPopulation(id))
  }

  @Get('/best-fights')
  async getBestFights(): Promise<Population> {
    return this._queryBus.execute(new GetBestFights('best'))
  }
}
