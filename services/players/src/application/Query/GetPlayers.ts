import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class GetPlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetPlayers)
export class GetPlayersHandler implements IQueryHandler<GetPlayers, PlayerEntity[]> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(query: GetPlayers): Promise<PlayerEntity[]> {
    const { ids } = query
    return this._repository.findMany(ids)
  }
}
