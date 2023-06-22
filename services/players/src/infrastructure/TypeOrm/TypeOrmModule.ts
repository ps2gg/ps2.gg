import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionEntity, SubscriptionRepository } from '@ps2gg/events/subscriptions'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { options } from './DataSource'
import { PlayerRepository } from './Repository/PlayerRepository'

export const Entities = [PlayerEntity, SubscriptionEntity]

const Repositories = [PlayerRepository, SubscriptionRepository]

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
