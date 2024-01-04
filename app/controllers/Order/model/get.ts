import { IncomingMessage, ServerResponse } from 'http'
import { orders } from './subscribe.ts'

export const get = (req: IncomingMessage, res: ServerResponse) => {
  res.end(JSON.stringify(orders))
}
