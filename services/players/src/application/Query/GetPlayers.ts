import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class GetPlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetPlayers)
export class GetPlayersHandler implements IQueryHandler<GetPlayers, PlayerEntity[]> {
  constructor(private readonly _repository: ExampleRepository) {}

  async execute(query: GetPlayers): Promise<PlayerEntity[]> {
    return this._repository.findMany(query.ids)
  }
}
