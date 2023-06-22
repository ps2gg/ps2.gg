import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { FriendsRepository } from '../../infrastructure/TypeOrm/Repository/FriendsRepository'

export class SetFriends {
  constructor(readonly friends: Friends) { }
}

@CommandHandler(SetFriends)
export class SetFriendsHandler implements ICommandHandler<SetFriends, FriendsEntity> {
  constructor(private _repository: FriendsRepository) { }

  async execute(command: SetFriends): Promise<FriendsEntity> {
    const friends = (await this._repository.findOne(command.friends.character_id)) ?? command.friends

    if (friends) {
      friends.friendIds = command.friends.friendIds
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this._repository.save(command.friends)
  }
}
