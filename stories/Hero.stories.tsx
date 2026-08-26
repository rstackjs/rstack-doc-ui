import { BackgroundImage } from '@rstackjs/doc-ui/background-image';
import { Hero } from '@rstackjs/doc-ui/hero';
import './index.scss';

export const HeroStory = () => {
  const handleClickLearnMore = () => {
    console.log('learn more');
  };
  const handleClickGetStarted = () => {
    console.log('get started');
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <BackgroundImage />
        <Hero
          showStars
          onClickLearnMore={handleClickLearnMore}
          onClickGetStarted={handleClickGetStarted}
        />
        <Hero
          showStars
          githubURL="https://github.com/rstackjs/rstack-doc-ui"
          onClickLearnMore={handleClickLearnMore}
          onClickGetStarted={handleClickGetStarted}
        />
      </div>
    </>
  );
};

export default {
  title: 'Hero',
};
