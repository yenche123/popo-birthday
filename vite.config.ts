import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const projectRoot = process.cwd()

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(projectRoot, 'src')}/`,
    },
  },

  plugins: [vue()],
  
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
  }
})
