import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common'
import { MessageMappingProperties } from '@nestjs/websockets'
import { Observable, fromEvent, EMPTY } from 'rxjs'
import { mergeMap, filter } from 'rxjs/operators'
import * as WebSocket from 'ws'

/**
 * Debug class when ws isn't working.
 * Use @nestjs/platform-ws instead.
 * NOT INTENDED FOR PRODUCTION OR EVEN DEVELOPMENT
 * DEBUG ONLY
 */
export class WsAdapter implements WebSocketAdapter {
  constructor(private _app: INestApplicationContext) {
    console.warn('Using @ps2gg/events/WsAdapter instead of @nestjs/platform-ws. This is not intended for production or regular development.')
  }

  create(port: number, options: WebSocket.ServerOptions): any {
    return new WebSocket.Server({ port, ...options })
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientConnect(server: WebSocket.WebSocketServer, callback: Function): void {
    // @ts-ignore
    server.on('connection', (socket) => {
      socket.on('message', (m) => console.log(m.toString()))
      callback(socket)
    })
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  bindClientDisconnect(socket: WebSocket.WebSocket, callback: Function): void {
    // @ts-ignore
    socket.on('close', callback)
  }

  bindMessageHandlers(client: WebSocket, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>): void {
    fromEvent(client, 'message')
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        mergeMap((data: any) => this.bindMessageHandler(data, handlers, process)),
        filter((result) => result)
      )
      .subscribe((response) => client.send(JSON.stringify(response)))
  }

  bindMessageHandler(buffer: { data: string }, handlers: MessageMappingProperties[], process: (data: any) => Observable<any>): Observable<any> {
    const message = JSON.parse(buffer.data)
    const messageHandler = handlers.find((handler) => handler.message === message.event)

    if (!messageHandler) {
      return EMPTY
    }

    return process(messageHandler.callback(message.data))
  }

  close(server: WebSocket.WebSocketServer): void {
    server.close()
  }
}
