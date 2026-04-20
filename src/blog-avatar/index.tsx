import type { ReactNode } from 'react';
import styles from './index.module.scss';

const MAX_VISIBLE_COMPACT_AUTHORS = 3;

export type BlogAvatarLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

export type BlogAvatarAuthor = {
  name: string;
  avatar: string;
  title?: string;
  github?: string;
  x?: string;
  links?: BlogAvatarLink[];
};

export type BlogAvatarProps = {
  author: BlogAvatarAuthor;
  className?: string;
};

export type BlogAvatarGroupProps = {
  authors: BlogAvatarAuthor[];
  className?: string;
  compact?: boolean;
};

const getClassName = (...classNames: Array<string | false | undefined>) => {
  return classNames.filter(Boolean).join(' ');
};

const getAuthorKey = (author: BlogAvatarAuthor) => {
  return `${author.name}-${author.github ?? author.x ?? author.avatar}`;
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

const getSocialLinks = ({
  github,
  links,
  name,
  x,
}: BlogAvatarAuthor): BlogAvatarLink[] => {
  return [
    ...(github
      ? [
          {
            href: github,
            label: `${name}'s GitHub`,
            icon: <GitHubIcon />,
          },
        ]
      : []),
    ...(x
      ? [
          {
            href: x,
            label: `${name}'s X profile`,
            icon: <XIcon />,
          },
        ]
      : []),
    ...(links ?? []),
  ];
};

export function BlogAvatar({ author, className }: BlogAvatarProps) {
  const { avatar, name, title } = author;
  const socialLinks = getSocialLinks(author);

  return (
    <div className={getClassName(styles.root, className)}>
      <img
        src={avatar}
        alt={name}
        className={styles.avatar}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <div className={styles.name}>{name}</div>
          {socialLinks.length > 0 ? (
            <div className={styles.links}>
              {socialLinks.map(link => (
                <a
                  href={link.href}
                  key={`${link.label}-${link.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        {title ? <div className={styles.title}>{title}</div> : null}
      </div>
    </div>
  );
}

export function BlogAvatarGroup({
  authors,
  className,
  compact = false,
}: BlogAvatarGroupProps) {
  if (authors.length === 0) {
    return null;
  }

  if (!compact) {
    return (
      <div className={getClassName(styles.group, className)}>
        {authors.map(author => (
          <BlogAvatar
            author={author}
            className={styles.groupItem}
            key={getAuthorKey(author)}
          />
        ))}
      </div>
    );
  }

  const visibleAuthors = authors.slice(0, MAX_VISIBLE_COMPACT_AUTHORS);
  const overflowCount = authors.length - visibleAuthors.length;
  const authorNames = authors.map(author => author.name).join(', ');

  return (
    <div
      className={getClassName(styles.compactGroup, className)}
      title={authorNames}
    >
      <div className={styles.compactAvatars} aria-hidden="true">
        {visibleAuthors.map(author => (
          <img
            src={author.avatar}
            alt=""
            className={styles.compactAvatar}
            loading="lazy"
            decoding="async"
            key={getAuthorKey(author)}
          />
        ))}
        {overflowCount > 0 ? (
          <span className={styles.compactOverflow}>+{overflowCount}</span>
        ) : null}
      </div>
      <div className={styles.compactNames}>{authorNames}</div>
    </div>
  );
}
