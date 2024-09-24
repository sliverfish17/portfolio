import { defineConfig } from 'eslint-define-config';
import vue from 'eslint-plugin-vue';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vueEslintParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['*.js', '*.ts', '*.vue'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tsPlugin,
      prettier,
    },
    rules: {
      ...prettier.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['*.vue'],
    languageOptions: {
      parser: vueEslintParser,
    },
  },
]);
