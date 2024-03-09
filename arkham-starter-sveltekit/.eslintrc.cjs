module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['plugin:svelte/recommended', 'plugin:svelte/prettier', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'], parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.svelte'],
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
}
