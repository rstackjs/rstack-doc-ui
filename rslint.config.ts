import { defineConfig, reactPlugin, ts } from '@rslint/core';

export default defineConfig([
  ts.configs.recommended,
  reactPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
