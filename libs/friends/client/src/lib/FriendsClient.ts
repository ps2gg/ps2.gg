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

  async get(id: string): Promise<Friends | undefined> {
    try {
      const params = { id }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
      return
    }
  }

  async populate(id: string): Promise<Friends | undefined> {
    try {
      const body = { id }
      const req = await this.http.post(`${this._url}/populate`, body)
      return req.data
    } catch (error) {
      this._logger.error(error)
      return
    }
  }
}
