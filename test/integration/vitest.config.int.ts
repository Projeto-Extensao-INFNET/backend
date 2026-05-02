import { resolve } from 'node:path';

import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'integration',
    include: ['test/integration/**/*.test.{ts,tsx}'],
    environment: 'node',
    root: resolve(__dirname, '../..'),
    globals: true,
    fileParallelism: false,
    testTimeout: 15000,

    setupFiles: [resolve(__dirname, 'vitest.setup.ts')],

    coverage: {
      reportsDirectory: './coverage/integration',
      provider: 'v8',
      include: ['src/**/*.ts'],
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
});
