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
        ? 'A high performance JavaScript bundler written in Rust, with webpack-compatible API'
        : '基于 Rust 编写的高性能 JavaScript 打包工具，具备与 webpack 兼容的 API',
      logo: 'https://assets.rspack.rs/rspack/rspack-logo.svg',
      url: 'https://rspack.rs',
      urlText: 'rspack.rs',
    },
    {
      name: 'Rsbuild',
      desc: isEn
        ? 'An Rspack-based build tool that provides out-of-the-box setup'
        : '基于 Rspack 的构建工具，包含开箱即用的预设配置，带来愉悦的开发体验',
      logo: 'https://assets.rspack.rs/rsbuild/rsbuild-logo.svg',
      url: 'https://rsbuild.rs',
      urlText: 'rsbuild.rs',
    },
    {
      name: 'Rslib',
      desc: isEn
        ? 'A Rsbuild-based library development tool for creating libraries and UI components'
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
        ? 'A one-stop build analyzer that makes the build process transparent'
        : '一站式的构建分析工具，使构建流程变得透明、可预测和可优化',
      logo: 'https://assets.rspack.rs/rsdoctor/rsdoctor-logo-480x480.png',
      url: 'https://rsdoctor.rs',
      urlText: 'rsdoctor.rs',
    },
    {
      name: 'Rstest',
      desc: isEn
        ? 'A testing framework that provides first-class support for Rspack ecosystem'
        : '基于 Rspack 的测试框架，为 Rspack 生态提供全面、一流的支持',
      logo: 'https://assets.rspack.rs/rstest/rstest-logo.svg',
      url: 'https://rstest.rs/',
      urlText: 'rstest.rs',
    },
    {
      name: 'Rslint',
      desc: isEn
        ? 'A high-performance JavaScript and TypeScript linter based on typescript-go'
        : '基于 typescript-go 的高性能 JavaScript 和 TypeScript 代码检查工具',
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
            ? 'A unified JavaScript toolchain centered on Rspack, optimized for speed, built for the age of AI.'
            : '以 Rspack 为核心的 JavaScript 统一工具链，性能优先，为 AI 时代而生。'}
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
