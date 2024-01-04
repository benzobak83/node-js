type TCallback = (...args: any) => any

export class EventBus<EventsKey extends string | number> {
  private _listeners: Record<EventsKey, TCallback[]>

  constructor() {
    this._listeners = {} as Record<EventsKey, TCallback[]>
  }

  public on(event: EventsKey, callback: TCallback) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }

    this._listeners[event].push(callback)
  }

  public off(event: EventsKey, callback: () => void): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback
    )
  }

  public emit<T>(event: EventsKey, ...args: T[]) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
