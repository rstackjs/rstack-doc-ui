import { expect, test } from '@rstest/core';
import { renderToMarkdownString } from 'react-render-to-markdown';
import { BlogList, type BlogListItem } from './index';

const posts: BlogListItem[] = [
  {
    title: 'Announcing Rspack 2.0',
    href: '/blog/announcing-2-0',
    date: '2026-04-22',
    description:
      'Rspack 2.0 is out with modern defaults, API design, and build outputs.',
    authors: [
      {
        name: 'Rspack Team',
        avatar: 'https://rspack.rs/logo.png',
      },
    ],
  },
  {
    title: 'Bundler tree shaking principles and differences',
    href: '/blog/tree-shaking',
    date: '2025-07-31',
    description:
      'A brief overview of tree shaking principles across different bundlers.',
    authors: [
      {
        name: 'ahabhgk',
        avatar: 'https://github.com/ahabhgk.png',
      },
    ],
  },
];

test('renders blog list as markdown when SSG_MD is enabled', async () => {
  const markdown = await renderToMarkdownString(
    <BlogList
      posts={posts}
      lang="en"
      title="Rspack blogs"
      subtitle={
        <>
          Browse release notes and technical deep dives from{' '}
          <a href="https://x.com/rspack_dev">@rspack_dev</a>.
        </>
      }
    />,
  );

  expect(markdown).toMatchInlineSnapshot(`
    "# Rspack blogs

    Browse release notes and technical deep dives from @rspack_dev.

    ## [Announcing Rspack 2.0](/blog/announcing-2-0)

    > April 22, 2026 · Rspack Team

    Rspack 2.0 is out with modern defaults, API design, and build outputs.

    ## [Bundler tree shaking principles and differences](/blog/tree-shaking)

    > July 31, 2025 · ahabhgk

    A brief overview of tree shaking principles across different bundlers.
    "
  `);
});
