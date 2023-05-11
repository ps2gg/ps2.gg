import { HttpClient } from '@ps2gg/common/http'
import { createLogger } from '@ps2gg/common/logging'
import { User } from '@ps2gg/users/types'
import { Logger } from 'pino'

export class UsersClient extends HttpClient {
  private readonly _logger: Logger = createLogger('UsersClient')
  private readonly _url = '/v1/user'

  constructor(host = 'http://users:3000') {
    super(host)
  }

  async getDiscordUser(discordId: string): Promise<User | undefined> {
    try {
      const params = { discordId }
      const req = await this.http.get<User>(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  async getUser(userId: string): Promise<User | undefined> {
    try {
      const params = { userId }
      const req = await this.http.get<User>(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  async addDiscordUser(discordId?: string, characterId?: string): Promise<User | undefined> {
    try {
      const payload = { discordId, characterId }
      const req = await this.http.post<User>(this._url, payload)
      return req.data
    } catch (error) {
      this._logger.error(error)

      return
    }
  }

  // TODO: Add link method, different getters
}
