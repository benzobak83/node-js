import { PORT } from './src/config/consts'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // ...vite configures
  server: {
    port: PORT
  },
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: './src/server.ts'
    }),
    tsconfigPaths()
  ]
})
