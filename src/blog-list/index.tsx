import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { type BlogAvatarAuthor, BlogAvatarGroup } from '../blog-avatar';
import { ALink, type LinkComp } from '../shared';
import { BorderBeam } from './BorderBeam';
import { useTiltEffect } from './useTiltEffect';

import styles from './index.module.scss';

export type BlogDateValue = Date | string | number;

export type RenderInlineMarkdownResult =
  | HTMLAttributes<HTMLParagraphElement>
  | {
      dangerouslySetInnerHTML: {
        __html: string;
      };
      className?: string;
    };

export type RenderInlineMarkdown = (
  content: string,
) => RenderInlineMarkdownResult;

const hasDangerousHtml = (
  value: RenderInlineMarkdownResult,
): value is Extract<
  RenderInlineMarkdownResult,
  { dangerouslySetInnerHTML: object }
> => {
  return 'dangerouslySetInnerHTML' in value;
};

type LinkLikeProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className: string;
  href: string;
  children: ReactNode;
};

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
  lang?: string;
  className?: string;
  LinkComp?: LinkComp;
  emptyState?: ReactNode;
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  renderInlineMarkdown?: RenderInlineMarkdown;
  title?: ReactNode;
  subtitle?: ReactNode;
  featured?: boolean;
  interactive?: boolean;
  hideDocLayoutSidebarAndOutline?: boolean;
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

const hasContent = (value?: ReactNode) => {
  return value !== undefined && value !== null;
};

const isTouchDevice = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(pointer: coarse)').matches;
};

function MarkdownishText({
  children,
  renderInlineMarkdown,
}: {
  children: ReactNode;
  renderInlineMarkdown?: RenderInlineMarkdown;
}) {
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  if (renderInlineMarkdown) {
    const paragraphProps = renderInlineMarkdown(children);
    const paragraphChildren = hasDangerousHtml(paragraphProps)
      ? undefined
      : paragraphProps.children;
    const paragraphClassName = getClassName(
      styles.descriptionParagraph,
      paragraphProps.className,
    );

    if (hasDangerousHtml(paragraphProps)) {
      return (
        <span className={paragraphClassName}>
          {paragraphChildren ?? children}
        </span>
      );
    }

    const { children: _children, ...restParagraphProps } = paragraphProps;

    return (
      <p {...restParagraphProps} className={paragraphClassName}>
        {paragraphChildren ?? children}
      </p>
    );
  }

  return <p className={styles.descriptionParagraph}>{children}</p>;
}

type BlogCardProps = {
  post: BlogListItem;
  isFeatured: boolean;
  Link: (props: LinkLikeProps) => JSX.Element;
  dateFormatter: Intl.DateTimeFormat;
  interactive: boolean;
  renderInlineMarkdown?: RenderInlineMarkdown;
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
  const isInteractive = interactive && Boolean(post.href);
  const hasTitle = hasContent(post.title);
  const hasDescription = hasContent(post.description);
  const [isHovered, setIsHovered] = useState(false);
  const titleClassName = getClassName(
    styles.title,
    isFeatured && styles.featuredTitle,
  );
  const descriptionClassName = getClassName(
    styles.description,
    isFeatured && styles.featuredDescription,
    hasDescription && isTextContent(post.description)
      ? styles.clampedDescription
      : undefined,
  );
  const cardClassName = getClassName(
    styles.card,
    isFeatured ? styles.featured : styles.gridItem,
    isInteractive && styles.interactiveCard,
  );

  const cardContent = (
    <>
      {normalizedDate ? (
        <span className={styles.date}>
          {dateFormatter.format(normalizedDate)}
        </span>
      ) : null}
      {hasTitle ? <div className={titleClassName}>{post.title}</div> : null}
      {hasDescription ? (
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
      {isInteractive && isHovered ? <BorderBeam size={2} duration={3} /> : null}
    </>
  );

  if (post.href) {
    return (
      <Link
        className={cardClassName}
        href={post.href}
        data-tilt-card={isInteractive ? 'true' : undefined}
        onMouseEnter={isInteractive ? () => setIsHovered(true) : undefined}
        onMouseLeave={isInteractive ? () => setIsHovered(false) : undefined}
      >
        {cardContent}
      </Link>
    );
  }

  return <article className={cardClassName}>{cardContent}</article>;
}

export function BlogList({
  posts,
  lang = 'en',
  className,
  LinkComp,
  emptyState,
  dateFormatOptions = DEFAULT_DATE_FORMAT_OPTIONS,
  renderInlineMarkdown,
  title,
  subtitle,
  featured = true,
  interactive = true,
  hideDocLayoutSidebarAndOutline = true,
}: BlogListProps) {
  if (posts.length === 0) {
    return emptyState ? <>{emptyState}</> : null;
  }

  const Link = (LinkComp ?? ALink) as (props: LinkLikeProps) => JSX.Element;
  const dateFormatter = new Intl.DateTimeFormat(
    lang === 'zh' ? 'zh-CN' : 'en-US',
    dateFormatOptions,
  );
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
      {hideDocLayoutSidebarAndOutline ? (
        <style>{`
      .rp-doc-layout__sidebar-placeholder { display: none; }
      .rp-doc-layout__outline { display: none; }
      .rp-doc-layout__doc { width: 100% !important; max-width: 100% !important; }
      .rp-doc-layout__doc-container { margin: 0 auto; }
      `}</style>
      ) : null}
    </div>
  );
}
