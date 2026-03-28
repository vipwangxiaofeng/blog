# 内容系统说明

博客使用 `@nuxt/content` v2 管理 Markdown 文章。

## 目录结构

```
apps/blog/content/blog/
├── getting-started-with-nuxt-3.md
├── building-a-blog-with-tailwind-css.md
└── typescript-best-practices.md
```

文件名即为 URL slug：
- `getting-started-with-nuxt-3.md` → `/blog/getting-started-with-nuxt-3`

## 文章格式

每篇文章使用 YAML frontmatter + Markdown 正文：

```markdown
---
title: Getting Started with Nuxt 3
description: Learn how to build modern web applications with Nuxt 3.
date: 2025-01-15
tags:
  - nuxt
  - vue
  - tutorial
---

# Getting Started with Nuxt 3

正文内容...
```

### Frontmatter 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `description` | 是 | 文章描述 (列表页展示) |
| `date` | 是 | 发布日期 (排序用) |
| `tags` | 否 | 标签数组 (筛选用) |
| `image` | 否 | 封面图片路径 |

## 添加新文章

1. 在 `apps/blog/content/blog/` 创建 `.md` 文件
2. 文件名使用小写 + 连字符：`my-new-post.md`
3. 添加 frontmatter (标题、描述、日期、标签)
4. 编写 Markdown 正文
5. 刷新页面即可看到新文章

## 查询 API

使用 `queryContent()` 查询文章：

```typescript
// 获取所有文章，按日期降序
queryContent('blog').sort({ date: -1 }).find()

// 获取最新 3 篇
queryContent('blog').sort({ date: -1 }).limit(3).find()

// 获取单篇文章
queryContent('blog', slug).findOne()
```

## 渲染文章

### 列表页 (pages/blog/index.vue)

```vue
<script setup>
const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find()
)
</script>

<template>
  <div v-for="post in posts" :key="post._path">
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <NuxtLink :to="post._path">Read more</NuxtLink>
  </div>
</template>
```

### 详情页 (pages/blog/[slug].vue)

```vue
<template>
  <ContentDoc :path="`/blog/${slug}`">
    <template #default="{ doc }">
      <h1>{{ doc.title }}</h1>
      <ContentRenderer :value="doc" />
    </template>
    <template #not-found>
      <p>文章不存在</p>
    </template>
  </ContentDoc>
</template>
```

## 代码高亮

在 `nuxt.config.ts` 中配置：

```typescript
content: {
  highlight: {
    theme: 'github-dark',  // 代码高亮主题
  },
},
```

代码块自动高亮：

````markdown
```typescript
const hello = 'world'
```
````

## Prose 组件

`@nuxt/content` 自动将 Markdown 元素映射为 Vue 组件 (Prose 组件)：

- `# 标题` → `<ProseH1>`
- `**粗体**` → `<ProseStrong>`
- `` `代码` `` → `<ProseCode>`
- ` ```代码块``` ` → `<ProsePre>`

可通过 `components/content/` 目录覆盖默认 Prose 组件。
