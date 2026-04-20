import { BlogBackButton } from '@rstack-dev/doc-ui/blog-back-button';
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

export const BlogBackButtonStory = () => (
  <div style={{ margin: '0 auto', maxWidth: 960, padding: 24 }}>
    <BlogBackButton pathname="/blog/rspress-2-0" LinkComp={StoryLink} />
    <div style={{ marginBottom: 24 }}>English blog detail page</div>

    <BlogBackButton
      pathname="/zh/blog/rspack-roadmap"
      lang="zh"
      LinkComp={StoryLink}
    />
    <div>中文博客详情页</div>
  </div>
);

export default {
  title: 'BlogBackButton',
};
