import { resolve } from 'node:path';

import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'unit',
    include: ['test/unit/**/*.spec.{ts,tsx}'],
    environment: 'node',
    root: resolve(__dirname, '../..'),
    globals: true,
    fileParallelism: false,
    testTimeout: 10000,

    // UI
    // ui: true,
    // open: true,

    // Setup File
    setupFiles: [resolve(__dirname, 'vitest.setup.ts')],

    // Coverage
    coverage: {
      reportsDirectory: './coverage/unit',
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
        '**/dtos/**',
        '**/*.d.ts',
        '**/*.dto.ts',
        '**/*.type.ts',
        '**/*.types.ts',
        '**/*.contract.ts',
        '**/*.interface.ts',
        '**/*.controller.ts',
        '**/*.model.ts',
        '**/*.decorator.ts',
        '**/*.guard.ts',
        '**/*.entity.ts',
        '**/*.module.ts',
        '**/*.mock.{ts,tsx}',
        '**/*.mocks.{ts,tsx}',
        '**/mocks/**',
        '**/__mocks__/**',
        '**/__tests__/**',
        '**/generated/**',
      ],

      // Metas de cobertura dos testes
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
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
      '@Services': resolve(__dirname, '../../src/application/services'),
      '@Controllers': resolve(__dirname, '../../src/infra/http/controllers'),
      '@constants': resolve(__dirname, '../../src/shared/constants'),
      '@dtos': resolve(__dirname, '../../src/infra/http/dtos'),
    },
  },
});
