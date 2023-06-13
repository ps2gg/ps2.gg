import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class GetPlayerByName {
  constructor(readonly name: string) {}
}

@QueryHandler(GetPlayerByName)
export class GetPlayerByNameHandler implements IQueryHandler<GetPlayerByName, PlayerEntity> {
  constructor(private readonly _repository: ExampleRepository) {}

  async execute(query: GetPlayerByName): Promise<PlayerEntity> {
    return this._repository.findOneByName(query.name)
  }
}
