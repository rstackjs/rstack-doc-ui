import type { FC } from 'react';
import { useRef, useState } from 'react';
import BackgroundStar from './BackgroundStar';
import styles from './index.module.scss';

const positions = [
  [91.4, 22.9],
  [36, 67.6],
  [94.1, 47.7],
  [33.8, 32.5],
  [43.1, 77.6],
  [9.8, 73.4],
  [16.1, 17.1],
  [1, 10],
  [88.3, 44.9],
  [19.3, 79],
  [28.5, 11.8],
  [94.6, 44.9],
  [53.8, 3.4],
  [41.7, 20],
  [56.9, 80.6],
  [16.4, 83.4],
  [39.4, 66.8],
  [19, 18.4],
  [25.1, 28.1],
  [18.9, 35.6],
  [32.9, 12.3],
  [21.2, 72.8],
  [83.3, 79.8],
  [71.4, 36.8],
  [62.2, 50.4],
  [45.4, 13.7],
  [61.1, 28.5],
  [18.2, 64.1],
  [40.7, 34.7],
  [87.6, 20.7],
  [78.3, 30.8],
  [84.4, 58.2],
  [74.2, 74.5],
  [12.4, 66.4],
  [68.2, 41.6],
];

const useMouseMove = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [pageX, setPageX] = useState<null | number>(null);
  const [pageY, setPageY] = useState<null | number>(null);

  const handleMove = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    setPageX(pageX);
    setPageY(pageY);
  };

  return {
    ref,
    pageX,
    pageY,
    onMouseMove: handleMove,
  };
};

type HeroProps = {
  onClickGetStarted: () => void;
  onClickLearnMore?: () => void;

  showStars?: boolean;
  showOvalBg?: boolean;
  logoUrl?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  getStartedButtonText?: string;
  learnMoreButtonText?: string;
  githubURL?: string;
};

export const Hero: FC<HeroProps> = ({
  onClickGetStarted,
  onClickLearnMore,
  showStars = false,
  showOvalBg = true,
  logoUrl = 'https://assets.rspack.rs/rspack/rspack-logo.svg',
  title = 'Rspack',
  subTitle = 'The fast Rust-based web bundler',
  description = 'Seamlessly replace webpack with compatible API',
  getStartedButtonText = 'Get Started',
  learnMoreButtonText = 'Learn More',
  githubURL,
}) => {
  const { pageX, pageY, ref, onMouseMove } = useMouseMove();

  return (
    <section className={styles.hero} ref={ref} onMouseMove={onMouseMove}>
      <div className={styles.innerHero}>
        {showStars
          ? positions.map(([top, left], i) => {
              return (
                <BackgroundStar
                  key={i}
                  top={`${top}%`}
                  left={`${left}%`}
                  size={i / 20 + 3}
                  pageX={pageX}
                  pageY={pageY}
                />
              );
            })
          : null}
        <div className={styles.logo}>
          <img
            src={logoUrl}
            className={`${styles.logoImg} rs-logo`}
            alt="logo"
          />
          {showOvalBg ? <div className={`${styles.ovalBg} rs-oval`} /> : null}
        </div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
        <p className={styles.subtitle}>{subTitle}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            type="button"
            onClick={onClickGetStarted}
          >
            {getStartedButtonText}
          </button>
          {githubURL ? (
            <a
              href={githubURL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 24 24"
                className={styles.githubIcon}
              >
                <title>GitHub</title>
                <path
                  fill="currentColor"
                  d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
              GitHub
            </a>
          ) : (
            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
              type="button"
              onClick={onClickLearnMore}
            >
              {learnMoreButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
