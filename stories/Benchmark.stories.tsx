import { Benchmark } from '@rstackjs/doc-ui/benchmark';
import './index.scss';

// Benchmark data for different cases
// Unit: second
// From: https://github.com/rstackjs/performance-compare
const BENCHMARK_DATA = {
  foo: {
    label: 'Foo',
    metrics: [
      { desc: 'dev', time: 0.49 },
      { desc: 'build', time: 0.36 },
      { desc: 'hmr', time: 0.1 },
    ],
  },
  bar: {
    label: 'Bar',
    metrics: [
      { desc: 'dev', time: 1.49 },
      { desc: 'build', time: 1.36 },
      { desc: 'hmr', time: 1.1 },
    ],
  },
  baz: {
    label: 'Baz',
    metrics: [
      { desc: 'dev', time: 2.49 },
      { desc: 'build', time: 2.36 },
      { desc: 'hmr', time: 2.1 },
    ],
  },
};

export const BenchmarkStory = () => (
  <div style={{ margin: 20 }}>
    <Benchmark data={BENCHMARK_DATA} />
  </div>
);

export default {
  title: 'Benchmark',
};
