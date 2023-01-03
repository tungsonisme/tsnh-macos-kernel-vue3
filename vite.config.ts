import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), dts(), cssInjectedByJsPlugin()],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/exposes.ts'),
        name: 'MacosKernel',
        fileName: 'macos-kernel',
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  };
});
