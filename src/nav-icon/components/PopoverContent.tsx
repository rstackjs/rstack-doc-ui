import type { Lang, NavConfig } from '../utils';
import { LinkGroup } from './LinkGroup';
import style from './PopoverContent.module.scss';

export const PopoverContent = ({
  lang,
  config,
}: {
  config: NavConfig;
  lang: Lang;
}) => (
  <div>
    <div className={style.header}>
      <a
        href="https://rstack.rs/"
        target="_blank"
        rel="noreferrer"
        className={style.title}
      >
        <img
          src="https://assets.rspack.rs/rspack/rspack-claw-logo.svg"
          className={style.logo}
          alt="rstack-logo"
        />
        <div className={style.titleText}>Rstack</div>
      </a>
    </div>
    {config.map(item => (
      <LinkGroup {...item} lang={lang} key={item.title} />
    ))}
  </div>
);
