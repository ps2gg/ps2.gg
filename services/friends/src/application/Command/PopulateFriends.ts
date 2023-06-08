import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CensusQuery } from '@ps2gg/census/api'
import { getFriendIds } from '@ps2gg/census/collections'
import { Friends } from '@ps2gg/friends/types'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { SetFriends } from './SetFriends'

export class PopulateFriends {
  constructor(readonly character_id: string) {}
}

@CommandHandler(PopulateFriendsHandler)
export class PopulateFriendsHandler implements ICommandHandler<PopulateFriends, FriendsEntity> {
  constructor(private _commandBus: CommandBus) {}

  async execute(command: PopulateFriends): Promise<FriendsEntity> {
    const { character_id } = command
    const friendIds = await getFriendIds(character_id)
    const friends = new SetFriends({ character_id, friendIds })
    return this._commandBus.execute(friends)
  }
}
