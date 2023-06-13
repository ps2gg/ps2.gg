import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()

  constructor(ws: CensusWs) {
    super(ws, ['PlayerLogin', 'PlayerLogout'])
  }

  override onLogin(character_id: string): void {
    this._logger.info({ character_id, isOnline: true }, 'Populate player')
    this._players.post(character_id, true)
  }

  override onLogout(character_id: string, timestamp: Date): void {
    this._logger.info({ character_id, isOnline: false, timestamp }, 'Populate player')
    this._players.post(character_id, false, timestamp)
  }
}
