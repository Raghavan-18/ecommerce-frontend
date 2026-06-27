import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
    server:{
      proxy:{
      '/api':{
        target: 'https://ecommerce-backend-obr0.onrender.com',
        changeOrigin: true
      },
      '/images':{
        target: 'https://ecommerce-backend-obr0.onrender.com',
        changeOrigin: true
      }
    }
  }
})
