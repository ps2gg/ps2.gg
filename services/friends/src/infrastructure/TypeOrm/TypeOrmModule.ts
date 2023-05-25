import { Global, Module } from '@nestjs/common'
import { TypeOrmModule as RootTypeOrmModule } from '@nestjs/typeorm'
import { ExampleEntity } from '../../domain/Entity/ExampleEntity'
import { options } from './DataSource'
import { ExampleRepository } from './Repository/ExampleRepository'

export const Entities = [ExampleEntity]

const Repositories = [ExampleRepository]

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
