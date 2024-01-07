import { IncomingMessage, ServerResponse } from 'http'
import { conn } from 'app/globals/Sql/sql.ts'

export const get = async (req: IncomingMessage, res: ServerResponse) => {
  const orders = await conn.query('SELECT * FROM orders')

  res.statusCode = 200
  res.end(JSON.stringify(orders))
}
