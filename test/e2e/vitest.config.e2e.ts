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

    // Coverage
    coverage: {
      reportsDirectory: './coverage/e2e',
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'cobertura'],
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
        '**/*.d.ts',
        '**/*.type.ts',
        '**/*.types.ts',
        '**/*.contract.ts',
        '**/*.interface.ts',
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
      '@Constants': resolve(__dirname, '../../src/shared/constants'),
      '@Dtos': resolve(__dirname, '../../src/infra/http/dtos'),
    },
  },
});
