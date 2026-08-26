import { type Feature, FullyFeatured } from '@rstackjs/doc-ui/fully-featured';
import './index.scss';
import arrow from './assets/arrow.svg';

const description =
  'Split code into smaller bundles to enable on-demand loading and improve performance.';

const link = '/guide/optimization/code-splitting';

const FeatureRow1: Feature[] = [
  {
    icon: arrow,
    title: 'Code Splitting',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Tree Shaking',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Plugins',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Module Federation',
    description,
    link,
  },
];

const FeatureRow2: Feature[] = [
  {
    icon: arrow,
    title: 'Asset Management',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Loaders',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'HMR',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Dev Server',
    description,
    link,
  },
];

const FeatureRow3: Feature[] = [
  {
    icon: arrow,
    title: 'Parallel Builds',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'SWC',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'Lightning CSS',
    description,
    link,
  },
  {
    icon: arrow,
    title: 'JavaScript API',
    description,
    link,
  },
];

export const HeroStory = () => {
  return (
    <>
      <div>
        <FullyFeatured featureRows={[FeatureRow1, FeatureRow2, FeatureRow3]} />
      </div>
    </>
  );
};

export default {
  title: 'FullyFeatured',
};
