import { Global, Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { FriendsController } from './FriendsController'
import { HealthcheckController } from './HealthcheckController'

@Global()
@Module({
  controllers: [HealthcheckController, FriendsController],
  imports: [CqrsModule],
})
export class HttpControllerModule {}
