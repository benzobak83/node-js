import { Events, eventBus } from 'app/globals/EventBus/eventBus.js'
import { TOrder } from './types.js'
import { IncomingMessage, ServerResponse } from 'http'

let ai = 1

export const create = (req: IncomingMessage, res: ServerResponse) => {
  const order = { id: ai++, createdAt: new Date() }

  eventBus.emit(Events['ORDER:CREATED'], order)

  res.statusCode = 200
  res.end(JSON.stringify(order))
}
