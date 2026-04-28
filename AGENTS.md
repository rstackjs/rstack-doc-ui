# AGENTS.md

Shared UI component library (`@rstack-dev/doc-ui`) for Rstack websites (rspack.rs, rsbuild.rs, rspress.rs).

## Tech Stack

- React 18 + TypeScript 5.9 (strict mode)
- Build: Rslib (based on Rsbuild)
- Styling: SCSS Modules (`.module.scss`)
- Animation: Framer Motion, Lottie
- UI: Ant Design 6
- Dev: Storybook 10

## Commands

```bash
# Development
pnpm dev              # Start Storybook (port 6006)

# Build
pnpm build            # Build with Rslib
pnpm build:watch      # Watch mode

# Lint (prefer file-scoped)
pnpm lint             # Check all with Rslint + Prettier
pnpm lint:write       # Auto-fix
pnpm lint:fix         # Alias for lint:write

# Single file commands
npx tsc --noEmit 'path/to/file.tsx'
npx prettier --write 'path/to/file.tsx'
npx rslint --fix 'path/to/file.tsx'
```

No test framework - visual testing via Storybook.

## Project Structure

```
src/
├── announcement/       # Announcement banner
├── antd/              # Ant Design wrappers
├── background-image/  # Background component
├── benchmark/         # Benchmark display
├── built-with-rspack/ # Showcase component
├── fully-featured/    # Feature list
├── hero/              # Hero section
├── nav-icon/          # Nav icon with popover
├── section-style/     # Section utilities
├── tool-stack/        # Tool stack display
├── why-rspack/        # Feature cards
├── env.d.ts           # Type declarations
└── shared.tsx         # Shared utilities

stories/               # Storybook stories
```

## Code Style

### Formatting (Prettier - `.prettierrc`)

- Single quotes, trailing commas (`all`), no parens for single arrow params

### Linting (Rslint - `rslint.config.ts`)

- Rslint uses TypeScript and React recommended rules
- `@typescript-eslint/no-explicit-any`: off
- Prettier handles formatting

### TypeScript

- Strict mode, use `type` imports: `import type { FC } from 'react'`
- Path alias: `@/*` → `./src/*`

### Imports Order

1. External packages (react, antd, framer-motion)
2. Internal components (relative)
3. Styles (`.module.scss`)
4. Assets (JSON, images)

```typescript
import type { FC } from 'react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ProgressBar } from './ProgressBar';
import styles from './index.module.scss';
```

## Component Patterns

### Naming

- Components: `PascalCase` (`Hero`, `NavIcon`)
- Hooks: `useCamelCase` (`useMouseMove`)
- Props: `ComponentNameProps` (`HeroProps`)
- Styles: `index.module.scss` per component

### Structure

```typescript
import type { FC } from 'react';
import styles from './index.module.scss';

export type MyComponentProps = {
  title: string;
  active?: boolean;
};

export const MyComponent: FC<MyComponentProps> = ({
  title,
  active = false,
}) => {
  return <div className={styles.root}>{title}</div>;
};
```

### Styling

- SCSS Modules only (`.module.scss`)
- Compose: `${styles.btn} ${styles.btnPrimary}`
- Root class: `styles.root`

## Do / Don't

### Do

- Functional components with hooks
- SCSS Modules for styling
- Export types with components
- Semantic HTML (`section`, `button`)
- Default values for optional props
- `memo()` for expensive components

### Don't

- Inline styles (except dynamic values)
- CSS-in-JS (emotion, styled-components)
- Hard-coded colors
- Class components
- Heavy deps without consideration

## Storybook

```typescript
// stories/Hero.stories.tsx
import { Hero } from '@rstack-dev/doc-ui/hero';
import './index.scss';

export const HeroStory = () => <Hero onClickGetStarted={() => {}} />;

export default { title: 'Hero' };
```

## Git Hooks

Pre-commit via `simple-git-hooks`:

- `pnpm run lint:write`

## Adding Components

1. Create `src/component-name/index.tsx`
2. Add `src/component-name/index.module.scss`
3. Add entry in `rslib.config.ts`
4. Add export in `package.json` exports
5. Create `stories/ComponentName.stories.tsx`

## External Dependencies

Externalized (consumers provide): `react`, `react-dom`, `framer-motion`

Peer deps: `antd`, `lottie-web`, `react-intersection-observer`
