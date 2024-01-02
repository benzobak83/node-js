import { IncomingMessage, ServerResponse } from 'http'
import { OrderController } from '../controllers/Order/index.js'
import { StaticController } from '../controllers/Static/index.js'

export const ROUTES: Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => any
> = {
  '/': StaticController.home,
  '/favicon.ico': StaticController.favicon,

  '/api/order/create': OrderController.create,
  '/api/order/get': OrderController.get,
  '/api/order/subscribe': OrderController.subscribeOnNewLength
}
