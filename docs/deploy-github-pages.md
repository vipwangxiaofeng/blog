# GitHub Pages 部署指南

本文档介绍如何将博客项目部署到 GitHub Pages。

## 前置条件

- GitHub 账号
- 已创建 GitHub 仓库（如 `yourusername.github.io` 或任意仓库名）
- 本地已安装 pnpm

## 部署步骤

### 1. 修改 nuxt.config.ts

```typescript
export default defineNuxtConfig({
  // ...其他配置
  
  // 如果部署到 https://yourusername.github.io/
  app: {
    baseURL: '/',
  },

  // 如果部署到 https://yourusername.github.io/repo-name/
  // app: {
  //   baseURL: '/repo-name/',
  // },
})
```

### 2. 生成静态站点

```bash
cd apps/blog
pnpm generate
```

生成的静态文件位于 `.output/public` 目录。

### 3. 使用 GitHub Actions 自动部署

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Generate static site
        run: pnpm --filter @website/blog generate

      - uses: actions/upload-pages-artifact@v3
        with:
          path: apps/blog/.output/public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 4. 配置 GitHub 仓库

1. 进入仓库 **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. 推送代码到 main 分支即可触发自动部署

### 5. 手动部署（备选）

如果不使用 GitHub Actions，可以手动部署：

```bash
# 生成静态站点
cd apps/blog
pnpm generate

# 进入生成目录
cd .output/public

# 初始化 git 并推送到 gh-pages 分支
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:yourusername/repo-name.git main:gh-pages
```

然后在 GitHub 仓库 Settings → Pages 中选择 `gh-pages` 分支。

## 注意事项

- 使用 `pnpm generate` 而非 `pnpm build`，因为 GitHub Pages 只能托管静态文件
- 如果使用 `@nuxt/content` 模块，内容会在构建时静态生成
- 如果路由包含动态参数，确保在 `nuxt.config.ts` 中配置 `nitro.prerender.routes`
- 首次部署后访问可能需要等待几分钟生效

## 自定义域名（可选）

1. 在 `apps/blog/public/` 目录下创建 `CNAME` 文件，内容为你的域名：
   ```
   blog.yourdomain.com
   ```
2. 在域名 DNS 设置中添加 CNAME 记录指向 `yourusername.github.io`
3. 在 GitHub 仓库 Settings → Pages 中填入自定义域名
