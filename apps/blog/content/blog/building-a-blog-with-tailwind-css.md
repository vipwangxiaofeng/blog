---
title: Building a Blog with Tailwind CSS
description: How to create a beautiful blog using Tailwind CSS utility classes and best practices.
date: 2025-01-10
tags:
  - tailwind
  - css
  - design
---

# Building a Blog with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.

## Key Concepts

### Utility-First

Instead of writing custom CSS, you compose designs using utility classes:

```html
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 class="text-xl font-bold text-gray-900">Title</h2>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>
```

### Responsive Design

Tailwind makes responsive design straightforward:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards -->
</div>
```

### Dark Mode

Toggle dark mode with the `dark:` prefix:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content adapts to theme
</div>
```

## Tips

1. Use `@apply` sparingly — prefer utility classes.
2. Extract components for repeated patterns.
3. Use the Tailwind VS Code extension for autocomplete.

Happy styling!
