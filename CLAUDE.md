# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pnpm monorepo using Turborepo for build orchestration. It contains a shared UI component library (`@monorepo/ui`) and a React Native/Expo mobile app (`motion`), along with shared ESLint and TypeScript configurations.

**Key Philosophy**: The `@monorepo/ui` package uses a source-based approach (no build step). Components are built with React Native primitives and consumed as TypeScript source files, transpiled during the consumer app's build process. This enables cross-platform compatibility (React Native + Web via react-native-web).

## Package Manager & Node Requirements

- **Package Manager**: pnpm@10.8.0 (enforced via `packageManager` field)
- **Node Version**: >=22 (enforced via `engines` field)
- **Workspace Configuration**: Uses hoisted node_modules (see pnpm-workspace.yaml)

## Common Commands

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start specific workspace package
pnpm --filter motion dev
pnpm --filter @monorepo/ui ladle:dev  # Component development with Ladle
```

### Linting & Type Checking

```bash
# Lint all packages (runs via Turborepo)
pnpm lint

# Type check all packages
pnpm type-check

# Lint and type-check specific package
pnpm --filter @monorepo/ui lint
pnpm --filter motion type-check
```

### Formatting

```bash
# Format all files
pnpm format

# Check formatting (used in CI)
pnpm format:check
```

### Building

```bash
# Build all packages
pnpm build
```

### Component Development (Ladle)

```bash
# Start Ladle dev server for UI components
pnpm ladle

# Build Ladle for production
pnpm ladle:build

# Preview Ladle production build
pnpm ladle:preview
```

## Repository Structure

### Workspaces

- **apps/motion**: React Native + Expo mobile app (uses expo-router for navigation)
- **packages/ui**: Shared UI component library (React Native primitives, cross-platform)
- **packages/eslint-config**: Shared ESLint configuration
- **packages/typescript-config**: Shared TypeScript configurations (base, react, react-native, node)

### UI Package Architecture (`packages/ui`)

The UI package exports components and design tokens:

- **Components**: Located in `src/*.tsx` (e.g., `button.tsx`, `card.tsx`)
- **Design System**: Located in `src/core/` (colors, typography, radii, spacing, border)
- **Component Development**: Uses Ladle for isolated component development and testing
- **No Build Step**: Source TypeScript files are consumed directly by apps

**Design System Tokens** (`src/core/`):

- `colors.ts`: Color palette with HSL values (coral, black, beige, papaya, floral)
- `typography.ts`: Font styles and text configurations
- `spacing.ts`: Spacing scale
- `radii.ts`: Border radius values
- `border.ts`: Border width values

All exports are re-exported through `src/index.ts`.

### Motion App (`apps/motion`)

Expo-based React Native app using:

- Expo SDK ~54
- expo-router for file-based routing (~6.0)
- React Native 0.81.5
- React 19.1.0

## Code Quality Tools

### Pre-commit Hooks (Husky)

- **pre-commit**: Runs `lint-staged` (auto-formats staged files with Prettier)
- **pre-push**: Runs `pnpm lint && pnpm type-check`

### Prettier Configuration

- Single quotes, no semicolons, 120 char print width
- Import sorting via `@trivago/prettier-plugin-sort-imports`
- Import order: react → react-native → expo → third-party → @/ aliases → relative imports

### Turborepo Task Pipeline

- Tasks run in dependency order (`^build`, `^lint`, `^type-check`)
- Dev and start tasks are persistent and non-cached
- Build outputs: `.next/**`, `dist/**`, `.expo/**`

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on main branch and PRs:

1. **Lint & Format**: `pnpm format:check` + `pnpm lint`
2. **Type Check**: `pnpm type-check`
3. **Build**: `pnpm build`

All jobs use a shared setup action (`.github/actions/setup`).

## Adding New UI Components

When creating components in `@monorepo/ui`:

1. Use React Native primitives only (`View`, `Text`, `Pressable`, etc.)
2. Create the component file in `packages/ui/src/component-name.tsx`
3. Export component and TypeScript types
4. Add export to `packages/ui/src/index.ts`
5. Support style overrides via `style` prop (type: `ViewStyle` or `TextStyle`)
6. Consider creating a Ladle story in `src/core/*.stories.tsx` for visual testing

**Example component structure**:

```tsx
import React from 'react'

import { StyleSheet, View, ViewStyle } from 'react-native'

export interface MyComponentProps {
  style?: ViewStyle
  // ... other props
}

export function MyComponent({ style, ...props }: MyComponentProps) {
  return <View style={[styles.base, style]} {...props} />
}

const styles = StyleSheet.create({
  base: {
    // base styles
  },
})
```

## Working with the Monorepo

### Adding Dependencies

```bash
# Add to root (for tooling like prettier, turbo)
pnpm add -Dw <package>

# Add to specific workspace
pnpm --filter @monorepo/ui add <package>
pnpm --filter motion add <package>
```

### TypeScript Configuration

Packages extend shared configs from `@monorepo/typescript-config`:

- `base.json`: Common base config
- `react.json`: For React web projects
- `react-native.json`: For React Native projects
- `node.json`: For Node.js projects

## Environment Variables

- `TURBO_TELEMETRY_DISABLED=1` is set in git hooks to disable Turborepo telemetry
