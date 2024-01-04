import { BASE_URL } from 'config/consts.js'
import { IncomingMessage } from 'http'

export const getParsedUrl = (req: IncomingMessage) => {
  const parsedUrl = new URL(req.url || '/', BASE_URL)

  return parsedUrl
}
