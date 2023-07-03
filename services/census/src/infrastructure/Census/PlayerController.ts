import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()

  constructor(ws: CensusWs) {
    super(ws, ['PlayerLogin', 'PlayerLogout'])
    // We can't ensure 100% uptime, so we need to prevent
    // players from being stuck online forever
    this._players.resetOnlineState()
  }

  override async onLogin(character_id: string): Promise<void> {
    this._logger.info({ character_id, isOnline: true }, 'populate player')
    try {
      await this._players.populateOne(character_id, true)
    } catch (error) {
      // TODO: consider retry mechanism
    }
  }

  override async onLogout(character_id: string, timestamp: Date): Promise<void> {
    this._logger.info({ character_id, isOnline: false, timestamp }, 'populate player')
    try {
      await this._players.populateOne(character_id, false, timestamp)
    } catch (error) {
      // TODO: consider retry mechanism
    }
  }
}
