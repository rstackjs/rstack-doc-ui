import {
  containerStyle,
  descStyle,
  innerContainerStyle,
  titleAndDescStyle,
  titleStyle,
} from '@rstackjs/doc-ui/section-style';
import './index.scss';

const sections = [
  {
    title: 'Lightning Fast',
    description:
      'Combining Rust and TypeScript with a parallelized architecture to bring you the ultimate developer experience.',
  },
  {
    title: 'Fully Featured',
    description:
      'Launched as a drop-in replacement for webpack, with more powerful features and exceptional productivity.',
  },
  {
    title: 'Rstack',
    description:
      'High-performance toolchain centered on Rspack to boost modern web development',
  },
];

export const SectionStyleStory = () => {
  return (
    <>
      {sections.map(({ title, description }) => {
        return (
          <section className={containerStyle} key={title}>
            <div className={innerContainerStyle}>
              <div className={titleAndDescStyle}>
                <h1 className={titleStyle}>{title}</h1>
                <p className={descStyle}>{description}</p>
              </div>
              <div>something...</div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default {
  title: 'SectionStyle',
};
