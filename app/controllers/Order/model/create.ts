import { Events, eventBus } from 'app/globals/EventBus/eventBus.js'
import { TOrder } from './types.js'
import { IncomingMessage, ServerResponse } from 'http'
import { conn } from 'app/globals/Sql/sql.ts'

let ai = 1

export const create = async (req: IncomingMessage, res: ServerResponse) => {
  const connRes = await conn.query('INSERT INTO orders VALUES ()')
  const orders = await conn.query(
    `SELECT * FROM orders WHERE id = ${connRes.insertId}`
  )
  eventBus.emit(Events['ORDER:CREATED'], orders[0])

  res.statusCode = 200
  res.end(JSON.stringify(orders[0]))
}
