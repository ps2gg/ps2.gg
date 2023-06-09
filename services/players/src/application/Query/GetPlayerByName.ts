import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { PlayerEntity } from '../../domain/Entity/PlayerEntity'
import { PlayerRepository } from '../../infrastructure/TypeOrm/Repository/PlayerRepository'
import { PopulatePlayerByName } from '../Command/PopulatePlayerByName'

export class GetPlayerByName {
  constructor(readonly name: string) {}
}

@QueryHandler(GetPlayerByName)
export class GetPlayerByNameHandler implements IQueryHandler<GetPlayerByName, PlayerEntity> {
  constructor(private readonly _repository: PlayerRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetPlayerByName): Promise<PlayerEntity> {
    const { name } = query
    const player = await this._repository.findOneByName(name)
    return player || (await this._commandBus.execute(new PopulatePlayerByName(name)))
  }
}
