import styles from './ProgressBar.module.scss';

export function formatTime(time: number) {
  if (time < 1000) {
    return `${time.toFixed(0)}ms`;
  }
  return `${(time / 1000).toFixed(2)}s`;
}

export function ProgressBar({
  value,
  max,
  desc,
}: {
  value: number;
  max: number;
  desc: string;
}) {
  const formattedTime = formatTime(value * 1000);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div
          className={styles.bar}
          style={{ width: `${(value / max) * 100}%` }}
          // onUpdate={(latest: { width: string }) => {
          //   const width = Number.parseFloat(latest.width);
          //   setElapsedTime(width * max * 10);
          // }}
          // transition={{ duration: value, ease: 'linear' }}
        />
      </div>
      <div className={styles.desc}>
        <span className={styles.time}>{formattedTime}</span> {desc}
      </div>
    </div>
  );
}
