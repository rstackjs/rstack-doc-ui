import { MeteorsBackground } from '../blog-list/MeteorsBackground';
import styles from './index.module.scss';

export type BlogBackgroundProps = {
  showBackground?: boolean;
  backgroundGridSize?: number;
  backgroundMeteorCount?: number;
};

export function BlogBackground({
  showBackground = true,
  backgroundGridSize = 120,
  backgroundMeteorCount = 3,
}: BlogBackgroundProps) {
  if (!showBackground) {
    return null;
  }

  return (
    <div className={styles.blogBackground}>
      <div className={styles.blogFrame} />
      <MeteorsBackground
        gridSize={backgroundGridSize}
        meteorCount={backgroundMeteorCount}
      />
    </div>
  );
}
