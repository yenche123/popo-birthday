import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { qrcode } from 'vite-plugin-qrcode'

const { version } = require("./package.json")
const projectRoot = process.cwd()


export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(projectRoot, 'src')}/`,
    },
  },

  plugins: [
    vue(),
    qrcode(),
  ],
  
  server: {
    host: true,
    port: 5177,
  },

  build: {
    sourcemap: true,
  },

  preview: {
    port: 4177,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      },
      sass: {
        api: "modern-compiler"
      }
    }
  },
  
  define: {
    "LIU_ENV": {
      version,
      "client": "web",
    }
  }
})
