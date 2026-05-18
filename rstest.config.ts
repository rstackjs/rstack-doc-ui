import { defineConfig } from '@rstest/core';
import { withRslibConfig } from '@rstest/adapter-rslib';

export default defineConfig({
  extends: withRslibConfig(),
  include: ['src/**/*.test.{ts,tsx}'],
  testEnvironment: 'node',
  source: {
    define: {
      'import.meta.env.SSG_MD': true,
    },
  },
});
