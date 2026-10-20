import type React from 'react';
import { memo, useEffect, useRef } from 'react';
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

  const toolsRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);

  // Pointer-tracked edge light: updates --pointer-x/y and --pointer-strength
  // on each card based on the cursor distance, and re-centers each card's
  // SVG radial gradient on the cursor.
  useEffect(() => {
    const grid = toolsRef.current;
    if (!grid) return;
    const items = Array.from(grid.children) as HTMLElement[];

    function clearEdgeLight() {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
      for (const item of items) {
        item.style.setProperty('--pointer-strength', '0');
        const glow = item.querySelector<SVGElement>('svg');
        if (glow) glow.style.opacity = '0';
      }
    }

    function renderEdgeLight() {
      frameRef.current = 0;
      const { x: pointerX, y: pointerY } = pointerRef.current;

      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
        const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
        const distance = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - distance / 120);
        const glow = item.querySelector<SVGElement>('svg');
        const gradient =
          item.querySelector<SVGRadialGradientElement>('radialGradient');
        if (!glow || !gradient) return;

        const localX = (pointerX - rect.left).toFixed(1);
        const localY = (pointerY - rect.top).toFixed(1);
        gradient.setAttribute('cx', localX);
        gradient.setAttribute('cy', localY);
        item.style.setProperty('--pointer-x', `${localX}px`);
        item.style.setProperty('--pointer-y', `${localY}px`);
        item.style.setProperty('--pointer-strength', strength.toFixed(3));
        glow.style.opacity = strength.toFixed(3);
      }
    }

    function updateEdgeLight(event: PointerEvent) {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        clearEdgeLight();
        return;
      }
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (!frameRef.current) {
        frameRef.current = requestAnimationFrame(renderEdgeLight);
      }
    }

    window.addEventListener('pointermove', updateEdgeLight, { passive: true });
    window.addEventListener('blur', clearEdgeLight);
    document.documentElement.addEventListener('pointerleave', clearEdgeLight);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', updateEdgeLight);
      window.removeEventListener('blur', clearEdgeLight);
      document.documentElement.removeEventListener(
        'pointerleave',
        clearEdgeLight,
      );
    };
  }, []);

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
      <div className={styles.tools} ref={toolsRef}>
        {tools.map(({ name, desc, logo, url, urlText }) => {
          const gradientId = `rs-tool-stack-edge-gradient-${name}`;
          const blurId = `rs-tool-stack-edge-blur-${name}`;
          return (
            <a
              target="_blank"
              rel="noreferrer"
              className={styles.tool}
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
              <svg
                className={styles.edgeGlow}
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <radialGradient
                    id={gradientId}
                    gradientUnits="userSpaceOnUse"
                    cx="0"
                    cy="0"
                    r="130"
                  >
                    <stop
                      offset="0"
                      stopColor="var(--rs-tool-stack-brand)"
                      stopOpacity="var(--rs-tool-stack-glow-peak)"
                    />
                    <stop
                      offset="0.32"
                      stopColor="var(--rs-tool-stack-brand)"
                      stopOpacity="var(--rs-tool-stack-glow-mid)"
                    />
                    <stop
                      offset="0.62"
                      stopColor="var(--rs-tool-stack-brand)"
                      stopOpacity="var(--rs-tool-stack-glow-tail)"
                    />
                    <stop
                      offset="1"
                      stopColor="var(--rs-tool-stack-brand)"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  <filter
                    id={blurId}
                    x="-40%"
                    y="-70%"
                    width="180%"
                    height="240%"
                  >
                    <feGaussianBlur stdDeviation="3.5" />
                  </filter>
                </defs>
                <rect
                  className={`${styles.edgeStroke} ${styles.edgeHalo}`}
                  stroke={`url(#${gradientId})`}
                  filter={`url(#${blurId})`}
                />
                <rect
                  className={`${styles.edgeStroke} ${styles.edgeLine}`}
                  stroke={`url(#${gradientId})`}
                />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
});

ToolStack.displayName = 'ToolStack';
