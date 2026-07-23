import type React from 'react';
import { memo } from 'react';
import {
  descStyle,
  innerContainerStyle,
  titleAndDescStyle,
  titleStyle,
} from '../section-style';
import styles from './index.module.scss';

export const ToolStack: React.FC<{ lang: string }> = memo(({ lang }) => {
  const isEn = lang === 'en';
  const tools = [
    {
      name: 'Rspack',
      desc: isEn
        ? 'A fast Rust-based bundler for the web, with a modernized webpack API'
        : '基于 Rust 编写的高性能 Web 打包工具，提供现代化的 webpack API',
      logo: 'https://assets.rspack.rs/rspack/rspack-logo.svg',
      url: 'https://rspack.rs',
      urlText: 'rspack.rs',
    },
    {
      name: 'Rsbuild',
      desc: isEn
        ? 'A fast, extensible build tool for modern web development, powered by Rspack'
        : '基于 Rspack 的现代 Web 构建工具，快速且易于扩展',
      logo: 'https://assets.rspack.rs/rsbuild/rsbuild-logo.svg',
      url: 'https://rsbuild.rs',
      urlText: 'rsbuild.rs',
    },
    {
      name: 'Rslib',
      desc: isEn
        ? 'An Rsbuild-based library development tool for creating libraries and UI components'
        : '基于 Rsbuild 的库开发工具，以简单的方式创建 JavaScript 库和 UI 组件库',
      logo: 'https://assets.rspack.rs/rslib/rslib-logo.svg',
      url: 'https://rslib.rs',
      urlText: 'rslib.rs',
    },
    {
      name: 'Rspress',
      desc: isEn
        ? 'An Rsbuild-based static site generator for creating documentation sites'
        : '基于 Rsbuild 的静态站点生成器，用于创建优雅的文档站点',
      logo: 'https://assets.rspack.rs/rspress/rspress-logo-480x480.png',
      url: 'https://rspress.rs',
      urlText: 'rspress.rs',
    },
    {
      name: 'Rsdoctor',
      desc: isEn
        ? 'An AI-friendly build analyzer that makes the build process transparent'
        : 'AI 友好的构建分析工具，使构建流程变得透明、可预测和可优化',
      logo: 'https://assets.rspack.rs/rsdoctor/rsdoctor-logo-480x480.png',
      url: 'https://rsdoctor.rs',
      urlText: 'rsdoctor.rs',
    },
    {
      name: 'Rstest',
      desc: isEn
        ? 'A JavaScript testing framework powered by Rspack, with a Jest-compatible API'
        : '基于 Rspack 的 JavaScript 测试框架，兼容 Jest API',
      logo: 'https://assets.rspack.rs/rstest/rstest-logo.svg',
      url: 'https://rstest.rs/',
      urlText: 'rstest.rs',
    },
    {
      name: 'Rslint',
      desc: isEn
        ? 'A high-performance, ESLint-compatible linter for JavaScript and TypeScript'
        : '高性能 JavaScript 和 TypeScript 代码检查工具，兼容 ESLint 生态',
      logo: 'https://assets.rspack.rs/rslint/rslint-logo.svg',
      url: 'https://rslint.rs/',
      urlText: 'rslint.rs',
    },
  ];

  return (
    <div className={innerContainerStyle}>
      <div className={titleAndDescStyle}>
        <h1 className={titleStyle}>Rstack</h1>
        <p className={descStyle}>
          {isEn
            ? 'The fast, unified JavaScript toolchain for developers and agents'
            : '高性能、一体化的 JavaScript 工具链，为开发者与 Agent 打造'}
        </p>
      </div>
      <div className={styles.tools}>
        {tools.map(({ name, desc, logo, url, urlText }) => {
          return (
            <a
              target="_blank"
              rel="noreferrer"
              className={[styles.tool, styles.rainbow].join(' ')}
              key={name}
              href={url}
            >
              <img
                src={logo}
                alt={name}
                className={styles.logo}
                loading="lazy"
              />
              <div className={styles.toolTitle}>{name}</div>
              <p className={styles.toolDescription}>{desc}</p>
              <div className={styles.toolUrl}>{urlText}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
});
