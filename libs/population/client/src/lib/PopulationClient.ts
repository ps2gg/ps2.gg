import { getLogger } from '@ps2gg/common/logging'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubscriptionClient } from '@ps2gg/events/subscriptions'
import { Population } from '@ps2gg/population/types'

export class PopulationClient extends SubscriptionClient {
  private readonly _url = '/v1/population'
  private readonly _logger = getLogger('PopulationClient')

  constructor(host = 'http://population:3000') {
    super(host)
  }

  async getPopulation(id: string): Promise<Population> {
    try {
      const params = { id }
      const req = await this.http.get<Population>(this._url, { params })
      return req.data
    } catch (err) {
      this._logger.error(err)
      throw err
    }
  }

  async getBestFights(): Promise<Population[]> {
    try {
      const req = await this.http.get<Population[]>(`${this._url}/best-fights`)
      return req.data
    } catch (err) {
      this._logger.error(err)
      throw err
    }
  }
}
