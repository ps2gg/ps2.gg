import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { HealthcheckController } from './HealthcheckController'
import { PlayerController } from './PlayerController'

@Global()
@Module({
  controllers: [HealthcheckController, PlayerController],
  imports: [CqrsModule],
})
export class HttpControllerModule {}
