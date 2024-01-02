import { IncomingMessage, ServerResponse, createServer } from 'http'
import wt from 'worker_threads'
import { BASE_URL } from '../../config/consts.js'
import { readFile } from 'fs'

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

const app = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { pathname } = new URL(req.url || '/', BASE_URL)

  switch (pathname) {
    case '/': {
      readFile('./public/index.html', (err, data) => {
        res.end(data.toString('utf-8'))
      })

      break
    }
    case '/api/order/create': {
      createOrder()
      res.end('Order created')
      break
    }
    case '/api/order/get': {
      res.end(String(orderLength))
    }
    case '/api/order/get-long-polling': {
      subscribeUserOnChangeOrderLength(req, res)
      break
    }
    default: {
      res.statusCode = 404
      res.end('Page not found')
    }
  }
})

app.listen(3000)
console.log('Server is started on http://localhost:3000')
