# Setting up @monorepo/ui for Web Apps

This guide explains how to use the shared UI components in a web application.

## How It Works

The UI components are written using React Native primitives (`View`, `Text`, `Pressable`, etc.). To use them in a web app, you need `react-native-web`, which transforms these primitives into web equivalents:

- `<View>` → `<div>`
- `<Text>` → `<span>`
- `<Pressable>` → `<button>` or `<div>` with click handlers
- `StyleSheet` → CSS

## Setup for Next.js

### 1. Install dependencies

```bash
pnpm add --filter website react-native-web @monorepo/ui@workspace:*
```

### 2. Configure Next.js (next.config.js)

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = ['.web.js', '.web.ts', '.web.tsx', ...config.resolve.extensions]
    return config
  },
}

module.exports = nextConfig
```

### 3. Use the components

```tsx
import { Button, Card } from '@monorepo/ui'

export default function HomePage() {
  return (
    <Card>
      <Button title="Click me" onPress={() => alert('Hello!')} />
    </Card>
  )
}
```

## Setup for Vite

### 1. Install dependencies

```bash
pnpm add --filter website react-native-web @monorepo/ui@workspace:*
```

### 2. Configure Vite (vite.config.ts)

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
})
```

### 3. Use the components

Same as Next.js - just import and use!

## Important Notes

- **Styling**: All components use `StyleSheet.create()` which react-native-web transforms to CSS
- **Platform-specific code**: If needed, you can use `.native.tsx` and `.web.tsx` file extensions
- **Performance**: react-native-web handles optimization and CSS extraction automatically
- **Bundle size**: Only the components you import will be bundled

## Adding Web-Specific Styling

If you need web-specific overrides:

```tsx
import { Platform } from 'react-native'

import { Button } from '@monorepo/ui'

;<Button
  title="Click me"
  onPress={() => {}}
  style={{
    // This style only applies on web
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  }}
/>
```
