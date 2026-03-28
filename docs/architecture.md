# 架构说明

## Monorepo 结构

项目使用 Turborepo + pnpm workspace 管理多包项目。

```
personal-website (根)
├── apps/blog      → @website/blog     # 主应用
└── packages/ui    → @website/ui       # 共享工具
```

### Turborepo 任务流

```
turbo.json 定义:

build:  依赖 ^build (子包先构建)，产物 .output/**, .nuxt/**, dist/**
dev:    无缓存，持久运行
lint:   依赖 ^build
```

## 应用架构 (apps/blog)

```
app.vue
  └── NuxtLayout (default.vue)
        └── NuxtPage (pages/)

app.vue          → 根组件，挂载布局和页面
default.vue      → 全局布局：导航栏 + 内容槽 + 页脚
pages/index.vue  → 首页
pages/blog/      → 博客路由组
pages/about.vue  → 关于页
```

### 请求/数据流

```
用户访问页面
  → Nuxt 渲染 (SSR/SSG)
    → useAsyncData 调用 queryContent()
      → @nuxt/content 读取 content/blog/*.md
        → 返回数据到组件
          → Pinia Store 管理筛选状态
```

### 模块依赖

```
@nuxt/content     → 内容解析 (Markdown → HTML)
@nuxtjs/tailwindcss → CSS 工具类
@pinia/nuxt       → 状态管理集成
shadcn-vue 组件   → 依赖 class-variance-authority + tailwind-merge
```

## 共享包 (packages/ui)

目前仅导出 `cn()` 工具函数：

```typescript
// packages/ui/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

博客应用有自己的 `lib/utils.ts`，功能相同。当未来添加更多应用时，可将共享逻辑迁移到 `packages/ui`。

## 样式架构

```
tailwind.config.ts   → Tailwind 配置 (颜色、圆角、动画)
assets/css/tailwind.css → CSS 变量定义 (亮/暗主题)
components/ui/*.vue  → 使用 cn() 合并类名
```

CSS 变量驱动的主题系统：

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --background: 0 0% 100%;
  /* ... */
}
.dark {
  --primary: 210 40% 98%;
  /* ... */
}
```

组件通过 `hsl(var(--primary))` 引用变量，实现主题切换。
