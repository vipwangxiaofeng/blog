# 项目概览

个人网站 monorepo，核心是一个基于 Nuxt 3 的博客应用。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Nuxt 3 + Vue 3 | 3.21 / 3.5 |
| 语言 | TypeScript | 5.7+ |
| 包管理 | pnpm (workspace) | 9.15 |
| 构建 | Turborepo + Vite | 2.8 / 7.3 |
| 样式 | Tailwind CSS | 3.4 |
| UI 组件 | shadcn-vue (cva 模式) | - |
| 状态管理 | Pinia (Setup Store) | 2.3 |
| 内容 | @nuxt/content | 2.13 |

## 目录结构

```
website/
├── apps/
│   └── blog/                     # 博客应用 (Nuxt 3)
│       ├── components/ui/        # shadcn-vue 风格组件
│       │   ├── Button.vue        # 按钮 (6 种变体 4 种尺寸)
│       │   ├── Card.vue          # 卡片容器
│       │   ├── CardHeader.vue    # 卡片头部
│       │   ├── CardTitle.vue     # 卡片标题
│       │   ├── CardDescription.vue # 卡片描述
│       │   ├── CardContent.vue   # 卡片内容区
│       │   └── Badge.vue         # 标签徽章 (4 种变体)
│       ├── content/blog/         # Markdown 博客文章
│       │   ├── getting-started-with-nuxt-3.md
│       │   ├── building-a-blog-with-tailwind-css.md
│       │   └── typescript-best-practices.md
│       ├── layouts/
│       │   └── default.vue       # 默认布局 (导航 + 页脚)
│       ├── pages/
│       │   ├── index.vue         # 首页 (英雄区 + 最新文章)
│       │   ├── about.vue         # 关于页
│       │   └── blog/
│       │       ├── index.vue     # 文章列表 (搜索 + 标签筛选)
│       │       └── [slug].vue    # 文章详情 (动态路由)
│       ├── stores/
│       │   └── blog.ts           # 博客 Pinia Store
│       ├── lib/
│       │   └── utils.ts          # cn() 工具函数
│       ├── assets/css/
│       │   └── tailwind.css      # Tailwind 入口 + CSS 变量
│       ├── app.vue               # 根组件
│       └── nuxt.config.ts        # Nuxt 配置
├── packages/
│   └── ui/                       # 共享 UI 工具包
│       ├── index.ts              # 导出入口
│       └── utils.ts              # cn() 实现
├── docs/
│   ├── project-overview.md       # 本文件
│   ├── architecture.md           # 架构说明
│   ├── routing.md                # 路由说明
│   ├── components.md             # 组件说明
│   ├── state-management.md       # 状态管理说明
│   ├── content-system.md         # 内容系统说明
│   └── deploy-github-pages.md    # 部署文档
├── turbo.json                    # Turborepo 任务配置
├── pnpm-workspace.yaml           # pnpm workspace 声明
└── AGENTS.md                     # AI 编码助手指南
```

## 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev                        # 所有应用
pnpm --filter @website/blog dev # 仅博客

# 构建
pnpm build                      # 所有应用 (Turborepo)
pnpm --filter @website/blog build # 仅博客

# 生成静态站点 (部署用)
pnpm --filter @website/blog generate

# 代码格式化
pnpm format
```

## 工作流

1. **开发:** `pnpm dev` 启动，修改代码自动热更新
2. **添加文章:** 在 `apps/blog/content/blog/` 创建 `.md` 文件
3. **添加组件:** 在 `apps/blog/components/ui/` 创建 `.vue` 文件
4. **部署:** `pnpm generate` 生成静态文件，推送到 GitHub Pages
