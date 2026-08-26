import { NavIcon } from '@rstackjs/doc-ui/nav-icon';
import { userEvent, within } from '@storybook/test';
import './index.scss';

export const NavIconStory = () => (
  <div style={{ margin: 20 }}>
    <h2>English</h2>
    <NavIcon lang="en" trigger="click" />

    <h2>中文</h2>
    <NavIcon lang="zh" trigger="click" />
  </div>
);

export const NavIconStoryExpanded = () => (
  <div style={{ margin: 20 }}>
    <NavIcon lang="en" trigger="click" />
  </div>
);

const playExpanded = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  const icon = canvas.getByTitle('close');
  await userEvent.click(icon);
};

NavIconStoryExpanded.play = playExpanded;
NavIconStoryExpanded.parameters = {
  // Wait for remote resources to load before Chromatic snapshot
  chromatic: { delay: 5000 },
};

export const NavIconStoryExpandedDark = () => (
  <div style={{ margin: 20 }}>
    <NavIcon lang="en" trigger="click" />
  </div>
);

NavIconStoryExpandedDark.parameters = {
  themes: { themeOverride: 'dark' },
  chromatic: { delay: 5000 },
};

NavIconStoryExpandedDark.play = playExpanded;

export default {
  title: 'NavIcon',
};
