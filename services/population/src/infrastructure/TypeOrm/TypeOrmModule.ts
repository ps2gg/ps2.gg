import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { SubscriptionEntity, SubscriptionRepository } from '@ps2gg/events/subscriptions'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { options } from './DataSource'
import { PopulationRepository } from './Repository/PopulationRepository'

export const Entities = [PopulationEntity, SubscriptionEntity]
const Repositories = [PopulationRepository, SubscriptionRepository]

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
