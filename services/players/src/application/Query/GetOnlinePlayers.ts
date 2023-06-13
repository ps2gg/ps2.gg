import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class GetOnlinePlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetOnlinePlayers)
export class GetOnlinePlayersHandler implements IQueryHandler<GetOnlinePlayers, PlayerEntity[]> {
  constructor(private readonly _repository: ExampleRepository) {}

  async execute(query: GetOnlinePlayers): Promise<PlayerEntity[]> {
    return this._repository.findManyByOnlineStatus(query.ids, true)
  }
}
