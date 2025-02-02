/* global __dirname */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
