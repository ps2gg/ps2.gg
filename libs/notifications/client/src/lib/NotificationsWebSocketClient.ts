// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EventRequest, EventResponse, EventSubscription, WebSocketClient } from '@ps2gg/events/ws'

export class NotificationsWebSocketClient extends WebSocketClient {
  private _subscriptions: EventRequest[] = []
  private _events: { event: string; fn: (...params: any[]) => any }[] = []

  constructor(private _userId: string, _url = 'ws://notifications:3001/v1') {
    super(_url)
    this.onMessage((message: EventResponse) => this._handleEvent(message))
  }

  on(event: string, fn: (...params: any[]) => any): void {
    this._events.push({ event, fn })
  }

  subscribe(events: string[]): void {
    const subscription = { events, userId: this._userId }
    const payload = { event: 'subscribe', data: subscription }
    this._subscriptions.push(payload)

    // Already connected? Fire manually
    if (this._state === 'open') {
      this.send(payload)
    }
  }

  override afterInit(): void {
    this._registerStoredSubscriptions()
    this._socket.on('message', (message: { utf8Data: string }) => {
      const data: EventResponse = JSON.parse(message.utf8Data)
      this._acknowledgeSubscription(data)
    })
  }

  unsubscribe(subscription: EventSubscription): void {
    const payload = { event: 'unsubscribe', data: subscription }
    this._subscriptions = this._subscriptions.filter((s) => JSON.stringify(s) !== JSON.stringify(payload))

    if (this._state === 'open') {
      this.send(payload)
    }
  }

  private _handleEvent(message: EventResponse): void {
    const event = this._events.find((e) => e.event === message.event)

    if (!event) return
    event.fn(message)
  }

  private _acknowledgeSubscription(message: EventResponse): void {
    const subscriptionId = message.data?.subscription?.subscriptionId

    if (!subscriptionId) return
    this._logger.debug({ subscriptionId }, 'Notification acknowledged')
    this.send({ event: 'notified', data: { subscriptionId } })
  }

  private _registerStoredSubscriptions() {
    for (const subscription of this._subscriptions) {
      this.send(subscription)
    }
  }
}
