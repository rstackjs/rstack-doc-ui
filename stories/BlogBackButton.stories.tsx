import { BlogBackButton } from '@rstack-dev/doc-ui/blog-back-button';
import type { ReactNode } from 'react';
import './index.scss';

export const BlogBackButtonStory = () => (
  <div style={{ margin: '0 auto', maxWidth: 960, padding: 24 }}>
    <BlogBackButton pathname="/blog/rspress-2-0" lang="en" blogPrefix="/blog" />
    <div style={{ marginBottom: 24 }}>English blog detail page</div>

    <BlogBackButton
      pathname="/zh/blog/rspack-roadmap"
      lang="zh"
      blogPrefix="/blog"
    />
    <div>中文博客详情页</div>
  </div>
);

export default {
  title: 'BlogBackButton',
};
