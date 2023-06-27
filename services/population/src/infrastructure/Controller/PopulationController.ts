import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { validateNumericString } from '@ps2gg/common/util'
import { Population } from '@ps2gg/population/types'
import { SetPopulation } from '../../application/Command/SetPopulation'
import { GetPopulation } from '../../application/Query/GetPopulation'

@Controller('/v1/population')
export class PopulationController {
  constructor(private readonly _commandBus: CommandBus, private readonly _queryBus: QueryBus) {}

  @Post('/')
  async save(@Body() population: Population): Promise<Population> {
    validateNumericString(population.id, 'id')
    return this._commandBus.execute(new SetPopulation(population))
  }

  @Get('/')
  async get(@Query('id') id: string): Promise<Population> {
    validateNumericString(id, 'id')
    return this._queryBus.execute(new GetPopulation(id))
  }
}
