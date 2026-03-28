# 组件说明

项目使用 shadcn-vue 风格的组件，基于 `class-variance-authority` (cva) 管理变体。

## UI 组件目录

所有 UI 组件位于 `apps/blog/components/ui/`，Nuxt 自动导入，使用时加 `Ui` 前缀：

```
Button.vue       → <UiButton>
Card.vue         → <UiCard>
CardHeader.vue   → <UiCardHeader>
CardTitle.vue    → <UiCardTitle>
CardDescription.vue → <UiCardDescription>
CardContent.vue  → <UiCardContent>
Badge.vue        → <UiBadge>
```

## Button 按钮

```vue
<UiButton variant="default" size="md">Click</UiButton>
<UiButton variant="outline" as-child>
  <NuxtLink to="/blog">Link</NuxtLink>
</UiButton>
```

**变体 (variant):**
- `default` - 主色背景
- `outline` - 边框样式
- `secondary` - 次要色
- `ghost` - 透明背景
- `link` - 链接样式
- `destructive` - 危险操作 (红色)

**尺寸 (size):**
- `sm` / `default` / `lg` / `icon`

**`as` 属性:** 渲染为不同元素 (`button`, `a`, `NuxtLink`)

## Card 卡片

由 5 个组件组合而成：

```vue
<UiCard>
  <UiCardHeader>
    <UiCardTitle>标题</UiCardTitle>
    <UiCardDescription>描述文字</UiCardDescription>
  </UiCardHeader>
  <UiCardContent>
    <p>内容区域</p>
  </UiCardContent>
</UiCard>
```

## Badge 徽章

用于标签展示：

```vue
<UiBadge>默认</UiBadge>
<UiBadge variant="secondary">次要</UiBadge>
<UiBadge variant="outline">边框</UiBadge>
<UiBadge variant="destructive">警告</UiBadge>
```

## cn() 工具函数

合并 Tailwind 类名，解决冲突：

```typescript
import { cn } from '~/lib/utils'

// 合并类名并自动处理冲突
cn('px-4 py-2', 'px-6')  // → 'py-2 px-6' (后面的 px-6 覆盖 px-4)
```

依赖 `clsx` (条件类名) + `tailwind-merge` (合并冲突解决)。

## 组件开发模式

创建新组件的标准模式：

```vue
<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const variants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', md: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

interface Props extends /* @vue-ignore */ HTMLAttributes {
  variant?: VariantProps<typeof variants>['variant']
  size?: VariantProps<typeof variants>['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
})

const classes = computed(() => cn(variants({ variant: props.variant, size: props.size }), props.class))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

## 添加新组件

1. 在 `apps/blog/components/ui/` 创建 `.vue` 文件
2. 遵循上述模式，使用 `cva` 定义变体
3. Nuxt 自动导入，使用 `<UiComponentName>` 引用
