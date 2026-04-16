import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Configs básicas
    name: 'e2e',
    include: ['test/e2e/**/*.e2e-spec.ts'],
    environment: 'node',
    root: resolve(__dirname, '../..'),
    globals: true,
    fileParallelism: false,
    testTimeout: 30000,
    maxWorkers: 1,
    maxConcurrency: 1,

    // Coverage
    coverage: {
      reportsDirectory: './coverage',
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'cobertura'],
      include: ['src/**/*.ts'],
    },
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, '../../src'),
      src: resolve(__dirname, '../../src'),
      __mocks__: resolve(__dirname, '../../src/__mocks__'),
    },
  },
});
