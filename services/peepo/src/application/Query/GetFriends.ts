import { FriendsClient } from '@ps2gg/friends/client'
import { Friends } from '@ps2gg/friends/types'

export class GetFriends {
  private _friends = new FriendsClient()

  constructor(readonly id: string) {}

  async execute(): Promise<Friends> {
    return this._friends.get(this.id)
  }
}
