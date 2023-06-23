// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { EventRequest, EventResponse, WebSocketClient } from '@ps2gg/events/ws'

export class EventClient extends WebSocketClient {
  private _subscriptions: EventRequest[] = []
  private _events: { event: string; fn: (...params: any[]) => any }[] = []

  constructor(private _userId: string, service: string) {
    const url = `ws://${service}:3001/v1/events`
    super(url)
    this.onMessage((message: EventResponse) => this._handleEvent(message))
  }

  on(event: string, fn: (...params: any[]) => any): void {
    this._events.push({ event, fn })
  }

  removeListeners(event: string): void {
    this._events = this._events.filter((e) => e.event !== event)
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
      const event: EventResponse = JSON.parse(message.utf8Data)

      // This would tell the server to never send the event again
      // until it's reset. It's useful for long-lasting events, such
      // as alerts or population info, but for most cases it's not needed.
      // An entity will have the __resetSubscriptions property set as a
      // boolean if it is actually a long-lasting event.
      if (event.data && event.data.__resetSubscriptions === null) return
      this._acknowledgeSubscription(event)
    })
  }

  unsubscribe(events: string[]): void {
    const subscription = { events, userId: this._userId }
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
    const subscriptionId = message.subscription?.subscriptionId

    if (!subscriptionId) return
    this._logger.debug({ subscriptionId }, 'Event acknowledged')
    this.send({ event: 'acknowledged', data: { subscriptionId } })
  }

  private _registerStoredSubscriptions() {
    for (const subscription of this._subscriptions) {
      this.send(subscription)
    }
  }
}
