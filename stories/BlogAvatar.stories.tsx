import {
  BlogAvatar,
  BlogAvatarGroup,
  type BlogAvatarAuthor,
} from '@rstack-dev/doc-ui/blog-avatar';
import './index.scss';

const author: BlogAvatarAuthor = {
  name: 'zoolsher',
  avatar: 'https://github.com/zoolsher.png',
  title: 'Rspack core team',
  github: 'https://github.com/zoolsher',
  x: 'https://x.com/zoolsher',
};

const authors: BlogAvatarAuthor[] = [
  author,
  {
    name: 'hardfist',
    avatar: 'https://github.com/hardfist.png',
    title: 'Rspack core team',
    github: 'https://github.com/hardfist',
    x: 'https://x.com/hardfist_1',
  },
  {
    name: 'jkzing',
    avatar: 'https://github.com/jkzing.png',
    title: 'Rspack core team, Vue contributor',
    github: 'https://github.com/jkzing',
    x: 'https://x.com/zjkdddd',
  },
  {
    name: 'ahabhgk',
    avatar: 'https://github.com/ahabhgk.png',
    title: 'Rspack core team, webpack contributor',
    github: 'https://github.com/ahabhgk',
    x: 'https://x.com/ahabhgk',
  },
  {
    name: 'jerrykingxyz',
    avatar: 'https://github.com/jerrykingxyz.png',
    title: 'Rspack core team',
    github: 'https://github.com/jerrykingxyz',
  },
  {
    name: 'Jiahan Chen',
    avatar: 'https://github.com/chenjiahan.png',
    title: 'Rspack core team, project lead of Vant',
    github: 'https://github.com/chenjiahan',
    x: 'https://x.com/jiahan_c',
  },
  {
    name: 'JSerFeng',
    avatar: 'https://github.com/JSerFeng.png',
    title: 'Rspack core team',
    github: 'https://github.com/JSerFeng',
    x: 'https://x.com/JSerFeng',
  },
  {
    name: '9aoy',
    avatar: 'https://github.com/9aoy.png',
    title: 'Rspack core team',
    github: 'https://github.com/9aoy',
  },
  {
    name: 'zackarychapple',
    avatar: 'https://github.com/zackarychapple.png',
    title: 'Rspack core team, CEO at ZephyrCloudIO',
    github: 'https://github.com/zackarychapple',
    x: 'https://x.com/Zackary_Chapple',
  },
  {
    name: 'valorkin',
    avatar: 'https://github.com/valorkin.png',
    title: 'Rspack core team, CTO at ZephyrCloudIO',
    github: 'https://github.com/valorkin',
    x: 'https://x.com/valorkin',
  },
];

export const BlogAvatarStory = () => (
  <div style={{ margin: 20 }}>
    <BlogAvatar author={author} />
  </div>
);

export const BlogAvatarGroupStory = () => (
  <div style={{ margin: 20 }}>
    <BlogAvatarGroup authors={authors} />
  </div>
);

export const BlogAvatarGroupCompactStory = () => (
  <div style={{ display: 'grid', gap: 24, margin: 20 }}>
    <BlogAvatarGroup authors={authors.slice(0, 2)} compact />
    <BlogAvatarGroup authors={authors.slice(0, 8)} compact />
    <BlogAvatarGroup authors={authors} compact />
  </div>
);

export default {
  title: 'BlogAvatar',
};
