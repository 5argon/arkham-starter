module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['svelte3', '@typescript-eslint', 'simple-import-sort'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    { files: ['*.svelte'], processor: 'svelte3/svelte3' },
    { files: ['*.ts'], extends: 'plugin:prettier/recommended' },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
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
