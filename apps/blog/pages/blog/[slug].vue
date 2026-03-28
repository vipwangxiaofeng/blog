<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <article class="mx-auto max-w-3xl">
      <ContentDoc :path="`/blog/${slug}`">
        <template #not-found>
          <div class="text-center py-20">
            <h1 class="text-4xl font-bold mb-4">404</h1>
            <p class="text-muted-foreground mb-8">Post not found.</p>
            <UiButton as-child>
              <NuxtLink to="/blog">Back to Blog</NuxtLink>
            </UiButton>
          </div>
        </template>
        <template #default="{ doc }">
          <div class="mb-8">
            <NuxtLink to="/blog" class="text-sm text-muted-foreground hover:text-foreground">
              ← Back to Blog
            </NuxtLink>
          </div>
          <header class="mb-8">
            <h1 class="text-4xl font-bold tracking-tight mb-4">{{ doc.title }}</h1>
            <div class="flex items-center gap-4 text-muted-foreground">
              <time>{{ doc.date }}</time>
              <div class="flex gap-2">
                <UiBadge v-for="tag in doc.tags" :key="tag" variant="secondary">
                  {{ tag }}
                </UiBadge>
              </div>
            </div>
          </header>
          <div class="prose prose-neutral dark:prose-invert max-w-none">
            <ContentRenderer :value="doc" />
          </div>
        </template>
      </ContentDoc>
    </article>
  </div>
</template>
