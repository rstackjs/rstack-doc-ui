import { isValidElement, type ReactNode } from 'react';
import type { BlogListItem } from './index';

const getTextFromReactNode = (value: ReactNode): string => {
  if (value === undefined || value === null || typeof value === 'boolean') {
    return '';
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(getTextFromReactNode).join('');
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return getTextFromReactNode(value.props.children);
  }

  return '';
};

const escapeMarkdownText = (value: string) => {
  return value.replace(/([\\[\]])/g, '\\$1');
};

const normalizeMarkdownText = (value: ReactNode) => {
  return getTextFromReactNode(value).replace(/\s+/g, ' ').trim();
};

const getPostMarkdownTitle = (post: BlogListItem, index: number) => {
  return normalizeMarkdownText(post.title) || post.href || `Post ${index + 1}`;
};

export const renderBlogListSsgMarkdown = ({
  formatDate,
  posts,
  subtitle,
  title,
}: {
  formatDate: (value: BlogListItem['date']) => string | undefined;
  posts: BlogListItem[];
  subtitle?: ReactNode;
  title?: ReactNode;
}) => {
  const sections: string[] = [];
  const titleText = normalizeMarkdownText(title);
  const subtitleText = normalizeMarkdownText(subtitle);

  if (titleText) {
    sections.push(`# ${titleText}`);
  }

  if (subtitleText) {
    sections.push(subtitleText);
  }

  posts.forEach((post, index) => {
    const postSections: string[] = [];
    const postTitle = getPostMarkdownTitle(post, index);
    const postDate = formatDate(post.date);
    const postDescription = normalizeMarkdownText(post.description);
    const authors = post.authors?.map(author => author.name).join(', ');
    const meta = [postDate, authors].filter(Boolean).join(' · ');

    postSections.push(
      post.href
        ? `## [${escapeMarkdownText(postTitle)}](${post.href})`
        : `## ${postTitle}`,
    );

    if (meta) {
      postSections.push(`> ${meta}`);
    }

    if (postDescription) {
      postSections.push(postDescription);
    }

    sections.push(postSections.join('\n\n'));
  });

  return `${sections.join('\n\n')}\n`;
};
