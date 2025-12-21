const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      'react-hooks': reactHooks,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React rules
      'react/jsx-key': 'error',
      'react/no-array-index-key': 'warn',
      'react/self-closing-comp': 'warn',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General rules
      'no-debugger': 'error',
    },
  },
]
