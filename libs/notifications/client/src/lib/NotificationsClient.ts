/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ServerId } from '@ps2gg/census/types'
import { HttpClient } from '@ps2gg/common/http'
import { PopulationSubscription, Subscription } from '@ps2gg/notifications/types'

export class NotificationsClient extends HttpClient {
  private readonly _populationUrl = '/v1/subscriptions/population'

  constructor(host = 'http://notifications:3000') {
    super(host)
  }

  async getPopulationSubscriptions(scope: string, serverId: ServerId): Promise<PopulationSubscription[] | undefined> {
    const params = { scope, serverId }
    const req = await this.http.get<PopulationSubscription[]>(this._populationUrl, { params })
    return req.data
  }

  async setPopulationSubscription(subscription: Subscription, serverId: ServerId, min = 12, max = 96): Promise<PopulationSubscription | undefined> {
    const payload = { subscription, serverId, min, max }
    const req = await this.http.post<PopulationSubscription>(this._populationUrl, payload)
    return req.data
  }

  async removePopulationSubscription(userId: string, scope: string, serverId: ServerId): Promise<PopulationSubscription | undefined> {
    const params = { userId, scope, serverId }
    const req = await this.http.delete<PopulationSubscription>(this._populationUrl, { params })
    return req.data
  }
}
