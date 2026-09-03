import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  framework: 'storybook-react-rsbuild',
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-themes'],
  rsbuildFinal(config) {
    config.plugins ??= [];
    config.plugins.push(pluginReact(), pluginSass());

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
