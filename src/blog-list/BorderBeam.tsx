import { useEffect, useRef } from 'react';
import styles from './BorderBeam.module.scss';

type ResizeSubscription = {
  observe: (target: HTMLDivElement) => void;
  disconnect: () => void;
};

export type BorderBeamProps = {
  color?: string;
  size?: number;
  duration?: number;
  className?: string;
};

export function BorderBeam({
  color = '#12e5e5',
  size = 3,
  duration = 4,
  className,
}: BorderBeamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext('2d', { alpha: true });

    if (!context) {
      return;
    }

    let canvasWidth = 0;
    let canvasHeight = 0;

    const updateCanvasSize = () => {
      const nextCanvas = canvasRef.current;
      const nextContainer = containerRef.current;

      if (!nextCanvas || !nextContainer) {
        return;
      }

      const { width, height } = nextContainer.getBoundingClientRect();

      if (width === 0 || height === 0) {
        canvasWidth = 0;
        canvasHeight = 0;
        nextCanvas.width = 0;
        nextCanvas.height = 0;
        return;
      }

      canvasWidth = Math.round(width);
      canvasHeight = Math.round(height);

      const devicePixelRatio = window.devicePixelRatio || 1;

      nextCanvas.width = Math.max(
        1,
        Math.round(canvasWidth * devicePixelRatio),
      );
      nextCanvas.height = Math.max(
        1,
        Math.round(canvasHeight * devicePixelRatio),
      );
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.lineCap = 'round';
    };

    const resizeSubscription: ResizeSubscription =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateCanvasSize)
        : {
            observe: (_target: HTMLDivElement) => {
              window.addEventListener('resize', updateCanvasSize);
            },
            disconnect: () => {
              window.removeEventListener('resize', updateCanvasSize);
            },
          };

    resizeSubscription.observe(container);
    updateCanvasSize();

    let animationFrameId = 0;
    const startTime = performance.now();

    const getCoordinatesFromDistance = (distance: number) => {
      const width = canvasWidth;
      const height = canvasHeight;
      const perimeter = 2 * (width + height);
      const normalizedDistance = distance % perimeter;

      if (normalizedDistance < width) {
        return { x: normalizedDistance, y: 0 };
      }

      if (normalizedDistance < width + height) {
        return { x: width, y: normalizedDistance - width };
      }

      if (normalizedDistance < 2 * width + height) {
        return {
          x: width - (normalizedDistance - (width + height)),
          y: height,
        };
      }

      return {
        x: 0,
        y: height - (normalizedDistance - (2 * width + height)),
      };
    };

    const createBeamGradient = (start: number, end: number) => {
      const startCoord = getCoordinatesFromDistance(start);
      const endCoord = getCoordinatesFromDistance(end);
      const gradient = context.createLinearGradient(
        startCoord.x,
        startCoord.y,
        endCoord.x,
        endCoord.y,
      );

      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(0.2, 'rgba(255, 53, 26, 0.3)');
      gradient.addColorStop(0.5, '#ff351a');
      gradient.addColorStop(0.8, '#ff351a');
      gradient.addColorStop(0.9, color);
      gradient.addColorStop(1, 'transparent');

      return gradient;
    };

    const drawPathSegment = (start: number, end: number) => {
      let current = start;
      const currentPoint = getCoordinatesFromDistance(current);
      context.moveTo(currentPoint.x, currentPoint.y);

      const step = 1;
      while (current < end) {
        current += step;
        const point = getCoordinatesFromDistance(current);
        context.lineTo(point.x, point.y);
      }
    };

    const drawPath = (start: number, end: number) => {
      const perimeter = 2 * (canvasWidth + canvasHeight);

      if (end < start) {
        drawPathSegment(start, perimeter);
        drawPathSegment(0, end);
        return;
      }

      drawPathSegment(start, end);
    };

    const drawBeam = (progress: number) => {
      const width = canvasWidth;
      const height = canvasHeight;

      if (width === 0 || height === 0) {
        return;
      }

      const perimeter = 2 * (width + height);
      const beamLength = perimeter * 0.05;
      const positionStart = progress * perimeter;
      const positionEnd = (positionStart + beamLength) % perimeter;

      context.strokeStyle = createBeamGradient(positionStart, positionEnd);
      context.lineWidth = size;
      context.beginPath();
      drawPath(positionStart, positionEnd);
      context.stroke();
    };

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = (elapsed % duration) / duration;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBeam(progress);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeSubscription.disconnect();
    };
  }, [color, duration, size]);

  return (
    <div
      ref={containerRef}
      className={className ? `${styles.frame} ${className}` : styles.frame}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
