import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { FriendsRepository } from '../../infrastructure/TypeOrm/Repository/FriendsRepository'
import { PopulateFriends } from '../Command/PopulateFriends'

export class GetFriends {
  constructor(readonly id: string) {}
}

@QueryHandler(GetFriends)
export class GetFriendsHandler implements IQueryHandler<GetFriends, FriendsEntity> {
  constructor(private readonly _repository: FriendsRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetFriends): Promise<FriendsEntity> {
    const { id } = query
    const friends = await this._repository.findOne(id)
    return friends || this._commandBus.execute(new PopulateFriends(id))
  }
}
