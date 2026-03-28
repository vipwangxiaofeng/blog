# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project Overview

This is a **personal website monorepo** with a blog application, built with:

- **Framework:** Nuxt 3 + Vue 3
- **Language:** TypeScript
- **Package manager:** pnpm (workspace monorepo)
- **Build tool:** Vite (via Nuxt) + Turborepo
- **UI:** Tailwind CSS + shadcn-vue (custom components)
- **State management:** Pinia
- **Content:** @nuxt/content for Markdown blog posts

## Monorepo Structure

```
apps/
  blog/              # Main blog application (Nuxt 3)
    components/ui/   # shadcn-vue style components
    pages/           # File-based routing
    content/blog/    # Markdown blog posts
    stores/          # Pinia stores
    layouts/         # Nuxt layouts
packages/
  ui/                # Shared UI utilities (cn function)
docs/
  deploy-github-pages.md  # Deployment guide
```

## Build / Dev / Lint Commands

```bash
# Install dependencies (always use pnpm)
pnpm install

# Development server (all apps via Turborepo)
pnpm dev

# Development server (blog only)
pnpm --filter @website/blog dev

# Generate static site (for GitHub Pages)
pnpm --filter @website/blog generate

# Production build
pnpm build

# Lint
pnpm lint

# Format with Prettier
pnpm format
```

## Testing

No testing framework is configured yet. If adding tests, use Vitest:

```bash
npx vitest run path/to/test.spec.ts
npx vitest -t "test name pattern"
```

## Code Style Guidelines

### Imports

- Use ESM `import` syntax; never use `require()`.
- Type-only imports: `import type { ... }`.
- Nuxt auto-imports are enabled — no need to import `ref`, `computed`, `defineStore`, etc.
- Path alias `~` maps to `apps/blog/` (Nuxt default).
- Import order: (1) Node/external packages, (2) internal, (3) relative.

### Vue Components

- Use `<script setup lang="ts">` exclusively.
- SFC order: `<script setup>`, `<template>`, `<style>`.
- Component filenames are **PascalCase**: `CardHeader.vue`, `Button.vue`.
- UI components live in `components/ui/` (shadcn-vue pattern).

### TypeScript

- `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`.
- Use `interface` for object shapes, `type` for unions/intersections.
- Variables/functions: `camelCase`.
- Pinia stores: `use` prefix (`useBlogStore`).

### Pinia Stores

Use Composition API (Setup Store) syntax:

```typescript
export const useBlogStore = defineStore('blog', () => {
  const posts = ref([])
  const filteredPosts = computed(() => posts.value)
  return { posts, filteredPosts }
})
```

### Formatting (Prettier)

- 2-space indentation, semicolons on, single quotes.
- `printWidth: 80`, trailing commas: `all`.

### CSS / Styling

- Tailwind CSS utility classes for all styling.
- Use `cn()` from `~/lib/utils` to merge classes.
- shadcn-vue components use CSS variables for theming (see `tailwind.css`).
- Dark mode supported via `dark:` prefix.

### shadcn-vue Components

- Follow the `class-variance-authority` (cva) pattern for variants.
- Use `cn()` for class merging with `tailwind-merge`.
- Props extend HTML attributes where applicable.

## Error Handling

- Use `@ts-expect-error` (not `@ts-ignore`) for known type mismatches.
- Wrap async operations in try/catch with meaningful messages.

## Git Workflow

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/` prefixes.
- Commit messages: Conventional commits (`feat:`, `fix:`, `chore:`).

## Notes for AI Agents

- Always use `pnpm` (never `npm` or `yarn`).
- Run `pnpm lint` after making changes.
- Nuxt auto-imports are available — do not add explicit imports for Vue/Nuxt APIs.
- Do not commit `.nuxt/`, `.output/`, `node_modules/`, or `.env` files.
- Blog posts go in `apps/blog/content/blog/` as Markdown with frontmatter.
- Deployment docs: see `docs/deploy-github-pages.md`.
