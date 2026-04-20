import { useEffect, useRef } from 'react';

type CanvasBounds = {
  width: number;
  height: number;
};

type ResizeSubscription = {
  observe: (target: HTMLElement) => void;
  disconnect: () => void;
};

export type MeteorsBackgroundProps = {
  gridSize?: number;
  meteorCount?: number;
};

enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
}

class Meteor {
  x = 0;
  y = 0;
  direction = Direction.UP;
  speed = 0;
  length = 0;
  opacity = 0;

  constructor(
    private readonly gridSize: number,
    private readonly bounds: CanvasBounds,
  ) {
    this.reset();
  }

  reset() {
    this.direction = Math.floor(Math.random() * 4);
    this.speed = 2 + Math.random() * 3;
    this.length = this.gridSize * (1 + Math.random() * 2);
    this.opacity = 0.6 + Math.random() * 0.4;

    const getMiddlePosition = (size: number) => {
      const margin = size * 0.2;
      return margin + Math.random() * (size * 0.6);
    };

    switch (this.direction) {
      case Direction.UP:
        this.x =
          Math.floor(getMiddlePosition(this.bounds.width) / this.gridSize) *
          this.gridSize;
        this.y = this.bounds.height;
        break;
      case Direction.RIGHT:
        this.x = 0;
        this.y =
          Math.floor(getMiddlePosition(this.bounds.height) / this.gridSize) *
          this.gridSize;
        break;
      case Direction.DOWN:
        this.x =
          Math.floor(getMiddlePosition(this.bounds.width) / this.gridSize) *
          this.gridSize;
        this.y = 0;
        break;
      case Direction.LEFT:
        this.x = this.bounds.width;
        this.y =
          Math.floor(getMiddlePosition(this.bounds.height) / this.gridSize) *
          this.gridSize;
        break;
    }
  }

  update() {
    switch (this.direction) {
      case Direction.UP:
        this.y -= this.speed;
        if (this.y + this.length < 0) {
          this.reset();
        }
        break;
      case Direction.RIGHT:
        this.x += this.speed;
        if (this.x > this.bounds.width) {
          this.reset();
        }
        break;
      case Direction.DOWN:
        this.y += this.speed;
        if (this.y > this.bounds.height) {
          this.reset();
        }
        break;
      case Direction.LEFT:
        this.x -= this.speed;
        if (this.x + this.length < 0) {
          this.reset();
        }
        break;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    const startX = this.x;
    const startY = this.y;
    let endX = this.x;
    let endY = this.y;

    switch (this.direction) {
      case Direction.UP:
        endY = this.y + this.length;
        break;
      case Direction.RIGHT:
        endX = this.x - this.length;
        break;
      case Direction.DOWN:
        endY = this.y - this.length;
        break;
      case Direction.LEFT:
        endX = this.x + this.length;
        break;
    }

    const gradient = context.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, `rgba(18, 229, 229, ${this.opacity})`);
    gradient.addColorStop(0.02, `rgba(18, 229, 229, ${this.opacity * 0.8})`);
    gradient.addColorStop(0.05, `rgba(255, 53, 26, ${this.opacity * 0.6})`);
    gradient.addColorStop(1, 'rgba(255, 53, 26, 0)');

    context.beginPath();
    context.strokeStyle = gradient;
    context.lineWidth = 2;
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
}

export function MeteorsBackground({
  gridSize = 30,
  meteorCount = 20,
}: MeteorsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const gridCanvas = document.createElement('canvas');
    const gridContext = gridCanvas.getContext('2d');

    if (!gridContext) {
      return;
    }

    const bounds: CanvasBounds = {
      width: 0,
      height: 0,
    };

    const meteors = Array.from(
      { length: meteorCount },
      () => new Meteor(gridSize, bounds),
    );

    const drawGrid = (devicePixelRatio: number) => {
      if (bounds.width === 0 || bounds.height === 0) {
        gridCanvas.width = 0;
        gridCanvas.height = 0;
        return;
      }

      gridCanvas.width = Math.max(
        1,
        Math.round(bounds.width * devicePixelRatio),
      );
      gridCanvas.height = Math.max(
        1,
        Math.round(bounds.height * devicePixelRatio),
      );
      gridContext.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      gridContext.clearRect(0, 0, bounds.width, bounds.height);
      gridContext.strokeStyle = 'rgba(128, 128, 128, 0.1)';
      gridContext.lineWidth = 1;

      for (let x = 0; x < bounds.width; x += gridSize) {
        gridContext.beginPath();
        gridContext.moveTo(x, 0);
        gridContext.lineTo(x, bounds.height);
        gridContext.stroke();
      }

      for (let y = 0; y < bounds.height; y += gridSize) {
        gridContext.beginPath();
        gridContext.moveTo(0, y);
        gridContext.lineTo(bounds.width, y);
        gridContext.stroke();
      }
    };

    const setCanvasSize = () => {
      const { width, height } = canvas.getBoundingClientRect();

      if (width === 0 || height === 0) {
        bounds.width = 0;
        bounds.height = 0;
        canvas.width = 0;
        canvas.height = 0;
        return;
      }

      bounds.width = Math.round(width);
      bounds.height = Math.round(height);

      const devicePixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.round(bounds.width * devicePixelRatio));
      canvas.height = Math.max(1, Math.round(bounds.height * devicePixelRatio));
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      drawGrid(devicePixelRatio);

      for (const meteor of meteors) {
        meteor.reset();
      }
    };

    const resizeSubscription: ResizeSubscription =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(setCanvasSize)
        : {
            observe: (_target: HTMLElement) => {
              window.addEventListener('resize', setCanvasSize);
            },
            disconnect: () => {
              window.removeEventListener('resize', setCanvasSize);
            },
          };

    resizeSubscription.observe(canvas);
    setCanvasSize();

    let animationFrameId = 0;

    const animate = () => {
      context.clearRect(0, 0, bounds.width, bounds.height);

      if (gridCanvas.width > 0 && gridCanvas.height > 0) {
        context.drawImage(gridCanvas, 0, 0, bounds.width, bounds.height);
      }

      for (const meteor of meteors) {
        meteor.update();
        meteor.draw(context);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeSubscription.disconnect();
    };
  }, [gridSize, meteorCount]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '65vh',
        zIndex: -1,
      }}
    />
  );
}
