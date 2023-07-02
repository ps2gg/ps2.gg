import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { getFriendIds } from '@ps2gg/census/collections'
import { Friends } from '@ps2gg/friends/types'
import { PlayerClient } from '@ps2gg/players/client'
import { SetFriends } from './SetFriends'

export class PopulateFriends {
  constructor(readonly id: string) {}
}

@CommandHandler(PopulateFriends)
export class PopulateFriendsHandler implements ICommandHandler<PopulateFriends, Friends> {
  private _players = new PlayerClient()

  constructor(private _commandBus: CommandBus) {}

  async execute(command: PopulateFriends): Promise<Friends> {
    const { id } = command
    const friendIds = await getFriendIds(id)
    await this._players.populateMany(friendIds)
    const friends = new SetFriends({ id, friendIds })
    return this._commandBus.execute(friends)
  }
}
