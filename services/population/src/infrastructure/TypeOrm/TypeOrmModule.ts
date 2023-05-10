import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { PopulationEntity } from '../../domain/Entity/PopulationEntity'
import { options } from './DataSource'
import { PopulationRepository } from './Repository/PopulationRepository'

export const Entities = [PopulationEntity]
const Repositories = [PopulationRepository]

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
