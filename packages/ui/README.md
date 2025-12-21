# @monorepo/ui

Shared UI components for React Native and Web (via react-native-web).

## Philosophy

All components are built using React Native primitives (`View`, `Text`, `Pressable`, etc.) and work on:

- **React Native apps** (iOS, Android) - Native rendering
- **Web apps** - Via `react-native-web` transformation

## Build Strategy

This package uses a **source-based approach** (no build step). TypeScript source files are consumed directly by apps and transpiled during their build process.

**📖 Want to understand the trade-offs or migrate to a build-based approach?** See [BUILD_APPROACHES.md](./BUILD_APPROACHES.md) for detailed documentation.

## Usage

### In React Native App (apps/motion)

```tsx
import { Button, Card } from '@monorepo/ui'

function MyScreen() {
  return (
    <Card>
      <Button title="Click me" onPress={() => console.log('Pressed!')} variant="primary" />
    </Card>
  )
}
```

### In Future Web App

1. Install `react-native-web`:

```bash
pnpm add react-native-web
```

2. Configure your bundler (Vite, Next.js, etc.) to resolve react-native to react-native-web

3. Use the same imports:

```tsx
import { Button, Card } from '@monorepo/ui'
```

## Adding Components

All components should:

- Use React Native primitives only
- Export TypeScript types
- Include basic styling
- Support custom style overrides via `style` prop

## Available Components

- **Button** - Pressable button with primary/secondary variants
- **Card** - Container with shadow and rounded corners
