import { CommandBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { FriendsRepository } from '../../infrastructure/TypeOrm/Repository/FriendsRepository'
import { PopulateFriends } from '../Command/PopulateFriends'

export class GetMultiple {
  constructor(readonly ids: string[]) {}
}

@QueryHandler(GetMultiple)
export class GetMultipleHandler implements IQueryHandler<GetMultiple, Friends> {
  constructor(private readonly _repository: FriendsRepository, private readonly _commandBus: CommandBus) {}

  async execute(query: GetMultiple): Promise<Friends> {
    const { ids } = query
    const players = await this._repository.findMany(ids)
    const unpopulated = ids.filter((id) => !players.find((player) => player.id === id))
    const populated = await Promise.all(unpopulated.map((id) => this._commandBus.execute(new PopulateFriends(id))))
    const friendIds = [...players, ...populated].map((player) => player.friendIds).flat()
    const deduplicated = friendIds.reduce((acc, player) => {
      if (!acc.includes(player)) acc.push(player)
      return acc
    }, [])
    const friends = { id: ids.join(','), friendIds: deduplicated }
    return friends
  }
}
