import { Channel } from 'app/core/Channel/Channel.js'
import { Events, eventBus } from 'app/globals/EventBus/eventBus.js'

import { IncomingMessage, ServerResponse } from 'http'
import { broadcast } from 'app/globals/Broadcast/broadcast.ts'
import { TOrder } from './types.ts'

export const orders: TOrder[] = []

const orderChannel = broadcast.createChannel('Subscribe on new order flow')

eventBus.on(Events['ORDER:CREATED'], (order: TOrder) => {
  orders.push(order)
  orderChannel.messageForAllSubscribers(order)
})

export const subscribeOnNewOrder = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const TIMEOUT = 30000

  orderChannel.addSubscriber(res)

  setTimeout(() => {
    res.end(`Application wasnt created for ${TIMEOUT / 1000} seconds`)
  }, TIMEOUT)
}
