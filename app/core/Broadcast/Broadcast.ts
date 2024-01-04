import { Channel } from 'app/core/Channel/Channel.ts'

export class Broadcast {
  channels: Record<symbol, Channel>

  constructor() {
    this.channels = {}
  }

  createChannel(description: string) {
    const id = Symbol(description)
    const channel = new Channel()

    this.channels[id] = channel
    return channel
  }
}
