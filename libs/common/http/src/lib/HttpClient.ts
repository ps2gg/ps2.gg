import axios, { AxiosInstance } from 'axios'
import * as https from 'https'

export class HttpClient {
  readonly http: AxiosInstance
  private readonly _httpsAgent = new https.Agent({ keepAlive: true })

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      timeout: 1000 * 60,
      httpsAgent: this._httpsAgent,
    })
  }
}
