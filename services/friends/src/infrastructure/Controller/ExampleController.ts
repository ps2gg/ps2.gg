import { Controller, Get, Query } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { Example } from '@ps2gg/friends/types'
import { GetExample } from '../../application/Query/GetExample'

@Controller('/v1/example')
export class ExampleController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('/')
  async get(@Query() id: string): Promise<Example> {
    return this._queryBus.execute(new GetExample(id))
  }
}
