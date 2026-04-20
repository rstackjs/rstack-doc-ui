import { ALink, type LinkComp } from '../shared';
import styles from './index.module.scss';

export type BlogBackButtonProps = {
  pathname: string;
  lang?: string;
  className?: string;
  LinkComp?: LinkComp;
};

const getClassName = (...classNames: Array<string | undefined>) => {
  return classNames.filter(Boolean).join(' ');
};

const getBlogPrefix = (lang?: string) => {
  return !lang || lang === 'en' ? '/blog' : `/${lang}/blog`;
};

const getLabel = (lang?: string) => {
  return lang === 'zh' ? '返回博客' : 'Back to blog';
};

export function BlogBackButton({
  pathname,
  lang,
  className,
  LinkComp,
}: BlogBackButtonProps) {
  const blogPrefix = getBlogPrefix(lang);
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
  const blogIndexPath = `${blogPrefix}/`;
  const isBlogSubpage =
    normalizedPathname.startsWith(blogPrefix) &&
    normalizedPathname !== blogPrefix;

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
