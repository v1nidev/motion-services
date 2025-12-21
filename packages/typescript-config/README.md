# @monorepo/typescript-config

Shared TypeScript configurations for the monorepo.

## Available Configs

### `base.json`

Base configuration with strict settings and common options. All other configs extend this.

### `react-native.json`

For React Native apps (non-Expo).

```json
{
  "extends": "@monorepo/typescript-config/react-native.json"
}
```

### `react.json`

For React web apps (Next.js, Vite, etc).

```json
{
  "extends": "@monorepo/typescript-config/react.json"
}
```

### `node.json`

For Node.js backends and packages.

```json
{
  "extends": "@monorepo/typescript-config/node.json"
}
```

## Usage

### For Expo Apps

Expo apps should continue extending `expo/tsconfig.base` as it includes Expo-specific settings:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    // Your overrides
  }
}
```

### For Other Projects

1. Install the package:

```bash
pnpm add -D @monorepo/typescript-config@workspace:*
```

2. Extend the appropriate config in your `tsconfig.json`:

```json
{
  "extends": "@monorepo/typescript-config/node.json",
  "compilerOptions": {
    // Your project-specific overrides
  }
}
```
