import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Friends } from '@ps2gg/friends/types'
import { FriendsRepository } from '../../infrastructure/TypeOrm/Repository/FriendsRepository'

export class SetFriends {
  constructor(readonly friends: Friends) {}
}

@CommandHandler(SetFriends)
export class SetFriendsHandler implements ICommandHandler<SetFriends, Friends> {
  constructor(private _repository: FriendsRepository) {}

  async execute(command: SetFriends): Promise<Friends> {
    const friends = (await this._repository.findOne(command.friends.id)) ?? command.friends

    if (friends) friends.friendIds = command.friends.friendIds

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this._repository.save(command.friends)
  }
}
