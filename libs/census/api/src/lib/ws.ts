import { Subscription } from '@ps2gg/census/types'
import { getLogger } from '@ps2gg/common/logging'
import { client } from 'websocket'

const logger = getLogger('CensusWs')

export class CensusWs {
  private _fns: { (...args: any): void }[] = []
  private _subscriptions: Subscription[] = []
  private _state = 'closed'
  private _useFallback = false
  private _socket: any
  private _client: any
  private _lastMessageAt = new Date(0)
  private _wsUrl = 'wss://push.nanite-systems.net/streaming?environment=ps2&service-id=s:ps2gg'
  private _wsFallbackUrl = 'wss://push.planetside2.com/streaming?environment=ps2&service-id=s:ps2gg'

  lastMessageTimeout = 1000 * 10 // TODO: R
  connectionCycleInterval = 1000 * 60 * 10

  constructor() {
    this._init()
    this._checkDeadConnection()
  }

  private async _init(urlOverride?: string) {
    try {
      logger.info(`Attempt new connection to ${urlOverride || this._wsUrl}`)
      const { c, s } = await this._createClient(urlOverride)

      this._closePreviousSocket()
      this._socket = s
      this._client = c
    } catch (err) {
      logger.error(err)
      setTimeout(() => this._init(urlOverride), 1000)
    }
  }

  private _closePreviousSocket() {
    if (this._socket) {
      this._socket.removeAllListeners()
      this._socket.close()
    }
  }

  private async _createClient(urlOverride: string | undefined): Promise<any> {
    if (this._state === 'connecting') return
    this._state = 'connecting'
    this._useFallback = !!urlOverride

    const c = new client()
    const url = urlOverride || this._wsUrl

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    c.connect(url)

    return new Promise((resolve) => this._setClientListeners(c, url, resolve))
  }

  private _setClientListeners(c: any, url: string, resolve: any) {
    c.on('connect', (s: any) => this._onConnect(url, c, s, resolve))
    c.on('connectFailed', async (err: Error) => this._onConnectFailed(err))
  }

  private _setSocketListeners(c: any, s: any, resolve: any) {
    s.on('message', async (message: { utf8Data: string }) => this._onMessage(message, c, s, resolve))
    s.on('close', async (err: Error) => this._onClose(err))
    s.on('error', async (err: Error) => this._onError(err))
  }

  private _onConnect(url: string, c: any, s: any, resolve: any) {
    logger.info({ url }, 'Connected')
    this._state = 'open'

    for (const subscription of this._subscriptions) {
      this._sendWs(s, subscription)
    }
    this._setSocketListeners(c, s, resolve)
  }

  private _onConnectFailed(err: Error) {
    logger.error(err)
    this._state = 'closed'
    // Fall back to official API if nanite systems is down
    this._init(this._wsFallbackUrl)
  }

  private _onMessage(message: { utf8Data: string }, c: any, s: any, resolve: any) {
    resolve({ c, s })
    this._state = 'open'
    if (this._useFallback) this._lastMessageAt = new Date()
    this._publish(JSON.parse(message.utf8Data))
  }

  private _onClose(err: Error) {
    logger.error(err)
    this._state = 'closed'
    this._init()
  }

  private _onError(err: Error) {
    logger.error(err)
    this._state = 'closed'
    this._socket.close()
  }

  use(fn: { (...args: any): void }): void {
    this._fns.push(fn)
  }

  subscribe(subscription: Subscription): void {
    subscription = {
      service: 'event',
      action: 'subscribe',
      ...subscription,
    }
    this._subscriptions.push(subscription)
    // Already connected? Fire manually
    if (this._state === 'open') {
      this._sendWs(this._socket, subscription)
    }
  }

  private _publish(data: any) {
    for (const fn of this._fns) {
      fn(data)
    }
  }

  private _sendWs(s: any, data: any) {
    s.send(JSON.stringify(data))
  }

  // The original census API stops sending events at some point
  private _checkDeadConnection() {
    setInterval(() => this._reinitializeFallback(), this.connectionCycleInterval)
    setInterval(() => this._reinitializeIfNoMessages(), this.lastMessageTimeout)
  }

  private _reinitializeFallback() {
    if (this._useFallback) {
      this._init()
    }
  }

  private _reinitializeIfNoMessages() {
    if (this._lastMessageAt === undefined) this._lastMessageAt = new Date()
    const now = new Date().getTime()
    const lastMessageTime = this._lastMessageAt.getTime()
    const lastMessageTimeoutExceeded = now - lastMessageTime > this.lastMessageTimeout

    if (lastMessageTimeoutExceeded) {
      this._init(this._useFallback ? this._wsUrl : this._wsFallbackUrl)
    }
  }
}
