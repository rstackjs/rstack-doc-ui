import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className: string;
  href: string;
  children: ReactNode;
};

export type LinkComp = (props: LinkProps) => JSX.Element;

/**
 * A backup link component, import { Link } from '@rspress/core/theme' to replace it
 */
export const ALink: LinkComp = ({ children, ...props }) => {
  return <a {...props}>{children}</a>;
};
