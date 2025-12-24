# Turborepo CI Improvements

This document outlines potential optimizations for CI workflows using Turborepo features that are not currently implemented.

## 1. Remote Caching

**Current State:** Only local caching is enabled. Each CI run starts from scratch.

**Impact:** Remote caching can reduce CI time by 50-90% on typical PRs by sharing build artifacts across different machines, branches, and PRs.

### Options:

#### A. Vercel Remote Cache (Recommended - Easiest)
- Free for personal use
- Zero infrastructure setup
- Automatic cache management

**Setup:**
```bash
# Install Turbo globally or use npx
npx turbo login
npx turbo link
```

Add to CI workflow:
```yaml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

#### B. GitHub Actions Cache
- Free, built into GitHub
- No external service dependencies
- Requires manual setup

Add to `turbo.json`:
```json
{
  "remoteCache": {
    "signature": true
  }
}
```

Add to CI workflow before running tasks:
```yaml
- name: Setup Turbo Cache
  uses: rharkor/caching-for-turbo@v1.5
```

#### C. Self-Hosted
- Full control over cache storage
- Can use S3, Google Cloud Storage, etc.
- More complex setup

## 2. Run Tasks Only on Changed Packages

**Current State:** All packages are checked on every CI run.

**Impact:** Reduces unnecessary work by only running tasks on packages that have changed or depend on changed packages.

### Implementation:

Update CI jobs to use `--filter`:

```yaml
- name: Lint
  run: pnpm lint --filter='[HEAD^1]'

- name: Type check
  run: pnpm type-check --filter='[HEAD^1]'

- name: Build
  run: pnpm build --filter='[HEAD^1]'
```

For PRs, use:
```yaml
- name: Lint
  run: pnpm lint --filter='...[origin/main]'
```

This only runs tasks on packages that changed between the current branch and main.

## 3. Improved turbo.json Configuration

**Current State:** Basic task configuration without input patterns, env vars, or detailed outputs.

**Impact:** Better cache invalidation and more reliable builds.

### Recommended Improvements:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "package.json", "tsconfig.json"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", ".expo/**"],
      "env": ["NODE_ENV"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "inputs": ["src/**", "*.{js,jsx,ts,tsx}", "package.json", ".eslintrc*"],
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^type-check"],
      "inputs": ["src/**", "*.{ts,tsx}", "tsconfig.json", "package.json"],
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "start": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Key Additions:
- **inputs**: Defines which files affect the task (better cache invalidation)
- **env**: Environment variables that should invalidate cache
- **outputs**: Clear definition of what gets cached (already mostly done)

## 4. CI-Specific Optimizations

**Current State:** Basic task execution without CI-specific flags.

**Impact:** Better error handling, reduced log noise, and improved visibility.

### Recommended Flags:

```yaml
- name: Lint
  run: pnpm lint --continue --output-logs=new-only

- name: Type check
  run: pnpm type-check --continue --output-logs=new-only

- name: Build
  run: pnpm build --summarize --output-logs=errors-only
```

### Flag Explanations:

- `--continue`: Don't fail fast - run all tasks even if some fail (helps see all errors at once)
- `--output-logs=new-only`: Only show logs for cache misses (reduces noise)
- `--output-logs=errors-only`: Only show logs when tasks fail
- `--summarize`: Generate a summary of the Turborepo run (useful for debugging)

## 5. Parallel Job Optimization

**Current State:** Jobs run in parallel, which is good, but they could be further optimized.

**Impact:** Even faster CI by running independent tasks in parallel within a single job.

### Option A: Single Job (Faster for small monorepos)
```yaml
jobs:
  ci:
    name: CI
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.2

      - name: Setup
        uses: ./.github/actions/setup

      - name: Run all checks
        run: |
          pnpm format:check &
          pnpm lint &
          pnpm type-check &
          wait
          pnpm build
```

### Option B: Keep Separate Jobs (Current - Better for visibility)
Current approach is fine for better GitHub UI visibility and error isolation.

## Summary of Potential Improvements

| Feature | Complexity | Impact | Time Savings |
|---------|-----------|--------|--------------|
| Remote Caching | Low | High | 50-90% |
| Filtered Tasks | Low | Medium | 30-70% |
| Better turbo.json | Low | Medium | 10-20% |
| CI Flags | Low | Low | 5-10% |

## Recommended Implementation Order

1. **Start with Remote Caching** - Biggest impact, easiest to implement
2. **Add filtered tasks** - Simple but effective
3. **Improve turbo.json** - Small effort for better reliability
4. **Add CI flags** - Polish and better developer experience

## Resources

- [Turborepo Remote Caching Docs](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Turborepo Filtering Docs](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Turborepo CI/CD Guide](https://turbo.build/repo/docs/ci)
