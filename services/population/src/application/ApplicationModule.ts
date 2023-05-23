import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { SetPopulationHandler } from './Command/SetPopulation'
import { GetPopulationHandler } from './Query/GetPopulation'

const queryHandlers = [GetPopulationHandler]
const commandHandlers = [SetPopulationHandler]

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
