import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['**/*.e2e-spec.ts'],
		globals: true,
		root: './',
		setupFiles: ['./test/setup-e2e.ts'],
		environment: 'node',
		coverage: {
			reportsDirectory: './coverage-e2e',
			provider: 'v8',
			reporter: ['text', 'html', 'lcov', 'cobertura'],
			include: ['src/**/*.ts'],
			exclude: [
				'**/types/**',
				'**/*.d.ts',
				'**/mocks/**',
				'src/main.ts',
				'**/*.module.ts',
				'**/*.dto.ts',
				'**/*.entity.ts',
				'**/*.decorator.ts',
				'**/*.guard.ts',
				'**/*.spec.ts',
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
			src: resolve(__dirname, './src'),
		},
	},
});
