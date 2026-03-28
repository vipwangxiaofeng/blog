# 状态管理说明

项目使用 Pinia，采用 Composition API (Setup Store) 语法。

## Store 结构

`apps/blog/stores/blog.ts` 是唯一的 Store：

```typescript
export const useBlogStore = defineStore('blog', () => {
  // State
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const searchQuery = ref('')
  const selectedTag = ref('')

  // Getters (computed)
  const filteredPosts = computed(() => { ... })
  const allTags = computed(() => { ... })

  // Actions
  function setPosts(data: Post[]) { posts.value = data }
  function setSearch(query: string) { searchQuery.value = query }
  function setTag(tag: string) { selectedTag.value = tag }

  return { posts, loading, filteredPosts, allTags, setPosts, setSearch, setTag }
})
```

## 数据流

```
pages/blog/index.vue
  → useAsyncData 从 @nuxt/content 获取文章
    → watch 监听数据变化
      → blogStore.setPosts() 写入 Store
        → 组件读取 blogStore.filteredPosts
```

## Store 用途

| 状态 | 类型 | 用途 |
|------|------|------|
| `posts` | `Post[]` | 所有文章数据 |
| `searchQuery` | `string` | 搜索关键词 |
| `selectedTag` | `string` | 当前选中标签 |
| `filteredPosts` | `ComputedRef` | 筛选后的文章列表 |
| `allTags` | `ComputedRef` | 所有标签集合 |

## Post 类型定义

```typescript
interface Post {
  slug: string        // URL slug (如 "getting-started-with-nuxt-3")
  title: string       // 文章标题
  description: string // 文章描述
  date: string        // 发布日期
  tags: string[]      // 标签数组
}
```

## 使用示例

```vue
<script setup lang="ts">
const blogStore = useBlogStore()

// 设置数据
blogStore.setPosts([...])

// 读取筛选结果
const posts = blogStore.filteredPosts

// 搜索/筛选
blogStore.setSearch('vue')
blogStore.setTag('typescript')
</script>
```

## 组件与 Store 的关系

```
pages/blog/index.vue
  ├── 侧边栏搜索框 → v-model="blogStore.searchQuery"
  ├── 标签列表     → @click="blogStore.setTag(tag)"
  └── 文章列表     → v-for="post in blogStore.filteredPosts"
```

## 注意事项

- Store 仅管理客户端筛选状态，数据获取在页面组件中完成
- `useAsyncData` 是 SSR/SSG 友好的数据获取方式
- Nuxt 自动导入 `ref`, `computed`, `defineStore` 等，无需手动 import
