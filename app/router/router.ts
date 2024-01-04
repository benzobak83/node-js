import { OrderController } from 'app/controllers/Order/index.js'
import { StaticController } from 'app/controllers/Static/index.js'
import { IncomingMessage, ServerResponse } from 'http'

export const ROUTES: Record<
  string,
  (req: IncomingMessage, res: ServerResponse) => any
> = {
  '/': StaticController.home,
  '/favicon.ico': StaticController.favicon,

  '/api/order/create': OrderController.create,
  '/api/order/get': OrderController.get,
  '/api/order/subscribe': OrderController.subscribeOnNewOrder
}
