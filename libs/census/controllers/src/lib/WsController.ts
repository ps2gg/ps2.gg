/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { censusWs } from '@ps2gg/census/api'
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

  constructor(eventTypes: string[]) {
    this._registerEventListeners(eventTypes)
  }

  private _registerEventListeners(eventTypes: string | string[]): void {
    if (eventTypes.includes('Heartbeat')) censusWs.use((data) => this._onHeartbeat(data))
    if (eventTypes.includes('PlayerLogin')) censusWs.use((data) => this._onLogin(data))
    if (eventTypes.includes('PlayerLogout')) censusWs.use((data) => this._onLogout(data))
    if (eventTypes.includes('Death')) censusWs.use((data) => this._onDeath(data))
    if (eventTypes.includes('ItemAdded')) censusWs.use((data) => this._onItemAdded(data))
    if (eventTypes.includes('VehicleDestroy')) censusWs.use((data) => this._onVehicleDestroy(data))
    if (eventTypes.includes('GainExperience')) censusWs.use((data) => this._onGainExperience(data))
    if (eventTypes.includes('ContinentLock')) censusWs.use((data) => this._onContinentLock(data))
  }

  onHeartbeat(heartbeat: Heartbeat): void {}
  private _onHeartbeat(data: CensusWsEvent): void {
    if (data.type === 'heartbeat') {
      // @ts-ignore
      this.onHeartbeat(data.online)
    }
  }

  onItemAdded(character_id: string, item_id: string, context: string): void {}
  private _onItemAdded(data: CensusWsEvent): void {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'ItemAdded') {
      const { character_id, context, item_id } = payload

      this.onItemAdded(character_id, item_id, context)
    }
  }

  onDeath(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {}
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

  onVehicleDestroy(timestamp: Date, server: string, continent: string, winner: PlayerLoadout, loser: PlayerLoadout, loadout: string, vehicle: string): void {}
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

  onGainExperience(experience_id: string, timestamp: Date, character_id: string, other_id: string): void {}
  private _onGainExperience(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'GainExperience') {
      const { character_id, other_id } = payload
      const timestamp = new Date(parseInt(payload.timestamp) * 1000)

      this.onGainExperience(payload.experience_id, timestamp, character_id, other_id)
    }
  }

  onContinentLock(server: string, continent: string): void {}
  private _onContinentLock(data: CensusWsEvent) {
    const { payload } = data

    if (!payload) return

    if (payload.event_name === 'ContinentLock') {
      const server = servers[payload.world_id]
      const continent = continents[payload.zone_id]

      this.onContinentLock(server, continent)
    }
  }

  onLogin(character_id: string, timestamp: Date): void {}
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

  onLogout(character_id: string, timestamp: Date): void {}
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
  }) {
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
