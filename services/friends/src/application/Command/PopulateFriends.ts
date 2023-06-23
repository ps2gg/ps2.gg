import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getFriendIds } from '@ps2gg/census/collections'
import { PlayerClient } from '@ps2gg/players/client'
import { FriendsEntity } from '../../domain/Entity/FriendsEntity'
import { SetFriends } from './SetFriends'

export class PopulateFriends {
  constructor(readonly character_id: string) {}
}

@CommandHandler(PopulateFriends)
export class PopulateFriendsHandler implements ICommandHandler<PopulateFriends, FriendsEntity> {
  private _players = new PlayerClient()

  constructor(private _commandBus: CommandBus) {}

  async execute(command: PopulateFriends): Promise<FriendsEntity> {
    const { character_id } = command
    const friendIds = await getFriendIds(character_id)
    await this._players.populateMany(friendIds)
    const friends = new SetFriends({ character_id, friendIds })
    return this._commandBus.execute(friends)
  }
}
