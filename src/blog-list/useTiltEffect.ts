import { useEffect } from 'react';

const DEFAULT_MAX_DEGREE = 6;

export function useTiltEffect(
  selector: string,
  { maxDegree = DEFAULT_MAX_DEGREE, disabled = false } = {},
) {
  useEffect(() => {
    if (disabled || typeof document === 'undefined') {
      return;
    }

    const items = document.querySelectorAll<HTMLElement>(selector);

    const handleMouseMove = (e: MouseEvent, item: HTMLElement) => {
      const rect = item.getBoundingClientRect();
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

    const handleMouseLeave = (item: HTMLElement) => {
      item.style.transform = 'none';
      item.style.removeProperty('--rs-blog-card-pointer-x');
      item.style.removeProperty('--rs-blog-card-pointer-y');
    };

    const handlers = new Map<
      HTMLElement,
      { move: (e: Event) => void; leave: () => void }
    >();

    for (const item of Array.from(items)) {
      const move = (e: Event) => handleMouseMove(e as MouseEvent, item);
      const leave = () => handleMouseLeave(item);

      item.addEventListener('mousemove', move);
      item.addEventListener('mouseleave', leave);
      handlers.set(item, { move, leave });
    }

    return () => {
      handlers.forEach(({ move, leave }, item) => {
        item.removeEventListener('mousemove', move);
        item.removeEventListener('mouseleave', leave);
      });
    };
  }, [selector, maxDegree, disabled]);
}
