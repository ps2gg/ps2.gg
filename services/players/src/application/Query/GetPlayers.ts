import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

const logger = getLogger()

export class GetPlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetPlayers)
export class GetPlayersHandler implements IQueryHandler<GetPlayers, PlayerEntity[]> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(query: GetPlayers): Promise<PlayerEntity[]> {
    const { ids } = query
    logger.info({ ids }, 'Fetching players')
    return this._repository.findMany(ids)
  }
}
