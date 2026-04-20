import { useEffect } from 'react';

const DEFAULT_MAX_DEGREE = 6;

const getTiltItem = (target: EventTarget | null, selector: string) => {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>(selector);
};

const resetTilt = (item: HTMLElement | null) => {
  if (!item) {
    return;
  }

  item.style.transform = 'none';
  item.style.removeProperty('--rs-blog-card-pointer-x');
  item.style.removeProperty('--rs-blog-card-pointer-y');
};

export function useTiltEffect(
  selector: string,
  { maxDegree = DEFAULT_MAX_DEGREE, disabled = false } = {},
) {
  useEffect(() => {
    if (disabled || typeof document === 'undefined') {
      return;
    }

    let activeItem: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const item = getTiltItem(e.target, selector);

      if (!item) {
        resetTilt(activeItem);
        activeItem = null;
        return;
      }

      if (activeItem && activeItem !== item) {
        resetTilt(activeItem);
      }

      activeItem = item;

      const rect = item.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        return;
      }

      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      const rotateX = -y * maxDegree;
      const rotateY = x * maxDegree;

      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      item.style.setProperty(
        '--rs-blog-card-pointer-x',
        `${e.clientX - rect.left}px`,
      );
      item.style.setProperty(
        '--rs-blog-card-pointer-y',
        `${e.clientY - rect.top}px`,
      );
    };

    const handleMouseOut = (e: MouseEvent) => {
      const item = getTiltItem(e.target, selector);

      if (!item) {
        return;
      }

      if (e.relatedTarget instanceof Node && item.contains(e.relatedTarget)) {
        return;
      }

      resetTilt(item);

      if (activeItem === item) {
        activeItem = null;
      }
    };

    const handleWindowBlur = () => {
      resetTilt(activeItem);
      activeItem = null;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      resetTilt(activeItem);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [selector, maxDegree, disabled]);
}
