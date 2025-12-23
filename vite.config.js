import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { dirname,resolve } from 'path'
import {fileURLToPath} from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve:{
    alias:{
      '#components':resolve(dirname(fileURLToPath(import.meta.url)),'src/components'),
      '#store':resolve(dirname(fileURLToPath(import.meta.url)),'src/store'),
      '#windows':resolve(dirname(fileURLToPath(import.meta.url)),'src/windows'),
      '#constants':resolve(dirname(fileURLToPath(import.meta.url)),'src/constants'),
      '#hoc':resolve(dirname(fileURLToPath(import.meta.url)),'src/hoc'),
    }
  }
})
