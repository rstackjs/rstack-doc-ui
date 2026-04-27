import type { CSSProperties, ReactElement, ReactNode } from 'react';

type LinkProps = {
  className: string;
  href: string;
  children: ReactNode;
  style?: CSSProperties;
};

export type LinkComp = (props: LinkProps) => ReactElement;

/**
 * A backup link component, import { Link } from 'rspress/theme' to replace it
 */
export const ALink: LinkComp = ({ className, href, children, style }) => {
  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
};
