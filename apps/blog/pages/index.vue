<script setup lang="ts">
const { data: posts } = await useAsyncData('recent-posts', () =>
  queryContent('blog').sort({ date: -1 }).limit(3).find()
)
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <section class="flex flex-col items-center justify-center space-y-4 text-center py-20">
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        欢迎来到我的博客
      </h1>
      <p class="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
        分享前端开发、人工智能和技术生活。记录学习路上的点点滴滴。
      </p>
      <div class="space-x-4">
        <UiButton as-child>
          <NuxtLink to="/blog">阅读博客</NuxtLink>
        </UiButton>
        <UiButton variant="outline" as-child>
          <NuxtLink to="/about">关于我</NuxtLink>
        </UiButton>
      </div>
    </section>

    <section class="py-12">
      <h2 class="text-2xl font-bold tracking-tight mb-6">最新文章</h2>
      <div v-if="!posts" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="animate-pulse">
          <div class="h-48 rounded-lg bg-muted" />
        </div>
      </div>
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UiCard v-for="post in posts" :key="post._path" class="hover:shadow-lg transition-shadow">
          <UiCardHeader>
            <UiCardTitle class="line-clamp-1">{{ post.title }}</UiCardTitle>
            <UiCardDescription class="line-clamp-2">{{ post.description }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <time>{{ post.date }}</time>
              <span>·</span>
              <div class="flex gap-1">
                <UiBadge v-for="tag in (post.tags || []).slice(0, 2)" :key="tag" variant="secondary">
                  {{ tag }}
                </UiBadge>
              </div>
            </div>
          </UiCardContent>
          <div class="p-6 pt-0">
            <NuxtLink :to="post._path" class="text-sm text-primary hover:underline">
              阅读更多 →
            </NuxtLink>
          </div>
        </UiCard>
      </div>
    </section>
  </div>
</template>
