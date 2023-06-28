import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'
import { PopulatePlayer } from '../Command/PopulatePlayer'

export class GetPlayer {
  constructor(readonly id: string) {}
}

@QueryHandler(GetPlayer)
export class GetPlayerHandler implements IQueryHandler<GetPlayer, PlayerEntity> {
  constructor(private readonly _repository: PlayerRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetPlayer): Promise<PlayerEntity> {
    const { id } = query
    const player = await this._repository.findOne(id)
    return player || this._commandBus.execute(new PopulatePlayer(id))
  }
}
