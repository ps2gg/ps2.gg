import { createLogger } from '@ps2gg/common/logging'
import { client } from 'websocket'
import { EventRequest } from './EventTypes'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Websocket client for internal services
 */
export class WebSocketClient {
  protected _logger = createLogger('WebSocketClient')
  protected _state = 'closed'
  protected _socket: any
  private _fns: { (...args: any): void }[] = []
  private _client: any
  private _connection: Promise<void>
  private _lastHeartbeat: Date | undefined

  constructor(private _url: string) {
    this._connection = this._init()
    this._heartbeat()
  }

  onMessage(fn: { (...args: any): void }): void {
    this._fns.push(fn)
  }

  afterInit(): void {
    // To be implemented by child classes
  }

  async send(data: EventRequest): Promise<void> {
    if (this._state !== 'open') await this._connection
    const message = JSON.stringify(data)
    this._logger.debug(data, `Sending message`)
    this._socket.send(message)
  }

  private async _init() {
    try {
      this._lastHeartbeat = undefined
      const { c, s } = await this._createClient()
      this._closePreviousSocket()
      this._socket = s
      this._client = c
      this.afterInit()
    } catch (err) {
      this._logger.error(err)
      await sleep(1000)
      this._init()
    }
  }

  private _closePreviousSocket() {
    // This requires the new socket to not be set until we
    // cleanly closed the old one
    if (this._socket) {
      this._socket.removeAllListeners()
      this._socket.close()
    }
  }

  private async _createClient(): Promise<any> {
    if (this._state === 'connecting') return
    this._state = 'connecting'
    this._logger.info({ url: this._url }, `Attempting connection`)

    const c = new client()
    c.connect(this._url)

    return new Promise((resolve) => this._setClientListeners(c, resolve))
  }

  private _setClientListeners(c: client, resolve: (value: unknown) => void) {
    c.on('connect', (s: any) => this._onConnect(c, s, resolve))
    c.on('connectFailed', async (err: any) => this._onConnectFailed())
  }

  private _setSocketListeners(s: any) {
    s.on('message', async (message: { utf8Data: string }) => this._onMessage(message))
    s.on('close', async () => this._onClose())
    s.on('error', async (err: any) => this._onError(err))
  }

  private _onConnect(c: any, s: any, resolve: any) {
    this._state = 'open'
    this._logger.info({ url: this._url }, `Connected`)
    this._setSocketListeners(s)
    resolve({ c, s })
  }

  private async _onConnectFailed() {
    this._state = 'closed'
    this._logger.error('Connection failed')
    await sleep(1000)
    this._connection = this._init()
  }

  private _onMessage(message: { utf8Data: string }) {
    const data = JSON.parse(message.utf8Data)
    this._state = 'open'
    this._logger.debug(data, `Received message`)
    if (data.event === 'heartbeat') return this._onHeartbeat()
    this._publish(data)
  }

  private _onClose() {
    this._state = 'closed'
    this._logger.error('Connection closed')
    this._connection = this._init()
  }

  private _onError(err: any) {
    this._state = 'closed'
    this._logger.error(err || 'Unspecified Connection error')
    this._socket.close()
  }

  private _heartbeat() {
    setInterval(() => {
      if (this._lastHeartbeat && this._lastHeartbeat.getTime() < Date.now() - 2000) this._failHeartbeat()
      if (this._state === 'open') this.send({ event: 'heartbeat' })
    }, 1000)
  }

  private _failHeartbeat() {
    this._state = 'closed'
    this._logger.error(`No heartbeat`)
    this._connection = this._init()
  }

  private _onHeartbeat() {
    this._lastHeartbeat = new Date()
  }

  private _publish(data: any) {
    for (const fn of this._fns) {
      fn(data)
    }
  }
}
