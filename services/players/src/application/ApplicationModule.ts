import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { PopulatePlayerHandler } from './Command/PopulatePlayer'
import { GetPlayerHandler } from './Query/GetPlayer'

const queryHandlers = [GetPlayerHandler]
const commandHandlers = [PopulatePlayerHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
