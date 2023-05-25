import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ExampleController } from './ExampleController'
import { HealthcheckController } from './HealthcheckController'

@Global()
@Module({
  controllers: [HealthcheckController, ExampleController],
  imports: [CqrsModule],
})
export class HttpControllerModule {}
