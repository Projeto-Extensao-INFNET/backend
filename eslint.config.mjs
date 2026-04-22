import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, import: pluginImport },
    extends: ['js/recommended'],
    rules: {
      // 'sort-imports': [
      //   'error',
      //   {
      //     ignoreCase: false,
      //     ignoreDeclarationSort: true,
      //     ignoreMemberSort: false,
      //     allowSeparatedGroups: true,
      //     memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
      //   },
      // ],
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'internal', 'external', 'type'],
      //     'newlines-between': 'always',
      //     alphabetize: {
      //       order: 'asc',
      //       caseInsensitive: true,
      //     },
      //   },
      // ],
    },
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,

  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
]);
