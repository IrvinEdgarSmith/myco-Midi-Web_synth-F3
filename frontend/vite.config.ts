import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import audioWorkletPlugin from './audioWorkletPlugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), audioWorkletPlugin()],
})
