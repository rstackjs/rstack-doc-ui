import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';

export const useLottieAnimation = (
  isHovering: boolean,
  lottieJsonData?: string,
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!lottieJsonData) {
      return;
    }
    const animation = lottie.loadAnimation({
      container: ref.current,
      animationData: lottieJsonData,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });

    animation.setSpeed(3);

    animationRef.current = animation;
  }, [lottieJsonData]);
  useEffect(() => {
    if (!animationRef.current || !ref.current) {
      return;
    }

    if (isHovering) {
      animationRef.current.goToAndPlay(0, true);
    } else {
      animationRef.current.goToAndStop(0, true);
    }
  }, [isHovering]);

  return {
    ref,
  };
};
