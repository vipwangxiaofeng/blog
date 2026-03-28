<script setup lang="ts">
import siteConfig from "~/site.config.json";
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight mb-8">关于我</h1>

      <UiCard class="mb-8">
        <UiCardContent class="pt-6">
          <div
            class="flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <div
              class="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-4xl"
            >
              {{ siteConfig.author.avatar }}
            </div>
            <div class="flex-1 text-center md:text-left">
              <h2 class="text-2xl font-bold mb-2">
                {{ siteConfig.author.name }}
              </h2>
              <p class="text-muted-foreground mb-4">
                {{ siteConfig.author.title }}
              </p>
              <p class="leading-relaxed">
                {{ siteConfig.author.bio }}
              </p>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">技术栈</h2>
        <div class="flex flex-wrap gap-2">
          <UiBadge v-for="skill in siteConfig.author.skills" :key="skill">
            {{ skill }}
          </UiBadge>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4">博客主题</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <UiCard v-for="topic in siteConfig.topics" :key="topic.title">
            <UiCardHeader>
              <UiCardTitle class="text-lg">{{ topic.title }}</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">{{ topic.description }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </section>

      <section>
        <h2 class="text-2xl font-bold mb-4">联系方式</h2>
        <UiCard>
          <UiCardContent class="pt-6">
            <div class="space-y-3">
              <p class="flex items-center gap-2">
                <span class="text-muted-foreground">GitHub:</span>
                <a
                  :href="siteConfig.author.social.github"
                  target="_blank"
                  class="text-primary hover:underline"
                >
                  {{ siteConfig.author.social.github.replace("https://", "") }}
                </a>
              </p>
              <p class="flex items-center gap-2">
                <span class="text-muted-foreground">邮箱:</span>
                <a
                  :href="`mailto:${siteConfig.author.social.email}`"
                  class="text-primary hover:underline"
                >
                  {{ siteConfig.author.social.email }}
                </a>
              </p>
            </div>
          </UiCardContent>
        </UiCard>
      </section>
    </div>
  </div>
</template>
