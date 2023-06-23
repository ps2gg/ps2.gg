/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CensusWs } from '@ps2gg/census/api'
import { CensusWsEvent, Heartbeat, PlayerLoadout } from '@ps2gg/census/types'
import { continents, infantry, servers, vehicles } from '@ps2gg/common/constants'

/**
 * Parent class to be inherited by service-specific controllers.
 * The method parameters only include what's needed, not what's
 * available on the API.
 */
export class WsController {
  private _lastLoginId = ''
  private _lastLogoutId = ''

  constructor(private _ws: CensusWs, eventTypes: string[]) {
    this._registerEventListeners(eventTypes)
  }

  /**
   * These functions are to be overridden by child classes.
   */
  onHeartbeat(heartbeat: Heartbeat): void {}
  onItemAdded(character_id: string, item_id: string, context: string): void {}
  onDeath(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {}
  onVehicleDestroy(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {}
  onGainExperience(experience_id: string, timestamp: Date, character_id: string, other_id: string): void {}
  onContinentLock(server: string, continent: string): void {}
  onLogin(character_id: string, timestamp: Date): void {}
  onLogout(character_id: string, timestamp: Date): void {}

  private _registerEventListeners(eventTypes: string | string[]): void {
    if (eventTypes.includes('Heartbeat')) this._ws.use((data) => this._onHeartbeat(data))
    if (eventTypes.includes('PlayerLogin')) this._ws.use((data) => this._onLogin(data))
    if (eventTypes.includes('PlayerLogout')) this._ws.use((data) => this._onLogout(data))
    if (eventTypes.includes('Death')) this._ws.use((data) => this._onDeath(data))
    if (eventTypes.includes('ItemAdded')) this._ws.use((data) => this._onItemAdded(data))
    if (eventTypes.includes('VehicleDestroy')) this._ws.use((data) => this._onVehicleDestroy(data))
    if (eventTypes.includes('GainExperience')) this._ws.use((data) => this._onGainExperience(data))
    if (eventTypes.includes('ContinentLock')) this._ws.use((data) => this._onContinentLock(data))
  }

  private _onHeartbeat(data: CensusWsEvent): void {
    if (data.type === 'heartbeat') {
      // @ts-ignore
      this.onHeartbeat(data.online)
    }
  }

  private _onItemAdded(data: CensusWsEvent): void {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'ItemAdded') {
      const { character_id, context, item_id } = payload

      this.onItemAdded(character_id, item_id, context)
    }
  }

  private _onDeath(data: CensusWsEvent): void {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'Death') {
      const { winner, loser } = this._getWinnerLoser(payload)
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)
      const server = servers[payload.world_id]
      const continent = continents[payload.zone_id]
      const loadout = infantry[winner.loadout_id]
      const vehicle = vehicles[winner.vehicle_id]

      this.onDeath(timestamp, server, continent, winner, loser, loadout, vehicle)
    }
  }

  private _onVehicleDestroy(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'VehicleDestroy') {
      const { winner, loser } = this._getWinnerLoser(payload)
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)
      const server = servers[payload.world_id]
      const continent = continents[payload.zone_id]
      const loadout = infantry[winner.loadout_id]
      const vehicle = vehicles[winner.vehicle_id]

      this.onVehicleDestroy(timestamp, server, continent, winner, loser, loadout, vehicle)
    }
  }

  private _onGainExperience(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'GainExperience') {
      const { character_id, other_id } = payload
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)

      this.onGainExperience(payload.experience_id, timestamp, character_id, other_id)
    }
  }

  private _onContinentLock(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'ContinentLock') {
      const server = servers[payload.world_id]
      const continent = continents[payload.zone_id]

      this.onContinentLock(server, continent)
    }
  }

  private _onLogin(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return
    const { character_id } = payload

    if (payload.event_name === 'PlayerLogin' && character_id !== this._lastLoginId) {
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)

      this._lastLoginId = character_id
      this.onLogin(character_id, timestamp)
    }
  }

  private _onLogout(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return
    const { character_id } = payload

    if (payload.event_name === 'PlayerLogout' && character_id !== this._lastLogoutId) {
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)

      this._lastLogoutId = character_id
      this.onLogout(character_id, timestamp)
    }
  }

  private _getWinnerLoser(payload: {
    attacker_character_id: any
    attacker_vehicle_id: any
    attacker_loadout_id: any
    character_id: any
    vehicle_id: any
    character_loadout_id: any
  }): WinnerLoser {
    return {
      winner: {
        character_id: payload.attacker_character_id,
        vehicle_id: payload.attacker_vehicle_id,
        loadout_id: payload.attacker_loadout_id,
      },
      loser: {
        character_id: payload.character_id,
        vehicle_id: payload.vehicle_id,
        loadout_id: payload.character_loadout_id,
      },
    }
  }
}

type WinnerLoser = {
  winner: PlayerLoadout
  loser: PlayerLoadout
}
