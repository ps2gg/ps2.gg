import { HttpClient } from '@ps2gg/common/http'
import { getLogger } from '@ps2gg/common/logging'
import { User } from '@ps2gg/users/types'
import { Logger } from 'pino'

export class PlayerClient extends HttpClient {
  private readonly _logger: Logger = getLogger('ExampleClient')
  private readonly _url = '/v1/player'

  constructor(host = 'http://players:3000') {
    super(host)
  }

  async get(id: string): Promise<User | undefined> {
    try {
      const params = { id }
      const req = await this.http.get(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  async post(id: string, isOnline: boolean, lastLogout?: Date): Promise<User | undefined> {
    try {
      const data = { id, isOnline, lastLogout }
      const req = await this.http.post(this._url, data)
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }
}
