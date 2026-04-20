import { BlogAvatar, BlogAvatarGroup } from '@rstack-dev/doc-ui/blog-avatar';
import './index.scss';

const author = {
  name: 'Alice',
  avatar: 'https://github.com/alice.png',
  title: 'Frontend Engineer',
  github: 'https://github.com/alice',
  x: 'https://x.com/alice',
};

const authors = [
  author,
  {
    name: 'Bob',
    avatar: 'https://github.com/bob.png',
    title: 'Full Stack Engineer',
    github: 'https://github.com/bob',
  },
  {
    name: 'Charlie',
    avatar: 'https://github.com/charlie.png',
    title: 'Tech Lead',
    x: 'https://x.com/charlie',
  },
  {
    name: 'Dave',
    avatar: 'https://github.com/dave.png',
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
  <div style={{ margin: 20 }}>
    <BlogAvatarGroup authors={authors} compact />
  </div>
);

export default {
  title: 'BlogAvatar',
};
