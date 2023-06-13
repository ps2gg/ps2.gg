import { HttpClient } from '@ps2gg/common/http'
import { getLogger } from '@ps2gg/common/logging'
import { Player } from '@ps2gg/players/types'
import { Logger } from 'pino'

export class PlayerClient extends HttpClient {
  private readonly _logger: Logger = getLogger('ExampleClient')
  private readonly _url = '/v1/player'

  constructor(host = 'http://players:3000') {
    super(host)
  }

  async get(id: string): Promise<Player | undefined> {
    try {
      const params = { id }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  async getByName(name: string): Promise<Player | undefined> {
    try {
      const params = { name }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      return
    }
  }

  async getMany(ids: string[]): Promise<Player[] | undefined> {
    try {
      const params = { ids }
      const req = await this.http.get('/v1/players', { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      return
    }
  }

  async getOnline(ids: string[]): Promise<Player[] | undefined> {
    try {
      const params = { ids }
      const req = await this.http.get('/v1/players/online', { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      return
    }
  }

  async post(id: string, isOnline: boolean, lastLogout?: Date): Promise<Player | undefined> {
    try {
      const data = { id, isOnline, lastLogout }
      const req = await this.http.post(this._url, data)
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  async primeMany(ids: string[]): Promise<void> {
    try {
      const data = { ids }
      await this.http.post('/v1/players/prime', data)
    } catch (error) {
      this._logger.error(error)
    }
  }
}
