import { CensusWs } from '@ps2gg/census/api'
import { WsController } from '@ps2gg/census/controllers'
import { Heartbeat } from '@ps2gg/census/types'
import { getLogger } from '@ps2gg/common/logging'
import { sleep } from '@ps2gg/common/util'
import { PlayerClient } from '@ps2gg/players/client'

export class PlayerController extends WsController {
  private _players = new PlayerClient()
  private _logger = getLogger()
  private _lastActivityCharacterId: string

  constructor(ws: CensusWs) {
    super(ws, ['ItemAdded', 'PlayerLogin', 'PlayerLogout', 'VehicleDestroy', 'Death', 'ContinentLock', 'GainExperience'])

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

  override async onLogin(character_id: string, timestamp: Date): Promise<void> {
    this._logger.info({ character_id, isOnline: true }, 'populate player')
    await this._populatePlayer(character_id, true, timestamp)
    await this._setLastActivity(character_id, timestamp)
  }

  override async onLogout(character_id: string, timestamp: Date): Promise<void> {
    this._logger.info({ character_id, isOnline: false, timestamp }, 'populate player')
    await this._populatePlayer(character_id, false, timestamp)
    await this._setLastActivity(character_id, timestamp)
  }

  override async onItemAdded(character_id: string, item_id: string, timestamp: Date): Promise<void> {
    await this._setLastActivity(character_id, timestamp)
  }

  private async _populatePlayer(character_id: string, isOnline: boolean, timestamp?: Date): Promise<void> {
    this._logger.info({ character_id, isOnline: true }, 'populate player')
    try {
      await this._players.populateOne(character_id, isOnline, timestamp)
    } catch (error) {
      // TODO: consider retry mechanism
    }
  }

  private async _setLastActivity(character_id: string, timestamp: Date): Promise<void> {
    if (this._lastActivityCharacterId === character_id) return // Some character events may be called en masse
    this._logger.info({ character_id, timestamp }, 'set last player activity')
    try {
      await this._players.setLastActivity(character_id, timestamp)
    } catch (err) {
      // The player service may not be available yet, so we retry until it is
      this._logger.warn({ character_id, timestamp, err }, "couldn't set player activity")
      await sleep(1000)
      return this._setLastActivity(character_id, timestamp)
    }
  }

  private async _resetOnlineState(serverId?: string): Promise<void> {
    try {
      this._logger.info({ serverId }, 'reset player online states')
      await this._players.resetOnlineState(serverId)
    } catch (err) {
      // The player service may not be available yet, so we retry until it is
      this._logger.warn({ serverId, err }, "couldn't reset player online states")
      await sleep(1000)
      return this._resetOnlineState(serverId)
    }
  }
}
