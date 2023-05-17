// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { HttpClient } from '@ps2gg/common/http'
import { Population } from '@ps2gg/population/types'

export class PopulationClient extends HttpClient {
  private readonly _url = '/v1/population'

  constructor(host = 'http://population:3000') {
    super(host)
  }

  async getPopulation(scope: string, serverId: string): Promise<Population | undefined> {
    const params = { serverId, scope }
    const req = await this.http.get<Population>(this._url, { params })
    return req.data
  }
}
