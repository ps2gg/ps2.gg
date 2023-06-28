import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

export class GetOnlinePlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetOnlinePlayers)
export class GetOnlinePlayersHandler implements IQueryHandler<GetOnlinePlayers, PlayerEntity[]> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(query: GetOnlinePlayers): Promise<PlayerEntity[]> {
    const { ids } = query
    return this._repository.findManyByOnlineStatus(ids, true)
  }
}
