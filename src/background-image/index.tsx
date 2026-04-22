import { type FC, useEffect, useState } from 'react';
import styles from './index.module.scss';

const useTopArrived = () => {
  const [scrollY, setScrollY] = useState(0);
  const topArrived = scrollY < 100;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      capture: false,
      passive: true,
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    topArrived,
  };
};

export type BackgroundProps = {
  navBarTopArrived?: boolean;
};

export const BackgroundImage: FC<BackgroundProps> = ({
  navBarTopArrived = true,
}) => {
  const { topArrived } = useTopArrived();

  useEffect(() => {
    if (!navBarTopArrived) {
      return;
    }
    if (topArrived) {
      document.body.classList.remove('notTopArrived');
    } else {
      document.body.classList.add('notTopArrived');
    }
  }, [topArrived, navBarTopArrived]);

  return (
    <>
      {/* For transparent navbar, overrides css only in homepage, and unmounted in other pages */}
      <style>
        {'body:not(.notTopArrived) .rp-nav {background: transparent !important; border-bottom: 1px solid transparent !important;}' +
          '.rp-nav {background: color-mix(in srgb,var(--rp-c-bg) 60%,transparent);backdrop-filter: blur(25px);-webkit-backdrop-filter: blur(25px);}'}
      </style>
      <img
        className={styles.background}
        src="https://assets.rspack.rs/rspack/assets/landingpage-background-compressed.png"
        alt="background"
      />
    </>
  );
};
