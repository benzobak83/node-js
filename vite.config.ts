import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // ...vite configures
  server: {
    port: 3001
  },
  plugins: [
    VitePluginNode({
      adapter: 'express',
      appPath: './app/server.ts'
    }),
    tsconfigPaths()
  ]
})
