import { readFile, readFileSync } from 'fs'
import { IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import { getDirName } from '../../../utils/getDirName.js'

export const favicon = (req: IncomingMessage, res: ServerResponse) => {
  res.end('img not found')
}

export const home = (req: IncomingMessage, res: ServerResponse) => {
  const pathUrl = path.resolve(
    getDirName(import.meta.url),
    '../../../views/index.html'
  )

  console.log(pathUrl)

  res.end(readFileSync(pathUrl).toString('utf-8'))
}
