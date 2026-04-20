import { useEffect, useRef } from 'react';
import styles from './BorderBeam.module.scss';

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

    const updateCanvasSize = () => {
      const nextCanvas = canvasRef.current;
      const nextContainer = containerRef.current;

      if (!nextCanvas || !nextContainer) {
        return;
      }

      const { width, height } = nextContainer.getBoundingClientRect();
      nextCanvas.width = width;
      nextCanvas.height = height;
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);
    updateCanvasSize();

    let animationFrameId = 0;
    const startTime = performance.now();

    const getCoordinatesFromDistance = (distance: number) => {
      const width = canvas.width;
      const height = canvas.height;
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
      const perimeter = 2 * (canvas.width + canvas.height);

      if (end < start) {
        drawPathSegment(start, perimeter);
        drawPathSegment(0, end);
        return;
      }

      drawPathSegment(start, end);
    };

    const drawBeam = (progress: number) => {
      const width = canvas.width;
      const height = canvas.height;
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

      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBeam(progress);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
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
