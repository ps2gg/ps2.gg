import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { FriendsClient } from '@ps2gg/friends/client'

export class FriendsController extends WsController {
  private _friends = new FriendsClient()
  private _logger = getLogger()

  constructor(ws: CensusWs) {
    super(ws, ['PlayerLogin'])
  }

  override async onLogin(character_id: string, timestamp: Date): Promise<void> {
    this._logger.info({ character_id }, 'Populate friends')
    this._friends.populate(character_id)
  }
}
