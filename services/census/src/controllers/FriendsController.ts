import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { FriendsClient } from '@ps2gg/friends/client'

const logger = getLogger('Friends')

export class FriendsController extends WsController {
  private _friends = new FriendsClient()

  constructor(ws: CensusWs) {
    super(ws, ['PlayerLogin'])
  }

  override onLogin(character_id: string, timestamp: Date): void {
    logger.info({ character_id }, 'Populate friends')
    try {
      this._friends.populate(character_id)
    } catch (error) {
      logger.error(error)
    }
  }
}
