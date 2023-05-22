// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SubscriptionClient } from '@ps2gg/events/subscriptions'
import { Population } from '@ps2gg/population/types'

export class PopulationClient extends SubscriptionClient {
  private readonly _url = '/v1/population'

  constructor(host = 'http://population:3000') {
    super(host)
  }

  async getPopulation(scope: string): Promise<Population | undefined> {
    const params = { scope }
    const req = await this.http.get<Population>(this._url, { params })
    return req.data
  }
}
