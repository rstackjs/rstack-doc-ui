import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { type BlogAvatarAuthor, BlogAvatarGroup } from '../blog-avatar';
import { BlogBackground } from '../blog-background';
import { ALink, type LinkComp } from '../shared';
import { BorderBeam } from './BorderBeam';
import { useTiltEffect } from './useTiltEffect';

import styles from './index.module.scss';

export type BlogDateValue = Date | string | number;

export type BlogListItem = {
  id?: string | number;
  title?: ReactNode;
  description?: ReactNode;
  date?: BlogDateValue;
  href?: string;
  authors?: BlogAvatarAuthor[];
};

export type BlogListProps = {
  posts: BlogListItem[];
  locale?: string;
  className?: string;
  LinkComp?: LinkComp;
  emptyState?: ReactNode;
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  renderInlineMarkdown?: (content: string) => Record<string, unknown>;
  title?: ReactNode;
  subtitle?: ReactNode;
  featured?: boolean;
  interactive?: boolean;
  showBackground?: boolean;
  backgroundGridSize?: number;
  backgroundMeteorCount?: number;
};

const DEFAULT_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const getClassName = (...classNames: Array<string | false | undefined>) => {
  return classNames.filter(Boolean).join(' ');
};

const normalizeDate = (value?: BlogDateValue) => {
  if (value === undefined) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? undefined : date;
};

const getPostKey = (post: BlogListItem, index: number) => {
  if (post.id !== undefined) {
    return post.id;
  }

  if (post.href) {
    return post.href;
  }

  if (typeof post.title === 'string' || typeof post.title === 'number') {
    return post.title;
  }

  return index;
};

const isTextContent = (value: ReactNode) => {
  return typeof value === 'string' || typeof value === 'number';
};

const isTouchDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(pointer: coarse)').matches;
};

type LinkLikeProps = {
  className: string;
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  [key: `data-${string}`]: string | undefined;
};

function MarkdownishText({
  children,
  renderInlineMarkdown,
}: {
  children: ReactNode;
  renderInlineMarkdown?: (content: string) => Record<string, unknown>;
}) {
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  if (renderInlineMarkdown) {
    return <p {...renderInlineMarkdown(children)} style={{ margin: 0 }} />;
  }

  return <p style={{ margin: 0 }}>{children}</p>;
}

type BlogCardProps = {
  post: BlogListItem;
  isFeatured: boolean;
  Link: (props: LinkLikeProps) => JSX.Element;
  dateFormatter: Intl.DateTimeFormat;
  interactive: boolean;
  renderInlineMarkdown?: (content: string) => Record<string, unknown>;
};

function BlogCard({
  post,
  isFeatured,
  Link,
  dateFormatter,
  interactive,
  renderInlineMarkdown,
}: BlogCardProps) {
  const normalizedDate = normalizeDate(post.date);
  const [isHovered, setIsHovered] = useState(false);
  const titleClassName = getClassName(
    styles.title,
    isFeatured && styles.featuredTitle,
  );
  const descriptionClassName = getClassName(
    styles.description,
    isFeatured && styles.featuredDescription,
  );
  const cardClassName = getClassName(
    styles.card,
    isFeatured ? styles.featured : styles.gridItem,
  );

  const cardContent = (
    <>
      {normalizedDate ? (
        <span className={styles.date}>
          {dateFormatter.format(normalizedDate)}
        </span>
      ) : null}
      {post.title ? <div className={titleClassName}>{post.title}</div> : null}
      {post.description ? (
        <div className={descriptionClassName}>
          <MarkdownishText renderInlineMarkdown={renderInlineMarkdown}>
            {post.description}
          </MarkdownishText>
        </div>
      ) : null}
      {post.authors && post.authors.length > 0 ? (
        <div className={styles.footer}>
          <BlogAvatarGroup
            authors={post.authors}
            className={styles.avatarOverride}
            compact
          />
        </div>
      ) : null}
      {interactive && isHovered ? <BorderBeam size={2} duration={3} /> : null}
    </>
  );

  if (post.href) {
    return (
      <Link
        className={cardClassName}
        href={post.href}
        data-tilt-card={interactive ? 'true' : undefined}
        onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
        onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article
      className={cardClassName}
      data-tilt-card={interactive ? 'true' : undefined}
      onMouseEnter={interactive ? () => setIsHovered(true) : undefined}
      onMouseLeave={interactive ? () => setIsHovered(false) : undefined}
    >
      {cardContent}
    </article>
  );
}

export function BlogList({
  posts,
  locale,
  className,
  LinkComp,
  emptyState,
  dateFormatOptions = DEFAULT_DATE_FORMAT_OPTIONS,
  renderInlineMarkdown,
  title,
  subtitle,
  featured = true,
  interactive = true,
  showBackground = true,
  backgroundGridSize = 120,
  backgroundMeteorCount = 3,
}: BlogListProps) {
  if (posts.length === 0) {
    return emptyState ? <>{emptyState}</> : null;
  }

  const Link = (LinkComp ?? ALink) as (props: LinkLikeProps) => JSX.Element;
  const dateFormatter = new Intl.DateTimeFormat(locale, dateFormatOptions);
  const tiltDisabled = !interactive || isTouchDevice();

  const featuredPost = useMemo(() => {
    if (!featured || posts.length === 0) {
      return null;
    }

    return posts[0];
  }, [featured, posts]);

  const gridPosts = useMemo(() => {
    if (!featured) {
      return posts;
    }

    return posts.slice(1);
  }, [featured, posts]);

  useTiltEffect('[data-tilt-card="true"]', {
    disabled: tiltDisabled,
  });

  return (
    <div className={getClassName(styles.blogPage, className)}>
      {title || subtitle ? (
        <header className={styles.header}>
          {title ? <h1 className={styles.pageTitle}>{title}</h1> : null}
          {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
        </header>
      ) : null}
      {featuredPost ? (
        <section className={styles.featuredSection}>
          <BlogCard
            dateFormatter={dateFormatter}
            interactive={interactive}
            isFeatured
            key={getPostKey(featuredPost, 0)}
            Link={Link}
            post={featuredPost}
            renderInlineMarkdown={renderInlineMarkdown}
          />
        </section>
      ) : null}
      {gridPosts.length > 0 ? (
        <section className={styles.grid}>
          {gridPosts.map((post, index) => (
            <BlogCard
              dateFormatter={dateFormatter}
              interactive={interactive}
              isFeatured={false}
              key={getPostKey(post, index + (featuredPost ? 1 : 0))}
              Link={Link}
              post={post}
              renderInlineMarkdown={renderInlineMarkdown}
            />
          ))}
        </section>
      ) : null}
      <style>{`
      .rp-doc-layout__sidebar-placeholder { display: none; }
      .rp-doc-layout__outline { display: none; }
      .rp-doc-layout__doc { width: 100% !important; max-width: 100% !important; }
      .rp-doc-layout__doc-container { margin: 0 auto; }
      `}</style>
    </div>
  );
}
