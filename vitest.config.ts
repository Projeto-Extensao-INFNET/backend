import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Configs básicas
    include: ['**/*.spec.ts'],
    reporters: ['verbose'],
    environment: 'node',
    root: './',
    globals: true,
    restoreMocks: true,
    clearMocks: true,
    testTimeout: 10000,

    // UI (não está funcionando no WSL)
    // ui: true,
    // open: true,

    // Performance
    pool: 'threads',
    poolOptions: {
      threads: {
        minThreads: 4,
        maxThreads: 8,
      },
    },

    // Setup Global
    // setupFiles: [resolve(__dirname, 'vitest.setup.ts')],

    // Coverage
    coverage: {
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov', 'cobertura'],
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        '**/types/**',
        '**/dto/**',
        '**/*.d.ts',
        '**/*.dto.ts',
        '**/mocks/**',
        '**/mocks/**',
        '**/factories/**',
        '**/generated/**',
        'src/main.ts',
        '**/*.module.ts',
        '**/*.e2e-spec.ts',
        '**/*.controller.ts',
        '**/*.entity.ts',
        '**/*.decorator.ts',
        '**/*.guard.ts',
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
      src: resolve(__dirname, './src'),
    },
  },
});
