import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { Heartbeat } from '@ps2gg/census/types'
import { getLogger } from '@ps2gg/common/logging'
import { sleep } from '@ps2gg/common/util'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()

  constructor(ws: CensusWs) {
    super(ws, ['Heartbeat', 'PlayerLogin', 'PlayerLogout'])

    // We can't ensure 100% uptime, so we reset the online state
    // on every connect, assuming missed events.
    this._resetOnlineState()
    ws.on('connect', () => this._resetOnlineState())
  }

  override async onHeartbeat(heartbeat: Heartbeat): Promise<void> {
    for (const server of Object.keys(heartbeat)) {
      if (heartbeat[server] !== 'false') continue
      const serverId = server.split('_')[2]
      await this._resetOnlineState(serverId)
    }
  }

  override async onLogin(character_id: string): Promise<void> {
    if (character_id !== '5429423912977254945') return
    this._logger.info({ character_id, isOnline: true }, 'populate player')
    try {
      await this._players.populateOne(character_id, true)
    } catch (error) {
      // TODO: consider retry mechanism
    }
  }

  override async onLogout(character_id: string, timestamp: Date): Promise<void> {
    if (character_id !== '5429423912977254945') return
    this._logger.info({ character_id, isOnline: false, timestamp }, 'populate player')
    try {
      await this._players.populateOne(character_id, false, timestamp)
    } catch (error) {
      // TODO: consider retry mechanism
    }
  }

  private async _resetOnlineState(serverId?: string): Promise<void> {
    try {
      this._logger.info({ serverId }, 'reset player online state')
      await this._players.resetOnlineState(serverId)
    } catch (error) {
      // The player service may not be available yet, so we retry until it is
      await sleep(1000)
      return this._resetOnlineState(serverId)
    }
  }
}
