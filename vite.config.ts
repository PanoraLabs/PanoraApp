import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: [
      '@noble/hashes',
      '@noble/curves',
      '@noble/ciphers',
      'react',
      'react-dom',
    ],
  },
  optimizeDeps: {
    include: [
      '@noble/hashes/sha256',
      '@noble/hashes/sha512',
      '@noble/curves/secp256k1',
      '@noble/curves/ed25519',
    ],
  },
})
