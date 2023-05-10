import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { HealthcheckController } from './HealthcheckController'
import { PopulationController } from './PopulationController'

@Global()
@Module({
  controllers: [PopulationController, HealthcheckController],
  imports: [CqrsModule],
})
export class HttpControllerModule {}
