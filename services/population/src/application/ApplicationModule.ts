import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '../infrastructure/TypeOrm/TypeOrmModule'
import { SetPopulationHandler } from './Command/SetPopulation'
import { GetBestFightsHandler } from './Query/GetBestFights'
import { GetPopulationHandler } from './Query/GetPopulation'

const queryHandlers = [GetPopulationHandler, GetBestFightsHandler]
const commandHandlers = [SetPopulationHandler]

@Module({
  imports: [TypeOrmModule, CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
