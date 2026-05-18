import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  framework: 'storybook-react-rsbuild',
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-themes', 'storybook-addon-rslib'],
  rsbuildFinal(config) {
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
