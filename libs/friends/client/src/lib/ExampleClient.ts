import { HttpClient } from '@ps2gg/common/http'
import { createLogger } from '@ps2gg/common/logging'
import { User } from '@ps2gg/users/types'
import { Logger } from 'pino'

export class ExampleClient extends HttpClient {
  private readonly _logger: Logger = createLogger('ExampleClient')
  private readonly _url = '/v1/example'

  constructor(host = 'http://friends:3000') {
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
}
