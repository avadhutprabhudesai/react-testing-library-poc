const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest-dom/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jest-dom'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      files: '*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: '*.json',
      extends: ['plugin:json/recommended-with-comments'],
    },
    {
      files: ['**/__test__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config'),
          },
        },
      },
    },
  ],
};
