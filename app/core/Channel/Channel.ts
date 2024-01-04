import { ServerResponse } from 'http'

type TChannelSubscriber = { res: ServerResponse; createdAt: Date }

export class Channel {
  private _subscribers: Map<ServerResponse, TChannelSubscriber>

  constructor() {
    this._subscribers = new Map()
  }

  public addSubscriber(res: ServerResponse) {
    const subscriber: TChannelSubscriber = { res, createdAt: new Date() }
    this._subscribers.set(res, subscriber)

    res.on('close', () => this.removeSubscriber(res))
  }

  public removeSubscriber(res: ServerResponse) {
    this._subscribers.delete(res)
  }

  public messageForAllSubscribers(data: any) {
    this._subscribers.forEach((subscriber) => {
      if (subscriber.res.closed) {
        console.log('proverka')
        return
      }

      subscriber.res.end(JSON.stringify(data))
    })
  }
}
