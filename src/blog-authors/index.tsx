import { usePage } from '@rspress/core/runtime';
import { useMemo } from 'react';
import type { BlogAvatarAuthor } from '../blog-avatar';
import { BlogAvatarGroup } from '../blog-avatar';
import styles from './index.module.scss';

export type { BlogAvatarAuthor } from '../blog-avatar';

const getClassName = (...classNames: Array<string | false | undefined>) => {
  return classNames.filter(Boolean).join(' ');
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object';
};

const isBlogAvatarAuthor = (value: unknown): value is BlogAvatarAuthor => {
  return (
    isRecord(value) &&
    typeof value.name === 'string' &&
    typeof value.avatar === 'string'
  );
};

const normalizeGithub = (author: BlogAvatarAuthor): BlogAvatarAuthor => {
  if (!author.github) {
    return author;
  }

  const githubUrl = author.github.startsWith('http')
    ? author.github
    : `https://github.com/${author.github}`;

  return {
    ...author,
    github: githubUrl,
    title: author.title ?? `@${author.github}`,
  };
};

const getAuthorsFromFrontmatter = (
  frontmatter: Record<string, unknown>,
): BlogAvatarAuthor[] => {
  if (Array.isArray(frontmatter.authors)) {
    return frontmatter.authors.filter(isBlogAvatarAuthor).map(normalizeGithub);
  }

  if (Array.isArray(frontmatter.author)) {
    return frontmatter.author.filter(isBlogAvatarAuthor).map(normalizeGithub);
  }

  if (isBlogAvatarAuthor(frontmatter.author)) {
    return [normalizeGithub(frontmatter.author)];
  }

  return [];
};

export type BlogAuthorsProps = {
  className?: string;
};

export function BlogAuthors({ className }: BlogAuthorsProps) {
  const { page } = usePage();
  const frontmatter = page.frontmatter ?? {};

  const authors = useMemo(
    () => getAuthorsFromFrontmatter(frontmatter),
    [frontmatter],
  );
  return (
    <BlogAvatarGroup
      authors={authors}
      className={getClassName(styles.root, className)}
    />
  );
}
