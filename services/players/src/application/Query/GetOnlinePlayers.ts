import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'

const logger = getLogger()

export class GetOnlinePlayers {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetOnlinePlayers)
export class GetOnlinePlayersHandler implements IQueryHandler<GetOnlinePlayers, PlayerEntity[]> {
  constructor(private readonly _repository: PlayerRepository) {}

  async execute(query: GetOnlinePlayers): Promise<PlayerEntity[]> {
    const { ids } = query
    logger.info({ ids }, 'Fetching online players')
    return this._repository.findManyByOnlineStatus(ids, true)
  }
}
