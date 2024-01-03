import { ROUTES } from 'app/router/router.js'
import { getParsedUrl } from 'app/utils/getParsedUrl.js'
import {
  IncomingMessage,
  RequestListener,
  ServerResponse,
  createServer
} from 'http'

function trigger404(req: IncomingMessage, res: ServerResponse) {
  return () => {
    res.statusCode = 404
    res.end('Page not found')
  }
}

const requestListener: RequestListener = (req, res) => {
  const { pathname } = getParsedUrl(req)
  const reqFn = ROUTES?.[pathname] ?? trigger404(req, res)

  reqFn(req, res)
}

if (false) {
  //TODO: end PROD
  const app = createServer(requestListener)
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}

export const viteNodeApp = requestListener
