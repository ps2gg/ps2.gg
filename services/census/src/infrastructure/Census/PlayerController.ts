import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { getLogger } from '@ps2gg/common/logging'
import { sleep } from '@ps2gg/common/util'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()

  constructor(ws: CensusWs) {
    super(ws, ['PlayerLogin', 'PlayerLogout'])

    // We can't ensure 100% uptime, so we reset the online state
    // on every connect, assuming missed events.
    this._resetOnlineState()
    ws.on('connect', () => this._resetOnlineState())
  }

  private async _resetOnlineState(): Promise<void> {
    try {
      await this._players.resetOnlineState()
    } catch (error) {
      // The player service may not be available yet, so we retry until it is
      await sleep(1000)
      return this._resetOnlineState()
    }
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
