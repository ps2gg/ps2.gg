import { WsController } from '@ps2gg/census/controllers'
import { PlayerLoadout } from '@ps2gg/census/types'
import { createLogger } from '@ps2gg/common/logging'
import { FriendsClient } from '@ps2gg/friends/client'

const logger = createLogger('Friends')

export class FriendsController extends WsController {
  private _friends = new FriendsClient()

  constructor() {
    super(['PlayerLogin'])
  }

  override onLogout(character_id: string, timestamp: Date): void {}

  override onLogin(character_id: string, timestamp: Date): void {
    logger.info(`player logged on ${character_id}`)
    this._friends.populate(character_id)
  }
}
