import { ALink, type LinkComp } from '../shared';
import styles from './index.module.scss';

export type BlogBackButtonProps = {
  pathname: string;
  lang: string;
  blogPrefix?: string;
  className?: string;
  LinkComp?: LinkComp;
};

const getClassName = (...classNames: Array<string | undefined>) => {
  return classNames.filter(Boolean).join(' ');
};

const getBlogPrefix = (lang: string, blogPrefix = '/blog') => {
  return !lang || lang === 'en' ? `${blogPrefix}` : `/${lang}${blogPrefix}`;
};

const getLabel = (lang?: string) => {
  return lang === 'zh' ? '返回博客' : 'Back to blog';
};

const trimTrailingSlashes = (value: string) => {
  let end = value.length;

  while (end > 1 && value.charCodeAt(end - 1) === 47) {
    end -= 1;
  }

  return value.slice(0, end) || '/';
};

export function BlogBackButton({
  pathname,
  lang,
  blogPrefix,
  className,
  LinkComp,
}: BlogBackButtonProps) {
  const resolvedBlogPrefix = getBlogPrefix(lang, blogPrefix);
  const normalizedPathname = trimTrailingSlashes(pathname);
  const blogIndexPath = `${resolvedBlogPrefix}/`;
  const isBlogSubpage = normalizedPathname.startsWith(`${resolvedBlogPrefix}/`);

  if (!isBlogSubpage) {
    return null;
  }

  const Link = LinkComp ?? ALink;

  return (
    <div className={getClassName(styles.blogBackButton, className)}>
      <Link href={blogIndexPath} className={styles.link}>
        {getLabel(lang)}
      </Link>
    </div>
  );
}
