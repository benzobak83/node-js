import { IncomingMessage, ServerResponse } from 'http'

type TSubscriber = {
  id: number
  res: ServerResponse
}

let orderLength = 0
const subscribersOnOrderLength: TSubscriber[] = []
let ai = 1

function subscribeUserOnChangeOrderLength(
  req: IncomingMessage,
  res: ServerResponse
) {
  const timeout = 30000

  const user = { id: ai++, res }
  subscribersOnOrderLength.push(user)

  res.on('close', () => {
    unsubscribeUserOnChangeOrderLength(user.id)
  })

  setTimeout(() => {
    res.end(`Application wasnt created for ${timeout / 1000} seconds`)
  }, timeout)
}

function unsubscribeUserOnChangeOrderLength(userId: number) {
  subscribersOnOrderLength.filter((subscriber) => subscriber.id !== userId)
}

function sendOderLengthForSubscribers() {
  subscribersOnOrderLength.forEach((subscriber) => {
    subscriber.res.end(String(orderLength))
  })
}

function createOrder() {
  orderLength++
  sendOderLengthForSubscribers()
}

//--------------------------

export const create = (req: IncomingMessage, res: ServerResponse) => {
  createOrder()
  res.end('Order created')
}

export const get = (req: IncomingMessage, res: ServerResponse) => {
  res.end(String(orderLength))
}

export const subscribeOnNewLength = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  subscribeUserOnChangeOrderLength(req, res)
}
