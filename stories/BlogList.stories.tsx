import type { BlogAvatarAuthor } from '@rstack-dev/doc-ui/blog-avatar';
import { BlogBackground } from '@rstack-dev/doc-ui/blog-background';
import { BlogList, type BlogListItem } from '@rstack-dev/doc-ui/blog-list';
import type { ReactNode } from 'react';
import './index.scss';

type StoryLinkProps = {
  className: string;
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  [key: `data-${string}`]: string | undefined;
};

const StoryLink = ({ children, ...props }: StoryLinkProps) => {
  return <a {...props}>{children}</a>;
};

const renderInlineMarkdown = (content: string) => {
  return { children: content };
};

const authors: BlogAvatarAuthor[] = [
  {
    name: 'Sooniter',
    title: 'Rspress maintainer',
    avatar: 'https://github.com/sooniter.png',
    github: 'https://github.com/sooniter',
    x: 'https://x.com/Soon_Iter',
  },
  {
    name: 'XiNiHa',
    title: 'Rstack team',
    avatar: 'https://github.com/XiNiHa.png',
    github: 'https://github.com/XiNiHa',
  },
];

const posts: BlogListItem[] = [
  {
    id: 'rspress-2-0',
    title: 'Rspress 2.0 is now available',
    href: 'https://rspress.dev/blog',
    date: '2026-04-10',
    description:
      'A faster docs authoring workflow, updated default theme capabilities, and better content tooling for large documentation sites.',
    authors: [authors[0]],
  },
  {
    id: 'rstack-roundup',
    title: 'Rstack weekly roundup',
    href: 'https://rstack.rs',
    date: '2026-04-03',
    description:
      'Highlights from the Rstack ecosystem, including updates across Rsbuild, Rspack, and Rspress.',
    authors,
  },
  {
    id: 'rsbuild-remote-cache',
    title: 'What changed in Rsbuild remote cache support',
    href: 'https://rsbuild.rs',
    date: '2026-03-27',
    description:
      'A closer look at cache invalidation, CI ergonomics, and the integration points that make remote cache practical for larger frontend monorepos.',
    authors: [authors[1]],
  },
];

export const BlogListStory = () => (
  <div style={{ margin: '0 auto', maxWidth: 1040, padding: 24 }}>
    <BlogList
      posts={posts}
      lang="en"
      hideDocLayoutSidebarAndOutline
      renderInlineMarkdown={renderInlineMarkdown}
      title="Blog"
      subtitle={
        <>
          Release notes and official announcements from the Rstack team. Follow{' '}
          <a
            href="https://x.com/rspack_dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            @rspack_dev
          </a>{' '}
          to stay up to date.
        </>
      }
    />
  </div>
);

export const BlogListWithBackgroundStory = () => (
  <div style={{ margin: '0 auto', maxWidth: 1040, padding: 24 }}>
    <div style={{ position: 'relative', zIndex: 0 }}>
      <BlogList
        posts={posts}
        lang="en"
        LinkComp={StoryLink}
        hideDocLayoutSidebarAndOutline
        renderInlineMarkdown={renderInlineMarkdown}
        title="Blog"
        subtitle={
          <>
            Release notes and official announcements from the Rstack team.
            Follow{' '}
            <a
              href="https://x.com/rspack_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              @rspack_dev
            </a>{' '}
            to stay up to date.
          </>
        }
      />
      <BlogBackground />
    </div>
  </div>
);

export default {
  title: 'BlogList',
};
