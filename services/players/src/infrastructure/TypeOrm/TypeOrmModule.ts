import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionEntity, SubscriptionRepository } from '@ps2gg/events/subscriptions'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { options } from './DataSource'
import { ExampleRepository } from './Repository/ExampleRepository'

export const Entities = [PlayerEntity, SubscriptionEntity]

const Repositories = [ExampleRepository, SubscriptionRepository]

@Global()
@Module({
  imports: [
    RootTypeOrmModule.forRoot({
      ...options,
      entities: Entities,
    }),
    RootTypeOrmModule.forFeature(Entities),
  ],
  providers: [...Repositories],
  exports: [...Repositories],
})
export class TypeOrmModule {}
