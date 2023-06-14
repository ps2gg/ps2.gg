import { HttpClient } from '@ps2gg/common/http'
import { getLogger } from '@ps2gg/common/logging'
import { User } from '@ps2gg/users/types'
import { Logger } from 'pino'

export class UserClient extends HttpClient {
  private readonly _logger: Logger = getLogger('UsersClient')
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
    }
  }

  async getCharacter(characterId: string): Promise<User | undefined> {
    try {
      const params = { characterId }
      const req = await this.http.get<User>(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
    }
  }

  async getUser(userId: string): Promise<User | undefined> {
    try {
      const params = { userId }
      const req = await this.http.get<User>(this._url, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
    }
  }

  async addDiscordUser(discordId?: string, characterId?: string): Promise<User | undefined> {
    try {
      const payload = { discordId, characterId }
      const req = await this.http.post<User>(this._url, payload)
      return req.data
    } catch (error) {
      this._logger.error(error)
    }
  }

  async verifyCharacter(userId: string, characterId: string): Promise<User | undefined> {
    try {
      const params = { userId, characterId }
      const req = await this.http.get<User>(`${this._url}/verify`, { params })
      return req.data
    } catch (error) {
      this._logger.error(error)
    }
  }

  // TODO: Add link method, different getters
}
