import path from 'path'
import { fileURLToPath } from 'url'

export function getDirName(moduleUrl: string) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}
