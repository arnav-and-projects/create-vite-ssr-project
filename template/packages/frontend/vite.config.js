import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSSR from 'vite-ssr/plugin'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        viteSSR(),
        react()
    ],
    resolve: {
        dedupe: ['react', 'react-dom', 'react-router-dom'],
        alias: {
            // Fix for vite-ssr dependency on react-dom/server.js
            'react-dom/server.js': resolve(__dirname, 'src/react-dom-server-shim.js'),
        }
    },
    ssr: {
        external: ['react-dom']
    },
    build: {
        rollupOptions: {
            external: ['@apollo/client/react/ssr']
        }
    }
})
