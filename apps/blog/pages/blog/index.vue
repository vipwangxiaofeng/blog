<script setup lang="ts">
const blogStore = useBlogStore()

const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find()
)

watch(posts, (value) => {
  if (value) {
    blogStore.setPosts(
      value.map((p) => ({
        slug: p._path?.replace('/blog/', '') ?? '',
        title: p.title ?? 'Untitled',
        description: p.description ?? '',
        date: p.date ?? '',
        tags: p.tags ?? [],
      }))
    )
  }
}, { immediate: true })
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="flex flex-col space-y-4 mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Blog</h1>
      <p class="text-muted-foreground">Thoughts, ideas, and tutorials about web development.</p>
    </div>

    <div class="flex flex-col md:flex-row gap-6">
      <aside class="w-full md:w-64 shrink-0">
        <div class="sticky top-20 space-y-4">
          <input
            v-model="blogStore.searchQuery"
            type="text"
            placeholder="Search posts..."
            class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div>
            <h3 class="mb-2 text-sm font-semibold">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <UiBadge
                :variant="blogStore.selectedTag === '' ? 'default' : 'outline'"
                class="cursor-pointer"
                @click="blogStore.setTag('')"
              >
                All
              </UiBadge>
              <UiBadge
                v-for="tag in blogStore.allTags"
                :key="tag"
                :variant="blogStore.selectedTag === tag ? 'default' : 'outline'"
                class="cursor-pointer"
                @click="blogStore.setTag(tag)"
              >
                {{ tag }}
              </UiBadge>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1">
        <div v-if="!posts" class="space-y-6">
          <div v-for="i in 3" :key="i" class="animate-pulse rounded-lg border p-6">
            <div class="h-6 w-3/4 bg-muted rounded mb-2" />
            <div class="h-4 w-full bg-muted rounded mb-4" />
            <div class="h-4 w-1/4 bg-muted rounded" />
          </div>
        </div>
        <div v-else-if="blogStore.filteredPosts.length === 0" class="text-center py-12 text-muted-foreground">
          No posts found.
        </div>
        <div v-else class="space-y-6">
          <NuxtLink
            v-for="post in blogStore.filteredPosts"
            :key="post.slug"
            :to="`/blog/${post.slug}`"
            class="block group"
          >
            <UiCard class="hover:shadow-md transition-shadow">
              <UiCardHeader>
                <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <time>{{ post.date }}</time>
                </div>
                <UiCardTitle class="group-hover:text-primary transition-colors">
                  {{ post.title }}
                </UiCardTitle>
                <UiCardDescription>{{ post.description }}</UiCardDescription>
              </UiCardHeader>
              <UiCardContent>
                <div class="flex gap-2">
                  <UiBadge v-for="tag in post.tags" :key="tag" variant="secondary">
                    {{ tag }}
                  </UiBadge>
                </div>
              </UiCardContent>
            </UiCard>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
