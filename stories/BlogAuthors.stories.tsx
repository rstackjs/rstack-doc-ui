import { BlogBackButton } from '@rstack-dev/doc-ui/blog-back-button';
import { BlogAuthors } from '@rstack-dev/doc-ui/blog-authors';
import { PageContext } from '@rspress/core/runtime';
import './index.scss';

type BlogAuthorsStoryFrontmatter = {
  authors: Array<{
    name: string;
    avatar: string;
    github: string;
  }>;
};

const enFrontmatter = {
  authors: [
    {
      name: 'Chen Jiahan',
      avatar: 'https://github.com/chenjiahan.png',
      github: 'chenjiahan',
    },
    {
      name: '9aoy',
      avatar: 'https://github.com/9aoy.png',
      github: '9aoy',
    },
  ],
};

const zhFrontmatter = {
  authors: [
    {
      name: 'Chen Jiahan',
      avatar: 'https://github.com/chenjiahan.png',
      github: 'chenjiahan',
    },
  ],
};

const createPageData = (
  frontmatter: BlogAuthorsStoryFrontmatter,
  lang: string,
) => ({
  title: lang === 'zh' ? 'BlogAuthors 中文示例' : 'Announcing BlogAuthors',
  routePath:
    lang === 'zh'
      ? '/zh/blog/blog-authors-demo'
      : '/blog/announcing-blog-authors',
  pagePath:
    lang === 'zh' ? 'zh/blog/blog-authors-demo.mdx' : 'blog/blog-authors.mdx',
  pageType: 'doc' as const,
  lang,
  toc: [],
  version: '',
  frontmatter,
});

export const BlogAuthorsStory = () => (
  <PageContext.Provider value={{ data: createPageData(enFrontmatter, 'en') }}>
    <div className="blog-authors-story-container">
      <div className="rp-doc blog-authors-story-doc">
        <BlogBackButton
          pathname="/blog/announcing-blog-authors"
          lang="en"
          blogPrefix="/blog"
        />
        <h1>Announcing BlogAuthors</h1>
        <p className="blog-authors-story-date">
          <em>May 19, 2026</em>
        </p>
        <BlogAuthors />
        <p>
          This story previews the shared BlogAuthors data wrapper used by blog
          article pages.
        </p>
      </div>
    </div>
  </PageContext.Provider>
);

export const BlogAuthorsZhStory = () => (
  <PageContext.Provider value={{ data: createPageData(zhFrontmatter, 'zh') }}>
    <div className="blog-authors-story-container">
      <div className="rp-doc blog-authors-story-doc">
        <BlogBackButton
          pathname="/zh/blog/blog-authors-demo"
          lang="zh"
          blogPrefix="/blog"
        />
        <h1>BlogAuthors 中文示例</h1>
        <p className="blog-authors-story-date">
          <em>2026 年 5 月 19 日</em>
        </p>
        <BlogAuthors />
        <p>这个 story 用来预览中文博客作者数据 wrapper 的效果。</p>
      </div>
    </div>
  </PageContext.Provider>
);

export default {
  title: 'BlogAuthors',
};
