import { IncomingMessage, ServerResponse, createServer } from 'http'
import wt from 'worker_threads'
import { BASE_URL } from '../../config/consts.js'
import { readFile } from 'fs'
import { getParsedUrl } from '../../app/utils/getParsedUrl.js'
import { ROUTES } from '../../app/router/router.js'

function trigger404(req: IncomingMessage, res: ServerResponse) {
  return () => {
    res.statusCode = 404
    res.end('Page not found')
  }
}

const app = createServer((req: IncomingMessage, res: ServerResponse) => {
  const { pathname } = getParsedUrl(req)
  const reqFn = ROUTES?.[pathname] ?? trigger404(req, res)

  reqFn(req, res)
})

app.listen(3000)
console.log('Server is started on http://localhost:3000')
