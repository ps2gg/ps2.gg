import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'
import { PopulatePlayer } from '../Command/PopulatePlayer'

export class GetPlayer {
  constructor(readonly id: string) {}
}

@QueryHandler(GetPlayer)
export class GetPlayerHandler implements IQueryHandler<GetPlayer, PlayerEntity> {
  constructor(private readonly _repository: ExampleRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetPlayer): Promise<PlayerEntity> {
    const player = await this._repository.findOne(query.id)
    return player || this._commandBus.execute(new PopulatePlayer(query.id))
  }
}
