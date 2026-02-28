/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      workbox:{
        skipWaiting: true,
        clientsClaim: true
      },

      manifest: {
        name: "Habitly",
        short_name: "Habitly",
        description: "Track habit daily and stay consistent",
        theme_color: "#5A7ACD",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          },
        ]
      }
    })
  ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
