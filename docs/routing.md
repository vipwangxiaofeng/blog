# 路由说明

Nuxt 3 使用基于文件的路由系统，`pages/` 目录下的文件自动映射为路由。

## 路由表

| 文件路径 | URL | 说明 |
|----------|-----|------|
| `pages/index.vue` | `/` | 首页 |
| `pages/about.vue` | `/about` | 关于页 |
| `pages/blog/index.vue` | `/blog` | 博客文章列表 |
| `pages/blog/[slug].vue` | `/blog/:slug` | 文章详情 (动态路由) |

## 动态路由

`[slug].vue` 方括号语法创建动态路由：

```
/blog/getting-started-with-nuxt-3
/blog/building-a-blog-with-tailwind-css
/blog/typescript-best-practices
```

获取参数：

```typescript
const route = useRoute()
const slug = route.params.slug as string
```

## 路由导航

使用 `<NuxtLink>` 组件，等同于 Vue Router 的 `<RouterLink>`：

```vue
<NuxtLink to="/blog">Read Blog</NuxtLink>
<NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
```

当前激活的链接自动添加 `router-link-active` 类。

## 页面数据获取

每个页面通过 `useAsyncData` 获取数据：

```typescript
// pages/index.vue - 获取最新 3 篇
const { data: posts } = await useAsyncData('recent-posts', () =>
  queryContent('blog').sort({ date: -1 }).limit(3).find()
)

// pages/blog/index.vue - 获取所有文章
const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find()
)

// pages/blog/[slug].vue - 使用 ContentDoc 自动匹配
<ContentDoc :path="`/blog/${slug}`">
```

## 404 处理

文章详情页使用 `ContentDoc` 的 `#not-found` 插槽：

```vue
<ContentDoc :path="`/blog/${slug}`">
  <template #not-found>
    <h1>404</h1>
    <p>Post not found.</p>
  </template>
</ContentDoc>
```

## 扩展路由

添加新页面只需在 `pages/` 下创建 `.vue` 文件：

```
pages/projects.vue      → /projects
pages/contact.vue       → /contact
pages/blog/archive.vue  → /blog/archive
```
