import { Channel } from 'app/core/Channel/Channel.ts'

export enum ChannelNames {
  'ORDER_FLOW'
}

export class Broadcast {
  channels: Record<ChannelNames, Channel>

  constructor() {
    this.channels = {} as Record<ChannelNames, Channel>
  }

  createChannel(channelName: ChannelNames) {
    const channel = new Channel()

    this.channels[channelName] = channel
    return channel
  }

  getChannel(channelName: ChannelNames) {
    return this.channels?.[channelName] ?? null
  }
}
