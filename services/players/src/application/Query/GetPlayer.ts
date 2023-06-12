import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { ExampleRepository } from '../../infrastructure/TypeOrm/Repository/ExampleRepository'

export class GetPlayer {
  constructor(readonly id: string) {}
}

@QueryHandler(GetPlayer)
export class GetPlayerHandler implements IQueryHandler<GetPlayer, PlayerEntity> {
  constructor(private readonly _repository: ExampleRepository) {}

  async execute(query: GetPlayer): Promise<PlayerEntity> {
    return this._repository.findOne(query.id)
  }
}
