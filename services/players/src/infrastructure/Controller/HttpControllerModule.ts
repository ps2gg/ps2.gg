import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { HealthcheckController } from './HealthcheckController'
import { PlayerController } from './PlayerController'
import { PlayersController } from './PlayersController'

@Global()
@Module({
  controllers: [HealthcheckController, PlayerController, PlayersController],
  imports: [CqrsModule],
})
export class HttpControllerModule {}
