import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server:{
    host:true
  },
  build: {
    minify: 'terser', 
  },
  optimizeDeps: {
    exclude: ["lottie-web"],
  },
})
