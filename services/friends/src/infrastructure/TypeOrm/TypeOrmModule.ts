import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { options } from './DataSource'
import { FriendsRepository } from './Repository/FriendsRepository'

export const Entities = [FriendsEntity]

const Repositories = [FriendsRepository]

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
