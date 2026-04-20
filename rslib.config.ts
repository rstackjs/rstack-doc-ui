import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { defineConfig, rspack } from '@rslib/core';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  lib: [
    {
      syntax: 'es2018',
      autoExternal: false,
      tools: {
        rspack(config) {
          config.plugins.push(
            new rspack.BannerPlugin({
              banner: `import './index.css';`,
              raw: true,
              // Only add CSS import to entry chunks, not rslib-runtime or split chunks
              include: /^[a-z][\w-]*\/index\.js$/,
            }),
          );
        },
      },
      dts: true,
      source: {
        entry: {
          'nav-icon': './src/nav-icon/index.tsx',
          benchmark: './src/benchmark/index.tsx',
          'blog-avatar': './src/blog-avatar/index.tsx',
          'blog-list': './src/blog-list/index.tsx',
          'tool-stack': './src/tool-stack/index.tsx',
          hero: './src/hero/index.tsx',
          'section-style': './src/section-style/index.tsx',
          'fully-featured': './src/fully-featured/index.tsx',
          'built-with-rspack': './src/built-with-rspack/index.tsx',
          'why-rspack': './src/why-rspack/index.tsx',
          'background-image': './src/background-image/index.tsx',
          announcement: './src/announcement/index.tsx',
        },
      },
    },
    // without banner
    {
      syntax: 'es2018',
      autoExternal: false,
      dts: true,
      source: {
        entry: {
          antd: './src/antd/index.tsx',
        },
      },
    },
  ],
  output: {
    target: 'web',
    externals: ['react', 'react-dom', 'react/jsx-runtime'],
    filename: {
      js: '[name]/index.js',
      css: '[name]/index.css',
    },
    distPath: {
      css: '',
    },
  },
});
