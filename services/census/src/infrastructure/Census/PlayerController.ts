import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()

  constructor() {
    super(['PlayerLogin', 'PlayerLogout'])
  }

  override async onLogin(character_id: string): Promise<void> {
    this._logger.info({ character_id }, 'Player Login')
    await this._players.post(character_id, true)
  }
}
