import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { SetExampleHandler } from './Command/SetExample'
import { GetExampleHandler } from './Query/GetExample'

const queryHandlers = [GetExampleHandler]

const commandHandlers = [SetExampleHandler]

export const eventHandlers = []

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
