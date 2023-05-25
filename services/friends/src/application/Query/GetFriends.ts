import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { FriendsRepository } from '../../infrastructure/TypeOrm/Repository/FriendsRepository'

export class GetFriends {
  constructor(readonly character_id: string) {}
}

@QueryHandler(GetFriends)
export class GetFriendsHandler implements IQueryHandler<GetFriends, FriendsEntity> {
  constructor(private readonly _repository: FriendsRepository) {}

  async execute(query: GetFriends): Promise<FriendsEntity> {
    return this._repository.findOne(query.character_id)
  }
}
