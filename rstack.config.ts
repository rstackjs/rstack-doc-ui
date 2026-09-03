// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';

define.lib(async () => {
  const { pluginReact } = await import('@rsbuild/plugin-react');
  const { pluginSass } = await import('@rsbuild/plugin-sass');
  const { rspack } = await import('rstack/lib');

  return {
    plugins: [pluginReact(), pluginSass()],
    source: {
      define: {
        // Keep the Rspress SSG-MD runtime flag in library output.
        // Consumers replace `import.meta.env.SSG_MD` in their own builds.
        'import.meta.env': 'import.meta.env',
      },
    },
    lib: [
      {
        syntax: 'es2018',
        output: {
          autoExternal: false,
        },
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
            'blog-back-button': './src/blog-back-button/index.tsx',
            'blog-authors': './src/blog-authors/index.tsx',
            'blog-list': './src/blog-list/index.tsx',
            'blog-background': './src/blog-background/index.tsx',
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
        output: {
          autoExternal: false,
        },
        dts: true,
        source: {
          entry: {
            antd: './src/antd/index.tsx',
          },
        },
      },
      {
        source: {
          entry: {
            theme: './src/theme.scss',
          },
        },
      },
    ],
    output: {
      target: 'web',
      externals: [/^react($|\/)/, /^react-dom($|\/)/, /^@rspress\/core($|\/)/],
      filename: {
        js: '[name]/index.js',
        css: '[name]/index.css',
      },
      distPath: {
        css: '',
      },
    },
  };
});

define.test({
  include: ['src/**/*.test.{ts,tsx}'],
  testEnvironment: 'node',
  source: {
    define: {
      'import.meta.env.SSG_MD': true,
    },
  },
});

define.lint(({ js, reactPlugin, ts }) => [
  js.configs.recommended,
  ts.configs.recommended,
  reactPlugin.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);

define.fmt({
  arrowParens: 'avoid',
  ignorePatterns: ['.claude/'],
  singleQuote: true,
  sortPackageJson: true,
  trailingComma: 'all',
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint', 'rs fmt'],
  '*.{json,jsonc,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});
