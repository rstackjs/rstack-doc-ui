import {
  containerStyle,
  innerContainerStyle,
} from '@rstackjs/doc-ui/section-style';
import { type Feature, WhyRspack } from '@rstackjs/doc-ui/why-rspack';
import './index.scss';
import CompatibleJson from './why-rspack-assets/Compatible.json';
import Compatible from './why-rspack-assets/Compatible.svg';
import FrameCheckJson from './why-rspack-assets/FrameCheck.json';
import FrameCheck from './why-rspack-assets/FrameCheck.svg';
import LightningJson from './why-rspack-assets/Lightning.json';
import Lightning from './why-rspack-assets/Lightning.svg';
import SpeedometerJson from './why-rspack-assets/Speedometer.json';
import Speedometer from './why-rspack-assets/Speedometer.svg';

const description =
  'Using Rspack to bring you the ultimate development experience.';

const features: Feature[] = [
  {
    img: Speedometer,
    url: '/guide/start/introduction',
    title: 'FastStartup',
    description,
    lottieJsonData: SpeedometerJson,
  },
  {
    img: Lightning,
    url: '/guide/start/introduction',
    title: 'LightningHMR',
    description,
    lottieJsonData: LightningJson,
  },
  {
    img: FrameCheck,
    url: '/guide/tech/react',
    title: 'FrameworkAgnostic',
    description,
    lottieJsonData: FrameCheckJson,
  },
  {
    img: Compatible,
    url: '/guide/compatibility/plugin',
    title: 'WebpackCompatible',
    description,
    lottieJsonData: CompatibleJson,
  },
];

export const WhyRspackStory = () => {
  return (
    <section className={containerStyle}>
      <div className={innerContainerStyle}>
        <WhyRspack features={features} />
      </div>
    </section>
  );
};

// TODO: img
const rsbuildFeatures = [
  {
    img: '🚀',
    url: '', // 由于您没有提供每个特性的 URL，这里先留空
    title: 'Rspack-based',
    description:
      'Using Rspack to bring you the ultimate development experience.',
  },
  {
    img: '🦄',
    url: '',
    title: 'Batteries Included',
    description:
      'Out-of-the-box integration with the most practical building features in the ecosystem.',
  },
  {
    img: '🎯',
    url: '',
    title: 'Framework Agnostic',
    description: 'Supports React, Vue, Svelte, and more frameworks.',
  },
  {
    img: '🛠️',
    url: '',
    title: 'Deep Optimization',
    description:
      'Automatically optimize static assets to maximizing production performance.',
  },
  {
    img: '🎨',
    url: '',
    title: 'Highly Pluggable',
    description:
      'Comes with a lightweight plugin system and a set of high quality plugins.',
  },
  {
    img: '🍭',
    url: '',
    title: 'Easy to Configure',
    description:
      'Start with zero configuration and everything is configurable.',
  },
];

export const WhyRspackStoryWithoutFirstCardAndLottie = () => {
  return (
    <section className={containerStyle}>
      <div className={innerContainerStyle}>
        <WhyRspack features={rsbuildFeatures} />
      </div>
    </section>
  );
};

export default {
  title: 'WhyRspack',
};
