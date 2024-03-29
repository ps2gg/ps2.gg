import { getLogger } from '@ps2gg/common/logging'
import { SubscriptionClient } from '@ps2gg/events/subscriptions'
import { Player } from '@ps2gg/players/types'
import { Logger } from 'pino'

export class PlayerClient extends SubscriptionClient {
  private readonly _logger: Logger = getLogger('PlayerClient')
  private readonly _url = '/v1/player'

  constructor(host = 'http://players:3000') {
    super(host)
  }

  async findOne(id: string): Promise<Player> {
    try {
      const params = { id }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async findOneByName(name: string, refresh?: boolean): Promise<Player> {
    try {
      const params = { name, refresh }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async findMany(ids: string[]): Promise<Player[]> {
    try {
      const data = { ids }
      const req = await this.http.post('/v1/players/get', data)
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async findManyOnline(ids: string[]): Promise<Player[]> {
    try {
      const data = { ids }
      const req = await this.http.post('/v1/players/online/get', data)
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async populateOne(id: string, isOnline?: boolean, lastLogout?: Date): Promise<Player> {
    try {
      const data = { id, isOnline, lastLogout }
      const req = await this.http.post(this._url, data)
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async populateMany(ids: string[]): Promise<void> {
    try {
      const data = { ids }
      await this.http.post('/v1/players', data)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async resetOnlineState(serverId?: string): Promise<void> {
    try {
      const params = serverId ? { serverId } : undefined
      await this.http.post('/v1/players/online/reset', undefined, { params })
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async setLastActivity(id: string, lastActivity: Date): Promise<void> {
    try {
      const data = { id, lastActivity }
      await this.http.post(`${this._url}/last-activity`, data)
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}
