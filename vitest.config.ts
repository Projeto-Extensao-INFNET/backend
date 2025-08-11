import { resolve } from 'node:path';
import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		root: './',
		environment: 'node',
		include: ['**/*.spec.ts'],
		coverage: {
			reportsDirectory: './coverage',
			reporter: ['text', 'html', 'lcov', 'cobertura'],
			provider: 'v8',
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
				'**/*.e2e-spec.ts',
				'**/*.controller.ts',
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
