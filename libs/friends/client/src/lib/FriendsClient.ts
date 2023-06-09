import { HttpClient } from '@ps2gg/common/http'
import { getLogger } from '@ps2gg/common/logging'
import { Friends } from '@ps2gg/friends/types'
import { Logger } from 'pino'

export class FriendsClient extends HttpClient {
  private readonly _logger: Logger = getLogger('FriendsClient')
  private readonly _url = '/v1/friends'

  constructor(host = 'http://friends:3000') {
    super(host)
  }

  async get(character_id: string, refresh?: boolean): Promise<Friends> {
    try {
      const params = { refresh }
      const req = await this.http.get(`${this._url}/${character_id}`, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async getMany(ids: string[]): Promise<Friends> {
    try {
      const params = { ids }
      const req = await this.http.get(`${this._url}`, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }

  async populate(character_id: string): Promise<Friends> {
    try {
      const body = { character_id }
      const req = await this.http.post(`${this._url}/populate`, body)
      return req.data
    } catch (error) {
      this._logger.error(error)
      throw error
    }
  }
}
