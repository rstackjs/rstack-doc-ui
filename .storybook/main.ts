import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const require = createRequire(import.meta.url);
const reactDir = dirname(require.resolve('react/package.json'));
const reactDomDir = dirname(require.resolve('react-dom/package.json'));

const config: StorybookConfig = {
  framework: 'storybook-react-rsbuild',
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-themes', 'storybook-addon-rslib'],
  rsbuildFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      react: reactDir,
      'react-dom': reactDomDir,
    };

    config.source ??= {};
    config.source.define = {
      ...config.source.define,
      'import.meta.env': JSON.stringify({
        SSG_MD: false,
      }),
    };

    return config;
  },
};

export default config;
