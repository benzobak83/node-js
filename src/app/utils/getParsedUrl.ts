import { IncomingMessage } from 'http'
import { BASE_URL } from '../../config/consts.js'

export const getParsedUrl = (req: IncomingMessage) => {
  const parsedUrl = new URL(req.url || '/', BASE_URL)

  return parsedUrl
}
