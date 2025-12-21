# Build Approaches for Shared UI Packages

This document explains two different approaches for building and distributing shared UI components in a monorepo, their trade-offs, and when to use each.

## Current Approach: Source-Based (No Build Step)

### How It Works

Packages export TypeScript source files directly, without a compilation step:

```json
{
  "name": "@monorepo/ui",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

Consumer apps (React Native, Next.js, etc.) import source files and transpile them during their own build process:

```tsx
import { Button } from '@monorepo/ui'

// -> Imports from packages/ui/src/index.ts
// -> Metro/Next.js/Vite transpiles it
```

### Pros

- ✅ **Zero build overhead** - No compilation step for the package
- ✅ **Instant updates** - Changes reflect immediately in dev mode
- ✅ **Simpler setup** - Fewer dependencies and configuration
- ✅ **Better debugging** - Source maps point to actual source code
- ✅ **Hot reload friendly** - Works perfectly with Metro/Vite HMR
- ✅ **Less disk space** - No dist/ folder to store

### Cons

- ❌ **Slower app builds** - Each app transpiles the package independently
- ❌ **No optimization** - Can't pre-optimize/minify the package
- ❌ **Repeated work** - Same source transpiled multiple times across apps
- ❌ **Can't publish to npm** - Source files aren't suitable for distribution
- ❌ **Bundler configuration** - Apps must be configured to transpile node_modules

### When to Use

Perfect for:

- Small to medium monorepos (< 5 apps)
- Fast iteration and development
- Internal packages (not publishing to npm)
- Teams prioritizing developer experience

## Alternative Approach: Build-Based (with tsup)

### How It Works

Packages are compiled to JavaScript with type definitions before distribution:

```json
{
  "name": "@repo/ui",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  }
}
```

The build process (using tsup) produces:

- **dist/index.js** - Compiled JavaScript (CommonJS/ESM)
- **dist/index.d.ts** - TypeScript type definitions
- **Minified/optimized code** - Ready for production

Consumer apps import pre-compiled code:

```tsx
import { Button } from '@monorepo/ui'

// -> Imports from packages/ui/dist/index.js
// -> Already compiled, no transpilation needed
```

### Example Configuration

**package.json:**

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "tsup": "^8.0.1",
    "typescript": "^5.9.2"
  }
}
```

**tsup.config.ts:**

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-native'],
  banner: {
    js: '"use client";', // For Next.js App Router
  },
})
```

**turbo.json:**

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

### Pros

- ✅ **Faster app builds** - Apps don't need to transpile the package
- ✅ **Better caching** - Turborepo can cache compiled outputs
- ✅ **Optimized output** - Minification, tree-shaking, code splitting
- ✅ **Publishable** - Can publish to npm or private registry
- ✅ **Multiple formats** - Output both CommonJS and ESM
- ✅ **Framework features** - Can add "use client" for Next.js RSC
- ✅ **Consistent builds** - Same output across all consumers

### Cons

- ❌ **Build step required** - Must run `build` before using
- ❌ **Slower iteration** - Need to rebuild after changes (even with --watch)
- ❌ **More complex setup** - Additional tools and configuration
- ❌ **Debugging harder** - Source maps add indirection
- ❌ **Disk usage** - dist/ folder duplicates source
- ❌ **Build errors** - Another place for things to break

### When to Use

Perfect for:

- Large monorepos (5+ apps)
- Publishing packages to npm
- Optimizing CI/CD performance
- Using Next.js App Router (needs "use client")
- Heavy computation in shared packages
- When build cache significantly speeds up CI

## Comparison Table

| Aspect               | Source-Based             | Build-Based (tsup)     |
| -------------------- | ------------------------ | ---------------------- |
| **Setup Complexity** | Simple                   | Moderate               |
| **Dev Experience**   | Fast, instant updates    | Slower, rebuild needed |
| **Production Perf**  | Same (apps optimize)     | Slightly better        |
| **CI/CD Speed**      | Slower (repeated builds) | Faster (cache dist/)   |
| **Debugging**        | Easier                   | Harder                 |
| **npm Publishing**   | ❌ No                    | ✅ Yes                 |
| **Turborepo Cache**  | Limited benefits         | Excellent benefits     |
| **Disk Usage**       | Low                      | Higher (dist/ folder)  |
| **Hot Reload**       | Instant                  | Delayed                |

## Migration Path: Source → Build-Based

If you want to migrate from source-based to build-based:

### 1. Install Dependencies

```bash
pnpm add -D --filter @monorepo/ui tsup
```

### 2. Create tsup.config.ts

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-native'],
})
```

### 3. Update package.json

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "clean": "rm -rf dist"
  }
}
```

### 4. Update turbo.json

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "dependsOn": ["^build"], // Build packages before dev
      "cache": false,
      "persistent": true
    }
  }
}
```

### 5. Update .gitignore

```
# builds
dist/
```

### 6. Build the Package

```bash
pnpm --filter @monorepo/ui run build
```

### 7. Update Apps

Apps automatically get the built version - no code changes needed!

## Hybrid Approach (Best of Both)

You can also use a hybrid approach:

**For development:**

```json
{
  "exports": {
    ".": {
      "development": "./src/index.ts", // Source in dev
      "default": "./dist/index.js" // Built in prod
    }
  }
}
```

This gives you fast dev experience + optimized production builds.

## Recommendation for This Monorepo

**Current State (1 React Native app):**
✅ **Keep source-based** - Simpler, faster iteration

**Future State (3+ apps, web + native + backend):**
🔄 **Consider tsup** - Better caching and performance

**If Publishing to npm:**
🔄 **Use tsup** - Required for distribution

**If Using Next.js App Router:**
🔄 **Use tsup** - Needed for "use client" directive

## References

- [tsup Documentation](https://tsup.egoist.dev/)
- [Turborepo with React Native Web Example](https://github.com/vercel/turborepo/tree/main/examples/with-react-native-web)
- [Turborepo Build Caching](https://turbo.build/repo/docs/core-concepts/caching)
